# Research: Website Design Review & Improvement Analysis

**Feature**: 001-design-review
**Date**: 2025-11-04
**Status**: Complete

## Overview

This document captures technology research and decision-making for the automated design review feature. The goal is to select appropriate tools and patterns for screenshot capture, AI-powered design analysis, and report generation.

---

## 1. Screenshot Capture Technology

### Decision: Playwright

**Rationale**:
- Already installed in project (@playwright/test 1.56.1)
- Proven capability for full-page screenshots
- Built-in support for multiple viewport sizes
- Handles dynamic content and page load waiting
- Cross-browser support (using Chromium)
- Excellent retry and timeout mechanisms

**Alternatives Considered**:
- **Puppeteer**: Similar capabilities but would require new dependency
- **Sharp**: Image manipulation only, not browser automation
- **Manual screenshots**: Not automated, doesn't meet requirements

**Implementation Pattern**:
```javascript
// Playwright screenshot capture
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });
await page.goto('https://www.warren4.co.uk', { waitUntil: 'networkidle' });
await page.screenshot({
  path: 'screenshot.png',
  fullPage: true
});
```

**Viewport Sizes** (from spec clarifications):
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1920px width

---

## 2. AI Analysis Method for Design Review

### Decision: Claude Code Direct Vision Analysis

**Rationale**:
- Claude Code has built-in vision capabilities for analyzing screenshots
- No external API dependencies or API keys required
- Excellent at structured text output (design analysis, recommendations)
- Already available in the development environment
- Zero cost for analysis runs
- Interactive analysis within the development workflow

**Alternatives Considered**:
- **External AI API (Anthropic, OpenAI)**: Would require API keys, add complexity, incur costs
- **Rule-based heuristics**: Cannot provide nuanced design feedback like AI

**Implementation Pattern**:
```javascript
// Playwright captures screenshots to temporary directory
const screenshots = await captureScreenshots(pages, viewports);

// Claude Code analyzes screenshots interactively
// Developer runs: npm run design:review
// Script outputs: "Screenshots captured. Please analyze with Claude Code."
// Claude Code reads screenshots via Read tool and provides analysis
```

**Workflow**:
1. Playwright script captures screenshots to temp directory
2. Script outputs paths to captured screenshots
3. Claude Code uses Read tool to view screenshots
4. Claude Code provides design analysis interactively
5. Script generates markdown report from analysis
6. Cleanup temp files

---

## 3. Retry Logic Implementation

### Decision: Playwright Built-in + Custom Exponential Backoff

**Rationale**:
- Spec requires 2 retries with exponential backoff (1s, 2s)
- Playwright has built-in retry mechanisms
- Need custom wrapper for exponential backoff timing
- Must report partial results if some pages fail

**Implementation Pattern**:
```javascript
async function captureWithRetry(url, viewport, maxRetries = 2) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await captureScreenshot(url, viewport);
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000; // 1s, 2s
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  return { error: lastError, url, viewport };
}
```

**Failure Handling**:
- Collect all failures
- Continue with successful captures
- Report failures clearly in output
- Include failure count in analysis report

---

## 4. Report Format and Structure

### Decision: Markdown with YAML Frontmatter

**Rationale**:
- Aligns with Constitution Principle II (Standard Markdown)
- Human-readable and version-controllable
- Can be opened in Obsidian, GitHub, or any Markdown viewer
- YAML frontmatter provides structured metadata

**Report Structure**:
```markdown
---
title: Design Analysis Report
date: 2025-11-04
pages_analyzed: 4
viewports: [375px, 768px, 1920px]
total_screenshots: 12
failed_captures: 0
---

# Design Analysis Report

**Generated**: 2025-11-04
**Website**: https://www.warren4.co.uk

## Executive Summary

[High-level findings]

## Pages Analyzed

- Homepage (/, 3 viewports)
- About (/about, 3 viewports)
- Blog Index (/blog, 3 viewports)
- Blog Post (/blog/welcome, 3 viewports)

## Design Assessment

### Typography
[Analysis]

### Color Scheme
[Analysis]

### Spacing & Layout
[Analysis]

### Visual Hierarchy
[Analysis]

### Consistency
[Analysis]

## Improvement Recommendations

### High Priority
1. [Recommendation with rationale]

### Medium Priority
1. [Recommendation with rationale]

### Low Priority
1. [Recommendation with rationale]

## Cross-Device Analysis

[Mobile vs Tablet vs Desktop comparison]

## Accessibility Observations

[Color contrast, readability findings]

## Appendix

**Failed Captures**: [List any failures]
**Analysis Duration**: [Time taken]
```

