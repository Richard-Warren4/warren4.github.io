# Design Review System

Automated screenshot capture and design analysis workflow for the Warren4 blog using Claude Code's vision capabilities.

## Overview

This system implements a three-phase design review process:

1. **Screenshot Capture** - Automated Playwright-based screenshot capture at multiple viewports
2. **Design Analysis** - Interactive analysis with Claude Code's vision capabilities
3. **Report Generation** - Structured Markdown report with recommendations

## Quick Start

### Phase 1: Capture Screenshots

Capture screenshots of the production site:

```bash
npm run design:capture
```

This will:
- Capture 4 pages (homepage, about, blog index, blog post) at 3 viewports (mobile, tablet, desktop)
- Save 12 total screenshots to a temporary directory
- Display screenshot paths for Claude Code analysis
- Complete in under 2 minutes (per spec SC-001)

**Options**:
```bash
# Capture from localhost (for testing changes)
npm run design:capture -- --local

# Capture from custom URL
npm run design:capture -- --url https://staging.warren4.co.uk
```

### Phase 2: Analyze with Claude Code

After screenshots are captured, the script outputs paths to all captured images and a suggested prompt.

**To analyze with Claude Code**:

1. Use Claude Code's Read tool to view each screenshot:
   ```
   Read the screenshot at [path-from-output]
   ```

2. Use the prompt template from `analysis-prompt-template.md` or the quick prompt from capture output:
   ```
   Please analyze these screenshots for design quality:
   - Typography (readability, hierarchy, sizing)
   - Color scheme (contrast, accessibility, branding)
   - Spacing and layout (whitespace, density, alignment)
   - Visual hierarchy (attention flow, importance signals)
   - Cross-device responsiveness (mobile/tablet/desktop)
   - Accessibility (WCAG AA compliance)

   Reference: docs/DESIGN-PRINCIPLES.md and Constitution Principle VI
   ```

3. Claude Code will provide structured feedback covering:
   - 5 design dimensions (typography, color, spacing, layout, hierarchy)
   - Cross-device analysis
   - Accessibility observations
   - Prioritized improvement recommendations

### Phase 3: Generate Report (Coming Soon)

Save Claude Code's analysis as a structured Markdown report:

```bash
npm run design:report
```

Report will be saved to `specs/001-design-review/analysis-YYYY-MM-DD.md`

## Files

- **config.js** - Configuration for viewports, pages, retry logic
- **utils.js** - Utility functions (temp directory, retry with backoff, formatting)
- **types.js** - TypeScript type definitions (JSDoc)
- **capture-screenshots.js** - Main screenshot capture script
- **analysis-prompt-template.md** - Comprehensive prompt template for Claude Code analysis
- **README.md** - This file

## Design Analysis Framework

The analysis follows a structured framework covering:

### 1. Typography Assessment
- Font sizes, line height, character spacing
- Heading hierarchy (H1-H6)
- Constitution compliance: 18-20px body text, 1.5-1.75 line height
- Line length: 50-75 characters

### 2. Color Scheme Assessment
- WCAG AA contrast ratios (4.5:1 minimum)
- Color palette cohesion
- Branding alignment
- Accessibility compliance

### 3. Spacing & Layout Assessment
- Whitespace and breathing room
- Grid alignment and consistency
- Responsive behavior across viewports
- Mobile-first design principles

### 4. Visual Hierarchy Assessment
- Attention flow (F-pattern/Z-pattern)
- Focal points and CTAs
- Size/weight relationships
- Newsletter signup prominence

### 5. Cross-Device Responsiveness
- Mobile (375px): Touch targets, readability without zoom
- Tablet (768px): Effective medium viewport usage
- Desktop (1920px): Max-width constraints, line length
- Breakpoint transitions

### 6. Accessibility Observations
- Color contrast measurements
- Text readability
- Touch target sizes (44px minimum)
- Semantic heading structure

## Configuration

### Viewports

Defined in `config.js`:
- **Mobile**: 375px × 812px (iPhone X)
- **Tablet**: 768px × 1024px (iPad)
- **Desktop**: 1920px × 1080px (Full HD)

### Pages

Defined in `config.js`:
- Homepage (/)
- About Page (/about)
- Blog Index (/blog)
- Blog Post: Welcome (/blog/welcome)

**To add more pages**: Edit `PAGES` array in `config.js`

### Retry Logic

