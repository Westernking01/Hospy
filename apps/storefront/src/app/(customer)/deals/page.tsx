"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
  ArrowRight,
  ShieldCheck,
  Percent,
  Flame,
} from "lucide-react";

import { ShopProductCard } from "@/components/customer/shop-product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";

export default function DealsPage() {
  const { products, categories, brands, loading } = useStorefrontData();
  if (loading) return <div>Loading...</div>;

  const [activeTab, setActiveTab] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  // Countdown timer state for Hot Deals
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products that have compare_at_price (discounted deals) or all items if simulated deal
  const dealProducts = products.filter((p) => {
    if (activeTab === "all") return Boolean(p.compare_at_price);
    if (activeTab === "flash") return p.rating >= 4.7 && Boolean(p.compare_at_price);
    if (activeTab === "clearance") return Boolean(p.compare_at_price) && (p.compare_at_price! - p.price) > 50;
    return Boolean(p.compare_at_price);
  });

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-bold uppercase tracking-wider">
            EXCLUSIVE DEALS &amp; FLASH SALES
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
        <div className="absolute top-0 right-10 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-600/20 border border-orange-500/40 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> ENTERPRISE HARDWARE DEALS
            </div>
            <h1 className="text-3xl sm:text-5xl font-mono font-black uppercase tracking-tight">
              HOT SPEC <span className="text-orange-500">SAVINGS</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 font-mono">
              Direct-from-manufacturer pricing on verified servers, industrial GPUs, developer workstations, and enterprise peripherals. Limited time allocations.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 shadow-2xl flex flex-col items-center justify-center space-y-3 min-w-[280px]">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
              <Clock className="w-4 h-4 animate-pulse" /> FLASH ALLOCATION ENDS IN:
            </div>
            <div className="grid grid-cols-4 gap-3 text-center w-full">
              <div className="bg-neutral-950 border border-neutral-800 rounded p-2.5">
                <div className="text-2xl font-mono font-black text-white">{timeLeft.days}</div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Days</div>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded p-2.5">
                <div className="text-2xl font-mono font-black text-white">{String(timeLeft.hours).padStart(2, "0")}</div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Hours</div>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded p-2.5">
                <div className="text-2xl font-mono font-black text-white">{String(timeLeft.minutes).padStart(2, "0")}</div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Mins</div>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded p-2.5">
                <div className="text-2xl font-mono font-black text-orange-500">{String(timeLeft.seconds).padStart(2, "0")}</div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Secs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Deal Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === "all"
                  ? "bg-neutral-950 text-white shadow-md"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
              }`}
            >
              All Hardware Deals ({dealProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("flash")}
              className={`px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "flash"
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> Top Rated Flash Deals
            </button>
            <button
              onClick={() => setActiveTab("clearance")}
              className={`px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "clearance"
                  ? "bg-neutral-950 text-white shadow-md"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <Percent className="w-3.5 h-3.5" /> Deep Clearance ($50+ OFF)
            </button>
          </div>

          <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Every deal backed by 100% Genuine Hardware Warranty
          </div>
        </div>

        {/* Product Grid */}
        {dealProducts.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center max-w-lg mx-auto">
            <Percent className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="font-mono font-bold text-lg text-neutral-900 uppercase">No Deals Found</h3>
            <p className="text-xs font-mono text-neutral-500 mt-1 mb-6">
              There are currently no hardware items matching this specific discount criteria.
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="px-6 py-3 rounded bg-neutral-950 text-white font-mono text-xs font-bold uppercase hover:bg-orange-600 transition-colors"
            >
              View All Deals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {dealProducts.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

