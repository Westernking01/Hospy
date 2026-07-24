# 02_SYSTEM_ARCHITECTURE.md

# Part 1 — High-Level System Architecture

---

# 1. Purpose

This document defines the overall software architecture of the HOPSY PLAZA Electronics E-Commerce Platform.

It establishes the architectural principles, system boundaries, communication patterns, deployment topology, shared services, and engineering standards that guide every implementation decision.

The architecture prioritizes:

* Scalability
* Maintainability
* Performance
* Security
* Separation of Concerns
* Developer Experience
* Long-term Growth

---

# 2. Architectural Philosophy

The platform shall be designed using modern enterprise architecture principles.

Core principles:

* Separation of responsibilities.
* Clear application boundaries.
* Shared business logic.
* Modular development.
* Feature isolation.
* Strong typing.
* Predictable data flow.
* Low coupling.
* High cohesion.

Every architectural decision should improve long-term maintainability rather than simply solving immediate problems.

---

# 3. System Overview

The platform consists of **two independently deployed frontend applications** and a set of **shared packages** orchestrated within a **Turborepo monorepo**.

Customer Website (`apps/storefront`)

↓

Shared Backend Packages (`packages/*`)

↓

Supabase Database

↑

Shared Backend Packages (`packages/*`)

↑

Admin Dashboard (`apps/admin`)

Both frontend applications remain independent while sharing backend functionality via monorepo packages:

* Authentication
* Database
* Storage
* APIs
* Business Rules

This architecture allows both applications to evolve independently without duplicating backend functionality.

---

# 4. Application Landscape

The complete solution consists of the following systems:

## Customer Website

Purpose

Customer shopping experience.

Primary Responsibilities

* Product discovery
* Shopping
* Checkout
* Customer account
* Wishlist
* Orders
* Reviews
* Live chat
* Marketing pages

Deployment

Separate Vercel project.

---

## Admin Dashboard

Purpose

Business operations.

Primary Responsibilities

* Products
* Inventory
* Orders
* Customers
* Promotions
* CMS
* Reports
* Analytics
* Settings

Deployment

Separate Vercel project.

---

## Shared Packages (`packages/*`)

Purpose

Centralized business logic, UI components, and infrastructure integration.

Responsibilities

* Authentication & Authorization (`@hopsy/commerce` / Supabase)
* Database access (`@hopsy/database`)
* Business rules (`@hopsy/commerce`)
* Shared UI (`@hopsy/ui`)
* Validation logic (`@hopsy/validation`)
* Common Utilities (`@hopsy/utils`)

The shared packages represent the single source of truth for all shared logic.

---

## Shared Database

Technology

Supabase PostgreSQL

Responsibilities

* Persistent storage
* Data integrity
* Relationships
* Transactions

---

## Shared Storage

Technology

Supabase Storage

Stores:

* Product images
* Brand logos
* Homepage banners
* CMS media
* Generated invoices
* Email assets

---

# 5. Deployment Topology

Customer Website

↓

Vercel

↓

Shared Backend

↓

Supabase

↑

Admin Dashboard

↓

Vercel

The two frontend applications never communicate directly with one another.

All shared functionality passes through the backend.

---

# 6. High-Level Responsibilities

## Customer Website

Responsible for:

Presentation

User interactions

Shopping experience

SEO

Responsive design

Accessibility

---

## Admin Dashboard

Responsible for:

Business operations

Administrative workflows

Reporting

Content management

Inventory operations

---

## Backend

Responsible for:

Business rules

Authorization

Validation

Payments

Database operations

Notifications

Inventory

Reporting

File management

Security

---

## Database

Responsible for:

Persistent storage

Relationships

Transactions

Constraints

Indexes

Integrity

---

# 7. Technology Stack

Frontend

* Next.js
* TypeScript
* Tailwind CSS

Backend

* Next.js App Router
* Prisma ORM

Authentication

* Supabase Auth

Database

* Supabase PostgreSQL

Storage

* Supabase Storage

Payments

* Paystack

Email

* Resend

Deployment

* Vercel

---

# 8. Architectural Principles

Every implementation should respect:

Single Responsibility

Each module has one primary responsibility.

Separation of Concerns

UI should not contain business logic.

Business logic should not contain presentation concerns.

Database logic should remain isolated.

Dependency Direction

Higher-level modules should not depend directly on implementation details.

Consistency

Patterns should remain consistent across the project.

Reusability

Prefer shared components and utilities over duplication.

---

# 9. Shared Services

