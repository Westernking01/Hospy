# 05_API_SPECIFICATION.md

# Part 1 — API Architecture, Standards & Conventions

---

# 1. Purpose

This document defines the complete API architecture for the HOPSY PLAZA Electronics E-Commerce Platform.

The backend serves as the single source of truth for all business logic and is shared by two independent frontend applications:

* Customer Website
* Admin Dashboard

No frontend application may communicate directly with the database.

Every business operation must pass through the backend API.

---

# 2. API Architecture

The project follows a layered architecture.

```text
Customer Website
        │
        │
        ▼
 REST API (Next.js Route Handlers)
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Repositories
        │
        ▼
Prisma ORM
        │
        ▼
Supabase PostgreSQL
```

The Admin Dashboard uses the same backend architecture.

Business logic must never exist inside frontend applications.

---

# 3. API Design Principles

The API should follow these principles:

* RESTful
* Predictable
* Consistent
* Stateless
* Versionable
* Secure
* Performant

Every endpoint should perform a single responsibility.

---

# 4. API Versioning

All endpoints should be versioned.

Example:

```text id="a8d3pn"
/api/v1/
```

Future versions should coexist without breaking existing clients.

---

# 5. Response Format

Every successful response should follow a consistent structure.

Example:

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "meta": {}
}
```

---

Every failed response should follow the same format.

Example:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

Response formats must remain consistent across the platform.

---

# 6. HTTP Status Codes

The API should use standard HTTP status codes.

Examples:

| Status | Meaning               |
| ------ | --------------------- |
| 200    | Success               |
| 201    | Resource Created      |
| 204    | No Content            |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 409    | Conflict              |
| 422    | Validation Error      |
| 429    | Too Many Requests     |
| 500    | Internal Server Error |

Status codes should accurately reflect the outcome of each request.

---

# 7. Authentication

Protected endpoints require authentication.

Authentication uses:

* Supabase Access Token

The backend is responsible for:

* Token validation
* User lookup
* Permission verification
* Resource ownership checks

Public endpoints should not require authentication.

---

# 8. Authorization

Authorization is handled exclusively by backend services.

Customer permissions:

* Access only personal resources.

Administrator permissions:

* Full administrative capabilities.

Permission checks must never rely on frontend logic.

---

# 9. Validation

Every request must undergo validation.

Validation includes:

* Required fields
* Data types
* Enum values
* Business rules
* Ownership validation
* Referential integrity

Validation should occur before business logic executes.

---

# 10. Pagination

Large collections should support pagination.

Standard query parameters:

```text id="m5vx8q"
?page=1

&limit=20
```

Response metadata should include:

* Current page
* Total pages
* Total records
* Items per page

---

# 11. Sorting

Collection endpoints should support sorting.

Examples:

```text id="g7jk2n"
?sort=name

?sort=price

?sort=createdAt

?order=asc

?order=desc
```

Sorting fields should be validated.

---

# 12. Filtering

Endpoints should support filtering.

Examples:

Products

```text id="t9zr4h"
category

brand

price

availability

flashSale
```

Orders

```text id="v3pq6d"
status

paymentStatus

