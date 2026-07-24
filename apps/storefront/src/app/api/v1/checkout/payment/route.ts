import { NextResponse } from "next/server";
import { calculateServerCart } from "@hopsy/commerce";

/**
 * POST /api/v1/checkout/payment
 * Pre-validate payment option selection and verify credit / amount eligibility before order placement
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      paymentMethod = "PAYSTACK",
      items = [],
      couponCode = null,
      shippingMethodId = null,
      state = "Ekiti State",
      customerRole = "CUSTOMER",
    } = body;

    const allowedMethods = ["PAYSTACK", "BANK_TRANSFER", "CASH_ON_DELIVERY"];
    const cleanMethod = String(paymentMethod).trim().toUpperCase();

    if (!allowedMethods.includes(cleanMethod)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid payment method "${paymentMethod}". Allowed methods are: ${allowedMethods.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    // Authoritative cart summary check
    const cartSummary = await calculateServerCart(Array.isArray(items) ? items : [], {
      couponCode,
      shippingMethodId,
      state,
    });

    if (cartSummary.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cannot validate payment for an empty cart." },
        { status: 400 }
      );
    }

    // Business rule checks per 09_BUSINESS_RULES.md
    if (cleanMethod === "CASH_ON_DELIVERY") {
      const isEligibleState = state.toLowerCase().includes("ekiti") || state.toLowerCase().includes("lagos");
      if (!isEligibleState) {
        return NextResponse.json(
          {
            success: false,
            message: "Cash on Delivery is currently only available for orders delivered within Ekiti and Lagos States.",
          },
          { status: 400 }
        );
      }
      if (cartSummary.total > 2000000) {
        return NextResponse.json(
          {
            success: false,
            message: "Cash on Delivery maximum limit is NGN 2,000,000. Please select Paystack or Bank Transfer for high-value orders.",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Payment method "${cleanMethod}" validated and eligible for this order.`,
      data: {
        selectedMethod: cleanMethod,
        authoritativeTotal: cartSummary.total,
        currency: "NGN",
        requiresRedirect: cleanMethod === "PAYSTACK",
        paymentInstructions:
          cleanMethod === "BANK_TRANSFER"
            ? "Direct bank transfer instructions and virtual account details will be issued upon order confirmation."
            : cleanMethod === "CASH_ON_DELIVERY"
            ? "Payment will be collected via POS or verified transfer upon delivery."
            : "Paystack secure payment gateway redirection will initiate upon order placement.",
      },
    });
  } catch (err: any) {
    console.error("POST /api/v1/checkout/payment error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to validate payment option." },
      { status: 500 }
    );
  }
}
