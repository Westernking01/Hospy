# 08_DESIGN_SYSTEM.md

# Part 1 — Brand Foundation, Visual Language & Core Design Tokens

---

# 1. Purpose

This document defines the complete design system for the HOPSY PLAZA ecosystem.

The design system must be used consistently across:

* Customer Website
* Admin Dashboard

Its purpose is to create a unified visual language that scales as the application grows.

The design system governs:

* Branding
* Color system
* Typography
* Spacing
* Icons
* Elevation
* Borders
* Motion
* Components
* Accessibility
* Responsive behavior

Every interface must follow this design system.

---

# 2. Design Principles

The HOPSY PLAZA design language should communicate:

* Trust
* Quality
* Professionalism
* Simplicity
* Precision
* Reliability

Design should support functionality rather than decoration.

Every visual decision should improve usability.

---

# 3. Brand Personality

The visual identity should feel:

* Premium
* Modern
* Clean
* Confident
* Friendly
* Technology-focused
* Retail-oriented

The interface should inspire confidence in purchasing electronics online.

---

# 4. Brand Colors

Primary Colors

* White
* Orange

Supporting Colors

* Black
* Neutral Gray Scale
* Light Gray
* Soft Silver

Status Colors

* Success
* Warning
* Error
* Information

Status colors should be used only for communicating system state.

Orange should remain the primary interactive accent.

---

# 5. Color Usage Rules

Orange is reserved for:

* Primary buttons
* Active navigation
* Selected states
* Important call-to-action elements
* Focus highlights

Avoid overusing orange.

White space should dominate the interface.

Color should communicate importance rather than decorate.

---

# 6. Logo System

The HOPSY PLAZA logo should include:

* Simple icon
* Wordmark

Requirements:

* Scalable
* Minimal
* Professional
* Recognizable
* Suitable for light and dark surfaces

Avoid:

* Complex illustrations
* Mascots
* Initial-based monograms
* Decorative effects

If no finalized logo exists, AntiGravity may create a simple icon + wordmark that aligns with this design system and the project's branding.

---

# 7. Typography

Typography should establish hierarchy using:

* Size
* Weight
* Spacing

Not color.

Characteristics:

* Clean
* Professional
* Highly readable

The same typography scale should be used throughout the ecosystem.

---

# 8. Heading Hierarchy

Use consistent heading levels.

Examples:

* Page Titles
* Section Titles
* Card Titles
* Component Labels

Heading scale should remain predictable.

Avoid oversized marketing typography.

---

# 9. Body Typography

Body text should prioritize readability.

Requirements:

* Comfortable line length
* Proper line height
* Consistent paragraph spacing
* Appropriate font weight

Long-form content should remain easy to read.

---

# 10. Spacing System

Adopt a unified spacing scale.

Spacing applies to:

* Margins
* Padding
* Grid gutters
* Card layouts
* Forms
* Tables

Consistent spacing is essential for a premium appearance.

---

# 11. Layout Grid

The design system should define:

* Responsive containers
* Grid columns
* Gutters
* Maximum content widths
* Alignment rules

Every page should follow the same layout rhythm.

---

# 12. Border Radius

Use restrained corner rounding.

Avoid:

* Excessively rounded cards
* Bubble-like buttons
* Inconsistent border radii

Corner treatments should feel modern and professional.

---

# 13. Shadows & Elevation

Use elevation sparingly.

Appropriate use:

* Dropdowns
* Modals
* Floating Panels
* Navigation

Avoid heavy shadows on every component.

Depth should communicate hierarchy.

---

# 14. Borders

Borders should:

* Separate content
* Improve organization
* Remain subtle

Avoid unnecessary decorative borders.

---

# 15. Icon System

Icons should:

* Use one icon family
* Maintain consistent stroke width
* Scale consistently
* Align properly

Icons should support comprehension, not decoration.

---

# 16. AntiGravity Execution Instructions

Before implementing or refining the design system, AntiGravity must:

* Read every completed project document.
* Read the entire `08_DESIGN_SYSTEM.md`.
* Thoroughly inspect every available AntiGravity skill and intentionally select the most suitable skills for branding, design systems, typography, UI architecture, responsive layouts, accessibility, frontend implementation, and visual consistency.
* Analyze the user-provided reference designs and extract only layout, spacing, hierarchy, and interaction inspiration while preserving HOPSY PLAZA's branding.
* Build reusable design tokens and component foundations that are shared across both the Customer Website and the Admin Dashboard.
* Reject generic AI-generated design conventions and ensure every visual decision aligns with the premium design vision established throughout the project.
# 08_DESIGN_SYSTEM.md