The following services should be shared across both applications:

Authentication

Authorization

Products

Categories

Brands

Inventory

Orders

Payments

Notifications

CMS

Reports

Search

Settings

These services should expose consistent interfaces regardless of the consuming application.

---

# 10. Shared Design Language

Although deployed separately, both applications must share:

Typography

Spacing system

Color tokens

Button styles

Input styles

Dialog styles

Table styles

Icons

Animations

Feedback components

The customer website and admin dashboard should feel like parts of the same product ecosystem while serving different audiences.

---

# 11. Communication Model

The customer website and admin dashboard must never communicate directly.

Communication occurs through the shared backend using secure APIs.

This prevents:

* Business logic duplication.
* Data inconsistency.
* Divergent validation.
* Security gaps.

---

# 12. Error Handling Philosophy

Failures should be:

Predictable

Recoverable

Informative

Secure

Users should receive helpful feedback without exposing internal implementation details.

---

# 13. Security Philosophy

Security is integrated into every architectural layer.

Examples include:

Authentication

Authorization

Validation

Database integrity

Session management

Audit history

Rate limiting

CSRF protection

Sensitive data isolation

Security is not treated as an afterthought.

---

# 14. Architectural Constraints

The project intentionally avoids:

Monolithic frontend logic

Business logic inside UI components

Direct database access from presentation layers

Duplicated business rules

Hardcoded configuration

Unstructured folders

Unnecessary abstractions

Architecture should remain simple, scalable, and understandable.

---

# 15. AntiGravity Execution Instructions

Before implementing any architectural change, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `15_ANTIGRAVITY_GLOBAL_RULES.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read this architecture document.
* Analyze the existing project structure before proposing changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate architecture-related skill or combination of skills for the current task.
* Preserve the documented separation between the customer website, admin dashboard, shared backend, and shared infrastructure.
* Avoid introducing architectural inconsistencies or unnecessary complexity.
* Ensure every architectural decision supports maintainability, scalability, security, and long-term evolution.
* Perform a complete architectural self-review before completing the task.
# 02_SYSTEM_ARCHITECTURE.md

# Part 2 — Backend Architecture

---

# 16. Backend Philosophy

The backend is the single source of truth for business logic.

Neither the Customer Website nor the Admin Dashboard should contain business rules that belong on the server.

The backend is responsible for:

* Business logic
* Validation
* Authentication
* Authorization
* Database access
* Payment processing
* Inventory management
* Notifications
* Reporting
* Audit logging

---

# 17. Architectural Style

The backend shall follow a **feature-first modular architecture** with clear separation of responsibilities.

Every feature owns its complete implementation while adhering to a shared architectural pattern.

Recommended request flow:

```text
HTTP Request
      ↓
Middleware
      ↓
Route Handler
      ↓
Controller
      ↓
Service
      ↓
Repository
      ↓
Prisma ORM
      ↓
Supabase PostgreSQL
```

Each layer has a single responsibility.

---

# 18. Layer Responsibilities

## Middleware

Responsible for:

* Authentication
* Authorization
* Session validation
* Rate limiting
* Request logging
* Security checks

Middleware must not contain business logic.

---

## Route Handlers

Responsible for:

* Mapping HTTP endpoints.
* Calling controllers.
* Returning HTTP responses.

Routes should remain thin.

---

## Controllers

Controllers should:

* Receive validated requests.
* Call services.
* Return formatted responses.

Controllers should not directly query the database.

---

## Services

Services contain business rules.

Examples:

* Product pricing
* Coupon validation
* Checkout
* Inventory deduction
* Shipping calculation
* Payment verification

Most backend logic belongs here.

---

## Repositories

Repositories isolate database access.

Responsibilities:

* Read data.
* Write data.
* Transactions.
* Query optimization.

Only repositories communicate with Prisma.

---

## Database

The database stores persistent business data.

Business rules should never depend solely on database constraints.

---

# 19. Feature Modules

Each feature should be self-contained.

Examples:

```text
src/

modules/

products/

categories/

brands/

inventory/

orders/

payments/

customers/

reviews/

wishlist/

compare/

search/

coupons/

promotions/

cms/

reports/

analytics/

chat/

notifications/

settings/

authentication/
```

Each module owns:

* Routes
* Controller
* Service
* Repository
* Validation
* Types
* Utilities
* Tests (if applicable)

Avoid mixing unrelated features.

---

# 20. Shared Modules

Some functionality should be shared across all features.

Examples:

```text
shared/

