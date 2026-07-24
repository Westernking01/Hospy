# 05_PRODUCTS

## Objective

Design and implement the complete Product Management module for the HOPSY PLAZA Admin Dashboard.

This module is the central hub for creating, managing, organizing, publishing, and maintaining the entire product catalog. It must support enterprise-scale operations while remaining fast, intuitive, secure, and highly maintainable.

The interface should prioritize productivity for administrators managing thousands of products.

This phase is responsible only for Product Management.

**Do not implement Category, Brand, Inventory, Order, Customer, or CMS management beyond the integrations required by Product Management.**

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

Ensure implementation follows documented architecture, business rules, and product lifecycle requirements.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read each skill's description and capabilities instead of relying solely on its title.

Activate only the skills most appropriate for enterprise product management.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* Dashboard Design
* Forms
* Validation
* Database Design
* API Integration
* State Management
* File Upload
* Performance Optimization
* Accessibility
* Motion Design
* Testing

Select the optimal combination specifically for this module.

---

# Step 3 — Product Module Architecture

Build a modular product management system.

The architecture should support:

* Large product catalogs
* Future feature expansion
* Reusable components
* Independent feature modules
* Clean separation of concerns

---

# Step 4 — Product List

Create a high-performance product table.

Display:

* Product Image
* Product Name
* SKU
* Category
* Brand
* Price
* Discount Price
* Stock Status
* Product Status
* Visibility
* Created Date
* Last Updated

Support thousands of records efficiently.

---

# Step 5 — Product Search

Implement enterprise search.

Support searching by:

* Product Name
* SKU
* Barcode
* Brand
* Category
* Status
* Tags

Results should update efficiently without unnecessary requests.

---

# Step 6 — Filtering & Sorting

Support filtering by:

* Category
* Brand
* Status
* Visibility
* Stock Status
* Price Range
* Date Created
* Date Updated
* Featured
* Promotion Status

Support sorting by all major columns.

Allow multiple filters simultaneously.

---

# Step 7 — Product Creation

Implement a comprehensive Create Product workflow.

Support:

* Basic Information
* Product Name
* Slug
* Short Description
* Full Description
* Category
* Brand
* Tags
* SKU
* Barcode
* Product Images
* Product Gallery
* Price
* Discount Price
* Tax Settings
* Shipping Information
* SEO Metadata
* Product Status
* Visibility
* Featured Flag

Use multi-section forms where appropriate.

---

# Step 8 — Product Editing

Support editing every product attribute.

Requirements:

* Dirty state detection
* Unsaved changes warning
* Optimistic UI where appropriate
* Validation before save
* Version consistency

---

# Step 9 — Product Images

Support:

* Multiple Images
* Drag-and-drop Upload
* Image Reordering
* Featured Image
* Image Preview
* Image Replacement
* Image Removal

Optimize uploads and previews.

---

# Step 10 — Product Variants

Support products with variants.

Examples:

* Color
* Storage
* Capacity
* Size
* Model
* Edition

Each variant should support:

* SKU
* Barcode
* Price
* Stock
* Status
* Images

Variants should integrate cleanly with Inventory.

---

# Step 11 — Product Specifications

Allow administrators to manage:

* Technical Specifications
* Feature Lists
* Included Accessories
* Warranty Information
* Product Dimensions
* Weight

Specifications should be structured rather than free-form where practical.

---

# Step 12 — Product Status

Support lifecycle states such as:

* Draft
* Published
* Scheduled
* Archived
* Hidden

Status changes should follow documented business rules.

---

# Step 13 — Bulk Operations

Support bulk actions including:

* Publish
* Unpublish
* Archive
* Delete (subject to business rules)
* Change Category
* Change Brand
* Update Status
* Export
* Import

Bulk operations should provide confirmation and progress feedback.

---

# Step 14 — Import & Export

Support structured product import and export.

Requirements:

* Validation
* Error Reporting
* Duplicate Detection
* Preview Before Import
* Rollback Support where appropriate

Follow documented import formats.

---

# Step 15 — Product Preview

Allow administrators to preview products as customers will see them before publishing.

Preview should reflect current draft data without exposing unpublished products publicly.

---

# Step 16 — API Integration

Integrate with product APIs.

Support:

* Create
* Read
* Update
* Delete
* Search
* Filtering
* Pagination
* Variant Management
* Media Management

Optimize requests through caching and efficient updates.

---

# Step 17 — Loading & Error States

Implement:

### Loading

* Table Skeleton
* Form Skeleton
* Image Upload Skeleton
* Preview Loading

### Error Handling

Handle:

* Validation failures
* Upload failures
* API failures
* Network interruptions
* Duplicate SKU conflicts
* Duplicate Barcode conflicts

Provide actionable error messages.

---

# Step 18 — Accessibility

Ensure:

* Keyboard navigation
* Accessible tables
* Accessible forms
* Semantic HTML
* Screen-reader compatibility
* Focus management
* Accessible file uploads

---

# Step 19 — Performance

Optimize:

* Large product tables
* Image loading
* Search performance
* Filtering
* Pagination
* Form rendering
* Variant management

Design for enterprise-scale catalogs.

---

# Step 20 — Motion

Use **Framer Motion** for:

* Form transitions
* Dialogs
* Image uploads
* Variant management
* Table interactions
* Status updates

Animations should improve usability while remaining restrained.

---

# Step 21 — Security

Ensure:

* RBAC enforcement
* Server-side validation
* Secure file uploads
* Permission-aware actions
* Audit logging hooks
* Protected API endpoints

Only authorized administrators should manage products.

---

# Step 22 — Out of Scope

Do **not** implement:

* Category Management
* Brand Management
* Inventory Management
* Orders
* Customers
* Reports
* CMS Management

Only implement Product Management and its required integrations.

---

# Deliverables

The completed implementation should include:

* Product List
* Product Search
* Advanced Filtering
* Product Creation
* Product Editing
* Product Variants
* Product Images
* Product Specifications
* Product Lifecycle Management
* Bulk Operations
* Import & Export
* Product Preview
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The Product Management module should provide administrators with a powerful, efficient, and enterprise-grade environment for managing the HOPSY PLAZA product catalog at scale.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for Product Management.
* Product CRUD functions correctly.
* Search, filtering, and sorting perform efficiently.
* Variant management works correctly.
* Image management is reliable.
* Bulk operations function safely.
* Import and export processes are validated.
* Product Preview reflects draft data accurately.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is complete.
* No unrelated business modules have been implemented.
* No AI-generated design patterns are present.
* The Product Management module is production-ready.

Only mark this task complete after every verification item has been satisfied.
