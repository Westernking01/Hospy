import { NextResponse } from "next/server";
import { updateCartItem, removeCartItem } from "@hopsy/commerce";

/**
 * PATCH /api/v1/cart/items/[id]
 * Update quantity or selected variant for a specific cart item
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      quantity,
      variantId,
      items = [],
      couponCode = null,
      shippingMethodId = null,
      state = "Ekiti State",
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Cart item ID is required." },
        { status: 400 }
      );
    }

    const userId = req.headers.get("x-user-id") || body.userId || null;

    const result = await updateCartItem(
      userId,
      id,
      { quantity, variantId },
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
    console.error("PATCH /api/v1/cart/items/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update cart item." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/cart/items/[id]
 * Remove specific item from cart
 */
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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

    const userId = req.headers.get("x-user-id") || searchParams.get("userId") || null;

    const result = await removeCartItem(
      userId,
      id,
      items,
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
    console.error("DELETE /api/v1/cart/items/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to remove cart item." },
      { status: 500 }
    );
  }
}
