import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const notes = await getCollection('notes');

  // Filter published notes and sort by date (newest first)
  const publishedNotes = notes
    .filter(note => note.data.stage === 'published' || !note.data.stage)
    .sort((a, b) => {
      const dateA = a.data.pubDate ? new Date(a.data.pubDate).getTime() : 0;
      const dateB = b.data.pubDate ? new Date(b.data.pubDate).getTime() : 0;
      return dateB - dateA;
    });

  return rss({
    title: 'Personal Notes',
    description: 'Personal notes, thoughts, and discoveries. A clean, elegant space for ideas and learning.',
    site: context.site,
    items: publishedNotes.map((note) => ({
      title: note.data.title,
      description: note.data.description || `${note.data.title} - Personal notes and thoughts`,
      pubDate: note.data.pubDate ? new Date(note.data.pubDate) : new Date(),
      link: `/notes/${note.slug}/`,
      categories: note.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}

