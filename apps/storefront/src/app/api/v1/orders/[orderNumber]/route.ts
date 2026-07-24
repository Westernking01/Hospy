import { NextResponse } from "next/server";
import { getOrderByNumber } from "@hopsy/commerce";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order details fetched successfully.",
      data: order,
    });
  } catch (err: any) {
    console.error("GET /api/v1/orders/[orderNumber] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch order details." },
      { status: 500 }
    );
  }
}
