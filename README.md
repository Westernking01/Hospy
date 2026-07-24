# Hopsy Plaza Electronics E-Commerce

This is a modern e-commerce platform built as a **Turborepo** monorepo containing a Storefront website and an Admin Dashboard, sharing common UI components, utilities, and database logic.

## Architecture

The workspace is organized into **apps** and **packages**:

### Apps

- **`apps/storefront`**: The customer-facing Next.js 15 application where users can browse products, add them to carts, and place orders.
- **`apps/admin`**: The administrative Next.js 15 dashboard for managing products, categories, orders, customers, and overall platform content.

### Packages

- **`@hopsy/ui`**: Shared React components (built with Tailwind CSS and Radix UI primitives) used by both applications.
- **`@hopsy/database`**: The Prisma ORM integration and centralized database client connecting to the Supabase PostgreSQL database.
- **`@hopsy/commerce`**: Shared business logic for e-commerce features (pricing, inventory, discount rules).
- **`@hopsy/utils`**: Common utility functions and helpers.
- **`@hopsy/validation`**: Shared Zod schemas for validating forms and API requests across apps.
- **`eslint-config-*`**: Shared ESLint configurations enforcing code quality.
- **`typescript-config`**: Shared `tsconfig.json` configurations.

## Getting Started

First, install the dependencies using **pnpm**:

```bash
pnpm install
```

### Local Development

To run the development servers for both apps concurrently from the root directory:

```bash
pnpm dev
```

The apps will be available at:
- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **Admin**: [http://localhost:3001](http://localhost:3001)

### Building for Production

To build all apps and packages:

```bash
pnpm build
```

To run the built applications locally:

```bash
pnpm start
```

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Monorepo Tooling**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL (Supabase)](https://supabase.com/) & [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Deployment

The apps are configured to be independently deployed to [Vercel](https://vercel.com). The monorepo structure is fully compatible with Vercel's Turborepo integration.