dateRange
```

Filtering should remain consistent across endpoints.

---

# 13. Searching

Search should support keyword-based queries.

Example:

```text id="j6wh1s"
?q=iphone
```

Search should be case-insensitive.

Results should prioritize relevance.

---

# 14. Error Handling

Errors should remain predictable.

Example response:

```json
{
  "success": false,
  "message": "Product not found.",
  "errors": []
}
```

Internal implementation details must never be exposed.

---

# 15. Rate Limiting

Sensitive endpoints should implement rate limiting.

Examples:

Authentication

Password Reset

Checkout

Coupon Validation

Live Chat

Search

Limits should be configurable.

---

# 16. AntiGravity Execution Instructions

Before implementing API routes or modifying backend endpoints, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read `04_AUTHENTICATION_AND_SECURITY.md`.
* Read this API specification.
* Analyze existing route handlers, controllers, services, repositories, validation schemas, and middleware before making changes.
* Thoroughly inspect all available AntiGravity skills and select the most appropriate skills for REST API design, backend architecture, validation, performance optimization, security, testing, and documentation.
* Ensure every endpoint follows the documented response format, validation rules, authorization model, and architectural layering.
* Preserve backward compatibility within API versions unless explicitly instructed otherwise.
# 05_API_SPECIFICATION.md

# Part 2 — Customer API Endpoints

---

# 17. Customer API Overview

These endpoints power the **Customer Website**.

All customer operations must be performed through these APIs.

The frontend must never communicate directly with the database.

---

# 18. Authentication APIs

Base Route

```text
/api/v1/auth
```

Endpoints

| Method | Endpoint             | Description                 | Auth Required |
| ------ | -------------------- | --------------------------- | ------------- |
| POST   | /register            | Register customer           | No            |
| POST   | /login               | Login with Email & Password | No            |
| POST   | /logout              | Logout current session      | Yes           |
| POST   | /refresh             | Refresh session             | Yes           |
| POST   | /forgot-password     | Send password reset email   | No            |
| POST   | /reset-password      | Complete password reset     | No            |
| POST   | /verify-email        | Verify email address        | No            |
| POST   | /resend-verification | Resend verification email   | No            |
| POST   | /google              | Google OAuth callback       | No            |
| POST   | /phone-otp           | Phone OTP authentication    | No            |
| POST   | /email-otp           | Email OTP authentication    | No            |

---

# 19. Customer Profile APIs

Base Route

```text
/api/v1/profile
```

Endpoints

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| GET    | /         | Get customer profile |
| PATCH  | /         | Update profile       |
| PATCH  | /avatar   | Update profile image |
| PATCH  | /password | Change password      |
| DELETE | /         | Deactivate account   |

Only authenticated customers may access these endpoints.

---

# 20. Address APIs

Base Route

```text
/api/v1/addresses
```

Endpoints

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /                     |
| POST   | /                     |
| PATCH  | /:id                  |
| DELETE | /:id                  |
| PATCH  | /:id/default-billing  |
| PATCH  | /:id/default-shipping |

Business Rules

* A customer may save multiple addresses.
* Only one default billing address.
* Only one default shipping address.

---

# 21. Product APIs

Base Route

```text
/api/v1/products
```

Endpoints

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /             |
| GET    | /featured     |
| GET    | /flash-sales  |
| GET    | /recommended  |
| GET    | /bundles      |
| GET    | /new-arrivals |
| GET    | /best-sellers |
| GET    | /:slug        |

Supported Query Parameters

```text
category

brand

price

availability

flashSale

page

limit

sort

order

q
```

---

# 22. Category APIs

Base Route

```text
/api/v1/categories
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:slug   |

---

# 23. Brand APIs

Base Route

```text
/api/v1/brands
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:slug   |

---

# 24. Wishlist APIs

Base Route

```text
/api/v1/wishlist
```

Endpoints

| Method | Endpoint    |
| ------ | ----------- |
| GET    | /           |
| POST   | /           |
| DELETE | /:productId |

Wishlist operations require authentication.

---

# 25. Compare APIs

Base Route

```text
/api/v1/compare
```

Endpoints

| Method | Endpoint    |
| ------ | ----------- |
| GET    | /           |
| POST   | /           |
| DELETE | /:productId |

---

# 26. Recently Viewed APIs

Base Route

```text
/api/v1/recently-viewed
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /        |
| POST   | /        |

The backend should automatically prevent duplicate consecutive entries.

---

# 27. Shopping Cart APIs

Base Route

```text
/api/v1/cart
```

Endpoints

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /          |
| POST   | /items     |
| PATCH  | /items/:id |
| DELETE | /items/:id |
| DELETE | /clear     |
| POST   | /coupon    |
| DELETE | /coupon    |

Business Rules

* Guest carts are supported.
* Customer carts are synchronized after login.
* Cart totals are recalculated server-side.

---

# 28. Checkout APIs

Base Route

```text
/api/v1/checkout
```