config/

constants/

database/

errors/

middleware/

responses/

validation/

utils/

types/

services/

security/
```

Shared modules should remain framework-agnostic whenever practical.

---

# 21. Validation Strategy

Every incoming request must be validated before reaching business logic.

Validation includes:

* Required fields.
* Data types.
* Value ranges.
* String lengths.
* Enum values.
* File validation.
* Business constraints.

Never trust client-side validation.

---

# 22. Error Handling

Errors should be:

* Consistent
* Predictable
* Actionable
* Secure

The API should never expose:

* Database errors
* Stack traces
* Internal implementation details
* Sensitive configuration

Standardized error responses should be used throughout the application.

---

# 23. Transactions

Database transactions should be used for operations affecting multiple related records.

Examples:

* Checkout
* Payment confirmation
* Inventory updates
* Order creation
* Refund processing

Transactions must maintain data integrity.

---

# 24. File Management

Uploaded files should be stored in Supabase Storage.

Examples:

* Product images
* Brand logos
* Homepage banners
* CMS assets
* Generated invoices

The backend stores only references to files, not the files themselves.

---

# 25. Payment Architecture

Payment processing should be isolated within dedicated services.

Supported methods:

* Paystack
* Bank Transfer
* Cash on Delivery

Responsibilities include:

* Payment initiation.
* Verification.
* Webhook processing.
* Transaction recording.
* Order updates.
* Failure recovery.

Payment providers should remain replaceable through abstraction.

---

# 26. Notification Architecture

Notifications should be handled through dedicated services.

Supported channels:

* Email
* SMS
* In-app notifications

Business logic should request notifications rather than sending them directly.

This separation improves maintainability.

---

# 27. Inventory Architecture

Inventory operations should be centralized.

Responsibilities include:

* Stock deduction.
* Stock reservation.
* Restocking.
* Low-stock detection.
* Inventory movement history.
* SKU validation.

Inventory should never be modified directly by unrelated modules.

---

# 28. Search Architecture

Search should operate through a dedicated search service.

Capabilities:

* Product search.
* Brand search.
* Category search.
* SKU search.

Future improvements should be possible without affecting other modules.

---

# 29. Logging & Audit

Operational events should be recorded where appropriate.

Examples:

* Product updates.
* Inventory changes.
* Order status changes.
* Login events.
* Administrative actions.
* Payment events.

Logs should assist troubleshooting while protecting sensitive information.

---

# 30. API Versioning

The backend should be designed so that future API versioning can be introduced without major restructuring.

Current version:

Version 1

Future versions should coexist when necessary.

---

# 31. Security Boundaries

The backend enforces:

* Authentication.
* Authorization.
* Permission checks.
* Input validation.
* Output sanitization.
* Rate limiting.
* CSRF protection.

No frontend application should bypass backend security rules.

---

# 32. Performance Considerations

The backend should minimize:

* Duplicate queries.
* N+1 query patterns.
* Large payloads.
* Blocking operations.
* Redundant validation.

Use pagination, selective field retrieval, and efficient database access where appropriate.

---

# 33. AntiGravity Execution Instructions

Before implementing any backend feature, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `15_ANTIGRAVITY_GLOBAL_RULES.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read this backend architecture section.
* Inspect the existing backend implementation and preserve established patterns.
* Thoroughly inspect every available AntiGravity skill before beginning work.
* Select the most suitable combination of backend-related skills (such as architecture, database, API design, security, validation, performance, or testing) for the specific task.
* Ensure new modules conform to the documented layered architecture and feature-based organization.
* Reuse existing shared modules whenever appropriate instead of introducing duplicate logic.
* Validate that the completed implementation satisfies performance, security, maintainability, and consistency requirements before marking the task as complete.
# 02_SYSTEM_ARCHITECTURE.md

# Part 3 — Frontend Architecture

---

# 34. Frontend Philosophy

The frontend is responsible for presenting information, managing user interactions, and providing an exceptional user experience.

Business rules must remain on the backend whenever possible.

The frontend should focus on:

* User Experience
* Accessibility
* Performance
* Responsiveness
* State Management
* Client-side Validation
* Presentation Logic

The frontend should never become the source of truth for business operations.

---

# 35. Independent Frontend Applications

The project consists of two completely separate frontend applications.

## Customer Website

Purpose:

Provide customers with a premium shopping experience.

Deployment:

Independent Vercel Project

Responsibilities:

* Shopping
* Product browsing
* Search
* Checkout
* Authentication
* Customer dashboard
* Orders
* Wishlist
* Reviews
* Live Chat

