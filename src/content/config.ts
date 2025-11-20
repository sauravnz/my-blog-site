import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string().optional(),
    tags: z.array(z.string()),
    context: z.string().optional(),
    stage: z.enum(['idea', 'draft', 'published']).optional(),
    links: z.array(z.string()).optional(),
    sources: z.array(z.string()).optional(),
    confidence: z.enum(['low', 'med', 'high']).optional(),
    mood: z.enum(['excited', 'curious', 'focused', 'neutral']).optional(),
    featured: z.boolean().optional(),
    noindex: z.boolean().optional(),
  }),
});

export const collections = {
  notes,
};

