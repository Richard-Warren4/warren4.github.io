# Implementation Plan: Content Discovery & UX Polish

**Branch**: `003-content-discovery` | **Date**: November 4, 2024 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-content-discovery/spec.md`

## Summary

Implement Phase 2 (Content Discovery) and Phase 3 (UX Polish) improvements from the design review to enhance blog discoverability and user experience. This includes showing all blog posts without limits, adding reading time estimates, enhancing the footer with social/newsletter links, implementing reading progress indicators for blog posts, and adding accessibility enhancements (skip-to-content links and improved focus states).

**Technical Approach**: Frontend-only changes using Astro's static site generation, pure JavaScript for reading progress tracking, CSS enhancements for focus states and footer styling. No new dependencies required - leverage existing Astro content collections and build-time calculations.

## Technical Context

**Language/Version**: JavaScript/TypeScript with Astro 5.15.3
**Primary Dependencies**: Astro (@astrojs/mdx 4.3.9, @astrojs/rss 4.0.13, @astrojs/sitemap 3.6.0), Sharp 0.34.3
**Storage**: Static markdown files in `src/content/blog/` (Astro content collections)
**Testing**: Node.js-based pre-publish tests (tests/pre-publish.js), manual accessibility testing with WAVE, Lighthouse audits
**Target Platform**: Static website deployed via GitHub Pages, supports all modern browsers
**Project Type**: Single static site (Astro SSG)
**Performance Goals**: Maintain Lighthouse 100/100 performance, <50ms additional load time, 60fps scrolling for progress bar
**Constraints**: Must maintain static generation (no SSR), JavaScript bundle <2KB for progress tracking, WCAG 2.1 AA accessibility compliance, no breaking changes to Obsidian writing workflow
**Scale/Scope**: 4 existing blog posts (minimal), single-page blog listing, all changes frontend-only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Constitution Review

**I. Content-First Publishing** ✅ PASS
- Changes do not affect content creation workflow
- Markdown files in `src/content/blog/` remain unchanged
- No new frontmatter fields required (reading time calculated at build)
- Publishing workflow (write → commit → push) unchanged

**II. Standard Markdown** ✅ PASS
- No Markdown syntax changes
- No new Obsidian-specific features required
- Content remains portable and standard

**III. Accessibility & Performance** ⚠️ REQUIRES VALIDATION
- **Performance**: Must validate that new features don't impact Lighthouse 100/100
  - Reading time calculation (build-time, negligible impact)
  - Progress bar JavaScript (<2KB, lazy-loaded for blog posts only)
  - Footer links (static HTML, no performance impact)
- **Accessibility**: Improvements align with WCAG 2.1 AA goals
  - Skip-to-content link (accessibility enhancement)
  - Focus indicators (accessibility enhancement)
  - Footer links with proper ARIA labels
- **Validation Required**: Lighthouse audit after implementation

**IV. Simple & Maintainable** ✅ PASS with Justification
- **No New Dependencies**: All features use vanilla JavaScript and CSS
- **Justification**: Reading progress bar requires minimal JavaScript (<100 lines), implemented inline to avoid dependency
- **Astro Built-ins**: Leveraging Astro's content collection API for word count/reading time
- **Self-Documenting**: Component names clearly describe purpose (ReadingProgress.astro, SkipLink.astro)

**V. Quality Over Quantity** ✅ PASS
- Changes enhance content discoverability and reading experience
- Does not affect post quality standards or draft workflow

### Complexity Justification

No violations requiring justification. All changes use existing Astro features and minimal vanilla JavaScript.

### Post-Design Re-Check (Phase 1 Complete)

*To be completed after Phase 1 design artifacts are generated*

## Project Structure

### Documentation (this feature)

```text
specs/003-content-discovery/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (already exists)
├── checklists/
│   └── requirements.md  # Spec quality checklist (already exists)
├── research.md          # Phase 0 output (generated below)
├── data-model.md        # Phase 1 output (generated below)
├── quickstart.md        # Phase 1 output (generated below)
├── contracts/           # Phase 1 output (N/A - no API contracts for frontend features)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── BaseHead.astro
│   ├── Footer.astro           # Modified: Add social/newsletter links
│   ├── FormattedDate.astro
│   ├── Header.astro
│   ├── NewsletterSignup.astro
│   ├── ReadingProgress.astro  # New: Reading progress bar component
│   └── SkipLink.astro         # New: Accessibility skip-to-content link
├── layouts/
│   └── BlogPost.astro         # Modified: Add reading progress, skip link, reading time display
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro        # Modified: Remove .slice(0, 3), add reading time
│   │   └── [...slug].astro    # Modified: Add reading time display
│   └── rss.xml.js
├── content/
│   ├── blog/                  # Markdown blog posts (unchanged)
│   └── config.ts              # Content collection schema (unchanged)
├── styles/
│   └── global.css             # Modified: Add focus states, skip link styles
└── assets/                    # Static images (unchanged)

