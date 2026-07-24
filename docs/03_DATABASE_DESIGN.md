# 03_DATABASE_DESIGN.md

# Part 1 — Database Architecture & Design Principles

---

# 1. Purpose

This document defines the complete database architecture for the HOPSY PLAZA Electronics E-Commerce Platform.

It serves as the single source of truth for:

* Database design
* Entity relationships
* Naming conventions
* Constraints
* Indexing strategy
* Transactions
* Data integrity
* Prisma schema implementation

Every table, relationship, and field introduced into the project must comply with this document.

---

# 2. Database Technology

Database Engine

* Supabase PostgreSQL

ORM

* Prisma ORM

Migration Tool

* Prisma Migrate

Database Access

* Prisma Client

The application must never bypass Prisma for normal database operations.

---

# 3. Database Philosophy

The database should prioritize:

* Data integrity
* Consistency
* Performance
* Maintainability
* Scalability

Business rules belong primarily in backend services.

The database is responsible for storing and protecting data rather than implementing business workflows.

---

# 4. Naming Conventions

## Tables

Use:

* lowercase
* plural nouns
* snake_case

Examples:

* products
* categories
* brands
* customers
* orders
* order_items

---

## Columns

Use:

* snake_case

Examples:

* first_name
* last_name
* created_at
* updated_at

---

## Primary Keys

Every table shall use:

```text id="9i9wfj"
id
```

Type:

UUID

Generated automatically.

---

## Foreign Keys

Foreign keys should clearly identify their parent entity.

Examples:

```text id="vcjlwm"
customer_id

product_id

brand_id

category_id

order_id
```

---

## Boolean Fields

Boolean fields should read naturally.

Examples:

```text id="v4tl5t"
is_active

is_featured

is_verified

is_deleted

is_default
```

---

## Timestamp Fields

Every business table should contain:

```text id="u61goj"
created_at

updated_at
```

Where appropriate:

```text id="6tpd04"
deleted_at
```

Soft deletion is preferred over permanent deletion for important business entities.

---

# 5. Database Standards

Every table should:

* Have a primary key.
* Define foreign keys where applicable.
* Include timestamps.
* Use meaningful defaults.
* Enforce referential integrity.

Avoid nullable fields unless genuinely optional.

---

# 6. UUID Strategy

Every major entity should use UUIDs instead of sequential integers.

Reasons:

* Better security.
* Easier distributed systems.
* Safer public identifiers.
* Improved scalability.

---

# 7. Soft Delete Strategy

Important business records should never be permanently removed.

Instead use:

```text id="g5rnkt"
deleted_at
```

Examples:

Products

Customers

Brands

Categories

Coupons

Promotions

CMS Content

Soft-deleted records should be excluded from normal queries.

---

# 8. Auditing Strategy

Business-critical entities should support auditability.

Important changes should remain historically traceable.

Examples:

Products

Inventory

Orders

Payments

Coupons

CMS

Settings

The application should preserve historical information whenever practical.

---

# 9. Data Integrity

Integrity should be maintained using:

* Foreign keys.
* Unique constraints.
* Check constraints where appropriate.
* Transactions.
* Validation in backend services.

No orphaned records should exist.

---

# 10. Relationship Principles

Relationship types include:

One-to-One

Examples:

Customer → Customer Preferences

Order → Invoice

---

One-to-Many

Examples:

Brand → Products

Category → Products

Customer → Orders

Order → Order Items

---

Many-to-Many

Examples:

Products ↔ Categories (if future expansion requires it)

Products ↔ Promotions

Products ↔ Bundles

These relationships should use dedicated junction tables.

---

# 11. Indexing Strategy

Indexes should exist for frequently queried fields.

Examples:

```text id="u3d2rz"
email

sku

barcode

slug

brand_id

category_id

customer_id

order_number

created_at
```

Composite indexes should be used where query performance benefits significantly.

---

# 12. Transaction Strategy

Database transactions must be used for operations affecting multiple related entities.

Examples:

Checkout

Payment confirmation

Inventory deduction

Refund processing

Coupon redemption

Transactions must guarantee consistency even if failures occur.

---

# 13. Data Lifecycle

