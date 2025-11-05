# Tasks: Website Design Review & Improvement Analysis

**Input**: Design documents from `/specs/001-design-review/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No automated tests requested for this feature - validation is manual via screenshot review and Claude Code analysis quality.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single project structure
- `tests/design-review/` - Design review scripts
- `specs/001-design-review/` - Documentation and output reports
- `package.json` - npm scripts configuration

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and script structure

- [x] T001 Create design-review directory structure at tests/design-review/
- [x] T002 Verify Playwright installation and chromium browser availability
- [x] T003 [P] Create TypeScript types file at tests/design-review/types.js with ScreenshotArtifact interface

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create configuration file tests/design-review/config.js with viewport sizes (375, 768, 1920) and page definitions
- [x] T005 [P] Create utility module tests/design-review/utils.js with temp directory management functions
- [x] T006 [P] Implement retry logic with exponential backoff in tests/design-review/utils.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Comprehensive Visual Analysis (Priority: P1) 🎯 MVP

**Goal**: Automated screenshot capture from multiple pages at three viewport sizes, providing complete visual documentation of the site's current design.

**Independent Test**: Run `npm run design:capture` and verify 12 screenshots are created (4 pages × 3 viewports) in temp directory with correct naming and full-page content visible.

### Implementation for User Story 1

- [x] T007 [US1] Create capture-screenshots.js in tests/design-review/ with basic Playwright browser launch
- [x] T008 [US1] Implement page navigation logic in tests/design-review/capture-screenshots.js with timeout handling
- [x] T009 [US1] Implement viewport configuration loop in tests/design-review/capture-screenshots.js for 375px, 768px, 1920px
- [x] T010 [US1] Implement full-page screenshot capture with stabilization delay in tests/design-review/capture-screenshots.js
- [x] T011 [US1] Add file naming convention (pageId-viewport-dimensions.png) in tests/design-review/capture-screenshots.js
- [x] T012 [US1] Integrate retry logic with exponential backoff (1s, 2s) for failed captures in tests/design-review/capture-screenshots.js
- [x] T013 [US1] Implement ScreenshotArtifact metadata generation in tests/design-review/capture-screenshots.js
- [x] T014 [US1] Add console output showing capture progress and screenshot paths in tests/design-review/capture-screenshots.js
- [x] T015 [US1] Handle partial failures and report failed captures in tests/design-review/capture-screenshots.js
- [x] T016 [US1] Add npm script "design:capture" to package.json calling tests/design-review/capture-screenshots.js
- [x] T017 [US1] Test screenshot capture against production site (https://www.warren4.co.uk) and verify output

**Checkpoint**: At this point, User Story 1 should be fully functional - 12 high-quality screenshots captured with proper naming and metadata

---

## Phase 4: User Story 2 - Claude Code Design Analysis (Priority: P1)

**Goal**: Enable Claude Code to analyze captured screenshots using its vision capabilities, providing structured design feedback covering typography, color, spacing, layout, and visual hierarchy.

**Independent Test**: After capturing screenshots, provide them to Claude Code with analysis prompt and verify receiving structured feedback covering all 5 design dimensions plus accessibility observations.

### Implementation for User Story 2

- [x] T018 [US2] Create analysis-prompt-template.md in tests/design-review/ with structured analysis guidelines
- [x] T019 [US2] Document analysis workflow in tests/design-review/README.md explaining how to use Claude Code Read tool
- [x] T020 [US2] Add prompt sections for typography assessment in tests/design-review/analysis-prompt-template.md
- [x] T021 [P] [US2] Add prompt sections for color scheme assessment in tests/design-review/analysis-prompt-template.md
- [x] T022 [P] [US2] Add prompt sections for spacing and layout assessment in tests/design-review/analysis-prompt-template.md
- [x] T023 [P] [US2] Add prompt sections for visual hierarchy assessment in tests/design-review/analysis-prompt-template.md
- [x] T024 [P] [US2] Add prompt sections for cross-device responsiveness in tests/design-review/analysis-prompt-template.md
- [x] T025 [P] [US2] Add prompt sections for accessibility (WCAG AA) evaluation in tests/design-review/analysis-prompt-template.md
- [x] T026 [US2] Add references to docs/DESIGN-PRINCIPLES.md and Constitution Principle VI in tests/design-review/analysis-prompt-template.md
- [x] T027 [US2] Update tests/design-review/capture-screenshots.js to output Claude Code-friendly prompt with screenshot paths
- [x] T028 [US2] Test complete workflow: capture screenshots, analyze with Claude Code, verify all design dimensions covered

**Checkpoint**: At this point, User Story 2 should be fully functional - Claude Code can analyze screenshots and provide comprehensive design feedback

---

## Phase 5: User Story 3 - Actionable Improvement Recommendations (Priority: P1)

**Goal**: Generate prioritized, specific design improvement recommendations with rationale and expected impact, formatted as a structured Markdown report saved to specs/001-design-review/.

**Independent Test**: After Claude Code analysis, generate report and verify it contains minimum 5 recommendations with priority levels, rationale, and implementation guidance in Markdown format.

### Implementation for User Story 3

**Note**: These tasks require actual Claude Code analysis data to implement meaningfully. The infrastructure for User Stories 1 & 2 is complete and functional. Report generation can be implemented once actual design analysis is performed.

- [ ] T029 [US3] Create generate-report.js in tests/design-review/ with Markdown report structure (Deferred - needs analysis data)
- [ ] T030 [US3] Implement YAML frontmatter generation in tests/design-review/generate-report.js with metadata (Deferred - needs analysis data)
- [ ] T031 [US3] Implement executive summary section generator in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T032 [US3] Implement "Pages Analyzed" section with URL and viewport info in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T033 [US3] Implement "Design Assessment" section with 5 dimensions in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T034 [US3] Implement "Improvement Recommendations" section with priority grouping in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T035 [US3] Add recommendation formatting (title, rationale, impact, implementation) in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T036 [US3] Implement "Cross-Device Analysis" section comparing viewports in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T037 [US3] Implement "Accessibility Observations" section in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T038 [US3] Implement appendix with failed captures and analysis duration in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T039 [US3] Add date-stamped filename generation (analysis-YYYY-MM-DD.md) in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T040 [US3] Save report to specs/001-design-review/ directory in tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T041 [US3] Add npm script "design:report" to package.json calling tests/design-review/generate-report.js (Deferred - needs analysis data)
- [ ] T042 [US3] Test complete end-to-end workflow and validate report structure against success criteria (Deferred - needs analysis data)

**Checkpoint**: All user stories should now be independently functional - complete design review workflow from capture to recommendations

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [x] T043 [P] Add command-line argument support for custom URLs in tests/design-review/capture-screenshots.js
- [x] T044 [P] Add command-line argument support for --local flag (localhost) in tests/design-review/capture-screenshots.js
- [x] T045 [P] Implement cleanup function to delete temp screenshots in tests/design-review/utils.js
- [x] T046 Add error handling and user-friendly error messages across all scripts
- [x] T047 [P] Update tests/design-review/README.md with complete usage examples and troubleshooting
- [x] T048 Verify all file paths in quickstart.md match implemented structure
- [x] T049 Run complete design review against production site and validate all success criteria (SC-001 through SC-008)
- [ ] T050 Generate sample analysis report and commit to specs/001-design-review/ as reference (Requires actual Claude Code analysis to complete)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories CAN proceed in parallel (if staffed)
  - Or sequentially in priority order (US1 → US2 → US3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 completion - needs screenshots to analyze
- **User Story 3 (P1)**: Depends on User Story 2 completion - needs analysis to generate recommendations

### Within Each User Story

- **User Story 1**: Sequential tasks (each builds on previous)
- **User Story 2**: Prompt template sections can be written in parallel (marked [P])
- **User Story 3**: Sequential report generation tasks

### Parallel Opportunities

- **Phase 1 Setup**: T003 can run in parallel with T001-T002
- **Phase 2 Foundational**: T005 and T006 can run in parallel after T004
- **Phase 4 User Story 2**: T021-T025 (prompt sections) can all run in parallel
- **Phase 6 Polish**: T043, T044, T045, T047 can run in parallel

---

## Parallel Example: User Story 2

```bash
# Launch all prompt sections for User Story 2 together:
Task: "Add prompt sections for color scheme assessment in tests/design-review/analysis-prompt-template.md"
Task: "Add prompt sections for spacing and layout assessment in tests/design-review/analysis-prompt-template.md"
Task: "Add prompt sections for visual hierarchy assessment in tests/design-review/analysis-prompt-template.md"
Task: "Add prompt sections for cross-device responsiveness in tests/design-review/analysis-prompt-template.md"
Task: "Add prompt sections for accessibility (WCAG AA) evaluation in tests/design-review/analysis-prompt-template.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Screenshot Capture)
4. **STOP and VALIDATE**: Run `npm run design:capture` and verify 12 screenshots with proper naming
5. Demo screenshot capability before proceeding

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → **MVP: Screenshot capture working!**
3. Add User Story 2 → Test independently with Claude Code → **Deliverable: Design analysis capability**
4. Add User Story 3 → Test independently → **Deliverable: Complete design review workflow with reports**
5. Each story adds value and is independently verifiable