# Part 2 — Component Library, Interaction Patterns & Design Tokens

---

# 17. Component Philosophy

Every component should be:

* Reusable
* Consistent
* Accessible
* Responsive
* Predictable
* Easy to maintain

Components must behave identically wherever they are used.

The design system should prioritize composition over creating one-off components.

---

# 18. Component Architecture

The component library should be organized into:

Foundation

* Colors
* Typography
* Icons
* Spacing
* Elevation

Basic Components

* Buttons
* Inputs
* Checkboxes
* Radios
* Switches

Navigation

* Header
* Sidebar
* Breadcrumb
* Pagination
* Tabs

Feedback

* Alerts
* Toasts
* Modals
* Empty States
* Skeleton Loaders

Commerce Components

* Product Cards
* Product Gallery
* Price Display
* Rating
* Quantity Selector
* Cart Summary

Data Components

* Tables
* Charts
* Filters
* Search
* Statistics Cards

---

# 19. Buttons

Supported button variants:

* Primary
* Secondary
* Outline
* Text
* Destructive
* Success (system use only)

Button states:

* Default
* Hover
* Active
* Focus
* Loading
* Disabled

Requirements:

* Consistent sizing
* Predictable padding
* Clear focus indicators
* Loading spinner without layout shift

Primary buttons should use the brand orange.

---

# 20. Input Components

Supported inputs:

* Text
* Email
* Password
* Phone
* Number
* Search
* URL
* Currency

Features:

* Labels
* Helper text
* Validation messages
* Prefixes
* Suffixes
* Password visibility toggle
* Clear button where appropriate

Inputs should remain visually consistent throughout the project.

---

# 21. Selection Components

Include:

* Checkbox
* Radio Button
* Toggle Switch
* Multi-select
* Combobox

Selection controls should provide:

* Keyboard support
* Focus visibility
* Error state
* Disabled state

---

# 22. Form System

Forms should support:

* Inline validation
* Server validation
* Required indicators
* Optional labels
* Loading state
* Success feedback
* Error summaries

Long forms should be divided into logical sections.

---

# 23. Dropdowns & Menus

Requirements:

* Keyboard navigation
* Searchable options (where appropriate)
* Scroll support
* Grouped items
* Icons (optional)

Dropdown positioning should adapt to viewport boundaries.

---

# 24. Cards

Supported card types:

* Product Card
* Dashboard Card
* Analytics Card
* Information Card
* Summary Card

Cards should:

* Maintain consistent spacing
* Avoid excessive shadows
* Use restrained borders
* Support loading states

Cards should communicate structure rather than decoration.

---

# 25. Product Components

Commerce-specific reusable components include:

* Product Card
* Product Gallery
* Product Specifications
* Price Component
* Discount Badge
* Availability Badge
* Warranty Card
* Delivery Estimate
* Review Summary

All commerce components should share the same visual language.

---

# 26. Navigation Components

Shared navigation includes:

* Header
* Sidebar
* Mobile Navigation
* Breadcrumb
* Pagination
* Tabs

Navigation should remain consistent across all pages.

---

# 27. Data Tables

Tables should support:

* Sorting
* Filtering
* Searching
* Pagination
* Column Visibility
* Sticky Header
* Row Selection
* Bulk Actions

Large datasets should remain performant.

---

# 28. Charts

Charts should emphasize readability.

Supported visualizations:

* Line Chart
* Bar Chart
* Area Chart
* Pie Chart (limited use)

Charts should:

* Adapt to responsive layouts
* Display tooltips
* Support date filtering

Avoid unnecessary visual embellishments.

---

# 29. Badges

Badge types:

* Status
* Inventory
* Payment
* Order
* Discount

Badges should communicate state clearly without dominating the interface.

---

# 30. Alerts & Notifications

Supported alert levels:

* Success
* Warning
* Error
* Information

Notification components include:

* Toast
* Inline Alert
* Banner Notification
* Modal Alert

Alerts should prioritize clarity over animation.

---

# 31. Modal System

Modal types:

* Confirmation
* Form
* Information
* Destructive Action

Requirements:

* Focus trapping
* Keyboard accessibility
* Overlay click behavior
* Responsive sizing

