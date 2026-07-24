import { NextResponse } from "next/server";
import { calculateServerCart } from "@hopsy/commerce";
import { checkStockAvailability } from "@hopsy/commerce";
import { CheckoutValidationSchema } from "@hopsy/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CheckoutValidationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid checkout submission.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { items, couponCode, shippingMethodId, shippingAddress } = parsed.data;

    // 1. Verify stock availability for all items
    const failedStock: string[] = [];
    for (const item of items) {
      const stockCheck = await checkStockAvailability(item.productId, item.variantId, item.quantity);
      if (!stockCheck.available) {
        failedStock.push(`${item.productId}: ${stockCheck.message}`);
      }
    }

    if (failedStock.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more items in your cart have insufficient stock.",
          errors: failedStock,
        },
        { status: 400 }
      );
    }

    // 2. Authoritative price/tax calculation
    const summary = await calculateServerCart(
      items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
        price: i.price,
      })),
      {
        couponCode: couponCode || undefined,
        shippingMethodId,
        state: shippingAddress?.state || "Ekiti State",
      }
    );

    return NextResponse.json({
      success: true,
      message: "Checkout validation successful.",
      data: {
        summary,
        canProceedToPayment: true,
      },
    });
  } catch (err: any) {
    console.error("POST /api/v1/checkout/validate error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to validate checkout." },
      { status: 500 }
    );
  }
}
