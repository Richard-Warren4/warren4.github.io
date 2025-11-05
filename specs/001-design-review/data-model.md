# Data Model: Website Design Review & Improvement Analysis

**Feature**: 001-design-review
**Date**: 2025-11-04
**Status**: Complete

## Overview

This document defines the data structures used throughout the design review system. Since this is a script-based tool (not a persistent database application), these are JavaScript/TypeScript object schemas used for passing data between script stages.

---

## Core Entities

### 1. ScreenshotArtifact

Represents a captured screenshot with metadata.

**Purpose**: Track screenshots captured during analysis phase.

**Schema**:
```typescript
interface ScreenshotArtifact {
  // Identification
  pageId: string;           // e.g., "homepage", "about", "blog-index", "blog-post-welcome"
  pageName: string;         // Human-readable, e.g., "Homepage", "About Page"
  url: string;              // Full URL captured, e.g., "https://www.warren4.co.uk/"

  // Viewport information
  viewport: {
    width: number;          // 375 | 768 | 1920
    height: number;         // Actual rendered height (varies by content)
    label: string;          // "mobile" | "tablet" | "desktop"
  };

  // File information
  filePath: string;         // Absolute path to temp file
  fileName: string;         // e.g., "homepage-desktop-1920x1080.png"
  fileSize: number;         // Bytes
  format: 'png';            // Always PNG for consistency

  // Capture metadata
  timestamp: string;        // ISO 8601, e.g., "2025-11-04T15:30:00Z"
  captureSuccess: boolean;  // true if captured, false if failed
  captureAttempts: number;  // 1-3 (includes retries)
  error?: string;           // Error message if captureSuccess = false
}
```

**Validation Rules**:
- `pageId` MUST be lowercase, hyphenated (no spaces)
- `url` MUST be valid HTTPS URL
- `viewport.width` MUST be one of [375, 768, 1920]
- `viewport.label` MUST match width (375→mobile, 768→tablet, 1920→desktop)
- `captureAttempts` MUST be 1-3 (spec requires max 2 retries = 3 attempts total)
- If `captureSuccess = false`, `error` MUST be present

**Relationships**:
- Many ScreenshotArtifacts → One DesignAssessment
- Grouped by pageId for analysis

**Lifecycle**:
1. Created during capture phase (capture-screenshots.js)
2. Read during analysis phase (analyze-design.js)
3. Referenced in report generation (generate-report.js)
4. Physical files deleted after report generated

---

### 2. PageAnalysis

Represents AI analysis of a single page across all viewports.

**Purpose**: Store design analysis for one page (comparing mobile/tablet/desktop views).

**Schema**:
```typescript
interface PageAnalysis {
  // Page identification
  pageId: string;           // Links to ScreenshotArtifact.pageId
  pageName: string;
  url: string;

  // Analysis content
  typography: AnalysisDimension;
  colorScheme: AnalysisDimension;
  spacing: AnalysisDimension;
  layout: AnalysisDimension;
  visualHierarchy: AnalysisDimension;

  // Cross-viewport observations
  mobileResponsiveness: {
    rating: 'excellent' | 'good' | 'needs-improvement' | 'poor';
    observations: string[];  // What works/doesn't work on mobile
  };

  // Accessibility
  accessibility: {
    colorContrast: string;   // e.g., "Meets WCAG AA - 4.7:1 ratio measured"
    textReadability: string; // e.g., "Body text 20px, line height 1.7 - excellent"
    keyboardNav: string;     // Observations about focus states
  };

  // Screenshots analyzed
  screenshotIds: string[];  // Array of ScreenshotArtifact.pageId+viewport combos
}

interface AnalysisDimension {
  strengths: string[];      // What works well (3-5 bullets)
  weaknesses: string[];     // What needs improvement (3-5 bullets)
  measurements?: {          // Optional specific measurements
    [key: string]: string;  // e.g., "bodyTextSize": "20px"
  };
}
```