Destructive actions should require explicit confirmation.

---

# 32. Drawer System

Drawers should be used for:

* Filters
* Quick Editing
* Mobile Navigation
* Secondary Workflows

Drawers should never obscure critical information unnecessarily.

---

# 33. Loading Components

Use:

* Skeleton Loaders
* Progress Indicators
* Inline Loading States
* Button Loading States

Avoid full-page spinners unless absolutely necessary.

---

# 34. Empty States

Every empty state should include:

* Clear explanation
* Helpful illustration or simple icon (non-cartoon)
* Primary action
* Secondary guidance (if applicable)

Empty states should encourage the next meaningful action.

---

# 35. Error States

Error components should:

* Explain the issue in plain language
* Suggest recovery actions
* Preserve user-entered information where possible

Technical implementation details should never be exposed to end users.

---

# 36. Motion & Interaction

Animations should communicate:

* State changes
* Navigation
* Success
* Loading

Appropriate animations:

* Fade
* Slide
* Scale (subtle)
* Hover transitions

Avoid:

* Bounce
* Flashing
* Infinite animations
* Decorative motion

Motion should always improve usability.

---

# 37. Responsive Component Behavior

Every reusable component must adapt across:

* Mobile
* Tablet
* Laptop
* Desktop

Responsive behavior should preserve usability rather than merely shrinking content.

---

# 38. Accessibility Standards

Every component must support:

* Keyboard navigation
* Screen readers
* Proper ARIA usage where necessary
* Visible focus states
* High contrast requirements
* Semantic HTML

Accessibility is a core design requirement, not an enhancement.

---

# 39. Component Naming & Organization

Components should follow a consistent naming convention.

Examples:

* ProductCard
* ProductGallery
* PriceDisplay
* PrimaryButton
* SearchInput
* DataTable
* DashboardMetricCard

Reusable components should remain independent and composable.

---

# 40. AntiGravity Execution Instructions

Before implementing reusable components, AntiGravity must:

* Read every completed project document.
* Read the complete `08_DESIGN_SYSTEM.md`.
* Thoroughly inspect every available AntiGravity skill and intentionally select the most appropriate skills for component architecture, frontend engineering, accessibility, responsive design, interaction design, animation, performance optimization, and design systems.
* Build reusable components that serve both the Customer Website and the Admin Dashboard without duplicating logic or styles.
* Ensure all components consume centralized design tokens and maintain strict visual consistency.
* Reject generic component libraries that conflict with the project's design language, and refine generated components until they meet premium production standards.
# 08_DESIGN_SYSTEM.md

# Part 3 — Design Tokens, Responsive Standards, Implementation Rules & Completion

---

# 41. Design Tokens Philosophy

Design tokens are the single source of truth for the visual system.

All reusable values must be centralized instead of being hardcoded throughout the application.

Tokens should control:

* Colors
* Typography
* Spacing
* Border Radius
* Elevation
* Borders
* Opacity
* Motion
* Z-Index
* Breakpoints

Every component should consume these shared tokens.

---

# 42. Color Tokens

The design system should define reusable tokens for:

Brand

* Primary
* Primary Hover
* Primary Active

Neutral

* Background
* Surface
* Border
* Divider
* Text Primary
* Text Secondary
* Disabled

Feedback

* Success
* Warning
* Error
* Information

The implementation should support future expansion without requiring component refactoring.

---

# 43. Typography Tokens

Typography tokens should define:

* Font Family
* Font Size Scale
* Font Weight Scale
* Line Heights
* Letter Spacing

Apply these consistently across:

* Marketing pages
* Product pages
* Dashboard
* Forms
* Tables
* Notifications

---

# 44. Spacing Tokens

A unified spacing scale should be used for:

* Margins
* Padding
* Grid Gaps
* Card Spacing
* Form Layouts
* Table Cells
* Section Separation

Spacing should remain mathematically consistent across the entire ecosystem.

---

# 45. Border Radius Tokens

Create reusable radius values for:

* Buttons
* Inputs
* Cards
* Dialogs
* Dropdowns
* Images

Avoid mixing multiple unrelated corner styles.

The interface should feel refined and cohesive.

---

# 46. Elevation Tokens

Define standardized elevation levels for:

* Cards
* Navigation
* Dropdowns
* Popovers
* Modals
* Drawers

Elevation should communicate hierarchy rather than decoration.

---

# 47. Border Tokens

