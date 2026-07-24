import { NextResponse } from "next/server";
import { calculateServerCart } from "@hopsy/commerce";

/**
 * GET /api/v1/cart
 * Calculate and verify cart items and summary from query/body or user session
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itemsParam = searchParams.get("items");
    const couponCode = searchParams.get("couponCode") || null;
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
      couponCode,
      shippingMethodId,
      state,
    });

    return NextResponse.json({
      success: true,
      message: "Cart calculated successfully.",
      data: summary,
    });
  } catch (err: any) {
    console.error("GET /api/v1/cart error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to calculate cart." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/cart
 * Sync or recalculate cart state with authoritative pricing, taxes, shipping, and coupons
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items = [], couponCode = null, shippingMethodId = null, state = "Ekiti State" } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, message: "Invalid cart format. Items must be an array." },
        { status: 400 }
      );
    }

    const summary = await calculateServerCart(items, {
      couponCode,
      shippingMethodId,
      state,
    });

    return NextResponse.json({
      success: true,
      message: "Cart synchronized successfully.",
      data: summary,
    });
  } catch (err: any) {
    console.error("POST /api/v1/cart error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to sync cart." },
      { status: 500 }
    );
  }
}
