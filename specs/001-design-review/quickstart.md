# Quickstart Guide: Design Review Tool

**Feature**: 001-design-review
**Last Updated**: 2025-11-04

## Overview

This guide explains how to run the automated design review tool that captures screenshots of the Warren4 blog and generates AI-powered design analysis and improvement recommendations.

---

## Prerequisites

### 1. Software Requirements
- Node.js 18+ installed
- npm or yarn package manager
- Existing project dependencies installed (`npm install`)
- Claude Code CLI installed and running

### 2. Verify Playwright Installation

Playwright should already be installed in the project:

```bash
# Verify Playwright is installed
npm list @playwright/test

# If needed, install Playwright browsers
npx playwright install chromium
```

**Note**: No additional dependencies or API keys required for this feature

---

## Quick Start

### Run Design Review

**Step 1: Capture Screenshots**
```bash
npm run design:capture
```

This command:
1. ✅ Captures screenshots of 4 pages × 3 viewports (12 total)
2. 📁 Saves to temporary directory with clear file naming
3. 📋 Outputs screenshot paths to console

**Expected Duration**: 1-2 minutes

**Step 2: Analyze with Claude Code**

After screenshots are captured, use Claude Code to analyze them:

```
Please analyze the screenshots at [paths from step 1] and provide:
1. Design assessment covering typography, color, spacing, layout, hierarchy
2. Cross-device analysis (mobile/tablet/desktop)
3. Accessibility observations
4. Prioritized improvement recommendations

Reference: Design principles in docs/DESIGN-PRINCIPLES.md and Constitution Principle VI
```

**Step 3: Generate Report**

Save Claude Code's analysis to:
`specs/001-design-review/analysis-YYYY-MM-DD.md`

---

## Usage Examples

### Basic Usage
```bash
# Capture screenshots (default: production site)
npm run design:capture
```

### Run Against Local Development
```bash
# First, start dev server in separate terminal
npm run dev

# Then capture screenshots from localhost
npm run design:capture -- --local
```

### Custom URL
```bash
# Capture from any URL
npm run design:capture -- --url https://custom-domain.com
```

### Keep Screenshots for Review
```bash
# Keep screenshots after analysis (default behavior)
npm run design:capture

# Screenshots remain in temp directory until manually deleted
# or until next capture run
```

---

## Understanding the Output

### Report Structure

The generated report (`analysis-YYYY-MM-DD.md`) contains:

1. **Frontmatter**: Metadata (YAML)
   - Date, pages analyzed, screenshot counts
   - Success/failure metrics

2. **Executive Summary**: High-level findings
   - Overall design quality assessment
   - Major themes identified

3. **Pages Analyzed**: List of pages reviewed
   - URLs and viewport information

4. **Design Assessment**: Detailed analysis
   - Typography, color, spacing, layout, hierarchy
   - Strengths and weaknesses for each dimension

5. **Improvement Recommendations**: Prioritized action items
   - **High Priority**: Affects readability, accessibility, mobile UX
   - **Medium Priority**: Enhances aesthetics, consistency
   - **Low Priority**: Nice-to-have polish

   Each recommendation includes:
   - Clear title and description
   - Rationale (why it matters)
   - Expected impact (what improves)
   - Implementation guide (how to do it)

6. **Cross-Device Analysis**: Mobile vs Tablet vs Desktop
   - Responsive design evaluation
   - Mobile-first compliance

7. **Accessibility Observations**: WCAG compliance
   - Color contrast measurements
   - Readability assessment

8. **Appendix**: Technical details
   - Failed captures (if any)
   - Analysis duration, token usage

---

## Troubleshooting

### Error: Failed to Capture Screenshots

**Symptom**:
```
Error: Navigation timeout exceeded: 30000ms
```

**Possible Causes**:
- Network connectivity issues
- Website is down or slow
- Firewall blocking requests

**Solutions**:
1. Check network connection
2. Verify website is accessible in browser
3. Try again (automatic retry should handle transient issues)
4. If localhost: ensure dev server is running (`npm run dev`)

---

### Warning: Some Screenshots Failed

**Symptom**:
Console shows "Failed to capture: [page-name]"

**Impact**: Partial screenshot set (some pages missing)

