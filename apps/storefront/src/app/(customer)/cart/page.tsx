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
  Tag,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { useCart } from "@/components/customer/cart-context";

import { ShopProductCard } from "@/components/customer/shop-product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";
import { Button } from "@hopsy/ui";

export default function CartPage() {
  const { products, categories, brands, loading } = useStorefrontData();
  if (loading) return <div>Loading...</div>;

  const router = useRouter();
  const {
    cartItems,
    cartSummary,
    couponCode,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [shippingOption, setShippingOption] = useState<"fast" | "free">("fast");
  const [couponInput, setCouponInput] = useState(couponCode || "");
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // If cart is empty, display 2 sample hardware items so the exact screenshot layout is immediately visible
  const displayItems = useMemo(() => {
    if (cartItems.length > 0) {
      return cartItems.map((item) => ({
        id: item.id,
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

  // Calculations backed by authoritative server API (`cartSummary`) when available
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
    return Math.round((subtotal - discountAmount) * 0.075); // 7.5% VAT
  }, [cartSummary, cartItems.length, subtotal, discountAmount]);

  const shippingCost = useMemo(() => {
    if (shippingOption === "fast") return 15000;
    return 0;
  }, [shippingOption]);

  const platformFee = 5000;
  const grandTotal = Math.max(0, subtotal - discountAmount + taxes + shippingCost + platformFee);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    setCouponMsg(null);
    try {
      const res = await applyCoupon(couponInput);
      if (res.success) {
        setCouponMsg({ type: "success", text: res.message });
      } else {
        setCouponMsg({ type: "error", text: res.message });
      }
    } finally {
      setIsApplyingCoupon(false);
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
          <span className="font-bold text-neutral-900">Cart &amp; Order Review</span>
        </nav>
      </div>

      {/* Main Split Layout: My Cart (Left) vs Summary Sidebar (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: My Cart & Delivery Shipping */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950">
                  My Cart &amp; Order Review
                </h1>
                <div className="mt-3 flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-4">
                  <span className="font-bold text-sm text-neutral-800">
                    Product Information &amp; Review ({displayItems.length} items)
                  </span>
                </div>
              </div>
              {cartItems.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="text-xs font-mono text-neutral-500 hover:text-rose-600 flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Cart
                </Button>
              )}
            </div>

            {/* Cart Hardware Cards (Beige #F4F3EF rounded-3xl container strictly following screenshot) */}
            <div className="space-y-4 pt-2">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F4F3EF] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative border border-neutral-200/60 shadow-2xs group"
                >
                  {/* Remove Button (top-right X as shown in screenshot) */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                    className="absolute top-4 right-4 text-neutral-400 hover:text-rose-600 transition-colors p-1 rounded-full hover:bg-white/60"
                  >
                    <X className="w-5 h-5 font-bold" />
                  </button>

                  {/* Left: White Image Container */}
                  <div className="flex items-center gap-5 w-full sm:w-auto pr-6 sm:pr-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3 flex items-center justify-center shrink-0 border border-neutral-100 shadow-2xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Center Info Section */}
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

                      {/* Quantity Selector Pill */}
                      <div className="pt-2">
                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-lg bg-neutral-200/80 text-neutral-900 font-bold text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-neutral-600 hover:text-neutral-950 px-1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="min-w-[20px] text-center">Qty: {item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-neutral-600 hover:text-neutral-950 px-1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Return & Delivery Icons Row */}
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
                {/* Fast Delivery ($4.99 / Recommended) */}
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
                        Get it by tomorrow, 10 Oct 2026
                      </p>
                    </div>
                  </div>

                  {/* FedEx Badge */}
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
                          Free Standard Delivery
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        Get it by tomorrow late, 11 Oct 2026
                      </p>
                    </div>
                  </div>

                  {/* DHL / Express Badge */}
                  <div className="shrink-0 font-black text-xs tracking-wider text-orange-600 bg-neutral-50 border border-neutral-200 px-3 py-1 rounded-md">
                    DHL
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary Card (Strict white/#FCFBF9 rounded-3xl card) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white sm:bg-[#FCFBF9] rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6 lg:sticky lg:top-28">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                  Order Summary
                </h2>
                <p className="text-xs text-neutral-500 font-mono mt-1">
                  Review your authoritative price calculation and proceed to secure checkout.
                </p>
              </div>

              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-orange-600" /> Have a Coupon Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. VIP-WELCOME-10"
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-mono font-bold uppercase text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all shadow-2xs"
                  />
                  <button
                    type="submit"
                    disabled={isApplyingCoupon || !couponInput.trim()}
                    className="px-4 h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs disabled:opacity-50 transition-colors shrink-0"
                  >
                    {isApplyingCoupon ? "..." : "Apply"}
                  </button>
                </div>
                {couponCode && (
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 mt-2">
                    <span>Coupon Applied: <strong>{couponCode}</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        removeCoupon();
                        setCouponInput("");
                      }}
                      className="text-neutral-400 hover:text-rose-600 underline font-sans font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponMsg && (
                  <p className={`text-[11px] font-mono mt-1 ${couponMsg.type === "success" ? "text-emerald-600 font-bold" : "text-rose-600"}`}>
                    {couponMsg.text}
                  </p>
                )}
              </form>

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

              {/* Checkout Action Button */}
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="w-full h-12 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-neutral-500 text-[11px] font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted 256-bit SSL Checkout</span>
              </div>
            </div>
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

