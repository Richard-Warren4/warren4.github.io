# Design Analysis Prompt Template

Use this prompt with Claude Code after capturing screenshots with `npm run design:capture`.

## Analysis Request

Please analyze the following screenshots for design quality and provide comprehensive feedback:

**Screenshots to analyze:**
- [List screenshot paths from capture output]

## Analysis Framework

### 1. Typography Assessment

Evaluate typography across all pages:

- **Readability**: Font sizes, line height, character spacing
- **Hierarchy**: Clear distinction between headings (H1-H6) and body text
- **Font Choices**: Appropriate font families, weights, and styles
- **Sizing**: Compliance with constitution requirement (18-20px body text minimum)
- **Line Length**: Optimal 50-75 characters per line
- **Consistency**: Typography system applied uniformly across pages

**Reference**: Constitution Principle VI specifies 18-20px body text with 1.5-1.75 line height

### 2. Color Scheme Assessment

Evaluate color usage and accessibility:

- **Contrast Ratios**: WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
- **Color Palette**: Cohesive color system, appropriate use of primary/secondary/accent colors
- **Branding**: Colors reinforce professional Product Management blog aesthetic
- **Accessibility**: Sufficient contrast for all text and interactive elements
- **Consistency**: Color usage consistent across pages

**Reference**: Must meet WCAG 2.1 AA standards per Constitution Principle III

### 3. Spacing and Layout Assessment

Evaluate whitespace and structural layout:

- **Whitespace**: Appropriate breathing room around elements
- **Density**: Balance between information density and readability
- **Alignment**: Consistent grid system and element alignment
- **Margins/Padding**: Consistent spacing patterns
- **Visual Balance**: Harmonious distribution of elements
- **Responsive Behavior**: How layout adapts across mobile/tablet/desktop viewports

**Reference**: Mobile-first design principles from docs/DESIGN-PRINCIPLES.md

### 4. Visual Hierarchy Assessment

Evaluate attention flow and importance signals:

- **F-Pattern/Z-Pattern**: Natural eye movement supported by layout
- **Focal Points**: Clear visual entry points and calls-to-action
- **Size Relationships**: Appropriate relative sizing communicates importance
- **Weight and Emphasis**: Bold, color, and size used to guide attention
- **Scan-ability**: Easy to scan and find key information
- **CTA Prominence**: Newsletter signup and key actions clearly visible

**Reference**: Newsletter optimization from docs/DESIGN-PRINCIPLES.md

### 5. Cross-Device Responsiveness

Compare mobile (375px), tablet (768px), and desktop (1920px) screenshots:

- **Mobile Experience**: Readable without zooming, touch-friendly targets (44px minimum)
- **Tablet Experience**: Effective use of medium viewport, no awkward breakpoints
- **Desktop Experience**: Appropriate max-width (750-900px), no excessive line length
- **Breakpoints**: Smooth transitions between viewport sizes
- **Content Prioritization**: Most important content visible on mobile
- **Navigation**: Mobile navigation accessible and usable

**Reference**: Mobile-first principles per Constitution Principle VI

### 6. Accessibility Observations

Evaluate WCAG 2.1 AA compliance:

- **Color Contrast**: All text meets 4.5:1 ratio (3:1 for large text)
- **Text Readability**: Font size, line height, letter spacing appropriate
- **Focus States**: Visible keyboard navigation indicators (check interactive elements)
- **Touch Targets**: Minimum 44x44px for mobile touch targets
- **Alt Text Consideration**: Images should have descriptive alternatives (visual review only)
- **Semantic Structure**: Proper heading hierarchy (H1 → H2 → H3)

**Reference**: Constitution Principle III (NON-NEGOTIABLE)

## Output Format

Please provide your analysis in this structure:

### Executive Summary

High-level assessment of overall design quality (2-3 sentences)

### Pages Analyzed

- Homepage (/, 3 viewports)
- About Page (/about, 3 viewports)
- Blog Index (/blog, 3 viewports)
- Blog Post: Welcome (/blog/welcome, 3 viewports)

### Design Assessment

#### Typography

**Strengths**:
- [3-5 specific observations]

**Weaknesses**:
- [3-5 specific observations with measurements]

**Measurements**:
- Body text size: [measured px]
- Line height: [measured]
- Line length: [character count]

#### Color Scheme

**Strengths**:
- [3-5 specific observations]

**Weaknesses**:
- [3-5 specific observations with contrast ratios]

**Measurements**:
- Primary text contrast: [ratio]
- Heading contrast: [ratio]
- Link contrast: [ratio]

#### Spacing & Layout

**Strengths**:
- [3-5 specific observations]

**Weaknesses**:
- [3-5 specific observations]

#### Visual Hierarchy

**Strengths**:
- [3-5 specific observations]

**Weaknesses**:
- [3-5 specific observations]

#### Cross-Device Responsiveness

**Mobile (375px)**:
- [Observations specific to mobile viewport]

**Tablet (768px)**:
- [Observations specific to tablet viewport]

**Desktop (1920px)**:
- [Observations specific to desktop viewport]

**Overall Responsiveness**: [Rating: Excellent | Good | Needs Improvement | Poor]

### Accessibility Observations

**WCAG AA Compliance**:
- Color Contrast: [Pass/Fail with measurements]
- Text Readability: [Assessment]
- Touch Targets: [Assessment for mobile]
- Heading Structure: [Assessment]

### Improvement Recommendations

Provide 5-10 prioritized recommendations:

#### High Priority

Affects readability, accessibility, or mobile UX

1. **[Actionable Title]**
   - **Rationale**: Why this matters (reference constitution/design principles)
   - **Expected Impact**: What improves for users
   - **Implementation**: Specific steps to make the change

#### Medium Priority

Enhances aesthetics or consistency

1. **[Actionable Title]**
   - **Rationale**: Why this matters
   - **Expected Impact**: What improves for users
   - **Implementation**: Specific steps

#### Low Priority

Nice-to-have polish

1. **[Actionable Title]**
   - **Rationale**: Why this matters
   - **Expected Impact**: What improves for users
   - **Implementation**: Specific steps

### Consistency Analysis

Assessment of design system coherence across all pages:
- Typography consistency: [rating and notes]
- Color usage consistency: [rating and notes]
- Spacing patterns consistency: [rating and notes]
- Component consistency: [rating and notes]

**Overall Consistency Score**: [1-10] with explanation

## Additional Notes

- Focus on actionable, specific feedback
- Include measurements where possible (px, ratios, character counts)
- Reference Constitution Principle VI and docs/DESIGN-PRINCIPLES.md
- Ensure all recommendations are practical without requiring complete redesign
- Pri prioritize recommendations by impact on user experience
