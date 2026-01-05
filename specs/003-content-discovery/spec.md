# Feature Specification: Content Discovery & UX Polish

**Feature Branch**: `003-content-discovery`
**Created**: November 4, 2024
**Status**: Draft
**Input**: User description: "Implement Phase 2 and 3 improvements from design review: content discovery (show all posts, reading time, improved footer) and UX polish (reading progress, skip links, focus states)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete Blog Catalog (Priority: P1) 🎯 MVP

Visitors can discover all available blog content without artificial limitations. Currently only 3 posts show on the blog listing page despite 4 posts existing, making content discovery incomplete.

**Why this priority**: Core content discovery - visitors should see everything available. Quick fix with immediate impact on discoverability.

**Independent Test**: Navigate to /blog page and verify all blog posts are visible without pagination or hidden content. Can be fully tested by counting posts on the page vs total posts in the system.

**Acceptance Scenarios**:

1. **Given** a visitor lands on /blog page, **When** they view the blog listing, **Then** they see all published blog posts (currently 4 total)
2. **Given** a visitor browses the blog listing, **When** they scroll down, **Then** no posts are hidden or require "load more" actions
3. **Given** new blog posts are published, **When** visitors return to /blog, **Then** all posts including new ones are immediately visible

---

### User Story 2 - Reading Time Visibility (Priority: P2)

Visitors can see estimated reading time for each blog post to make informed decisions about what to read based on available time.

**Why this priority**: Helps readers prioritize content based on time availability. Industry standard feature that improves user experience.

**Independent Test**: Navigate to /blog listing page and verify each post shows reading time estimate (e.g., "5 min read"). Also check individual blog post pages show reading time.

**Acceptance Scenarios**:

1. **Given** a visitor views the blog listing page, **When** they look at any post card, **Then** they see an estimated reading time (e.g., "8 min read")
2. **Given** a visitor opens an individual blog post, **When** they view the post header, **Then** they see the estimated reading time displayed prominently
3. **Given** a blog post is 2000 words, **When** reading time is calculated, **Then** it shows approximately 10 minutes (200 words per minute average)
4. **Given** a very short post (under 1 minute), **When** reading time is displayed, **Then** it shows "1 min read" (minimum display value)

---

### User Story 3 - Enhanced Footer Navigation (Priority: P2)

Visitors can access key site resources and social links from the footer on every page without having to navigate through the main menu.

**Why this priority**: Professional polish and improved navigation. Footer is prime real estate for important links that should be accessible sitewide.

**Independent Test**: Scroll to footer on any page and verify presence of social links (LinkedIn), newsletter link, RSS feed link, and copyright information.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the footer, **When** they view footer content, **Then** they see LinkedIn profile link with appropriate icon
2. **Given** a visitor is in the footer, **When** they look for newsletter signup, **Then** they see a link to newsletter subscription
3. **Given** a visitor wants to subscribe via RSS, **When** they check the footer, **Then** they see an RSS feed link with icon
4. **Given** a visitor views the footer, **When** they look at site information, **Then** they see copyright notice with current year
5. **Given** a visitor clicks any footer link, **When** the link opens, **Then** external links open in new tab and internal links navigate normally

---

### User Story 4 - Reading Progress Indicator (Priority: P3)

Readers of long-form blog posts can see their progress through the article via a visual indicator at the top of the page.

**Why this priority**: UX enhancement for longer articles. Provides feedback to readers and encourages completion. The AI PM Operating System post is long and would benefit from this.

**Independent Test**: Open a long blog post and scroll down. Verify a progress bar at the top of the page fills from left to right as you scroll from top to bottom of the article.

**Acceptance Scenarios**:

1. **Given** a visitor opens a blog post, **When** they are at the top of the article, **Then** they see a progress bar at 0% (empty)
2. **Given** a visitor is reading a blog post, **When** they scroll halfway down the article, **Then** the progress bar shows approximately 50% filled
3. **Given** a visitor reaches the end of a blog post, **When** they view the progress bar, **Then** it shows 100% filled
4. **Given** a visitor scrolls back up in an article, **When** they move upward, **Then** the progress bar decreases proportionally
5. **Given** a short blog post (under 500 words), **When** visitor views the page, **Then** progress bar displays but may fill quickly (no minimum word count threshold)

