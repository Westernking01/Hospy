# CUSTOMER WEBSITE — 07_CATEGORY_PAGES

## Objective

Design and implement the complete Category browsing experience for the HOPSY PLAZA Customer Website.

This task is responsible only for category-related pages, category navigation, category landing pages, filtering within categories, and category discovery.

**Do not implement Product Details, Cart, Checkout, Customer Dashboard, or Admin features.**

---

# Step 1 — Read Project Documentation

Before implementing anything, thoroughly read:

* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 05_API_SPECIFICATION.md
* 06_CUSTOMER_WEBSITE_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 10_CMS_SPECIFICATION.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Follow all documented UI/UX, database, business, and API requirements.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementing anything:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities rather than relying only on its title.

Activate only the skills appropriate for category browsing.

Typical skills may include:

* Frontend Architecture
* Product Design
* UI Design
* UX Design
* Responsive Design
* Accessibility
* API Integration
* Performance Optimization
* SEO
* Testing

Select skills specifically for this task.

---

# Step 3 — Category Architecture

Create scalable category pages that support unlimited categories.

Primary categories include:

* Smartphones
* Laptops
* Tablets
* Smartwatches
* Accessories
* Gaming
* Networking
* Components
* TVs
* Cameras
* Audio
* Smart Home

The architecture must support future category expansion without redesign.

---

# Step 4 — Category Landing Page

Each category should include:

* Category Banner
* Category Title
* Short Description
* Product Count
* Breadcrumb Navigation
* Sorting Controls
* Filter Panel
* Product Grid
* Pagination
* Empty State

Content should be clean and easy to scan.

---

# Step 5 — Category Banner

Support CMS-managed category banners.

Banner should include:

* High-quality imagery
* Category title
* Optional promotional message
* CTA when applicable

Avoid oversized promotional banners.

---

# Step 6 — Product Grid

Display products using reusable product cards.

Each card should support:

* Product Image
* Brand
* Product Name
* Current Price
* Previous Price (if discounted)
* Discount Badge
* Rating
* Stock Status
* Wishlist Shortcut
* Compare Shortcut
* Quick View Entry
* Add to Cart Entry

Cards must be identical across all product discovery pages.

---

# Step 7 — Filtering

Support category filtering by:

* Brand
* Price Range
* Availability
* Rating

Design the filter panel for future expansion without requiring redesign.

---

# Step 8 — Sorting

Support sorting by:

* Featured
* Newest
* Price: Low to High
* Price: High to Low
* Best Selling
* Highest Rated

Sorting should integrate smoothly with pagination.

---

# Step 9 — Pagination

Implement scalable pagination.

Support:

* Page Navigation
* Items Per Page
* Total Results
* Current Page

The experience should remain fast with large catalogs.

---

# Step 10 — Empty States

When no products match:

Display:

* Friendly message
* Illustration placeholder (minimal)
* Clear Reset Filters action
* Suggested categories

Avoid generic empty-state templates.

---

# Step 11 — Loading States

Implement:

* Skeleton product cards
* Skeleton filters
* Skeleton banners

Loading transitions should remain consistent with the Design System.

---

# Step 12 — Error Handling

Handle:

* API failures
* Network issues
* Missing categories
* Invalid category slugs

Provide clear recovery actions.

---

# Step 13 — SEO

Each category page should support:

* Dynamic metadata
* Category-specific title
* Meta description
* Open Graph metadata
* Semantic heading structure
* Search-engine-friendly URLs

---

# Step 14 — Accessibility

Ensure:

* Keyboard navigation
* Accessible filter controls
* Proper form labels
* Semantic landmarks
* Screen-reader compatibility

Filtering and sorting should remain fully accessible.

---

# Step 15 — Performance

Optimize:

* Lazy-loaded images
* Efficient pagination
* Dynamic imports where appropriate
* Smooth scrolling
* Minimal unnecessary rendering

Large product catalogs should remain responsive.

---

# Step 16 — Animation

Use **Framer Motion** for:

* Product grid transitions
* Filter panel interactions
* Pagination transitions
* Skeleton replacement
* Hover interactions

Animations should be subtle and purposeful.

---

# Step 17 — Out of Scope

Do **not** implement:

* Product Details page
* Checkout
* Orders
* Customer Dashboard
* Reviews
* Wishlist logic
* Compare logic

Only implement category browsing.

---

# Deliverables

The completed implementation should include:

* Category landing pages
* CMS-integrated category banners
* Responsive product grid
* Filtering UI
* Sorting UI
* Pagination
* Loading states
* Empty states
* Error states
* SEO support
* Accessibility
* Responsive layouts
* Premium animations

The category browsing experience should feel fast, polished, and scalable.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for category browsing.
* Category pages support unlimited categories.
* Product cards remain consistent with the Design System.
* Filters and sorting behave correctly.
* Pagination performs efficiently.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* SEO is implemented.
* No AI-generated design patterns are present.
* No unrelated features have been implemented.
* The category browsing experience is production-ready.

Only mark this task complete after every verification item has been satisfied.