Every entity progresses through a lifecycle.

Example:

Product

Draft

↓

Published

↓

Updated

↓

Archived

↓

Soft Deleted

Order

Pending

↓

Paid

↓

Processing

↓

Delivered

↓

Refunded / Cancelled

Database design should support these lifecycle transitions cleanly.

---

# 14. Performance Considerations

The schema should minimize:

* Duplicate data.
* Redundant relationships.
* Expensive joins.
* Unnecessary nullable fields.

Normalization should be preferred unless denormalization provides measurable business value.

---

# 15. Database Security

The database should support:

* Role separation.
* Least-privilege access.
* Secure credentials.
* Row-level security where appropriate.
* Safe backups.

Sensitive information must never be stored in plain text.

---

# 16. Prisma Design Principles

Prisma models should:

* Mirror documented entities.
* Use explicit relations.
* Use descriptive model names.
* Define indexes.
* Define unique constraints.
* Define enums where appropriate.

Every migration should remain deterministic and reversible whenever possible.

---

# 17. AntiGravity Execution Instructions

Before implementing or modifying the database, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read this database design document.
* Analyze the existing Prisma schema and migration history before making changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate database-related skill or combination of skills (such as database architecture, Prisma, PostgreSQL, performance optimization, data modeling, or validation).
* Preserve naming conventions, relationship integrity, and migration consistency.
* Avoid destructive schema changes unless explicitly documented and approved.
* Verify that new schema changes maintain compatibility with the documented business rules and system architecture before completing the task.
# 03_DATABASE_DESIGN.md

# Part 2 — Core Business Entities

---

# 18. Core Entity Overview

The core business entities represent the foundation of the HOPSY PLAZA platform.

These entities include:

* Administrators
* Customers
* Brands
* Categories
* Products
* Product Variants
* Product Images
* Product Specifications
* Inventory
* Warehouse
* Wishlist
* Compare List
* Recently Viewed

All other modules reference these entities.

---

# 19. Administrator

Administrators authenticate through Supabase Auth.

The application stores additional profile information separately.

Primary responsibilities:

* Product management
* Inventory management
* Order management
* CMS
* Promotions
* Analytics
* Customer support
* Website settings

Typical fields:

```text id="c9r1yx"
id
auth_user_id
full_name
email
phone
avatar_url
is_active
last_login_at
created_at
updated_at
```

Constraints:

* One profile per authentication account.
* Email must be unique.
* Public registration is prohibited.

---

# 20. Customer

Customers authenticate using Supabase Auth.

Customer profiles store business-specific information.

Typical fields:

```text id="qqhf3x"
id
auth_user_id
first_name
last_name
email
phone
avatar_url
date_of_birth
is_verified
is_active
created_at
updated_at
```

Relationships:

Customer

↓

Addresses

↓

Orders

↓

Reviews

↓

Wishlist

↓

Notifications

↓

Support Conversations

↓

Saved Payment References (non-sensitive only)

Customer authentication credentials remain managed by Supabase Auth.

---

# 21. Customer Addresses

Each customer may store multiple addresses.

Address types:

* Billing
* Shipping

Fields:

```text id="o7yrrw"
id
customer_id
full_name
phone
address_line_1
address_line_2
city
state
country
postal_code
is_default_billing
is_default_shipping
created_at
updated_at
```

Deleting a customer should not leave orphaned addresses.

---

# 22. Brands

The platform supports unlimited brands.

Examples:

* Apple
* Samsung
* Sony
* HP
* Dell
* Lenovo
* LG

Fields:

```text id="db2tt6"
id
name
slug
logo_url
description
is_featured
is_active
seo_title
seo_description
created_at
updated_at
deleted_at
```

Relationships:

Brand

↓

Products

---

# 23. Categories

Categories organize the product catalog.

Examples:

* Smartphones
* Laptops
* Gaming
* Audio
* Cameras
* Networking

Fields:

```text id="jewz7m"
id
name
slug
description
image_url
banner_url
display_order
is_featured
is_active
seo_title
seo_description
created_at
updated_at
deleted_at
```

Relationships:

Category

↓

Products

---

# 24. Products

