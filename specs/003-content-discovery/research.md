# Research: Content Discovery & UX Polish

**Feature**: 003-content-discovery
**Date**: November 4, 2024
**Purpose**: Technical research and decision documentation for implementing Phase 2 and 3 design review improvements

## Research Summary

This document consolidates research findings for five key technical areas: reading time calculation, reading progress indicators, accessibility patterns, performance measurement, and Astro content collection integration.

All decisions prioritize constitution principles: no new dependencies, build-time calculations, accessibility-first design, and maintaining Lighthouse 100/100 performance.

---

## 1. Reading Time Calculation

### Decision

Calculate reading time at build time using word count divided by 200 words per minute.

### Research Findings

**Industry Standards:**
- Medium.com: 265 WPM average
- Typical range for technical content: 200-300 WPM
- Conservative estimate: 200 WPM (chosen for this implementation)

**Calculation Method:**
```javascript
wordCount = post.body.split(/\s+/).length
readingTime = Math.ceil(wordCount / 200)
// Minimum: 1 min even for short posts
```

**When to Calculate:**
- Build time (during static site generation)
- Leverages Astro content collections `.body` property
- Zero runtime performance cost

### Alternatives Evaluated

| Alternative | Pros | Cons | Decision |
|------------|------|------|----------|
| Runtime calculation | Simple to implement | Performance cost on every page load | ❌ Rejected |
| Third-party library (reading-time npm) | Battle-tested algorithm | Adds dependency, violates constitution | ❌ Rejected |
| Store in frontmatter | No calculation needed at runtime | Manual updates required, error-prone | ❌ Rejected |
| Build-time calculation (chosen) | Zero runtime cost, automatic, no dependencies | Slightly complex build logic | ✅ Selected |

### Implementation Notes

- Use `.split(/\s+/)` for word count (splits on whitespace)
- Always round up with `Math.ceil()` (better to overestimate)
- Enforce minimum of 1 min even for 50-word posts
- Format as "{number} min read" for display

### References

- Medium Engineering blog on reading time calculation
- Content Marketing Institute WPM studies
- Astro Content Collections documentation

---

## 2. Reading Progress Bar

### Decision

Implement vanilla JavaScript scroll listener with requestAnimationFrame throttling for smooth 60fps updates.

### Research Findings

**Performance Pattern:**
```javascript
let ticking = false;

function updateProgress() {
  const scrollPercent = (scrollTop / scrollableHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateProgress);
    ticking = true;
  }
});
```

**Why This Pattern:**
- `requestAnimationFrame`: Syncs updates with browser paint cycle (~60fps)
- `ticking` flag: Prevents multiple updates queued per frame (debouncing)
- CSS `transition`: Smooths visual updates between frames
- Progressive enhancement: Content works fine without JavaScript

**Bundle Size:**
- HTML + CSS + JS: <1KB minified
- Well under 2KB target
- Inline in component (no external file)

### Alternatives Evaluated

| Alternative | Pros | Cons | Decision |
|------------|------|------|----------|
| Intersection Observer | Modern API, efficient | Overkill for simple scroll tracking | ❌ Rejected |
| Third-party library | Pre-built solution | Adds dependency, bundle bloat | ❌ Rejected |
| Passive event listener | Slightly better perf | Added complexity for minimal gain | ❌ Rejected |
| requestAnimationFrame (chosen) | Smooth updates, standard pattern, lightweight | Requires careful implementation | ✅ Selected |

### Performance Validation

- Maximum update frequency: 60fps (browser paint cycle)
- Scroll jank test: Chrome DevTools Performance panel
- Memory leak check: Proper cleanup in Astro component lifecycle
- Target: No impact on Lighthouse performance score

### References

- Google Web Fundamentals: Debouncing Scroll Events
- MDN: requestAnimationFrame documentation
- Paul Irish's blog on scroll performance

---

## 3. Accessibility Patterns

### Decision

Follow WAI-ARIA Authoring Practices 1.1 for skip links and WCAG 2.1 Level AA for focus indicators.

### Research Findings

**Skip-to-Content Link Requirements:**
- Must be first focusable element on page
- Visually hidden by default (positioned off-screen)
- Visible when focused (keyboard Tab key)
- Targets `<main id="main-content">` element
- Standard text: "Skip to content"
- Z-index high enough to appear above all content