Endpoints

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /validate    |
| POST   | /shipping    |
| POST   | /payment     |
| POST   | /place-order |

Validation includes:

* Inventory
* Coupons
* Shipping
* Pricing

---

# 29. Order APIs

Base Route

```text
/api/v1/orders
```

Endpoints

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /                     |
| GET    | /:orderNumber         |
| POST   | /cancel               |
| GET    | /invoice/:orderNumber |

Customers may access only their own orders.

---

# 30. Review APIs

Base Route

```text
/api/v1/reviews
```

Endpoints

| Method | Endpoint  |
| ------ | --------- |
| POST   | /         |
| PATCH  | /:id      |
| DELETE | /:id      |
| POST   | /:id/like |

Business Rules

* Only verified purchasers may submit reviews.
* Customers may edit their own reviews.
* Likes are available to authenticated users.

---

# 31. Notification APIs

Base Route

```text
/api/v1/notifications
```

Endpoints

| Method | Endpoint  |
| ------ | --------- |
| GET    | /         |
| PATCH  | /:id/read |
| PATCH  | /read-all |

Notifications include:

* Orders
* Payments
* Shipping
* Promotions
* Account updates

---

# 32. Live Chat APIs

Base Route

```text
/api/v1/live-chat
```

Endpoints

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /conversations            |
| POST   | /conversations            |
| GET    | /messages/:conversationId |
| POST   | /messages                 |

Only authenticated customers may initiate or access their own conversations.

---

# 33. Customer API Security Rules

The backend must verify for every protected endpoint:

* Authentication
* Session validity
* Resource ownership
* Request validation
* Rate limits
* Business permissions

The frontend must never bypass these validations.

---

# 34. AntiGravity Execution Instructions

Before implementing Customer API endpoints, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read `04_AUTHENTICATION_AND_SECURITY.md`.
* Read this API specification.
* Analyze the existing route handlers, controllers, services, repositories, validation schemas, and middleware before introducing new endpoints.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for REST API implementation, validation, Supabase integration, Prisma, security, testing, performance optimization, and API documentation.
* Ensure all customer endpoints enforce authentication, ownership validation, consistent response formats, and documented business rules.
* Maintain strict separation between frontend presentation logic and backend business logic.
# 05_API_SPECIFICATION.md

# Part 3 — Admin Dashboard API Endpoints

---

# 35. Admin API Overview

These endpoints power the **Admin Dashboard**.

All administrative operations must be performed through these APIs.

Every endpoint in this section requires:

* Authentication
* Administrator authorization
* Session validation

No administrative endpoint should be accessible from the public website.

---

# 36. Administrator Authentication APIs

Base Route

```text id="kq2v7m"
/api/v1/admin/auth
```

Endpoints

| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| POST   | /login      | Administrator Login              |
| POST   | /logout     | Logout                           |
| POST   | /refresh    | Refresh Session                  |
| POST   | /verify-2fa | Verify Two-Factor Authentication |
| GET    | /me         | Current Administrator            |

Only administrator accounts may authenticate through these endpoints.

---

# 37. Dashboard APIs

Base Route

```text id="r8n5wh"
/api/v1/admin/dashboard
```

Endpoints

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /overview         |
| GET    | /sales-summary    |
| GET    | /recent-orders    |
| GET    | /top-products     |
| GET    | /top-categories   |
| GET    | /revenue-chart    |
| GET    | /orders-chart     |
| GET    | /inventory-alerts |

Dashboard metrics include:

* Today's Sales
* Weekly Sales
* Monthly Sales
* Annual Sales
* Revenue
* Orders
* Repeat Customers
* Conversion Rate

---

# 38. Product Management APIs

Base Route

```text id="g3u9cp"
/api/v1/admin/products
```

Endpoints

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /            |
| POST   | /            |
| GET    | /:id         |
| PATCH  | /:id         |
| DELETE | /:id         |
| PATCH  | /:id/publish |
| PATCH  | /:id/archive |
| PATCH  | /:id/restore |

Related Endpoints

