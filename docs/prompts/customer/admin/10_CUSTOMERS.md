# 10_CUSTOMERS

## Objective

Design and implement the complete Customer Management module for the HOPSY PLAZA Admin Dashboard.

This module serves as the centralized customer relationship management (CRM) interface, allowing administrators to view, search, manage, and understand customer accounts, purchase history, engagement, and account activity. It should provide a comprehensive customer profile while maintaining privacy, security, and compliance with applicable data protection requirements.

The interface should support enterprise-scale customer databases while remaining fast, intuitive, and secure.

This phase is responsible only for Customer Management.

**Do not implement Reviews, Promotions, CMS, Reports, Analytics, or Notifications beyond the integrations required by Customer Management.**

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

Ensure implementation complies with documented business rules, privacy requirements, and customer lifecycle policies.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of each skill instead of relying solely on its title.

Activate only the skills most appropriate for enterprise customer management.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* Dashboard Design
* CRM Design
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

# Step 3 — Customer Architecture

Build a scalable customer management system.

Support:

* Customer Profiles
* Customer Accounts
* Purchase History
* Account Activity
* Address Management
* Customer Notes
* Account Status
* Future loyalty program integration

---

# Step 4 — Customer Dashboard

Provide an executive customer overview.

Display:

* Total Customers
* New Customers
* Active Customers
* Returning Customers
* Inactive Customers
* Verified Accounts
* Guest Customers (if supported)

Include quick navigation to customer-related operations.

---

# Step 5 — Customers List

Create a high-performance customer table.

Display:

* Customer Name
* Email Address
* Phone Number
* Customer ID
* Total Orders
* Total Spending
* Last Purchase
* Registration Date
* Account Status
* Verification Status

Support enterprise-scale datasets.

---

# Step 6 — Search, Filtering & Sorting

Support searching by:

* Customer Name
* Email Address
* Phone Number
* Customer ID

Support filtering by:

* Account Status
* Verification Status
* Registration Date
* Order Count
* Customer Type

Support sorting by:

* Name
* Registration Date
* Total Spending
* Last Purchase
* Total Orders

Allow multiple filters simultaneously.

---

# Step 7 — Customer Profile

Create a comprehensive customer profile page.

Display:

* Personal Information
* Contact Information
* Account Status
* Verification Status
* Default Addresses
* Purchase History
* Recent Orders
* Payment History
* Saved Addresses
* Customer Notes
* Timeline of Activity

Only display data authorized by documented business rules.

---

# Step 8 — Customer Account Management

Support administrative actions such as:

* View Account
* Edit Non-sensitive Profile Information
* Activate Account
* Deactivate Account
* Suspend Account
* Verify Account (where permitted)
* Reset Customer Session (if supported)

Actions should follow documented authorization policies.

---

# Step 9 — Purchase History

Display:

* Order History
* Total Spending
* Average Order Value
* Frequently Purchased Products
* Recent Purchases
* Order Status History

Provide links to the Orders module where appropriate.

---

# Step 10 — Customer Notes

Allow authorized administrators to:

* Add Internal Notes
* Edit Internal Notes
* View Historical Notes

Notes should be:

* Timestamped
* Attributed to the administrator
* Visible only to authorized staff

Customer-facing visibility is out of scope.

---

# Step 11 — Customer Timeline

Maintain a chronological activity timeline.

Include:

* Registration
* Login Activity (where permitted)
* Order Placement
* Payment Events
* Account Changes
* Support Notes
* Administrative Actions

Timeline entries should remain immutable.

---

# Step 12 — Bulk Operations

Support bulk actions including:

* Activate Accounts
* Deactivate Accounts
* Export Customers
* Assign Customer Tags (if supported)
* Send to Promotion Segment (entry point only)

Bulk operations should validate every selected customer.

---

# Step 13 — API Integration

Integrate with customer APIs.

Support:

* Customer Retrieval
* Search
* Filtering
* Pagination
* Profile Retrieval
* Notes
* Timeline
* Status Updates

Optimize requests through caching and efficient data fetching.

---

# Step 14 — Loading & Error States

Implement:

### Loading

* Dashboard Skeleton
* Customer Table Skeleton
* Profile Skeleton
* Timeline Skeleton

### Error Handling

Handle:

* API failures
* Network interruptions
* Validation failures
* Concurrent updates
* Missing customer records

Provide informative and actionable feedback.

---

# Step 15 — Accessibility

Ensure:

* Keyboard navigation
* Accessible data tables
* Accessible forms
* Semantic HTML
* Screen-reader compatibility
* Focus management

Administrative workflows should be fully usable without a mouse.

---

# Step 16 — Performance

Optimize:

* Large customer tables
* Search
* Filtering
* Pagination
* Timeline rendering
* Lazy loading
* Efficient state updates

The module should remain responsive with large customer datasets.

---

# Step 17 — Motion

Use **Framer Motion** for:

* Profile transitions
* Dialogs
* Timeline animations
* Table interactions
* Status updates

Animations should enhance usability while remaining subtle and performant.

---

# Step 18 — Security & Privacy

Ensure:

* RBAC enforcement
* Permission-aware data visibility
* Protected API endpoints
* Server-side validation
* Audit logging
* Secure handling of personally identifiable information (PII)
* Compliance with documented privacy requirements

Administrators should only access customer data appropriate to their assigned permissions.

---

# Step 19 — Out of Scope

Do **not** implement:

* Reviews
* Promotions
* CMS
* Reports
* Analytics
* Notification Center
* Loyalty Program

Only implement Customer Management and its required integrations.

---

# Deliverables

The completed implementation should include:

* Customer Dashboard
* Customer List
* Search
* Filtering
* Sorting
* Customer Profile
* Purchase History
* Customer Notes
* Activity Timeline
* Account Management
* Bulk Operations
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security & Privacy Validation

The Customer Management module should provide administrators with a complete, secure, and enterprise-grade view of customer relationships while respecting privacy and authorization boundaries.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for Customer Management.
* Customer data loads correctly.
* Search, filtering, and sorting perform efficiently.
* Customer profiles display complete authorized information.
* Purchase history integrates correctly with Orders.
* Internal notes are properly secured.
* Timeline records significant customer events.
* Bulk operations are validated.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security and privacy validation are complete.
* No unrelated business modules have been implemented.
* No AI-generated design patterns are present.
* The Customer Management module is production-ready.

Only mark this task complete after every verification item has been satisfied.
