# CUSTOMER WEBSITE — 16_FLASH_SALES_DEALS_AND_PROMOTIONS

## Objective

Design and implement the complete Flash Sales, Deals, Promotions, Coupons, and Campaign experience for the HOPSY PLAZA Customer Website.

This module should maximize product discovery and conversions while remaining completely data-driven through the CMS and backend. Marketing content must never be hardcoded.

This task is responsible only for customer-facing promotional experiences.

**Do not implement Admin promotion management.**

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

The implementation must follow every documented business rule and CMS requirement.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities instead of relying only on its title.

Activate only the skills most appropriate for implementing enterprise e-commerce promotional experiences.

Typical skills may include:

* Frontend Architecture
* UI Design
* UX Design
* CMS Integration
* API Integration
* Performance Optimization
* Accessibility
* Motion Design
* Responsive Design
* State Management

Choose the optimal combination specifically for this task.

---

# Step 3 — Promotions Architecture

Build a scalable promotion system supporting:

* Flash Sales
* Daily Deals
* Weekly Deals
* Featured Deals
* Bundle Deals
* Coupon Campaigns
* Seasonal Promotions
* Holiday Campaigns
* Brand Promotions
* Category Promotions

The architecture must support future promotional types without redesign.

---

# Step 4 — Flash Sales Page

Create a dedicated Flash Sales page.

Display:

* Hero Banner
* Countdown Timer
* Promotional Message
* Product Grid
* Remaining Stock Indicator
* Discount Percentage
* Original Price
* Current Price
* Add to Cart
* Wishlist
* Compare
* Quick View

The page should create urgency without becoming visually overwhelming.

---

# Step 5 — Deals Page

Create a dedicated Deals page.

Support:

* Best Deals
* Featured Deals
* Today's Deals
* Clearance
* New Promotions
* Brand Promotions
* Category Promotions

Products should reuse the standard product card component.

---

# Step 6 — Coupon Experience

Implement customer-facing coupon functionality.

Support:

* Available Coupons
* Coupon Details
* Eligibility Requirements
* Expiration Date
* Copy Coupon Code
* Apply Coupon Entry Point
* Coupon Status

Do not expose internal business logic.

Coupon validation remains server-side.

---

# Step 7 — Promotional Banners

Support CMS-managed promotional banners.

Examples:

* Homepage Hero
* Homepage Mid-page
* Shop Banner
* Category Banner
* Brand Banner
* Flash Sale Banner

Banner content should update automatically from the CMS.

---

# Step 8 — Promotional Product Labels

Support dynamic product badges including:

* Flash Sale
* Best Deal
* Limited Time
* New Arrival
* Best Seller
* Bundle Offer
* Clearance
* Featured
* Discount

Labels should be driven entirely by backend data.

---

# Step 9 — Countdown Timers

Support countdown timers for:

* Flash Sales
* Campaigns
* Coupon Expiration
* Seasonal Promotions

Countdowns should use server time where appropriate to avoid client-side inconsistencies.

---

# Step 10 — Campaign Landing Pages

Support reusable promotional landing pages.

Examples:

* Black Friday
* Christmas Sale
* New Year Sale
* Back to School
* Independence Day
* Anniversary Campaign

Landing pages should be generated dynamically from CMS content where possible.

---

# Step 11 — Cross-Feature Integration

Integrate promotions with:

* Homepage
* Product Listing
* Product Details
* Search
* Wishlist
* Cart
* Checkout

Promotional pricing and eligibility must remain consistent across the platform.

---

# Step 12 — Loading & Error States

Implement:

### Loading

* Skeleton Product Cards
* Skeleton Banners
* Skeleton Countdown
* Skeleton Campaign Sections

### Error Handling

Handle:

* Expired promotions
* Invalid promotions
* API failures
* Network failures
* Missing CMS content

Provide graceful fallback experiences.

---

# Step 13 — Accessibility

Ensure:

* Keyboard navigation
* Accessible countdown displays
* Accessible promotional banners
* Semantic HTML
* Screen-reader compatibility

Promotional content must remain usable by all customers.

---

# Step 14 — Performance

Optimize:

* Banner loading
* Lazy-loaded campaign images
* Countdown efficiency
* Product rendering
* Cached promotion data

Promotional pages should remain responsive even during major campaigns.

---

# Step 15 — Animation

Use **Framer Motion** for:

* Banner transitions
* Countdown updates
* Promotional card interactions
* Campaign entrance animations
* Product hover states

Animations should increase engagement without reducing performance.

---

# Step 16 — Security

Ensure:

* Promotion eligibility is verified on the server.
* Coupon validation is server-side.
* Promotional prices cannot be manipulated by the client.
* Expired promotions cannot be exploited.

Never trust promotional calculations performed only in the browser.

---

# Step 17 — Responsive Behaviour

Support:

* Mobile
* Tablet
* Laptop
* Desktop

Promotional pages should remain visually compelling and easy to navigate on every screen size.

---

# Step 18 — Out of Scope

Do **not** implement:

* Promotion creation
* Promotion editing
* CMS management interfaces
* Admin campaign tools

Only implement customer-facing promotional experiences.

---

# Deliverables

The completed implementation should include:

* Flash Sales Page
* Deals Page
* Coupon Experience
* Promotional Banners
* Dynamic Product Labels
* Countdown Timers
* Campaign Landing Pages
* CMS Integration
* Cross-Feature Integration
* Loading States
* Error Handling
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The promotional experience should increase customer engagement while remaining fully data-driven and easy to manage through the CMS.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for promotional features.
* Flash Sales function correctly.
* Deals pages display accurate pricing.
* Coupons integrate correctly with Checkout.
* Promotional banners are CMS-driven.
* Countdown timers remain accurate.
* Product badges update dynamically.
* Cross-feature promotional consistency is maintained.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is implemented.
* Animations are premium and restrained.
* No AI-generated design patterns are present.
* No unrelated features have been implemented.
* The promotional experience is production-ready.

Only mark this task complete after every verification item has been satisfied.
