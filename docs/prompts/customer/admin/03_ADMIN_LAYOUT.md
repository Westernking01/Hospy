# 03_ADMIN_LAYOUT

## Objective

Design and implement the complete Admin Layout for the HOPSY PLAZA Admin Dashboard.

This module creates the reusable application shell that every authenticated administrator will use. It defines the overall structure, navigation, responsiveness, layout behavior, and shared user interface elements for all subsequent dashboard modules.

The Admin Layout must provide a premium enterprise experience comparable to internal tools used by leading technology companies. It should emphasize clarity, efficiency, scalability, and consistency.

This phase is responsible only for the layout infrastructure and shared navigation components.

**Do not implement business modules such as Products, Orders, Customers, Inventory, Reports, or Analytics during this phase.**

---

# Step 1 — Read Project Documentation

Before writing any code, thoroughly review:

* 00_READ_THIS_FIRST.md
* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 04_AUTHENTICATION_AND_SECURITY.md
* 07_ADMIN_DASHBOARD_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Ensure the layout follows the documented architecture, design language, accessibility requirements, and security rules.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of each skill rather than relying only on the skill name.

Activate only the skills most appropriate for implementing an enterprise dashboard shell.

Typical skills may include:

* Frontend Architecture
* Dashboard Design
* UI Engineering
* UX Design
* Responsive Design
* Accessibility
* Motion Design
* State Management
* Performance Optimization
* Authentication Integration

Select the optimal combination specifically for this implementation.

---

# Step 3 — Layout Architecture

Implement a reusable layout architecture.

The layout should include:

* Persistent Sidebar
* Top Header
* Main Content Area
* Breadcrumb Region
* Global Notification Area
* Global Modal Layer
* Toast Layer
* Overlay Layer

The layout must support nested routes without duplication.

---

# Step 4 — Sidebar Navigation

Implement a premium enterprise sidebar.

Support:

* Logo
* Workspace / Company Name
* Navigation Groups
* Expandable Menu Sections
* Active Route Highlighting
* Permission-aware Navigation
* Collapsible Sidebar
* Icon Support
* Smooth Collapse / Expand
* Keyboard Accessibility

Sidebar behavior should remain consistent across every module.

---

# Step 5 — Top Header

Create a professional application header.

Include:

* Global Search Entry Point
* Breadcrumbs
* Notifications Shortcut
* Theme Toggle (if supported)
* User Avatar
* User Name
* User Role
* Profile Menu
* Logout Action

The header should remain fixed during page scrolling.

---

# Step 6 — Breadcrumb System

Implement dynamic breadcrumbs.

Requirements:

* Automatically generated from routing
* Custom breadcrumb overrides
* Permission-aware visibility
* Responsive truncation
* Clickable navigation history

Breadcrumbs should help administrators maintain orientation.

---

# Step 7 — Navigation System

Prepare navigation for future modules.

Include entries for:

* Dashboard
* Products
* Categories
* Brands
* Inventory
* Orders
* Customers
* Reviews
* Promotions
* CMS
* Reports
* Settings
* Analytics
* Notifications

Only navigation should be implemented at this stage; the modules themselves will be added later.

---

# Step 8 — Responsive Behaviour

Support:

Desktop

* Expanded Sidebar
* Collapsed Sidebar

Tablet

* Collapsible Navigation Drawer

Mobile

* Off-canvas Navigation
* Overlay Navigation
* Touch-friendly interactions

Ensure navigation remains intuitive on every device size.

---

# Step 9 — Global Search Entry

Implement the shared search entry point.

Prepare infrastructure for future support of:

* Products
* Orders
* Customers
* Brands
* Categories
* CMS Content

Only the UI entry point and architecture should be created during this phase.

---

# Step 10 — User Menu

Create a reusable user profile menu.

Support:

* Profile
* Account Settings
* Security
* Preferences
* Logout

Only navigation should be implemented.

Business pages are out of scope.

---

# Step 11 — Global Notification Area

Implement the notification entry point.

Support:

* Notification Badge
* Unread Count
* Notification Drawer Placeholder
* Permission-aware visibility

Notification functionality will be implemented later.

---

# Step 12 — Shared Layout Components

Create reusable layout primitives.

Examples:

* Page Container
* Page Header
* Section Header
* Content Grid
* Card Container
* Widget Container
* Empty Layout State

These components should remain generic and reusable.

---

# Step 13 — Route Integration

Integrate the layout with:

* Protected Routes
* Nested Layouts
* Route Guards
* Authentication
* Authorization

Unauthorized users should never access the layout.

---

# Step 14 — Loading Experience

Implement shared loading experiences.

Examples:

* Full Layout Skeleton
* Sidebar Skeleton
* Header Skeleton
* Navigation Loading
* Page Transition Loading

Loading should appear polished and consistent.

---

# Step 15 — Error Experience

Provide reusable handling for:

* Unauthorized Access
* Forbidden Pages
* Missing Routes
* Unexpected Layout Errors
* Network Issues

Display professional recovery options without exposing implementation details.

---

# Step 16 — Accessibility

Ensure:

* Keyboard navigation
* Skip-to-content link
* Semantic landmarks
* Accessible navigation
* Proper focus management
* Screen-reader compatibility
* Accessible menus
* Accessible drawers

Navigation should be fully usable without a mouse.

---

# Step 17 — Performance

Optimize:

* Sidebar rendering
* Navigation state
* Route transitions
* Layout persistence
* Lazy-loaded navigation assets
* Memoized layout components

The layout should remain responsive even as the dashboard grows.

---

# Step 18 — Motion

Use **Framer Motion** for:

* Sidebar expansion
* Drawer transitions
* Menu interactions
* Page transitions
* Header interactions
* Navigation highlights

Animations should feel refined and purposeful.

---

# Step 19 — Security

Ensure:

* Navigation respects RBAC.
* Hidden routes remain inaccessible even if manually entered.
* Layout data follows authorization rules.
* User information displayed in the header is permission-aware.

No navigation element should reveal unauthorized functionality.

---

# Step 20 — Out of Scope

Do **not** implement:

* Dashboard widgets
* Product Management
* Orders
* Inventory
* Customers
* Promotions
* Reports
* Analytics
* Notification functionality

Only implement the reusable Admin Layout infrastructure.

---

# Deliverables

The completed implementation should include:

* Enterprise Admin Layout
* Persistent Sidebar
* Top Header
* Breadcrumb System
* Navigation Infrastructure
* Responsive Navigation
* User Menu
* Global Notification Entry Point
* Shared Layout Components
* Protected Layout Integration
* Loading Experience
* Error Experience
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The Admin Layout should provide a scalable, consistent, and production-ready foundation that every future dashboard module will inherit.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for the Admin Layout.
* Sidebar behaves correctly across supported screen sizes.
* Header functions correctly.
* Breadcrumbs update dynamically.
* Navigation respects permissions.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Motion is refined and purposeful.
* Security validation is complete.
* No business modules have been implemented.
* No AI-generated design patterns are present.
* The Admin Layout is production-ready.

Only mark this task complete after every verification item has been satisfied.
