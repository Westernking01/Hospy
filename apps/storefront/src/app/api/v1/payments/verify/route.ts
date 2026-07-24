import { NextResponse } from "next/server";
import { verifyPayment } from "@hopsy/commerce";
import { getOrderByNumber } from "@hopsy/commerce";
import { sendOrderNotification } from "@hopsy/commerce";
import { PaymentVerifySchema } from "@hopsy/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PaymentVerifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid verification parameters.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { reference, orderNumber } = parsed.data;
    const res = await verifyPayment(reference, orderNumber);

    if (res.success && res.status === "PAID" && res.orderNumber) {
      const order = await getOrderByNumber(res.orderNumber);
      if (order) {
        await sendOrderNotification("PAYMENT_CONFIRMATION", order);
      }
    }

    return NextResponse.json({
      success: res.success,
      message: res.message,
      data: res,
    });
  } catch (err: any) {
    console.error("POST /api/v1/payments/verify error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Payment verification encountered an error." },
      { status: 500 }
    );
  }
}
