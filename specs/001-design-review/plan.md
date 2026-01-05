# Implementation Plan: Website Design Review & Improvement Analysis

**Branch**: `001-design-review` | **Date**: 2025-11-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-design-review/spec.md`

## Summary

This feature implements an automated design review system that captures screenshots of the Warren4 blog website at multiple viewport sizes, analyzes the design using Claude Code's vision capabilities directly, and generates actionable improvement recommendations. The system uses Playwright for screenshot automation and leverages Claude Code's built-in vision analysis (no external API needed), outputting results as a structured Markdown report.

## Technical Context

**Language/Version**: JavaScript/TypeScript (Node.js 18+), matching existing Astro project
**Primary Dependencies**: Playwright (@playwright/test 1.56.1+), fs-extra
**Storage**: Temporary filesystem for screenshots, Markdown files for output (specs/001-design-review/analysis-YYYY-MM-DD.md)
**Testing**: Existing Playwright test infrastructure, manual validation of Claude Code analysis outputs
**Target Platform**: Local development environment (macOS/Linux/Windows), runs via npm script within Claude Code
**Project Type**: Single project - Analysis script within existing Astro blog repository
**Performance Goals**: Complete 4 pages × 3 viewports (12 screenshots) + Claude Code analysis in under 5 minutes
**Constraints**: Must not interfere with existing blog workflow, temporary files only, no persistent state, no external API dependencies
**Scale/Scope**: Analyzes 4-6 pages per run, generates single comprehensive report per execution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Content-First Publishing
✅ **PASS** - Analysis script is separate from content workflow. Does not modify blog posts or publishing process. Analysis outputs go to specs/ directory, not content directories.

### II. Standard Markdown
✅ **PASS** - Output report uses standard Markdown. No Obsidian-specific features. Analysis report can be read in any Markdown viewer.

### III. Accessibility & Performance (NON-NEGOTIABLE)
✅ **PASS** - Script analyzes accessibility (color contrast, text readability) as specified in FR-010. Does not modify site code, so cannot negatively impact Lighthouse scores. Screenshots capture current accessibility state for review.

### IV. Simple & Maintainable
✅ **PASS** - No new dependencies required beyond existing Playwright. Uses Claude Code's built-in vision capabilities.

**Rationale**:
- Playwright already installed for testing (1.56.1), reusing existing infrastructure
- No external API dependencies - Claude Code provides vision analysis directly
- Script is self-contained in specs/001-design-review/, isolated from core blog code
- Provides high value (automated design review) with minimal complexity
- No API keys, no external services, no maintenance burden
- Can be run on-demand within Claude Code environment

### V. Quality Over Quantity
✅ **PASS** - Design review promotes quality by identifying design improvements. Aligns with principle of prioritizing quality.

### VI. Professional Design & User Experience
✅ **PASS** - Core purpose is enforcing this principle. Analysis evaluates typography, readability, mobile-first design, and newsletter optimization per constitution requirements.

**Constitution Check Result**: ✅ PASS (with justified complexity addition)

## Project Structure

### Documentation (this feature)

```text
specs/001-design-review/
├── spec.md              # Feature specification
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - Technology decisions
├── data-model.md        # Phase 1 output - Data structures
├── quickstart.md        # Phase 1 output - How to run the script
├── contracts/           # Phase 1 output - Not applicable (no API contracts)
├── checklists/          # Existing quality checklists
│   └── requirements.md
└── analysis-YYYY-MM-DD.md  # Output: Generated design analysis reports
```

### Source Code (repository root)

```text
# Single project structure (reusing existing)
tests/
├── e2e/                       # Existing Playwright tests
│   ├── homepage.spec.js
│   ├── about.spec.js
│   └── blog.spec.js
└── design-review/             # NEW: Design review scripts
    ├── capture-screenshots.js # Screenshot automation
    ├── analyze-design.js      # AI analysis orchestration
    └── generate-report.js     # Markdown report generation

package.json                   # Add design review scripts
```

**Structure Decision**: Adding design-review scripts to tests/ directory maintains separation from production code while leveraging existing Playwright infrastructure. Scripts are development tools, not runtime dependencies.

## Complexity Tracking

**No violations**. No new dependencies required - uses existing Playwright and Claude Code's built-in vision capabilities.

## Phase 0: Research & Technology Decisions

See [research.md](./research.md) for detailed findings.

**Key Decisions**:
1. **Screenshot Tool**: Playwright (already installed, proven, handles all viewports)
2. **Analysis Method**: Claude Code direct vision analysis (no external API, no dependencies)
3. **Report Format**: Markdown with frontmatter (aligns with constitution, human-readable)
4. **Script Orchestration**: Playwright captures screenshots, Claude Code analyzes interactively
5. **Retry Logic**: Exponential backoff via Playwright's built-in retry mechanisms

## Phase 1: Design & Contracts

### Data Model

See [data-model.md](./data-model.md) for complete entity definitions.

**Core Entities**:
- **ScreenshotArtifact**: Represents captured screenshot with metadata
- **DesignAssessment**: Structured evaluation across design dimensions
- **ImprovementRecommendation**: Prioritized actionable suggestion

### API Contracts

Not applicable - this is a script-based tool, not an API service. Interaction is via CLI command execution.

### Quickstart Guide

See [quickstart.md](./quickstart.md) for usage instructions.

**Basic usage**:
```bash
npm run design:review
```

## Phase 2: Task Breakdown

Phase 2 (task generation) is handled by `/speckit.tasks` command after planning completes.

Expected task categories:
- Setup & Configuration (API keys, dependencies)
- Screenshot Capture Implementation (Playwright automation)
- AI Integration (Anthropic SDK, prompt engineering)
- Report Generation (Markdown formatting, file I/O)
- Testing & Validation (Manual validation of outputs)

## Next Steps

1. Run `/speckit.tasks` to generate detailed task breakdown
2. Begin implementation starting with User Story 1 (Screenshot Capture)
3. Validate screenshots manually before proceeding to AI integration
4. Implement AI analysis and validate output quality
5. Generate sample report and review against success criteria

---

**Planning Complete**: 2025-11-04
**Ready for**: `/speckit.tasks` → Implementation
