import { NextResponse } from "next/server";
import { getShippingOptions, validateShippingSelection } from "@hopsy/commerce";
import { calculateServerCart } from "@hopsy/commerce";

/**
 * POST /api/v1/checkout/shipping
 * Authoritatively calculate available shipping options and rates based on delivery address and cart total
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      state = "Ekiti State",
      shippingMethodId = null,
      items = [],
      couponCode = null,
      isPickup = false,
    } = body;

    if (!state || typeof state !== "string") {
      return NextResponse.json(
        { success: false, message: "Valid delivery state or destination is required." },
        { status: 400 }
      );
    }

    // First authoritatively calculate cart subtotal & discounts from server
    const cartSummary = await calculateServerCart(Array.isArray(items) ? items : [], {
      couponCode,
      state,
      shippingMethodId,
    });

    const discountedTotal = Math.max(0, cartSummary.subtotal - cartSummary.discountAmount);

    const availableOptions = await getShippingOptions({
      state,
      cartTotal: discountedTotal,
      isPickup: Boolean(isPickup),
    });

    let selectedOption = null;
    if (shippingMethodId) {
      selectedOption = await validateShippingSelection(shippingMethodId, state, discountedTotal);
    } else {
      selectedOption = availableOptions.find((o) => !o.isPickup) || availableOptions[0];
    }

    return NextResponse.json({
      success: true,
      message: "Shipping options calculated successfully.",
      data: {
        destinationState: state,
        authoritativeCartTotal: discountedTotal,
        selectedMethod: selectedOption,
        availableOptions,
      },
    });
  } catch (err: any) {
    console.error("POST /api/v1/checkout/shipping error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to calculate shipping rates." },
      { status: 500 }
    );
  }
}
