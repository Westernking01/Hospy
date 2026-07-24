# 11_REVIEWS

## Objective

Design and implement the complete Review & Rating Management module for the HOPSY PLAZA Admin Dashboard.

This module enables administrators to monitor, moderate, approve, reject, respond to, and analyze customer product reviews and ratings. It should maintain review quality, protect the platform from spam and abuse, and provide valuable customer sentiment insights while preserving transparency and fairness.

The module must be scalable, secure, and optimized for high-volume review moderation.

This phase is responsible only for Review & Rating Management.

**Do not implement Promotions, CMS, Reports, Analytics, or Notifications beyond the integrations required by review moderation.**

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
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Ensure implementation follows all documented moderation policies and business rules.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of each skill instead of relying solely on its title.

Activate only the skills most appropriate for enterprise review moderation.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* Dashboard Design
* Moderation Workflow
* Data Tables
* Forms
* API Integration
* State Management
* Validation
* Accessibility
* Performance Optimization
* Motion Design
* Testing

Select the optimal combination specifically for this module.

---

# Step 3 — Review Architecture

Build a scalable review management system.

Support:

* Product Reviews
* Product Ratings
* Customer Responses
* Administrator Responses
* Moderation Queue
* Abuse Reports
* Future AI-assisted moderation integration

---

# Step 4 — Reviews Dashboard

Display an executive overview.

Include:

* Total Reviews
* Pending Reviews
* Approved Reviews
* Rejected Reviews
* Flagged Reviews
* Average Rating
* Reviews Awaiting Response

Provide quick navigation to moderation workflows.

---

# Step 5 — Reviews List

Create a high-performance review table.

Display:

* Review ID
* Product
* Customer
* Rating
* Review Title
* Review Preview
* Moderation Status
* Published Status
* Submitted Date
* Last Updated

Support enterprise-scale datasets.

---

# Step 6 — Search, Filtering & Sorting

Support searching by:

* Review ID
* Product Name
* Customer Name
* Review Text

Support filtering by:

* Rating
* Moderation Status
* Published Status
* Date Range
* Flagged Reviews
* Verified Purchase

Support sorting by:

* Date
* Rating
* Product
* Customer

Allow multiple filters simultaneously.

---

# Step 7 — Review Details

Create a comprehensive review detail page.

Display:

* Full Review
* Rating
* Product Information
* Customer Information (subject to permissions)
* Images (if supported)
* Purchase Verification
* Submission Metadata
* Moderation History
* Administrator Responses

Provide complete moderation context.

---

# Step 8 — Moderation Workflow

Support moderation actions including:

* Approve
* Reject
* Hide
* Restore
* Flag
* Remove (subject to business rules)

Require reasons for moderation where documented.

Maintain moderation consistency.

---

# Step 9 — Administrator Responses

Allow authorized administrators to:

* Reply to Reviews
* Edit Replies
* Remove Replies

Responses should:

* Be timestamped
* Record the responding administrator
* Follow platform communication guidelines

---

# Step 10 — Abuse & Spam Management

Support handling of:

* Reported Reviews
* Spam Reviews
* Offensive Content
* Duplicate Reviews
* Fraudulent Reviews

Provide moderation tools while preserving an audit trail.

---

# Step 11 — Review Timeline

Maintain an immutable review history.

Include:

* Submission
* Approval
* Rejection
* Publication
* Administrator Responses
* Status Changes
* Abuse Reports
* Moderator Actions

Every event should include timestamps and responsible users.

---

# Step 12 — Bulk Operations

Support bulk actions including:

* Approve Reviews
* Reject Reviews
* Hide Reviews
* Restore Reviews
* Export Reviews

Bulk operations should validate each selected review individually.

---

# Step 13 — API Integration

Integrate with review APIs.

Support:

* Review Retrieval
* Search
* Filtering
* Pagination
* Moderation
* Responses
* Timeline
* Bulk Operations

Optimize requests using efficient caching and state management.

---

# Step 14 — Loading & Error States

Implement:

### Loading

* Dashboard Skeleton
* Table Skeleton
* Review Detail Skeleton
* Timeline Skeleton

### Error Handling

Handle:

* API failures
* Network interruptions
* Validation failures
* Concurrent moderation conflicts
* Missing review records

Provide meaningful recovery options.

---

# Step 15 — Accessibility

Ensure:

* Keyboard navigation
* Accessible tables
* Accessible moderation dialogs
* Semantic HTML
* Screen-reader compatibility
* Focus management

Moderation workflows should be fully accessible.

---

# Step 16 — Performance

Optimize:

* Large review datasets
* Search
* Filtering
* Pagination
* Timeline rendering
* Lazy loading
* Efficient state updates

Maintain responsiveness under high moderation workloads.

---

# Step 17 — Motion

Use **Framer Motion** for:

* Moderation dialogs
* Status transitions
* Timeline updates
* Table interactions
* Response editor transitions

Animations should improve clarity without slowing moderation.

---

# Step 18 — Security

Ensure:

* RBAC enforcement
* Permission-aware moderation
* Protected API endpoints
* Server-side validation
* Audit logging
* Secure handling of customer-generated content

Only authorized administrators should moderate reviews.

---

# Step 19 — Out of Scope

Do **not** implement:

* Promotions
* CMS
* Reports
* Analytics
* Notification Center
* AI-generated moderation decisions

Only implement Review & Rating Management and the integrations required for this module.

---

# Deliverables

The completed implementation should include:

* Reviews Dashboard
* Reviews List
* Search
* Filtering
* Sorting
* Review Details
* Moderation Workflow
* Administrator Responses
* Abuse & Spam Management
* Review Timeline
* Bulk Operations
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The Review & Rating Management module should provide administrators with a complete, enterprise-grade environment for efficiently moderating customer feedback while maintaining transparency, consistency, and platform integrity.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for Review Management.
* Review data loads correctly.
* Search, filtering, and sorting perform efficiently.
* Moderation workflow follows business rules.
* Administrator responses function correctly.
* Abuse and spam management work as expected.
* Timeline records all moderation events.
* Bulk operations are validated.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is complete.
* No unrelated business modules have been implemented.
* No AI-generated design patterns are present.
* The Review Management module is production-ready.

Only mark this task complete after every verification item has been satisfied.