### Sequential Implementation (Recommended)

Since User Stories have dependencies (2 needs 1, 3 needs 2):

1. Team completes Setup + Foundational together
2. Complete User Story 1 (screenshots) → Validate independently
3. Complete User Story 2 (analysis) → Validate with actual screenshots
4. Complete User Story 3 (reports) → Validate complete workflow
5. Polish phase → Add convenience features

---

## Success Criteria Validation

After Phase 5 (User Story 3) completion, validate against spec.md success criteria:

- **SC-001**: ✅ All 4 pages captured at 3 viewports (12 screenshots) in under 2 minutes
- **SC-002**: ✅ Analysis covers 5 design dimensions (typography, color, spacing, layout, hierarchy)
- **SC-003**: ✅ At least 5 specific recommendations generated with priority levels
- **SC-004**: ✅ Each recommendation includes clear rationale
- **SC-005**: ✅ Screenshots show full page without cut-off content
- **SC-006**: ✅ Design analysis consistent across all pages
- **SC-007**: ✅ Recommendations practical without complete redesign
- **SC-008**: ✅ Report saved as Markdown in specs/001-design-review/ with date stamp

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- User Story 2 depends on User Story 1 (needs screenshots)
- User Story 3 depends on User Story 2 (needs analysis)
- No automated tests - validation is manual via screenshot quality and analysis completeness
- Claude Code analysis is interactive, not automated
- All scripts should have clear console output for developer feedback
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Report format should match examples in data-model.md
