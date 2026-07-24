# 07_BRANDS

## Objective

Design and implement the complete Brand Management module for the HOPSY PLAZA Admin Dashboard.

This module is responsible for creating, organizing, maintaining, and publishing product brands across the platform. Brands influence product organization, filtering, search, merchandising, promotions, customer navigation, and SEO.

The interface should provide enterprise-grade tools for managing both small and large brand catalogs while maintaining consistency with the rest of the Admin Dashboard.

This phase is responsible only for Brand Management.

**Do not implement Product, Category, Inventory, Order, Customer, Promotion, or CMS management beyond the integrations required by Brand Management.**

---

# Step 1 — Read Project Documentation

Before writing any code, thoroughly review:

* 00_READ_THIS_FIRST.md
* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 05_API_SPECIFICATION.md
* 07_ADMIN_DASHBOARD_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 10_CMS_SPECIFICATION.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Ensure implementation complies with documented architecture, business rules, and branding requirements.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities instead of relying only on its title.

Activate only the skills most appropriate for enterprise brand management.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* Dashboard Design
* Forms
* Validation
* API Integration
* State Management
* File Upload
* Accessibility
* Performance Optimization
* Motion Design
* Testing

Select the optimal combination specifically for this module.

---

# Step 3 — Brand Architecture

Build a scalable brand management system.

Support:

* Active Brands
* Hidden Brands
* Archived Brands
* Featured Brands
* Brand Collections (future-ready)

The architecture should support future expansion without redesign.

---

# Step 4 — Brand List

Create a high-performance brand table.

Display:

* Brand Logo
* Brand Name
* Slug
* Country/Region (if supported)
* Product Count
* Featured Status
* Visibility
* Status
* Created Date
* Last Updated

Support large datasets efficiently.

---

# Step 5 — Search, Filtering & Sorting

Support searching by:

* Brand Name
* Slug

Support filtering by:

* Status
* Visibility
* Featured
* Country/Region (if applicable)

Support sorting by:

* Name
* Product Count
* Created Date
* Updated Date
* Display Order

Allow multiple filters simultaneously.

---

# Step 6 — Create Brand

Implement a complete Create Brand workflow.

Support:

* Brand Name
* Slug
* Description
* Logo
* Banner Image (if supported)
* Website URL (if supported)
* Country/Region
* Display Order
* Visibility
* Status
* Featured Flag
* SEO Metadata

Validate all required fields before submission.

---

# Step 7 — Edit Brand

Allow administrators to modify every supported brand attribute.

Support:

* Dirty state detection
* Unsaved changes warning
* Validation before save
* Optimistic updates where appropriate
* Safe update workflow

---

# Step 8 — Brand Media

Support:

* Logo Upload
* Banner Upload
* Image Replacement
* Image Removal
* Image Preview

Optimize uploads and previews for performance.

---

# Step 9 — Brand SEO

Support management of:

* Meta Title
* Meta Description
* SEO Slug
* Canonical URL (if supported)
* Open Graph Image
* Search Visibility

SEO settings should integrate with the customer website.

---

# Step 10 — Brand Status

Support lifecycle states including:

* Draft
* Published
* Hidden
* Archived

Status transitions should follow documented business rules.

---

# Step 11 — Featured Brands

Support featured brand management.

Allow administrators to:

* Feature or unfeature brands
* Control display order
* Configure homepage visibility (where supported)

Presentation logic should remain data-driven.

---

# Step 12 — Bulk Operations

Support bulk actions including:

* Publish
* Hide
* Archive
* Delete (subject to business rules)
* Change Status
* Feature
* Unfeature
* Export

Require confirmation for destructive operations.

---

# Step 13 — Brand Preview

Allow administrators to preview brand pages before publication.

Preview should include:

* Logo
* Banner
* Description
* Product Listing
* SEO Metadata

Draft content must not be publicly accessible.

---

# Step 14 — API Integration

Integrate with brand APIs.

Support:

* CRUD Operations
* Search
* Filtering
* Sorting
* Pagination
* Media Management

Optimize requests through caching and efficient updates.

---

# Step 15 — Loading & Error States

Implement:

### Loading

* Table Skeleton
* Form Skeleton
* Upload Skeleton
* Preview Skeleton

### Error Handling

Handle:

* Validation failures
* Duplicate Slugs
* Upload failures
* Network interruptions
* API failures

Provide clear recovery guidance where appropriate.

---

# Step 16 — Accessibility

Ensure:

* Keyboard navigation
* Accessible forms
* Accessible tables
* Semantic HTML
* Screen-reader compatibility
* Focus management
* Accessible file uploads

---

# Step 17 — Performance

Optimize:

* Brand table rendering
* Search
* Filtering
* Pagination
* Image loading
* Form rendering
* API requests

Support large enterprise datasets without degrading responsiveness.

---

# Step 18 — Motion

Use **Framer Motion** for:

* Dialog transitions
* Form transitions
* Upload interactions
* Status changes
* Table interactions

Animations should reinforce usability while remaining subtle and performant.

---

# Step 19 — Security

Ensure:

* RBAC enforcement
* Permission-aware actions
* Secure file uploads
* Server-side validation
* Protected API endpoints
* Audit logging hooks

Only authorized administrators should manage brands.

---

# Step 20 — Out of Scope

Do **not** implement:

* Product Management
* Category Management
* Inventory Management
* Orders
* Customers
* Promotions
* CMS Management

Only implement Brand Management and its required integrations.

---

# Deliverables

The completed implementation should include:

* Brand List
* Search
* Filtering
* Sorting
* Brand Creation
* Brand Editing
* Brand Media Management
* Featured Brand Management
* SEO Management
* Brand Preview
* Bulk Operations
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The Brand Management module should provide administrators with a scalable and efficient system for managing brands across the HOPSY PLAZA platform.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for Brand Management.
* Brand CRUD functions correctly.
* Search, filtering, and sorting perform efficiently.
* Media uploads work reliably.
* Featured Brand management behaves correctly.
* SEO settings integrate properly.
* Preview reflects unpublished changes accurately.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is complete.
* No unrelated business modules have been implemented.
* No AI-generated design patterns are present.
* The Brand Management module is production-ready.

Only mark this task complete after every verification item has been satisfied.
