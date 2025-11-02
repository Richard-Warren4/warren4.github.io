# Writing Blog Posts in Obsidian

This guide explains how to use Obsidian to write blog posts for your Warren4 website.

## Quick Start

1. **Create a new note** in `src/content/blog/`
2. **Add frontmatter** at the top
3. **Write your post** using standard Markdown
4. **Commit and push** to deploy

## Blog Post Template

Copy this template when creating a new blog post:

```markdown
---
title: "Your Compelling Title"
description: "A brief description that appears in search results and social shares"
pubDate: 'Nov 02 2024'
category: 'Product Management'
---

Your opening paragraph that hooks the reader...

## First Heading

Your content here...

## Second Heading

More content...

## Conclusion

Wrap it up...
```

## Categories

Use one of these categories in your frontmatter:

- `'Product Management'` - PM strategy, frameworks, execution
- `'AI'` - AI tools, LLMs, AI products
- `'Motorsport'` - Sim racing, MX-5, track days
- `'General'` - Everything else

## Markdown Best Practices

### ✅ Use Standard Markdown

**Good:**
```markdown
[Link text](https://example.com)
![Image description](./image.jpg)
**bold text**
*italic text*
```

**Avoid (Obsidian-specific):**
```markdown
[[Wikilink]]
![[Embedded note]]
> [!note] Callout
```

### Headings
```markdown
# H1 (Don't use - reserved for post title)
## H2 - Main sections
### H3 - Subsections
```

### Links
```markdown
[External link](https://example.com)
[Link to another post](/blog/other-post)
```

### Images

**Option 1: Place in `public/images/`**
```markdown
![Description](/images/my-photo.jpg)
```

**Option 2: Use external URLs**
```markdown
![Description](https://example.com/image.jpg)
```

### Code Blocks
````markdown
```javascript
const greeting = "Hello, world!";
```
````

### Lists
```markdown
- Unordered list
- Another item
  - Nested item

1. Ordered list
2. Second item
```

## Writing Workflow

### In Obsidian

1. **Navigate** to `src/content/blog/` in your vault
2. **Create** a new note (Cmd+N / Ctrl+N)
3. **Name** it with a URL-friendly slug (e.g., `product-roadmap-mistakes.md`)
4. **Add frontmatter** (use the template above)
5. **Write** your post
6. **Save** (Obsidian auto-saves)

### Preview Before Publishing

```bash
# In terminal, from project root
npm run dev
```

Then open http://localhost:4321/blog to see your post.

### Publish to Website

```bash
# Stage your new post
git add src/content/blog/your-post.md

# Or stage everything
git add .

# Commit
git commit -m "Add blog post: Your Title"

# Push to deploy
git push
```

The site will automatically rebuild and deploy in 1-2 minutes.

## File Naming

**Good:**
- `product-thinking-frameworks.md`
- `ai-for-pms.md`
- `mx5-track-day.md`

**Avoid:**
- `My Post.md` (spaces)
- `Post#1.md` (special characters)
- `2024-11-02-post.md` (dates - use frontmatter instead)

## Frontmatter Fields

### Required

```yaml
title: "Post Title"           # Used as page title and heading
description: "Brief desc"     # SEO and social sharing
pubDate: 'Nov 02 2024'       # Publication date
category: 'Category'          # One of the 4 categories
```

### Optional (for future use)

```yaml
heroImage: '../assets/image.jpg'   # Header image
draft: true                        # Hide from production
tags: ['tag1', 'tag2']            # May add tag support later
```

## Tips for Obsidian Users

### Keep Blog Posts Separate

Consider creating a folder structure in Obsidian:

```
Your Vault/
├── Personal Notes/          # Your private notes
├── Projects/
│   └── www.warren4.co.uk/
│       └── src/content/blog/  # Blog posts (public)
```

Blog posts in `src/content/blog/` will be published. Keep private notes elsewhere.

### Draft Posts

If you want to write drafts without publishing:

1. Create drafts outside `src/content/blog/`
2. Move to `src/content/blog/` when ready to publish
3. Or use `draft: true` in frontmatter (requires configuration)

### Obsidian Graph View

Your blog posts will appear in Obsidian's graph view. You can:
- Link between posts if you want
- Just use standard markdown links
- The links will work on the published site too

## Common Issues

### Post Not Showing Up

**Check:**
1. Is the file in `src/content/blog/`?
2. Does it have valid frontmatter?
3. Did you commit and push?
4. Did the GitHub Action succeed?

### YAML Errors

If you see "bad indentation" errors:

```yaml
# ❌ Wrong
title: Post with a colon: breaks YAML

# ✅ Correct
title: "Post with a colon: works fine"
```

**Rule**: If your title/description has `:` or `'` characters, wrap in double quotes.

### Images Not Loading

- Check the path is correct
- Images in `public/` should start with `/`
- Images in `src/assets/` need import statements (advanced)

## Next Steps

- Read the full setup guide: `docs/SETUP.md`
- Start with the welcome post template
- Build a backlog of post ideas in Obsidian
- Publish consistently

Happy writing!