---

### User Story 5 - Accessibility Enhancements (Priority: P3)

Keyboard users and screen reader users can navigate the site effectively with proper focus indicators and skip-to-content functionality.

**Why this priority**: Accessibility compliance and improved experience for users with disabilities. Addresses gaps identified in design review.

**Independent Test**: Navigate the site using only keyboard (Tab key). Verify visible focus indicators on all interactive elements and ability to skip navigation.

**Acceptance Scenarios**:

1. **Given** a keyboard user lands on any page, **When** they press Tab key, **Then** they see a "Skip to content" link appear at the top
2. **Given** a keyboard user activates skip link, **When** they press Enter, **Then** focus moves directly to main content area
3. **Given** a keyboard user navigates the site, **When** they tab through interactive elements, **Then** each element shows a clearly visible focus outline
4. **Given** a user tabs to a link or button, **When** focus is applied, **Then** outline is 3px solid blue with 2px offset
5. **Given** a screen reader user navigates the site, **When** they encounter interactive elements, **Then** all elements have appropriate ARIA labels

---

### Edge Cases

- What happens when a blog post has no content (empty body)? Reading time calculation should handle gracefully with minimum 1 min.
- How does reading progress bar behave on very short posts? Displays normally but fills quickly - no minimum threshold required.
- What happens when footer social links reference non-existent profiles? Display only configured links, hide unconfigured ones.
- How does skip-to-content link interact with sticky headers? Skip link should move focus past all navigation elements.
- What happens when user has custom browser focus styles? Our focus styles should enhance, not conflict with user preferences.

## Requirements *(mandatory)*

### Functional Requirements

**Blog Content Discovery:**

- **FR-001**: System MUST display all published blog posts on the /blog listing page without artificial limits
- **FR-002**: System MUST calculate reading time estimate for each blog post based on word count
- **FR-003**: Reading time calculation MUST use 200 words per minute as average reading speed
- **FR-004**: Reading time MUST be displayed on both blog listing page and individual blog post pages
- **FR-005**: Reading time display MUST show minimum of "1 min read" even for very short posts

**Footer Enhancement:**

- **FR-006**: Footer MUST include LinkedIn profile link with icon
- **FR-007**: Footer MUST include link to newsletter signup
- **FR-008**: Footer MUST include RSS feed link with icon
- **FR-009**: Footer MUST display copyright notice with current year (auto-updating)
- **FR-010**: Footer MUST be consistent across all pages of the site
- **FR-011**: External footer links MUST open in new tab with appropriate rel attributes

**Reading Progress:**

- **FR-012**: Blog post pages MUST display reading progress indicator at top of viewport
- **FR-013**: Progress indicator MUST update in real-time as user scrolls through content
- **FR-014**: Progress bar MUST calculate progress based on scrollable content height
- **FR-015**: Progress indicator MUST be visually subtle but noticeable (thin bar at very top)

**Accessibility:**

- **FR-016**: All pages MUST include "Skip to content" link as first focusable element
- **FR-017**: Skip link MUST be visually hidden until focused
- **FR-018**: Skip link MUST move keyboard focus to main content area when activated
- **FR-019**: All interactive elements MUST have visible focus indicators
- **FR-020**: Focus indicators MUST meet WCAG 2.1 Level AA contrast requirements (3:1 minimum)
- **FR-021**: Focus outline style MUST be 3px solid blue with 2px offset for consistency

### Key Entities

- **Blog Post**: Represents published article content with title, body text, publication date, and calculated metadata (word count, reading time)
- **Footer Configuration**: Site-wide footer data including social links, legal links, and dynamic content like copyright year
- **Reading Progress State**: Client-side tracking of user's scroll position and calculated progress percentage

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Content Discovery:**

- **SC-001**: Visitors can see 100% of published blog posts on /blog page without additional clicks
- **SC-002**: Reading time estimates are displayed on all blog listing cards and post pages within 5% accuracy of actual reading time

**UX Polish:**

- **SC-003**: Footer provides access to social and newsletter links on every page without main navigation interaction
- **SC-004**: Long blog posts (over 1000 words) display real-time reading progress indicator
- **SC-005**: Keyboard users can skip navigation and reach main content in 1 Tab + Enter key press

**Accessibility:**

