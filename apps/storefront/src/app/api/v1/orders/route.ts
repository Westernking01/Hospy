import { NextResponse } from "next/server";
import { getOrderHistory } from "@hopsy/commerce";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || null;
    const email = searchParams.get("email") || null;

    const orders = await getOrderHistory(userId, email);

    return NextResponse.json({
      success: true,
      message: "Order history fetched successfully.",
      data: orders,
    });
  } catch (err: any) {
    console.error("GET /api/v1/orders error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch order history." },
      { status: 500 }
    );
  }
}