---

## Admin Dashboard

Purpose:

Provide administrators with an efficient business management interface.

Deployment:

Independent Vercel Project

Responsibilities:

* Product Management
* Inventory
* Orders
* Reports
* CMS
* Analytics
* Customers
* Promotions
* Settings

Although visually related, both applications should evolve independently.

---

# 36. Feature-Based Frontend Structure

The frontend should follow a feature-first architecture.

Recommended structure:

```text
src/
├── app/
├── modules/
├── components/
├── shared/
├── hooks/
├── lib/
├── services/
├── styles/
├── types/
├── utils/
└── config/
```

Each feature owns its pages, components, hooks, types, and business-specific utilities.

Avoid organizing the application primarily by file type.

---

# 37. Shared Component System

Reusable UI components should live in a shared component library.

Examples include:

Navigation

Buttons

Inputs

Cards

Tables

Modals

Dialogs

Drawers

Dropdowns

Pagination

Breadcrumbs

Badges

Alerts

Tooltips

Tabs

Accordions

Forms

Every shared component should be:

* Reusable
* Accessible
* Responsive
* Theme-aware
* Well documented

---

# 38. Design Token System

The design system should define reusable tokens for:

Colors

Typography

Spacing

Border Radius

Shadows

Opacity

Transitions

Animations

Breakpoints

Z-index

Never hardcode design values throughout the application.

---

# 39. State Management

Use the simplest solution that satisfies the requirement.

Recommended strategy:

Local State

* Component UI

Context

* Authentication
* Theme
* Global Preferences

Server State

* Product Data
* Orders
* Inventory
* CMS
* Reports

Avoid unnecessary global state.

---

# 40. Routing Strategy

Use the Next.js App Router.

Routes should be:

* Predictable
* Nested where appropriate
* SEO-friendly
* Easy to maintain

Protected routes must enforce authentication and authorization.

---

# 41. Forms

Forms should:

* Validate before submission.
* Display inline validation errors.
* Preserve entered data during validation failures.
* Prevent duplicate submissions.
* Provide loading feedback.
* Clearly communicate success and failure.

Every form should provide an excellent user experience.

---

# 42. Data Fetching

Data fetching should prioritize:

* Performance
* Predictability
* Caching
* Error recovery

Avoid unnecessary network requests.

Implement loading, error, and empty states for every asynchronous operation.

---

# 43. Image Strategy

Images should be optimized.

Examples:

Product Images

Brand Logos

Category Images

CMS Banners

Use responsive image loading and appropriate optimization techniques.

Avoid oversized assets.

---

# 44. Responsive Design

The project follows a mobile-first strategy.

Every interface should adapt gracefully to:

Mobile

Tablet

Laptop

Desktop

Large Desktop

Responsive behavior should be designed, not patched later.

---

# 45. Animation Philosophy

Animations should communicate state and improve usability.

Animations should be:

* Subtle
* Fast
* Purposeful
* Consistent

Examples:

Hover states

Page transitions

Modal transitions

Drawer transitions

Loading indicators

Accordion expansion

Dropdown menus

Avoid decorative animation.

Never animate merely for visual effect.

---

# 46. Accessibility

Every interface should support:

Keyboard navigation

Screen readers

Logical tab order

Visible focus indicators

Accessible labels

Semantic HTML

Accessible error messages

Accessibility should be considered during implementation rather than added afterward.

---

# 47. Error Experience

Every page should gracefully handle:

Loading

Empty

Error

Offline

Unauthorized

Not Found

Server Failure

Users should always understand what happened and how to proceed.

---

# 48. Performance

Optimize:

Rendering

Bundle Size

Images

Fonts

Network Requests

Lazy Loading

Code Splitting

Avoid unnecessary re-renders.

Performance should remain a continuous consideration throughout development.

---

# 49. SEO Strategy

Customer Website

Must support:

* Metadata
* Structured Data
* Open Graph
* Sitemap
* Robots.txt
* Canonical URLs
* Semantic HTML

Admin Dashboard

Must not be indexed by search engines.

---

# 50. Design Consistency

Before creating:

A page

A component

A layout

A pattern

Always inspect the existing application.

Reuse established patterns whenever appropriate.

Consistency is preferred over novelty.

---

# 51. Anti-AI Design Requirements

The user experience must never resemble a generic AI-generated application.

Prohibited patterns include:

