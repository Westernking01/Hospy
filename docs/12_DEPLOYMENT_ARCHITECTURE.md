# 12_DEPLOYMENT_ARCHITECTURE.md

# Part 1 — Infrastructure, Application Topology & Deployment Strategy

---

# 1. Purpose

This document defines the production deployment architecture for the HOPSY PLAZA platform.

It specifies how the applications, backend services, database, authentication, storage, and external integrations are deployed and communicate in production.

The deployment architecture prioritizes:

* Reliability
* Security
* Scalability
* Performance
* Maintainability
* Production readiness

---

# 2. Deployment Philosophy

The HOPSY PLAZA platform consists of multiple independent applications sharing a common backend infrastructure.

Each application should be deployable independently without affecting the others.

Deployment should support:

* Zero-downtime updates where practical
* Independent scaling
* Environment isolation
* Secure communication
* Continuous deployment

---

# 3. Application Topology

The platform consists of two independent frontend applications.

```text
Customer Website
        │
        │ HTTPS
        ▼
Backend API
        │
        ├───────────────► Supabase Database
        │
        ├───────────────► Supabase Auth
        │
        ├───────────────► Supabase Storage
        │
        ├───────────────► Paystack
        │
        └───────────────► Resend
        ▲
        │ HTTPS
Admin Dashboard
```

Both applications communicate with the same backend services.

---

# 4. Deployment Units

## Customer Website

Purpose:

* Customer shopping experience

Technology:

* Next.js
* TypeScript
* Tailwind CSS

Deployment:

* Independent Vercel Project

---

## Admin Dashboard

Purpose:

* Store management

Technology:

* Next.js
* TypeScript
* Tailwind CSS

Deployment:

* Separate Vercel Project

---

## Backend

Purpose:

* Business Logic
* APIs
* Authentication
* Payments
* Inventory
* Notifications

Technology:

* Next.js API Routes
* Prisma ORM

Deployment:

* Shared with the Admin Dashboard project or deployed independently if future scaling requires separation.

The architecture should not prevent extraction into a standalone backend service later.

---

# 5. Deployment Domains

Example production structure:

```text
Customer Website

https://www.hopsyplaza.com

--------------------------------

Admin Dashboard

https://admin.hopsyplaza.com
```

Development and staging environments should use separate deployment URLs.

---

# 6. Environment Separation

The platform should support:

Development

↓

Testing

↓

Staging

↓

Production

Each environment should have:

* Separate environment variables
* Separate authentication configuration
* Separate database configuration where appropriate

Environment isolation prevents accidental production changes.

---

# 7. Supabase Architecture

Supabase provides:

* Authentication
* PostgreSQL Database
* Storage

Responsibilities:

Authentication

* Customer Accounts
* Administrator Authentication

Database

* Business Data
* Orders
* Products
* Inventory

Storage

* Product Images
* Brand Logos
* CMS Assets

---

# 8. Database Deployment

Production database:

Supabase PostgreSQL

Managed through:

* Prisma ORM
* Prisma Migrations

Rules:

* Schema changes use migrations only.
* Manual production schema edits should be avoided.
* Backups should be enabled.

---

# 9. File Storage

All uploaded assets should use Supabase Storage.

Supported assets:

* Product Images
* Category Images
* Brand Logos
* Homepage Banners
* CMS Media

Uploads should never be stored inside the application repository.

---

# 10. Authentication Deployment

Authentication is managed by Supabase Auth.

Supported methods:

* Email/Password
* Google
* Email OTP
* Phone OTP

Authentication secrets remain server-side.

---

# 11. Payment Infrastructure

Payment providers:

* Paystack
* Bank Transfer
* Cash on Delivery

Webhook endpoints must be protected.

Payment verification always occurs on the backend.

---

# 12. Email Infrastructure

Provider:

* Resend

Responsibilities:

* Customer Emails
* Administrative Emails
* Verification
* Password Reset
* Order Notifications

Email secrets must remain private.

---

# 13. Environment Variables

Sensitive configuration should include:

* Supabase Keys
* Database URL
* Prisma Configuration
* Paystack Secret
* Resend API Key
* Authentication Secrets

Rules:

* Never expose server secrets to the client.
* Store secrets using Vercel environment variables.
* Rotate secrets when necessary.

---

# 14. Deployment Pipeline

Recommended workflow:

```text
Developer

↓

GitHub Repository

↓

Automatic Build

↓

Tests

↓

Deployment

↓

Health Check

↓

Production
```

Deployments should fail if critical checks do not pass.

---

# 15. AntiGravity Execution Instructions

Before configuring deployment, AntiGravity must:

* Read every completed project document from `00_PROJECT_MANIFEST.md` through `11_EMAIL_NOTIFICATION_SPECIFICATION.md`.
* Read the complete `12_DEPLOYMENT_ARCHITECTURE.md`.
* Thoroughly inspect every available AntiGravity skill and deliberately select the most appropriate skills for deployment architecture, cloud infrastructure, DevOps, Next.js deployment, Supabase integration, Vercel configuration, security hardening, environment management, and performance optimization.
* Configure the Customer Website and Admin Dashboard as independently deployable applications connected to the same backend infrastructure.
* Ensure environment isolation, secure secret management, and production-ready deployment practices throughout the platform.
* Validate deployment reliability and maintainability before implementation is considered complete.
# 12_DEPLOYMENT_ARCHITECTURE.md

# Part 2 — CI/CD, Monitoring, Security, Scaling & Production Operations

---

# 16. Continuous Integration

Every code change should pass an automated validation pipeline before deployment.

The pipeline should include:

* Dependency Installation
* Type Checking
* Linting
* Unit Tests
* Build Validation
* Environment Validation

A deployment must never proceed if any mandatory stage fails.

---

# 17. Continuous Deployment

Deployment should be triggered automatically from the primary production branch.

Recommended workflow:

```text id="q2x9ka"
Developer

↓

GitHub Pull Request

↓

Code Review

↓

Merge

↓

Automatic Build

↓

Deployment

↓

Production Verification
```

Production deployments should remain repeatable and predictable.

---

# 18. Health Monitoring

The platform should continuously monitor:

* API Availability
* Database Connectivity
* Authentication Services
* Storage Availability
* Payment Webhooks
* Email Delivery Services

Failures should generate administrator alerts.

---

# 19. Application Logging

The system should generate structured logs for:

* API Requests
* Authentication Events
* Payment Processing
* Inventory Changes
* Order Processing
* Background Jobs
* Notification Delivery
* System Errors

Logs should avoid exposing sensitive customer information.

---

# 20. Error Monitoring

Unexpected failures should be captured automatically.

Track:

* Runtime Errors
* API Failures
* Database Errors
* Payment Failures
* Background Job Failures

Critical issues should be visible to the administrator for investigation.

---

# 21. Database Backup Strategy

Production database backups should be:

* Automated
* Verified
* Securely Stored

Backups should support:

* Full Restoration
* Point-in-Time Recovery (where supported)

Backup procedures should be tested periodically.

---

# 22. Storage Backup

Important uploaded assets should be recoverable.

Protected assets include:

* Product Images
* Brand Logos
* CMS Media
* Category Images

Storage recovery procedures should be documented and tested.

---

# 23. Disaster Recovery

The deployment architecture should support recovery from:

* Database Failure
* Storage Failure
* Deployment Failure
* Infrastructure Failure

Recovery objectives should prioritize:

* Minimal Data Loss
* Minimal Downtime
* Safe Rollback Procedures

---

# 24. Security Hardening

Production deployments should enforce:

* HTTPS Everywhere
* Secure HTTP Headers
* CSRF Protection
* Rate Limiting
* Input Validation
* Output Encoding
* Secure Cookie Configuration
* Environment Secret Isolation

Security should be validated before every production release.

---

# 25. Performance Optimization

Production configuration should prioritize:

* Image Optimization
* Static Asset Caching
* API Response Optimization
* Lazy Loading
* Code Splitting
* Compression
* Efficient Database Queries

Performance optimizations must not alter business logic.

---

# 26. Scalability Strategy

The architecture should support future scaling for:

* Increased Product Catalog
* Higher Customer Traffic
* More Orders
* Additional Warehouses
* Additional Administrators
* Multiple Payment Providers

The current single-vendor implementation should not restrict future growth.

---

# 27. Maintenance Strategy

Routine maintenance should include:

* Dependency Updates
* Security Patch Installation
* Database Optimization
* Storage Cleanup
* Log Review
* Backup Verification

Maintenance operations should minimize customer disruption.

---

# 28. Rollback Strategy

Every deployment should support rollback.

Rollback should restore:

* Application Code
* Configuration
* Database Schema (through controlled migrations when appropriate)

Rollback procedures should be documented and tested.

---

# 29. Production Readiness Checklist

Before each production release, verify:

* Build succeeds
* Tests pass
* Environment variables are configured
* Database migrations are validated
* Payment integrations are operational
* Email delivery is functional
* Authentication is verified
* CMS is operational
* Monitoring is active
* Backup systems are functioning

No production deployment should proceed if critical checks fail.

---

# 30. Future Infrastructure Readiness

The deployment architecture should remain compatible with future enhancements such as:

* CDN Integration
* Multi-Region Deployment
* Queue Workers
* Dedicated Backend Services
* Multiple Warehouses
* Multiple Administrators
* Multi-Currency Support
* Multi-Language Support

These capabilities should be achievable without major architectural redesign.

---

# 31. AntiGravity Execution Instructions

Before finalizing deployment infrastructure, AntiGravity must:

* Read every completed project document from `00_PROJECT_MANIFEST.md` through `11_EMAIL_NOTIFICATION_SPECIFICATION.md`.
* Read the complete `12_DEPLOYMENT_ARCHITECTURE.md`.
* Thoroughly inspect every available AntiGravity skill and deliberately select the most suitable skills for cloud deployment, DevOps, infrastructure architecture, CI/CD, monitoring, security hardening, disaster recovery, scalability, and production optimization.
* Configure independent deployment pipelines for the Customer Website and Admin Dashboard while preserving a shared backend infrastructure.
* Ensure production environments are secure, observable, maintainable, and scalable.
* Validate deployment procedures, rollback capability, backup strategy, monitoring, and security controls before considering the infrastructure complete.

---

# 32. Deployment Acceptance Criteria

The deployment architecture is considered complete when:

* Customer Website and Admin Dashboard are deployed independently using separate URLs.
* Both applications communicate securely with the shared backend services.
* Environment isolation is fully implemented.
* Automated deployment pipelines validate builds before release.
* Monitoring, logging, and alerting are operational.
* Backup and recovery procedures are documented and tested.
* Security hardening is applied consistently across all environments.
* Performance optimizations are enabled.
* The infrastructure supports future platform growth without requiring major redesign.

---

# 33. Definition of Success

The HOPSY PLAZA deployment architecture is successful when both production applications operate independently yet seamlessly, providing customers and administrators with a secure, reliable, performant, and scalable experience.

The completed infrastructure should support continuous delivery, rapid recovery, long-term maintainability, and future expansion while remaining aligned with the overall enterprise architecture and development standards established throughout the project.