```text id="v6m1ts"
/variants

/images

/specifications

/accessories

/related-products
```

Product creation includes:

* Images
* Variants
* Specifications
* Warranty
* SEO
* Inventory initialization

---

# 39. Category Management APIs

Base Route

```text id="j4e2rd"
/api/v1/admin/categories
```

Endpoints

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /            |
| POST   | /            |
| PATCH  | /:id         |
| DELETE | /:id         |
| PATCH  | /:id/restore |

Categories support unlimited nesting if enabled in future versions.

---

# 40. Brand Management APIs

Base Route

```text id="a7p8lx"
/api/v1/admin/brands
```

Endpoints

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /            |
| POST   | /            |
| PATCH  | /:id         |
| DELETE | /:id         |
| PATCH  | /:id/restore |

Brands support:

* Logo
* Description
* Featured Status
* SEO

---

# 41. Inventory APIs

Base Route

```text id="u2f6ne"
/api/v1/admin/inventory
```

Endpoints

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /          |
| GET    | /movements |
| POST   | /adjust    |
| POST   | /restock   |
| POST   | /damage    |
| POST   | /reserve   |
| POST   | /release   |

Inventory management includes:

* Available Stock
* Reserved Stock
* Incoming Stock
* Low Stock Alerts
* Warehouse Inventory
* Serial Numbers
* Barcode Management

Every stock movement must generate an inventory movement record.

---

# 42. Order Management APIs

Base Route

```text id="h5d9mk"
/api/v1/admin/orders
```

Endpoints

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /            |
| GET    | /:id         |
| PATCH  | /status      |
| PATCH  | /payment     |
| PATCH  | /shipping    |
| POST   | /refund      |
| GET    | /invoice/:id |

Order filtering supports:

* Status
* Payment Status
* Date Range
* Customer
* Brand
* Product

---

# 43. Customer Management APIs

Base Route

```text id="e9v4qa"
/api/v1/admin/customers
```

Endpoints

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /              |
| GET    | /:id           |
| PATCH  | /status        |
| GET    | /orders        |
| GET    | /activity      |
| GET    | /devices       |
| GET    | /login-history |

Customer passwords are never accessible.

---

# 44. Review Management APIs

Base Route

```text id="m7z3xy"
/api/v1/admin/reviews
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /        |
| PATCH  | /approve |
| PATCH  | /reject  |
| DELETE | /        |

Administrators may moderate customer reviews.

---

# 45. Coupon APIs

Base Route

```text id="p6n1bd"
/api/v1/admin/coupons
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /        |
| POST   | /        |
| PATCH  | /:id     |
| DELETE | /:id     |

Coupons support:

* Expiration Date
* Usage Limits
* Minimum Purchase
* Brand Restrictions
* Category Restrictions

---

# 46. Promotion APIs

Base Route

```text id="w4x8lr"
/api/v1/admin/promotions
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /        |
| POST   | /        |
| PATCH  | /:id     |
| DELETE | /:id     |

Supported promotions include:

* Flash Sales
* Bundle Discounts
* Buy One Get One
* Seasonal Campaigns

---

# 47. CMS APIs

Base Route

```text id="y3k7pj"
/api/v1/admin/cms
```

Endpoints

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /pages             |
| POST   | /pages             |
| PATCH  | /pages/:id         |
| DELETE | /pages/:id         |
| GET    | /banners           |
| POST   | /banners           |
| PATCH  | /banners/:id       |
| DELETE | /banners/:id       |
| GET    | /homepage-sections |
| PATCH  | /homepage-sections |

CMS changes should become visible on the customer website without code deployment.

---

# 48. Analytics APIs

Base Route

```text id="s5f2gw"
/api/v1/admin/analytics
```

Endpoints

| Method | Endpoint    |
| ------ | ----------- |
| GET    | /overview   |
| GET    | /sales      |
| GET    | /products   |
| GET    | /customers  |
| GET    | /categories |
| GET    | /brands     |
| GET    | /conversion |

Analytics support configurable date ranges.

---

# 49. Report APIs

Base Route

```text id="q8m6vn"
/api/v1/admin/reports
```

Endpoints

| Method | Endpoint   |
| ------ | ---------- |
| POST   | /generate  |
| GET    | /downloads |
| GET    | /:id       |

Export formats:

* PDF
* Excel
* CSV

---

# 50. Website Settings APIs

Base Route

```text id="n1j9uk"
/api/v1/admin/settings
```

Endpoints

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /general      |
| PATCH  | /general      |
| PATCH  | /company      |
| PATCH  | /shipping     |
| PATCH  | /payments     |
| PATCH  | /emails       |
| PATCH  | /seo          |
| PATCH  | /social-media |

Settings changes should take effect without restarting the application.

---

# 51. Live Chat Management APIs

Base Route

```text id="b9r5tc"
/api/v1/admin/live-chat
```

Endpoints

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /conversations            |
| GET    | /messages/:conversationId |
| POST   | /reply                    |
| PATCH  | /close                    |

Administrators manage all customer conversations through these endpoints.

---

# 52. Audit Log APIs

Base Route

```text id="l2x8he"
/api/v1/admin/audit-logs
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:id     |

