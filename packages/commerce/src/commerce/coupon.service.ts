import { prisma } from "@hopsy/database";
import type { CouponValidateInput } from "@hopsy/validation";

import type { CouponValidationResult } from "../types";

// Built-in mock coupons for immediate development, preview, and testing when local database table is unpopulated
const MOCK_COUPONS: Record<
  string,
  {
    id: string;
    code: string;
    discountType: "PERCENTAGE" | "FIXED_AMOUNT";
    discountValue: number;
    minimumPurchase: number;
    maximumDiscount?: number;
    expiresAt?: Date;
    usageLimit?: number;
    usageCount: number;
    isActive: boolean;
  }
> = {
  "WELCOME10": {
    id: "mock-coupon-welcome10",
    code: "WELCOME10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minimumPurchase: 50000,
    maximumDiscount: 150000,
    usageLimit: 1000,
    usageCount: 42,
    isActive: true,
  },
  "HOPSY25": {
    id: "mock-coupon-hopsy25",
    code: "HOPSY25",
    discountType: "PERCENTAGE",
    discountValue: 25,
    minimumPurchase: 200000,
    maximumDiscount: 350000,
    usageLimit: 500,
    usageCount: 120,
    isActive: true,
  },
  "FLAT50K": {
    id: "mock-coupon-flat50k",
    code: "FLAT50K",
    discountType: "FIXED_AMOUNT",
    discountValue: 50000,
    minimumPurchase: 300000,
    usageLimit: 200,
    usageCount: 88,
    isActive: true,
  },
  "VIP100K": {
    id: "mock-coupon-vip100k",
    code: "VIP100K",
    discountType: "FIXED_AMOUNT",
    discountValue: 100000,
    minimumPurchase: 800000,
    usageLimit: 50,
    usageCount: 12,
    isActive: true,
  },
};

export async function validateCoupon(
  input: CouponValidateInput
): Promise<CouponValidationResult> {
  const code = input.code.toUpperCase().trim();
  const cartTotal = input.cartTotal;

  // 1. First query live database via Prisma
  let dbCoupon: any = null;
  try {
    dbCoupon = await prisma.coupon.findUnique({
      where: { code },
    });
  } catch (err) {
    console.warn("Database coupon lookup skipped or offline:", err);
  }

  // 2. Evaluate against DB coupon or Mock fallback
  if (!dbCoupon && !MOCK_COUPONS[code]) {
    return {
      valid: false,
      code,
      discountType: "PERCENTAGE",
      discountValue: 0,
      calculatedDiscount: 0,
      message: "The entered coupon code is invalid or does not exist.",
    };
  }

  const coupon = dbCoupon
    ? {
        id: dbCoupon.id,
        code: dbCoupon.code,
        discountType: dbCoupon.discount_type as "PERCENTAGE" | "FIXED_AMOUNT",
        discountValue: Number(dbCoupon.discount_value),
        minimumPurchase: dbCoupon.minimum_purchase ? Number(dbCoupon.minimum_purchase) : 0,
        maximumDiscount: dbCoupon.maximum_discount ? Number(dbCoupon.maximum_discount) : undefined,
        expiresAt: dbCoupon.expires_at ? new Date(dbCoupon.expires_at) : undefined,
        usageLimit: dbCoupon.usage_limit ?? undefined,
        usageCount: dbCoupon.usage_count ?? 0,
        isActive: dbCoupon.is_active && !dbCoupon.deleted_at,
      }
    : MOCK_COUPONS[code];

  // 3. Active check
  if (!coupon.isActive) {
    return {
      valid: false,
      code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      calculatedDiscount: 0,
      message: "This coupon code is currently inactive or revoked.",
    };
  }

  // 4. Expiration date check
  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return {
      valid: false,
      code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      calculatedDiscount: 0,
      message: "This coupon code has expired.",
    };
  }

  // 5. Usage limit check
  if (coupon.usageLimit !== undefined && coupon.usageCount >= coupon.usageLimit) {
    return {
      valid: false,
      code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      calculatedDiscount: 0,
      message: "This coupon code has reached its maximum usage redemption limit.",
    };
  }

  // 6. Minimum purchase check
  if (cartTotal < coupon.minimumPurchase) {
    return {
      valid: false,
      code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      calculatedDiscount: 0,
      message: `Minimum order amount of ₦${coupon.minimumPurchase.toLocaleString()} is required to apply this coupon.`,
    };
  }

  // 7. Calculate exact server-side discount
  let calculatedDiscount = 0;
  if (coupon.discountType === "PERCENTAGE") {
    calculatedDiscount = (cartTotal * coupon.discountValue) / 100;
    if (coupon.maximumDiscount && calculatedDiscount > coupon.maximumDiscount) {
      calculatedDiscount = coupon.maximumDiscount;
    }
  } else {
    calculatedDiscount = coupon.discountValue;
  }

  // Ensure discount never exceeds total cart amount
  if (calculatedDiscount > cartTotal) {
    calculatedDiscount = cartTotal;
  }

  return {
    valid: true,
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    calculatedDiscount: Math.round(calculatedDiscount * 100) / 100,
    message: `Coupon code '${coupon.code}' applied successfully!`,
    couponId: coupon.id,
  };
}

export async function incrementCouponUsage(code: string): Promise<void> {
  try {
    await prisma.coupon.update({
      where: { code: code.toUpperCase() },
      data: { usage_count: { increment: 1 } },
    });
  } catch (err) {
    // If mock coupon or offline, log usage update
    if (MOCK_COUPONS[code.toUpperCase()]) {
      MOCK_COUPONS[code.toUpperCase()].usageCount += 1;
    }
  }
}
