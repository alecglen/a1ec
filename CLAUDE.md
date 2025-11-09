# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog website (a1ec.dev) following a component-based architecture with static site generation. The site features a personal blog with content collections, tag-based filtering, and RSS feed support.

## Development Commands

```bash
# Start development server (available on all network interfaces via host: true)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Content Collection System

The blog uses Astro's content collections API (configured in `src/content.config.ts`):
- Blog posts are stored as markdown files in `src/blog/`
- Collection schema defines required frontmatter: title, author, pubDate, description, image (url/alt), tags
- Uses a glob loader with pattern `**/[^_]*.md` (files starting with `_` are ignored)
- All posts are accessed via `getCollection("blog")` in pages

### Routing Structure

**Dynamic Routes:**
- `/posts/[...slug]` - Individual blog posts using content collection IDs
  - Uses `getStaticPaths()` to generate routes from blog collection
  - Renders content using `render(post)` and `MarkdownPostLayout`
- `/tags/[tag]` - Tag filter pages showing posts with specific tags
  - Generates static paths for all unique tags found in posts
  - Filters posts by tag in `getStaticPaths()` props

**Static Routes:**
- `/blog` - Lists all blog posts using `BlogPostLink` component
- `/tags` - Tag index page
- `/rss.xml.js` - RSS feed endpoint using `@astrojs/rss`

### Layout Hierarchy

```
BasePageLayout (root layout)
├── Global CSS import
├── Header component
├── Footer component
└── Optional <h1> title (controlled by titleHeader prop)
    └── MarkdownPostLayout (blog-specific layout)
        ├── Frontmatter metadata display
        ├── Featured image
        ├── Tag navigation links
        └── Post content slot
```

BasePageLayout accepts `pageTitle` (required) and `titleHeader` (boolean, default true) props.

### Component Organization

- `Header.astro` - Site header with navigation
- `Footer.astro` - Site footer
- `Menu.astro` - Mobile menu component
- `Navigation.astro` - Main navigation links
- `Social.astro` - Social media links
- `BlogPostLink.astro` - Reusable blog post list item
- `ThemeIcon.astro` - Dark mode toggle icon

### Client-Side Scripts

`src/scripts/menu.js` handles mobile menu toggle using `aria-expanded` attribute. Imported in BasePageLayout via `<script>` tag with module import syntax.

### Styling

Global styles in `src/styles/global.css` are imported at the BasePageLayout level and cascade to all pages.

## Site Configuration

`astro.config.mjs`:
- Site URL: `https://a1ec.dev`
- Server configured with `host: true` for network-accessible dev server
- No integrations currently installed

## Working with Blog Posts

To add a new post:
1. Create a markdown file in `src/blog/` (don't prefix with underscore)
2. Include required frontmatter matching the schema in `src/content.config.ts`
3. Post will automatically appear in blog list, RSS feed, and tag pages

The content collection system handles:
- Automatic date parsing for `pubDate`
- Type-safe access to frontmatter via `post.data`
- Post ID derived from filename (used in URLs)