Audit logs are read-only.

Deletion is not permitted.

---

# 53. Admin API Security Rules

Every administrative endpoint must validate:

* Authentication
* Active administrator session
* Two-Factor Authentication status (when enabled)
* CSRF protection where applicable
* Input validation
* Business rules
* Audit logging for sensitive operations

Administrative APIs should never trust client-provided authorization information.

---

# 54. AntiGravity Execution Instructions

Before implementing or modifying Admin APIs, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read `04_AUTHENTICATION_AND_SECURITY.md`.
* Read the complete `05_API_SPECIFICATION.md`.
* Analyze the existing route handlers, controllers, services, repositories, validation schemas, middleware, and audit logging before making changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for enterprise REST APIs, backend architecture, Prisma, Supabase, security, validation, performance optimization, testing, and documentation.
* Ensure every administrative endpoint follows the documented architecture, response standards, authorization model, and business rules.
* Record audit logs for all sensitive administrative actions and preserve transactional integrity throughout the implementation.
# 05_API_SPECIFICATION.md

# Part 4 — Shared APIs, Webhooks, Standards & Acceptance Criteria

---

# 55. Shared API Overview

These APIs are shared across both the Customer Website and the Admin Dashboard.

They support infrastructure services, payment processing, shipping calculations, notifications, uploads, and system integrations.

All shared APIs must remain framework-agnostic and reusable.

---

# 56. Payment APIs

Base Route

```text id="p8j2na"
/api/v1/payments
```

Endpoints

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| POST   | /initialize        | Initialize payment        |
| POST   | /verify            | Verify payment            |
| GET    | /methods           | Available payment methods |
| GET    | /status/:reference | Payment status            |

Supported payment methods:

* Paystack
* Bank Transfer
* Cash on Delivery

Rules:

* Payment amounts must always be calculated on the server.
* The client must never submit the final payable amount as the source of truth.
* Every successful verification must update the corresponding order.

---

# 57. Payment Webhooks

Base Route

```text id="98h1fs"
/api/v1/webhooks
```

Endpoints

| Method | Endpoint  |
| ------ | --------- |
| POST   | /paystack |

Webhook Rules

* Verify webhook signature.
* Reject invalid requests.
* Prevent duplicate processing (idempotency).
* Log webhook events.
* Update payment status.
* Update order status.
* Trigger notifications.

Webhook endpoints must not require frontend authentication.

---

# 58. Shipping APIs

Base Route

```text id="5z2mvr"
/api/v1/shipping
```

Endpoints

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /states          |
| GET    | /cities          |
| POST   | /estimate        |
| GET    | /pickup-stations |
| POST   | /schedule        |

Shipping calculation supports:

* State
* Product weight
* Product category
* Free shipping threshold (when configured)

International Shipping

* Shipping cost is calculated manually by the administrator after the order is placed.
* International customers receive confirmation before final shipping charges are collected.

---

