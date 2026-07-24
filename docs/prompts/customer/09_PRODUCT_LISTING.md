# CUSTOMER WEBSITE — 09_PRODUCT_LISTING

## Objective

Design and implement the complete Product Listing experience for the HOPSY PLAZA Customer Website.

This task is responsible for the Shop page, product discovery, filtering, sorting, pagination, and product browsing across the entire catalog.

**Do not implement the Product Details page, Cart, Checkout, Customer Dashboard, or Admin functionality.**

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

The implementation must comply with all documented architecture, business rules, and design standards.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before writing any code:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of every available skill instead of selecting by name alone.

Activate only the skills best suited for implementing a modern enterprise e-commerce product catalog.

Typical skills may include:

* Frontend Architecture
* Product Design
* UI Design
* UX Design
* API Integration
* Performance Optimization
* Responsive Design
* Accessibility
* SEO
* Motion Design
* State Management

Select the optimal combination specifically for this task.

---

# Step 3 — Shop Architecture

Implement a dedicated Shop page that serves as the primary product discovery experience.

The page should support:

* Entire product catalog
* Dynamic filters
* Sorting
* Search integration
* Pagination
* Product recommendations
* CMS promotional sections

The architecture must support thousands of products without redesign.

---

# Step 4 — Product Grid

Implement a premium, responsive product grid.

Every product card must support:

* Featured Image
* Product Name
* Brand
* Category
* Current Price
* Previous Price
* Discount Percentage
* Stock Status
* Rating
* Review Count
* Wishlist Shortcut
* Compare Shortcut
* Quick View
* Add to Cart
* Delivery Indicator
* Warranty Indicator

Cards should be reusable across the entire application.

---

# Step 5 — Filtering System

Implement an enterprise-grade filtering experience.

Support filtering by:

### Product

* Category
* Brand

### Pricing

* Minimum Price
* Maximum Price
* Price Range

### Availability

* In Stock
* Low Stock
* Out of Stock

### Ratings

* 5 Stars
* 4 Stars & Above
* 3 Stars & Above

### Promotions

* Flash Sale
* Discounted
* Featured

### Warranty

* With Warranty

Design the filter architecture to support future additions without requiring structural changes.

---

# Step 6 — Sorting

Support sorting by:

* Featured
* Newest
* Best Selling
* Highest Rated
* Price: Low → High
* Price: High → Low
* Biggest Discount
* Alphabetical

Sorting should integrate seamlessly with filters and pagination.

---

# Step 7 — Product View Modes

Support:

* Grid View
* List View

Users should be able to switch layouts without affecting functionality.

---

# Step 8 — Product Quick View

Implement a reusable Quick View modal.

Include:

* Product Images
* Basic Specifications
* Price
* Availability
* Variant Selection
* Quantity Selector
* Add to Cart
* Wishlist
* Compare
* View Full Details

Do not duplicate the Product Details page.

---

# Step 9 — Product Variants

Display variant information including:

* Storage Capacity
* RAM
* Color
* Size
* Model
* Other product-specific attributes

Changing a variant should update:

* Price
* Availability
* SKU
* Images
* Stock

---

# Step 10 — Product Labels

Support dynamic labels such as:

* New Arrival
* Best Seller
* Flash Sale
* Limited Stock
* Out of Stock
* Featured
* Discount

Labels should be data-driven rather than hardcoded.

---

# Step 11 — Pagination

Implement scalable pagination.

Support:

* Page Numbers
* Previous / Next
* Items Per Page
* Total Products
* Total Pages

The implementation should perform efficiently with large catalogs.

---

# Step 12 — Loading States

Implement skeleton loading for:

* Product Grid
* Filters
* Sorting Controls
* Quick View
* Pagination

Loading should feel smooth and premium.

---

# Step 13 — Empty States

Handle situations where:

* No products exist
* Filters return no results
* Search returns no results

Provide:

* Helpful messaging
* Reset Filters action
* Product recommendations
* Category suggestions

---

# Step 14 — Error Handling

Handle gracefully:

* API failures
* Missing products
* Invalid filters
* Network failures

Display informative but secure error messages.

---

# Step 15 — CMS Integration

Support CMS-managed content including:

* Promotional banners
* Featured collections
* Seasonal campaigns
* Homepage featured products
* Product ribbons

Avoid hardcoding promotional content.

---

# Step 16 — SEO

Support:

* Dynamic metadata
* Clean URLs
* Canonical URLs
* Structured metadata
* Product indexability
* Pagination metadata

Ensure the Shop page remains search-engine friendly.

---

# Step 17 — Accessibility

Ensure:

* Keyboard navigation
* Accessible filter controls
* Accessible product cards
* Proper semantic structure
* Screen-reader compatibility
* Focus management

Every interaction should remain accessible.

---

# Step 18 — Performance

Optimize for:

* Lazy-loaded images
* Infinite scalability
* Efficient rendering
* Virtualization where appropriate
* Code splitting
* Cached product queries
* Optimized API requests

The page should remain performant on both desktop and mobile devices.

---

# Step 19 — Animation

Use **Framer Motion** to create subtle, premium interactions.

Include animations for:

* Product card hover
* Grid transitions
* List transitions
* Quick View modal
* Filter drawer
* Pagination
* Loading transitions

Animations should enhance usability rather than distract from it.

---

# Step 20 — Out of Scope

Do **not** implement:

* Product Details page
* Cart functionality
* Checkout
* Orders
* Customer Dashboard
* Review submission
* Wishlist business logic
* Compare business logic

Only implement the complete Product Listing experience.

---

# Deliverables

The completed implementation should include:

* Shop Page
* Responsive Product Grid
* List View
* Enterprise Filtering
* Sorting
* Pagination
* Quick View
* Variant Preview
* Product Labels
* CMS Integration
* SEO Support
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization

The Shop page should provide a premium browsing experience capable of handling a large electronics catalog while maintaining excellent usability and performance.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for product listing.
* Product cards are reusable and consistent.
* Filtering works correctly.
* Sorting works correctly.
* Pagination performs efficiently.
* Quick View functions correctly.
* Variant previews update dynamically.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* SEO requirements are implemented.
* No AI-generated design patterns are present.
* No unrelated features have been implemented.
* The Product Listing experience is production-ready.

Only mark this task complete after every verification item has been satisfied.
