# 04_AUTHENTICATION_AND_SECURITY.md

# Part 1 — Authentication, Authorization & Security Architecture

---

# 1. Purpose

This document defines the authentication, authorization, account protection, session management, and application security standards for the HOPSY PLAZA Electronics E-Commerce Platform.

It serves as the single source of truth for:

* Authentication
* Authorization
* Session Management
* RBAC
* API Security
* Customer Security
* Administrator Security
* Device Management
* Login History
* Rate Limiting
* Security Monitoring

Every authentication and security feature must comply with this document.

---

# 2. Security Philosophy

Security must be implemented as a core architectural concern rather than an afterthought.

The platform should follow these principles:

* Least Privilege
* Defense in Depth
* Zero Trust
* Secure by Default
* Principle of Minimum Exposure
* Fail Securely

Business convenience must never compromise security.

---

# 3. Authentication Provider

Authentication is handled by:

* Supabase Auth

Supported authentication methods:

* Email and Password
* Google OAuth
* Email One-Time Password (OTP)
* Phone One-Time Password (OTP)

Supabase remains responsible for:

* Identity verification
* Password hashing
* Password resets
* Session issuance
* OAuth authentication
* OTP verification

The backend remains responsible for authorization and business access control.

---

# 4. User Types

The platform supports two authenticated user types.

## Customer

Capabilities include:

* Register
* Login
* Manage Profile
* Place Orders
* Save Addresses
* Save Wishlist
* Track Orders
* Submit Reviews
* Access Live Chat

---

## Administrator

Capabilities include:

* Manage Products
* Manage Inventory
* Manage Orders
* Manage CMS
* Manage Promotions
* View Reports
* Configure Website
* Respond to Live Chat

Administrator accounts cannot be created through the public website.

---

# 5. Registration Rules

Customer registration supports:

* Email + Password
* Google OAuth
* Email OTP
* Phone OTP

Requirements:

* Unique email address.
* Valid phone number when provided.
* Email verification before accessing protected customer features (except where explicitly allowed).
* Customer profile creation immediately after successful authentication.

---

# 6. Login Rules

Users may authenticate using any supported method associated with their account.

After successful authentication:

* Session is established.
* Profile is loaded.
* Device history is recorded.
* Login history is recorded.
* Security checks are performed.
* Appropriate dashboard is displayed.

Failed authentication attempts should never reveal whether an account exists.

---

# 7. Email Verification

Customer email verification is required.

Verification is required for:

* Account activation
* Sensitive account changes where applicable

Until verification is complete:

* Shopping may be limited according to business rules.
* Protected customer features may be restricted.

Verification links must expire after a reasonable period.

---

# 8. Password Requirements

Passwords should satisfy modern security requirements.

Recommendations include:

* Minimum length requirements.
* Support for passphrases.
* Protection against commonly compromised passwords where feasible.

Passwords are never stored or processed directly by the application.

Supabase Auth is responsible for secure password storage.

---

# 9. Password Reset

Password reset flow:

```text id="pw0d7q"
Customer

↓

Request Reset

↓

Email Sent

↓

Secure Reset Link

↓

Create New Password

↓

Login
```

Reset links must:

* Expire automatically.
* Be single-use.
* Invalidate previous reset requests where appropriate.

---

# 10. Session Management

Supabase manages authentication sessions.

The application must additionally support:

* Active session validation.
* Session expiration handling.
* Session revocation.
* Secure logout.
* Automatic handling of invalid sessions.

Protected resources must always validate the active session before granting access.

---

# 11. Two-Factor Authentication (2FA)

The platform should support Two-Factor Authentication for administrators.

When enabled, login requires:

```text id="x6p3hj"
Password

↓

Second Verification Step

↓

Access Granted
```

2FA should be optional for customers and configurable through future enhancements.

---

# 12. Role-Based Access Control (RBAC)

Authorization is enforced by the backend.

Current administrative role:

* Admin

Administrative capabilities include:

* Product Management
* Inventory
* Orders
* Customers
* Reviews
* Coupons
* Promotions
* CMS
* Reports
* Website Settings

Customer permissions remain limited to their own resources.

Permission checks must always occur on the server.

---

# 13. Route Protection

Customer Website