- **SC-006**: All interactive elements have visible focus indicators meeting WCAG 2.1 AA standards
- **SC-007**: Site passes WAVE accessibility checker with zero errors for focus and navigation issues

**Performance:**

- **SC-008**: Reading time calculation and progress tracking add less than 50ms to page load time
- **SC-009**: Progress bar updates smoothly without janky scrolling (60fps target)

## Scope *(mandatory)*

### In Scope

**Phase 2 - Content Discovery:**
- Remove .slice(0, 3) limitation on blog listing page
- Calculate and display reading time on blog listing cards
- Calculate and display reading time on individual blog post pages
- Enhance footer with social links (LinkedIn)
- Add newsletter signup link to footer
- Add RSS feed link to footer with icon
- Add auto-updating copyright notice to footer

**Phase 3 - UX Polish:**
- Implement reading progress bar component for blog posts
- Add scroll tracking JavaScript for progress calculation
- Implement skip-to-content link on all pages
- Enhance focus state styles for all interactive elements
- Add proper ARIA labels where missing

**Visual Polish:**
- Style footer links with icons
- Style reading time display with clock icon or similar
- Style progress bar with subtle gradient or solid color
- Style focus outlines consistently across all interactive elements

### Out of Scope

- Custom hero images for blog posts (future Phase 1 work)
- Table of contents for long posts (future enhancement)
- Copy button for code blocks (future Phase 3 extension)
- "Back to top" button (future enhancement)
- Hamburger menu for mobile navigation (separate mobile enhancement)
- Post excerpts/descriptions on listing page (content authoring task)
- Post categories or tags (future taxonomy work)
- Related posts feature (future recommendation system)
- Comments or social sharing (future community features)

## Assumptions *(mandatory)*

- Site is built with Astro static site generator
- Blog posts are stored as markdown files in content collection
- Current styling uses CSS custom properties (CSS variables)
- Site has existing global styles file where focus styles can be added
- JavaScript is available for reading progress tracking (progressive enhancement)
- Reading speed average of 200 words per minute is acceptable for all content types
- LinkedIn is the primary social platform to feature (can add more later)
- Progress bar should appear on all blog posts regardless of length
- Skip-to-content link follows industry standard pattern (visually hidden until focused)

## Dependencies *(mandatory)*

- No external API dependencies
- No third-party library dependencies for core functionality (reading time calculation can be pure JavaScript)
- No database changes required (static site)
- Depends on existing Astro content collection API for blog posts
- Depends on existing CSS custom property system for styling

## Open Questions

None - all functionality follows industry standards and design review recommendations.

## Constraints *(mandatory)*

**Technical:**
- Must maintain static site generation (no server-side rendering)
- Must not impact existing Lighthouse performance score (currently excellent)
- JavaScript for progress tracking must be minimal (<2KB)
- Must work without JavaScript for core content (progressive enhancement)

**Design:**
- Footer links must match existing site color scheme and typography
- Reading progress bar must not interfere with sticky header (if present)
- Focus indicators must be visible but not overly aggressive
- All enhancements must work on mobile viewports (320px and up)

**Accessibility:**
- Must maintain or improve current WCAG 2.1 AA compliance
- Focus indicators must have 3:1 contrast ratio minimum
- Skip link must be keyboard accessible and screen reader friendly
- Progress bar must not create motion sickness issues (smooth, subtle animation)

**Performance:**
- Must not add more than 100ms to page load time
- Must maintain 60fps scrolling performance
- Must not increase bundle size by more than 5KB (gzipped)

## Future Considerations *(optional)*

**Next Phase Ideas:**
- Add table of contents for posts over 2000 words
- Implement "back to top" button for long posts
- Add estimated reading time remaining (e.g., "5 min left")
- Implement copy button for code blocks with syntax highlighting
- Add post categories/tags for better filtering
- Create related posts recommendation system

**Potential Enhancements:**
- Dark mode toggle in footer
- Reading progress milestone notifications (25%, 50%, 75% complete)
- Save reading position across sessions
- Reading statistics dashboard for author

**Scalability Considerations:**
- If blog grows beyond 50 posts, may need pagination or infinite scroll
- If reading time calculation becomes complex (images, code blocks), may need server-side pre-calculation
- May want to make progress bar color themeable via CSS custom properties
