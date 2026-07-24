"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { useWishlist } from "@/components/customer/wishlist-context";
import { useCart } from "@/components/customer/cart-context";
import { ShopProductCard } from "@/components/customer/shop-product-card";
import { QuickViewModal } from "@/components/customer/quick-view-modal";
import { MOCK_PRODUCTS, type MockProduct } from "@hopsy/commerce/src/mock-data";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<MockProduct | null>(null);
  const [movedAllNotification, setMovedAllNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // If user has not bookmarked any items yet, show 4 high-end sample products so the exact #F4F3EF layout is instantly visible
  const displayItems = useMemo(() => {
    if (wishlistItems && wishlistItems.length > 0) {
      return wishlistItems;
    }
    return MOCK_PRODUCTS.slice(0, 4);
  }, [wishlistItems]);

  const handleMoveAllToCart = () => {
    displayItems.forEach((product) => {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        quantity: 1,
      });
    });
    setMovedAllNotification(true);
    setTimeout(() => setMovedAllNotification(false), 4000);
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
          <span className="font-bold text-neutral-900">Saved Wishlist</span>
        </nav>
      </div>

      {/* Main Wishlist Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-bold text-[11px] font-mono tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>BOOKMARKED HARDWARE SELECTIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 flex items-center gap-3.5">
              <span>My Saved Wishlist</span>
              <span className="text-sm font-bold font-mono bg-neutral-100 text-neutral-900 px-3.5 py-1 rounded-full border border-neutral-200">
                {wishlistItems.length > 0 ? wishlistItems.length : displayItems.length} {wishlistItems.length === 1 ? "Item" : "Items"}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-mono max-w-2xl">
              {wishlistItems.length > 0
                ? "Review your saved HOPSY PLAZA hardware models below. Click the circular bag button to move an item directly into your cart."
                : "Your personal wishlist is currently displaying preview hardware selections. Bookmark any product across our store to save it here for instant procurement."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleMoveAllToCart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>

            {wishlistItems.length > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-neutral-200 hover:border-rose-300 bg-white hover:bg-rose-50 text-neutral-700 hover:text-rose-600 font-bold text-xs transition-all shadow-2xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Notification Alert if Moved All to Cart */}
        {movedAllNotification && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All displayed wishlist items have been added to your shopping cart!</span>
            </div>
            <Link
              href="/cart"
              className="px-4 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shrink-0 font-sans"
            >
              View Cart &rarr;
            </Link>
          </div>
        )}

        {/* Wishlist Grid (Using exact #F4F3EF ShopProductCard rounded-3xl layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
          {displayItems.map((product) => (
            <div key={product.id} className="relative group">
              <ShopProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
                hideWishlistButton={true}
              />
              {wishlistItems.some((i) => i.id === product.id) && (
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from wishlist"
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 border border-neutral-200 hover:border-rose-300 text-neutral-400 hover:text-rose-600 flex items-center justify-center transition-all shadow-2xs"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION BELOW: Explore Recommended Hardware Pieces (Strict grid matching screenshot layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 border-t border-neutral-100">
        <h2 className="text-2xl sm:text-4xl font-black text-center text-neutral-950 mb-10 tracking-tight">
          Explore Recommended Hardware
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {MOCK_PRODUCTS.slice(2, 6).map((product) => (
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

      {/* SECTION BELOW: Exquisite Engineering Countdown Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#EFECE6] rounded-3xl p-8 sm:p-14 border border-neutral-200/80 text-center relative overflow-hidden">
          <span className="text-[10px] font-mono font-bold uppercase text-orange-600 tracking-widest block mb-2">
            LIMITED OEM SHOWCASE DROP
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 max-w-xl mx-auto tracking-tight leading-tight">
            Exquisite Engineering, Timeless Comfort
          </h2>

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