Protected routes include:

* Dashboard
* Orders
* Wishlist
* Saved Addresses
* Profile
* Live Chat

Admin Dashboard

Every route requires:

* Valid authentication
* Administrator authorization

Unauthorized access must return appropriate HTTP responses without exposing implementation details.

---

# 14. Device History

Successful administrator logins should record:

* Device information
* Browser
* Operating System
* IP Address
* Login timestamp
* Logout timestamp (when available)

Customers may also have device history recorded to support security features.

---

# 15. Login History

Every successful authentication event should be recorded.

Recorded information includes:

* User
* Login time
* IP address
* Device
* Browser
* Authentication method
* Success status

These records assist security investigations and account monitoring.

---

# 16. AntiGravity Execution Instructions

Before implementing authentication or authorization features, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read this authentication and security document.
* Analyze the existing authentication flow, Supabase configuration, middleware, and protected routes before making changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for authentication, authorization, Supabase, backend security, middleware, validation, and testing.
* Ensure authentication remains centralized through Supabase Auth while business authorization remains enforced by the backend.
* Preserve secure defaults and avoid introducing authentication logic that bypasses documented security controls.
# 04_AUTHENTICATION_AND_SECURITY.md

# Part 2 — API Security, Session Protection & Application Security

---

# 17. API Security Principles

Every API endpoint must assume that incoming requests are untrusted.

The backend is responsible for verifying:

* Authentication
* Authorization
* Request validity
* Resource ownership
* Business permissions

Client-side validation is never considered sufficient.

---

# 18. Authentication Middleware

Every protected endpoint must pass through authentication middleware.

Responsibilities include:

* Validate Supabase access token
* Retrieve authenticated user
* Verify active account
* Verify session validity
* Attach authenticated user to the request context

Unauthenticated requests must be rejected before reaching business logic.

---

# 19. Authorization Middleware

Authentication only identifies the user.

Authorization determines whether the user may perform the requested action.

Authorization checks include:

Customer

* Access only their own resources

Administrator

* Full administrative access

Every authorization decision must occur on the backend.

---

# 20. Resource Ownership Validation

Customer resources include:

* Orders
* Addresses
* Wishlist
* Reviews
* Notifications
* Live Chat Conversations

Customers must never access resources belonging to another customer.

Ownership must always be verified server-side.

---

# 21. Session Validation

Before processing any authenticated request, the backend should verify:

* Session validity
* Token authenticity
* User existence
* Account status

Requests associated with expired or revoked sessions must be rejected immediately.

---

# 22. Logout Strategy

Logout should:

* Invalidate the active session.
* Remove client authentication data.
* Require authentication again for protected resources.

Logout should function consistently across supported authentication methods.

---

# 23. Account Status Validation

Protected requests should verify that the account is:

* Active
* Not suspended
* Not deleted
* Properly authenticated

Inactive accounts must not gain access to protected APIs.

---

# 24. Rate Limiting

Rate limiting should reduce abuse while maintaining a good user experience.

Examples of protected endpoints include:

Authentication

Password Reset

Email Verification

Checkout

Coupon Validation

Live Chat

Search

Rate limits should be configurable and enforced by middleware.

---

# 25. CSRF Protection

State-changing requests should be protected against Cross-Site Request Forgery.

Examples:

* Profile updates
* Checkout
* Password changes
* Address management
* CMS updates
* Product management

Security controls should follow the chosen authentication mechanism and deployment architecture.

---

# 26. Input Validation

Every request must be validated before reaching business logic.

Validation includes:

* Required fields
* Data types
* Length limits
* Numeric ranges
* Enum values
* File validation
* Business rules

Validation should occur consistently across all endpoints.

---

# 27. Output Sanitization

Responses should expose only information required by the client.

Never expose:

* Passwords
* Authentication secrets
* Internal database identifiers where unnecessary
* Service credentials
* Internal error details

Public APIs should minimize data exposure.

---

# 28. File Upload Security

Uploaded files must be validated.

Validation should include:

* Allowed file types
* Maximum file size
* File integrity checks
* Safe filenames

Executable or potentially dangerous file types must not be accepted.

Uploaded files should be stored in Supabase Storage rather than directly on the application server.

---

