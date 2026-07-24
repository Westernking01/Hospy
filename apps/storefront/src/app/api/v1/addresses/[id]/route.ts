import { NextResponse } from "next/server";
import { updateAddress, deleteAddress } from "@hopsy/commerce";
import { AddressUpdateSchema } from "@hopsy/validation";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const userId = body.userId || "guest-user";

    const parsed = AddressUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid update fields.", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await updateAddress(userId, id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Address not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Address updated successfully.",
      data: updated,
    });
  } catch (err: any) {
    console.error("PATCH /api/v1/addresses/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update address." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "guest-user";

    const ok = await deleteAddress(userId, id);
    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Address not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully.",
    });
  } catch (err: any) {
    console.error("DELETE /api/v1/addresses/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete address." },
      { status: 500 }
    );
  }
}
