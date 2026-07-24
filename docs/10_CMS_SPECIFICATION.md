# 10_CMS_SPECIFICATION.md

# Part 1 — CMS Architecture, Content Model & Homepage Management

---

# 1. Purpose

This document defines the complete Content Management System (CMS) for HOPSY PLAZA.

The CMS enables the administrator to update customer-facing content without modifying code or redeploying the application.

It governs:

* Homepage Content
* Promotional Content
* Marketing Sections
* Featured Products
* Featured Categories
* Brand Showcase
* Announcement Bar
* Website Information

The CMS is managed exclusively through the Admin Dashboard.

---

# 2. CMS Design Philosophy

The CMS should be:

* Simple
* Powerful
* Reliable
* Predictable
* Secure

Administrators should be able to update website content with minimal effort while maintaining consistency with the design system.

---

# 3. CMS Scope

The CMS manages only content.

It does **not** manage:

* Product Inventory
* Orders
* Customers
* Authentication
* Payments

Those functions belong to dedicated modules.

---

# 4. CMS Architecture

The CMS should be organized into independent modules.

Recommended modules:

* Homepage
* Banners
* Promotions
* Featured Products
* Featured Categories
* Brand Showcase
* Announcement Bar
* Store Information

Each module should operate independently while sharing common publishing workflows.

---

# 5. Homepage Management

The Homepage CMS should allow the administrator to manage:

* Hero Section
* Promotional Sections
* Featured Categories
* Featured Products
* Flash Sale Section
* Deal of the Week
* Brand Showcase
* Newsletter Section
* Announcement Bar

Content should be configurable without editing source code.

---

# 6. Hero Banner Management

Administrators should configure:

* Title
* Subtitle
* Call-to-Action Text
* Call-to-Action Link
* Desktop Image
* Mobile Image
* Display Order
* Visibility Status

Validation requirements:

* Required images
* Valid links
* Character limits
* Image optimization before publishing

---

# 7. Promotional Sections

Support configurable promotional blocks.

Each promotion may contain:

* Heading
* Description
* Banner Image
* CTA Button
* CTA Destination
* Display Priority

Promotional sections should support future scheduling capabilities.

---

# 8. Featured Categories

Administrators should:

* Select categories
* Reorder categories
* Enable/Disable visibility

Featured categories must always reference existing active categories.

---

# 9. Featured Products

Administrators should:

* Select products
* Change display order
* Remove products
* Replace products

Only published products may appear.

Archived products should be automatically removed from featured sections.

---

# 10. Flash Sale Section

Administrators should configure:

* Sale Title
* Start Time
* End Time
* Participating Products
* Promotional Banner

Expired flash sales should automatically become inactive.

---

# 11. Deal of the Week

Support:

* One highlighted campaign
* Promotional image
* CTA
* Featured product collection

The Deal of the Week should remain independent from Flash Sales.

---

# 12. Brand Showcase

Administrators may:

* Select brands
* Reorder brands
* Hide brands

Only active brands may be displayed.

Brand logos should be optimized before display.

---

# 13. Announcement Bar

Support:

* Short announcement text
* Optional CTA
* Optional destination link

Examples:

* Holiday Notice
* Shipping Updates
* Promotions
* Store Announcements

Only one announcement bar should be active at a time.

---

# 14. Store Information

Editable information includes:

* Store Name
* Address
* Phone Number
* WhatsApp Number
* Email Address
* Business Hours
* Social Media Links

Changes should update every location where this information appears.

---

# 15. Content Publishing Rules

Publishing workflow:

Draft

↓

Preview

↓

Publish

↓

Update

↓

Unpublish

Rules:

* Draft content is never public.
* Published content appears immediately.
* Unpublished content is hidden while remaining editable.
* Every publish or unpublish action must generate an audit log entry.

---

# 16. AntiGravity Execution Instructions

Before implementing the CMS foundation, AntiGravity must:

* Read every completed project document from `00_PROJECT_MANIFEST.md` through `09_BUSINESS_RULES.md`.
* Read the complete `10_CMS_SPECIFICATION.md`.
* Thoroughly inspect every available AntiGravity skill and intentionally select the most suitable skills for CMS architecture, frontend engineering, content modeling, responsive UI design, accessibility, performance optimization, validation, and backend implementation.
* Build reusable CMS modules that are fully integrated with the Admin Dashboard while remaining independent of business transaction modules.
* Ensure every content change follows the documented publishing workflow and adheres to the shared design system.
* Validate content integrity, responsiveness, accessibility, and maintainability before considering implementation complete.
# 10_CMS_SPECIFICATION.md

# Part 2 — Media Library, SEO, Publishing Workflows & CMS Completion

---

# 17. Media Library

The CMS should include a centralized Media Library.

Supported asset types:

* Images
* Brand Logos
* Homepage Banners
* Promotional Graphics
* Category Images

Future-ready support:

* Videos
* PDF Documents

The Media Library should eliminate duplicate uploads wherever possible.

---

# 18. Media Upload Rules

Every uploaded file should be validated before storage.

Validation includes:

* Supported file type
* File size
* Image dimensions
* Virus/security validation (future-ready)

Images should be automatically optimized for web delivery.

Original files should remain available when appropriate.

---

# 19. Image Management

Administrators should be able to:

