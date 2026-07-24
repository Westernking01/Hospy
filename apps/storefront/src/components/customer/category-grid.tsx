"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useCart } from "./cart-context";
import { Image } from "@/components/ui/image";

export function CategoryGrid() {
  const { addToCart } = useCart();
  const [watchPage, setWatchPage] = useState(0);

  // Bento category showcase exactly matching screenshot
  const bentoCategories = {
    leftTop: {
      name: "Smart Speakers",
      slug: "laptops-computers",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    },
    leftBottom: {
      name: "Gaming Controllers",
      slug: "gaming-hardware",
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80",
    },
    center: {
      name: "Next-Gen VR & AR Wearables",
      slug: "gaming-hardware",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80",
      cta: "Explore",
    },
    rightTop: {
      name: "4K Projectors",
      slug: "tv-home-theater",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80",
    },
    rightBottom: {
      name: "Action Cameras",
      slug: "cameras-optics",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    },
  };

  // Smart Watches split banner items
  const smartWatches = [
    {
      id: "watch-ultra-1",
      name: "Apple Watch Ultra 2 Titanium",
      slug: "apple-watch-ultra-2",
      price: "₦980,000",
      rawPrice: 980000,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "watch-galaxy-pro",
      name: "Samsung Galaxy Watch 6 Pro",
      slug: "samsung-galaxy-watch-6",
      price: "₦650,000",
      rawPrice: 650000,
      image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "watch-garmin-8",
      name: "Garmin Fenix 8 Solar Sapphire",
      slug: "garmin-fenix-8",
      price: "₦1,150,000",
      rawPrice: 1150000,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* SECTION 1: Explore By Category Bento Grid */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
              Explore By Category
            </h2>
            <div className="flex items-center gap-2">
              <Link
                href="/categories"
                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-neutral-950 flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-colors"
                aria-label="View all categories"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 5-Card Bento Photographic Grid exactly matching screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[520px]">
            {/* Left Column: 2 Stacked Cards (Spans 1 col) */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-1">
              <Link
                href={`/categories/${bentoCategories.leftTop.slug}`}
                className="group relative flex-1 rounded-2xl overflow-hidden bg-neutral-900 min-h-[220px] flex items-end p-4 shadow-sm border border-neutral-200/60"
              >
                <Image
                  src={bentoCategories.leftTop.image}
                  alt={bentoCategories.leftTop.name}
                  className="object-cover transition-transform duration-700 group-hover:scale-108 opacity-85"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="relative z-10 px-4 py-2 rounded-full bg-white text-neutral-950 font-bold text-xs shadow-md">
                  {bentoCategories.leftTop.name}
                </span>
              </Link>

              <Link
                href={`/categories/${bentoCategories.leftBottom.slug}`}
                className="group relative flex-1 rounded-2xl overflow-hidden bg-neutral-900 min-h-[220px] flex items-end p-4 shadow-sm border border-neutral-200/60"
              >
                <Image
                  src={bentoCategories.leftBottom.image}
                  alt={bentoCategories.leftBottom.name}
                  className="object-cover transition-transform duration-700 group-hover:scale-108 opacity-85"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="relative z-10 px-4 py-2 rounded-full bg-white text-neutral-950 font-bold text-xs shadow-md">
                  {bentoCategories.leftBottom.name}
                </span>
              </Link>
            </div>

            {/* Center Column: 1 Tall Featured Card (Spans 2 cols) */}
            <div className="lg:col-span-2 flex">
              <Link
                href={`/categories/${bentoCategories.center.slug}`}
                className="group relative w-full rounded-2xl overflow-hidden bg-neutral-950 min-h-[460px] flex flex-col justify-end p-6 sm:p-8 shadow-md border border-neutral-200/60"
              >
                <Image
                  src={bentoCategories.center.image}
                  alt={bentoCategories.center.name}
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="px-5 py-2.5 rounded-full bg-white text-neutral-950 font-black text-sm sm:text-base shadow-lg">
                    {bentoCategories.center.name}
                  </span>
                  <span className="hidden sm:inline-flex px-4 py-2 rounded-full bg-orange-600 text-white font-bold text-xs uppercase tracking-wider">
                    {bentoCategories.center.cta}
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Column: 2 Stacked Cards (Spans 1 col) */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-1">
              <Link
                href={`/categories/${bentoCategories.rightTop.slug}`}
                className="group relative flex-1 rounded-2xl overflow-hidden bg-neutral-900 min-h-[220px] flex items-end p-4 shadow-sm border border-neutral-200/60"
              >
                <Image
                  src={bentoCategories.rightTop.image}
                  alt={bentoCategories.rightTop.name}
                  className="object-cover transition-transform duration-700 group-hover:scale-108 opacity-85"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="relative z-10 px-4 py-2 rounded-full bg-white text-neutral-950 font-bold text-xs shadow-md">
                  {bentoCategories.rightTop.name}
                </span>
              </Link>

              <Link
                href={`/categories/${bentoCategories.rightBottom.slug}`}
                className="group relative flex-1 rounded-2xl overflow-hidden bg-neutral-900 min-h-[220px] flex items-end p-4 shadow-sm border border-neutral-200/60"
              >
                <Image
                  src={bentoCategories.rightBottom.image}
                  alt={bentoCategories.rightBottom.name}
                  className="object-cover transition-transform duration-700 group-hover:scale-108 opacity-85"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="relative z-10 px-4 py-2 rounded-full bg-white text-neutral-950 font-bold text-xs shadow-md">
                  {bentoCategories.rightBottom.name}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 2: Smart Watches Split Banner exactly matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4">
          {/* Left Block: Smart Watches Carousel / 3 Watches Grid (Spans 8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-neutral-100 p-6 sm:p-8 border border-neutral-200 flex flex-col justify-between">
            {/* Header inside card */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                Smart Watches
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWatchPage((prev) => (prev === 0 ? 1 : 0))}
                  className="w-8 h-8 rounded-full bg-white border border-neutral-300 hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs"
                  aria-label="Previous watches"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setWatchPage((prev) => (prev === 0 ? 1 : 0))}
                  className="w-8 h-8 rounded-full bg-white border border-neutral-300 hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs"
                  aria-label="Next watches"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3 Watches Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-auto">
              {smartWatches.map((watch) => (
                <div
                  key={watch.id}
                  className="bg-white rounded-2xl p-4 border border-neutral-200 flex flex-col justify-between shadow-2xs group hover:border-neutral-400 transition-all"
                >
                  <Link
                    href={`/products/${watch.slug}`}
                    className="aspect-square w-full flex items-center justify-center overflow-hidden mb-3"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={watch.image}
                        alt={watch.name}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        fill
                        sizes="250px"
                      />
                    </div>
                  </Link>
                  <div>
                    <Link
                      href={`/products/${watch.slug}`}
                      className="text-xs font-bold text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug"
                    >
                      {watch.name}
                    </Link>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-mono font-black text-neutral-950">
                        {watch.price}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: watch.id,
                            name: watch.name,
                            slug: watch.slug,
                            price: watch.rawPrice,
                            image: watch.image,
                          })
                        }
                        className="w-8 h-8 rounded-full bg-neutral-950 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow-2xs"
                        aria-label="Add watch to cart"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Square Photo Card close-up of orange-strap rugged smartwatch (Spans 4 cols) */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden bg-neutral-900 relative min-h-[340px] flex flex-col justify-end p-6 sm:p-8 shadow-md border border-neutral-800 group">
            <Image
              src="https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=800&q=80"
              alt="Rugged Titanium Smartwatch"
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-orange-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                TITANIUM SERIES
              </span>
              <h4 className="text-xl font-black text-white tracking-tight mt-2 leading-tight">
                Rugged Outdoor GPS Multisport
              </h4>
              <Link
                href="/categories/wearables-smartwatches"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-orange-400 mt-3 uppercase tracking-wider transition-colors"
              >
                <span>Discover Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
