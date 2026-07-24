import { NextResponse } from "next/server";
import { getUserAddresses, createAddress } from "@hopsy/commerce";
import { AddressCreateSchema } from "@hopsy/validation";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "guest-user";

    const addresses = await getUserAddresses(userId);

    return NextResponse.json({
      success: true,
      message: "Addresses fetched successfully.",
      data: addresses,
    });
  } catch (err: any) {
    console.error("GET /api/v1/addresses error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch addresses." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userId || "guest-user";

    const parsed = AddressCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid address details.",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const newAddress = await createAddress(userId, parsed.data);

    return NextResponse.json({
      success: true,
      message: "Address saved successfully.",
      data: newAddress,
    });
  } catch (err: any) {
    console.error("POST /api/v1/addresses error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create address." },
      { status: 500 }
    );
  }
}