Standardize border styles for:

* Cards
* Tables
* Inputs
* Dividers
* Navigation

Borders should remain subtle and consistent.

---

# 48. Z-Index Hierarchy

Define a predictable layering system for:

* Header
* Sidebar
* Dropdowns
* Tooltips
* Drawers
* Modals
* Toast Notifications
* Loading Overlays

Layering conflicts should be prevented through centralized token management.

---

# 49. Responsive Breakpoints

The design system should define consistent breakpoints for:

* Small Mobile
* Mobile
* Tablet
* Laptop
* Desktop
* Large Desktop

Responsive behavior must be shared across both applications.

---

# 50. Motion Tokens

Motion should use centralized timing values.

Define reusable durations for:

* Hover
* Focus
* Drawer Opening
* Modal Opening
* Toast Appearance
* Page Transition

Motion should remain subtle and purposeful.

---

# 51. Icon Standards

All icons should:

* Come from a single icon family
* Maintain consistent stroke widths
* Align to the design grid
* Scale predictably

Icons should never be stretched or distorted.

---

# 52. Image Standards

Images should follow consistent rules.

Product Images:

* High Resolution
* Consistent Aspect Ratio
* Optimized Loading

Banner Images:

* Responsive
* High Quality
* CMS Managed

Brand Logos:

* Transparent Background
* Uniform Presentation

Image optimization should occur automatically where possible.

---

# 53. Accessibility Standards

The design system should guarantee:

* WCAG-conscious color contrast
* Keyboard accessibility
* Semantic structure
* Focus visibility
* Responsive typography
* Screen reader compatibility

Accessibility must be validated during implementation.

---

# 54. Performance Standards

Reusable components should prioritize:

* Small bundle size
* Code splitting
* Lazy loading
* Efficient rendering
* Reusability
* Minimal re-renders

Performance optimization should never reduce usability.

---

# 55. Documentation Standards

Every reusable component should include documentation covering:

* Purpose
* Props
* Variants
* States
* Accessibility considerations
* Usage examples
* Design guidelines

Documentation should remain synchronized with implementation.

---

# 56. Naming Conventions

Maintain consistent naming for:

Design Tokens

Components

Hooks

Utilities

Layouts

Pages

CSS Variables

File Organization

Naming should be descriptive, predictable, and scalable.

---

# 57. Future Scalability

The design system should support future additions such as:

* Multiple warehouses
* Multiple administrators
* Additional payment gateways
* Multi-language support
* Multi-currency support
* Dark Mode (Future Enhancement)

Current implementation should not block these future capabilities.

---

# 58. AntiGravity Execution Instructions

Before implementing or refining the shared design system, AntiGravity must:

* Read every completed project document from `00_PROJECT_MANIFEST.md` through `07_ADMIN_DASHBOARD_UI_UX.md`.
* Read the complete `08_DESIGN_SYSTEM.md`.
* Thoroughly inspect every available AntiGravity skill and intentionally select the most suitable skills for design systems, token architecture, frontend engineering, accessibility, responsive design, animation, performance optimization, and component libraries.
* Centralize all reusable design values into shared design tokens rather than hardcoded values.
* Ensure both the Customer Website and Admin Dashboard consume the same foundational design language while allowing each application to maintain its own layout identity.
* Validate consistency, accessibility, responsiveness, scalability, and maintainability before finalizing implementation.
* Reject generic UI kits or AI-generated styling patterns that conflict with the documented visual identity.

---

# 59. Design System Acceptance Criteria

The design system is considered complete when:

* All visual decisions are driven by centralized design tokens.
* Components are reusable, composable, and consistent.
* Typography, spacing, color, and elevation remain uniform across the ecosystem.
* Responsive behavior is predictable across supported devices.
* Accessibility standards are consistently applied.
* Performance remains optimized through reusable architecture.
* Documentation is complete and aligned with implementation.
* Both the Customer Website and Admin Dashboard present a cohesive brand experience while serving different user needs.
* The final interface demonstrates craftsmanship comparable to premium commercial software rather than generic templates or AI-generated layouts.

---

# 60. Definition of Success

The HOPSY PLAZA Design System is successful when it serves as the single visual and interaction foundation for every current and future interface.

It should enable rapid development, maintain visual consistency, simplify long-term maintenance, and ensure that every user-facing experience reflects the company's premium brand identity while remaining scalable, accessible, performant, and production-ready.
