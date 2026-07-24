"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ShoppingCart,
  Share2,
  Info,
} from "lucide-react";
import { MOCK_PRODUCTS, type MockProduct } from "@hopsy/commerce/src/mock-data";
import { useWishlist } from "@/components/customer/wishlist-context";
import { ProductCard } from "@/components/customer/product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";
import { Button } from "@hopsy/ui";
import { Badge } from "@hopsy/ui";

export function ProductDetailsClient() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");
  const [quickViewProduct, setQuickViewProduct] = useState<MockProduct | null>(null);

  const activeVariant = product.variants[selectedVariantIdx] || null;
  const activePrice = activeVariant ? activeVariant.price : product.price;
  const activeComparePrice = activeVariant ? activeVariant.compare_at_price : product.compare_at_price;
  const activeStock = activeVariant ? activeVariant.stock_quantity : product.stock_quantity;
  const activeSku = activeVariant ? activeVariant.sku : product.sku;

  const discountPct = activeComparePrice && activeComparePrice > activePrice
    ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100)
    : 0;

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category.slug === product.category.slug || p.brand.slug === product.brand.slug)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-foreground transition-colors">
            Categories
          </Link>
          <span>/</span>
          <Link href={`/categories/${product.category.slug}`} className="hover:text-foreground transition-colors">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold truncate max-w-xs sm:max-w-md">{product.name}</span>
        </nav>

        {/* Top Product Showcase Section: Gallery (Left) & Configurator/Actions (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl bg-secondary/40 border border-border overflow-hidden flex items-center justify-center p-8 sm:p-12 shadow-sm">
              {product.is_flash_sale && (
                <Badge variant="destructive" className="absolute top-4 left-4 z-10 font-bold uppercase tracking-wider px-3 py-1 shadow-md">
                  Flash Sale
                </Badge>
              )}
              {discountPct > 0 && (
                <Badge className="absolute top-4 right-4 z-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 shadow-md">
                  Save {discountPct}%
                </Badge>
              )}
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                loading="lazy"
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 overflow-hidden bg-secondary/40 p-2 shrink-0 transition-all ${
                      selectedImage === img
                        ? "border-primary scale-95 shadow-md"
                        : "border-border hover:border-muted-foreground opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Phase 3 Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <Link
                  href={`/brands/${product.brand.slug}`}
                  className="text-primary hover:underline"
                >
                  {product.brand.name}
                </Link>
                <span className="text-muted-foreground font-mono">SKU: {activeSku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Ratings Summary */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-500" : "opacity-30"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({product.review_count} Verified Reviews)</span>
              </div>
            </div>

            {/* Live Pricing Box */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  ₦{activePrice.toLocaleString("en-NG")}
                </span>
                {activeComparePrice && activeComparePrice > activePrice && (
                  <span className="text-base sm:text-lg font-bold text-muted-foreground line-through">
                    ₦{activeComparePrice.toLocaleString("en-NG")}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs pt-2 border-t border-border/60">
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> In Stock ({activeStock} units available)
                </span>
                <span>&bull;</span>
                <span className="text-muted-foreground">Price includes VAT</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {product.short_description || product.description}
            </p>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground uppercase tracking-wider">
                    Select Hardware Configuration:
                  </span>
                  <span className="font-semibold text-primary">{activeVariant?.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedVariantIdx === idx
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-secondary/40 hover:bg-muted"
                      }`}
                    >
                      <div className="text-xs font-bold text-foreground truncate">{v.name}</div>
                      <div className="text-[11px] font-semibold text-muted-foreground mt-0.5">
                        ₦{v.price.toLocaleString("en-NG")}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 3 Notice & Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Phase 2 Storefront Preview</span>
                  <span>Shopping Cart, Checkout, and Payment processing workflows are locked and scheduled for Phase 3 implementation.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <Button
                  disabled
                  size="lg"
                  className="sm:col-span-3 h-13 font-bold text-xs uppercase tracking-wider gap-2 bg-secondary text-muted-foreground cursor-not-allowed border border-border"
                  title="Shopping Cart available in Phase 3 — Commerce Engine"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart (Phase 3)
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => toggleWishlist(product)}
                  className={`sm:col-span-2 h-13 font-bold text-xs gap-2 rounded-xl ${
                    inWishlist ? "border-rose-500 text-rose-500 bg-rose-500/10" : ""
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
                  {inWishlist ? "Saved" : "Wishlist"}
                </Button>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: product.name, url: window.location.href });
                    }
                  }}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Share2 className="w-4 h-4" /> Share Product
                </button>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  Have questions about this item?
                </Link>
              </div>
            </div>

            {/* Value Pillars Box */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border text-center">
              <div className="p-3 rounded-xl bg-secondary/50 border border-border">
                <ShieldCheck className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-bold text-foreground block">100% Genuine</span>
                <span className="text-[10px] text-muted-foreground">Manufacturer Warranty</span>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50 border border-border">
                <Truck className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-foreground block">Express Delivery</span>
                <span className="text-[10px] text-muted-foreground">Same-Day Dispatch</span>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50 border border-border">
                <RotateCcw className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-foreground block">7-Day DOA</span>
                <span className="text-[10px] text-muted-foreground">Replacement Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modular Tabbed Sections: Overview, Specifications, Customer Reviews */}
        <div className="rounded-3xl bg-card border border-border shadow-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-border bg-secondary/40 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-8 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                activeTab === "overview"
                  ? "border-primary text-primary bg-card"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Product Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`px-8 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                activeTab === "specs"
                  ? "border-primary text-primary bg-card"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Technical Specifications ({product.specifications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`px-8 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                activeTab === "reviews"
                  ? "border-primary text-primary bg-card"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Customer Reviews ({product.reviews.length})
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-8 sm:p-12">
            {activeTab === "overview" && (
              <div className="max-w-4xl space-y-6 text-sm text-foreground leading-relaxed">
                <h3 className="text-xl font-bold text-foreground">Detailed Product Description</h3>
                <p>{product.description}</p>
                <div className="p-6 rounded-2xl bg-secondary/40 border border-border space-y-3">
                  <h4 className="font-bold text-foreground">Why Buy From Hopsy Plaza?</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                    <li>100% Factory Sealed packaging directly from official brand distribution channels.</li>
                    <li>Full support for direct OEM warranty claims and serial number verification.</li>
                    <li>Complimentary hardware diagnostic testing prior to dispatch upon request.</li>
                    <li>Official corporate VAT invoicing available for business and IT department orders.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-4xl space-y-6">
                <h3 className="text-xl font-bold text-foreground">Complete Technical Data Sheet</h3>
                {product.specifications.length > 0 ? (
                  <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-secondary/30 transition-colors text-xs">
                        <span className="font-bold text-muted-foreground sm:col-span-1">{spec.name}</span>
                        <span className="font-semibold text-foreground sm:col-span-2 mt-1 sm:mt-0">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Standard technical specifications will be uploaded shortly for this SKU.</p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-4xl space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-secondary/40 border border-border gap-6">
                  <div className="text-center sm:text-left">
                    <span className="text-4xl font-black text-foreground">{product.rating.toFixed(1)}</span>
                    <div className="flex items-center justify-center sm:justify-start text-amber-500 my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold">
                      Based on {product.reviews.length} Verified Customer Purchases
                    </span>
                  </div>

                  <Button className="font-bold text-xs px-6">
                    Write a Product Review
                  </Button>
                </div>

                {product.reviews.length > 0 ? (
                  <div className="space-y-6 divide-y divide-border">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="pt-6 first:pt-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-bold text-xs text-foreground">
                              {rev.user_name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-foreground block">{rev.user_name}</span>
                              {rev.verified_purchase && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                  <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            {new Date(rev.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>

                        {rev.title && <h5 className="text-xs font-bold text-foreground">{rev.title}</h5>}
                        <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-6">No customer reviews yet. Be the first to review this product!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related / Frequently Bought Together Showcase */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">RECOMMENDED HARDWARE</span>
                <h3 className="text-2xl font-black text-foreground mt-1">Frequently Bought Together & Related Items</h3>
              </div>
              <Link href={`/categories/${product.category.slug}`} className="text-xs font-bold text-primary hover:underline">
                View All {product.category.name} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} onQuickView={(p) => setQuickViewProduct(p)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

