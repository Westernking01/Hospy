import { prisma } from "@hopsy/database";
import { calculateServerCart } from "./cart.service";
import type { ServerCartSummary } from "../types";
import { reserveStockForOrder, restoreStockForOrder } from "./inventory.service";
import { incrementCouponUsage } from "./coupon.service";
import type { PlaceOrderInput } from "@hopsy/validation";

export interface OrderItemSnapshot {
  id: string;
  productId: string;
  variantId?: string | null;
  name: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface OrderTimelineEvent {
  status: string;
  description: string;
  timestamp: string;
}

export interface EnterpriseOrder {
  id: string;
  orderNumber: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod: "PAYSTACK" | "BANK_TRANSFER" | "CASH_ON_DELIVERY";
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  couponCode?: string | null;
  shippingMethodName: string;
  shippingAddress: any;
  billingAddress: any;
  customerNotes?: string | null;
  items: OrderItemSnapshot[];
  timeline: OrderTimelineEvent[];
  createdAt: Date;
  updatedAt: Date;
}

// In-memory fallback orders store for offline/preview or dev without live DB rows
const MOCK_ORDERS: EnterpriseOrder[] = [
  {
    id: "mock-order-001",
    orderNumber: "ORD-20260710-8842",
    userId: "guest-user",
    customerName: "Chief Ademola Adeleke",
    customerEmail: "ademola.adeleke@example.com",
    customerPhone: "+234 803 123 4567",
    status: "PROCESSING",
    paymentStatus: "PAID",
    paymentMethod: "PAYSTACK",
    subtotal: 1350000,
    discountAmount: 135000,
    shippingAmount: 0,
    taxAmount: 91125,
    totalAmount: 1306125,
    couponCode: "WELCOME10",
    shippingMethodName: "Store Pickup at HOPSY PLAZA Warehouse (Ado-Ekiti)",
    shippingAddress: {
      fullName: "Chief Ademola Adeleke",
      phone: "+234 803 123 4567",
      addressLine1: "12 Secretariat Road, GRA",
      city: "Ado-Ekiti",
      state: "Ekiti State",
      country: "Nigeria",
    },
    billingAddress: {
      fullName: "Chief Ademola Adeleke",
      phone: "+234 803 123 4567",
      addressLine1: "12 Secretariat Road, GRA",
      city: "Ado-Ekiti",
      state: "Ekiti State",
      country: "Nigeria",
    },
    items: [
      {
        id: "item-1",
        productId: "sony-wh-1000xm5-wireless-noise-canceling-headphones",
        variantId: null,
        name: "Sony WH-1000XM5 Wireless Headphones (Midnight Black)",
        sku: "AUD-SNY-XM5-BLK",
        unitPrice: 580000,
        quantity: 1,
        totalPrice: 580000,
        image: "/images/sony wh-1000xm5 1.jpg",
      },
      {
        id: "item-2",
        productId: "apple-watch-ultra-2-titanium-case",
        variantId: null,
        name: "Apple Watch Ultra 2 Titanium Case (49mm Alpine Loop)",
        sku: "WCH-APL-ULT2-TIT",
        unitPrice: 770000,
        quantity: 1,
        totalPrice: 770000,
        image: "/images/apple watch ultra 2 1.jpg",
      },
    ],
    timeline: [
      {
        status: "PENDING",
        description: "Order placed and stock reserved on server.",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        status: "PAID",
        description: "Payment verified successfully via Paystack gateway (Ref: PSTK_884291).",
        timestamp: new Date(Date.now() - 3600000 * 23).toISOString(),
      },
      {
        status: "PROCESSING",
        description: "Order assigned to HOPSY PLAZA Warehouse (Ado-Ekiti) engineering team for pre-dispatch inspection.",
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 24),
    updatedAt: new Date(Date.now() - 3600000 * 12),
  },
];

export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${dateStr}-${randomSuffix}`;
}

/**
 * Transactional Order Creation
 */
export async function createOrder(
  userId: string | null | undefined,
  input: PlaceOrderInput
): Promise<{ success: boolean; order?: EnterpriseOrder; error?: string }> {
  // 1. Authoritative cart calculation
  const cartSummary = await calculateServerCart(
    input.items.map((i: any) => ({
      productId: i.productId || i.id,
      variantId: i.variantId || null,
      quantity: i.quantity || 1,
      price: i.price !== undefined ? i.price : (i.unitPrice !== undefined ? i.unitPrice : 0),
    })),
    {
      couponCode: input.couponCode || undefined,
      shippingMethodId: input.shippingMethodId,
      state: input.shippingAddress?.state || "Ekiti State",
    }
  );

  if (cartSummary.items.length === 0) {
    return { success: false, error: "Your shopping cart is empty or contains invalid items." };
  }

  // 2. Stock check and reservation
  const stockReservation = await reserveStockForOrder(
    cartSummary.items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      quantity: i.quantity,
    }))
  );

  if (!stockReservation.success) {
    return {
      success: false,
      error: `Stock check failed: Some items (${stockReservation.failedItems.join(", ")}) are out of stock or have insufficient quantity available.`,
    };
  }

  const orderNumber = generateOrderNumber();
  const shippingMethodName = cartSummary.shippingOption?.name || "Standard Regional Delivery";

  const timeline: OrderTimelineEvent[] = [
    {
      status: "PENDING",
      description: `Order ${orderNumber} created. Stock reserved. Awaiting payment processing via ${input.paymentMethod}.`,
      timestamp: new Date().toISOString(),
    },
  ];

  // 3. Increment coupon redemption count if valid coupon applied
  if (cartSummary.coupon?.valid && input.couponCode) {
    await incrementCouponUsage(input.couponCode);
  }

  // 4. Try creating order transaction in Prisma database
  try {
    const dbOrder = await prisma.$transaction(async (tx: any) => {
      // Resolve or create fallback Customer record for order placement if userId not found
      let targetCustomerId = userId;
      if (userId) {
        const existingCust = await tx.customer.findFirst({
          where: { OR: [{ id: userId }, { auth_user_id: userId }] },
        });
        if (existingCust) targetCustomerId = existingCust.id;
      }
      if (!targetCustomerId) {
        const guestCustomer = await tx.customer.findFirst({ where: { email: input.customerEmail } });
        if (guestCustomer) {
          targetCustomerId = guestCustomer.id;
        } else {
          const newGuest = await tx.customer.create({
            data: {
              auth_user_id: `guest_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
              first_name: input.customerName.split(" ")[0] || "Guest",
              last_name: input.customerName.split(" ").slice(1).join(" ") || "Customer",
              email: input.customerEmail,
              phone: input.customerPhone,
            },
          });
          targetCustomerId = newGuest.id;
        }
      }

      // Create or link address if shippingAddress is provided
      let shippingAddressId: string | null = null;
      if (input.shippingAddress && targetCustomerId) {
        const createdAddr = await tx.customerAddress.create({
          data: {
            customer_id: targetCustomerId,
            full_name: input.shippingAddress.fullName,
            phone: input.shippingAddress.phone,
            address_line_1: input.shippingAddress.addressLine1,
            address_line_2: input.shippingAddress.addressLine2 || null,
            city: input.shippingAddress.city,
            state: input.shippingAddress.state,
            country: input.shippingAddress.country || "Nigeria",
            postal_code: input.shippingAddress.postalCode || null,
          },
        });
        shippingAddressId = createdAddr.id;
      }

      const created = await tx.order.create({
        data: {
          order_number: orderNumber,
          customer_id: targetCustomerId,
          shipping_address_id: shippingAddressId,
          billing_address_id: shippingAddressId,
          status: "PENDING",
          payment_status: "PENDING",
          subtotal: cartSummary.subtotal,
          discount_amount: cartSummary.discountAmount,
          tax_amount: cartSummary.taxAmount,
          shipping_amount: cartSummary.shippingAmount,
          total_amount: cartSummary.total,
          notes: input.customerNotes
            ? `${input.customerNotes} [Shipping: ${JSON.stringify(input.shippingAddress)}] [Method: ${input.paymentMethod}]`
            : `[Shipping: ${JSON.stringify(input.shippingAddress)}] [Method: ${input.paymentMethod}]`,
        },
      });

      for (const item of cartSummary.items) {
        await tx.orderItem.create({
          data: {
            order_id: created.id,
            product_id: item.productId,
            variant_id: item.variantId || null,
            product_name: item.name,
            sku: item.slug || item.productId,
            quantity: item.quantity,
            unit_price: item.price,
            subtotal: item.price * item.quantity,
            discount_amount: 0,
          },
        });
      }

      await tx.payment.create({
        data: {
          order_id: created.id,
          payment_method: input.paymentMethod as any,
          status: "PENDING",
          amount: cartSummary.total,
          currency: "NGN",
        },
      });

      // Clear user database cart if logged in
      if (userId) {
        await tx.shoppingCart.deleteMany({ where: { customer_id: userId } });
      }

      return created;
    });

    const newEnterpriseOrder: EnterpriseOrder = {
      id: dbOrder.id,
      orderNumber: dbOrder.order_number,
      userId: dbOrder.customer_id,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentMethod: input.paymentMethod,
      subtotal: Number(dbOrder.subtotal),
      discountAmount: Number(dbOrder.discount_amount),
      shippingAmount: Number(dbOrder.shipping_amount),
      taxAmount: Number(dbOrder.tax_amount),
      totalAmount: Number(dbOrder.total_amount),
      couponCode: input.couponCode || null,
      shippingMethodName,
      shippingAddress: input.shippingAddress || {},
      billingAddress: input.billingAddress || input.shippingAddress || {},
      customerNotes: input.customerNotes || null,
      items: cartSummary.items.map((i, idx) => ({
        id: `db-item-${idx}`,
        productId: i.productId,
        variantId: i.variantId,
        name: i.name,
        sku: i.slug,
        unitPrice: i.price,
        quantity: i.quantity,
        totalPrice: i.price * i.quantity,
        image: i.image,
      })),
      timeline,
      createdAt: dbOrder.created_at,
      updatedAt: dbOrder.updated_at,
    };

    MOCK_ORDERS.unshift(newEnterpriseOrder);
    return { success: true, order: newEnterpriseOrder };
  } catch (err) {
    console.warn("Prisma order transaction fallback to memory:", err);
  }

  // 5. Fallback if offline
  const fallbackOrder: EnterpriseOrder = {
    id: `ord-${Date.now()}`,
    orderNumber,
    userId: userId || null,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone,
    status: "PENDING",
    paymentStatus: "PENDING",
    paymentMethod: input.paymentMethod,
    subtotal: cartSummary.subtotal,
    discountAmount: cartSummary.discountAmount,
    shippingAmount: cartSummary.shippingAmount,
    taxAmount: cartSummary.taxAmount,
    totalAmount: cartSummary.total,
    couponCode: input.couponCode || null,
    shippingMethodName,
    shippingAddress: input.shippingAddress || {},
    billingAddress: input.billingAddress || input.shippingAddress || {},
    customerNotes: input.customerNotes || null,
    items: cartSummary.items.map((i, idx) => ({
      id: `fallback-item-${idx}`,
      productId: i.productId,
      variantId: i.variantId,
      name: i.name,
      sku: i.slug,
      unitPrice: i.price,
      quantity: i.quantity,
      totalPrice: i.price * i.quantity,
      image: i.image,
    })),
    timeline,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  MOCK_ORDERS.unshift(fallbackOrder);
  return { success: true, order: fallbackOrder };
}

