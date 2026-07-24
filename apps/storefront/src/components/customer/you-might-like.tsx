"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { ShopProductCard } from "./shop-product-card";
import { QuickViewModal } from "./quick-view-modal";

function toany(item: any): any {
  const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, "") || "0");
  const numericOldPrice = item.oldPrice ? parseFloat(item.oldPrice.replace(/[^0-9.]/g, "") || "0") : undefined;
  return {
    id: item.id,
    name: item.title,
    slug: item.slug,
    sku: item.id,
    description: item.subtitle,
    short_description: item.subtitle,
    price: numericPrice,
    compare_at_price: numericOldPrice,
    currency: "USD",
    stock_quantity: 25,
    status: "ACTIVE",
    is_featured: true,
    is_trending: false,
    is_new_arrival: false,
    is_best_seller: false,
    is_flash_sale: false,
    category: {
      id: "cat-yml",
      name: item.category || "Recommended",
      slug: "recommended",
      description: "",
      image_url: "",
      itemCount: 1,
    },
    brand: {
      id: "br-yml",
      name: "HOPSY PLAZA",
      slug: "hopsy-plaza",
      description: "",
      logo_url: "",
      productCount: 1,
    },
    images: [item.image_url],
    variants: [],
    specifications: [],
    reviews: [],
    rating: item.rating || 4.8,
    review_count: item.reviews || 64,
  };
}

export function YouMightLikeSection() {
  const { products, categories, brands } = useStorefrontData();

  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  return (
    <section className="py-14 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header exactly matching screenshot */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
            You Might Like These
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-neutral-300 hover:border-neutral-950 flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-colors"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-neutral-300 hover:border-neutral-950 flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-colors"
              aria-label="Next items"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Layout: Left Large Spotlight Card + Right 4-Square Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Large Featured Vertical Spotlight Card (Spans 5 cols) matching screenshot ("Home Appliances") */}
          <div className="lg:col-span-5 flex flex-col rounded-3xl bg-neutral-950 overflow-hidden relative shadow-md group min-h-[480px] lg:min-h-[560px] border border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
              alt="Home Appliances & Smart Kitchen Setup"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

            {/* Top Badge */}
            <div className="relative z-10 p-6 flex justify-between items-start">
              <span className="px-3.5 py-1.5 rounded-full bg-orange-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                Top Pick For You
              </span>
            </div>

            {/* Bottom Content Overlay (Solid architectural dark block, NO glassmorphism or backdrop-blur) */}
            <div className="relative z-10 mt-auto p-6 sm:p-8 flex flex-col justify-end bg-neutral-950/95 border-t border-neutral-800 rounded-t-3xl mx-3 sm:mx-4 mb-3 sm:mb-4">
              <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest">
                CERTIFIED HOME SUITE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 leading-snug">
                Home Appliances & Smart Electronics
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 leading-relaxed font-normal">
                Discover next-gen dual inverter cooling, brushless direct-drive laundry units, and gigabit home automation nodes engineered for lifetime durability.
              </p>
              <div className="mt-5">
                <Link
                  href="/categories/home-appliances"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm group/btn"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 text-neutral-950 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: 4 Square Product Cards Grid (Spans 7 cols) matching exact Veluno ShopProductCard layout */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((item) => {
              const adapted = toany(item);
              return (
                <ShopProductCard
                  key={item.id}
                  product={adapted}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}

