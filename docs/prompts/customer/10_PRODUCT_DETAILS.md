# CUSTOMER WEBSITE — 10_PRODUCT_DETAILS

## Objective

Design and implement the complete Product Details experience for the HOPSY PLAZA Customer Website.

This page is one of the most important conversion pages in the entire platform. It must feel comparable to the product pages of Apple, Samsung, Best Buy, and other premium electronics retailers while maintaining HOPSY PLAZA's own visual identity.

This task is responsible **only** for the Product Details experience.

**Do not implement Checkout, Customer Dashboard, Orders, or Admin functionality.**

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

The implementation must comply with every documented requirement.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before writing any code:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities rather than selecting based only on its title.

Activate only the skills most appropriate for building a premium enterprise Product Details experience.

Typical skills may include:

* Product Design
* UX Design
* UI Engineering
* Frontend Architecture
* Motion Design
* Accessibility
* Performance Optimization
* API Integration
* SEO
* Responsive Design
* State Management

Select the optimal combination specifically for this task.

---

# Step 3 — Product Information Architecture

Design the page to clearly present product information in a logical order.

The page should communicate:

* Product quality
* Trust
* Availability
* Value
* Purchase confidence

Avoid cluttered layouts or long walls of text.

---

# Step 4 — Product Gallery

Implement a premium media gallery.

Support:

* Unlimited product images
* Featured image
* Thumbnail navigation
* Zoom
* Full-screen preview
* Swipe support on mobile
* Keyboard navigation

Gallery performance should remain smooth on all devices.

---

# Step 5 — Product Summary

Display:

* Product Name
* Brand
* Category
* Current Price
* Previous Price
* Discount Percentage
* Availability
* SKU
* Rating
* Review Count
* Short Description

Information hierarchy should emphasize purchasing decisions.

---

# Step 6 — Variant Selection

Support every documented product variant.

Examples include:

* Color
* Storage
* RAM
* Capacity
* Size
* Edition
* Model

Selecting a variant should dynamically update:

* Images
* Price
* SKU
* Barcode
* Stock
* Availability
* Delivery Estimate

Variant changes should be instant and visually smooth.

---

# Step 7 — Purchase Panel

Implement a complete purchase section.

Include:

* Quantity Selector
* Add to Cart
* Buy Now
* Wishlist
* Compare
* Save for Later
* Share Product

Buttons should remain accessible and responsive.

---

# Step 8 — Delivery Information

Display delivery information dynamically.

Support:

* Estimated Delivery
* Pickup Availability
* Delivery Availability
* Delivery Speed
* International Shipping Notice

Use customer location when available.

---

# Step 9 — Warranty Information

Display:

* Warranty Status
* Warranty Duration
* Warranty Coverage
* Warranty Terms
* Link to Warranty Policy

This information should increase customer confidence.

---

# Step 10 — Product Specifications

Present specifications in a clean, scannable format.

Support unlimited specifications.

Examples:

* Display
* Processor
* Memory
* Storage
* Battery
* Connectivity
* Dimensions
* Weight
* Operating System
* Camera
* Audio
* Power

Specifications should be data-driven.

---

# Step 11 — Product Description

Support:

* Rich text
* Images
* Tables
* Lists

The layout should remain readable and responsive.

---

# Step 12 — Reviews

Display customer reviews.

Support:

* Overall Rating
* Rating Breakdown
* Review Count
* Customer Reviews
* Like Reviews
* Verified Purchase Indicator
* Review Sorting
* Pagination

Review submission will be handled separately through authenticated customer functionality.

---

# Step 13 — Recommendations

Implement recommendation sections for:

* Similar Products
* Frequently Bought Together
* Customers Also Viewed
* Recently Viewed
* Related Accessories

Recommendations should be data-driven.

---

# Step 14 — Product Bundles

Support bundled products.

Display:

* Bundle Price
* Individual Prices
* Savings
* Bundle Add to Cart

Bundles should integrate with promotions.

---

# Step 15 — Promotions

Display applicable promotions.

Examples:

* Flash Sales
* Coupon Availability
* Bundle Discounts
* Seasonal Promotions

Promotions should update automatically based on active campaigns.

---

# Step 16 — Inventory Awareness

Reflect inventory status.

Examples:

* In Stock
* Low Stock
* Out of Stock
* Reserved Stock
* Incoming Stock

Display inventory information without exposing internal operational details.

---

# Step 17 — CMS Integration

Support CMS-managed content for:

* Product Banners
* Promotional Messages
* Product Highlights
* Buying Guides
* Featured Accessories

Avoid hardcoded promotional content.

---

# Step 18 — SEO

Implement comprehensive Product SEO.

Include:

* Product Metadata
* Structured Data (Product Schema)
* Open Graph
* Twitter Cards
* Canonical URL
* Rich Snippets
* Optimized Image Metadata

The page should be optimized for search engines and social sharing.

---

# Step 19 — Accessibility

Ensure:

* Keyboard navigation
* Accessible image gallery
* Accessible forms
* Proper semantic HTML
* Screen-reader compatibility
* Focus management
* Color contrast compliance

Accessibility should meet modern web standards.

---

# Step 20 — Performance

Optimize:

* Image loading
* Lazy loading
* Code splitting
* Efficient API fetching
* Variant switching
* Review loading
* Recommendation loading

The page should remain performant even with large datasets.

---

# Step 21 — Animation

Use **Framer Motion** for:

* Gallery transitions
* Variant switching
* Purchase interactions
* Recommendation loading
* Review interactions
* Image zoom
* Micro-interactions

Animations should reinforce usability and feel premium.

---

# Step 22 — Error Handling

Handle gracefully:

* Product not found
* Invalid product slug
* Missing variant
* API failures
* Network failures
* Missing recommendations

Provide helpful recovery options.

---

# Step 23 — Out of Scope

Do **not** implement:

* Checkout
* Order History
* Customer Dashboard
* Admin Features
* Payment Processing

Only implement the complete Product Details experience.

---

# Deliverables

The completed implementation should include:

* Premium Product Gallery
* Variant Selection
* Purchase Panel
* Delivery Information
* Warranty Information
* Specifications
* Rich Description
* Reviews
* Recommendations
* Bundles
* Promotions
* Inventory Awareness
* CMS Integration
* SEO Optimization
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization

The Product Details page should provide customers with all the information they need to confidently purchase a product while maintaining a premium shopping experience.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for the Product Details implementation.
* Product gallery functions correctly.
* Variant switching updates all dependent information.
* Purchase panel integrates with Cart, Wishlist, Compare, and Save for Later entry points.
* Delivery and warranty information display correctly.
* Specifications are data-driven.
* Reviews and recommendations are integrated.
* Promotions and inventory status update dynamically.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* SEO requirements are fully implemented.
* Animations are premium and restrained.
* No AI-generated design patterns are present.
* No unrelated features have been implemented.
* The Product Details page is production-ready.

Only mark this task complete after every verification item has been satisfied.