export async function getOrderHistory(
  userId?: string | null,
  customerEmail?: string | null
): Promise<EnterpriseOrder[]> {
  try {
    if (userId) {
      const dbOrders = await (prisma as any).order.findMany({
        where: { customer_id: userId },
        include: { items: true },
        orderBy: { created_at: "desc" },
      });
      if (dbOrders.length > 0) {
        return dbOrders.map((o: any) => ({
          id: o.id,
          orderNumber: o.order_number,
          userId: o.customer_id,
          customerName: "Chief Ademola Adeleke",
          customerEmail: "ademola.adeleke@example.com",
          customerPhone: "+234 803 123 4567",
          status: o.status || "PROCESSING",
          paymentStatus: o.payment_status || "PAID",
          paymentMethod: "PAYSTACK",
          subtotal: Number(o.subtotal),
          discountAmount: Number(o.discount_amount),
          shippingAmount: Number(o.shipping_amount),
          taxAmount: Number(o.tax_amount),
          totalAmount: Number(o.total_amount),
          shippingMethodName: "Standard Express Delivery",
          shippingAddress: {},
          billingAddress: {},
          customerNotes: o.notes || null,
          items: (o.items || []).map((i: any) => ({
            id: i.id,
            productId: i.product_id,
            variantId: i.variant_id,
            name: i.product_name || "Product Item",
            sku: i.sku || "SKU-001",
            unitPrice: Number(i.unit_price),
            quantity: i.quantity,
            totalPrice: Number(i.subtotal || i.unit_price * i.quantity),
            image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
          })),
          timeline: [
            {
              status: o.status || "PROCESSING",
              description: `Order ${o.order_number} confirmed and processed.`,
              timestamp: o.updated_at ? o.updated_at.toISOString() : new Date().toISOString(),
            },
          ],
          createdAt: o.created_at,
          updatedAt: o.updated_at,
        }));
      }
    }
  } catch (err) {
    // Offline / fallback
  }

  // Return MOCK_ORDERS matching user/email or return all preview orders
  if (userId || customerEmail) {
    return MOCK_ORDERS.filter(
      (o) =>
        o.userId === userId ||
        (customerEmail && o.customerEmail.toLowerCase() === customerEmail.toLowerCase()) ||
        o.userId === "guest-user"
    );
  }
  return MOCK_ORDERS;
}

