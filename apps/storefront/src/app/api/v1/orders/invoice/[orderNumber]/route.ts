import { NextResponse } from "next/server";
import { getOrderByNumber } from "@hopsy/commerce";

/**
 * GET /api/v1/orders/invoice/[orderNumber]
 * Generate structured invoice JSON / PDF metadata for an order
 */
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

    const invoiceData = {
      invoiceNumber: `INV-${order.orderNumber.replace("ORD-", "")}`,
      orderNumber: order.orderNumber,
      issuedDate: order.createdAt.toISOString().slice(0, 10),
      dueDate: order.createdAt.toISOString().slice(0, 10),
      seller: {
        name: "HOPSY PLAZA ELECTRONICS LTD",
        addressLine1: "75 Ureje, Beside Immigration Office, Poly Road",
        city: "Ado-Ekiti",
        state: "Ekiti State",
        country: "Nigeria",
        phone: "+234 803 000 0000",
        email: "billing@hopsyplaza.com",
        tinNumber: "TIN-99283746-NG",
      },
      buyer: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
      },
      lineItems: order.items.map((i) => ({
        description: i.name,
        sku: i.sku,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalAmount: i.totalPrice,
      })),
      financialBreakdown: {
        subtotal: order.subtotal,
        discountAmount: order.discountAmount,
        couponApplied: order.couponCode || "None",
        shippingMethod: order.shippingMethodName,
        shippingFee: order.shippingAmount,
        taxClass: "Standard Electronics VAT (7.5%)",
        taxAmount: order.taxAmount,
        totalPayable: order.totalAmount,
        currency: "NGN",
      },
      paymentDetails: {
        status: order.paymentStatus,
        method: order.paymentMethod,
        terms: "Immediate settlement upon order creation or pickup.",
      },
    };

    return NextResponse.json({
      success: true,
      message: "Invoice generated successfully.",
      data: invoiceData,
    });
  } catch (err: any) {
    console.error("GET /api/v1/orders/invoice/[orderNumber] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to generate invoice." },
      { status: 500 }
    );
  }
}
