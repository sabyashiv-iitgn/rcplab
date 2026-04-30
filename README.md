# RCP Lab Website

This repository contains the GitHub Pages site for RCP Lab.

## Editing Content

Most site content is plain Markdown:

- `index.md` - home page
- `people.md` - lab members and joining information
- `research.md` - research overview
- `teaching.md` - courses and mentoring
- `resources.md` - course materials, logo, and public materials
- `news.md` - news listing
- `_posts/` - dated news posts

The logo and other public assets live in `resources/`.

## GitHub Pages

The site uses Jekyll, which GitHub Pages builds automatically. Set GitHub Pages to deploy from the
main branch and repository root unless your repository settings require a different branch.

For local preview, install the Jekyll bundle and serve the site:

```sh
/opt/homebrew/opt/ruby@3.3/bin/bundle install
/opt/homebrew/opt/ruby@3.3/bin/bundle exec jekyll serve
```
