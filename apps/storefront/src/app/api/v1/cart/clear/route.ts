import { NextResponse } from "next/server";
import { clearCart, calculateServerCart } from "@hopsy/commerce";

/**
 * DELETE /api/v1/cart/clear
 * Clear all items from the active cart
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = req.headers.get("x-user-id") || searchParams.get("userId") || null;

    await clearCart(userId);
    const emptySummary = await calculateServerCart([]);

    return NextResponse.json({
      success: true,
      message: "Cart cleared successfully.",
      data: emptySummary,
    });
  } catch (err: any) {
    console.error("DELETE /api/v1/cart/clear error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to clear cart." },
      { status: 500 }
    );
  }
}
