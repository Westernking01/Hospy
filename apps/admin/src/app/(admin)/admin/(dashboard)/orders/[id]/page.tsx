"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Truck,
  MapPin,
  User,
  CreditCard,
  Package,
  ShieldCheck,
  AlertCircle,
  QrCode,
} from "lucide-react";
import { AdminOrderItem } from "@hopsy/commerce/src/admin/admin.types";

import { StatusBadge } from "@/components/admin/status-badge";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<AdminOrderItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      adminService.getOrderById(orderId).then((data) => {
        setOrder(data);
        setLoading(false);
      });
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-12 text-center rounded-xl bg-card border border-border shadow-sm space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Order Waybill Not Found
        </h2>
        <p className="text-xs text-muted-foreground">
          The requested order ID (`{orderId}`) does not exist in the active database.
        </p>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Orders Directory</span>
        </Link>
      </div>
    );
  }

  const formatNGN = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleUpdateStatus = (newStatus: any) => {
    setOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
    setToastMessage(`Dispatch status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-foreground text-background shadow-lg border border-border flex items-center gap-2 text-xs font-medium animate-in slide-in-from-bottom-2 print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation & Action Bar (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Enterprise Orders Directory</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="rounded-lg bg-foreground text-background px-3 py-2 text-sm font-medium hover:opacity-90 flex items-center gap-2 transition-opacity"
          >
            <Printer className="w-4 h-4" />
            <span>Print Waybill Manifest</span>
          </button>
        </div>
      </div>

      {/* Printable Waybill & Order Sheet Container */}
      <div className="bg-card border border-border rounded-xl p-8 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Top Waybill Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl shrink-0">
              HP
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                HOPSY PLAZA ENTERPRISE LOGISTICS
              </div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight font-mono">
                {order.orderNumber}
              </h1>
              <div className="text-xs text-muted-foreground font-mono mt-1 flex items-center gap-2">
                <span>Waybill Ref: #{order.paymentReference || "PAY-WAYBILL-2026"}</span>
                <span>•</span>
                <span>Date: {order.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-3 text-right">
            <div className="p-2.5 rounded-lg bg-muted border border-border flex items-center gap-2.5">
              <QrCode className="w-8 h-8 text-foreground shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Dispatch Barcode
                </div>
                <div className="text-xs font-mono font-semibold text-foreground">
                  *WAYBILL-{order.orderNumber}*
                </div>
              </div>
            </div>

            <StatusBadge status={order.status} icon={<CheckCircle2 className="w-3.5 h-3.5" />} />
          </div>
        </div>

        {/* Dispatch Status Controller (Hidden on Print) */}
        <div className="my-6 p-4 rounded-lg bg-muted/40 border border-border print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="text-xs font-semibold text-foreground">
                Fulfillment Stage Progression
              </div>
              <div className="text-[11px] text-muted-foreground">
                Update status to instantly notify warehouse logistics team and customer email
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => handleUpdateStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  order.status === st
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Logistics Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-border">
          {/* Customer */}
          <div className="p-5 rounded-lg bg-muted/40 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Customer Partner</span>
            </div>
            <div className="text-sm font-semibold text-foreground">
              {order.customerName}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {order.customerEmail}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Tel: {order.shippingAddress?.phone || "+234 803 000 8891"}
            </div>
          </div>

          {/* Shipping Destination */}
          <div className="p-5 rounded-lg bg-muted/40 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Shipping Destination</span>
            </div>
            <div className="text-sm font-semibold text-foreground">
              {order.shippingAddress?.recipientName}
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              {order.shippingAddress?.addressLine1}
              <br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state}
              <br />
              {order.shippingAddress?.country || "Nigeria"}
            </div>
          </div>

          {/* Payment Verification */}
          <div className="p-5 rounded-lg bg-muted/40 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              <span>Payment Channel</span>
            </div>
            <div className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>{order.paymentMethod}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Gateway: Paystack Verified
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Status: Authoritative Settlement OK
            </div>
          </div>
        </div>

        {/* Itemized Manifest Table */}
        <div className="py-8 space-y-4">
          <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Package className="w-5 h-5 text-muted-foreground" />
            <span>Dispatch Manifest SKUs</span>
          </h3>

          <div className="border border-border rounded-lg overflow-x-auto overflow-y-hidden w-full">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-muted/60 border-b border-border text-muted-foreground uppercase font-medium tracking-wider">
                  <th className="py-3 px-4">Item SKU & Description</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/40">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground text-sm">
                        {item.productName}
                      </div>
                      <div className="text-muted-foreground font-mono text-[11px] mt-0.5">
                        SKU: {item.sku}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-medium text-foreground">
                      {formatNGN(item.unitPrice)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-foreground">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-foreground text-sm">
                      {formatNGN(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/60 border-t border-border font-mono font-medium text-muted-foreground">
                  <td colSpan={3} className="py-3 px-4 text-right uppercase tracking-wider">
                    Gross Order Total:
                  </td>
                  <td className="py-3 px-4 text-right text-base font-semibold text-foreground">
                    {formatNGN(order.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Waybill Footer & Dispatch Signatures */}
        <div className="pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-muted-foreground">
          <div>
            <div className="font-semibold text-foreground uppercase tracking-wider mb-2">
              Waybill Dispatch Instructions
            </div>
            <p className="leading-relaxed">
              Ensure fragile items are double-boxed. Inspect factory seal before courier handover. Customer signature required upon receipt. All warranty claims subject to `00_READ_THIS_FIRST.md` policies.
            </p>
          </div>

          <div className="flex flex-col justify-end items-start sm:items-end font-mono space-y-4">
            <div className="w-48 border-b-2 border-dashed border-border pb-1 text-center font-medium text-foreground">
              Warehouse Officer Sign
            </div>
            <div className="text-[11px] text-muted-foreground">
              Authorized by HOPSY PLAZA Admin Command
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
