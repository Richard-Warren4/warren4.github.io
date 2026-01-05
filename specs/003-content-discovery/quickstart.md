# Quickstart Guide: Content Discovery & UX Polish

**Feature**: 003-content-discovery
**Date**: November 4, 2024
**Target Audience**: Developers implementing this feature

## Overview

This guide provides step-by-step instructions for implementing Phase 2 (Content Discovery) and Phase 3 (UX Polish) improvements. Follow user stories in priority order (P1 → P2 → P3) for incremental delivery.

**Estimated Time**: 4-6 hours total
- P1 (Show all posts): 30 min
- P2 (Reading time + Footer): 2 hours
- P3 (Progress bar + Accessibility): 2-3 hours

---

## Prerequisites

Before starting implementation:

- [x] Specification complete (`spec.md`)
- [x] Planning complete (`plan.md`)
- [x] Research complete (`research.md`)
- [x] Data model defined (`data-model.md`)
- [ ] Development environment running (`npm run dev`)
- [ ] Branch `003-content-discovery` checked out
- [ ] Baseline Lighthouse score recorded (should be 100/100)

## Quick Reference

**Key Files to Modify:**
- `src/pages/blog/index.astro` - Show all posts, add reading time
- `src/layouts/BlogPost.astro` - Add reading progress, skip link, reading time
- `src/components/Footer.astro` - Add social/newsletter links
- `src/styles/global.css` - Add focus states
- `tests/pre-publish.js` - Add accessibility tests

**New Files to Create:**
- `src/components/ReadingProgress.astro` - Progress bar component
- `src/components/SkipLink.astro` - Skip-to-content link component

---

## User Story 1: Show All Posts (P1 - MVP)

**Goal**: Display all blog posts on `/blog` page without artificial limits

**Time**: 30 minutes

### Step 1.1: Remove Post Limit

**File**: `src/pages/blog/index.astro`

**Find:**
```astro
const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 3);  // REMOVE THIS LINE
```

**Replace with:**
```astro
const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  // Now shows all posts (currently 4, will show more as blog grows)
```

### Step 1.2: Test

```bash
npm run dev
# Visit http://localhost:4321/blog
# Verify all 4 posts are visible
```

**Acceptance Criteria:**
- ✅ All published posts visible (currently 4)
- ✅ No "Load more" or pagination needed
- ✅ Posts sorted by date (newest first)

---

## User Story 2: Reading Time Display (P2)

**Goal**: Show estimated reading time on blog listing and individual posts

**Time**: 1 hour

### Step 2.1: Add Reading Time to Blog Listing

**File**: `src/pages/blog/index.astro`

**Add calculation:**
```astro
---
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');

// Calculate reading time for each post
const posts = allPosts
  .map(post => {
    const wordCount = post.body.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    return {
      ...post,
      wordCount,
      readingTime,
      readingTimeText: `${readingTime} min read`
    };
  })
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
```

**Add display in post card:**
```astro
{posts.map((post) => (
  <li>
    <a href={`/blog/${post.slug}/`}>
      <h4 class="title">{post.data.title}</h4>
      <p class="date">
        <FormattedDate date={post.data.pubDate} />
        <span class="reading-time"> • {post.readingTimeText}</span>
      </p>
    </a>
  </li>
))}
```

**Add styles:**
```astro
<style>
  .reading-time {
    color: rgb(var(--gray-light));
    font-size: 0.9em;
  }
</style>
```

### Step 2.2: Add Reading Time to Individual Post Page

**File**: `src/layouts/BlogPost.astro`

**Add calculation in frontmatter:**
```astro
---
import type { CollectionEntry } from 'astro:content';

type Props = CollectionEntry<'blog'>['data'];

const { title, description, pubDate, updatedDate, heroImage } = Astro.props;
const post = Astro.props as CollectionEntry<'blog'>;

// Calculate reading time
const wordCount = post.body.split(/\s+/).length;
const readingTime = Math.max(1, Math.ceil(wordCount / 200));
const readingTimeText = `${readingTime} min read`;
---
```

**Add display in post header:**
```astro
<article>
  <div class="hero-image">
    {heroImage && <img width={1020} height={510} src={heroImage} alt="" />}
  </div>
  <div class="prose">
    <div class="title">
      <h1>{title}</h1>
      <div class="meta">
        <FormattedDate date={pubDate} />
        {updatedDate && (
          <div class="last-updated-on">
            Last updated on <FormattedDate date={updatedDate} />
          </div>
        )}
        <span class="reading-time"> • {readingTimeText}</span>
      </div>
    </div>
    <slot />
  </div>
</article>
```

### Step 2.3: Test

```bash
# Visit blog listing
http://localhost:4321/blog
# Verify each post shows "X min read"

# Visit individual post
http://localhost:4321/blog/the-ai-pm-operating-system
# Verify reading time appears in header
```

**Acceptance Criteria:**
- ✅ Reading time shown on blog listing cards
- ✅ Reading time shown on individual post pages
- ✅ Format is "{number} min read"
- ✅ Minimum is "1 min read" for short posts

