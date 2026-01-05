# Tasks: Content Discovery & UX Polish

**Input**: Design documents from `/specs/003-content-discovery/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested in spec - implementation tasks only.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Verify existing structure and prepare for implementation

- [X] T001 Verify Astro project structure and content collection configuration in src/content/config.ts
- [X] T002 Review existing blog posts in src/content/blog/ to confirm current count and structure

---

## Phase 2: Foundational

**Purpose**: Create shared utilities and helper functions used across multiple user stories

- [X] T003 Create reading time utility function that calculates word count and reading time from markdown body (to be used by US1, US2)

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Complete Blog Catalog (Priority: P1) MVP

**Goal**: Visitors can discover all available blog content without artificial limitations

**Independent Test**: Navigate to /blog page and verify all blog posts are visible (currently 2 posts should display)

### Implementation for User Story 1

- [X] T004 [US1] Remove .slice(0, 3) limitation in src/pages/blog/index.astro to show all posts (VERIFIED: no limitation exists)
- [X] T005 [US1] Verify blog listing page displays all posts sorted by date (newest first)

**Checkpoint**: User Story 1 complete - all blog posts visible on listing page

---

## Phase 4: User Story 2 - Reading Time Visibility (Priority: P2)

**Goal**: Visitors can see estimated reading time for each blog post

**Independent Test**: Verify reading time (e.g., "5 min read") appears on blog listing cards and individual post pages

### Implementation for User Story 2

- [X] T006 [US2] Add reading time calculation and display to blog listing cards in src/pages/blog/index.astro
- [X] T007 [P] [US2] Add reading time display to individual blog post pages in src/layouts/BlogPost.astro
- [X] T008 [US2] Add reading time styling (clock icon or text style) in component styles

**Checkpoint**: User Story 2 complete - reading time visible on listing and post pages

---

## Phase 5: User Story 3 - Enhanced Footer Navigation (Priority: P2)

**Goal**: Visitors can access key site resources and social links from the footer

**Independent Test**: Scroll to footer and verify LinkedIn link, newsletter link, RSS link, and copyright with current year are present

### Implementation for User Story 3

- [X] T009 [US3] Add LinkedIn social link with icon and proper ARIA label to src/components/Footer.astro
- [X] T010 [P] [US3] Add newsletter signup link to footer in src/components/Footer.astro
- [X] T011 [P] [US3] Add RSS feed link with icon to footer in src/components/Footer.astro
- [X] T012 [US3] Add auto-updating copyright notice (current year) to footer in src/components/Footer.astro
- [X] T013 [US3] Style footer links with consistent layout and hover states in src/components/Footer.astro
- [X] T014 [US3] Ensure external links have target="_blank" and rel="noopener noreferrer" attributes

**Checkpoint**: User Story 3 complete - footer has social, newsletter, RSS links and copyright

---

## Phase 6: User Story 4 - Reading Progress Indicator (Priority: P3)

**Goal**: Readers can see their progress through long-form blog posts

**Independent Test**: Open a blog post, scroll down, and verify progress bar at top fills from 0% to 100%

### Implementation for User Story 4

- [X] T015 [US4] Create ReadingProgress.astro component with fixed progress bar in src/components/ReadingProgress.astro
- [X] T016 [US4] Implement scroll tracking JavaScript with requestAnimationFrame throttling in ReadingProgress.astro
- [X] T017 [US4] Style progress bar (3px height, accent color, smooth transition) in ReadingProgress.astro
- [X] T018 [US4] Integrate ReadingProgress component into BlogPost layout in src/layouts/BlogPost.astro
- [X] T019 [US4] Add aria-hidden="true" to progress bar (decorative element)

**Checkpoint**: User Story 4 complete - reading progress bar works on blog posts

---

## Phase 7: User Story 5 - Accessibility Enhancements (Priority: P3)

**Goal**: Keyboard users and screen reader users can navigate effectively

**Independent Test**: Use Tab key to navigate - verify skip link appears first, focus indicators visible on all interactive elements

### Implementation for User Story 5

- [X] T020 [US5] Create SkipLink.astro component with visually hidden until focused behavior in src/components/SkipLink.astro
- [X] T021 [US5] Add skip link to all page layouts (BaseHead or top of body) targeting main content
- [X] T022 [P] [US5] Add id="main-content" to main element in all layouts for skip link target
- [X] T023 [US5] Add focus indicator styles (3px solid blue, 2px offset) for all interactive elements in src/styles/global.css
- [X] T024 [US5] Ensure all footer links and buttons have appropriate ARIA labels

**Checkpoint**: User Story 5 complete - skip link and focus indicators working

---

## Phase 8: Polish & Validation

**Purpose**: Final validation and cross-cutting concerns

- [X] T025 Run npm run build to verify static site generates without errors (TypeScript check passed)
- [ ] T026 Test all blog posts display on /blog listing page
- [ ] T027 Test reading time displays correctly on listing and post pages
- [ ] T028 Test footer links work correctly (LinkedIn, newsletter, RSS)
- [ ] T029 Test reading progress bar on long blog posts
- [ ] T030 Test skip-to-content link with keyboard navigation
- [ ] T031 Test focus indicators on all interactive elements
- [ ] T032 Run Lighthouse audit to verify performance score remains 100/100

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - reading time utility needed by US1 and US2
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Story 2 (Phase 4)**: Depends on Foundational (uses reading time utility)
- **User Story 3 (Phase 5)**: Depends on Setup only - can run parallel with US1/US2
- **User Story 4 (Phase 6)**: Depends on Setup only - can run parallel
- **User Story 5 (Phase 7)**: Depends on Setup only - can run parallel
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Independent - MVP deliverable
- **US2 (P2)**: Shares reading time utility with listing page
- **US3 (P2)**: Fully independent of other stories
- **US4 (P3)**: Fully independent - new component
- **US5 (P3)**: Fully independent - CSS and new component

### Parallel Opportunities

**After Foundational phase, these can run in parallel:**
- US1 and US2 (both use reading time utility)
- US3 (footer enhancement - separate files)
- US4 (progress bar - new component)
- US5 (accessibility - CSS and new component)

---

## Parallel Example: After Foundational

```bash
# These can all start simultaneously:
Task: "T004 [US1] Remove .slice(0, 3) limitation in src/pages/blog/index.astro"
Task: "T009 [US3] Add LinkedIn social link to src/components/Footer.astro"
Task: "T015 [US4] Create ReadingProgress.astro component"
Task: "T020 [US5] Create SkipLink.astro component"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Complete Blog Catalog)
4. **STOP and VALIDATE**: All posts visible on /blog
5. Deploy if ready - immediate value delivered

