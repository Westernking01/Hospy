# CUSTOMER WEBSITE — 12_CART

## Objective

Design and implement the complete Shopping Cart experience for the HOPSY PLAZA Customer Website.

The Shopping Cart is the bridge between product discovery and checkout. It should be fast, intuitive, resilient, and optimized for conversion while providing customers with all the information they need before proceeding to checkout.

This task is responsible only for the Cart experience.

**Do not implement Checkout, Order Processing, Customer Dashboard, or Admin functionality.**

---

# Step 1 — Read Project Documentation

Before implementing anything, thoroughly read:

* 00_PROJECT_MANIFEST.md
* 01_PRODUCT_REQUIREMENTS_DOCUMENT.md
* 02_SYSTEM_ARCHITECTURE.md
* 03_DATABASE_DESIGN.md
* 05_API_SPECIFICATION.md
* 06_CUSTOMER_WEBSITE_UI_UX.md
* 08_DESIGN_SYSTEM.md
* 09_BUSINESS_RULES.md
* 13_DEVELOPMENT_ROADMAP.md
* 14_QUALITY_ASSURANCE.md
* 15_ANTIGRAVITY_GLOBAL_RULES.md

The implementation must strictly follow the documented business rules and architecture.

---

# Step 2 — Select the Appropriate AntiGravity Skills

Before implementing the Cart:

Inspect **every available AntiGravity skill**.

Read each skill's capabilities instead of relying only on its title.

Activate only the skills most appropriate for implementing a modern enterprise shopping cart.

Typical skills may include:

* Frontend Architecture
* UI Engineering
* UX Design
* State Management
* API Integration
* Performance Optimization
* Accessibility
* Motion Design
* Testing

Select the optimal combination specifically for this task.

---

# Step 3 — Cart Architecture

Implement a scalable cart system supporting:

* Guest users
* Authenticated customers
* Persistent carts
* Cart synchronization after login
* Large carts
* Future multi-device synchronization

The architecture should be reusable and maintainable.

---

# Step 4 — Cart Page Layout

Design a premium Cart page.

Include:

* Cart Items
* Order Summary
* Coupon Section
* Shipping Estimator
* Tax Summary
* Continue Shopping
* Checkout Button
* Recommended Products

The layout should prioritize clarity and conversion.

---

# Step 5 — Cart Items

Each cart item should display:

* Product Image
* Product Name
* Brand
* Selected Variant(s)
* SKU
* Unit Price
* Quantity Selector
* Line Total
* Stock Status
* Warranty Indicator
* Delivery Indicator
* Remove Item
* Save for Later
* Move to Wishlist (for authenticated users)

Cart items should update dynamically without requiring full-page reloads.

---

# Step 6 — Quantity Management

Support:

* Increase Quantity
* Decrease Quantity
* Direct Quantity Input
* Maximum Quantity Validation
* Stock Validation

Changes should update pricing immediately.

---

# Step 7 — Variant Updates

Customers should be able to change eligible variants directly from the cart.

When a variant changes, update:

* Price
* SKU
* Stock
* Product Image
* Availability

Updates should occur seamlessly.

---

# Step 8 — Cart Summary

Display:

* Subtotal
* Estimated Shipping
* Estimated Tax
* Discounts
* Coupon Savings
* Grand Total

Totals should update instantly whenever the cart changes.

---

# Step 9 — Coupon Support

Support coupon functionality including:

* Apply Coupon
* Remove Coupon
* Validation Feedback
* Expired Coupon Handling
* Invalid Coupon Handling

Coupon rules should be driven by backend validation.

---

# Step 10 — Shipping Estimator

Allow customers to estimate shipping before checkout.

Support:

* Nigerian State
* City
* Delivery Method
* Estimated Shipping Cost
* Estimated Delivery Time

International shipping should indicate that shipping costs will be calculated after the order is placed, as defined in the business requirements.

---

# Step 11 — Save for Later

