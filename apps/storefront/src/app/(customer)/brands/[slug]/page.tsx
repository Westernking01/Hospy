"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Grid,
  List,
  ChevronDown,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

import { ShopProductCard } from "@/components/customer/shop-product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";

export default function BrandDetailPage() {
  const { products, categories, brands, loading } = useStorefrontData();
  if (loading) return <div>Loading...</div>;

  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const brand = brands.find((b) => b.slug === slug) || {
    id: "apple",
    name: "Brand Partner",
    slug: "brand",
    description: "Explore our verified hardware selection from this certified manufacturer.",
    logo_url: "",
    productCount: products.length,
  };

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.brand.slug === brand.slug || brand.slug === "brand");

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
  }, [brand.slug, selectedPriceRange, sortBy]);

  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans pb-20">
      {/* Top Section: Breadcrumb & Title (Strict screenshot layout match) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
          <Link href="/" className="hover:text-neutral-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <Link href="/brands" className="hover:text-neutral-950 transition-colors">
            Brands
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <span className="font-bold text-neutral-900">{brand.name}</span>
        </nav>

        {/* Title and Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              OFFICIAL OEM SHOWCASE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 mt-2">
              {brand.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-1 max-w-2xl">
              {brand.description}
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 text-xs shrink-0">
            <span className="font-mono text-neutral-500 font-medium">
              Showing <span className="font-bold text-neutral-950">{filteredProducts.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0}&ndash;{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="font-bold text-neutral-950">{filteredProducts.length}</span> products
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

      {/* Horizontal Pill Filter Bar (Strict pill dropdowns as shown in screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
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

          {/* Reset / Stock pill */}
          <div className="flex items-center justify-between px-4 h-11 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-700 col-span-2 sm:col-span-1">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <ShieldCheck className="w-4 h-4" /> 100% Genuine OEM
            </span>
            {selectedPriceRange !== "all" && (
              <button
                type="button"
                onClick={() => {
                  setSelectedPriceRange("all");
                  setSelectedColor("all");
                }}
                className="text-orange-600 hover:underline text-[11px]"
              >
                Reset
              </button>
            )}
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
                        loading="lazy"
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
            <h3 className="text-lg font-bold text-neutral-800">No hardware models listed for {brand.name} right now</h3>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              Check back shortly or explore our other brand partners.
            </p>
            <button
              type="button"
              onClick={() => setSelectedPriceRange("all")}
              className="mt-6 px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Row (Strict < Previous 1 2 3 4 5 Next > matching screenshot) */}
      {totalPages > 1 && (
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
      )}

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