**File Naming**: `analysis-YYYY-MM-DD.md` (one per day, timestamped)

---

## 5. Script Orchestration Strategy

### Decision: Simplified Screenshot Capture + Interactive Analysis

**Rationale**:
- Claude Code provides interactive analysis (no need for separate analyze script)
- Simpler workflow with fewer moving parts
- Developer remains in control of analysis process
- No API orchestration complexity

**Scripts**:
1. **capture-screenshots.js**
   - Uses Playwright
   - Captures all pages × all viewports
   - Saves to temp directory with clear naming
   - Outputs paths to console for Claude Code to analyze
   - Returns array of screenshot paths + metadata

2. **Interactive Analysis** (Claude Code)
   - Developer provides screenshots to Claude Code
   - Claude Code uses Read tool to view each screenshot
   - Provides structured analysis following prompt guidelines
   - Developer captures analysis in markdown format

3. **generate-report.js** (optional)
   - Takes analysis text
   - Formats as structured Markdown
   - Saves to specs/001-design-review/analysis-YYYY-MM-DD.md
   - Cleans up temp screenshots

**Main Orchestrator** (npm script):
```json
{
  "scripts": {
    "design:capture": "node tests/design-review/capture-screenshots.js"
  }
}
```

---

## 6. Temporary File Management

### Decision: OS Temp Directory + Cleanup

**Rationale**:
- Spec clarifies screenshots go to temp directory
- Screenshots deleted after analysis
- No repository bloat
- Works across operating systems

**Implementation**:
```javascript
import os from 'os';
import path from 'path';
import fs from 'fs-extra';

const tempDir = path.join(os.tmpdir(), 'warren4-design-review');
await fs.ensureDir(tempDir);

// ... capture screenshots to tempDir ...

// After analysis complete:
await fs.remove(tempDir);
```

**Cleanup Strategy**:
- Always cleanup in `finally` block
- Handle interrupts gracefully (SIGINT handler)
- Log cleanup actions for transparency

---

## 7. Prompt Engineering for Design Analysis

### Decision: Structured Multi-Stage Prompts

**Rationale**:
- Claude performs best with clear, structured instructions
- Breaking analysis into stages ensures completeness
- Referencing constitution principles ensures alignment

**Prompt Strategy**:

**Stage 1: Per-Page Analysis**
```
You are a professional web design consultant analyzing a Product Management blog.

Analyze this screenshot of [PAGE_NAME] at [VIEWPORT_SIZE].

Evaluate these dimensions:
1. Typography (readability, hierarchy, sizing)
2. Color Scheme (contrast, branding, accessibility)
3. Spacing & Whitespace (breathing room, density)
4. Layout (grid, alignment, consistency)
5. Visual Hierarchy (attention flow, importance signals)

For each dimension, note:
- What works well
- What could be improved
- Specific measurements where relevant (font sizes, spacing)

Reference: The site should meet WCAG AA standards (4.5:1 contrast for normal text)
and mobile-first design principles (readable without zooming).
```

**Stage 2: Cross-Page Synthesis**
```
Given these individual page analyses, provide:

1. Consistency Assessment: How consistent is design across pages?
2. Mobile Responsiveness: How well does design adapt across viewports?
3. Brand Cohesion: Does design convey professional PM blog aesthetic?

Identify patterns (good and bad) that appear across multiple pages.
```

**Stage 3: Recommendations**
```
Generate 5-10 prioritized improvement recommendations:

For each recommendation:
- **Title**: Clear, actionable (e.g., "Increase body text size to 20px")
- **Priority**: High/Medium/Low
- **Rationale**: Why this matters (reference design principles, UX best practices)
- **Expected Impact**: What improves for users
- **Implementation**: How to make the change (be specific)

Priority guidelines:
- High: Affects readability, accessibility, or mobile UX
- Medium: Enhances aesthetics or consistency
- Low: Nice-to-have polish

Recommendations must be practical without complete redesign.
```

**Constitution Integration**:
- Reference Principle VI (Professional Design & User Experience) in prompts
- Specific checks: 18-20px body text, 1.5-1.75 line height, 50-75 char line length
- Newsletter CTA placement and optimization
- Mobile-first validation

---

## 8. Performance Optimization

### Decision: Parallel Screenshot Capture

**Rationale**:
- 12 screenshots (4 pages × 3 viewports) can be slow sequentially
- Playwright supports parallel execution
- Must stay within reasonable limits (avoid overwhelming browser)