tests/
└── pre-publish.js             # Modified: Add accessibility and reading time tests

docs/
├── OBSIDIAN-WORKFLOW.md       # Updated if workflow affected
└── DESIGN-REVIEW.md           # Reference for this implementation
```

**Structure Decision**: Single project structure. All changes are frontend modifications to existing Astro components, pages, and styles. No backend, no API, no additional projects required. Astro's static site generation handles all build-time calculations (reading time) and optimizations.

## Phase 0: Research & Technical Decisions

### Research Topics

Based on Technical Context analysis, we need to research:

1. **Reading Time Calculation Best Practices** - How to accurately calculate reading time for markdown/HTML content
2. **Reading Progress Bar Implementation** - Lightweight JavaScript patterns for scroll tracking
3. **Accessibility Patterns** - Skip-to-content link standards and WCAG 2.1 AA focus indicator requirements
4. **Performance Impact Measurement** - How to validate minimal performance impact of new JavaScript
5. **Astro Content Collections** - Build-time access to post content for word count calculation

### Research Findings

#### 1. Reading Time Calculation

**Decision**: Calculate reading time at build time using word count from rendered content

**Rationale**:
- Standard reading speed: 200-250 words per minute (using 200 WPM for conservative estimate)
- Calculation should happen at build time (not runtime) to avoid client-side performance cost
- Astro content collections provide access to raw markdown body via `.body` property
- Simple formula: `Math.ceil(wordCount / 200)`
- Minimum display: 1 min (even for very short posts)

**Implementation Approach**:
```javascript
// In Astro frontmatter
const wordCount = post.body.split(/\s+/).length;
const readingTime = Math.ceil(wordCount / 200);
const readingTimeText = `${readingTime} min read`;
```

**Alternatives Considered**:
- Runtime calculation: Rejected due to performance cost
- Third-party library (reading-time npm): Rejected due to "no new dependencies" principle
- Server-side API: Rejected as static site with no backend

**Reference**: Medium.com uses 265 WPM, typical range is 200-300 WPM for technical content

#### 2. Reading Progress Bar Implementation

**Decision**: Vanilla JavaScript scroll listener with requestAnimationFrame throttling

**Rationale**:
- Must be lightweight (<2KB including HTML/CSS)
- Should update smoothly (60fps) without janky scrolling
- Progressive enhancement (works without JavaScript for core content)
- No dependencies (vanilla JS only per constitution)

**Implementation Approach**:
```astro
---
// ReadingProgress.astro component
---
<div class="reading-progress-bar" aria-hidden="true"></div>

<script>
  const progressBar = document.querySelector('.reading-progress-bar');
  let ticking = false;

  function updateProgress() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  });
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

**Performance Considerations**:
- requestAnimationFrame throttles updates to browser paint cycle (60fps max)
- Debouncing with `ticking` flag prevents multiple updates per frame
- CSS transition provides smooth visual updates
- Component only loaded on blog post pages (not homepage, not listing)

**Alternatives Considered**:
- Intersection Observer: Overkill for simple scroll tracking
- Third-party library: Violates "no dependencies" principle
- Passive event listener: Added complexity with minimal benefit for single listener

**Reference**: Google's Web Fundamentals scroll performance guide

#### 3. Accessibility Patterns

**Decision**: Follow WAI-ARIA Authoring Practices for skip links and WCAG 2.1 Level AA for focus indicators

**Skip-to-Content Link Standards**:
- First focusable element on page
- Visually hidden until focused (off-screen positioning)
- Appears on keyboard focus with visible styling
- Moves focus to `<main>` element when activated
- Descriptive text: "Skip to content" or "Skip to main content"
- Implements `href="#main-content"` with corresponding `id` on main element

**Implementation**:
```astro
---
// SkipLink.astro
---
<a href="#main-content" class="skip-link">Skip to content</a>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100;
    border-radius: 0 0 4px 0;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
```

**Focus Indicator Requirements (WCAG 2.1 AA)**:
- Minimum contrast ratio: 3:1 against adjacent colors
- Visible on all interactive elements (links, buttons, inputs)
- Clear visual distinction from unfocused state
- Recommended: 3px solid outline with 2px offset

**Implementation**:
```css
/* global.css additions */
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

/* Remove default focus outline */
:focus {
  outline: none;
}

/* Custom focus for specific elements */
a:focus {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
```

**ARIA Labels for Footer Links**:
```html
<a href="https://linkedin.com/in/..." aria-label="Richard Warren on LinkedIn" target="_blank" rel="noopener noreferrer">
  LinkedIn
</a>
```