**WCAG 2.1 AA Focus Indicator Requirements:**
- Minimum contrast ratio: 3:1 against adjacent colors
- Visible on ALL interactive elements
- Clear visual distinction from unfocused state
- Recommended implementation: 3px solid outline, 2px offset

**ARIA Labels for Footer:**
- External links need descriptive aria-label
- Example: `aria-label="Richard Warren on LinkedIn"`
- Combined with `target="_blank"` and `rel="noopener noreferrer"`

### Alternatives Evaluated

| Alternative | Pros | Cons | Decision |
|------------|------|------|----------|
| :focus-visible pseudo-class | Modern, intent-aware | Browser support still growing, needs fallback | 🟡 Future enhancement |
| Custom focus library | Consistent cross-browser | Adds dependency, violates constitution | ❌ Rejected |
| Standard CSS focus (chosen) | Universal support, simple, no dependencies | Slightly less sophisticated | ✅ Selected |
| Browser default focus | Zero effort | Poor visibility, inconsistent | ❌ Rejected |

### Implementation Examples

**Skip Link:**
```css
.skip-link {
  position: absolute;
  top: -40px; /* Hidden by default */
  left: 0;
  background: var(--accent);
  color: white;
  padding: 8px 16px;
  z-index: 100;
}

.skip-link:focus {
  top: 0; /* Visible when focused */
}
```

**Focus Indicators:**
```css
a:focus, button:focus, input:focus {
  outline: 3px solid var(--accent); /* Blue #2337ff */
  outline-offset: 2px;
}
```

### WCAG Success Criteria Met

- **2.4.1 Bypass Blocks** (Level A): Skip navigation mechanism provided
- **2.4.7 Focus Visible** (Level AA): Keyboard focus indicator is visible
- **1.4.11 Non-text Contrast** (Level AA): Focus indicator meets 3:1 contrast

### References

- WAI-ARIA Authoring Practices 1.1
- WCAG 2.1 Quick Reference
- WebAIM: Skip Navigation Links
- A11Y Project: Focus Indicators

---

## 4. Performance Impact Measurement

### Decision

Use Lighthouse CLI in automated test suite to validate performance remains 100/100.

### Research Findings

**Lighthouse Integration:**
```javascript
// tests/pre-publish.js addition
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function validatePerformance() {
  const chrome = await chromeLauncher.launch();
  const result = await lighthouse('http://localhost:4321', {
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility']
  });

  await chrome.kill();

  const scores = result.lhr.categories;
  if (scores.performance.score < 1.0) {
    throw new Error('Performance degraded');
  }
}
```

**Metrics to Monitor:**
- **Performance Score**: Must be 100/100
- **FCP (First Contentful Paint)**: <1.8s (green)
- **LCP (Largest Contentful Paint)**: <2.5s (green)
- **TBT (Total Blocking Time)**: <200ms (green)
- **CLS (Cumulative Layout Shift)**: <0.1 (green)
- **Accessibility Score**: ≥90 (allowing minor issues)

### Alternatives Evaluated

| Alternative | Pros | Cons | Decision |
|------------|------|------|----------|
| WebPageTest API | Detailed waterfall analysis | Requires external service, rate limits | ❌ Rejected |
| Custom metrics | Tailored to specific needs | Reinventing wheel, maintenance burden | ❌ Rejected |
| Manual testing only | Simple | Not repeatable, error-prone | ❌ Rejected |
| Lighthouse CLI (chosen) | Standard tool, automatable, comprehensive | Requires Chrome in CI | ✅ Selected |

### Test Strategy

**Pre-Commit:**
- Manual Lighthouse audit in Chrome DevTools
- Visual inspection of progress bar performance

**Pre-Publish:**
- Automated Lighthouse test in `npm run test`
- Fails build if performance drops below 100

**Post-Deploy:**
- Manual spot check on live site
- Real User Monitoring (optional future enhancement)

### Expected Impact

| Feature | Expected Impact | Validation Method |
|---------|----------------|-------------------|
| Reading time calculation | Zero (build-time only) | Build time measurement |
| Progress bar JavaScript | <50ms load, zero scroll impact | Lighthouse TBT, visual inspection |
| Footer links | Zero (static HTML) | Lighthouse score |
| Focus styles | Zero (CSS only) | Lighthouse score |
| Skip link | Zero (CSS only, single element) | Lighthouse score |

### References

- Google Lighthouse documentation
- Web Vitals initiative
- Chrome DevTools Performance profiling