---

## User Story 3: Enhanced Footer (P2)

**Goal**: Add social links, newsletter link, RSS link, and auto-updating copyright

**Time**: 1 hour

### Step 3.1: Update Footer Component

**File**: `src/components/Footer.astro`

**Replace entire content:**
```astro
---
import { SITE_TITLE } from '../consts';

const today = new Date();
const currentYear = today.getFullYear();

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/richard-warren4',
    ariaLabel: 'Richard Warren on LinkedIn'
  }
];

const siteLinks = [
  { name: 'Newsletter', url: '#newsletter' },
  { name: 'RSS', url: '/rss.xml' }
];
---

<footer>
  <div class="footer-content">
    <div class="footer-section">
      <h3>Connect</h3>
      <ul class="social-links">
        {socialLinks.map(link => (
          <li>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div class="footer-section">
      <h3>Subscribe</h3>
      <ul class="site-links">
        {siteLinks.map(link => (
          <li>
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>

    <div class="footer-section copyright">
      <p>&copy; {currentYear} {SITE_TITLE}</p>
      <p class="tagline">Building Products, Exploring AI</p>
    </div>
  </div>
</footer>

<style>
  footer {
    padding: 3rem 1rem;
    margin-top: 4rem;
    border-top: 1px solid rgb(var(--gray-light));
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .footer-section h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: rgb(var(--black));
  }

  .social-links,
  .site-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .social-links li,
  .site-links li {
    margin-bottom: 0.5rem;
  }

  .social-links a,
  .site-links a {
    color: rgb(var(--gray));
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .social-links a:hover,
  .site-links a:focus {
    color: rgb(var(--accent));
  }

  .copyright {
    text-align: right;
  }

  .copyright p {
    margin: 0.25rem 0;
    color: rgb(var(--gray-light));
    font-size: 0.9rem;
  }

  .tagline {
    font-style: italic;
  }

  @media (max-width: 720px) {
    .footer-content {
      grid-template-columns: 1fr;
    }

    .copyright {
      text-align: center;
    }
  }
</style>
```

### Step 3.2: Test

```bash
# Visit any page
http://localhost:4321
# Scroll to footer
# Verify LinkedIn link, Newsletter link, RSS link, copyright year
```

**Acceptance Criteria:**
- ✅ LinkedIn link present with aria-label
- ✅ Newsletter link present
- ✅ RSS link present
- ✅ Copyright shows current year (auto-updated)
- ✅ External links open in new tab
- ✅ Footer responsive on mobile

---

## User Story 4: Reading Progress Bar (P3)

**Goal**: Show visual scroll progress indicator for blog posts

**Time**: 1 hour

### Step 4.1: Create Progress Component

**File**: `src/components/ReadingProgress.astro` (NEW)

```astro
---
// No props needed - automatically tracks scroll
---

<div class="reading-progress-bar" aria-hidden="true" role="progressbar"></div>

<script>
  const progressBar = document.querySelector('.reading-progress-bar');
  let ticking = false;

  function updateProgress() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = Math.max(0, Math.min(100, scrolled)) + '%';
    }

    ticking = false;
  }

  // Initial update
  updateProgress();

  // Throttled scroll listener
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
</script>

<style>
  .reading-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--accent);
    width: 0%;
    z-index: 100;
    transition: width 0.1s ease;
  }
</style>
```

### Step 4.2: Add to Blog Post Layout

**File**: `src/layouts/BlogPost.astro`

**Add import:**
```astro
---
import ReadingProgress from '../components/ReadingProgress.astro';
---
```

**Add component (before `<body>` or at start of body):**
```astro
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body>
    <ReadingProgress />
    <Header />
    <main>
      <!-- existing content -->
    </main>
    <Footer />
  </body>
</html>
```

### Step 4.3: Test

```bash
# Visit a blog post
http://localhost:4321/blog/the-ai-pm-operating-system

# Scroll down slowly
# Verify blue progress bar at top grows from 0% to 100%

# Scroll back up
# Verify progress bar decreases

# Check DevTools Performance
# Verify smooth 60fps scrolling (no jank)
```

**Acceptance Criteria:**
- ✅ Progress bar visible at top of blog posts
- ✅ Bar grows as user scrolls down
- ✅ Bar shrinks as user scrolls up
- ✅ Smooth animation (no janky scrolling)
- ✅ Bar reaches 100% at end of post

---

## User Story 5: Accessibility Enhancements (P3)

**Goal**: Add skip-to-content link and improved focus indicators

**Time**: 1-2 hours

### Step 5.1: Create Skip Link Component

**File**: `src/components/SkipLink.astro` (NEW)

```astro
---
interface Props {
  targetId?: string;
  text?: string;
}

const { targetId = 'main-content', text = 'Skip to content' } = Astro.props;
---

<a href={`#${targetId}`} class="skip-link">{text}</a>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 0 0 4px 0;
    font-weight: 600;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
