# CLAUDE.md — hexo-web

Hexo 7.3.0 blog site using the **Fluid** theme (Material Design).

## Commands

```bash
npm run server      # hexo server — local dev at http://localhost:4000
npm run build       # hexo generate — output to public/
npm run clean       # hexo clean — delete public/ and cache
npm run deploy      # hexo deploy — push to GitHub Pages
```

## Architecture

```
_config.yml              # Hexo site config (theme, plugins, deploy)
_config.fluid.yml        # Fluid theme config (navbar, comments, search, dark mode…)
source/                  # Content root
  _posts/                # Blog posts (Markdown)
layout/                  # Theme override files (takes precedence over theme)
  _partials/comments/
    artalk.ejs           # Custom Artalk comment partial
themes/
  butterfly/             # Old theme (unused)
  fluid/                 # Current theme (via npm: hexo-theme-fluid)
```

## Key Configuration

| File | Purpose |
|------|---------|
| `_config.yml` | Site metadata, theme selection (`theme: fluid`), deploy target, search plugin |
| `_config.fluid.yml` | Nav menu, banner, post display, comments, code highlighting, TOC, dark mode, lazy loading |

## Theme: Fluid

- **Docs**: https://hexo.fluid-dev.com/docs/
- **Features enabled**: local search, dark mode (auto), code copy button, TOC, image lazy loading, typed banner subtitle
- **Comment system**: Artalk (self-hosted) — requires `artalk.server` to be set in `_config.fluid.yml` before comments render
- **Custom files**: `layout/_partials/comments/artalk.ejs` — also copied to `node_modules/hexo-theme-fluid/layout/_partials/comments/artalk.ejs` (theme partial resolution quirk)

## Plugins

| Package | Purpose |
|---------|---------|
| `hexo-wordcount` | Reading time & word count in post meta |
| `hexo-generator-search` | Local search (`search.json`) |
| `hexo-deployer-git` | Deploy to GitHub Pages |
| `artalk` | Comment system (backend server package) |

## Deployment

- **Type**: `git`
- **Remote**: `git@github.com:nixlong/nixlong.github.io.git`
- **Branch**: `gh-pages`

## Notes

- The old Butterfly theme config is backed up as `_config.butterfly.yml.bak` — safe to delete
- `hexo-theme-landscape` and `hexo-renderer-pug` are installed but unused (leftovers from default install / Butterfly)
- When the Fluid theme is updated via npm, re-copy `layout/_partials/comments/artalk.ejs` into the theme's layout directory
