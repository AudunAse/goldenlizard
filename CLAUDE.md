# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Lizard's Den" (Golden Lizard) - a personal site and creative workshop built with Eleventy. It includes a blog, notes, gallery, and "The Vault" (a tips collection). Based on the [Eleventy Excellent](https://github.com/madrilene/eleventy-excellent) starter, following the CUBE CSS methodology from [buildexcellentwebsit.es](https://buildexcellentwebsit.es/).

## Development Commands

```bash
# Local development with live reload
npm start
# or
npm run dev:11ty

# Production build
npm run build
# (runs clean + build:11ty)

# Clean generated files (dist, CSS, scripts)
npm run clean

# Utility commands
npm run favicons      # Generate favicons from SVG logo
npm run colors        # Regenerate color design tokens
npm run screenshots   # Generate screenshots
npm run clean:og      # Remove OG images
```

## Architecture

### Configuration Structure

Eleventy configuration is modularized in `src/_config/`:

- **collections.js** - Content collections (allPosts, pinnedPosts, nonPinnedPosts, tagList, allTips)
- **filters.js** - Template filters (dates, markdown, slugify, relatedPosts, etc.)
- **plugins.js** - Eleventy plugins (RSS, syntax highlight, WebC, image transforms)
- **shortcodes.js** - Custom shortcodes (SVG, image)
- **events.js** - Build lifecycle events (CSS/JS compilation, SVG conversion)

Plugin implementations are in `src/_config/plugins/`:
- **markdown.js** - Enhanced markdown-it with anchors, footnotes, emojis, attrs, etc.
- **drafts.js** - Draft posts support (exclude from production)
- **ignore-gif-transform.js** - Prevents GIFs from being converted (keeps them animated)
- **html-config.js** - HTML minification settings

### Content Organization

- **Posts**: `src/posts/**/*.md` - Blog posts (markdown with frontmatter)
- **Pages**: `src/pages/*.{md,njk}` - Static pages (about, blog listing, vault, index)
- **Docs**: `src/docs/` - Documentation content
- **Layouts**: `src/_layouts/*.njk` - Base templates (base, page, post, tags, photography)
- **Includes**: `src/_includes/` - Partials, components, and WebC components (`src/_includes/webc/`)
- **Data**: `src/_data/` - Global data files (meta.js, navigation.js, builtwith.json, etc.)

### Collections

1. **allPosts** - All posts in `src/posts/**/*.md`, sorted newest first
2. **pinnedPosts** - Posts with `pinned: true` in frontmatter (displayed prominently on blog page)
3. **nonPinnedPosts** - Regular posts for pagination
4. **tagList** - All unique tags from posts (excludes 'posts', 'docs', 'all')
5. **allTips** - Aggregated tips from posts for The Vault page

### The Vault Feature

The Vault (`/vault/`) aggregates reusable tips from across blog posts:
- Define tips in post frontmatter: `tips: [{ title: "Tip Title", anchor: "slug" }]`
- Each tip links to the post section with the anchor: `post-url#anchor`
- The vault page filters tips by tag
- Implementation: `src/_config/collections.js` (allTips), `src/pages/vault.njk`

### Related Posts System

Custom filter in `src/_config/filters/related-posts.js`:
- Finds up to 3 related posts based on shared tags (most tags in common first)
- Falls back to recent posts if fewer than 3 related by tags
- Excludes the current post
- Used in `src/_includes/partials/related-posts.njk`

### Design Tokens & Styling

Design tokens are in `src/_data/designTokens/` (JSON):
- colors.json, fonts.json, spacing.json, textSizes.json, borderRadius.json, etc.
- Processed by `tailwind.config.js` using utility functions:
  - `clampGenerator` - Creates fluid responsive values using CSS clamp()
  - `tokensToTailwind` - Converts design tokens to Tailwind config format

CSS structure:
- **Global CSS**: `src/assets/css/global/` - Base styles, composition, utilities (CUBE CSS layers)
- **Local CSS**: `src/assets/css/local/` - Component-specific styles
- Compiled via PostCSS (see `src/_config/events.js` - buildAllCss)

### Image Handling

- Uses `@11ty/eleventy-img` for optimization (webp + jpeg fallback)
- Configured in `eleventy.config.js` with `eleventyImageTransformPlugin`
- **Important**: GIFs are excluded from transforms via `ignoreGifImagesTransform` plugin to preserve animation
- Images stored in `src/assets/images/` (subdirs: blog, gallery, favicon, screenshots, template)
- Image shortcode available: `{% image "path", "alt text" %}`

### Script Compilation

JavaScript is bundled via esbuild:
- Source: `src/assets/scripts/bundle/` and `src/assets/scripts/components/`
- Build process in `src/_config/events.js` (buildAllJs)
- Output: `src/_includes/scripts/` (copied to dist)

### WebC Components

WebC components in `src/_includes/webc/**/*.webc`:
- Server-rendered web components
- Configured in `eleventy.config.js` with `@11ty/eleventy-plugin-webc`
- Uses transform mode for automatic inclusion

## File Locations

- **Entry point**: `eleventy.config.js` (all configuration loads from here)
- **Site metadata**: `src/_data/meta.js` (siteName, author, blog settings, theme colors)
- **Navigation**: `src/_data/navigation.js`
- **Environment vars**: `.env` (sample: `.env-sample`)
- **Output directory**: `dist/` (gitignored, generated on build)

## Important Patterns

1. **Markdown posts** should include frontmatter:
   ```yaml
   ---
   title: "Post Title"
   description: "SEO description"
   date: 2026-02-23
   tags: [tag1, tag2]
   pinned: false  # Optional, for featured posts
   tips:          # Optional, for The Vault
     - title: "Tip Title"
       anchor: "heading-slug"
   ---
   ```

2. **Anchor links**: Heading IDs are auto-generated by markdown-it-anchor (use heading text slugified)

3. **Dark/light theme**: Theme is controlled by CSS custom properties and `theme-switch` component

4. **Draft posts**: Set `draft: true` in frontmatter to exclude from production builds

## Deployment

- Hosted on Netlify (see `netlify.toml`)
- Build command: `npm run build`
- Publish directory: `dist`
- Security headers configured in `netlify.toml`
- `.cache` directory is cached via `netlify-plugin-cache`

## Node Version

Requires Node.js >= 20.x.x (specified in package.json engines)
