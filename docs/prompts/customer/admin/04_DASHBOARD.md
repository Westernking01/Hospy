# 04_DASHBOARD

## Objective

Design and implement the Executive Dashboard for the HOPSY PLAZA Admin Dashboard.

The Dashboard is the operational command center of the platform. It should give administrators immediate visibility into business performance, operational health, inventory status, customer activity, sales trends, and actionable insights.

The interface should feel comparable to modern enterprise SaaS platforms used by Amazon, Shopify, Stripe, Vercel, Notion, and Linear—not a generic admin template.

This phase is responsible only for the Dashboard module.

**Do not implement Product Management, Orders, Customers, Inventory, Reports, or other business modules beyond their dashboard summaries and navigation entry points.**

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

Ensure the implementation aligns with all documented architectural, design, and business requirements.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of each skill instead of relying solely on its title.

Activate only the skills most appropriate for an enterprise analytics dashboard.

Typical skills may include:

* Dashboard Design
* Data Visualization
* Frontend Architecture
* UI Engineering
* UX Design
* API Integration
* Performance Optimization
* Accessibility
* Motion Design
* State Management

Select the optimal combination specifically for this task.

---

# Step 3 — Dashboard Architecture

Build a modular widget-based dashboard.

Each widget should be independently reusable, testable, and maintainable.

Widgets must support future customization without requiring architectural changes.

---

# Step 4 — Executive Header

Display:

* Welcome Message
* Administrator Name
* Current Role
* Current Date
* Current Time
* Last Login Time
* Quick Refresh Action

The header should immediately orient the administrator after login.

---

# Step 5 — KPI Overview

Display real-time business KPIs including:

* Total Revenue
* Revenue Today
* Revenue This Month
* Total Orders
* Pending Orders
* Completed Orders
* Active Customers
* Registered Customers
* Total Products
* Active Products
* Low Stock Products
* Out-of-Stock Products

Each KPI should include:

* Current Value
* Percentage Change
* Trend Direction
* Comparison Period
* Drill-down Navigation

---

# Step 6 — Revenue Dashboard

Visualize:

* Daily Revenue
* Weekly Revenue
* Monthly Revenue
* Quarterly Revenue
* Annual Revenue

Support dynamic date-range selection and comparison.

---

# Step 7 — Sales Performance

Display:

* Top Selling Products
* Top Categories
* Top Brands
* Average Order Value
* Conversion Metrics
* Sales Distribution

Provide actionable operational insights rather than decorative charts.

---

# Step 8 — Order Summary

Present:

* New Orders
* Processing
* Ready for Pickup
* Ready for Delivery
* Shipped
* Delivered
* Cancelled
* Returned
* Refunded

Each status should link directly to its corresponding Orders view.

---

# Step 9 — Inventory Overview

Display:

* Low Stock
* Critical Stock
* Out of Stock
* Overstocked Products
* Recently Added Products
* Inventory Alerts

Highlight items requiring immediate attention.

---

# Step 10 — Customer Overview

Display:

* New Customers
* Returning Customers
* Customer Growth
* Recent Registrations
* Top Customers
* Customer Activity

Avoid exposing unnecessary personal information.

---

# Step 11 — Recent Activity Feed

Display chronological operational events including:

* New Orders
* Inventory Changes
* Product Updates
* Customer Registrations
* Promotions Created
* CMS Updates
* Administrator Actions

Each activity should include:

* Timestamp
* Actor
* Action
* Related Module

---

# Step 12 — Alerts & Notifications

Display operational alerts such as:

* Low Inventory
* Failed Payments
* Pending Reviews
* Pending Approvals
* Security Warnings
* System Maintenance
* Integration Failures

Support severity levels and quick actions where appropriate.

---

# Step 13 — Quick Actions

Provide shortcuts for:

* Add Product
* Create Category
* Add Brand
* Manage Inventory
* View Orders
* Manage Customers
* Create Promotion
* Open Reports

Display only actions permitted by the administrator's role.

---

# Step 14 — Interactive Charts

Implement enterprise-quality visualizations.

Supported chart types may include:

* Line Charts
* Area Charts
* Bar Charts
* Donut Charts
* Trend Indicators

Charts should support:

* Tooltips
* Legends
* Date Filtering
* Empty States
* Loading States
* Responsive Resizing

---

# Step 15 — API Integration

Integrate dashboard widgets with backend APIs.

Support:

* KPI retrieval
* Sales metrics
* Revenue analytics
* Inventory summaries
* Customer summaries
* Activity feed
* Alerts

Optimize requests through caching and efficient fetching strategies.

---

# Step 16 — Loading & Error States

Implement:

### Loading

* KPI Skeletons
* Chart Skeletons
* Table Skeletons
* Feed Skeletons

### Error Handling

Handle:

* Partial widget failures
* API failures
* Network interruptions
* Empty datasets

Widgets should fail independently without affecting the entire dashboard.

---

# Step 17 — Accessibility

Ensure:

* Keyboard navigation
* Accessible charts
* Semantic HTML
* Proper ARIA attributes
* Screen-reader compatibility
* Focus management

Provide text alternatives where visualizations alone are insufficient.

---

# Step 18 — Performance

Optimize:

* Widget rendering
* API batching
* Query caching
* Lazy loading
* Virtualization where applicable
* Memoization
* Efficient re-rendering

The dashboard should remain responsive under heavy operational workloads.

---

# Step 19 — Motion

Use **Framer Motion** for:

* Widget entrance
* KPI updates
* Chart transitions
* Notification appearance
* Activity feed updates

Animations should enhance clarity without slowing interaction.

---

# Step 20 — Security

Ensure:

* Dashboard data respects RBAC.
* Sensitive metrics are permission-aware.
* Widgets display only authorized information.
* API responses enforce authorization.

No administrator should gain visibility into restricted operational data.

---

# Step 21 — Out of Scope

Do **not** implement:

* Product CRUD
* Category CRUD
* Brand CRUD
* Inventory CRUD
* Orders CRUD
* Customer CRUD
* Reports Module
* Analytics Module

Only implement the Dashboard and navigation into those modules.

---

# Deliverables

The completed implementation should include:

* Executive Dashboard
* KPI Cards
* Revenue Analytics
* Sales Performance
* Order Summary
* Inventory Overview
* Customer Overview
* Activity Feed
* Alerts & Notifications
* Quick Actions
* Interactive Charts
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The Dashboard should serve as an enterprise-grade command center, enabling administrators to understand the operational state of HOPSY PLAZA at a glance and quickly navigate to the appropriate management modules.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for the Dashboard.
* KPI metrics load correctly.
* Charts are interactive and responsive.
* Activity Feed updates correctly.
* Alerts display accurately.
* Quick Actions respect RBAC permissions.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is complete.
* Motion is refined and purposeful.
* No unrelated business modules have been implemented.
* No AI-generated design patterns are present.
* The Dashboard is production-ready.

Only mark this task complete after every verification item has been satisfied.