# 29. Secure Headers

The application should return appropriate HTTP security headers.

Examples include protections for:

* Content Security Policy
* Clickjacking
* MIME type sniffing
* Referrer handling
* HTTPS enforcement

Security headers should be applied consistently across production deployments.

---

# 30. CORS Policy

Cross-Origin Resource Sharing should allow only trusted origins.

Allowed origins include:

* Customer Website
* Admin Dashboard

Wildcard origins should not be used in production.

Development environments may use separate configuration.

---

# 31. Environment Variables

Sensitive configuration must remain outside the source code.

Examples include:

* Supabase Service Role Key
* Paystack Secret Key
* Resend API Key
* Database Connection Strings

Environment variables must never be committed to version control.

---

# 32. Secret Management

Application secrets should:

* Be stored securely.
* Be rotated when necessary.
* Never appear in logs.
* Never be exposed to frontend applications unless explicitly intended for public use.

Server-only secrets must remain accessible only within trusted backend environments.

---

# 33. Logging Strategy

Application logs should assist troubleshooting without exposing sensitive information.

Logs should never contain:

* Passwords
* Authentication tokens
* API secrets
* Payment credentials
* Personal financial information

Operational logs should balance observability with privacy.

---

# 34. Error Handling

Security-related errors should be intentionally generic.

Examples:

Instead of:

```text id="a9d3mq"
User does not exist.
```

Use:

```text id="m2y7tv"
Invalid credentials.
```

Similarly, avoid exposing internal implementation details in server responses.

---

# 35. AntiGravity Execution Instructions

Before implementing middleware, API security, or request validation, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read this authentication and security document.
* Analyze the existing middleware stack, API handlers, validation logic, and deployment configuration before making changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for backend security, middleware architecture, validation, API protection, Supabase integration, performance optimization, and testing.
* Ensure all protected endpoints consistently enforce authentication, authorization, validation, and secure error handling.
* Verify that sensitive configuration remains isolated from frontend applications and source control before considering the implementation complete.
# 04_AUTHENTICATION_AND_SECURITY.md

# Part 3 — Operational Security, Monitoring & Production Hardening

---

# 36. Security Monitoring

The platform should continuously monitor important security-related events.

Examples include:

* Successful logins
* Failed logins
* Password reset requests
* Email verification attempts
* Administrator actions
* Permission violations
* Rate limit violations
* Payment verification failures
* Suspicious API requests

Monitoring should help identify unusual activity without impacting application performance.

---

# 37. Audit Logging

All sensitive administrative operations must generate immutable audit logs.

Examples include:

Product Management

* Product Created
* Product Updated
* Product Deleted (Soft Delete)
* Product Restored

Inventory

* Stock Increased
* Stock Reduced
* Stock Adjusted
* Low Stock Threshold Updated

Orders

* Status Changed
* Payment Verified
* Refund Approved

CMS

* Banner Updated
* Homepage Modified
* Policy Pages Updated

Settings

* Company Information Updated
* Payment Configuration Updated
* Shipping Configuration Updated

Each audit log should record:

* Administrator
* Action
* Target Entity
* Previous Values (where applicable)
* New Values (where applicable)
* Timestamp
* IP Address
* User Agent

Audit records must never be edited or deleted.

---

# 38. Account Protection

Customer accounts should be protected against common abuse.

Security measures include:

* Brute-force protection
* Rate-limited authentication attempts
* Email verification
* Secure password reset
* Session validation
* Device tracking

Administrators should receive stronger protections than customers.

---

# 39. Administrator Protection

Administrator accounts require additional safeguards.

Requirements include:

* Two-Factor Authentication support
* Login history
* Device history
* Audit logging
* Restricted access to administrative routes
* Server-side permission validation

Administrative actions should always be attributable to an authenticated administrator.

---

# 40. Payment Security

Payment processing must follow secure practices.

Requirements:

* Never trust payment status from the client.
* Verify payments using trusted backend communication.
* Validate webhook authenticity.
* Record every payment attempt.
* Maintain immutable payment history.

Financial integrity takes precedence over convenience.

---

# 41. Customer Data Protection

Personal information should be handled responsibly.

Examples include:

* Names
* Email addresses
* Phone numbers
* Delivery addresses
* Order history