---

## 5. Astro Content Collections Integration

### Decision

Use Astro's `getCollection()` API with `.body` property to access post content for word count calculation at build time.

### Research Findings

**Astro Content Collections API:**
```astro
---
import { getCollection } from 'astro:content';

// Get all blog posts
const allPosts = await getCollection('blog');

// Calculate reading time for each post
const postsWithReadingTime = allPosts.map(post => {
  const wordCount = post.body.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  return { ...post, wordCount, readingTime };
});
---
```

**What's Available:**
- `post.data.*`: Frontmatter fields (title, description, pubDate, etc.)
- `post.body`: Raw markdown content as string
- `post.slug`: URL-friendly slug
- `post.id`: File name (without extension)

**Where to Calculate:**
- Blog listing page (`src/pages/blog/index.astro`)
- Individual blog post page (`src/pages/blog/[...slug].astro`)
- Homepage (if showing posts)

**Performance:**
- Calculation happens once at build time
- Result is static HTML (no runtime calculation)
- Can be memoized if needed for multiple pages

### Alternatives Evaluated

| Alternative | Pros | Cons | Decision |
|------------|------|------|----------|
| Store in frontmatter | No calculation needed | Manual updates, maintenance burden | ❌ Rejected |
| Custom Astro integration | Centralized logic | Over-engineering, added complexity | ❌ Rejected |
| Pre-processing script | Runs before build | Additional build step, complexity | ❌ Rejected |
| getCollection + .body (chosen) | Built-in, type-safe, build-time | Requires calculation in each page | ✅ Selected |

### Implementation Pattern

**Reusable Helper Function:**
```javascript
// src/utils/readingTime.js (optional)
export function calculateReadingTime(content) {
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return {
    wordCount,
    minutes,
    text: `${minutes} min read`
  };
}
```

**Usage in Page:**
```astro
---
import { getCollection } from 'astro:content';
import { calculateReadingTime } from '../utils/readingTime';

const posts = (await getCollection('blog')).map(post => ({
  ...post,
  ...calculateReadingTime(post.body)
}));
---
```

### Schema Considerations

**Current Schema** (`src/content/config.ts`):
- No changes required
- Reading time is calculated, not stored
- Frontmatter remains clean and content-focused

**Why Not Store in Frontmatter:**
- Violates "single source of truth" principle
- Requires manual updates when post edited
- Prone to staleness and errors
- Build-time calculation is automatic and always accurate

### References

- Astro Content Collections documentation
- Astro Build Performance best practices

---

## Cross-Cutting Concerns

### Browser Compatibility

**Target Browsers:**
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions (iOS and macOS)
- No IE11 support required (static site, modern features)

**Features Used:**
- `requestAnimationFrame`: Supported in all modern browsers
- CSS Custom Properties: Supported in all modern browsers
- CSS `outline-offset`: Supported in all modern browsers
- ES6 JavaScript: Transpiled by Astro if needed

### Mobile Considerations

**Progress Bar:**
- Fixed positioning works on mobile
- Touch scrolling triggers updates correctly
- Bar height (3px) is appropriately sized for mobile

**Focus Indicators:**
- Touch interactions don't trigger focus (correct behavior)
- Keyboard users on mobile tablets get focus indicators

**Footer Links:**
- Touch targets meet 44x44px minimum (WCAG 2.1)
- External links open in new tab (mobile-friendly)

### Testing Strategy

**Manual Testing:**
- Chrome DevTools device emulation
- Real device testing (iPhone, Android)
- Keyboard-only navigation
- Screen reader testing (VoiceOver, NVDA)

**Automated Testing:**
- Lighthouse CI in pre-publish script
- Visual regression testing (optional)
- Accessibility linting (can be added)

---

## Conclusion

All research findings support a unified technical approach:

✅ **No new dependencies** - Pure vanilla JavaScript and CSS
✅ **Build-time calculations** - Reading time computed during static generation
✅ **Accessibility-first** - WCAG 2.1 AA compliance, WAI-ARIA patterns
✅ **Performance-conscious** - Lighthouse validation, minimal JavaScript
✅ **Constitution-aligned** - Simple, maintainable, well-documented

**Zero unresolved questions** - Ready for Phase 1 design and implementation.

---

**Research Complete**: November 4, 2024
**Next Phase**: Phase 1 - Data model and component design (see data-model.md)