Products represent sellable items.

Products remain independent of inventory quantities.

Typical fields:

```text id="r96f2m"
id
brand_id
category_id
name
slug
short_description
description
sku_prefix
status
is_featured
is_flash_sale
is_active
seo_title
seo_description
created_at
updated_at
deleted_at
```

Relationships:

Product

↓

Variants

↓

Images

↓

Specifications

↓

Reviews

↓

Inventory

↓

Order Items

↓

Wishlist

↓

Compare

---

# 25. Product Variants

Variants support different purchasable versions of the same product.

Examples:

Phone

128GB

256GB

512GB

Laptop

8GB RAM

16GB RAM

32GB RAM

Fields:

```text id="o8vkrn"
id
product_id
variant_name
sku
barcode
serial_required
price
compare_at_price
cost_price
weight
is_default
is_active
created_at
updated_at
```

Each variant maintains independent inventory.

---

# 26. Product Images

Products support unlimited images.

Fields:

```text id="5it9qs"
id
product_id
variant_id
image_url
alt_text
display_order
is_featured
created_at
updated_at
```

Images may belong to:

Entire Product

or

Specific Variant

---

# 27. Product Specifications

Technical specifications are stored separately.

Examples:

Display

Battery

Processor

RAM

Storage

Connectivity

Dimensions

Warranty

Fields:

```text id="icij9j"
id
product_id
specification_name
specification_value
display_order
created_at
updated_at
```

Keeping specifications normalized improves flexibility.

---

# 28. Inventory

Inventory is managed at the variant level.

Fields:

```text id="wmkl0v"
id
variant_id
warehouse_id
available_quantity
reserved_quantity
incoming_quantity
low_stock_threshold
created_at
updated_at
```

Derived stock values should be calculated in backend services rather than duplicated.

---

# 29. Warehouse

Current version supports one warehouse.

Fields:

```text id="ckx6sh"
id
name
address
city
state
country
phone
email
is_active
created_at
updated_at
```

The schema should support future expansion without redesign.

---

# 30. Inventory Movement

Every inventory adjustment must create an immutable history record.

Movement types include:

* Purchase
* Sale
* Restock
* Damage
* Manual Adjustment
* Reservation
* Release

Fields:

```text id="r6zhk2"
id
inventory_id
movement_type
quantity
reference_type
reference_id
notes
performed_by
created_at
```

Inventory history must never be edited or deleted.

---

# 31. Wishlist

Each customer owns a persistent wishlist.

Fields:

```text id="x8hruy"
id
customer_id
product_id
variant_id
created_at
```

Duplicate wishlist entries are not permitted.

---

# 32. Compare List

Customers may compare products.

Fields:

```text id="h4rhm4"
id
customer_id
product_id
created_at
```

The compare list should remain lightweight and easy to clear.

---

# 33. Recently Viewed

The platform tracks recently viewed products for each customer.

Fields:

```text id="n6k9bz"
id
customer_id
product_id
viewed_at
```

The system should retain only a reasonable number of recent items per customer.

---

# 34. Entity Relationships

Primary relationships include:

```text id="tthj8z"
Administrator
    │
    └── Inventory Movements

Customer
    ├── Addresses
    ├── Orders
    ├── Wishlist
    ├── Compare List
    ├── Reviews
    ├── Notifications
    └── Recently Viewed

Brand
    └── Products

Category
    └── Products

Product
    ├── Variants
    ├── Images
    ├── Specifications
    ├── Reviews
    ├── Wishlist
    ├── Compare List
    └── Order Items

Variant
    └── Inventory

Warehouse
    └── Inventory
```

---

# 35. AntiGravity Execution Instructions

Before implementing any core database entity, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read this database design section.
* Analyze existing Prisma models, migrations, and relationships before making changes.
* Thoroughly inspect all available AntiGravity skills and select the most appropriate database modeling skills for the task.
* Preserve referential integrity, naming conventions, indexing strategy, and documented relationships.
* Ensure every new model includes appropriate relations, constraints, timestamps, and soft-delete support where required.
* Validate that schema changes remain compatible with the overall business rules and backend architecture before generating migrations.
# 03_DATABASE_DESIGN.md

