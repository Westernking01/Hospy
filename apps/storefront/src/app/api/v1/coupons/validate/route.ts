import { NextResponse } from "next/server";
import { validateCoupon } from "@hopsy/commerce";
import { CouponValidateSchema } from "@hopsy/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CouponValidateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid coupon payload.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const result = await validateCoupon(parsed.data);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: result.message, data: result },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (err: any) {
    console.error("POST /api/v1/coupons/validate error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to validate coupon." },
      { status: 500 }
    );
  }
}
