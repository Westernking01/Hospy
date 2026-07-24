# CUSTOMER WEBSITE — 04_AUTHENTICATION

## Objective

Implement the complete authentication and authorization system for the HOPSY PLAZA Customer Website.

This task is responsible only for customer authentication, session management, route protection, account management foundation, and security integration.

**Do not build the Shop, Homepage, Cart, Checkout, Customer Dashboard, Product Pages, or any unrelated business features.**

---

# Step 1 — Read Project Documentation

Before implementing anything, thoroughly read:

* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 04_AUTHENTICATION_AND_SECURITY.md
* 05_API_SPECIFICATION.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 11_EMAIL_NOTIFICATION_SPECIFICATION.md
* 12_DEPLOYMENT_ARCHITECTURE.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Follow the documented authentication architecture exactly.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before writing any authentication code:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities rather than selecting by name alone.

Activate only the skills appropriate for this authentication phase.

Typical skills may include:

* Authentication
* Supabase Auth
* Backend Architecture
* Security Engineering
* Session Management
* Middleware
* Form Engineering
* UI/UX
* Accessibility
* Email Integration
* API Design
* Testing

Re-evaluate skills specifically for this task.

---

# Step 3 — Configure Supabase Authentication

Implement support for:

* Email & Password
* Google Sign-In
* Email OTP
* Phone OTP

Configure authentication using Supabase Auth following production best practices.

Do not expose secret keys.

---

# Step 4 — Registration Flow

Build customer registration with support for:

* Full Name
* Email
* Phone Number
* Password
* Password Confirmation

Requirements:

* Client-side validation
* Server-side validation
* Duplicate account prevention
* Secure password handling
* Email verification

Registration should follow the design system.

---

# Step 5 — Login Flow

Implement login using:

* Email & Password
* Google Sign-In
* Email OTP
* Phone OTP

Support:

* Remember Me
* Forgot Password
* Session persistence
* Loading states
* Error states

---

# Step 6 — Email Verification

Implement email verification workflow.

Requirements:

* Verification email
* Secure verification link
* Expiration handling
* Resend verification

Users should not access protected account features until verification requirements are satisfied according to the documented business rules.

---

# Step 7 — Password Reset

Implement:

* Forgot Password
* Password Reset Email
* Secure Reset Link
* Password Update
* Success Confirmation

Reset links must expire appropriately.

---

# Step 8 — Session Management

Implement secure session handling.

Support:

* Session persistence
* Session refresh
* Logout
* Session expiration
* Secure cookies where applicable

Users should never unexpectedly lose authenticated state.

---

# Step 9 — Route Protection

Protect authenticated routes.

Public examples:

* Homepage
* Shop
* Categories
* Product Pages
* Brands
* Contact

Protected examples:

* Customer Account
* Wishlist
* Saved Addresses
* Saved Cards
* Order History
* Returns
* Customer Settings

Unauthorized users should be redirected appropriately.

---

# Step 10 — Customer Profile Foundation

Prepare authenticated customer profile support.

Include:

* Customer information
* Avatar placeholder
* Profile retrieval
* Profile updates

Do not build the complete account dashboard yet.

---

# Step 11 — Security Features

Implement:

* CSRF protection (where applicable)
* Rate limiting support
* Login attempt protection
* Session validation
* Device history foundation
* Login history foundation

Authentication must follow the documented security requirements.

---

# Step 12 — Authentication UI

Build reusable authentication pages for:

* Register
* Login
* Forgot Password
* Reset Password
* Verify Email
* OTP Verification

The UI must:

* Follow the Design System
* Be responsive
* Be accessible
* Avoid generic authentication templates
* Avoid AI-generated layouts

---

# Step 13 — Notifications

Integrate authentication with the notification system.

Support:

* Welcome Email
* Verification Email
* Password Reset Email

Do not implement unrelated notification workflows.

---

# Step 14 — Error Handling

Handle:

* Invalid credentials
* Duplicate accounts
* Expired links
* Invalid OTP
* Rate limits
* Network failures
* Authentication provider failures

Provide user-friendly feedback without revealing sensitive system details.

---

# Step 15 — Out of Scope

Do **not** implement:

* Homepage
* Shop
* Categories
* Product Details
* Cart
* Checkout
* Orders
* Payments
* Reviews
* CMS
* Customer Dashboard
* Admin Authentication

Only implement the authentication system.

---

# Deliverables

The completed authentication module should provide:

* Supabase Auth integration
* Customer registration
* Customer login
* Google authentication
* Email OTP
* Phone OTP
* Email verification
* Password reset
* Session management
* Protected routes
* Authentication middleware
* Responsive authentication UI
* Secure authentication workflows

---

# Final Verification Checklist

Before completing this task, verify:

* All authentication requirements from the documentation have been implemented.
* AntiGravity reviewed every available skill and selected only those appropriate for authentication and security.
* Registration works correctly.
* Login works correctly.
* Google authentication works.
* Email OTP works.
* Phone OTP works.
* Email verification works.
* Password reset works.
* Protected routes function correctly.
* Sessions are secure.
* Authentication UI is responsive and accessible.
* No authentication secrets are exposed.
* No placeholder implementations remain.
* The authentication system is production-ready.

Only mark this task complete after every verification item has been satisfied.
