import { NextResponse } from "next/server";
import { calculateServerCart } from "@hopsy/commerce";

/**
 * POST /api/v1/cart/coupon
 * Validate and apply a coupon code to the cart authoritatively
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, items = [], shippingMethodId = null, state = "Ekiti State" } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, message: "Coupon code is required." },
        { status: 400 }
      );
    }

    const summary = await calculateServerCart(Array.isArray(items) ? items : [], {
      couponCode: code.trim(),
      shippingMethodId,
      state,
    });

    if (!summary.coupon || !summary.coupon.valid) {
      return NextResponse.json(
        {
          success: false,
          message: summary.coupon?.message || `Coupon code "${code}" is invalid or expired.`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Coupon code "${code.toUpperCase()}" applied successfully!`,
      data: summary,
    });
  } catch (err: any) {
    console.error("POST /api/v1/cart/coupon error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to apply coupon." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/cart/coupon
 * Remove an applied coupon code from the active cart
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itemsParam = searchParams.get("items");
    const shippingMethodId = searchParams.get("shippingMethodId") || null;
    const state = searchParams.get("state") || "Ekiti State";

    let items: any[] = [];
    if (itemsParam) {
      try {
        items = JSON.parse(itemsParam);
      } catch (e) {
        items = [];
      }
    }

    const summary = await calculateServerCart(items, {
      couponCode: null,
      shippingMethodId,
      state,
    });

    return NextResponse.json({
      success: true,
      message: "Coupon removed successfully.",
      data: summary,
    });
  } catch (err: any) {
    console.error("DELETE /api/v1/cart/coupon error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to remove coupon." },
      { status: 500 }
    );
  }
}
