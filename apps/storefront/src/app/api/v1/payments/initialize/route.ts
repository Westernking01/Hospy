import { NextResponse } from "next/server";
import { initializePayment } from "@hopsy/commerce";
import { PaymentInitializeSchema } from "@hopsy/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PaymentInitializeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid payment initialization payload.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const res = await initializePayment(parsed.data);
    if (!res.success) {
      return NextResponse.json({ success: false, message: res.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: res.message,
      data: res,
    });
  } catch (err: any) {
    console.error("POST /api/v1/payments/initialize error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to initialize payment." },
      { status: 500 }
    );
  }
}