**Implementation**:
```javascript
// Capture pages in parallel (limit concurrency)
const pLimit = (await import('p-limit')).default;
const limit = pLimit(3); // Max 3 concurrent browsers

const screenshotPromises = pages.flatMap(page =>
  viewports.map(viewport =>
    limit(() => captureWithRetry(page.url, viewport))
  )
);

const results = await Promise.all(screenshotPromises);
```

**Performance Targets**:
- Screenshot capture: < 2 minutes (per spec SC-001)
- AI analysis: 2-3 minutes (depends on API latency)
- Total: < 5 minutes for complete run

---

## 9. Error Handling Strategy

### Decision: Graceful Degradation + Clear Reporting

**Rationale**:
- Some pages might fail to load (network issues, timeouts)
- AI API might have transient errors
- Users need clear feedback on what succeeded/failed

**Error Categories**:

1. **Screenshot Failures**
   - Retry with backoff (handled above)
   - Continue with successful captures
   - Report in "Failed Captures" section of report

2. **AI API Errors**
   - Retry API calls once (for transient issues)
   - If persistent failure, abort with clear error message
   - Don't generate partial report without analysis

3. **File I/O Errors**
   - Fail fast with clear error message
   - Check permissions early
   - Provide helpful troubleshooting hints

**Error Messages**:
```javascript
class DesignReviewError extends Error {
  constructor(message, stage, details) {
    super(message);
    this.stage = stage; // 'capture', 'analyze', 'generate'
    this.details = details;
  }
}

// Usage
throw new DesignReviewError(
  'Failed to capture screenshot',
  'capture',
  { url: 'https://example.com', viewport: '1920px', error: originalError }
);
```

---

## 10. Testing Strategy

### Decision: Manual Validation + Smoke Tests

**Rationale**:
- AI outputs are non-deterministic, hard to unit test
- Screenshot quality best validated manually
- Can create smoke tests for core functionality

**Test Approach**:

1. **Manual Validation**
   - Run script against live site
   - Review generated screenshots for quality
   - Evaluate AI analysis for relevance and accuracy
   - Check report formatting and completeness

2. **Smoke Tests**
   - Test Playwright can capture screenshots
   - Test API key validation
   - Test temp directory creation/cleanup
   - Test Markdown generation

3. **Integration Test**
   - Full end-to-end run
   - Verify report generated with all sections
   - Check file naming convention
   - Validate cleanup occurred

**No automated tests for**:
- Quality of AI analysis (subjective)
- Accuracy of design recommendations (requires expert review)

---

## Dependencies Summary

**Required Packages**:
```json
{
  "devDependencies": {
    "@playwright/test": "^1.56.1",  // Already installed
    "fs-extra": "^11.2.0"            // File operations (optional)
  }
}
```

**Environment Variables**:
None required - Claude Code analysis is interactive and doesn't need API keys.

**Total Added Dependencies**: 0 (or 1 if fs-extra added for convenience)
**Total Size Impact**: Minimal (fs-extra ~50KB compressed, optional)

---

## Risk Analysis

### Technical Risks

1. **Screenshot Rendering Differences**
   - **Risk**: Site might look different in Playwright vs real browsers
   - **Mitigation**: Playwright uses real Chromium, rendering is accurate
   - **Validation**: Manual review of initial screenshots

2. **Analysis Quality Variability**
   - **Risk**: Interactive analysis quality depends on prompt quality
   - **Mitigation**: Use structured prompts based on design principles document
   - **Validation**: Cross-reference with Constitution Principle VI

### Operational Risks

1. **Manual Process**
   - **Risk**: Interactive analysis requires developer involvement
   - **Mitigation**: This is intentional - keeps developer in control
   - **Benefit**: Zero cost, no API dependencies, immediate feedback

2. **Consistency**
   - **Risk**: Different analyses might vary in format
   - **Mitigation**: Use structured prompt templates, document format in quickstart
   - **Detection**: Review reports follow same structure

---

## Conclusion

All research complete. Technology choices align with:
- ✅ Existing project stack (JavaScript/Playwright)
- ✅ Constitution principles (Standard Markdown, Simple & Maintainable)
- ✅ Feature requirements (AI analysis, multi-viewport, automated)
- ✅ Performance targets (< 5 minutes total)

**Ready for Phase 1**: Data model and quickstart documentation.

---

**Research Complete**: 2025-11-04
**Next Phase**: [data-model.md](./data-model.md)
