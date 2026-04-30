# BRAIN Lab Website

This repository contains the GitHub Pages site for BRAIN Lab.

## Editing Content

Most site content is plain Markdown:

- `index.md` - home page
- `people.md` - lab members and joining information
- `research.md` - research overview
- `teaching.md` - courses and mentoring
- `resources.md` - proposal, logo, and public materials
- `news.md` - news listing
- `_posts/` - dated news posts

The logo and research proposal live in `resources/`.

## GitHub Pages

The site uses Jekyll, which GitHub Pages builds automatically. Set GitHub Pages to deploy from the
main branch and repository root unless your repository settings require a different branch.

For local preview, install the GitHub Pages gem bundle and serve the site:

```sh
bundle install
bundle exec jekyll serve
```
