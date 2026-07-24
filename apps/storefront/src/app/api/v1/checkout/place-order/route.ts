import { NextResponse } from "next/server";
import { createOrder } from "@hopsy/commerce";
import { initializePayment } from "@hopsy/commerce";
import { sendOrderNotification } from "@hopsy/commerce";
import { PlaceOrderSchema } from "@hopsy/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PlaceOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid order submission.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const userId = body.userId || null;

    // 1. Create order and snapshot item prices server-side
    const orderRes = await createOrder(userId, parsed.data);
    if (!orderRes.success || !orderRes.order) {
      return NextResponse.json(
        { success: false, message: orderRes.error || "Failed to create order." },
        { status: 400 }
      );
    }

    const order = orderRes.order;

    // 2. Initialize payment
    const paymentRes = await initializePayment({
      orderNumber: order.orderNumber,
      paymentMethod: parsed.data.paymentMethod,
    });

    // 3. Dispatch confirmation notification
    await sendOrderNotification("ORDER_CONFIRMATION", order);

    return NextResponse.json({
      success: true,
      message: `Order ${order.orderNumber} placed successfully.`,
      data: {
        order,
        payment: paymentRes,
      },
    });
  } catch (err: any) {
    console.error("POST /api/v1/checkout/place-order error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "An unexpected error occurred during order placement." },
      { status: 500 }
    );
  }
}
