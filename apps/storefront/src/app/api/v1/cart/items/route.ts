import { NextResponse } from "next/server";
import { addItemToCart } from "@hopsy/commerce";

/**
 * POST /api/v1/cart/items
 * Add or sync an item in the shopping cart authoritatively
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productId,
      variantId = null,
      quantity = 1,
      items = [],
      couponCode = null,
      shippingMethodId = null,
      state = "Ekiti State",
    } = body;

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { success: false, message: "Valid productId is required." },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        { success: false, message: "Quantity must be a positive number greater than zero." },
        { status: 400 }
      );
    }

    const userId = req.headers.get("x-user-id") || body.userId || null;

    const result = await addItemToCart(
      userId,
      { productId, variantId, quantity },
      Array.isArray(items) ? items : [],
      { couponCode, shippingMethodId, state }
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.summary,
    });
  } catch (err: any) {
    console.error("POST /api/v1/cart/items error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to add item to cart." },
      { status: 500 }
    );
  }
}