**Solutions**:
1. Check which pages failed (listed in console output)
2. Verify those URLs are accessible
3. Re-run capture (failed pages will be retried)
4. If persistent, check page-specific issues (authentication, slow load)

---

## Advanced Usage

### Analyzing Specific Pages Only

Create custom page list (requires code modification):

```javascript
// tests/design-review/config.js
export const pages = [
  { id: 'homepage', name: 'Homepage', url: 'https://www.warren4.co.uk/' },
  { id: 'about', name: 'About', url: 'https://www.warren4.co.uk/about' },
  // Add or remove pages as needed
];
```

### Custom Viewports

Modify viewport sizes (not recommended, spec uses standard sizes):

```javascript
// tests/design-review/config.js
export const viewports = [
  { width: 375, height: 812, label: 'mobile' },    // iPhone X
  { width: 768, height: 1024, label: 'tablet' },   // iPad
  { width: 1920, height: 1080, label: 'desktop' }, // Full HD
];
```

### Review Screenshots Before Analysis

To verify screenshot quality before analysis:

```bash
# Capture screenshots
npm run design:capture

# Open temp directory to review
open /tmp/warren4-design-review  # macOS
xdg-open /tmp/warren4-design-review  # Linux
explorer /tmp/warren4-design-review  # Windows
```

---

## Best Practices

### When to Run Design Review

**Recommended Timing**:
- ✅ After major design changes (new components, layout updates)
- ✅ Before significant releases (quarterly reviews)
- ✅ When addressing accessibility concerns
- ✅ As part of design iteration process

**Not Recommended**:
- ❌ In CI/CD pipeline (adds latency, costs API credits)
- ❌ After every commit (analysis is expensive, infrequent changes)
- ❌ On feature branches (wait until merged to main)

### Interpreting Results

**Claude Code Analysis is Contextual**:
- Use recommendations as input, not absolute truth
- Cross-reference with design principles document (docs/DESIGN-PRINCIPLES.md)
- Claude Code has access to Constitution Principle VI
- Validate findings with manual review
- Consider brand guidelines and business context

**Priority Recommendations First**:
- Start with High priority items (readability, accessibility, mobile)
- Medium priority for next iteration
- Low priority as time permits

### Version Control

**Commit Analysis Reports**:
```bash
git add specs/001-design-review/analysis-2025-11-04.md
git commit -m "docs: add design review analysis 2025-11-04"
```

**Track Over Time**:
- Keep historical reports to see progress
- Compare recommendations across analyses
- Measure improvement (consistency scores, etc.)

---

## Configuration Reference

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DESIGN_REVIEW_URL` | No | https://www.warren4.co.uk | Base URL to capture |

### npm Scripts

| Script | Description |
|--------|-------------|
| `npm run design:capture` | Capture screenshots for analysis |

**Note**: Analysis is performed interactively with Claude Code, not automated.

---

## Cost Estimation

**Per Analysis Run**:
- Screenshot capture: ~$0 (local compute)
- Claude Code analysis: ~$0 (included with Claude Code subscription)

**Monthly Cost**: $0 (no additional costs beyond Claude Code subscription)

---

## Support & Feedback

### Getting Help

1. **Check this guide first** for common issues
2. **Review research.md** for technical decisions
3. **Check spec.md** for requirements and success criteria
4. **Examine generated reports** for error details in appendix

### Providing Feedback

**If analysis quality is poor**:
- Review prompt used when asking Claude Code
- Reference design principles document more explicitly
- Validate screenshots are high quality
- Provide more specific context about what to analyze

**If feature requests**:
- Document desired capability
- Consider Constitution compliance (Simple & Maintainable principle)
- Propose in feature spec or plan updates

---

## Next Steps After Review

1. **Read the Report**: Review generated analysis-YYYY-MM-DD.md
2. **Prioritize Changes**: Start with High priority recommendations
3. **Validate Findings**: Cross-check with manual review and design principles
4. **Implement**: Make design changes based on recommendations
5. **Re-run Analysis**: After changes, run again to measure improvement
6. **Track Progress**: Compare reports over time to see evolution

---

**Quickstart Complete**
**For Questions**: See [spec.md](./spec.md) or [plan.md](./plan.md)
