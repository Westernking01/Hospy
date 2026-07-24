import { NextResponse } from "next/server";
import { prisma } from "@hopsy/database";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { auth_user_id, email, first_name, last_name } = body;

    if (!auth_user_id || !email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (auth_user_id, email)." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        auth_user_id,
        email: email.toLowerCase(),
        first_name: first_name || email.split("@")[0],
        last_name: last_name || "Customer",
        is_active: true,
        is_verified: true, // Auto-verified for now
      },
    });

    return NextResponse.json({
      success: true,
      message: "Customer created successfully.",
      data: customer,
    });
  } catch (err: any) {
    console.error("POST /api/v1/auth/register error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create customer." },
      { status: 500 }
    );
  }
}
