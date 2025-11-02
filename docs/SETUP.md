# Warren4 Blog - Setup & Instructions

## Project Overview

This is an Astro-based blog for www.warren4.co.uk focused on Product Management, AI, and Motorsport content.

**Important**: This project lives within an Obsidian vault, so you can write and edit blog posts directly in Obsidian!

## What's Been Set Up

### GitHub Connection
- **Repository**: `Richard-Warren4/warren4.github.io`
- **Old Site**: Archived to `archive-jekyll-site` branch
- **Current Branch**: `master`

### Site Configuration
- **Site Title**: Warren4
- **Tagline**: "Insights on Product Management, AI, and the occasional motorsport adventure"
- **Custom Domain**: www.warren4.co.uk
- **Deployment**: Automatic via GitHub Actions on push to master

### Content Structure
- **Main Topics**: Product Management, AI, Motorsport
- **Blog Location**: `src/content/blog/`
- **Navigation**: Home, Blog, About

## GitHub Pages Configuration

**One-time setup required**:

1. Go to https://github.com/Richard-Warren4/warren4.github.io/settings/pages
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
3. Your custom domain (www.warren4.co.uk) should be configured in DNS

After this, GitHub Actions will automatically build and deploy your site when you push to master.

## Local Development

### Prerequisites
- Node.js installed on your system

### Commands
```bash
# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Writing Blog Posts with Obsidian

Since this project is in your Obsidian vault, you can write blog posts directly in Obsidian!

### Location
Blog posts are located in: `src/content/blog/`

### Post Format
Create new `.md` files in `src/content/blog/` with this frontmatter:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
pubDate: 'Nov 02 2024'
category: 'Product Management' | 'AI' | 'Motorsport' | 'General'
---

Your content here...
```

### Obsidian-Specific Considerations

**✅ What Works:**
- Standard Markdown syntax
- Headings, lists, links, images
- Code blocks
- Frontmatter (YAML)

**⚠️ What to Avoid:**
- Obsidian wikilinks `[[like this]]` - use standard markdown links `[like this](url)` instead
- Obsidian callouts/admonitions (unless you add a plugin to Astro)
- Embedded notes or transclusions
- Obsidian-specific syntax

**💡 Tip**: You can still use Obsidian's excellent editor, just stick to standard Markdown syntax for blog posts.

### Images
- Place images in `src/assets/` or `public/`
- Reference from `src/assets/`: `import MyImage from '../assets/my-image.jpg'` (in `.astro` files)
- Reference from `public/`: `![Alt text](/my-image.jpg)` (in markdown)

## Publishing Workflow

### From Obsidian
1. Write your blog post in `src/content/blog/your-post.md`
2. Use standard Markdown syntax
3. Add proper frontmatter
4. Save the file

### Deploy to Website
```bash
# Stage and commit your changes
git add .
git commit -m "Add new blog post: Your Title"

# Push to GitHub (triggers automatic deployment)
git push
```

GitHub Actions will automatically:
1. Build your Astro site
2. Deploy to GitHub Pages
3. Make it live at www.warren4.co.uk

## Site Structure

```
www.warren4.co.uk/
├── docs/                    # Documentation (this file)
├── src/
│   ├── content/
│   │   └── blog/           # Your blog posts (edit in Obsidian!)
│   ├── components/         # Astro components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Website pages
│   │   ├── index.astro    # Homepage
│   │   ├── about.astro    # About page
│   │   └── blog/          # Blog listing & post pages
│   └── styles/            # Global styles
├── public/                # Static assets
└── .github/workflows/     # GitHub Actions deployment
```

## Customization

### Update Site Info
Edit `src/consts.ts`:
```typescript
export const SITE_TITLE = 'Warren4';
export const SITE_DESCRIPTION = 'Your tagline here';
```

### Update About Page
Edit `src/pages/about.astro`

### Update Navigation
Edit `src/components/Header.astro`

### Styling
- Global styles: `src/styles/global.css`
- Component-specific: Scoped `<style>` blocks in `.astro` files

## Troubleshooting

### Build Fails
```bash
# Check the error message
npm run build

# Common issues:
# - YAML frontmatter syntax errors (missing quotes, colons)
# - Missing required frontmatter fields
# - Invalid dates
```

### Site Not Updating
1. Check GitHub Actions tab in repository for build status
2. Ensure GitHub Pages is configured correctly
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
4. Check DNS if custom domain isn't working

## Resources

- **Astro Docs**: https://docs.astro.build
- **Astro Blog Template**: https://github.com/withastro/astro/tree/main/examples/blog
- **GitHub Actions**: Check `.github/workflows/deploy.yml`
- **Markdown Guide**: https://www.markdownguide.org

## Notes

- The old Jekyll site is preserved in the `archive-jekyll-site` branch
- Don't forget to commit and push to deploy changes
- GitHub Actions builds typically take 1-2 minutes
- This project is safe to use within your Obsidian vault - just avoid Obsidian-specific syntax in blog posts