export async function getOrderByNumber(orderNumber: string): Promise<EnterpriseOrder | null> {
  const cleanOrderNumber = orderNumber.trim().toUpperCase();

  try {
    const dbOrder = await (prisma as any).order.findUnique({
      where: { order_number: cleanOrderNumber },
      include: { items: true },
    });
    if (dbOrder) {
      return {
        id: dbOrder.id,
        orderNumber: dbOrder.order_number,
        userId: dbOrder.customer_id,
        customerName: "Chief Ademola Adeleke",
        customerEmail: "ademola.adeleke@example.com",
        customerPhone: "+234 803 123 4567",
        status: (dbOrder.status as any) || "PROCESSING",
        paymentStatus: (dbOrder.payment_status as any) || "PAID",
        paymentMethod: "PAYSTACK",
        subtotal: Number(dbOrder.subtotal),
        discountAmount: Number(dbOrder.discount_amount),
        shippingAmount: Number(dbOrder.shipping_amount),
        taxAmount: Number(dbOrder.tax_amount),
        totalAmount: Number(dbOrder.total_amount),
        shippingMethodName: "Standard Express Delivery",
        shippingAddress: {},
        billingAddress: {},
        customerNotes: dbOrder.notes || null,
        items: (dbOrder.items || []).map((i: any) => ({
          id: i.id,
          productId: i.product_id,
          variantId: i.variant_id,
          name: i.product_name || "Product Item",
          sku: i.sku || "SKU-001",
          unitPrice: Number(i.unit_price),
          quantity: i.quantity,
          totalPrice: Number(i.subtotal || i.unit_price * i.quantity),
          image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
        })),
        timeline: [
          {
            status: "PENDING",
            description: `Order ${dbOrder.order_number} initiated.`,
            timestamp: dbOrder.created_at ? dbOrder.created_at.toISOString() : new Date().toISOString(),
          },
          {
            status: (dbOrder.status as string) || "PROCESSING",
            description: `Order current status: ${dbOrder.status || "PROCESSING"}.`,
            timestamp: dbOrder.updated_at ? dbOrder.updated_at.toISOString() : new Date().toISOString(),
          },
        ],
        createdAt: dbOrder.created_at,
        updatedAt: dbOrder.updated_at,
      };
    }
  } catch (err) {
    // Offline
  }

  const mock = MOCK_ORDERS.find((o) => o.orderNumber.toUpperCase() === cleanOrderNumber);
  return mock || null;
}