```

### Step 5.2: Add Skip Link to Layout

**File**: `src/layouts/BlogPost.astro`

**Add import:**
```astro
---
import SkipLink from '../components/SkipLink.astro';
---
```

**Add component and main ID:**
```astro
<body>
  <SkipLink targetId="main-content" />
  <ReadingProgress />
  <Header />
  <main id="main-content">
    <article>
      <!-- existing content -->
    </article>
  </main>
  <Footer />
</body>
```

### Step 5.3: Add Focus Indicators

**File**: `src/styles/global.css`

**Add at end of file:**
```css
/* Accessibility: Focus Indicators (WCAG 2.1 AA) */
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

/* Remove default outline */
:focus:not(:focus-visible) {
  outline: none;
}

/* Ensure focus-visible works for keyboard users */
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
```

### Step 5.4: Test

**Keyboard Navigation:**
```bash
# Open any page
http://localhost:4321/blog/the-ai-pm-operating-system

# Press Tab key once
# Verify "Skip to content" link appears

# Press Enter
# Verify focus moves to main content

# Continue pressing Tab
# Verify all links/buttons show blue focus outline
```

**Screen Reader Test (Optional):**
```bash
# macOS: Enable VoiceOver (Cmd + F5)
# Windows: Enable NVDA
# Verify skip link is announced
# Verify all interactive elements have proper labels
```

**Acceptance Criteria:**
- ✅ Skip link appears on first Tab press
- ✅ Skip link moves focus to main content
- ✅ All interactive elements have visible focus outline
- ✅ Focus outline is 3px solid blue with 2px offset
- ✅ Focus outline meets WCAG AA contrast (3:1)

---

## Validation & Testing

### Pre-Commit Checklist

- [ ] `npm run dev` - Development server runs without errors
- [ ] Visual inspection - All features work as expected
- [ ] Responsive test - Check mobile (375px), tablet (768px), desktop (1920px)
- [ ] Keyboard navigation - Tab through all interactive elements
- [ ] Cross-browser - Test in Chrome, Firefox, Safari

### Pre-Push Checklist

- [ ] `npm run build` - Production build succeeds
- [ ] `npm run test` - Pre-publish tests pass
- [ ] Lighthouse audit - Performance remains 100/100
- [ ] Accessibility check - WAVE reports zero errors
- [ ] Reading time accuracy - Spot-check calculation on a few posts

### Lighthouse Audit

```bash
# Build production version
npm run build

# Start preview server
npm run preview

# Run Lighthouse (in Chrome DevTools)
# Or use CLI:
npx lighthouse http://localhost:4323 --view

# Verify scores:
# Performance: 100
# Accessibility: ≥90
# Best Practices: 100
# SEO: ≥90
```

---

## Troubleshooting

### Reading Time Not Showing

**Problem**: Reading time is undefined or NaN

**Solution**: Check that you're accessing `post.body` correctly:
```javascript
// CORRECT:
const wordCount = post.body.split(/\s+/).length;

// WRONG (body might be undefined in listing):
const wordCount = post.data.body.split(/\s+/).length;
```

### Progress Bar Not Moving

**Problem**: Progress bar stays at 0% or 100%

**Solution**: Check scroll calculation:
```javascript
// Ensure you're using documentElement, not body
const winScroll = document.documentElement.scrollTop;
const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

// Add debugging:
console.log('Scroll:', winScroll, 'Height:', height);
```

### Skip Link Not Appearing

**Problem**: Skip link doesn't show on Tab press

**Solution**: Check z-index and positioning:
```css
.skip-link {
  position: absolute; /* Not fixed */
  top: -40px; /* Hidden by default */
  z-index: 1000; /* High enough to appear above everything */
}

.skip-link:focus {
  top: 0; /* Visible when focused */
}
```

### Focus Outline Not Visible

**Problem**: Focus outline is missing or barely visible

**Solution**: Check CSS specificity and contrast:
```css
/* Ensure this comes AFTER any other focus styles */
:focus-visible {
  outline: 3px solid var(--accent) !important; /* Use !important if needed */
  outline-offset: 2px !important;
}
```

### Lighthouse Performance Drop

**Problem**: Performance score below 100 after changes

**Solution**: Check JavaScript bundle size:
```bash
# Build and check bundle sizes
npm run build

# Look for dist/_astro/*.js files
# Ensure total JavaScript <50KB

# Check for:
# - Unminified code
# - Duplicate imports
# - Unused dependencies
```

---

## Next Steps

After implementing all user stories:

1. **Code Review**: Self-review changes against spec acceptance criteria
2. **Documentation**: Update `docs/OBSIDIAN-WORKFLOW.md` if workflow affected
3. **Commit**: Create meaningful commit message referencing spec
4. **Push**: Push to `003-content-discovery` branch
5. **Test on Staging**: Verify on GitHub Pages preview (if available)
6. **Merge**: Create PR or merge to master after validation
7. **Deploy**: GitHub Actions automatically deploys to production
8. **Monitor**: Check live site, verify Lighthouse scores

---

**Quickstart Complete**: November 4, 2024
**Next**: Run `/speckit.tasks` to generate detailed task breakdown
