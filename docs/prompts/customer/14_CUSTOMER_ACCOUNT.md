# CUSTOMER WEBSITE — 14_CUSTOMER_ACCOUNT

## Objective

Design and implement the complete Customer Account Portal for the HOPSY PLAZA Customer Website.

The Customer Account is the central hub where authenticated customers manage their profile, orders, addresses, payments, preferences, notifications, and account security.

This should feel like a modern SaaS dashboard while maintaining the HOPSY PLAZA e-commerce branding and shopping experience.

**Do not implement Admin functionality.**

---

# Step 1 — Read Project Documentation

Before implementing anything, thoroughly read:

* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 04_AUTHENTICATION_AND_SECURITY.md
* 05_API_SPECIFICATION.md
* 06_CUSTOMER_WEBSITE_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 11_EMAIL_NOTIFICATION_SPECIFICATION.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Follow all documented architecture, security, and business requirements.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementing the Customer Portal:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities instead of relying only on its title.

Activate only the skills most appropriate for implementing a secure customer account system.

Typical skills may include:

* Frontend Architecture
* Dashboard Design
* UI Engineering
* UX Design
* Authentication
* Security Engineering
* API Integration
* State Management
* Accessibility
* Motion Design
* Performance Optimization
* Testing

Select the optimal combination specifically for this task.

---

# Step 3 — Account Architecture

Implement a scalable customer portal with reusable modules.

The portal should support future expansion without structural redesign.

Create a responsive account layout with:

* Sidebar Navigation (Desktop)
* Mobile Navigation Drawer
* Breadcrumbs
* Page Header
* Content Area

---

# Step 4 — Dashboard Overview

Create a dashboard overview displaying:

* Welcome Message
* Customer Avatar
* Account Completion Status
* Recent Orders
* Wishlist Summary
* Saved Addresses
* Saved Payment Methods (display only; sensitive data must never be exposed)
* Loyalty/Rewards Placeholder (future-ready)
* Recent Notifications

Provide quick actions to common account tasks.

---

# Step 5 — Profile Management

Allow customers to:

* Update Full Name
* Update Email (with verification workflow if required)
* Update Phone Number
* Upload or Change Profile Picture
* Update Date of Birth (if supported by business rules)

Validate all changes on the server.

---

# Step 6 — Address Book

Implement complete address management.

Support:

* View Addresses
* Add Address
* Edit Address
* Delete Address
* Default Address
* Delivery Notes
* Multiple Saved Addresses

Addresses should integrate directly with Checkout.

---

# Step 7 — Order History

Display customer orders.

Each order should show:

* Order Number
* Order Date
* Payment Status
* Order Status
* Total Amount
* Delivery Status

Support:

* View Details
* Track Order
* Download Invoice (if supported)
* Reorder

---

# Step 8 — Order Details

Create a dedicated Order Details page.

Display:

* Ordered Products
* Variants
* Quantities
* Prices
* Shipping Address
* Payment Information (masked where appropriate)
* Delivery Timeline
* Order Timeline
* Invoice Information

Present information clearly and professionally.

---

# Step 9 — Notification Center

Display customer notifications.

Support:

* Order Updates
* Delivery Updates
* Payment Updates
* Promotional Notifications
* Security Alerts

Allow customers to:

* Mark as Read
* Mark All as Read
* Delete Notifications (if permitted)

---

# Step 10 — Security Settings

Allow customers to:

* Change Password
* View Active Sessions
* View Login History
* View Device History
* Logout Individual Sessions
* Logout All Sessions

All security-sensitive actions must require appropriate verification.

---

# Step 11 — Saved Payment Methods

If supported by the documented business rules:

Allow customers to:

* View Saved Payment Methods
* Remove Saved Payment Methods
* Select Default Payment Method

Never display full card numbers or sensitive payment information.

If payment methods are not stored by design, present the section accordingly without implementing unsupported functionality.

---

# Step 12 — Account Preferences

Support customer preferences such as:

* Email Notifications
* SMS Notifications (if supported)
* Marketing Preferences
* Language Placeholder
* Currency Placeholder

Only expose options supported by the documented business requirements.

---

# Step 13 — Returns & Support

Provide customer access to:

* Return Requests (if supported)
* Warranty Requests
* Contact Support
* Frequently Asked Questions
* Order Assistance

Integrate with documented business processes.

---

# Step 14 — API Integration

Integrate with all relevant customer APIs.

Support:

* Profile Retrieval
* Profile Updates
* Orders
* Addresses
* Notifications
* Sessions
* Security

Avoid duplicate API requests and unnecessary refetching.

---

# Step 15 — Loading & Error States

Implement:

### Loading

* Skeleton Dashboard
* Skeleton Order Cards
* Skeleton Profile
* Skeleton Address Book

### Error Handling

Handle:

* API Failures
* Authentication Expiration
* Network Interruptions
* Missing Resources

Provide graceful recovery mechanisms.

---

# Step 16 — Accessibility

Ensure:

* Keyboard navigation
* Semantic HTML
* Accessible forms
* Proper labels
* Screen-reader compatibility
* Focus management

The entire customer portal should meet modern accessibility standards.

---

# Step 17 — Performance

Optimize:

* Dashboard rendering
* API fetching
* Data caching
* Lazy loading
* Efficient state management
* Responsive navigation

The dashboard should remain responsive even for customers with extensive order histories.

---

# Step 18 — Animation

Use **Framer Motion** for:

* Dashboard transitions
* Navigation
* Profile updates
* Order cards
* Notification interactions
* Loading transitions

Animations should feel refined and support usability.

---

# Step 19 — Security

Ensure:

* Protected routes
* Session validation
* Authorization checks
* Secure API communication
* Server-side validation
* Sensitive data masking
* Audit logging where appropriate

No customer should ever gain access to another customer's information.

---

# Step 20 — Out of Scope

Do **not** implement:

* Admin Dashboard
* Inventory Management
* Product Management
* Payment Gateway Administration
* CMS

Only implement the Customer Account Portal.

---

# Deliverables

The completed implementation should include:

* Customer Dashboard
* Profile Management
* Address Book
* Order History
* Order Details
* Notification Center
* Security Settings
* Saved Payment Methods (if supported)
* Account Preferences
* Returns & Support Entry Points
* API Integration
* Responsive Design
* Accessibility
* Premium Motion
* Security Validation
* Performance Optimization

The Customer Account should provide a secure, intuitive, and professional self-service experience that enables customers to manage every aspect of their relationship with HOPSY PLAZA.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for the Customer Account implementation.
* Protected routes function correctly.
* Profile updates work correctly.
* Address Book integrates with Checkout.
* Order History and Order Details display accurate information.
* Notification Center functions correctly.
* Security Settings work as expected.
* Sensitive data is properly protected and masked.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Animations are premium and restrained.
* No AI-generated design patterns are present.
* No unrelated features have been implemented.
* The Customer Account Portal is production-ready.

Only mark this task complete after every verification item has been satisfied.
