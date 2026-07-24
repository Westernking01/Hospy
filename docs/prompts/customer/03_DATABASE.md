# CUSTOMER WEBSITE — 03_DATABASE

## Objective

Implement the complete database layer for the HOPSY PLAZA platform based on the approved architecture and database design.

This task is responsible only for the database implementation, Prisma configuration, migrations, relationships, indexing, constraints, and seed data.

**Do not build any frontend pages, APIs, authentication UI, or business features.**

---

# Step 1 — Read Project Documentation

Before implementing anything, thoroughly read:

* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 04_AUTHENTICATION_AND_SECURITY.md
* 05_API_SPECIFICATION.md
* 09_BUSINESS_RULES.md
* 12_DEPLOYMENT_ARCHITECTURE.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

The database implementation must strictly follow the documented schema and business rules.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before writing any schema or migration:

Inspect **every available AntiGravity skill**.

Read the capability of each skill instead of relying on the skill name.

Activate only the skills that best fit this phase.

Typical skills may include:

* Database Architecture
* Prisma
* PostgreSQL
* Backend Architecture
* Data Modeling
* Performance Optimization
* Security
* Validation
* Clean Architecture
* Testing

Re-evaluate the available skills specifically for this task.

---

# Step 3 — Configure Prisma

Configure Prisma for Supabase PostgreSQL.

Requirements:

* Production-ready configuration
* Strict typing
* Migration support
* Seed support
* Environment separation
* Clean schema organization

Do not duplicate models.

---

# Step 4 — Implement Database Models

Implement every documented model, including but not limited to:

## Catalog

* Products
* Categories
* Brands
* Product Images
* Product Variants
* Product Specifications
* Product Bundles

---

## Inventory

* Inventory
* Inventory Movements
* Warehouse
* Reserved Stock
* Incoming Stock
* Low Stock Configuration
* Serial Numbers
* SKU
* Barcode

---

## Customer

* Customer Profile
* Addresses
* Wishlist
* Compare List
* Recently Viewed
* Saved for Later

---

## Orders

* Cart
* Cart Items
* Orders
* Order Items
* Order Timeline
* Shipping Information
* Billing Information
* Delivery Schedule

---

## Payments

* Payment Records
* Payment Transactions
* Bank Transfer Records
* Paystack References

---

## Promotions

* Coupons
* Flash Sales
* Discounts
* Bundle Promotions

---

## Reviews

* Reviews
* Review Likes

---

## CMS

* Homepage Banners
* Featured Products
* Promotional Sections
* Announcements

---

## Notifications

* Notification Records
* Email Queue
* Notification Logs

---

## Analytics

* Sales Statistics
* Dashboard Metrics

---

## Security

* Sessions
* Login History
* Device History
* Audit Logs

---

# Step 5 — Relationships

Implement all documented relationships.

Requirements:

* Proper foreign keys
* Cascading behavior
* Restrict where appropriate
* Nullable only when justified
* Referential integrity

No orphaned records should be possible.

---

# Step 6 — Constraints

Configure:

* Unique constraints
* Composite unique constraints
* Check constraints where supported
* Required fields
* Enum values
* Default values

The database should enforce business rules whenever possible.

---

# Step 7 — Indexing

Create indexes for:

* Product search
* Categories
* Brands
* SKU
* Serial Numbers
* Order lookup
* Customer lookup
* Email lookup
* Inventory queries
* Analytics queries

Avoid unnecessary indexes that increase write overhead.

---

# Step 8 — Seed Data

Create production-quality seed data for development.

Include:

* Categories
* Brands
* Sample Products
* Product Variants
* CMS Content
* Homepage Banners
* Featured Products
* Coupons
* Flash Sales
* Administrator Account Placeholder
* Store Settings

Seed data should resemble a realistic electronics retailer.

---

# Step 9 — Database Performance

Optimize for:

* Read performance
* Write consistency
* Transaction safety
* Efficient joins
* Pagination
* Filtering
* Sorting

Avoid N+1 query patterns.

---

# Step 10 — Data Integrity

Ensure:

* Transactions rollback correctly
* Inventory remains consistent
* Orders remain consistent
* Payments remain consistent
* Audit logs remain accurate

Business-critical operations must be transactional.

---

# Step 11 — Migration Strategy

Generate:

* Initial migration
* Seed scripts
* Reset scripts (development only)

Migration history should remain clean and reproducible.

---

# Step 12 — Validation

Verify:

* Schema compiles successfully
* Prisma Client generates correctly
* Migrations execute successfully
* Seed executes successfully
* Relationships are valid
* Constraints work correctly

---

# Step 13 — Out of Scope

Do **not** implement:

* UI
* Authentication pages
* APIs
* Business services
* Customer Website
* Admin Dashboard

This task ends at the database layer.

---

# Deliverables

The completed database should provide:

* Complete Prisma schema
* Production-ready PostgreSQL models
* Relationships
* Constraints
* Indexes
* Migration files
* Seed scripts
* Development reset scripts
* Optimized query structure
* Transaction-ready architecture

---

# Final Verification Checklist

Before completing this task, verify:

* Every database requirement from the documentation has been implemented.
* AntiGravity reviewed all available skills and activated only those appropriate for database engineering.
* Prisma schema validates successfully.
* Prisma Client generates without errors.
* Migrations execute successfully.
* Seed completes successfully.
* Referential integrity is maintained.
* Constraints and indexes are correct.
* No duplicated models.
* No placeholder database structures.
* Database is production-ready and scalable.

Only mark this task complete after every verification item has been satisfied.
