"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, Filter, SlidersHorizontal, Grid, List, CheckCircle2, X } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS, type MockProduct } from "@hopsy/commerce/src/mock-data";
import { ProductCard } from "@/components/customer/product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";
import { Button } from "@hopsy/ui";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get("q") || "";
  const initialTrending = searchParams?.get("isTrending") === "true";
  const initialNew = searchParams?.get("isNewArrival") === "true";
  const initialFlash = searchParams?.get("isFlashSale") === "true";

  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<MockProduct | null>(null);

  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }
    if (initialTrending) list = list.filter((p) => p.is_trending);
    if (initialNew) list = list.filter((p) => p.is_new_arrival);
    if (initialFlash) list = list.filter((p) => p.is_flash_sale);

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category.slug === selectedCategory);
    }
    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand.slug === selectedBrand);
    }
    if (inStockOnly) {
      list = list.filter((p) => p.stock_quantity > 0);
    }
    list = list.filter((p) => p.price <= maxPrice);

    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [query, initialTrending, initialNew, initialFlash, selectedCategory, selectedBrand, inStockOnly, maxPrice, sortBy]);

  const clearAll = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setMaxPrice(5000000);
    setInStockOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Search & Discovery</span>
        </nav>

        {/* Search Header Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-secondary/30 border border-border space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INSTANT HARDWARE DISCOVERY
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {query
                ? `Search results for "${query}"`
                : initialTrending
                ? "Trending Electronics Deals"
                : initialFlash
                ? "Active Flash Sales & Offers"
                : "Search & Filter Inventory"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore our real-time hardware catalog with multi-attribute filtering across pricing, stock levels, and OEM certifications.
            </p>
          </div>

          {/* Search Bar & Primary Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            <div className="sm:col-span-6 relative">
              <input
                type="text"
                placeholder="Search laptops, TVs, Apple, Sony, SKU..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-10 rounded-xl bg-card border border-border text-sm font-semibold focus:border-primary outline-none shadow-sm"
              />
              <SearchIcon className="w-5 h-5 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-3 rounded-xl bg-card border border-border text-xs font-bold text-foreground focus:border-primary outline-none shadow-sm"
              >
                <option value="all">All Categories</option>
                {MOCK_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full h-12 px-3 rounded-xl bg-card border border-border text-xs font-bold text-foreground focus:border-primary outline-none shadow-sm"
              >
                <option value="all">All Brands</option>
                {MOCK_BRANDS.map((b) => (
                  <option key={b.id} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-muted-foreground">
              Showing <span className="text-foreground font-black">{filteredProducts.length}</span> matching products
            </span>
            {(query || selectedCategory !== "all" || selectedBrand !== "all" || inStockOnly || maxPrice < 5000000) && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-bold text-primary hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 rounded-lg bg-secondary border border-border text-xs font-bold text-foreground focus:outline-none focus:border-primary"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Customer Rating</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-secondary p-1 rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Side Filters */}
          <aside className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Refine Results
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Price Ceiling</h4>
                <span className="font-mono text-xs font-black text-primary">₦{maxPrice.toLocaleString("en-NG")}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="font-semibold">In Stock & Immediate Dispatch</span>
              </label>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onQuickView={(p) => setQuickViewProduct(p)} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mx-auto">
                  <SearchIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No Hardware Matched Your Criteria</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Try broadening your price range, clearing specific brand filters, or searching for general categories like &ldquo;Laptop&rdquo; or &ldquo;Audio&rdquo;.
                </p>
                <Button onClick={clearAll} className="font-bold text-xs px-6">
                  Reset All Search Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm font-bold text-muted-foreground">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

