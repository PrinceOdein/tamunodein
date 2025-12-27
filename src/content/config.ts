import { defineCollection, z } from "astro:content";
import { projects } from "./projects/config";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects,
  blog,
};