**Validation Rules**:
- MUST have exactly 5 dimensions analyzed (typography, colorScheme, spacing, layout, visualHierarchy)
- Each dimension MUST have at least 1 strength and may have 0+ weaknesses
- `mobileResponsiveness.rating` required
- `accessibility` section MUST include all 3 subsections
- `screenshotIds` MUST have 1-3 entries (one per viewport)

**Relationships**:
- Many PageAnalysis → One DesignAssessment
- References ScreenshotArtifacts via screenshotIds

---

### 3. DesignAssessment

Represents the complete design evaluation across all pages.

**Purpose**: Aggregate analysis, identify patterns, synthesize findings.

**Schema**:
```typescript
interface DesignAssessment {
  // Metadata
  reportId: string;         // UUID or timestamp-based
  generatedAt: string;      // ISO 8601 timestamp
  websiteName: string;      // "Warren4 Blog"
  websiteUrl: string;       // Base URL

  // Pages analyzed
  pagesAnalyzed: PageAnalysis[];

  // Cross-page synthesis
  consistencyScore: {
    overall: number;        // 1-10 scale
    typography: number;
    colorScheme: number;
    spacing: number;
    layout: number;
  };

  // Pattern identification
  patterns: {
    strengths: string[];    // Repeated positive patterns across pages
    weaknesses: string[];   // Repeated issues across pages
  };

  // Constitution compliance
  constitutionCompliance: {
    principle: string;      // e.g., "VI. Professional Design & User Experience"
    status: 'compliant' | 'partial' | 'non-compliant';
    notes: string;
  }[];

  // Improvement recommendations (see separate entity)
  recommendations: ImprovementRecommendation[];

  // Analysis stats
  stats: {
    totalScreenshots: number;
    successfulCaptures: number;
    failedCaptures: number;
    pagesAnalyzed: number;
    viewportsPerPage: number;
    analysisTimeSeconds: number;
    aiTokensUsed?: number;
  };
}
```

**Validation Rules**:
- `pagesAnalyzed` MUST have at least 1 entry (minimum viable analysis)
- `consistencyScore.overall` MUST be 1-10 integer
- `recommendations` MUST have at least 5 entries (per spec SC-003)
- `stats.successfulCaptures + stats.failedCaptures` MUST equal expected count (pages × viewports)
- `constitutionCompliance` MUST include evaluation of Principle VI at minimum

**Relationships**:
- One DesignAssessment contains many PageAnalysis
- One DesignAssessment contains many ImprovementRecommendations
- One DesignAssessment generates one AnalysisReport (markdown output)

---

### 4. ImprovementRecommendation

Represents a prioritized, actionable design improvement suggestion.

**Purpose**: Provide specific guidance on what to improve and why.

**Schema**:
```typescript
interface ImprovementRecommendation {
  // Identification
  id: string;               // e.g., "REC-001", "REC-002"
  title: string;            // Concise, actionable, e.g., "Increase body text to 20px"

  // Prioritization
  priority: 'high' | 'medium' | 'low';
  impactArea: string[];     // e.g., ["readability", "mobile-ux", "accessibility"]

  // Content
  rationale: string;        // Why this matters (2-3 sentences)
  expectedImpact: string;   // What improves (1-2 sentences)
  implementationGuide: string; // How to make the change (specific steps)

  // Context
  affectedPages: string[];  // Which pages need this change
  relatedPrinciple?: string; // Constitution principle, e.g., "Principle VI"
  designDimension: 'typography' | 'colorScheme' | 'spacing' | 'layout' | 'visualHierarchy' | 'accessibility' | 'consistency';

  // Validation
  practicalWithoutRedesign: boolean; // MUST be true per spec SC-007
}
```

**Validation Rules**:
- `title` MUST be actionable (start with verb like "Increase", "Improve", "Add")
- `priority` assignment guidelines (from research.md):
  - High: Affects readability, accessibility, or mobile UX
  - Medium: Enhances aesthetics or consistency
  - Low: Nice-to-have polish
- `impactArea` MUST have 1-3 entries
- `affectedPages` MUST have at least 1 entry
- `practicalWithoutRedesign` MUST be true (spec requirement)
- `rationale` and `expectedImpact` MUST be present and non-empty

**Priority Distribution** (target):
- 30-40% High priority
- 40-50% Medium priority
- 20-30% Low priority

