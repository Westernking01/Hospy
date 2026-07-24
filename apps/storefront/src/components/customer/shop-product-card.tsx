"use client";

import React from "react";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, CheckCircle2 } from "lucide-react";
import { type MockProduct } from "@hopsy/commerce/src/mock-data";
import { useWishlist } from "./wishlist-context";
import { useCart } from "./cart-context";

interface ShopProductCardProps {
  product: MockProduct;
  onQuickView?: (product: MockProduct) => void;
  hideWishlistButton?: boolean;
}

export function ShopProductCard({ product, onQuickView, hideWishlistButton = false }: ShopProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  return (
    <div className="group flex flex-col justify-between h-full">
      {/* Top Image Stage with Beige/Warm Rounded-3xl background exactly like Veluno/Shop screenshot */}
      <div className="relative bg-[#F4F3EF] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between border border-neutral-200/60 overflow-hidden transition-all duration-300 group-hover:shadow-md aspect-square">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between pointer-events-none">
          <div className="flex flex-col gap-1.5">
            {product.is_flash_sale && (
              <span className="pointer-events-auto bg-orange-600 text-white font-mono font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                Flash Drop
              </span>
            )}
            {product.is_new_arrival && !product.is_flash_sale && (
              <span className="pointer-events-auto bg-neutral-950 text-white font-mono font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                New
              </span>
            )}
          </div>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="pointer-events-auto font-mono font-bold text-[10px] text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2.5 py-1 rounded-full">
              Save {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
            </span>
          )}
        </div>

        {/* Center Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="w-full h-full flex items-center justify-center my-4 overflow-hidden"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-44 h-44 sm:w-52 sm:h-52 object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Bottom Action Pill Bar inside the image stage (Wishlist & Quick View) */}
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2.5 opacity-95 group-hover:opacity-100 transition-opacity z-20">
          {!hideWishlistButton && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center transition-all transform active:scale-90 border ${
                inWishlist
                  ? "bg-rose-600 text-white border-rose-600"
                  : "bg-white text-neutral-700 hover:bg-rose-600 hover:text-white border-neutral-200/50"
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
            </button>
          )}

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              title="Quick View"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-700 hover:bg-orange-600 hover:text-white transition-all transform active:scale-90 border border-neutral-200/50"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Info Section (Below the beige box exactly as shown in screenshot) */}
      <div className="mt-4 px-1 flex flex-col justify-between flex-1 gap-1">
        <div>
          <Link href={`/products/${product.slug}`} className="block group/title">
            <h3 className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight leading-snug line-clamp-1 group-hover/title:text-orange-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs font-mono text-neutral-400 mt-0.5 truncate">
            {product.brand.name} &bull; {product.category.name}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-black font-mono text-neutral-950 tracking-tight">
                ₦{product.price.toLocaleString("en-NG")}
              </span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-xs font-mono text-neutral-400 line-through">
                  ₦{product.compare_at_price.toLocaleString("en-NG")}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> In Stock &bull; 100% Genuine
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            title="Add to Cart"
            className="w-10 h-10 rounded-full bg-neutral-950 text-white hover:bg-orange-600 shadow-md flex items-center justify-center transition-all transform active:scale-95 shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

