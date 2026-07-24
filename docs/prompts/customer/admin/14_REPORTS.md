# 14_REPORTS

## Objective

Design and implement the complete Reports module for the HOPSY PLAZA Admin Dashboard.

This module provides administrators with comprehensive operational and business reports covering sales, revenue, orders, customers, products, inventory, payments, reviews, promotions, and system activity. Reports should support interactive filtering, drill-down capabilities, export functionality, scheduled generation, and enterprise-grade performance.

The Reports module is intended for operational decision-making rather than real-time monitoring (handled by the Dashboard).

This phase is responsible only for Reports.

**Do not implement the Analytics module in this phase beyond navigation and shared integrations.**

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

Ensure implementation complies with documented reporting requirements and business rules.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of every skill instead of relying solely on its title.

Activate only the skills most appropriate for enterprise reporting.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* Dashboard Design
* Data Visualization
* Reporting
* Export Systems
* API Integration
* Performance Optimization
* Accessibility
* Motion Design
* Testing

Select the optimal combination specifically for this module.

---

# Step 3 — Reports Architecture

Build a modular reporting system.

Support:

* Saved Reports
* Scheduled Reports
* Exportable Reports
* Drill-down Reports
* Printable Reports
* Future custom report builder compatibility

---

# Step 4 — Reports Dashboard

Provide an overview including:

* Recently Generated Reports
* Scheduled Reports
* Frequently Accessed Reports
* Favorite Reports
* Report Generation Status

Offer quick access to commonly used reports.

---

# Step 5 — Sales Reports

Support reporting for:

* Daily Sales
* Weekly Sales
* Monthly Sales
* Quarterly Sales
* Annual Sales
* Sales by Category
* Sales by Brand
* Sales by Product

Provide drill-down capabilities.

---

# Step 6 — Revenue Reports

Generate reports for:

* Gross Revenue
* Net Revenue
* Discounts
* Refunds
* Taxes
* Shipping Revenue
* Revenue Trends

Support configurable date ranges.

---

# Step 7 — Orders Reports

Include:

* Order Volume
* Order Status Distribution
* Fulfillment Performance
* Cancellation Rate
* Return Rate
* Refund Rate

Allow navigation to related order records.

---

# Step 8 — Inventory Reports

Support:

* Inventory Valuation
* Stock Movement
* Low Stock Report
* Out-of-Stock Report
* Overstock Report
* Inventory Adjustments

Integrate with Inventory Management.

---

# Step 9 — Customer Reports

Generate reports covering:

* Customer Growth
* Customer Retention
* New Registrations
* Repeat Purchases
* Customer Spending
* Geographic Distribution (if supported)

Respect privacy and permission rules.

---

# Step 10 — Product Reports

Support:

* Best Sellers
* Slow-moving Products
* Product Performance
* Category Performance
* Brand Performance
* Product Availability

Enable comparison across time periods.

---

# Step 11 — Promotions & Reviews Reports

Support:

### Promotions

* Campaign Performance
* Coupon Usage
* Redemption Rates
* Discount Impact

### Reviews

* Average Ratings
* Review Volume
* Moderation Statistics
* Customer Feedback Trends

---

# Step 12 — Export & Printing

Support export formats including:

* PDF
* Excel
* CSV

Support:

* Print-friendly layouts
* Download history
* Export progress
* Background report generation

---

# Step 13 — Scheduled Reports

Allow administrators to:

* Schedule Reports
* Configure Frequency
* Configure Date Ranges
* Configure Export Format
* Manage Scheduled Jobs

Scheduling should follow documented business rules.

---

# Step 14 — API Integration

Integrate with reporting APIs.

Support:

* Report Generation
* Filters
* Drill-down
* Scheduling
* Export
* History
* Pagination where applicable

Optimize large report generation.

---

# Step 15 — Loading & Error States

Implement:

### Loading

* Dashboard Skeleton
* Report Skeleton
* Chart Skeleton
* Export Progress

### Error Handling

Handle:

* API failures
* Large dataset delays
* Export failures
* Scheduling conflicts
* Network interruptions

Provide actionable recovery guidance.

---

# Step 16 — Accessibility

Ensure:

* Keyboard navigation
* Accessible charts
* Accessible tables
* Accessible filters
* Semantic HTML
* Screen-reader compatibility
* Focus management

Reporting workflows should be fully accessible.

---

# Step 17 — Performance

Optimize:

* Large report generation
* Data aggregation
* Filtering
* Lazy loading
* Export processing
* Efficient rendering

Reports should remain responsive with enterprise-scale datasets.

---

# Step 18 — Motion

Use **Framer Motion** for:

* Report transitions
* Filter interactions
* Export progress
* Dialogs
* Chart loading

Animations should provide clear feedback without distracting from analytical tasks.

---

# Step 19 — Security

Ensure:

* RBAC enforcement
* Permission-aware reports
* Protected API endpoints
* Server-side validation
* Audit logging
* Secure export handling

Administrators should only access reports permitted by their assigned role.

---

# Step 20 — Out of Scope

Do **not** implement:

* Predictive Analytics
* Machine Learning Insights
* Business Forecasting
* Real-time Dashboard Monitoring

Only implement the Reports module and its required integrations.

---

# Deliverables

The completed implementation should include:

* Reports Dashboard
* Sales Reports
* Revenue Reports
* Orders Reports
* Inventory Reports
* Customer Reports
* Product Reports
* Promotions & Reviews Reports
* Export & Printing
* Scheduled Reports
* API Integration
* Loading & Error States
* Accessibility
* Responsive Design
* Premium Motion
* Performance Optimization
* Security Validation

The Reports module should provide administrators with an enterprise-grade reporting platform capable of producing accurate, exportable, and actionable business reports.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for Reporting.
* Reports generate accurate data.
* Filters and drill-down functionality work correctly.
* Export functions produce valid files.
* Scheduled reports execute reliably.
* API integration is optimized.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is complete.
* No Analytics features have been implemented beyond required integrations.
* No AI-generated design patterns are present.
* The Reports module is production-ready.

Only mark this task complete after every verification item has been satisfied.