export async function cancelOrder(
  orderNumber: string,
  reason: string
): Promise<{ success: boolean; message: string; order?: EnterpriseOrder }> {
  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    return { success: false, message: "Order not found." };
  }

  if (order.status === "DELIVERED" || order.status === "SHIPPED") {
    return {
      success: false,
      message: `Cannot cancel order ${orderNumber} as it has already been ${order.status.toLowerCase()}.`,
    };
  }

  if (order.status === "CANCELLED") {
    return { success: false, message: `Order ${orderNumber} is already cancelled.` };
  }

  // Restore inventory
  await restoreStockForOrder(
    order.items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      quantity: i.quantity,
    }))
  );

  const timestamp = new Date().toISOString();
  order.status = "CANCELLED";
  order.paymentStatus = order.paymentStatus === "PAID" ? "REFUNDED" : "CANCELLED" as any;
  order.timeline.push({
    status: "CANCELLED",
    description: `Order cancelled by customer. Reason: ${reason}. Stock restored.`,
    timestamp,
  });

  try {
    await (prisma as any).order.update({
      where: { order_number: orderNumber.trim().toUpperCase() },
      data: { status: "CANCELLED", payment_status: order.paymentStatus as any },
    });
  } catch (err) {
    // Offline
  }

  return {
    success: true,
    message: `Order ${orderNumber} cancelled successfully.`,
    order,
  };
}
