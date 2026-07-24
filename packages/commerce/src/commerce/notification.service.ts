import type { EnterpriseOrder } from "./order.service";

export interface EmailNotificationPayload {
  recipientEmail: string;
  recipientName: string;
  subject: string;
  templateName:
    | "ORDER_CONFIRMATION"
    | "PAYMENT_CONFIRMATION"
    | "SHIPPING_CONFIRMATION"
    | "ORDER_DELIVERED"
    | "ORDER_CANCELLED"
    | "REFUND_NOTIFICATION"
    | "ABANDONED_CART";
  orderData?: EnterpriseOrder | null;
  customMessage?: string;
  sentAt: string;
}

export async function sendOrderNotification(
  templateName: EmailNotificationPayload["templateName"],
  order: EnterpriseOrder,
  customMessage?: string
): Promise<EmailNotificationPayload> {
  const subjects: Record<EmailNotificationPayload["templateName"], string> = {
    ORDER_CONFIRMATION: `Order Confirmed: ${order.orderNumber} — HOPSY PLAZA Electronics`,
    PAYMENT_CONFIRMATION: `Payment Receipt: ${order.orderNumber} — HOPSY PLAZA Electronics`,
    SHIPPING_CONFIRMATION: `Your Order ${order.orderNumber} Has Been Shipped!`,
    ORDER_DELIVERED: `Delivery Confirmation: Order ${order.orderNumber} — Enjoy Your New Tech!`,
    ORDER_CANCELLED: `Order Cancellation Notice: ${order.orderNumber}`,
    REFUND_NOTIFICATION: `Refund Initiated for Order ${order.orderNumber}`,
    ABANDONED_CART: `Did you forget something at HOPSY PLAZA? Complete your checkout!`,
  };

  const payload: EmailNotificationPayload = {
    recipientEmail: order.customerEmail,
    recipientName: order.customerName,
    subject: subjects[templateName],
    templateName,
    orderData: order,
    customMessage,
    sentAt: new Date().toISOString(),
  };

  // Log dispatch in production / development console
  console.log(`[COMMERCE_NOTIFICATION] Dispatching email: ${payload.subject} -> ${payload.recipientEmail}`);

  return payload;
}
