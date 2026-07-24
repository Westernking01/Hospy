// Client-safe types for commerce
// These types do not import Prisma or any Node built-ins, so they can be safely imported into client components.

export interface ServerCartItem {
  id: string; // unique item id in cart
  productId: string;
  variantId?: string | null;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  stockMessage: string;
}

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  calculatedDiscount: number;
  message: string;
  couponId?: string;
}

export interface TaxBreakdown {
  taxClass: string;
  taxRatePercentage: number;
  taxableBaseAmount: number;
  taxAmount: number;
  isTaxExempt: boolean;
  regionalRuleApplied: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: number;
  basePrice: number;
  finalFee: number;
  isFree: boolean;
  isPickup: boolean;
  zone: string;
}

export interface ServerCartSummary {
  items: ServerCartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
  coupon?: CouponValidationResult | null;
  taxBreakdown?: TaxBreakdown | null;
  shippingOption?: ShippingOption | null;
}
