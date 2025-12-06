import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

const assignments = defineCollection({
  name: 'assignments',
  directory: 'content',
  include: '*.mdx',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    level: z.number(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return { ...document, mdx };
  },
});

export default defineConfig({
  collections: [assignments],
});