The application should collect only information necessary for legitimate business operations.

Sensitive information should be protected throughout its lifecycle.

---

# 42. File Security

Uploaded files should remain isolated from application code.

Requirements:

* Store files in Supabase Storage.
* Validate uploads before storage.
* Prevent execution of uploaded files.
* Associate uploaded assets with documented business entities.

Unused or orphaned files should be identified and managed appropriately.

---

# 43. Production Hardening

Production deployments should prioritize security.

Requirements include:

* HTTPS for all traffic
* Secure cookies where applicable
* Production-only secrets
* Disabled debug mode
* Proper cache configuration
* Security headers
* Environment-specific configuration

Development settings must never be deployed to production.

---

# 44. Dependency Security

Application dependencies should be maintained responsibly.

Recommendations:

* Use actively maintained packages.
* Remove unused dependencies.
* Apply security updates promptly.
* Review dependency changes before deployment.

Third-party libraries should not introduce unnecessary security risks.

---

# 45. API Abuse Protection

The platform should reduce the impact of abusive behavior.

Examples include:

* Automated login attempts
* Excessive search requests
* Coupon abuse
* Checkout spam
* Live chat spam
* API enumeration

Security controls should protect the platform while minimizing impact on legitimate users.

---

# 46. Incident Response

When security issues are detected, the platform should support operational response procedures.

Examples:

* Revoke compromised sessions.
* Disable affected accounts when appropriate.
* Record the incident.
* Notify administrators.
* Preserve audit information.

Security events should be traceable for investigation.

---

# 47. Backup & Recovery Security

Operational resilience requires secure backups.

Requirements:

* Regular database backups.
* Secure storage of backups.
* Verified restoration procedures.
* Controlled access to backup data.

Recovery procedures should preserve both security and data integrity.

---

# 48. Security Testing

Security verification should be part of the development lifecycle.

Areas to validate include:

Authentication

Authorization

Session Management

RBAC

Payment Processing

Input Validation

Rate Limiting

File Uploads

Protected Routes

Security testing should accompany functional testing whenever security-sensitive features change.

---

# 49. Security Acceptance Criteria

The security architecture is considered complete when:

* Authentication is managed by Supabase Auth.
* Authorization is enforced exclusively by the backend.
* Protected resources validate ownership.
* Administrator functionality is fully protected.
* Sessions are validated consistently.
* Rate limiting is implemented.
* Audit logging captures critical administrative actions.
* Sensitive configuration is isolated from source code.
* Payment verification occurs only through trusted backend workflows.
* Customer information is appropriately protected.
* Production deployments follow documented hardening practices.

---

# 50. AntiGravity Execution Instructions

Before implementing or modifying any authentication, authorization, middleware, security, monitoring, or operational security feature, AntiGravity must:

* Read `00_PROJECT_MANIFEST.md`.
* Read `01_PRODUCT_REQUIREMENTS_DOCUMENT.md`.
* Read `02_SYSTEM_ARCHITECTURE.md`.
* Read `03_DATABASE_DESIGN.md`.
* Read the complete `04_AUTHENTICATION_AND_SECURITY.md`.
* Analyze the existing authentication flow, middleware stack, API handlers, audit logging, monitoring, and deployment configuration before making changes.
* Thoroughly inspect every available AntiGravity skill and select the most appropriate skills for security architecture, Supabase authentication, backend authorization, middleware, monitoring, validation, performance optimization, and testing.
* Preserve the documented separation between authentication, authorization, business logic, and infrastructure.
* Verify that all implemented security controls comply with the documented security principles and do not introduce regressions before considering the task complete.

---

# 51. Definition of Success

The authentication and security implementation is considered successful when:

* Customer and administrator authentication are secure and reliable.
* Authorization is consistently enforced by backend services.
* Administrative functions are protected against unauthorized access.
* Sensitive operations generate complete audit trails.
* Sessions are securely managed throughout their lifecycle.
* API endpoints validate identity, permissions, and ownership before executing business logic.
* Payment workflows maintain financial integrity through trusted verification.
* Production deployments follow modern security best practices.
* The implementation remains fully aligned with the Product Requirements Document, System Architecture, Database Design, and all documented security requirements.
