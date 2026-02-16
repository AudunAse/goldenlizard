# Project notes

Quick reference for what’s been changed and what’s left to do. Edit this file anytime.

---

## To do

- Finish Unity Cloud Post
- Finish Stanley Park Album

---

## Done / changelog

- **The Vault**
  - New dedicated page at `/vault/` (in nav) that lists all tips from across the blog.
  - Tips are defined in post frontmatter: `tips: [{ title, anchor }]` — each links to post#anchor.
  - Added `allTips` collection; tag filter on vault page.
  - Tips added to: Houdini Notes (1), The Vault post (15).
- **SEO / meta**
  - Fixed author website typo (`ttps` → `https` in meta.js).
  - Updated `opengraph_default_alt` to describe The Lizard's Den (Audun Ase, FX veteran, Houdini/Unity/Blender).
- **Blog**
  - Migrated posts from Affex.no (Kickblast, Store selected nodes, Nuke hotkeys, Houdini Animation Ramp, Auto Ramp).
  - Added media: Kickblast (images), Nuke hotkeys (images + code blocks), Store nodes (images + code blocks), Animation Ramp (image, automation GIF, autoramp image, videos, Vimeo/YouTube embeds, UX Design link).
  - Download buttons for assets: Kickblast HDA, Store Nodes shelf, Nuke Hotkeys shelf, Auto Ramp asset.
  - Removed posts: Misconceptions of FX Artists, How perfectionism held me back.
- **Technical**
  - GIFs: Posthtml plugin so GIFs are not converted by the image transform (they stay animated).
  - Images from post folders (kickblast, nukehotkeys, storeselected, automation, animationramp) copied to `src/assets/images/blog/` and wired into posts.
- **Related Posts**
  - New `relatedPosts` filter (`src/_config/filters/related-posts.js`): picks up to 3 related posts by shared tags (most relevant first), then fills with recent posts if needed.
  - Partial `related-posts.njk` now uses the filter so the section is always populated when other posts exist.
- **Styling**
  - Links use primary accent color; hover uses secondary (both theme-aware).
- **Post editor** (`/admin/editor.html`)
  - Save/Load drafts (localStorage), auto-save (30s), draft naming and timestamps, Export/Import drafts as JSON, Delete/Rename drafts.
  - Fixed Image/Video/Link/Button dialogs (native `<dialog>` + `showModal()`/`close()`).
  - Preview pane styled to match site theme (light/dark).
  - Site CSS loaded by fetching main page and injecting bundle stylesheet links.
- **Blog / content**
  - New posts: Houdini Notes, Houdini Attribute Pixelation, Things that inspire; The Vault anchor index; proofreading (Houdini notes, attribute pixelation).
  - Copy-to-clipboard button on code blocks (`copy-code.js` + styles).
- **Misc**
  - Optional featured images on blog list discussed; deferred for now.
  - Anchor links (e.g. Vault index): markdown-it-anchor adds IDs to headings; link with `#slug-from-heading`.

---

*Last updated: 2026-02*