# 59. File Upload APIs

Base Route

```text id="m4g7xq"
/api/v1/uploads
```

Endpoints

| Method | Endpoint   |
| ------ | ---------- |
| POST   | /images    |
| POST   | /documents |
| DELETE | /:id       |

Supported uploads include:

* Product images
* Brand logos
* Homepage banners
* Customer avatars
* Invoice files
* Warranty documents

Files must be stored in Supabase Storage.

---

# 60. Search APIs

Base Route

```text id="t9r3kd"
/api/v1/search
```

Endpoints

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /products    |
| GET    | /suggestions |

Search features:

* Keyword search
* Brand filtering
* Category filtering
* Product suggestions

Search should be optimized for speed and relevance.

---

# 61. Public CMS APIs

Base Route

```text id="x7f6be"
/api/v1/content
```

Endpoints

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /homepage            |
| GET    | /pages/:slug         |
| GET    | /banners             |
| GET    | /featured-products   |
| GET    | /featured-categories |

Only published content should be returned.

---

# 62. Health Check APIs

Base Route

```text id="y1n8pw"
/api/v1/system
```

Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET    | /health  |
| GET    | /version |

These endpoints support deployment monitoring and diagnostics.

Sensitive implementation details should not be exposed publicly.

---

# 63. API Performance Standards

Every endpoint should be designed with performance in mind.

Guidelines:

* Paginate large datasets.
* Avoid unnecessary database queries.
* Select only required fields.
* Use efficient indexes.
* Cache safe, frequently requested data where appropriate.
* Batch related database operations when possible.

Performance optimization must not compromise correctness.

---

# 64. API Documentation Standards

Every endpoint should include documentation covering:

* Purpose
* Route
* HTTP method
* Authentication requirements
* Request schema
* Response schema
* Validation rules
* Error responses
* Business rules

API documentation should evolve alongside the implementation.

---

# 65. API Testing Requirements

Each endpoint should be tested for:

* Successful requests
* Validation failures
* Authentication failures
* Authorization failures
* Business rule violations
* Edge cases
* Performance under expected load

Regression testing should accompany changes to existing endpoints.

---

# 66. API Logging

The backend should log important operational events.

Examples:

* Payment initialization
* Payment verification
* Failed requests
* Validation failures
* Authentication failures
* Webhook processing
* File uploads

Logs should support troubleshooting without exposing sensitive information.

---

# 67. API Acceptance Criteria

The API implementation is considered complete when:

* Every documented endpoint exists.
* Responses follow the standard response format.
* Authentication and authorization are consistently enforced.
* Validation occurs before business logic.
* Resource ownership is verified.
* Payment workflows are secure.
* Webhooks are idempotent.
* Uploads are validated and securely stored.
* Performance expectations are met.
* Documentation and tests remain aligned with the implementation.

---

# 68. AntiGravity Execution Instructions

Before implementing or modifying shared APIs, integrations, or infrastructure services, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read `04_AUTHENTICATION_AND_SECURITY.md`.
* Read the complete `05_API_SPECIFICATION.md`.
* Analyze existing route handlers, controllers, services, repositories, middleware, integrations, and infrastructure components before making changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for backend architecture, REST APIs, webhook handling, payment integration, Supabase Storage, validation, performance optimization, testing, and documentation.
* Ensure all shared APIs remain reusable across the Customer Website and Admin Dashboard while preserving security, consistency, and maintainability.
* Verify compliance with documented business rules, response formats, and architectural principles before considering the implementation complete.

---

# 69. Definition of Success

The API layer is considered successful when:

* It serves as the single source of truth for all business logic.
* Customer Website and Admin Dashboard communicate exclusively through documented APIs.
* Endpoints are consistent, secure, and versioned.
* Business rules are enforced server-side.
* Payment and shipping integrations are reliable.
* Shared services are reusable and modular.
* APIs are well-documented, thoroughly tested, and performant.
* The implementation remains fully aligned with the Product Requirements Document, System Architecture, Database Design, Authentication & Security specification, and all documented architectural standards.
