"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
} from "lucide-react";

import { ShopProductCard } from "@/components/customer/shop-product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";

export default function ShopPage() {
  const { products, categories, brands, loading } = useStorefrontData();
  if (loading) return <div>Loading...</div>;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  // Best Selling tabs state
  const [bestSellingTab, setBestSellingTab] = useState<string>("all");

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 9,
    minutes: 8,
    seconds: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 10, hours: 9, minutes: 8, seconds: 7 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered and Sorted Main Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category.slug === selectedCategory);
    }
    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand.slug === selectedBrand);
    }
    if (selectedPriceRange === "under_500k") {
      list = list.filter((p) => p.price < 500000);
    } else if (selectedPriceRange === "500k_2m") {
      list = list.filter((p) => p.price >= 500000 && p.price <= 2000000);
    } else if (selectedPriceRange === "over_2m") {
      list = list.filter((p) => p.price > 2000000);
    }

    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedBrand, selectedPriceRange, sortBy]);

  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Filtered Best Selling Products
  const bestSellingProducts = useMemo(() => {
    let list = [...products].sort((a, b) => b.review_count - a.review_count);
    if (bestSellingTab !== "all") {
      list = list.filter((p) => p.category.slug === bestSellingTab);
    }
    return list.slice(0, 8);
  }, [bestSellingTab]);

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans pb-20">
      {/* Top Section: Breadcrumb & Title (Strict screenshot layout match) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
          <Link href="/" className="hover:text-neutral-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <Link href="/products" className="hover:text-neutral-950 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <span className="font-bold text-neutral-900">Enterprise Hardware & Electronics</span>
        </nav>

        {/* Title and Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950">
              Enterprise Hardware & Electronics
            </h1>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 text-xs">
            <span className="font-mono text-neutral-500 font-medium">
              Showing <span className="font-bold text-neutral-950">{((currentPage - 1) * itemsPerPage) + 1}&ndash;{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="font-bold text-neutral-950">{filteredProducts.length}</span> products
            </span>

            <div className="flex items-center gap-3">
              {/* Sort Pill Dropdown */}
              <div className="relative flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 pl-4 pr-8 rounded-full bg-neutral-950 text-white font-bold text-xs appearance-none cursor-pointer focus:outline-none"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price_asc">Sort by: Price (Low to High)</option>
                  <option value="price_desc">Sort by: Price (High to Low)</option>
                  <option value="rating">Sort by: Customer Rating</option>
                  <option value="newest">Sort by: Newest First</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white absolute right-3 pointer-events-none" />
              </div>

              {/* View As Toggle Pill */}
              <div className="flex items-center bg-neutral-100 rounded-full p-1 border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-neutral-950 shadow-xs"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    viewMode === "list"
                      ? "bg-white text-neutral-950 shadow-xs"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Pill Filter Bar (Exactly 4 pill dropdowns as shown in screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Price Filter Pill */}
          <div className="relative">
            <select
              value={selectedPriceRange}
              onChange={(e) => {
                setSelectedPriceRange(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 text-xs font-bold text-neutral-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all shadow-2xs"
            >
              <option value="all">Price: All Ranges</option>
              <option value="under_500k">Under ₦500,000</option>
              <option value="500k_2m">₦500k &ndash; ₦2M (Pro tier)</option>
              <option value="over_2m">Over ₦2,000,000 (Enterprise)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Category Filter Pill */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 text-xs font-bold text-neutral-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all shadow-2xs"
            >
              <option value="all">Category: All Hardware</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Color / Finish Filter Pill */}
          <div className="relative">
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 text-xs font-bold text-neutral-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all shadow-2xs"
            >
              <option value="all">Color: All Finishes</option>
              <option value="space_gray">Space Gray / Anodized</option>
              <option value="midnight_black">Midnight Matte Black</option>
              <option value="titanium">Natural Aerospace Titanium</option>
              <option value="silver">Clean OEM Silver</option>
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Brand / OEM Filter Pill */}
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 text-xs font-bold text-neutral-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all shadow-2xs"
            >
              <option value="all">Brand: All Global OEMs</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.slug}>
                  {brand.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Products Stage (Strict 3-column beige rounded-3xl cards matching screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {currentProducts.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentProducts.map((product) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#F4F3EF] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-neutral-200/60"
                >
                  <div className="flex items-center gap-6">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-32 h-32 bg-white rounded-2xl p-4 shrink-0 flex items-center justify-center border border-neutral-200"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </Link>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-orange-600">
                        {product.brand.name} &bull; {product.category.name}
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-lg font-black text-neutral-950 mt-1 hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-neutral-500 font-mono mt-1 line-clamp-2 max-w-xl">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end justify-between self-stretch gap-4">
                    <div className="text-right">
                      <span className="text-xl font-black font-mono text-neutral-950">
                        ₦{product.price.toLocaleString("en-NG")}
                      </span>
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center"
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-dashed border-neutral-300">
            <h3 className="text-lg font-bold text-neutral-800">No matching hardware units found</h3>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              Try resetting your category or price filters to view more OEM items.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBrand("all");
                setSelectedPriceRange("all");
                setSelectedColor("all");
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Row (Strict < Previous 1 2 3 4 5 Next > matching screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
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
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 1. Countdown Section (Deal Expire Soon! with 4 light beige boxes exactly from screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 block mb-1">
              LIMITED TIME OEM REBATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
              Deal Expire Soon!
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#F4F3EF] border border-neutral-200 rounded-2xl px-4 sm:px-5 py-3 text-center min-w-[70px] sm:min-w-[80px]">
              <span className="block text-xl sm:text-2xl font-black font-mono text-neutral-950">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                Days
              </span>
            </div>
            <div className="bg-[#F4F3EF] border border-neutral-200 rounded-2xl px-4 sm:px-5 py-3 text-center min-w-[70px] sm:min-w-[80px]">
              <span className="block text-xl sm:text-2xl font-black font-mono text-neutral-950">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                Hrs
              </span>
            </div>
            <div className="bg-[#F4F3EF] border border-neutral-200 rounded-2xl px-4 sm:px-5 py-3 text-center min-w-[70px] sm:min-w-[80px]">
              <span className="block text-xl sm:text-2xl font-black font-mono text-neutral-950">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                Mins
              </span>
            </div>
            <div className="bg-[#F4F3EF] border border-neutral-200 rounded-2xl px-4 sm:px-5 py-3 text-center min-w-[70px] sm:min-w-[80px]">
              <span className="block text-xl sm:text-2xl font-black font-mono text-orange-600">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                Secs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Banner 1: Sign Up & Get Up To ₦250,000 Enterprise Rebate (Screenshot match) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-neutral-950 via-slate-900 to-neutral-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl border border-neutral-800">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl space-y-3 relative z-10 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 font-mono font-bold text-[10px] uppercase tracking-wider">
              WHOLESALE TIER REBATE
            </span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Sign Up &amp; Get Up To ₦250,000 Off
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
              Unlock direct OEM Tier-1 pricing, enterprise net-30 credit terms, and dedicated technical dispatch management.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all shadow-xl transform active:scale-95"
            >
              <span>Explore Rebate Tiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. HOPSY PLAZA Featured Collection Bento Grid (Matching Veluno Featured Collection) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            HOPSY PLAZA Featured Collection
          </h2>
          <Link
            href="/categories"
            className="px-5 py-2 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-2xs"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column Stack (2 cards) */}
          <div className="lg:col-span-6 grid grid-rows-2 gap-6">
            <Link
              href="/categories/smart-home-and-voice"
              className="group relative rounded-3xl bg-neutral-900 overflow-hidden min-h-[220px] flex items-end p-6 sm:p-8 border border-neutral-800"
            >
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                alt="Enterprise Server Racks"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-orange-500 transition-colors">
                    Enterprise Server Racks
                  </h3>
                  <span className="text-xs font-mono text-neutral-300 font-bold">
                    From ₦4,500,000
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/categories/high-performance-gaming"
              className="group relative rounded-3xl bg-neutral-900 overflow-hidden min-h-[220px] flex items-end p-6 sm:p-8 border border-neutral-800"
            >
              <img
                src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=800&q=80"
                alt="Apple Silicon Fleet"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-orange-500 transition-colors">
                    Apple Silicon Fleet
                  </h3>
                  <span className="text-xs font-mono text-neutral-300 font-bold">
                    From ₦1,200,000
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Large Feature Box */}
          <div className="lg:col-span-6">
            <Link
              href="/categories/virtual-and-augmented-reality"
              className="group relative rounded-3xl bg-neutral-900 overflow-hidden h-full min-h-[360px] lg:min-h-full flex items-end p-8 sm:p-10 border border-neutral-800"
            >
              <img
                src="https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1000&q=80"
                alt="High-Performance Workstations"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-orange-500 transition-colors">
                    High-Performance Workstations
                  </h3>
                  <span className="text-sm font-mono text-neutral-300 font-bold">
                    From ₦3,800,000
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white text-neutral-950 flex items-center justify-center font-bold shadow-lg group-hover:bg-orange-600 group-hover:text-white transition-all transform group-hover:scale-110 shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Full-Width Dark Banner inside Bento */}
        <div className="mt-6 bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-neutral-800">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
            <span className="text-base sm:text-lg font-black tracking-tight">
              Join B2B Partner Portal &amp; Get 15% Off Your First Procurement Order!
            </span>
          </div>
          <Link
            href="/b2b"
            className="px-6 py-2.5 rounded-full bg-white hover:bg-orange-600 text-neutral-950 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            Join Now
          </Link>
        </div>
      </div>

      {/* 4. Banner 2: Let's Architect Your Enterprise Infrastructure (Dream Home screenshot equivalent) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-neutral-900 text-white relative overflow-hidden min-h-[360px] flex items-center justify-end p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80"
            alt="Enterprise Infrastructure Architecture"
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/80 to-neutral-950" />

          <div className="relative z-10 max-w-lg text-right space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-500">
              CUSTOM INFRASTRUCTURE ROLLOUT
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Let&rsquo;s Architect Your Enterprise Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
              We design, supply, and commission high-density data centers, AI compute clusters, and corporate hardware fleets across West Africa.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-orange-500 text-neutral-950 hover:text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Dark Interactive Tabs & Hero Product Box (HOPSY PLAZA Featured Collection with PREMIUM CLASS watermark) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-neutral-800 shadow-2xl">
          {/* Watermark exactly like screenshot */}
          <div className="absolute right-4 bottom-2 text-6xl sm:text-8xl lg:text-9xl font-black text-white/5 uppercase select-none pointer-events-none tracking-tighter leading-none">
            PREMIUM CLASS
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column Tabs */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                HOPSY PLAZA Featured Collection
              </h3>

              <div className="space-y-3">
                <div className="bg-neutral-800/90 border border-neutral-700 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between font-bold text-sm sm:text-base text-white">
                    <span>Enterprise Servers &amp; AI Nodes</span>
                    <span className="text-orange-500 font-mono text-xs font-bold">ACTIVE</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                    Direct OEM rack servers featuring dual NVIDIA H100 GPU clusters and redundant 400G networking backplanes.
                  </p>
                </div>

                <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4.5 font-bold text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/40 transition-all cursor-pointer flex items-center justify-between">
                  <span>Apple Silicon M4 Max Enterprise Fleet</span>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </div>

                <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4.5 font-bold text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/40 transition-all cursor-pointer flex items-center justify-between">
                  <span>Pro Audio Studio &amp; Broadcast Hardware</span>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-colors shadow-md"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column Hero Product Stage */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-600/15 rounded-full blur-2xl pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                  alt="Enterprise Hardware Render"
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Dots indicator */}
              <div className="flex items-center gap-2 mt-4">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Best Selling Hardware Section (Exact 6 Tabs + 8 Product Cards from screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl sm:text-4xl font-black text-center text-neutral-950 tracking-tight">
          Best Selling Hardware
        </h2>

        {/* 6 Horizontal Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-6 mb-10">
          {[
            { id: "all", label: "All" },
            { id: "smart-home-and-voice", label: "Smart Home" },
            { id: "high-performance-gaming", label: "Gaming & GPUs" },
            { id: "virtual-and-augmented-reality", label: "VR & AR" },
            { id: "premium-audio-and-earbuds", label: "Pro Audio" },
            { id: "pro-photography-and-action", label: "Photography" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setBestSellingTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
                bestSellingTab === tab.id
                  ? "bg-neutral-950 text-white shadow-md scale-105"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4-Column Grid of Best Sellers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellingProducts.map((product) => (
            <ShopProductCard
              key={`bestseller-${product.id}`}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