* Generic SaaS dashboards
* Giant hero sections
* Floating statistic cards
* Decorative stickers
* Cartoon illustrations
* Neon gradients
* Glassmorphism
* Random glowing borders
* Floating "live" indicators
* Repetitive card grids
* Generic Tailwind templates
* Excessive empty whitespace
* Decorative visual effects without purpose

The interface should instead reflect the craftsmanship of a professional product design team.

---

# 52. AntiGravity Execution Instructions

Before implementing any frontend feature, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `15_ANTIGRAVITY_GLOBAL_RULES.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read this frontend architecture section.
* Analyze the existing frontend codebase to understand established layouts, components, patterns, and styling conventions.
* Thoroughly inspect all available AntiGravity skills and select only the skill or combination of skills best suited to the task (for example, frontend architecture, UI design, UX design, accessibility, animation, performance, SEO, or testing).
* Review the relevant inspiration materials in `assets/references/` before making design decisions, using them for quality and direction without copying layouts, branding, or proprietary visual elements.
* Reuse existing components and design tokens whenever possible to maintain consistency.
* Verify responsiveness, accessibility, performance, and visual consistency before considering the implementation complete.
# 02_SYSTEM_ARCHITECTURE.md

# Part 4 — Data Flow, Integrations & Scalability

---

# 53. Purpose

This section defines how information moves throughout the HOPSY PLAZA Electronics E-Commerce Platform, how external services integrate with the platform, and how the system is expected to scale while maintaining reliability, security, and performance.

---

# 54. High-Level Data Flow

The Customer Website and Admin Dashboard never communicate directly.

Every interaction flows through the shared backend.

```text
Customer Website
        │
        ▼
Shared Backend APIs
        │
        ▼
Business Logic Layer
        │
        ▼
Prisma ORM
        │
        ▼
Supabase PostgreSQL
```

```text
Admin Dashboard
        │
        ▼
Shared Backend APIs
        │
        ▼
Business Logic Layer
        │
        ▼
Prisma ORM
        │
        ▼
Supabase PostgreSQL
```

This architecture ensures:

* Single source of truth.
* Consistent validation.
* Shared business rules.
* Unified security.
* Simplified maintenance.

---

# 55. Authentication Flow

Authentication responsibilities are divided between Supabase Auth and the backend.

Authentication flow:

```text
User
   │
   ▼
Supabase Authentication
   │
   ▼
Access Token
   │
   ▼
Backend Validation
   │
   ▼
Protected Resources
```

Authentication responsibilities:

Supabase

* Identity verification
* Session issuance
* Password management
* OAuth providers
* OTP authentication

Backend

* Authorization
* Permission checks
* Business access validation
* Audit logging
* Device history

---

# 56. Customer Shopping Flow

Typical customer journey:

```text
Homepage

↓

Browse Products

↓

Search / Filter

↓

Product Details

↓

Add to Cart

↓

Checkout

↓

Payment

↓

Order Creation

↓

Inventory Update

↓

Confirmation Email

↓

Customer Dashboard
```

Every stage should preserve data integrity and provide clear user feedback.

---

# 57. Checkout Flow

Checkout process:

```text
Cart

↓

Validate Products

↓

Validate Inventory

↓

Validate Coupon

↓

Calculate Shipping

↓

Calculate Tax

↓

Select Payment

↓

Process Payment

↓

Create Order

↓

Reserve Inventory

↓

Send Notifications

↓

Display Success
```

If any validation fails, the transaction should terminate safely without creating inconsistent records.

---

# 58. Payment Flow

Supported payment methods:

* Paystack
* Bank Transfer
* Cash on Delivery

Payment lifecycle:

```text
Customer

↓

Payment Provider

↓

Webhook

↓

Backend Verification

↓

Database Update

↓

Order Status Update

↓

Inventory Confirmation

↓

Email Notification
```

The backend must never trust payment status received from the client.

Webhook verification is mandatory.

---

# 59. Inventory Flow

Inventory updates occur only through backend services.

Examples:

```text
Order Created

↓

Reserve Stock

↓

Payment Confirmed

↓

Deduct Inventory

↓

Record Inventory Movement

↓

Update Product Availability
```

Restocking:

```text
Inventory Staff

↓

Stock Update

↓

Movement History

↓

Available Stock Updated

↓

Low Stock Rules Recalculated
```

All inventory changes must be auditable.

---

# 60. CMS Publishing Flow

Administrative updates should propagate without code deployment.

Example:

```text
Admin

↓

CMS Module

↓

Backend Validation

↓

Database Update

