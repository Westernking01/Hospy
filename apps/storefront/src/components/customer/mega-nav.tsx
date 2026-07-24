"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  Laptop,
  Smartphone,
  Headphones,
  Tv,
  Gamepad2,
  Camera,
  Watch,
  Speaker,
  TrendingUp,
  Zap,
  Tag,
  ArrowRight,
} from "lucide-react";
import { MOCK_CATEGORIES, MOCK_BRANDS } from "@hopsy/commerce/src/mock-data";

export function MegaNav() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case "Laptop":
        return <Laptop className="w-4 h-4 text-orange-600" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4 text-orange-600" />;
      case "Headphones":
        return <Headphones className="w-4 h-4 text-orange-600" />;
      case "Tv":
        return <Tv className="w-4 h-4 text-orange-600" />;
      case "Gamepad":
        return <Gamepad2 className="w-4 h-4 text-orange-600" />;
      case "Camera":
        return <Camera className="w-4 h-4 text-orange-600" />;
      case "Watch":
        return <Watch className="w-4 h-4 text-orange-600" />;
      case "Speaker":
        return <Speaker className="w-4 h-4 text-orange-600" />;
      default:
        return <Laptop className="w-4 h-4 text-orange-600" />;
    }
  };

  return (
    <nav
      className="hidden md:block border-b border-neutral-200 bg-white relative z-30"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Main Left Links */}
          <div className="flex items-center gap-8 h-full">
            {/* All Categories Dropdown Trigger */}
            <div
              className="h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("categories")}
            >
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-950 text-white font-mono font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer tracking-wider uppercase"
              >
                <Menu className="w-4 h-4" />
                <span>Departments</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "categories" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Top Navigation Links */}
            <div className="flex items-center gap-6 h-full text-xs font-mono font-bold text-neutral-600">
              <Link
                href="/categories"
                className={`h-full flex items-center hover:text-neutral-950 transition-colors ${
                  pathname?.startsWith("/categories") ? "text-orange-600 border-b-2 border-orange-600" : ""
                }`}
              >
                Hardware Catalog
              </Link>

              {/* Brands Mega Dropdown Trigger */}
              <div
                className="h-full flex items-center cursor-pointer"
                onMouseEnter={() => setActiveDropdown("brands")}
              >
                <Link
                  href="/brands"
                  className={`h-full flex items-center gap-1 hover:text-neutral-950 transition-colors ${
                    pathname?.startsWith("/brands") ? "text-orange-600 border-b-2 border-orange-600" : ""
                  }`}
                >
                  <span>OEM Brands</span>
                  <ChevronDown className="w-3 h-3" />
                </Link>
              </div>

              <Link
                href="/search?isTrending=true"
                className="h-full flex items-center gap-1.5 hover:text-orange-600 transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                <span>Trending Units</span>
              </Link>

              <Link
                href="/search?isNewArrival=true"
                className="h-full flex items-center gap-1.5 hover:text-orange-600 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-orange-500" />
                <span>New Specifications</span>
              </Link>

              <Link
                href="/search?isFlashSale=true"
                className="h-full flex items-center gap-1.5 hover:text-orange-600 transition-colors text-orange-600"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Price Drops</span>
              </Link>
            </div>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-6 text-xs font-mono font-semibold text-neutral-600">
            <Link href="/track-order" className="hover:text-neutral-950 transition-colors">
              Dispatch Status
            </Link>
            <Link href="/faq" className="hover:text-neutral-950 transition-colors">
              Support Center
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Mega Dropdown Menu */}
      {activeDropdown === "categories" && (
        <div
          className="absolute left-0 right-0 top-12 bg-white border-b border-neutral-300 shadow-xl animate-in fade-in-0 duration-150"
          onMouseEnter={() => setActiveDropdown("categories")}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-3 grid grid-cols-3 gap-6">
                {MOCK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setActiveDropdown(null)}
                    className="group flex items-start gap-4 p-3 rounded hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all"
                  >
                    <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-orange-600 transition-colors flex items-center gap-1 tracking-tight">
                        {cat.name}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">
                        {cat.description}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono font-bold text-neutral-600">
                        {cat.itemCount}+ Units Available
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Promo Showcase inside Mega Menu */}
              <div className="col-span-1 rounded bg-neutral-950 p-6 text-white flex flex-col justify-between border border-neutral-800 shadow-sm">
                <div>
                  <span className="px-2 py-0.5 rounded bg-orange-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    CERTIFIED PROMOTION
                  </span>
                  <h3 className="text-base font-black tracking-tighter mt-3 text-white">
                    Pro Audio & 144Hz OLED Panels
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-normal">
                    Experience studio-grade acoustic accuracy and ultra-low latency panels from Sony, LG, and Apple.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/categories/audio"
                    onClick={() => setActiveDropdown(null)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 hover:underline"
                  >
                    Explore High-Fidelity Audio &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brands Mega Dropdown Menu */}
      {activeDropdown === "brands" && (
        <div
          className="absolute left-0 right-0 top-12 bg-white border-b border-neutral-300 shadow-xl animate-in fade-in-0 duration-150"
          onMouseEnter={() => setActiveDropdown("brands")}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Authorized OEM Brand Showcase</h3>
                <p className="text-xs font-mono text-neutral-500">
                  All hardware units carry 100% manufacturer warranty and verifiable serial numbers.
                </p>
              </div>
              <Link
                href="/brands"
                onClick={() => setActiveDropdown(null)}
                className="text-xs font-mono font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                Complete Brand Roster <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-6 gap-4">
              {MOCK_BRANDS.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  onClick={() => setActiveDropdown(null)}
                  className="flex flex-col items-center justify-center p-4 rounded border border-neutral-200 bg-neutral-50 hover:border-neutral-950 hover:bg-neutral-100 transition-all group text-center"
                >
                  <div className="h-10 px-2 min-w-[40px] rounded bg-white border border-neutral-200 flex items-center justify-center font-mono font-bold text-xs text-neutral-900 group-hover:border-neutral-950 transition-colors">
                    {brand.logo_url ? (
                      <img
                        src={brand.logo_url}
                        alt={`${brand.name} logo`}
                        className="h-5 w-auto max-w-[65px] object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      brand.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <span className="text-xs font-bold text-neutral-900 mt-2.5 group-hover:text-orange-600 transition-colors tracking-tight">
                    {brand.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    {brand.productCount} Units
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

