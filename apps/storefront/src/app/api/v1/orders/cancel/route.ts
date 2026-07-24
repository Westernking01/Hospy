import { NextResponse } from "next/server";
import { cancelOrder } from "@hopsy/commerce";
import { sendOrderNotification } from "@hopsy/commerce";
import { OrderCancelSchema } from "@hopsy/validation";

/**
 * POST /api/v1/orders/cancel
 * Cancel an existing order by orderNumber and reason, releasing reserved stock
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderNumber, reason } = body;

    if (!orderNumber || typeof orderNumber !== "string") {
      return NextResponse.json(
        { success: false, message: "Valid orderNumber is required." },
        { status: 400 }
      );
    }

    const parsed = OrderCancelSchema.safeParse({ reason: reason || "Customer requested cancellation" });
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid cancellation reason.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const res = await cancelOrder(orderNumber, parsed.data.reason);
    if (!res.success) {
      return NextResponse.json({ success: false, message: res.message }, { status: 400 });
    }

    if (res.order) {
      await sendOrderNotification("ORDER_CANCELLED", res.order, parsed.data.reason);
    }

    return NextResponse.json({
      success: true,
      message: res.message,
      data: res.order,
    });
  } catch (err: any) {
    console.error("POST /api/v1/orders/cancel error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to cancel order." },
      { status: 500 }
    );
  }
}
