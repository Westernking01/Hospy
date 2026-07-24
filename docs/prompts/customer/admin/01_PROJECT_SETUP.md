# 01_PROJECT_SETUP

## Objective

Establish the complete foundation for the HOPSY PLAZA Admin Dashboard.

This phase is responsible for creating the project's architecture, development environment, folder structure, shared infrastructure, configuration, and core dependencies.

No business modules should be implemented during this phase.

The objective is to create a scalable, secure, maintainable, enterprise-grade foundation that every subsequent implementation will build upon.

---

# Step 1 — Read Project Documentation

Before writing any code, thoroughly review:

* 00_READ_THIS_FIRST.md
* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 04_AUTHENTICATION_AND_SECURITY.md
* 07_ADMIN_DASHBOARD_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 12_DEPLOYMENT_ARCHITECTURE.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

Ensure the project foundation aligns with all documented architectural decisions.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementation:

Inspect **every available AntiGravity skill**.

Read the description and capabilities of each skill instead of relying only on the skill name.

Activate only the skills most appropriate for project setup.

Typical skills may include:

* Frontend Architecture
* Backend Architecture
* Project Architecture
* TypeScript
* State Management
* Performance Optimization
* Authentication
* Security
* Build Systems
* Code Quality

Select the optimal combination specifically for this task.

---

# Step 3 — Project Structure

Create a clean enterprise folder structure.

Organize the application into clearly separated modules, including:

* Application
* Shared Components
* Layouts
* Features
* Services
* API Layer
* Hooks
* Utilities
* Types
* Constants
* Providers
* Assets
* Styles
* Configuration
* Middleware
* Libraries

The structure should support long-term scalability without major refactoring.

---

# Step 4 — Technology Stack

Configure the approved technology stack.

Ensure all required dependencies are installed and configured correctly.

This includes the project's approved versions of:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Prisma
* Supabase
* React Query / TanStack Query
* React Hook Form
* Zod
* Framer Motion
* Lucide Icons
* Date utilities
* Table libraries
* Chart libraries
* Utility libraries

Do not introduce unnecessary dependencies.

---

# Step 5 — Development Configuration

Configure:

* ESLint
* Prettier
* TypeScript
* Tailwind
* Path aliases
* Environment variables
* Build configuration
* Import ordering
* Formatting rules

Maintain consistent development standards across the project.

---

# Step 6 — Environment Variables

Verify the environment configuration.

Ensure secure handling of:

* Database connections
* Supabase credentials
* Authentication configuration
* Payment configuration (where shared)
* Storage configuration
* Email configuration
* Analytics configuration (if applicable)

Never expose sensitive values in client-side code.

---

# Step 7 — Shared Design Foundation

Implement the global design foundation.

Configure:

* Typography
* Color tokens
* Spacing scale
* Border radius
* Shadows
* Z-index system
* Breakpoints
* Animation tokens

These values should come from the Design System documentation.

---

# Step 8 — Global Layout

Create the base application layout.

Prepare:

* Sidebar placeholder
* Header placeholder
* Main content area
* Responsive container
* Global navigation shell

No business-specific navigation should be implemented yet.

---

# Step 9 — Shared Providers

Configure all global providers.

Examples include:

* Authentication Provider
* Query Client Provider
* Theme Provider
* Toast Provider
* Modal Provider
* Session Provider
* Error Boundary

Ensure providers are initialized in the proper order.

---

# Step 10 — Routing Foundation

Configure the routing architecture.

Prepare support for:

* Public routes
* Protected routes
* Authentication routes
* Role-based routing
* Nested layouts
* Error pages
* Loading pages

The routing structure should support future modules without modification.

---

# Step 11 — Shared Components

Build reusable foundational components.

Examples:

* Button
* Input
* Select
* Checkbox
* Radio
* Modal
* Drawer
* Tooltip
* Dropdown
* Badge
* Avatar
* Skeleton
* Spinner
* Empty State
* Error State

Components should follow the Design System and remain business-agnostic.

---

# Step 12 — State Management

Configure global state management.

Prepare stores or contexts for:

* Authentication
* User Preferences
* Notifications
* Sidebar State
* Theme
* Session

Avoid storing server data in global state where React Query is more appropriate.

---

# Step 13 — API Foundation

Create the shared API layer.

Prepare:

* HTTP client
* Request interceptors
* Response interceptors
* Error handling
* Authentication handling
* Request cancellation
* Retry strategy

The API layer should be reusable across all modules.

---

# Step 14 — Authentication Foundation

Prepare the authentication infrastructure.

Configure:

* Protected layouts
* Session management
* Role validation
* Permission checks
* Route guards

The login functionality itself will be implemented in a later document.

---

# Step 15 — Error Handling Foundation

Create shared mechanisms for:

* Global Error Boundary
* API Error Handling
* Form Validation Errors
* Network Errors
* Unauthorized Access
* Not Found Pages

Provide consistent user feedback across the application.

---

# Step 16 — Performance Foundation

Prepare infrastructure for:

* Lazy loading
* Dynamic imports
* Code splitting
* Image optimization
* Request caching
* Prefetching
* Efficient rendering

Build for enterprise-scale usage from the start.

---

# Step 17 — Accessibility Foundation

Configure accessibility standards.

Ensure reusable components support:

* Keyboard navigation
* Screen readers
* Focus management
* Semantic HTML
* Accessible labels

Accessibility should be built into the foundation rather than added later.

---

# Step 18 — Developer Experience

Improve the development workflow.

Configure:

* Absolute imports
* Consistent linting
* Type checking
* Helpful error messages
* Development scripts
* Build scripts

The project should be pleasant and efficient to maintain.

---

# Step 19 — Validation

Verify that:

* Project builds successfully.
* Linting passes.
* Type checking passes.
* Providers initialize correctly.
* Routing works.
* Shared components render correctly.
* Environment configuration is valid.
* No placeholder code blocks production.

---

# Step 20 — Out of Scope

Do **not** implement:

* Authentication pages
* Dashboard pages
* Analytics
* Products
* Orders
* Customers
* CMS
* Reports
* Business logic

Only establish the project foundation.

---

# Deliverables

The completed implementation should include:

* Enterprise Project Structure
* Shared Design Foundation
* Global Layout
* Shared Components
* Routing Foundation
* API Layer
* Authentication Foundation
* State Management
* Shared Providers
* Error Handling Foundation
* Accessibility Foundation
* Performance Foundation
* Development Configuration
* Production-ready Build Configuration

The Admin Dashboard foundation should be scalable enough to support every future module without requiring structural redesign.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for project setup.
* Folder structure is modular and scalable.
* Shared components follow the Design System.
* Providers are configured correctly.
* Routing foundation is complete.
* API infrastructure is reusable.
* Authentication infrastructure is prepared.
* Accessibility standards are established.
* Performance optimizations are configured.
* The project builds successfully.
* Linting and type checking pass.
* No business features have been implemented.
* No AI-generated design patterns are present.
* The project foundation is production-ready.

Only mark this task complete after every verification item has been satisfied.
