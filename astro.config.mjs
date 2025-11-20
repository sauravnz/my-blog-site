// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.tld', // Replace with your actual domain
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false, // We'll handle base styles ourselves
      }
    }),
    sitemap({
      filter: (page) => {
        // Exclude draft pages and search results from sitemap
        if (page.includes('/search') || page.includes('?drafts=1')) {
          return false;
        }
        return true;
      }
    }),
    mdx()
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      langs: ['javascript', 'typescript', 'python', 'bash', 'json', 'yaml', 'markdown', 'css', 'html']
    },
    remarkPlugins: ['remark-math'],
    rehypePlugins: [['rehype-katex', { strict: false }]]
  },

  mdx: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: [['rehype-katex', { strict: false }]],
    // Define custom MDX components/shortcodes
    components: {
      Context: './src/components/mdx/Context.astro',
      Callout: './src/components/mdx/Callout.astro',
      Cite: './src/components/mdx/Cite.astro',
    }
  }
});