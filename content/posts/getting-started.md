---
title: "Getting Started with Fast Blog"
date: "2026-05-15"
description: "A minimalist blogging platform built with Next.js and Markdown. Simple, fast, and distraction-free."
tags: ["nextjs", "markdown", "blog"]
---

This is the first post on your new blog. Everything you write lives as plain Markdown files — no database, no CMS, no complexity.

## How It Works

1. Add `.md` files to the `content/posts/` directory
2. Each file needs a frontmatter header with `title`, `date`, and `description`
3. The blog automatically picks up new posts on rebuild

## Frontmatter Fields

Every post starts with YAML frontmatter between `---` markers:

```yaml
title: "Your Post Title"
date: "2026-05-15"
description: "A short summary for listings and SEO."
tags: ["optional", "tags"]
```

- `title` — the post heading (required)
- `date` — publish date in `YYYY-MM-DD` format (required)
- `description` — used in post listings and meta tags (required)
- `tags` — optional list of tags

## Writing Posts

Write in standard Markdown. Headings, lists, links, images, blockquotes — it all works. Here's a blockquote:

> Simplicity is the ultimate sophistication. — Leonardo da Vinci

You can also include **bold text**, *italics*, and `inline code`.

## What's Next

This platform is intentionally minimal. Here are some things you might add later:

- An about page
- RSS feed
- Syntax highlighting for code blocks
- Tag-based filtering

For now, enjoy writing without distractions.
