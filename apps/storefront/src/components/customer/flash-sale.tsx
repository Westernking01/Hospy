"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ArrowRight, Clock } from "lucide-react";

import { ProductCard } from "./product-card";

interface FlashSaleProps {
  onQuickView?: (product: any) => void;
}

export function FlashSale({ onQuickView }: FlashSaleProps) {
  const { products, categories, brands } = useStorefrontData();

  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter((p) => p.is_flash_sale);

  if (flashSaleProducts.length === 0) return null;

  return (
    <section className="py-20 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Precision Industrial Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-600/10 text-orange-500 border border-orange-500/20 text-xs font-bold uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>LIMITED INVENTORY DISPATCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">
              Executive Price Drops
            </h2>
          </div>

          {/* High-Contrast Digital Timer */}
          <div className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 px-5 py-3 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Allocation Ends:</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-lg font-bold text-white">
              <div className="bg-neutral-950 border border-neutral-800 px-3 py-1 rounded text-orange-500">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-neutral-500">:</span>
              <div className="bg-neutral-950 border border-neutral-800 px-3 py-1 rounded text-orange-500">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-neutral-500">:</span>
              <div className="bg-neutral-950 border border-neutral-800 px-3 py-1 rounded text-orange-500">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/search?isFlashSale=true"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 transition-all group"
          >
            <span>View All Price Drops ({flashSaleProducts.length} Hardware Units)</span>
            <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

