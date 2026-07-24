# 06_CATEGORIES

## Objective

Design and implement the complete Category Management module for the HOPSY PLAZA Admin Dashboard.

This module is responsible for creating, organizing, maintaining, and publishing the product category hierarchy used throughout the entire platform. Categories directly influence navigation, search, filtering, merchandising, SEO, promotions, and product organization.

The interface should be optimized for administrators managing a large and evolving product catalog.

This phase is responsible only for Category Management.

**Do not implement Brand, Product, Inventory, Order, Customer, or CMS management beyond the integrations required by Category Management.**

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

Follow all documented architectural and business requirements.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the capabilities of every skill instead of relying solely on the title.

Activate only the skills most appropriate for enterprise category management.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* Dashboard Design
* Forms
* Validation
* Database Design
* API Integration
* State Management
* Tree View
* Drag-and-Drop
* Accessibility
* Performance Optimization
* Motion Design
* Testing

Select the optimal combination specifically for this module.

---

# Step 3 — Category Architecture

Build a scalable category management system.

Support:

* Parent Categories
* Child Categories
* Nested Hierarchies
* Unlimited Depth (where supported by business rules)
* Future expansion without structural redesign

---

# Step 4 — Category List

Display categories in both:

* Tree View
* Table View

Each category should display:

* Category Image
* Name
* Slug
* Parent Category
* Product Count
* Status
* Visibility
* Featured Status
* Created Date
* Last Updated

Support expanding and collapsing nested categories.

---

# Step 5 — Search, Filtering & Sorting

Support searching by:

* Category Name
* Slug

Support filtering by:

* Status
* Visibility
* Featured
* Parent Category
* Empty Categories

Support sorting by:

* Name
* Product Count
* Date Created
* Last Updated
* Display Order

Allow multiple filters simultaneously.

---

# Step 6 — Create Category

Implement a comprehensive category creation workflow.

Support:

* Category Name
* Slug
* Parent Category
* Description
* Category Image
* Featured Image
* Banner Image (if supported)
* Icon
* Display Order
* Visibility
* Status
* Featured Flag
* SEO Metadata

Validate all required fields before submission.

---

# Step 7 — Edit Category

Allow editing of every category attribute.

Support:

* Dirty state detection
* Unsaved changes warnings
* Validation before saving
* Optimistic UI where appropriate
* Safe update workflows

---

# Step 8 — Category Hierarchy Management

Support hierarchy management through:

* Drag-and-drop reordering
* Parent reassignment
* Nesting validation
* Circular reference prevention
* Display order updates

Maintain hierarchy integrity at all times.

---

# Step 9 — Category Media

Support:

* Image Upload
* Image Replacement
* Image Removal
* Image Preview
* Banner Preview
* Icon Selection

Optimize uploads and previews.

---

# Step 10 — SEO Management

Support category SEO fields including:

* Meta Title
* Meta Description
* SEO Slug
* Canonical URL (if supported)
* Open Graph Image
* Search Visibility

SEO settings should align with customer website behavior.

---

# Step 11 — Category Status

Support lifecycle states including:

* Draft
* Published
* Hidden
* Archived

Status changes should follow documented business rules.

---

# Step 12 — Bulk Operations

Support bulk actions such as:

* Publish
* Hide
* Archive
* Delete (subject to business rules)
* Move to Parent Category
* Change Status
* Export

Bulk operations should require confirmation where appropriate.

---

# Step 13 — Category Preview

Allow administrators to preview category pages as customers will see them before publishing.

Preview should include:

* Banner
* Products
* Layout
* SEO Metadata
* Navigation Placement

Draft content should not be publicly accessible.

---

# Step 14 — API Integration

Integrate with category APIs.

Support:

* CRUD Operations
* Hierarchy Retrieval
* Tree Retrieval
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

* Tree Skeleton
* Table Skeleton
* Form Skeleton
* Media Upload Skeleton

### Error Handling

Handle:

* Validation failures
* Duplicate Slugs
* Upload failures
* Hierarchy conflicts
* Network interruptions
* API failures

Provide clear and actionable feedback.

---

# Step 16 — Accessibility

Ensure:

* Keyboard navigation
* Accessible tree views
* Accessible forms
* Accessible drag-and-drop interactions
* Semantic HTML
* Screen-reader compatibility
* Focus management

---

# Step 17 — Performance

Optimize:

* Large category trees
* Nested rendering
* Search
* Filtering
* Drag-and-drop
* API requests
* Form rendering

Support large enterprise catalogs without performance degradation.

---

# Step 18 — Motion

Use **Framer Motion** for:

* Tree expansion
* Drag-and-drop feedback
* Dialogs
* Media uploads
* Status changes
* Form transitions

Animations should communicate state changes while remaining subtle.

---

# Step 19 — Security

Ensure:

* RBAC enforcement
* Permission-aware actions
* Secure file uploads
* Server-side validation
* Protected API endpoints
* Audit logging hooks

Only authorized administrators should manage categories.

---

# Step 20 — Out of Scope

Do **not** implement:

* Brand Management
* Product Management
* Inventory Management
* Orders
* Customers
* Reports
* CMS Management

Only implement Category Management and its required integrations.

---

# Deliverables

The completed implementation should include:

* Category Tree View
* Category Table View
* Search
* Filtering
* Sorting
* Category Creation
* Category Editing
* Hierarchy Management
* Category Media
* SEO Management
* Category Preview
* Bulk Operations
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The Category Management module should provide administrators with a robust, intuitive, and scalable system for organizing the HOPSY PLAZA product catalog.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for Category Management.
* Category CRUD functions correctly.
* Hierarchy management maintains structural integrity.
* Search, filtering, and sorting perform efficiently.
* Drag-and-drop reordering works reliably.
* SEO settings integrate correctly.
* Preview reflects draft content accurately.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is complete.
* No unrelated business modules have been implemented.
* No AI-generated design patterns are present.
* The Category Management module is production-ready.

Only mark this task complete after every verification item has been satisfied.