**Rationale**:
- WCAG 2.1 Level AA is constitution requirement
- Skip links are standard accessibility enhancement
- Focus indicators improve keyboard navigation for all users
- Following established patterns ensures compatibility with assistive technologies

**Alternatives Considered**:
- Focus-visible pseudo-class: Good but still requires fallback for older browsers
- Custom focus ring library: Violates "no dependencies" principle

**References**:
- WAI-ARIA Authoring Practices 1.1
- WCAG 2.1 Level AA Success Criteria 2.4.1, 2.4.7
- WebAIM: Skip Navigation Links article

#### 4. Performance Impact Measurement

**Decision**: Use Lighthouse CLI for automated performance validation in tests

**Rationale**:
- Lighthouse already used for performance monitoring
- Can be integrated into pre-publish test suite
- Measures real-world metrics (FCP, LCP, TBT, CLS)
- Validates against 100/100 performance target

**Implementation Approach**:
```javascript
// tests/pre-publish.js additions
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouseTest() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility'],
    port: chrome.port
  };

  const runnerResult = await lighthouse('http://localhost:4321', options);
  await chrome.kill();

  const performanceScore = runnerResult.lhr.categories.performance.score * 100;
  const accessibilityScore = runnerResult.lhr.categories.accessibility.score * 100;

  if (performanceScore < 100) {
    throw new Error(`Performance score ${performanceScore} is below 100`);
  }

  if (accessibilityScore < 90) {
    throw new Error(`Accessibility score ${accessibilityScore} is below 90`);
  }
}
```