Implement Save for Later functionality.

Support:

* Move from Cart to Saved Items
* Restore Saved Items
* Remove Saved Items

For authenticated users, synchronize saved items across devices where supported.

---

# Step 12 — Inventory Awareness

Validate inventory in real time.

Support:

* In Stock
* Low Stock
* Out of Stock
* Quantity Limit Warnings
* Reserved Stock Awareness

Prevent customers from ordering quantities that exceed available inventory.

---

# Step 13 — Product Recommendations

Display personalized recommendations such as:

* Frequently Bought Together
* Customers Also Bought
* Similar Products
* Recently Viewed Products

Recommendations should complement the cart without distracting from checkout.

---

# Step 14 — Guest Cart

Support guest users.

Requirements:

* Local persistence
* Cart restoration
* Cart merge after login
* No unnecessary account creation prompts

The shopping experience should remain smooth for guests.

---

# Step 15 — Empty Cart Experience

Design a premium Empty Cart state.

Include:

* Friendly messaging
* Continue Shopping CTA
* Featured Products
* Popular Categories
* Flash Sales

Avoid generic empty-state designs.

---

# Step 16 — Loading & Error States

Implement:

### Loading

* Skeleton cart items
* Skeleton order summary
* Skeleton recommendations

### Error Handling

Handle:

* Inventory changes
* Pricing updates
* Coupon failures
* Shipping estimation failures
* Network interruptions
* API failures

Provide clear recovery actions.

---

# Step 17 — Accessibility

Ensure:

* Keyboard navigation
* Accessible quantity controls
* Proper form labels
* Semantic HTML
* Screen-reader compatibility
* Focus management

The cart must remain fully usable without a mouse.

---

# Step 18 — Performance

Optimize:

* Real-time cart updates
* Efficient state management
* Cached cart data
* Lazy-loaded recommendations
* Minimal re-renders

The cart should remain responsive regardless of cart size.

---

# Step 19 — Animation

Use **Framer Motion** for:

* Item addition
* Item removal
* Quantity updates
* Save for Later transitions
* Coupon feedback
* Summary updates

Animations should reinforce user actions without delaying interactions.

---

# Step 20 — Security

Ensure:

* Server-side price validation
* Server-side inventory validation
* Coupon validation on the backend
* Protection against client-side price manipulation
* Safe handling of guest and authenticated carts

Never trust pricing or totals calculated solely on the client.

---

# Step 21 — Out of Scope

Do **not** implement:

* Checkout flow
* Payment processing
* Order placement
* Order history
* Customer Dashboard
* Admin inventory management

Only implement the Shopping Cart experience.

---

# Deliverables

The completed implementation should include:

* Premium Cart Page
* Dynamic Cart Items
* Variant Updates
* Quantity Management
* Coupon Support
* Shipping Estimator
* Save for Later
* Inventory Validation
* Product Recommendations
* Guest Cart Support
* Empty Cart Experience
* Loading States
* Error Handling
* Accessibility
* Responsive Design
* Premium Motion
* Security Validation
* Performance Optimization

The Shopping Cart should provide a seamless transition from browsing products to beginning the checkout process.

---

# Final Verification Checklist

Before completing this task, verify:

* All relevant documentation has been followed.
* AntiGravity reviewed every available skill and selected only those appropriate for Cart implementation.
* Guest and authenticated carts function correctly.
* Quantity updates are validated against inventory.
* Variant updates work correctly.
* Coupons are validated by the backend.
* Shipping estimates behave correctly.
* Save for Later functions correctly.
* Recommendations display appropriately.
* Responsive behaviour is verified.
* Accessibility requirements are satisfied.
* Performance targets are met.
* Security validation is implemented.
* Animations are premium and restrained.
* No AI-generated design patterns are present.
* No unrelated features have been implemented.
* The Shopping Cart is production-ready.

Only mark this task complete after every verification item has been satisfied.
