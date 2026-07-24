import { z } from "zod";

// ============================================================================
// SHOPPING CART VALIDATORS
// ============================================================================

export const AddToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required."),
  variantId: z.string().optional().nullable(),
  quantity: z.number().int().min(1, "Quantity must be at least 1.").default(1),
  slug: z.string().optional(),
  name: z.string().optional(),
  price: z.number().nonnegative().optional(),
  image: z.string().optional(),
});

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().min(1, "Quantity must be at least 1."),
});

export const CartCouponSchema = z.object({
  code: z.string().min(2, "Coupon code is required.").toUpperCase().trim(),
});

// ============================================================================
// ADDRESS VALIDATORS
// ============================================================================

export const AddressCreateSchema = z.object({
  fullName: z.string().min(2, "Full name is required.").optional(),
  recipientName: z.string().min(2).optional(),
  phone: z.string().min(10, "Valid phone number is required.").optional(),
  addressLine1: z.string().min(5, "Address line 1 is required."),
  addressLine2: z.string().optional().nullable(),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State/Region is required."),
  country: z.string().default("Nigeria"),
  postalCode: z.string().optional().nullable(),
  isDefaultBilling: z.boolean().default(false),
  isDefaultShipping: z.boolean().default(false),
});

export const AddressUpdateSchema = AddressCreateSchema.partial();

// ============================================================================
// SHIPPING & TAX VALIDATORS
// ============================================================================

export const ShippingCalculationSchema = z.object({
  state: z.string().min(2, "State is required for shipping calculation."),
  city: z.string().optional(),
  cartTotal: z.number().nonnegative(),
  isPickup: z.boolean().default(false),
  pickupStationId: z.string().optional().nullable(),
});

export const TaxCalculationSchema = z.object({
  state: z.string().min(2, "State is required."),
  subtotal: z.number().nonnegative(),
  shippingAmount: z.number().nonnegative().default(0),
  discountAmount: z.number().nonnegative().default(0),
});

export const CouponValidateSchema = z.object({
  code: z.string().min(2, "Coupon code is required.").toUpperCase().trim(),
  cartTotal: z.number().nonnegative("Cart total must be non-negative."),
  customerId: z.string().optional().nullable(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        categoryId: z.string().optional(),
        brandId: z.string().optional(),
        price: z.number(),
        quantity: z.number(),
      })
    )
    .optional(),
});

// ============================================================================
// CHECKOUT & ORDER CREATION VALIDATORS
// ============================================================================

export const CheckoutValidationSchema = z.object({
  cartId: z.string().optional().nullable(),
  items: z.array(
    z.object({
      id: z.string().optional(),
      productId: z.string(),
      variantId: z.string().optional().nullable(),
      quantity: z.number().int().min(1),
      price: z.number().nonnegative().optional(),
      unitPrice: z.number().nonnegative().optional(),
    })
  ),
  shippingAddress: AddressCreateSchema.optional().nullable(),
  shippingAddressId: z.string().optional().nullable(),
  billingAddress: AddressCreateSchema.optional().nullable(),
  billingAddressId: z.string().optional().nullable(),
  shippingMethodId: z.string().min(1, "Shipping method selection is required."),
  paymentMethod: z.enum(["PAYSTACK", "BANK_TRANSFER", "CASH_ON_DELIVERY"]),
  couponCode: z.string().optional().nullable(),
  customerNotes: z.string().max(500).optional().nullable(),
});

export const PlaceOrderSchema = CheckoutValidationSchema.extend({
  customerEmail: z.string().email("Valid customer email is required."),
  customerName: z.string().min(2, "Customer full name is required."),
  customerPhone: z.string().min(10, "Valid phone number is required."),
  sessionId: z.string().optional().nullable(),
});

// ============================================================================
// PAYMENT VALIDATORS
// ============================================================================

export const PaymentInitializeSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."),
  paymentMethod: z.enum(["PAYSTACK", "BANK_TRANSFER", "CASH_ON_DELIVERY"]),
  callbackUrl: z.string().url().optional(),
});

export const PaymentVerifySchema = z.object({
  reference: z.string().min(1, "Payment reference is required."),
  orderNumber: z.string().optional(),
});

export const OrderCancelSchema = z.object({
  reason: z.string().min(5, "Cancellation reason must be at least 5 characters.").max(300),
});

export type AddToCartInput = z.infer<typeof AddToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof UpdateCartItemSchema>;
export type CartCouponInput = z.infer<typeof CartCouponSchema>;
export type AddressCreateInput = z.infer<typeof AddressCreateSchema>;
export type AddressUpdateInput = z.infer<typeof AddressUpdateSchema>;
export type ShippingCalculationInput = z.infer<typeof ShippingCalculationSchema>;
export type TaxCalculationInput = z.infer<typeof TaxCalculationSchema>;
export type CouponValidateInput = z.infer<typeof CouponValidateSchema>;
export type CheckoutValidationInput = z.infer<typeof CheckoutValidationSchema>;
export type PlaceOrderInput = z.infer<typeof PlaceOrderSchema>;
export type PaymentInitializeInput = z.infer<typeof PaymentInitializeSchema>;
export type PaymentVerifyInput = z.infer<typeof PaymentVerifySchema>;
export type OrderCancelInput = z.infer<typeof OrderCancelSchema>;
