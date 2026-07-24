import { NextResponse } from "next/server";
import { cancelOrder } from "@hopsy/commerce";
import { sendOrderNotification } from "@hopsy/commerce";
import { OrderCancelSchema } from "@hopsy/validation";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    const body = await req.json();
    const parsed = OrderCancelSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid cancellation request.", errors: parsed.error.format() },
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
    console.error("POST /api/v1/orders/[orderNumber]/cancel error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to cancel order." },
      { status: 500 }
    );
  }
}