Per spec requirements:
- Max 3 attempts (initial + 2 retries)
- Exponential backoff: 1s, 2s delays
- Partial success: Continue with successfully captured pages

## Architecture

### Screenshot Capture Flow

```
1. Parse CLI arguments (URL, --local flag)
2. Ensure temp directory exists
3. Launch Chromium browser
4. For each page:
   For each viewport:
     - Set viewport size
     - Navigate to page (with timeout)
     - Wait for stabilization (1s)
     - Capture full-page screenshot
     - Retry on failure with backoff
     - Generate ScreenshotArtifact metadata
5. Close browser
6. Display summary and Claude Code prompt
```

### Interactive Analysis Flow

```
1. Run screenshot capture
2. Review screenshot paths in output
3. Provide screenshots to Claude Code via Read tool
4. Use analysis-prompt-template.md for comprehensive analysis
5. Claude Code analyzes all screenshots
6. Claude Code provides structured feedback
7. Save analysis as Markdown report
```

## Error Handling

- **Network timeouts**: 30-second timeout per page, retry with backoff
- **Failed captures**: Continue with successful captures, report failures
- **Partial success**: Generate analysis with available screenshots
- **All failures**: Exit with error code 1

## Best Practices

### When to Run

✅ **Recommended**:
- After major design changes
- Before significant releases
- When addressing accessibility concerns
- Quarterly design reviews

❌ **Not Recommended**:
- In CI/CD pipeline (adds latency)
- After every commit (infrequent is better)
- On feature branches (wait until merged)

### Interpreting Results

- Use recommendations as input, not absolute truth
- Cross-reference with `docs/DESIGN-PRINCIPLES.md`
- Claude Code has access to Constitution Principle VI
- Validate findings with manual review
- Consider brand guidelines and business context

### Priority Recommendations

- **High**: Start here (readability, accessibility, mobile UX)
- **Medium**: Next iteration (aesthetics, consistency)
- **Low**: As time permits (polish)

## Success Criteria Validation

Per spec.md, validate these criteria:

- **SC-001**: ✓ All 4 pages × 3 viewports (12 screenshots) captured in < 2 minutes
- **SC-002**: ✓ Analysis covers 5 design dimensions
- **SC-003**: ✓ At least 5 specific recommendations with priorities
- **SC-004**: ✓ Each recommendation includes clear rationale
- **SC-005**: ✓ Screenshots show full page without cut-off
- **SC-006**: ✓ Analysis consistent across all pages
- **SC-007**: ✓ Recommendations practical without complete redesign
- **SC-008**: ✓ Report saved as Markdown with date stamp

## Troubleshooting

### Screenshots Not Capturing

**Issue**: Navigation timeout exceeded

**Solutions**:
- Check network connectivity
- Verify website is accessible
- Try again (retry logic should handle transient issues)
- For localhost: Ensure dev server is running (`npm run dev`)

### Image Quality Issues

**Issue**: Screenshots missing content or cut off

**Solutions**:
- Check `STABILIZATION_DELAY` in config.js (increase if needed)
- Verify page loads completely before screenshot
- Check for JavaScript errors preventing page load

### Analysis Quality Issues

**Issue**: Claude Code analysis lacking detail

**Solutions**:
- Use full prompt template from `analysis-prompt-template.md`
- Reference design principles explicitly
- Provide specific context about what to analyze
- Ensure all screenshots are provided

## Development

### Adding New Pages

Edit `config.js`:

```javascript
const PAGES = [
  // ... existing pages
  {
    id: 'new-page',
    name: 'New Page Title',
    path: '/new-page'
  }
];
```

### Adjusting Viewports

Edit `config.js`:

```javascript
const VIEWPORTS = [
  {
    width: 414,      // iPhone Pro Max
    height: 896,
    label: 'mobile-large'
  }
  // ... existing viewports
];
```

### Customizing Retry Logic

Edit `config.js`:

```javascript
const RETRY_CONFIG = {
  maxAttempts: 5,           // More attempts
  delays: [1000, 2000, 4000] // Different backoff pattern
};
```

## References

- **Specification**: `specs/001-design-review/spec.md`
- **Implementation Plan**: `specs/001-design-review/plan.md`
- **Data Model**: `specs/001-design-review/data-model.md`
- **Design Principles**: `docs/DESIGN-PRINCIPLES.md`
- **Constitution**: `.specify/memory/constitution.md` (Principle VI)

## License

Part of Warren4 blog project - See repository root for license information.