# Part 3 — Commerce & Transactional Entities

---

# 36. Commerce Entity Overview

The commerce layer manages the complete purchasing lifecycle.

Core entities include:

* Shopping Cart
* Cart Items
* Orders
* Order Items
* Payments
* Payment Transactions
* Shipping
* Shipping Methods
* Pickup Stations
* Coupons
* Promotions
* Flash Sales
* Product Bundles
* Reviews
* Invoices

These entities are responsible for every commercial transaction within the platform.

---

# 37. Shopping Cart

Each customer or guest may maintain one active shopping cart.

The cart represents a temporary collection of products before checkout.

Typical fields:

```text id="7km4sa"
id
customer_id
session_id
coupon_id
subtotal
discount_amount
shipping_amount
tax_amount
total_amount
expires_at
created_at
updated_at
```

Rules:

* Registered customers have one active cart.
* Guest carts are linked to a session identifier.
* When a guest registers or signs in, the guest cart should merge with the customer's existing cart according to documented business rules.

---

# 38. Cart Items

Each shopping cart contains one or more cart items.

Typical fields:

```text id="3pq0yf"
id
cart_id
product_id
variant_id
quantity
unit_price
subtotal
created_at
updated_at
```

Rules:

* Quantity must always be greater than zero.
* Duplicate product/variant combinations should update quantity rather than creating duplicate rows.
* Prices stored in the cart represent a snapshot and must be revalidated during checkout.

---

# 39. Orders

Orders represent completed purchase requests.

Typical fields:

```text id="b4gxqz"
id
order_number
customer_id
billing_address_id
shipping_address_id
shipping_method_id
coupon_id
status
payment_status
fulfillment_status
currency
subtotal
discount_amount
shipping_amount
tax_amount
total_amount
notes
placed_at
created_at
updated_at
```

Rules:

* Order numbers must be unique and human-readable.
* Financial values are immutable after successful payment except through documented administrative processes.
* Orders are never physically deleted.

---

# 40. Order Items

Order items capture the purchased products.

Typical fields:

```text id="mj9x6d"
id
order_id
product_id
variant_id
product_name
variant_name
sku
quantity
unit_price
discount_amount
subtotal
created_at
```

Rules:

* Product information should be snapshotted at purchase time.
* Future product edits must not alter historical order records.

---

# 41. Payments

Payments represent the business payment record.

Typical fields:

```text id="1dtn8v"
id
order_id
payment_method
status
amount
currency
paid_at
created_at
updated_at
```

Supported methods:

* Paystack
* Bank Transfer
* Cash on Delivery

Supported statuses:

* Pending
* Processing
* Successful
* Failed
* Refunded
* Cancelled

---

# 42. Payment Transactions

Provider-specific transaction details are stored separately.

Typical fields:

```text id="n7v4ea"
id
payment_id
provider
provider_reference
provider_status
authorization_reference
webhook_reference
raw_response
verified_at
created_at
```

Rules:

* Client-side payment responses are never considered authoritative.
* Payment verification must always occur on the backend.

---

# 43. Shipping Methods

Shipping methods define available delivery options.

Typical fields:

```text id="p3uyhr"
id
name
description
estimated_delivery_days
base_price
is_pickup
is_active
created_at
updated_at
```

Examples:

* Standard Delivery
* Express Delivery
* Pickup

---

# 44. Pickup Stations

The platform supports pickup locations.

Typical fields:

```text id="6qz2cb"
id
name
address
city
state
phone
opening_hours
is_active
created_at
updated_at
```

Pickup stations should be configurable from the admin dashboard.

---

# 45. Coupons

Coupons provide promotional discounts.

Typical fields:

```text id="g8hvr0"
id
code
description
discount_type
discount_value
minimum_purchase
maximum_discount
expires_at
usage_limit
usage_count
is_active
created_at
updated_at
deleted_at
```

Supported restrictions:

* Expiration date
* Minimum purchase
* Brand-specific
* Category-specific

---

# 46. Promotions

Promotions manage scheduled marketing campaigns.

Typical fields:

```text id="9kr5xs"
id
name
promotion_type
description
starts_at
ends_at
priority
is_active
created_at
updated_at
deleted_at
```

