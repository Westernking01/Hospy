# 03A_DATABASE_ERD_AND_FLOWS.md

# Entity Relationship Diagram (ERD) & Business Data Flows

---

# 1. Purpose

This document provides a visual and logical representation of the HOPSY PLAZA database relationships and major business flows.

It complements `03_DATABASE_DESIGN.md` and serves as the primary reference for understanding how entities interact throughout the platform.

This document defines:

* Core Entity Relationships
* Customer Journey Flow
* Order Lifecycle
* Payment Lifecycle
* Inventory Lifecycle
* Product Management Flow
* CMS Publishing Flow
* Authentication Flow
* Notification Flow
* Live Chat Flow
* Reporting Flow

All implementations must remain consistent with these diagrams.

---

# 2. Core Entity Relationship Diagram

```text id="1o8m3r"
                          BRANDS
                             │
                             │
                             ▼
                       PRODUCTS
                             │
      ┌──────────────────────┼────────────────────────┐
      │                      │                        │
      ▼                      ▼                        ▼
PRODUCT_IMAGES      PRODUCT_VARIANTS      PRODUCT_SPECIFICATIONS
                             │
                             ▼
                        INVENTORY
                             │
                             ▼
                  INVENTORY_MOVEMENTS
```

---

# 3. Customer Relationship Diagram

```text id="5lw7ta"
CUSTOMERS
    │
    ├──────────────► ADDRESSES
    │
    ├──────────────► WISHLIST
    │
    ├──────────────► COMPARE_LIST
    │
    ├──────────────► RECENTLY_VIEWED
    │
    ├──────────────► ORDERS
    │                    │
    │                    ▼
    │              ORDER_ITEMS
    │
    ├──────────────► REVIEWS
    │
    ├──────────────► NOTIFICATIONS
    │
    └──────────────► LIVE_CHAT_CONVERSATIONS
                             │
                             ▼
                     LIVE_CHAT_MESSAGES
```

---

# 4. Product Commerce Relationship

```text id="7ynv8d"
PRODUCTS
     │
     ▼
PRODUCT_VARIANTS
     │
     ▼
SHOPPING_CART_ITEMS
     │
     ▼
ORDER_ITEMS
     │
     ▼
PAYMENTS
     │
     ▼
PAYMENT_TRANSACTIONS
```

---

# 5. Shopping Flow

```text id="9qhj2e"
Homepage

↓

Categories

↓

Product Listing

↓

Search / Filter

↓

Product Details

↓

Add To Cart

↓

Shopping Cart

↓

Checkout

↓

Payment

↓

Order Confirmation
```

---

# 6. Checkout Flow

```text id="6vtz4p"
Cart

↓

Validate Inventory

↓

Validate Coupon

↓

Calculate Shipping

↓

Calculate Total

↓

Select Payment

↓

Place Order

↓

Verify Payment

↓

Create Order

↓

Reserve Stock

↓

Send Confirmation
```

---

# 7. Order Lifecycle

```text id="4bgm9u"
PENDING

↓

PAID

↓

PROCESSING

↓

SHIPPED

↓

DELIVERED
```

Alternative paths

```text id="0jr5cy"
PENDING

↓

CANCELLED
```

```text id="n3x8kw"
DELIVERED

↓

REFUNDED
```

Every order status transition should be recorded for audit purposes.

---

# 8. Payment Lifecycle

```text id="0csm8k"
Customer

↓

Paystack

↓

Payment Callback

↓

Webhook Verification

↓

Backend Validation

↓

Payment Record Updated

↓

Order Updated

↓

Email Notification
```

For Bank Transfer

```text id="ay7p6m"
Customer

↓

Upload Proof

↓

Admin Verification

↓

Payment Approved

↓

Order Updated
```

For Cash on Delivery

```text id="ob6v3q"
Customer

↓

Order Created

↓

Await Delivery

↓

Payment Collected

↓

Payment Confirmed
```

---

# 9. Inventory Lifecycle

