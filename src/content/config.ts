import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default(""),
    lang: z.string().optional().default(""),
    sticky: z.number().optional().default(0),

    /* For internal use */
    prevTitle: z.string().default(""),
    prevSlug: z.string().default(""),
    nextTitle: z.string().default(""),
    nextSlug: z.string().default(""),
  }),
});

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    url: z.string().optional(),
    status: z.enum(["completed", "developing", "planned"]),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
