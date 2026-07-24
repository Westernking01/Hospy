# CUSTOMER WEBSITE — 05_LAYOUT_AND_NAVIGATION

## Objective

Design and implement the complete application shell, global layouts, navigation system, and shared customer-facing structure for the HOPSY PLAZA Customer Website.

This task is responsible only for the reusable layout architecture and navigation experience.

**Do not implement business pages such as Shop, Product Details, Cart, Checkout, Customer Dashboard, or Admin features.**

---

# Step 1 — Read Project Documentation

Before implementing anything, thoroughly read:

* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 06_CUSTOMER_WEBSITE_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 12_DEPLOYMENT_ARCHITECTURE.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Follow the documented UI/UX architecture exactly.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before writing any code:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities rather than selecting by name alone.

Activate only the skills most appropriate for this phase.

Typical skills may include:

* UI/UX Design
* Product Design
* Navigation Design
* Frontend Architecture
* Responsive Design
* Accessibility
* Motion Design
* Frontend Engineering
* Performance Optimization

Re-evaluate skills specifically for this implementation.

---

# Step 3 — Global Layout Architecture

Implement the complete application shell.

The layout should include:

* Global Header
* Navigation System
* Search Area
* Main Content Container
* Footer
* Global Announcement Area
* Breadcrumb Container
* Toast Container
* Modal Root
* Drawer Root

The layout should remain reusable across the entire storefront.

---

# Step 4 — Header Design

Create a premium retail header.

Include support for:

* HOPSY PLAZA Logo
* Primary Navigation
* Product Categories
* Search Entry Point
* Wishlist Shortcut
* Compare Shortcut
* Shopping Cart
* Customer Account
* Flash Sales Link
* Deals Link

The header should remain compact, clean, and premium.

Avoid oversized promotional headers.

---

# Step 5 — Navigation System

Implement a scalable navigation structure.

Support:

* Home
* Shop
* Categories
* Brands
* Flash Sales
* Deals
* About Us
* Contact
* FAQ

The navigation should support future expansion without redesign.

---

# Step 6 — Mega Menu Foundation

Create a premium mega menu.

Support:

* Category Groups
* Featured Categories
* Featured Brands
* Promotional Banner Area
* Quick Links

The mega menu should feel intentional and highly usable.

Avoid cluttered retail menus.

---

# Step 7 — Mobile Navigation

Design a mobile-first navigation experience.

Include:

* Mobile Drawer
* Category Navigation
* Search Access
* Customer Account
* Wishlist
* Cart
* Flash Sales

Navigation should require minimal taps.

---

# Step 8 — Search Entry

Implement the global search interface.

Prepare support for:

* Search Overlay
* Recent Searches
* Suggested Searches
* Popular Searches

Actual search functionality will be implemented later.

---

# Step 9 — Footer

Create a professional multi-column footer.

Include sections for:

* Company Information
* Product Categories
* Customer Support
* Policies
* Warranty Information
* Contact Information
* Social Media
* Newsletter Placeholder
* Copyright

Use the actual company information:

* **HOPSY PLAZA**
* Number 75, Ureje beside Immigration Office, Poly Road, Ado-Ekiti
* Phone: 07025552836
* Opening Hours: Monday–Saturday, 8:00 AM–8:00 PM

The footer should feel premium rather than crowded.

---

# Step 10 — Breadcrumb System

Create reusable breadcrumb navigation.

Support:

* Dynamic routes
* Hierarchical navigation
* Accessibility
* SEO-friendly structure

---

# Step 11 — Announcement Bar

Create a reusable announcement component.

Support CMS-managed announcements.

Examples include:

* Flash Sales
* Free Shipping Promotions
* Holiday Messages

The component should remain subtle and dismissible.

Avoid animated attention-grabbing effects.

---

# Step 12 — Global Feedback Components

Prepare reusable support for:

* Toast Notifications
* Success Messages
* Error Messages
* Warning Messages
* Information Messages

These should integrate with future business features.

---

# Step 13 — Loading & Error Layouts

Implement reusable layouts for:

* Global Loading
* Skeleton Screens
* 404 Page
* Error Page
* Maintenance Page (future-ready)

These should align with the Design System.

---

# Step 14 — Responsive Behaviour

Verify layouts for:

* Small Mobile
* Large Mobile
* Tablet
* Laptop
* Desktop
* Ultra-wide Displays

Navigation should adapt naturally without sacrificing usability.

---

# Step 15 — Accessibility

Ensure:

* Keyboard navigation
* Proper tab order
* Focus management
* ARIA attributes
* Screen reader compatibility
* Accessible navigation landmarks

Accessibility must be built into every navigation component.

---

# Step 16 — Performance

Optimize:

* Navigation rendering
* Lazy loading where appropriate
* Image optimization for logo assets
* Efficient state management
* Minimal client-side JavaScript

The layout should remain lightweight and performant.

---

# Step 17 — Animation

Use **Framer Motion** for subtle interactions.

Implement animations for:

* Mobile Drawer
* Mega Menu
* Search Overlay
* Toast Notifications
* Page Transitions
* Navigation Hover States

Animations should be:

* Fast
* Smooth
* Premium
* Purposeful

Avoid decorative or distracting effects.

---

# Step 18 — Out of Scope

Do **not** implement:

* Homepage sections
* Product Listing
* Product Details
* Cart Logic
* Checkout
* Authentication Logic
* Customer Dashboard
* Orders
* Payments
* Reviews
* CMS Functionality

Only implement the reusable layout and navigation system.

---

# Deliverables

The completed implementation should include:

* Global Layout
* Premium Header
* Navigation System
* Mega Menu Foundation
* Mobile Navigation
* Footer
* Breadcrumb System
* Search Entry UI
* Announcement Bar
* Global Toast Infrastructure
* Error Pages
* Loading Layouts
* Responsive Behaviour
* Accessible Navigation
* Premium Motion

These components should serve as the structural foundation for every customer-facing page.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for layout and navigation.
* Navigation is fully responsive.
* Layout is reusable.
* Mega Menu is scalable.
* Mobile navigation is intuitive.
* Footer contains the required company information.
* Accessibility requirements are satisfied.
* Animations are premium and restrained.
* No AI-generated design patterns are present.
* No business pages have been implemented.
* The layout is production-ready and ready to support all remaining storefront pages.

Only mark this task complete after every verification item has been satisfied.
