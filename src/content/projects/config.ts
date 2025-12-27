import { defineCollection, z } from "astro:content";

export const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    tech: z.array(z.string()),

    date: z.date(), // REQUIRED for sorting
    featured: z.boolean().default(false), // REQUIRED for priority

    category: z.string(), // you're using this too
    live: z.string().url().optional(),
    repo: z.string().url().optional(),
  }),
});