Supported types:

* Flash Sale
* Bundle Discount
* Buy One Get One
* Seasonal Campaign

Products participate in promotions through relational mapping.

---

# 47. Flash Sales

Flash sales provide time-limited pricing.

Typical fields:

```text id="2wm6gc"
id
product_id
variant_id
sale_price
starts_at
ends_at
maximum_quantity
is_active
created_at
updated_at
```

Flash sale pricing overrides normal pricing while active.

---

# 48. Product Bundles

Bundles group multiple products into a discounted offering.

Typical fields:

```text id="v0pjlb"
id
name
description
bundle_price
is_active
starts_at
ends_at
created_at
updated_at
```

Bundle contents should be stored using a dedicated junction table.

---

# 49. Product Reviews

Only verified purchasers may submit reviews.

Typical fields:

```text id="y1kqdt"
id
customer_id
product_id
order_item_id
rating
title
review
likes_count
is_approved
created_at
updated_at
```

Rules:

* One review per purchased product unless editing the existing review.
* Reviews remain linked to the verified purchase.

---

# 50. Invoices

Invoices represent the official financial record issued for an order.

Typical fields:

```text id="m4w8rn"
id
order_id
invoice_number
invoice_url
issued_at
created_at
```

Invoice numbers must be unique.

Generated invoice files should be stored in Supabase Storage.

---

# 51. Entity Relationships

Commerce relationships include:

```text id="x7f3mk"
Shopping Cart
    └── Cart Items

Customer
    ├── Shopping Cart
    ├── Orders
    └── Reviews

Order
    ├── Order Items
    ├── Payment
    ├── Invoice
    └── Shipping

Payment
    └── Payment Transactions

Promotion
    └── Products

Bundle
    └── Products

Product
    ├── Reviews
    ├── Flash Sales
    └── Bundles
```

---

# 52. Data Integrity Rules

The commerce layer must satisfy the following rules:

* Orders cannot exist without at least one order item.
* Payments must reference valid orders.
* Order totals must equal the sum of all financial components.
* Inventory deductions occur only through documented backend workflows.
* Coupons must be validated at checkout.
* Expired promotions cannot be applied.
* Historical order records remain immutable except for administrative status updates.

---

# 53. AntiGravity Execution Instructions

Before implementing any commerce-related database entities, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read this database design section.
* Analyze existing commerce models and relationships before introducing changes.
* Thoroughly inspect all available AntiGravity skills and choose the most suitable skills for transactional database modeling, payment integration, inventory consistency, and performance.
* Preserve transactional integrity, financial accuracy, and historical data.
* Ensure all schema changes are compatible with checkout workflows, payment processing, inventory management, and reporting.
* Verify relationships, constraints, indexes, and migration safety before generating Prisma migrations.
# 03_DATABASE_DESIGN.md

# Part 4 — CMS, Communication, Analytics & System Entities

---

# 54. System Entity Overview

This section defines the supporting entities that power content management, customer communication, analytics, reporting, system configuration, and auditing.

These entities support business operations but are not directly involved in the purchasing workflow.

Core entities include:

* CMS Pages
* Homepage Banners
* Homepage Sections
* Email Templates
* Notifications
* Live Chat Conversations
* Live Chat Messages
* Customer Support
* Reports
* Analytics Snapshots
* Website Settings
* Audit Logs

---

# 55. CMS Pages

CMS pages allow administrators to manage informational content without modifying source code.

Examples:

* About Us
* Contact
* FAQ
* Warranty Information
* Privacy Policy
* Terms & Conditions
* Return Policy

Typical fields:

```text id="w6nt4q"
id
title
slug
content
meta_title
meta_description
is_published
published_at
created_by
updated_by
created_at
updated_at
deleted_at
```

Rules:

* Slugs must be unique.
* Draft pages must not be publicly accessible.
* Published pages should support SEO metadata.

---

# 56. Homepage Banners

Homepage banners are managed through the CMS.

Typical fields:

```text id="z2cr8m"
id
title
subtitle
image_url
mobile_image_url
button_text
button_link
display_order
starts_at
ends_at
is_active
created_at
updated_at
```