**Relationships**:
- Many ImprovementRecommendations → One DesignAssessment
- May reference multiple PageAnalysis entries via affectedPages

---

## Supporting Types

### AnalysisReport (Output)

Not a data entity but the final markdown output structure.

**Purpose**: Structured markdown report saved to specs/001-design-review/analysis-YYYY-MM-DD.md

**Structure** (see research.md for full template):
```markdown
---
title: Design Analysis Report
date: YYYY-MM-DD
pages_analyzed: number
viewports: [375px, 768px, 1920px]
total_screenshots: number
failed_captures: number
---

[Markdown content generated from DesignAssessment]
```

---

## Data Flow

```
1. Capture Phase (capture-screenshots.js)
   ↓
   ScreenshotArtifact[] (12 entries for 4 pages × 3 viewports)
   ↓
2. Analysis Phase (analyze-design.js)
   ↓
   PageAnalysis[] (4 entries, one per page)
   ↓
   DesignAssessment (aggregated + recommendations)
   ↓
3. Generation Phase (generate-report.js)
   ↓
   AnalysisReport (markdown file)
```

**Data Persistence**:
- ScreenshotArtifacts: Temporary (files deleted after report generation)
- PageAnalysis: In-memory only (not persisted independently)
- DesignAssessment: In-memory only (content extracted to markdown)
- AnalysisReport: Persisted as markdown file

---

## Example Data

### Example ScreenshotArtifact
```json
{
  "pageId": "homepage",
  "pageName": "Homepage",
  "url": "https://www.warren4.co.uk/",
  "viewport": {
    "width": 1920,
    "height": 1080,
    "label": "desktop"
  },
  "filePath": "/tmp/warren4-design-review/homepage-desktop-1920x1080.png",
  "fileName": "homepage-desktop-1920x1080.png",
  "fileSize": 245678,
  "format": "png",
  "timestamp": "2025-11-04T15:30:15Z",
  "captureSuccess": true,
  "captureAttempts": 1
}
```

### Example ImprovementRecommendation
```json
{
  "id": "REC-001",
  "title": "Increase blog post body text size to 20px minimum",
  "priority": "high",
  "impactArea": ["readability", "accessibility"],
  "rationale": "Current 18px text is at the lower bound of readability for long-form content. Constitution Principle VI requires 18-20px minimum, with 20px preferred. Increasing to 20px improves readability, especially for extended reading sessions common in blog posts.",
  "expectedImpact": "Users will find blog posts easier to read for longer periods. Reduced eye strain, improved comprehension. Aligns with professional PM blog aesthetic.",
  "implementationGuide": "Update CSS for blog post body text: body { font-size: 20px; }. Verify line length stays within 50-75 characters (may need to adjust max-width).",
  "affectedPages": ["blog-post-welcome", "blog-post-pm-os"],
  "relatedPrinciple": "Principle VI - Professional Design & User Experience",
  "designDimension": "typography",
  "practicalWithoutRedesign": true
}
```

---

## Implementation Notes

### TypeScript Usage
These interfaces should be defined in a shared types file:
```typescript
// tests/design-review/types.ts
export interface ScreenshotArtifact { ... }
export interface PageAnalysis { ... }
export interface DesignAssessment { ... }
export interface ImprovementRecommendation { ... }
```

### Validation
Basic validation functions:
```typescript
function validateScreenshotArtifact(artifact: ScreenshotArtifact): void {
  if (!artifact.captureSuccess && !artifact.error) {
    throw new Error('Failed capture must have error message');
  }
  if (![375, 768, 1920].includes(artifact.viewport.width)) {
    throw new Error('Invalid viewport width');
  }
  // ... additional checks
}
```

### JSON Serialization
All entities are plain JavaScript objects, easily serializable to JSON for debugging:
```javascript
// For debugging, can save intermediate results
fs.writeFileSync(
  'design-assessment-debug.json',
  JSON.stringify(designAssessment, null, 2)
);
```

---

**Data Model Complete**: 2025-11-04
**Next Phase**: [quickstart.md](./quickstart.md)
