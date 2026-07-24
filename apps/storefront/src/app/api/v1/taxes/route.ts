import { NextResponse } from "next/server";
import { calculateTax } from "@hopsy/commerce";
import { TaxCalculationSchema } from "@hopsy/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = TaxCalculationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid tax calculation payload.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const breakdown = calculateTax(parsed.data);

    return NextResponse.json({
      success: true,
      message: "Tax calculated successfully.",
      data: breakdown,
    });
  } catch (err: any) {
    console.error("POST /api/v1/taxes error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to calculate tax." },
      { status: 500 }
    );
  }
}