**Validation Criteria**:
- Performance score must remain 100/100
- Accessibility score must be ≥90 (allowing minor issues that don't affect core accessibility)
- FCP (First Contentful Paint) <1.8s
- LCP (Largest Contentful Paint) <2.5s
- TBT (Total Blocking Time) <200ms
- CLS (Cumulative Layout Shift) <0.1

**Alternatives Considered**:
- WebPageTest API: Requires external service, adds complexity
- Manual testing only: Not repeatable/automatable
- Custom performance metrics: Reinventing wheel when Lighthouse exists

**Reference**: Google Lighthouse documentation, Web Vitals thresholds

#### 5. Astro Content Collections Build-Time Access

**Decision**: Use Astro's `getCollection()` API with `.body` property for word count

**Rationale**:
- Astro content collections already in use for blog posts
- `.body` property provides raw markdown content
- Calculation happens at build time (static site generation)
- No runtime performance cost
- Type-safe access to frontmatter and content

**Implementation Approach**:
```astro
---
// In any .astro page/component
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');

// Add reading time to each post
const postsWithReadingTime = posts.map(post => {
  const wordCount = post.body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return {
    ...post,
    readingTime
  };
});
---
```

**Content Collection Schema**:
- No schema changes required
- Reading time calculated dynamically at build time
- Not stored in frontmatter (keeps content files clean)
- Can be cached/memoized if needed for performance

**Alternatives Considered**:
- Store reading time in frontmatter: Requires manual updates, error-prone
- Runtime calculation: Performance cost on every page load
- Pre-processing script: Additional build complexity

**Reference**: Astro Content Collections documentation

### Research Summary

All technical decisions support constitution principles:
- **No new dependencies**: Vanilla JavaScript for all features
- **Build-time calculations**: Reading time calculated during static generation
- **Accessibility-first**: Following WCAG 2.1 AA and WAI-ARIA standards
- **Performance-conscious**: <2KB JavaScript, requestAnimationFrame throttling, Lighthouse validation
- **Simple & maintainable**: Standard patterns, well-documented, self-contained components

**No NEEDS CLARIFICATION remaining** - All technical unknowns resolved with documented decisions and rationale.

## Phase 1: Design & Data Model

### Data Model

#### Blog Post (Extended)

This is not a new entity but an extension of the existing blog post content collection with calculated metadata.

**Entity**: Blog Post
**Source**: Content collection at `src/content/blog/*.md`
**Schema**: Defined in `src/content/config.ts` (no changes required)

**Existing Frontmatter Fields**:
- `title`: string (required)
- `description`: string (required)
- `pubDate`: Date (required)
- `updatedDate`: Date (optional)
- `heroImage`: string (optional)
- `category`: string (optional)
- `featured`: boolean (optional, default false)

**Calculated Fields (Build-Time)**:
- `body`: string (raw markdown content, provided by Astro)
- `wordCount`: number (calculated from body.split(/\s+/).length)
- `readingTime`: number (calculated as Math.ceil(wordCount / 200))
- `readingTimeText`: string (formatted as "${readingTime} min read")

**Relationships**:
- None (static content, no relational data)

**State Transitions**:
- None (static content)

**Validation Rules**:
- `wordCount` must be ≥0
- `readingTime` must be ≥1 (minimum 1 min display)
- `readingTimeText` must follow format "{number} min read"

**Example Usage**:
```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const postsWithReading Time = posts.map(post => ({
  ...post,
  wordCount: post.body.split(/\s+/).length,
  readingTime: Math.max(1, Math.ceil(post.body.split(/\s+/).length / 200))
}));
---
```

#### Footer Configuration

**Entity**: Footer Links
**Source**: Component props/constants
**Storage**: Defined inline in `Footer.astro` component

**Fields**:
- `socialLinks`: Array of { name, url, icon, ariaLabel }
  - `name`: "LinkedIn" | "Twitter" | "GitHub" (string)
  - `url`: string (external URL)
  - `icon`: string (icon identifier or SVG path)
  - `ariaLabel`: string (for screen readers)
- `internalLinks`: Array of { name, url, description }
  - `name`: "Newsletter" | "RSS" (string)
  - `url`: string (internal or feed URL)
  - `description`: string (optional tooltip text)
- `copyright`: object
  - `year`: number (auto-calculated from new Date())
  - `owner`: string ("Warren4" or from site config)

**Validation Rules**:
- External links must include `target="_blank"` and `rel="noopener noreferrer"`
- All links must have descriptive aria-label or visible text
- Copyright year must auto-update (no hardcoded values)

**Example Structure**:
```astro
---
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/richard-warren',
    icon: 'linkedin-icon',
    ariaLabel: 'Richard Warren on LinkedIn'
  }
];

const internalLinks = [
  { name: 'Newsletter', url: '#newsletter', description: 'Subscribe to updates' },
  { name: 'RSS', url: '/rss.xml', description: 'Subscribe via RSS feed' }
];

const copyright = {
  year: new Date().getFullYear(),
  owner: 'Warren4'
};
---
```

#### Reading Progress State

**Entity**: Reading Progress (Client-Side State)
**Source**: Browser/DOM
**Storage**: None (ephemeral, calculated on demand)

**State Fields**:
- `scrollTop`: number (current vertical scroll position in pixels)
- `scrollHeight`: number (total document height in pixels)
- `clientHeight`: number (viewport height in pixels)
- `scrollPercent`: number (calculated progress, 0-100)

**Calculations**:
```javascript
scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100
```

**Validation Rules**:
- `scrollPercent` must be clamped between 0 and 100
- Updates throttled to requestAnimationFrame cycles (max 60fps)
- Progress bar width CSS property set to `${scrollPercent}%`

**State Transitions**:
- Initial state: 0% (page load)
- User scrolls: Recalculates percent on each scroll event (throttled)
- End of page: 100%
- User scrolls up: Decreases proportionally

### API Contracts

**N/A** - This is a frontend-only feature with no API endpoints. All data is:
- Static markdown files (blog posts)
- Build-time calculations (reading time)
- Client-side state (reading progress)
- Component-level configuration (footer links)

No contracts directory needed for this feature.

### Component Interfaces

#### ReadingProgress.astro

**Props**: None (automatically detects scroll on current page)

**Output**: Fixed-position progress bar div with inline script

**Usage**:
```astro
---
import ReadingProgress from '../components/ReadingProgress.astro';
---
<ReadingProgress />
```

#### SkipLink.astro

**Props**:
- `targetId`: string (default: "main-content")

**Output**: Accessible skip link that's visually hidden until focused

**Usage**:
```astro
---
import SkipLink from '../components/SkipLink.astro';
---
<SkipLink targetId="main-content" />
<main id="main-content">...</main>
```

#### Footer.astro (Enhanced)

**Props**: None (configuration defined internally)

**Output**: Enhanced footer with social links, newsletter link, RSS link, copyright

**Usage**: Already used in layouts, no changes to usage pattern

### Quickstart Guide

See `quickstart.md` (generated below).

## Complexity Tracking

No violations requiring justification.

The implementation aligns with all constitution principles:
- ✅ Uses existing Astro features
- ✅ No new dependencies
- ✅ Vanilla JavaScript for minimal client-side features
- ✅ Build-time calculations where possible
- ✅ Progressive enhancement (works without JS for core content)
- ✅ Maintains static site generation
- ✅ Does not affect Obsidian writing workflow

## Next Steps

1. ✅ Phase 0 Complete: Research findings documented above
2. ✅ Phase 1 Complete: Data model and component interfaces defined above
3. **Phase 2**: Run `/speckit.tasks` to generate detailed task breakdown
4. **Implementation**: Execute tasks in priority order (P1 → P2 → P3)
5. **Validation**: Run Lighthouse audit, accessibility tests, manual review
6. **Deployment**: Merge to master, GitHub Actions deploys automatically

---

**Phase 1 Complete** - Ready for `/speckit.tasks` command to generate implementation tasks.