↓

Customer Website Fetch

↓

Updated Content Visible
```

This applies to:

* Homepage banners
* Promotional sections
* Featured products
* Categories
* Company information
* Marketing pages

---

# 61. Notification Flow

Notification requests should pass through a centralized notification service.

```text
Business Event

↓

Notification Service

↓

Email

SMS

In-App Notification
```

Examples of business events:

* Welcome
* Email verification
* Order confirmation
* Payment received
* Shipping update
* Password reset
* Refund confirmation

Business modules request notifications but do not send them directly.

---

# 62. File Upload Flow

Uploaded assets:

* Product images
* Brand logos
* Homepage banners
* CMS media

Flow:

```text
Admin

↓

Upload Request

↓

Backend Validation

↓

Supabase Storage

↓

Database Reference Saved

↓

Frontend Displays Asset
```

The database stores metadata and file references only.

---

# 63. Reporting Flow

Reports are generated from operational data.

```text
Database

↓

Aggregation

↓

Report Service

↓

PDF

Excel

CSV

↓

Administrator Download
```

Reports should support filtering by date range and relevant business dimensions.

---

# 64. External Integrations

The platform integrates with:

Supabase

Purpose:

* Authentication
* Database
* Storage

Paystack

Purpose:

* Online payments

Resend

Purpose:

* Transactional emails

Each integration should be isolated behind service abstractions to simplify maintenance and future replacement if required.

---

# 65. Caching Strategy

Caching should improve performance without compromising data accuracy.

Recommended approach:

Static Content

* Long-lived caching where appropriate.

Product Listings

* Short-term caching with invalidation after relevant updates.

CMS Content

* Refresh when content changes.

Authenticated Data

* Never cache sensitive user information in shared caches.

Caching behavior should always respect business correctness.

---

# 66. Scalability Strategy

The architecture should support future growth without fundamental redesign.

Areas expected to scale include:

* Product catalog size.
* Customer accounts.
* Orders.
* Images.
* Inventory history.
* Reports.
* Notifications.
* Traffic volume.

Scalability should be achieved through modular architecture, efficient database design, and optimized backend services.

---

# 67. Fault Tolerance

Failures should not leave the platform in an inconsistent state.

Critical operations should prioritize:

* Database transactions.
* Safe retries where appropriate.
* Graceful error handling.
* User feedback.
* Audit logging.

---

# 68. Monitoring & Observability

Operational visibility should include:

* API errors.
* Payment events.
* Inventory events.
* Authentication events.
* Administrative actions.
* Order lifecycle.
* Background job failures.

Monitoring should support troubleshooting without exposing sensitive information.

---

# 69. Disaster Recovery

The architecture should assume that failures are possible.

Important considerations include:

* Database backups.
* Storage redundancy.
* Environment variable management.
* Recovery procedures.
* Transaction integrity.
* Rollback capability.

Operational documentation should describe recovery processes.

---

# 70. Architectural Decision Records (ADR)

Major architectural decisions should be documented separately.

Examples:

* Authentication strategy.
* Database technology.
* Payment provider.
* Frontend architecture.
* Module organization.
* Deployment strategy.

Each ADR should record:

* Context.
* Decision.
* Alternatives considered.
* Trade-offs.
* Consequences.

---

# 71. AntiGravity Execution Instructions

Before implementing any integration, infrastructure, or architectural feature, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `15_ANTIGRAVITY_GLOBAL_RULES.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read all sections of `02_SYSTEM_ARCHITECTURE.md`.
* Analyze the existing implementation and ensure proposed changes remain consistent with the documented architecture.
* Thoroughly inspect every available AntiGravity skill before beginning work.
* Select only the skill or combination of skills most appropriate for the task (for example, architecture, backend, infrastructure, security, database, performance, or testing).
* Preserve the documented request flows, integration boundaries, and separation of responsibilities.
* Validate that new integrations do not introduce unnecessary coupling, duplicate business logic, or weaken security.
* Perform a comprehensive architectural review before considering the task complete.

---

# 72. Architecture Definition of Success

The architecture is considered successful when:

* Customer Website and Admin Dashboard remain independently deployable.
* Shared backend services remain the single source of truth.
* Business rules are implemented once and reused consistently.
* Integrations are isolated behind maintainable abstractions.
* Data flows are predictable and secure.
* The platform scales without requiring major architectural changes.
* The codebase remains understandable for both human developers and AntiGravity.
* Every implementation aligns with the documented architecture, design system, and product requirements.
