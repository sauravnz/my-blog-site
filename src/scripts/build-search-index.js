import { writeFile } from 'fs/promises';
import { getCollection } from 'astro:content';

export async function buildSearchIndex() {
  console.log('🔍 Building search index...');

  try {
    const notes = await getCollection('notes');
    const publishedNotes = notes.filter(note =>
      note.data.stage === 'published' || !note.data.stage
    );

    // Create search index data
    const searchIndex = publishedNotes.map(note => ({
      slug: note.slug,
      title: note.data.title,
      description: note.data.description || '',
      tags: note.data.tags || [],
      content: note.body || '',
      pubDate: note.data.pubDate
    }));

    // Build backlinks map
    const backlinksMap = {};

    notes.forEach(note => {
      const content = note.body || '';
      const title = note.data.title;

      // Find wikilinks in format [[Note Title]]
      const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
      const matches = content.matchAll(wikilinkRegex);

      for (const match of matches) {
        const linkedTitle = match[1];

        // Find the note with this title
        const linkedNote = notes.find(n =>
          n.data.title === linkedTitle && n.slug !== note.slug
        );

        if (linkedNote) {
          if (!backlinksMap[linkedNote.slug]) {
            backlinksMap[linkedNote.slug] = [];
          }

          backlinksMap[linkedNote.slug].push({
            slug: note.slug,
            title: note.data.title,
            excerpt: note.data.description || ''
          });
        }
      }
    });

    return { searchIndex, backlinksMap };
  } catch (error) {
    console.error('❌ Error building search index:', error);
    throw error;
  }
}

// Build script for manual execution
async function main() {
  try {
    const { searchIndex, backlinksMap } = await buildSearchIndex();

    // Ensure public directory exists
    const fs = await import('fs/promises');
    try {
      await fs.access('./dist');
    } catch {
      await fs.mkdir('./dist', { recursive: true });
    }

    // Save search index
    await writeFile('./dist/search-index.json', JSON.stringify(searchIndex, null, 2));
    console.log(`✅ Search index created with ${searchIndex.length} notes`);

    // Save backlinks map
    await writeFile('./dist/backlinks.json', JSON.stringify(backlinksMap, null, 2));
    console.log(`✅ Backlinks map created with ${Object.keys(backlinksMap).length} entries`);

    // Also copy to public directory if it exists
    try {
      await fs.access('./public');
      await writeFile('./public/search-index.json', JSON.stringify(searchIndex, null, 2));
      await writeFile('./public/backlinks.json', JSON.stringify(backlinksMap, null, 2));
      console.log('✅ Files copied to public directory');
    } catch {
      console.log('ℹ️ Public directory not found, files only in dist/');
    }

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