Rules:

* Multiple banners may exist.
* Display order determines presentation sequence.
* Scheduled publishing is supported.

---

# 57. Homepage Sections

Homepage content should be configurable.

Examples:

* Featured Categories
* Featured Products
* Flash Sales
* Deal of the Week
* Brand Showcase
* Promotional Blocks

Typical fields:

```text id="l8kp5v"
id
section_key
title
subtitle
display_order
is_enabled
configuration
created_at
updated_at
```

The configuration field may store structured JSON for flexible layouts.

---

# 58. Email Templates

Email templates should be configurable independently from application code.

Supported templates include:

* Welcome
* Verify Email
* Password Reset
* Order Confirmation
* Payment Received
* Order Shipped
* Refund Approved

Typical fields:

```text id="y5jb7r"
id
name
subject
html_content
text_content
is_active
created_at
updated_at
```

Business logic references templates rather than embedding email content.

---

# 59. Notifications

The notification system stores user notifications.

Typical fields:

```text id="n1xd9f"
id
customer_id
type
title
message
channel
is_read
read_at
created_at
```

Supported channels:

* Email
* SMS
* In-App

Notifications should remain historically available.

---

# 60. Live Chat Conversations

Each customer conversation is represented by a conversation record.

Typical fields:

```text id="q4hw2a"
id
customer_id
status
assigned_admin_id
started_at
closed_at
created_at
updated_at
```

Supported statuses:

* Open
* Pending
* Closed

---

# 61. Live Chat Messages

Each conversation contains multiple messages.

Typical fields:

```text id="c7vu1n"
id
conversation_id
sender_type
sender_id
message
attachment_url
sent_at
```

Rules:

* Messages are immutable after delivery.
* Attachments should be stored in Supabase Storage.

---

# 62. Reports

The reporting module stores metadata for generated reports.

Typical fields:

```text id="h3mf8k"
id
report_type
generated_by
file_url
filters
generated_at
```

Supported exports:

* PDF
* Excel
* CSV

Generated report files should be stored in Supabase Storage.

---

# 63. Analytics Snapshots

Analytics snapshots store summarized business metrics for dashboards.

Typical fields:

```text id="b8rq6x"
id
snapshot_date
total_revenue
total_orders
total_customers
repeat_customers
top_category
top_product
created_at
```

Snapshots improve dashboard performance by reducing expensive calculations.

---

# 64. Website Settings

Website settings centralize configurable business information.

Typical fields:

```text id="u9pl4e"
id
company_name
company_email
company_phone
company_address
business_hours
currency
default_country
maintenance_mode
created_at
updated_at
```

Settings should be editable through the admin dashboard.

Only one active settings record should exist.

---

# 65. Social Media Settings

Store official company social links.

Typical fields:

```text id="k2zn5w"
id
facebook_url
instagram_url
x_url
linkedin_url
youtube_url
tiktok_url
whatsapp_number
updated_at
```

These values populate the customer website footer and contact pages.

---

# 66. Audit Logs

Every important administrative action should generate an audit log.

Typical fields:

```text id="d5yt3p"
id
admin_id
action
entity_type
entity_id
old_values
new_values
ip_address
user_agent
created_at
```

Examples:

* Product Created
* Product Updated
* Order Status Changed
* Banner Updated
* Coupon Created
* Inventory Modified
* Settings Updated

Audit logs are immutable.

---

# 67. Login History

Administrative authentication history should be retained.

Typical fields:

```text id="r7gf1v"
id
admin_id
ip_address
user_agent
device_name
login_at
logout_at
was_successful
```

This supports security investigations and account monitoring.

---

# 68. Customer Activity History

Important customer events should be retained.

Examples:

* Registration
* Login
* Password Reset
* Checkout
* Order Placement
* Review Submission
* Address Update

Typical fields:

```text id="x1sj8m"
id
customer_id
activity_type
description
created_at
```

This data supports customer support and auditing.

---

# 69. Entity Relationships

Supporting entity relationships:

```text id="p4qm2j"
Administrator
    ├── Audit Logs
    ├── Generated Reports
    └── Live Chat Conversations

Customer
    ├── Notifications
    ├── Activity History
    └── Live Chat Conversations

Conversation
    └── Messages

Website Settings
    └── Social Media Settings

CMS
    ├── Homepage Banners
    ├── Homepage Sections
    └── CMS Pages
```

---

# 70. AntiGravity Execution Instructions

Before implementing supporting database entities, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read this database design section.
* Analyze existing schema, services, and CMS architecture before introducing new entities.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for CMS architecture, communication systems, analytics, reporting, database modeling, and performance optimization.
* Ensure supporting entities remain modular and do not duplicate business data already stored elsewhere.
* Preserve auditability, referential integrity, and long-term maintainability.
* Verify schema consistency, indexing, and migration safety before generating Prisma migrations.
# 03_DATABASE_DESIGN.md

# Part 5 — Database Standards, Constraints & Implementation Rules

---

# 71. Database Enums

To ensure consistency, commonly repeated values should be implemented as PostgreSQL enums through Prisma.

Recommended enums include:

## Order Status

```text id="c4xm9v"
PENDING
PAID
PROCESSING
SHIPPED
DELIVERED
CANCELLED
REFUNDED
```

---

## Payment Status

```text id="3kpr6j"
PENDING
PROCESSING
SUCCESSFUL
FAILED
REFUNDED
CANCELLED
```

---

## Payment Method

```text id="9db1th"
PAYSTACK
BANK_TRANSFER
CASH_ON_DELIVERY
```

---

## Inventory Movement Type

```text id="xy6g2k"
PURCHASE
SALE
RESTOCK
DAMAGE
RESERVATION
RELEASE
MANUAL_ADJUSTMENT
```

---

## Notification Channel

```text id="t8y2mn"
EMAIL
SMS
IN_APP
```

---

## Notification Status

```text id="w7h5lf"
PENDING
SENT
FAILED
READ
```

---

## Live Chat Status

```text id="v9r8qe"
OPEN
PENDING
CLOSED
```

---

## Sender Type

```text id="5u2jga"
CUSTOMER
ADMIN
SYSTEM
```

---

## Product Status

```text id="z6cw4b"
DRAFT
PUBLISHED
ARCHIVED
```

---

## Discount Type

```text id="1gtn4h"
PERCENTAGE
FIXED_AMOUNT
```

---

## Promotion Type

```text id="9msv7p"
FLASH_SALE
BUNDLE_DISCOUNT
BUY_ONE_GET_ONE
SEASONAL
```

---

# 72. Global Constraints

The database should enforce critical business rules.

Examples include:

* Email addresses must be unique.
* Product slugs must be unique.
* Brand slugs must be unique.
* Category slugs must be unique.
* Coupon codes must be unique.
* Order numbers must be unique.
* Invoice numbers must be unique.
* SKU values must be unique.
* Barcodes must be unique when provided.
* Authentication identifiers must be unique.

Where appropriate, constraints should be implemented at the database level in addition to backend validation.

---

# 73. Unique Composite Constraints

Composite uniqueness should prevent duplicate business records.

Examples:

Customer Wishlist

```text id="e4mk7x"
customer_id
product_id
variant_id
```

Customer Compare List

```text id="x5af9n"
customer_id
product_id
```

Cart Items

```text id="7r2vhc"
cart_id
product_id
variant_id
```

Inventory

```text id="u8pl1w"
variant_id
warehouse_id
```

Only one active inventory record should exist for each product variant in a warehouse.

---

# 74. Indexing Strategy

Indexes should be created for high-frequency queries.

Examples:

```text id="l5js8f"
email
phone
slug
sku
barcode
created_at
updated_at
```

Foreign keys should also be indexed where appropriate.

Examples:

```text id="f3zw9m"
customer_id
product_id
brand_id
category_id
order_id
variant_id
warehouse_id
```

Composite indexes should support common filtering combinations, such as:

* Category + Status
* Brand + Status
* Product + Variant
* Customer + Created Date
* Order Status + Created Date

Indexes should be reviewed periodically as query patterns evolve.

---

# 75. Foreign Key Rules

Referential integrity must be preserved.

Deletion behavior should be selected based on business requirements.