```text id="k1n5xq"
Purchase Stock

↓

Warehouse Inventory

↓

Customer Order

↓

Reserve Quantity

↓

Payment Success

↓

Deduct Quantity

↓

Record Inventory Movement

↓

Update Available Stock
```

Restocking

```text id="3wz2ht"
Receive Goods

↓

Increase Inventory

↓

Record Movement

↓

Recalculate Stock Status
```

---

# 10. Product Management Flow

```text id="g8m1vf"
Admin

↓

Create Brand

↓

Create Category

↓

Create Product

↓

Add Variants

↓

Upload Images

↓

Add Specifications

↓

Configure Inventory

↓

Publish Product
```

---

# 11. CMS Publishing Flow

```text id="n9v4ks"
Admin Dashboard

↓

Create Content

↓

Save Draft

↓

Publish

↓

Database Updated

↓

Customer Website Refresh

↓

Updated Content Visible
```

Applicable to:

* Homepage banners
* Promotional sections
* CMS pages
* Featured products
* Homepage categories

---

# 12. Authentication Flow

Customer

```text id="2cqh7r"
Register

↓

Verify Email

↓

Supabase Auth

↓

Profile Created

↓

Customer Dashboard
```

Administrator

```text id="z8jw5m"
Administrator Login

↓

Supabase Authentication

↓

Backend Authorization

↓

Access Granted

↓

Admin Dashboard
```

---

# 13. Notification Flow

```text id="4up1nb"
Business Event

↓

Notification Service

↓

Email

↓

SMS

↓

In-App Notification

↓

Customer
```

Business events include:

* Registration
* Email Verification
* Password Reset
* Order Confirmation
* Payment Received
* Shipping Update
* Refund Approval

---

# 14. Live Chat Flow

```text id="6mx8rt"
Customer

↓

Start Conversation

↓

Conversation Created

↓

Administrator Assigned

↓

Messages Exchanged

↓

Conversation Closed
```

Conversation history should remain permanently available.

---

# 15. Analytics Flow

```text id="v5n3ew"
Orders

Products

Payments

Customers

↓

Analytics Aggregation

↓

Dashboard Metrics

↓

Charts

↓

Reports
```

Metrics include:

* Revenue
* Profit
* Sales by Brand
* Sales by Category
* Top Products
* Repeat Customers
* Conversion Rate

---

# 16. Reporting Flow

```text id="9yq6hf"
Database

↓

Apply Filters

↓

Generate Report

↓

Export

↓

PDF

Excel

CSV
```

Reports should support filtering by:

* Date Range
* Category
* Brand
* Product
* Payment Method
* Order Status

---

# 17. High-Level System Relationship

```text id="8tw4mp"
Customer Website
        │
        ▼
Shared Backend API
        │
        ├────────────► Authentication
        │
        ├────────────► Products
        │
        ├────────────► Orders
        │
        ├────────────► Payments
        │
        ├────────────► Inventory
        │
        ├────────────► CMS
        │
        └────────────► Notifications
        │
        ▼
Supabase PostgreSQL
        ▲
        │
Admin Dashboard
```

Both frontends remain completely independent while sharing the same backend and database.

---

# 18. AntiGravity Execution Instructions

Before implementing any database schema, relationships, workflows, or business logic, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read this ERD and flow document.
* Analyze the existing database schema, Prisma models, backend services, and workflow implementations before making changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for database architecture, relationship modeling, backend workflows, commerce systems, performance optimization, and validation.
* Ensure every implemented relationship, transaction, and workflow matches the documented diagrams and business flows.
* Preserve consistency between the database, backend services, APIs, and frontend applications.
* Verify that all generated code aligns with the documented lifecycle diagrams before considering the task complete.

---

# 19. Definition of Success

This document is considered successfully implemented when:

* Entity relationships match the documented architecture.
* Business workflows follow the documented sequences.
* Transactional operations preserve data integrity.
* Authentication, inventory, payments, CMS, and notifications follow the documented flows.
* Customer Website and Admin Dashboard interact only through the shared backend APIs.
* Backend services remain the single source of truth for all business logic.
* Generated implementations remain consistent with every preceding project document.
