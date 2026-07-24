"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Building2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Truck,
  ArrowRight,
  User,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/components/customer/cart-context";

import { ShopProductCard } from "@/components/customer/shop-product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";

export default function CheckoutPage() {
  const { products, categories, brands, loading } = useStorefrontData();
  if (loading) return <div>Loading...</div>;

  const router = useRouter();
  const { cartItems, cartSummary, couponCode, removeFromCart, clearCart } = useCart();

  // Form State
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [fullName, setFullName] = useState("John Doe");
  const [phone, setPhone] = useState("+234 803 123 4567");
  const [addressLine1, setAddressLine1] = useState("12B Secretariat Road, G.R.A");
  const [city, setCity] = useState("Ado-Ekiti");
  const [state, setState] = useState("Ekiti State");
  const [shippingOption, setShippingOption] = useState<"fast" | "free">("fast");
  const [paymentMethod, setPaymentMethod] = useState<"PAYSTACK" | "BANK_TRANSFER" | "CASH_ON_DELIVERY">("PAYSTACK");

  // Card details (for UI representation)
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // If cart is empty, display 2 sample hardware items so the exact screenshot layout is immediately visible
  const displayItems = useMemo(() => {
    if (cartItems.length > 0) {
      return cartItems.map((item) => ({
        id: item.id,
        productId: item.productId || item.id,
        variantId: item.variantId || null,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity || 1,
        spec: "Space Gray / Anodized Aluminum",
        returnDays: "30 Days return available",
        deliveryDate: "Sep 12, 2026",
      }));
    }
    return [
      {
        id: "sample-1",
        productId: "sample-1",
        variantId: null,
        name: "MacBook Pro M3 Max 16-Inch (64GB RAM)",
        price: 3990000,
        image: products[0]?.images[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        quantity: 1,
        spec: "Space Gray • 1TB NVMe SSD",
        returnDays: "30 Days return available",
        deliveryDate: "Sep 12, 2026",
      },
      {
        id: "sample-2",
        productId: "sample-2",
        variantId: null,
        name: "NVIDIA GeForce RTX 4090 OC Founders Edition",
        price: 2100000,
        image: products[1]?.images[0] || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
        quantity: 1,
        spec: "Midnight Matte Black • 24GB GDDR6X",
        returnDays: "30 Days return available",
        deliveryDate: "Sep 12, 2026",
      },
    ];
  }, [cartItems]);

  // Authoritative server summary check or local fallback
  const subtotal = useMemo(() => {
    if (cartSummary && cartItems.length > 0) return cartSummary.subtotal;
    return displayItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartSummary, cartItems.length, displayItems]);

  const discountAmount = useMemo(() => {
    if (cartSummary && cartItems.length > 0) return cartSummary.discountAmount;
    return 0;
  }, [cartSummary, cartItems.length]);

  const taxes = useMemo(() => {
    if (cartSummary && cartItems.length > 0) return cartSummary.taxAmount;
    return Math.round((subtotal - discountAmount) * 0.075);
  }, [cartSummary, cartItems.length, subtotal, discountAmount]);

  const shippingCost = shippingOption === "fast" ? 15000 : 0;
  const platformFee = 5000;
  const grandTotal = Math.max(0, subtotal - discountAmount + taxes + shippingCost + platformFee);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const payload = {
        customerId: "cust_guest_live",
        customerEmail: email,
        customerName: fullName,
        customerPhone: phone,
        shippingAddress: {
          fullName: fullName,
          recipientName: fullName,
          phone: phone,
          addressLine1,
          city,
          state,
          country: "Nigeria",
        },
        shippingMethodId: shippingOption === "fast" ? "ship_exp_ekiti" : "ship_pickup",
        paymentMethod,
        couponCode: couponCode || undefined,
        items: displayItems.map((i: any) => ({
          id: i.id || i.productId || "item_" + Math.random().toString(36).substr(2, 9),
          productId: i.productId || i.id,
          variantId: i.variantId || null,
          quantity: i.quantity || 1,
          price: i.price !== undefined ? i.price : (i.unitPrice !== undefined ? i.unitPrice : 0),
          unitPrice: i.price !== undefined ? i.price : (i.unitPrice !== undefined ? i.unitPrice : 0),
        })),
      };

      const res = await fetch("/api/v1/checkout/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Checkout validation failed.");
      }

      const orderNumber = json.data.order.orderNumber;
      const ref = json.data.paymentResponse?.reference || `REF_${orderNumber}`;

      clearCart();
      router.push(`/checkout/confirmation?orderNumber=${orderNumber}&reference=${ref}`);
    } catch (err: any) {
      console.error("Order submission error:", err);
      setErrorMsg(err.message || "An error occurred while placing order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans pb-24">
      {/* Top Header Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-neutral-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <Link href="/products" className="hover:text-neutral-950 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <Link href="/cart" className="hover:text-neutral-950 transition-colors">
            Cart
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <span className="font-bold text-neutral-900">Checkout</span>
        </nav>
      </div>

      {/* Main Split Layout: Order Review & Shipping (Left) vs Payment Details Form (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: My Cart & Delivery Shipping */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950">
                Express Checkout
              </h1>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-neutral-100 pb-4">
                <span className="font-bold text-sm text-neutral-800">
                  Product Review &amp; Shipping Selection
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Encrypted Direct Manufacturer Logistics
                </span>
              </div>
            </div>

            {/* Cart Hardware Cards (Beige #F4F3EF rounded-3xl container strictly following screenshot) */}
            <div className="space-y-4 pt-2">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F4F3EF] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative border border-neutral-200/60 shadow-2xs group"
                >
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                    className="absolute top-4 right-4 text-neutral-400 hover:text-rose-600 transition-colors p-1 rounded-full hover:bg-white/60"
                  >
                    <X className="w-5 h-5 font-bold" />
                  </button>

                  <div className="flex items-center gap-5 w-full sm:w-auto pr-6 sm:pr-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3 flex items-center justify-center shrink-0 border border-neutral-100 shadow-2xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-black text-neutral-950 leading-snug max-w-md">
                        {item.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-black font-mono text-neutral-950">
                          ₦{item.price.toLocaleString("en-NG")}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono line-through">
                          ₦{(item.price * 1.15).toLocaleString("en-NG")}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 font-mono">
                        Color / Spec: {item.spec}
                      </p>

                      <div className="pt-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-200/80 text-neutral-900 font-bold text-xs">
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>

                      <div className="pt-3 space-y-1 text-xs font-mono text-neutral-600 border-t border-neutral-200/40 mt-3">
                        <div className="flex items-center gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span>{item.returnDays}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-950 font-bold">
                          <Truck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                          <span>Delivered by {item.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Shipping Section (Radio Box Selector exactly matching screenshot) */}
            <div className="pt-6">
              <h3 className="font-bold text-sm text-neutral-950 mb-3">
                Delivery Shipping
              </h3>
              <div className="space-y-3">
                {/* Fast Express Delivery */}
                <label
                  onClick={() => setShippingOption("fast")}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${
                    shippingOption === "fast"
                      ? "border-2 border-neutral-950 bg-white shadow-2xs"
                      : "border border-neutral-200 hover:border-neutral-400 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingOption === "fast"}
                      onChange={() => setShippingOption("fast")}
                      className="w-4 h-4 mt-0.5 text-neutral-950 focus:ring-neutral-950 accent-neutral-950 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-neutral-950 font-mono">
                          ₦15,000 &bull; Fast Express Delivery
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        Insured &amp; expedited delivery via state courier
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 font-black text-xs sm:text-sm tracking-wider text-purple-700 bg-neutral-50 border border-neutral-200 px-3 py-1 rounded-md">
                    FedEx
                  </div>
                </label>

                {/* Free Delivery */}
                <label
                  onClick={() => setShippingOption("free")}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${
                    shippingOption === "free"
                      ? "border-2 border-neutral-950 bg-white shadow-2xs"
                      : "border border-neutral-200 hover:border-neutral-400 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingOption === "free"}
                      onChange={() => setShippingOption("free")}
                      className="w-4 h-4 mt-0.5 text-neutral-950 focus:ring-neutral-950 accent-neutral-950 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-neutral-950 font-mono">
                          Free Standard Delivery / Store Pickup
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        Pickup at Flagship Center or standard delivery
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 font-black text-xs tracking-wider text-orange-600 bg-neutral-50 border border-neutral-200 px-3 py-1 rounded-md">
                    DHL
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Payment Details Sidebar (Strict white/#FCFBF9 rounded-3xl card) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <form
              onSubmit={handleCheckoutSubmit}
              className="bg-white sm:bg-[#FCFBF9] rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6 lg:sticky lg:top-28"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                  Payment &amp; Contact Details
                </h2>
                <p className="text-xs text-neutral-500 font-mono mt-1">
                  Complete your purchase via Paystack, Bank Transfer, or COD.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Customer Full Name & Email */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-2xs placeholder:text-neutral-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@gmail.com"
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-2xs placeholder:text-neutral-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-2xs placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3 pt-3 border-t border-neutral-200/60">
                <label className="block text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" /> Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Street Address or Landmark"
                  className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-2xs placeholder:text-neutral-400"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City / Town"
                    className="h-11 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-2xs placeholder:text-neutral-400"
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="h-11 px-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-2xs"
                  >
                    <option value="Ekiti State">Ekiti State</option>
                    <option value="Lagos State">Lagos State</option>
                    <option value="Abuja FCT">Abuja FCT</option>
                    <option value="Oyo State">Oyo State</option>
                    <option value="Rivers State">Rivers State</option>
                    <option value="Kano State">Kano State</option>
                    <option value="Ondo State">Ondo State</option>
                  </select>
                </div>
              </div>

              {/* Select Payment Method */}
              <div className="space-y-2 pt-3 border-t border-neutral-200/60">
                <label className="block text-xs font-bold text-neutral-800">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("PAYSTACK")}
                    className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      paymentMethod === "PAYSTACK"
                        ? "border-2 border-neutral-950 bg-white font-bold text-neutral-950 shadow-2xs"
                        : "border border-neutral-200 bg-white font-semibold text-neutral-600 hover:border-neutral-400"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-neutral-900" />
                    <span className="text-[10px]">Paystack Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("BANK_TRANSFER")}
                    className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      paymentMethod === "BANK_TRANSFER"
                        ? "border-2 border-neutral-950 bg-white font-bold text-neutral-950 shadow-2xs"
                        : "border border-neutral-200 bg-white font-semibold text-neutral-600 hover:border-neutral-400"
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-neutral-900" />
                    <span className="text-[10px]">Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
                    className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      paymentMethod === "CASH_ON_DELIVERY"
                        ? "border-2 border-neutral-950 bg-white font-bold text-neutral-950 shadow-2xs"
                        : "border border-neutral-200 bg-white font-semibold text-neutral-600 hover:border-neutral-400"
                    }`}
                  >
                    <Truck className="w-4 h-4 text-neutral-900" />
                    <span className="text-[10px]">On Delivery</span>
                  </button>
                </div>
              </div>

              {/* Optional Card Simulation Details (to preserve strict screenshot visual details) */}
              {paymentMethod === "PAYSTACK" && (
                <div className="space-y-1.5 pt-1 animate-fade-in">
                  <label className="block text-xs font-bold text-neutral-800">
                    Card Details (Secured by Paystack)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242"
                      className="w-full h-11 pl-4 pr-20 rounded-t-xl border border-neutral-200 bg-white text-xs font-mono text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-1 font-mono font-bold text-[10px] text-neutral-500 pointer-events-none">
                      <span className="bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">VISA</span>
                      <span className="bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">MC</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-x border-b border-neutral-200 rounded-b-xl overflow-hidden bg-white">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="h-11 px-4 text-xs font-mono border-r border-neutral-200 focus:outline-none focus:bg-neutral-50 placeholder:text-neutral-400"
                    />
                    <input
                      type="password"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC / CVV"
                      maxLength={4}
                      className="h-11 px-4 text-xs font-mono focus:outline-none focus:bg-neutral-50 placeholder:text-neutral-400"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 pt-1">
                    <Lock className="w-3 h-3 text-emerald-600" /> Payment details are secured and 256-bit SSL encrypted
                  </p>
                </div>
              )}

              {/* Cost Breakdown Summary */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-200/80 font-mono text-xs">
                <div className="flex justify-between text-neutral-700 font-bold">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-950">₦{subtotal.toLocaleString("en-NG")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₦{discountAmount.toLocaleString("en-NG")}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Taxes (7.5% VAT)</span>
                  <span>₦{taxes.toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery &amp; Shipping</span>
                  <span>₦{shippingCost.toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Platform Assurance Fee</span>
                  <span>₦{platformFee.toLocaleString("en-NG")}</span>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex justify-between items-center text-base font-black text-neutral-950">
                  <span className="font-sans">Grand Total</span>
                  <span className="font-mono text-lg text-neutral-950">
                    ₦{grandTotal.toLocaleString("en-NG")}
                  </span>
                </div>
              </div>

              {/* Checkout Submit Pill Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "Placing Authoritative Order..." : "Complete Order"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SECTION BELOW: Explore All Hardware Pieces (Strict grid and pagination matching screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 border-t border-neutral-100">
        <h2 className="text-2xl sm:text-4xl font-black text-center text-neutral-950 mb-10 tracking-tight">
          Explore All Hardware Pieces
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.slice(0, 4).map((product) => (
            <ShopProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Pagination Row (< Previous 1 2 3 4 5 Next > matching screenshot) */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs disabled:opacity-40 transition-all shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                  currentPage === page
                    ? "bg-neutral-950 text-white shadow-md"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            disabled={currentPage === 5}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs disabled:opacity-40 transition-all shadow-2xs"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SECTION BELOW: Exquisite Engineering, Timeless Comfort Countdown Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#EFECE6] rounded-3xl p-8 sm:p-14 border border-neutral-200/80 text-center relative overflow-hidden">
          <span className="text-[10px] font-mono font-bold uppercase text-orange-600 tracking-widest block mb-2">
            LIMITED OEM SHOWCASE DROP
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 max-w-xl mx-auto tracking-tight leading-tight">
            Exquisite Engineering, Timeless Comfort
          </h2>

          {/* Countdown Boxes */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8">
            <div className="bg-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-xs border border-neutral-100 min-w-[76px]">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-neutral-950">10</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Days</span>
            </div>
            <div className="bg-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-xs border border-neutral-100 min-w-[76px]">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-neutral-950">09</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Hours</span>
            </div>
            <div className="bg-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-xs border border-neutral-100 min-w-[76px]">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-neutral-950">08</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Minutes</span>
            </div>
            <div className="bg-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-xs border border-neutral-100 min-w-[76px]">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-neutral-950">07</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Seconds</span>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/products"
              className="inline-block px-8 py-3.5 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Explore Timeless Pieces
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION BELOW: Stay ahead — sign up for sales! Newsletter Footer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-neutral-950 text-white py-14 sm:py-16 px-6 sm:px-12 rounded-3xl text-center relative overflow-hidden shadow-2xl border border-neutral-800">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Stay ahead &mdash; sign up for sales!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl mx-auto mb-8 leading-relaxed">
            Be the first to know about exclusive deals, new hardware drops, and special offers &mdash; all designed to bring speed, comfort, and savings to your workspace.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for joining the HOPSY PLAZA insider VIP tier!");
            }}
            className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2 bg-neutral-900 p-2 rounded-full border border-neutral-800 shadow-inner"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="h-11 pl-5 pr-3 rounded-full bg-transparent text-white text-xs font-medium focus:outline-none w-full placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="h-11 px-6 rounded-full bg-white hover:bg-orange-600 hover:text-white text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

