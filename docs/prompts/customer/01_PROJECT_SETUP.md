# CUSTOMER WEBSITE — 01_PROJECT_SETUP

## Objective

Set up the complete foundation for the HOPSY PLAZA Customer Website.

This task is **only** responsible for project initialization, architecture, dependencies, configuration, folder structure, shared utilities, and development tooling.

Do **not** build UI pages, authentication flows, business features, or APIs in this task.

---

# Step 1 — Read All Project Documentation

Before making any changes, read and understand every project document in the `docs/` directory:

* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 04_AUTHENTICATION_AND_SECURITY.md
* 05_API_SPECIFICATION.md
* 06_CUSTOMER_WEBSITE_UI_UX.md
* 07_ADMIN_DASHBOARD_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 10_CMS_SPECIFICATION.md
* 11_EMAIL_NOTIFICATION_SPECIFICATION.md
* 12_DEPLOYMENT_ARCHITECTURE.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

If documentation conflicts with assumptions, always follow the documentation.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementing anything:

Inspect **every available AntiGravity skill**.

Read each skill's description rather than relying on its name.

Activate only the skills most appropriate for this setup phase.

Typical skills may include:

* System Architecture
* Frontend Architecture
* Project Scaffolding
* Next.js Engineering
* TypeScript
* Tailwind CSS
* Performance
* Accessibility
* SEO
* Code Quality
* Testing
* Documentation

Re-evaluate skills specifically for this task rather than reusing the same set from previous prompts.

---

# Step 3 — Initialize the Project

Create a production-ready Customer Website using:

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* ESLint
* Prettier
* Prisma Client
* Supabase Client
* React Hook Form
* Zod
* TanStack Query
* Zustand (only where global client state is appropriate)
* Lucide React
* Framer Motion
* Resend client (shared integration layer only)
* Paystack client utilities (shared integration layer only)

Use current stable versions that are compatible with one another.

---

# Step 4 — Configure the Project Structure

Create a scalable folder structure suitable for a large production application.

The architecture should clearly separate:

* App Router
* Shared UI components
* Feature modules
* Layouts
* Hooks
* Services
* API clients
* Validation schemas
* Utilities
* Constants
* Types
* Providers
* Config
* Assets
* Styles

Avoid creating unnecessary folders or deeply nested structures.

The organization should remain intuitive as the project grows.

---

# Step 5 — Configure Global Providers

Prepare the application for:

* Theme management (if required in the future)
* Authentication provider integration
* Query client
* Toast/notification provider
* Global modal provider (future-ready)
* Error boundary
* Loading boundary

Only configure providers.

Do not implement business functionality.

---

# Step 6 — Configure Environment Variables

Prepare environment support for:

* Supabase
* Prisma
* Paystack
* Resend
* Analytics (future-ready)

Never expose secret keys to the client.

Use environment validation where appropriate.

---

# Step 7 — Configure Shared Utilities

Create shared infrastructure for:

* API client
* Date formatting
* Currency formatting (₦ by default)
* Number formatting
* Error formatting
* Slug generation
* Pagination helpers
* Validation helpers
* Image helpers

Utilities should be generic and reusable.

---

# Step 8 — Configure Global Styles

Prepare:

* Tailwind configuration
* Typography
* Color tokens
* Radius tokens
* Shadows
* Animations
* Responsive breakpoints
* Container sizes

Do not implement the visual design system yet.

Only establish the foundation.

---

# Step 9 — Configure Development Standards

Ensure:

* Path aliases
* Absolute imports
* Strict TypeScript
* Lint rules
* Formatting rules
* Consistent naming conventions

The project should compile cleanly with no warnings or errors.

---

# Step 10 — Configure Performance Foundations

Prepare support for:

* Dynamic imports
* Code splitting
* Image optimization
* Metadata
* Lazy loading
* Font optimization

These should be configuration-level preparations rather than feature implementations.

---

# Step 11 — Configure SEO Foundation

Prepare:

* Metadata utilities
* Open Graph helpers
* Robots configuration
* Sitemap foundation
* Canonical URL helpers

Actual page SEO will be implemented later.

---

# Step 12 — Configure Accessibility Foundation

Prepare reusable support for:

* Focus management
* Keyboard navigation
* Screen-reader utilities
* Accessible form helpers

Accessibility should be considered from the beginning, not added later.

---

# Step 13 — Configure Error Handling

Prepare global support for:

* Error boundaries
* Loading boundaries
* Not-found handling
* Fallback UI
* Application error logging

Do not implement feature-specific error handling yet.

---

# Step 14 — Out of Scope

Do **not** build:

* Homepage
* Authentication UI
* Product pages
* Cart
* Checkout
* Customer dashboard
* Search
* Wishlist
* Compare
* CMS
* Payments
* APIs

This task establishes only the project foundation.

---

# Deliverables

At completion, the project should provide:

* Fully initialized Next.js application
* Production-ready folder structure
* Shared providers
* Shared utilities
* Configuration files
* Global styles foundation
* Environment support
* Performance foundation
* Accessibility foundation
* SEO foundation
* Error handling foundation

No customer-facing features should exist yet.

---

# Final Verification Checklist

Before completing this task, verify:

* Every required document was followed.
* Appropriate AntiGravity skills were selected after reviewing all available skills.
* Project compiles successfully.
* No TypeScript errors.
* No ESLint errors.
* No placeholder code.
* No duplicate utilities.
* No unnecessary dependencies.
* Clean project architecture.
* Production-ready configuration.
* Future phases can build on this foundation without restructuring.

Only mark this task complete after every item above has been verified.
