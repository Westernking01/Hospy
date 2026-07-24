import { NextResponse } from "next/server";
import { getShippingOptions } from "@hopsy/commerce";
import { ShippingCalculationSchema } from "@hopsy/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ShippingCalculationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid shipping parameters.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const options = await getShippingOptions(parsed.data);

    return NextResponse.json({
      success: true,
      message: "Shipping options calculated.",
      data: options,
    });
  } catch (err: any) {
    console.error("POST /api/v1/shipping error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to calculate shipping." },
      { status: 500 }
    );
  }
}
