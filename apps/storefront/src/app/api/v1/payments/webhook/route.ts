import { NextResponse } from "next/server";
import { processPaystackWebhook } from "@hopsy/commerce";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-paystack-signature") || "";
    const rawBody = await req.text();

    const result = await processPaystackWebhook(rawBody, signature);

    if (!result.processed) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (err: any) {
    console.error("POST /api/v1/payments/webhook error:", err);
    return NextResponse.json(
      { success: false, message: "Webhook processing error." },
      { status: 500 }
    );
  }
}
