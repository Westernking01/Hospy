# 13_CMS

## Objective

Design and implement the complete Content Management System (CMS) module for the HOPSY PLAZA Admin Dashboard.

This module enables administrators to create, edit, publish, schedule, organize, and manage all customer-facing website content without modifying application code. The CMS should support dynamic pages, homepage sections, banners, media assets, navigation menus, announcements, FAQs, and SEO settings while maintaining version history and publishing workflows.

The CMS must be modular, scalable, and future-proof so new content types can be added with minimal architectural changes.

This phase is responsible only for the Content Management System.

**Do not implement Reports, Analytics, or Notification Management beyond the integrations required by the CMS.**

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

Ensure implementation follows documented content management workflows and publishing rules.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of every skill instead of relying solely on its title.

Activate only the skills most appropriate for enterprise content management.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* CMS Design
* Rich Text Editing
* Media Management
* Forms
* Validation
* API Integration
* State Management
* Performance Optimization
* Accessibility
* Motion Design
* Testing

Select the optimal combination specifically for this module.

---

# Step 3 — CMS Architecture

Build a modular CMS architecture.

Support:

* Dynamic Pages
* Homepage Management
* Landing Pages
* Promotional Sections
* Banners
* Menus
* FAQs
* Announcements
* Reusable Content Blocks
* Future content types without redesign

---

# Step 4 — CMS Dashboard

Display an overview including:

* Total Pages
* Published Pages
* Draft Pages
* Scheduled Pages
* Archived Pages
* Active Banners
* Media Assets
* Recent Content Updates

Provide quick navigation to all CMS features.

---

# Step 5 — Pages Management

Implement page management.

Support:

* Create Page
* Edit Page
* Duplicate Page
* Delete Page (subject to business rules)
* Publish
* Unpublish
* Archive
* Schedule Publishing

Each page should support:

* Title
* Slug
* Content
* Featured Image
* SEO Metadata
* Status

---

# Step 6 — Homepage Management

Support editing homepage sections.

Examples:

* Hero Banner
* Featured Categories
* Featured Products
* Promotional Sections
* Testimonials
* FAQ Preview
* Newsletter Section

Homepage should remain modular and data-driven.

---

# Step 7 — Banner Management

Support:

* Homepage Banners
* Promotional Banners
* Campaign Banners
* Category Banners

Each banner should include:

* Image
* Mobile Image
* Title
* Subtitle
* CTA Text
* CTA URL
* Active Period
* Display Order
* Status

---

# Step 8 — Media Library

Implement a centralized media library.

Support:

* Image Upload
* Video Upload (if supported)
* Search
* Filtering
* Folder Organization
* Metadata
* Preview
* Replace Asset
* Delete Asset

Optimize uploads and media delivery.

---

# Step 9 — Navigation Management

Allow administrators to manage:

* Main Navigation
* Footer Navigation
* Mobile Navigation
* Custom Menus

Support drag-and-drop ordering.

---

# Step 10 — FAQs & Announcements

Support management of:

### FAQs

* Categories
* Questions
* Answers
* Ordering
* Status

### Announcements

* Title
* Content
* Start Date
* End Date
* Priority
* Visibility

---

# Step 11 — SEO Management

Support:

* Meta Title
* Meta Description
* SEO Slug
* Open Graph Data
* Twitter Card Metadata
* Canonical URL
* Search Visibility

SEO settings should integrate with the customer website.

---

# Step 12 — Publishing Workflow

Support:

* Draft
* Review (if applicable)
* Scheduled
* Published
* Archived

Track:

* Author
* Last Editor
* Published Date
* Version Number

Maintain version history where documented.

---

# Step 13 — API Integration

Integrate with CMS APIs.

Support:

* CRUD Operations
* Search
* Filtering
* Pagination
* Media Upload
* Publishing
* Scheduling

Optimize requests through caching and efficient updates.

---

# Step 14 — Loading & Error States

Implement:

### Loading

* Dashboard Skeleton
* Page Editor Skeleton
* Media Library Skeleton
* Form Skeleton

### Error Handling

Handle:

* Validation failures
* Slug conflicts
* Upload failures
* API failures
* Network interruptions

Provide clear recovery guidance.

---

# Step 15 — Accessibility

Ensure:

* Keyboard navigation
* Accessible editors
* Accessible media management
* Accessible forms
* Semantic HTML
* Screen-reader compatibility
* Focus management

Content management workflows should be fully accessible.

---

# Step 16 — Performance

Optimize:

* Rich text editing
* Media loading
* Search
* Filtering
* Pagination
* Lazy loading
* State updates

Support large media libraries and extensive content collections.

---

# Step 17 — Motion

Use **Framer Motion** for:

* Editor transitions
* Media uploads
* Publishing actions
* Dialogs
* Navigation interactions

Animations should communicate workflow state while remaining subtle.

---

# Step 18 — Security

Ensure:

* RBAC enforcement
* Permission-aware publishing
* Secure media uploads
* Server-side validation
* Protected API endpoints
* Audit logging

Only authorized administrators should create or publish content.

---

# Step 19 — Out of Scope

Do **not** implement:

* Reports
* Analytics
* Notification Center
* Email Campaigns
* Marketing Automation

Only implement the CMS and its required integrations.

---

# Deliverables

The completed implementation should include:

* CMS Dashboard
* Page Management
* Homepage Management
* Banner Management
* Media Library
* Navigation Management
* FAQ Management
* Announcement Management
* SEO Management
* Publishing Workflow
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The CMS should provide administrators with a powerful, enterprise-grade environment for managing all customer-facing content while maintaining consistency, scalability, and publishing control.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for CMS development.
* Page management functions correctly.
* Homepage management updates dynamic sections reliably.
* Banner management behaves correctly.
* Media Library uploads and organization work properly.
* Navigation management supports drag-and-drop ordering.
* Publishing workflows follow documented business rules.
* SEO settings integrate correctly.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is complete.
* No unrelated business modules have been implemented.
* No AI-generated design patterns are present.
* The CMS module is production-ready.

Only mark this task complete after every verification item has been satisfied.
