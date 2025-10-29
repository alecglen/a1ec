import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

// Define a glob loader to load the blog post collection
const loader = glob({ pattern: '**/[^_]*.md', base: "./src/blog" });

// Define a schema to specify the blog post frontmatter
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

// Define the blog collection
const blog = defineCollection({loader, schema});

// Export a single `collections` object to register your collection(s)
export const collections = { blog };