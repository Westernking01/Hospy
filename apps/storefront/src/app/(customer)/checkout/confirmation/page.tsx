"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  CreditCard,
  Building2,
  Clock,
  Download,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { Button } from "@hopsy/ui";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumberParam = searchParams.get("orderNumber") || "ORD-20260710-8842";
  const referenceParam = searchParams.get("reference") || "REF_PSTK_8842";

  const [order, setOrder] = useState<any>(null);
  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    async function fetchOrderDetails() {
      setIsLoading(true);
      try {
        const [orderRes, invoiceRes] = await Promise.all([
          fetch(`/api/v1/orders/${orderNumberParam}`),
          fetch(`/api/v1/orders/invoice/${orderNumberParam}`),
        ]);

        if (orderRes.ok) {
          const json = await orderRes.json();
          if (json.success && json.data) {
            setOrder(json.data);
            if (json.data.paymentStatus === "PAID") {
              setPaymentVerified(true);
            }
          }
        }
        if (invoiceRes.ok) {
          const invJson = await invoiceRes.json();
          if (invJson.success && invJson.data) {
            setInvoice(invJson.data);
          }
        }
      } catch (err) {
        console.error("Error fetching confirmation data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrderDetails();
  }, [orderNumberParam]);

  const handleSimulateVerifyPayment = async () => {
    setIsVerifyingPayment(true);
    try {
      const res = await fetch("/api/v1/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: referenceParam,
          orderNumber: orderNumberParam,
        }),
      });
      const json = await res.json();
      if (json.success && json.data?.status === "PAID") {
        setPaymentVerified(true);
        if (order) {
          setOrder({ ...order, paymentStatus: "PAID", status: "PROCESSING" });
        }
      }
    } catch (err) {
      console.error("Payment verification failed:", err);
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!invoice) return;
    const blob = new Blob([JSON.stringify(invoice, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoice.invoiceNumber || orderNumberParam}_invoice.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-neutral-900 font-sans px-4">
        <div className="w-12 h-12 rounded-full border-4 border-neutral-200 border-t-neutral-900 animate-spin mb-4" />
        <h2 className="text-lg font-bold">Retrieving Order {orderNumberParam}...</h2>
        <p className="text-sm text-neutral-500 mt-1">Please wait while we prepare your official invoice.</p>
      </div>
    );
  }

  const currentOrder = order || {
    orderNumber: orderNumberParam,
    status: "PROCESSING",
    paymentStatus: paymentVerified ? "PAID" : "PENDING",
    paymentMethod: "PAYSTACK",
    totalAmount: 1306125,
    shippingMethodName: "Store Pickup at HOPSY PLAZA Warehouse (Ado-Ekiti)",
    customerName: "Chief Ademola Adeleke",
    customerEmail: "ademola.adeleke@example.com",
    items: [
      {
        name: "Sony WH-1000XM5 Wireless Headphones (Midnight Black)",
        quantity: 1,
        unitPrice: 580000,
        totalPrice: 580000,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-neutral-950 font-sans pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-6">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <Link href="/cart" className="hover:text-neutral-950 transition-colors">Cart</Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-semibold">Order Confirmed</span>
        </nav>

        {/* Hero Confirmation Banner */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 sm:p-10 shadow-sm mb-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-neutral-600 max-w-lg mx-auto text-sm sm:text-base mb-6">
            We have received your order <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">{currentOrder.orderNumber}</span> and reserved your hardware items in our high-security vault.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-[#F4F3EF] px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold border border-neutral-200">
            <span className="flex items-center gap-1.5 text-neutral-700">
              <Package className="w-4 h-4 text-neutral-500" />
              Status: <span className="text-neutral-900 uppercase">{currentOrder.status}</span>
            </span>
            <span className="text-neutral-300">|</span>
            <span className="flex items-center gap-1.5 text-neutral-700">
              <CreditCard className="w-4 h-4 text-neutral-500" />
              Payment:{" "}
              <span className={`uppercase font-bold ${currentOrder.paymentStatus === "PAID" ? "text-emerald-600" : "text-amber-600"}`}>
                {currentOrder.paymentStatus}
              </span>
            </span>
          </div>

          {currentOrder.paymentStatus !== "PAID" && (
            <div className="mt-6 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-xs text-neutral-500 font-medium">
                Payment Verification Pending for ({referenceParam})
              </span>
              <Button
                onClick={handleSimulateVerifyPayment}
                disabled={isVerifyingPayment}
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                {isVerifyingPayment ? "Verifying with Gateway..." : "Confirm & Verify Payment"}
                <CheckCircle2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Order Details & Invoice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Items Card */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-neutral-500" />
                  Reserved Hardware Snapshot
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  {currentOrder.items?.length || 1} item(s)
                </span>
              </div>
              <div className="divide-y divide-neutral-100 space-y-4">
                {(currentOrder.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">{item.name}</h4>
                      <p className="text-xs font-mono text-neutral-500 mt-0.5">
                        Qty: {item.quantity || 1} × ₦{Number(item.unitPrice || item.price || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right font-mono font-bold text-sm text-neutral-900">
                      ₦{Number(item.totalPrice || (item.unitPrice || item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery / Pickup Information */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2 mb-4">
                <Truck className="w-4 h-4 text-neutral-500" />
                Logistics & Dispatch Plan
              </h3>
              <div className="bg-[#F4F3EF] rounded-xl p-4 text-sm font-medium text-neutral-800 border border-neutral-200">
                <p className="font-bold text-neutral-950 mb-1">{currentOrder.shippingMethodName}</p>
                <p className="text-xs text-neutral-600">
                  {currentOrder.shippingMethodName?.includes("Pickup")
                    ? "Flagship Center: 75 Ureje, Beside Immigration Office, Poly Road, Ado-Ekiti, Ekiti State."
                    : `Recipient: ${currentOrder.customerName} (${currentOrder.customerEmail})`}
                </p>
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <h3 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b border-neutral-100">
                Financial Summary
              </h3>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono">₦{Number(currentOrder.subtotal || currentOrder.totalAmount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping Fee</span>
                  <span className="font-mono">₦{Number(currentOrder.shippingAmount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>VAT (7.5%)</span>
                  <span className="font-mono">₦{Number(currentOrder.taxAmount || 0).toLocaleString()}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between items-center text-base font-black text-neutral-900">
                  <span>Total Paid / Due</span>
                  <span className="font-mono text-lg">₦{Number(currentOrder.totalAmount || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                <Button
                  onClick={handleDownloadInvoice}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download Official Invoice (.json)
                </Button>

                <Link href="/account" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    View Order in Account Dashboard
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <ShieldCheck className="w-5 h-5" />
                100% Authenticity Guarantee
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                All HOPSY PLAZA electronics are sealed, serialized, and backed by direct manufacturer warranty + our 30-day no-hassle return protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F4F3EF] text-neutral-900 font-sans">
          <div className="w-10 h-10 border-4 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