Examples:

RESTRICT

Prevent deletion of referenced business entities.

Examples:

* Products with order history.
* Brands containing products.
* Categories containing products.

CASCADE

Use only where child records have no independent business value.

Examples:

* Cart Items
* Wishlist Items
* Compare Items

SET NULL

Use when historical data should remain but the relationship may become optional.

Examples:

* Administrator who created a record but later leaves the organization.

---

# 76. Soft Delete Policy

Soft deletion should be used for business-critical entities.

Entities include:

* Products
* Categories
* Brands
* Customers
* Coupons
* Promotions
* CMS Pages

Operational records should remain permanently available.

Examples:

* Orders
* Payments
* Inventory Movements
* Audit Logs
* Reports

These records should never be soft deleted.

---

# 77. Prisma Modeling Standards

Every Prisma model should:

* Use meaningful model names.
* Explicitly define relations.
* Declare indexes.
* Declare unique constraints.
* Define default values.
* Include timestamps.
* Use UUID primary keys.

Relation names should remain descriptive and consistent across the schema.

---

# 78. Migration Strategy

Database schema changes must always be introduced through Prisma migrations.

Rules:

* Never edit an applied migration.
* Create a new migration for every schema change.
* Review generated SQL before deployment.
* Test migrations in a development environment before production.
* Keep migrations focused and reversible whenever possible.

Migration history forms part of the project's audit trail and should not be rewritten.

---

# 79. Seed Strategy

The database should include repeatable seed data for development.

Initial seed data should include:

* Administrator account placeholder
* Product categories
* Brands
* Shipping methods
* Pickup stations
* Homepage sections
* Website settings
* Email templates
* Sample banners
* Sample products
* Product variants

Seed scripts should be idempotent where practical so they can be rerun safely.

---

# 80. Backup & Recovery Principles

Production data must be protected through regular backups.

The recovery process should prioritize:

* Data integrity
* Minimal downtime
* Transaction consistency

Backups should be verified periodically to ensure they can be restored successfully.

---

# 81. Performance Guidelines

The database should be designed to support growth without major redesign.

Key principles:

* Normalize business data appropriately.
* Avoid unnecessary duplication.
* Optimize frequently queried fields.
* Paginate large datasets.
* Select only required columns.
* Avoid N+1 query patterns.
* Use transactions only where necessary.

Performance decisions should be guided by measurable evidence.

---

# 82. Acceptance Criteria

The database design is considered complete when:

* Every business entity is documented.
* Relationships are clearly defined.
* Naming conventions are consistently applied.
* Constraints preserve data integrity.
* Indexes support expected query patterns.
* Enums eliminate repeated string literals.
* Prisma models can be generated without ambiguity.
* Migration strategy is documented.
* Seed strategy is documented.
* The schema supports all functional requirements defined in the Product Requirements Document.

---

# 83. AntiGravity Execution Instructions

Before generating or modifying the Prisma schema, migrations, or seed scripts, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read the complete `03_DATABASE_DESIGN.md` document.
* Analyze the existing Prisma schema, migration history, and seed scripts before making changes.
* Thoroughly inspect all available AntiGravity skills and select the most appropriate skills for Prisma, PostgreSQL, database architecture, migration management, performance optimization, validation, and testing.
* Ensure every generated model complies with the documented naming conventions, relationships, constraints, indexes, enums, and lifecycle rules.
* Generate deterministic, production-ready migrations and avoid destructive schema changes unless explicitly requested.
* Validate schema consistency, migration safety, referential integrity, and compatibility with backend services before completing the task.

---

# 84. Definition of Success

The database architecture is considered successful when:

* It accurately represents the HOPSY PLAZA business domain.
* It supports current requirements without unnecessary complexity.
* It accommodates future expansion with minimal structural changes.
* It preserves data integrity through constraints and relationships.
* It performs efficiently under expected workloads.
* It integrates cleanly with Prisma, Supabase PostgreSQL, and the backend architecture.
* It provides a stable foundation for APIs, authentication, inventory management, payments, CMS, analytics, and reporting.
* Every implementation generated by AntiGravity remains consistent with this document and the overall project architecture.
