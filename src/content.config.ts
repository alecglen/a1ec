import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

// Define a glob loader to load the project post collection
const loader = glob({ pattern: '**/[^_]*.md', base: "./src/projects" });

// Define a schema to specify the project post frontmatter
const schema = z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.object({
        url: z.string(),
        alt: z.string()
    }),
    tags: z.array(z.string())
});

// Define the projects collection
const projects = defineCollection({loader, schema});

// Export a single `collections` object to register your collection(s)
export const collections = { projects };