### Incremental Delivery

1. Setup + Foundational complete
2. Add US1 (all posts visible) -> Deploy (MVP!)
3. Add US2 (reading time) -> Deploy
4. Add US3 (footer links) -> Deploy
5. Add US4 (progress bar) -> Deploy
6. Add US5 (accessibility) -> Deploy
7. Each story adds value without breaking previous

### Recommended Order

Since US1 and US2 are closely related (both involve blog listing page):
1. T001-T003 (Setup + Foundational)
2. T004-T005 (US1 - show all posts)
3. T006-T008 (US2 - reading time)
4. T009-T014 (US3 - footer) - can parallel with above
5. T015-T019 (US4 - progress bar)
6. T020-T024 (US5 - accessibility)
7. T025-T032 (Polish & validation)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently testable after completion
- No external dependencies - all vanilla JavaScript and CSS
- Commit after each completed user story for incremental value
- Run `npm run build` periodically to catch build errors early

---

## Summary

| Phase | Tasks | User Story | Priority |
|-------|-------|------------|----------|
| Setup | T001-T002 | - | - |
| Foundational | T003 | - | - |
| US1 | T004-T005 | Complete Blog Catalog | P1 MVP |
| US2 | T006-T008 | Reading Time Visibility | P2 |
| US3 | T009-T014 | Enhanced Footer | P2 |
| US4 | T015-T019 | Reading Progress | P3 |
| US5 | T020-T024 | Accessibility | P3 |
| Polish | T025-T032 | Validation | - |

**Total Tasks**: 32
**MVP Scope**: Tasks T001-T005 (5 tasks)
**Full Feature**: All 32 tasks