* Upload
* Replace
* Rename
* Preview
* Delete unused media
* Search media

Media that is actively referenced by published content should not be deletable until those references are removed.

---

# 20. SEO Management

The CMS should allow administrators to configure SEO information for editable pages.

Supported fields:

* Page Title
* Meta Description
* Meta Keywords (optional)
* Canonical URL (future-ready)
* Open Graph Title
* Open Graph Description
* Open Graph Image

SEO configuration should be available without editing code.

---

# 21. Homepage SEO

Homepage-specific SEO should support:

* SEO Title
* Meta Description
* Open Graph Image
* Social Sharing Preview

Search engine metadata should remain synchronized with published content.

---

# 22. Content Validation

Before publishing, the CMS should validate:

* Required fields
* Character limits
* Broken links
* Missing images
* Invalid references

Validation failures should prevent publishing until resolved.

---

# 23. Preview Mode

Administrators should preview unpublished changes before making them public.

Preview mode should:

* Reflect current draft content
* Preserve responsive layouts
* Display unpublished assets
* Remain inaccessible to public users

Preview should closely match the production experience.

---

# 24. Scheduling (Future-Ready)

The CMS architecture should support future scheduling of:

* Homepage banners
* Promotions
* Announcement bars
* Seasonal campaigns

Although not required in the initial release, the data model and services should be designed to accommodate scheduled publishing without significant refactoring.

---

# 25. Versioning (Future-Ready)

The CMS architecture should support future content versioning.

Potential capabilities include:

* Draft history
* Restore previous versions
* Change comparison
* Publishing history

The current release should preserve sufficient metadata to support these enhancements later.

---

# 26. Reusable Content Blocks

The CMS should encourage reusable content structures.

Examples:

* Promotional Banner
* CTA Section
* Marketing Block
* Feature Section

Reusable blocks should reduce duplication while maintaining design consistency.

---

# 27. Administrator Workflow

Typical workflow:

Create Content

↓

Upload Media

↓

Configure SEO

↓

Preview

↓

Publish

↓

Monitor

↓

Update

↓

Republish

↓

Archive (if applicable)

The workflow should remain intuitive and consistent across CMS modules.

---

# 28. Search & Filtering

Administrators should search CMS content by:

* Title
* Status
* Content Type
* Publication Date

Filters should support combinations and remain active during pagination.

---

# 29. Audit Logging

The following CMS actions must generate audit log entries:

* Content Created
* Content Updated
* Content Published
* Content Unpublished
* Media Uploaded
* Media Deleted
* SEO Updated
* Store Information Updated

Each log should include:

* Administrator
* Action
* Target Resource
* Timestamp
* IP Address (where available)

Audit logs are immutable.

---

# 30. Security Rules

CMS operations require authenticated administrator access.

Rules:

* Public users cannot access CMS interfaces.
* All CMS input must be validated server-side.
* File uploads must be sanitized.
* Media URLs should not expose sensitive implementation details.
* Authorization must be verified for every CMS API request.

---

# 31. Performance Requirements

The CMS should:

* Lazy-load large media collections.
* Optimize image delivery.
* Cache safe public content where appropriate.
* Minimize unnecessary database queries.
* Deliver responsive editing experiences even with large media libraries.

Performance should scale as the content library grows.

---

# 32. Accessibility Requirements

CMS interfaces should support:

* Keyboard navigation
* Screen readers
* Visible focus indicators
* Semantic HTML
* Accessible forms
* High-contrast design

Content editors should be usable by administrators with accessibility needs.

---

# 33. AntiGravity Execution Instructions

Before implementing the complete CMS, AntiGravity must:

* Read every completed project document from `00_PROJECT_MANIFEST.md` through `09_BUSINESS_RULES.md`.
* Read the complete `10_CMS_SPECIFICATION.md`.
* Thoroughly inspect every available AntiGravity skill and deliberately select the most appropriate skills for CMS architecture, media management, SEO, frontend engineering, accessibility, backend validation, responsive UI design, performance optimization, and content workflows.
* Implement reusable CMS modules that integrate seamlessly with the Admin Dashboard and conform to the shared Design System.
* Ensure publishing workflows, validation, preview mode, and audit logging operate consistently across every content module.
* Verify scalability, maintainability, responsiveness, and security before considering the CMS complete.

---

# 34. CMS Acceptance Criteria

The CMS is considered complete when:

* Administrators can manage all customer-facing content without editing code.
* Homepage sections, banners, promotions, featured products, and categories are configurable.
* Store information updates propagate automatically throughout the Customer Website.
* Media uploads are validated, optimized, and centrally managed.
* SEO metadata can be managed through the Admin Dashboard.
* Preview mode accurately reflects unpublished content.
* Publishing workflows are reliable and auditable.
* CMS interfaces remain responsive, accessible, and performant.
* The architecture supports future scheduling and versioning without major redesign.

---

# 35. Definition of Success

The HOPSY PLAZA CMS is successful when a single administrator can manage every customer-facing content experience—from homepage campaigns and promotional banners to store information and SEO—without modifying source code.

The completed CMS should provide a secure, intuitive, scalable, and production-ready content management experience that integrates seamlessly with the separately deployed Customer Website and Admin Dashboard while maintaining the premium visual standards established by the HOPSY PLAZA Design System.
