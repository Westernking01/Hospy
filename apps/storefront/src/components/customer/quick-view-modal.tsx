"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Heart, Star, ShieldCheck, ShoppingCart, ArrowRight, CheckCircle2 } from "lucide-react";
import { type MockProduct } from "@hopsy/commerce/src/mock-data";
import { useWishlist } from "./wishlist-context";
import { useCart } from "./cart-context";
import { Button } from "@hopsy/ui";
import { Badge } from "@hopsy/ui";

interface QuickViewModalProps {
  product: MockProduct | null;
  isOpen?: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);

  if (!product) return null;

  const currentImg = selectedImage || product.images[0];
  const inWishlist = isInWishlist(product.id);
  const activePrice = product.variants[selectedVariant]?.price || product.price;
  const activeComparePrice = product.variants[selectedVariant]?.compare_at_price || product.compare_at_price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Crisp Solid Backdrop without blur slop */}
      <div
        className="fixed inset-0 bg-black/80 animate-in fade-in-0 duration-150"
        onClick={onClose}
      />

      {/* Modal Hardware Specification Panel */}
      <div className="relative w-full max-w-4xl bg-white border border-neutral-300 rounded shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-8 h-8 rounded border border-neutral-300 bg-neutral-100 text-neutral-900 flex items-center justify-center hover:bg-neutral-950 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-neutral-50 border-r border-neutral-200 flex flex-col justify-between">
          <div className="relative aspect-square rounded bg-white border border-neutral-200 overflow-hidden flex items-center justify-center p-4">
            {product.is_flash_sale && (
              <Badge className="absolute top-3 left-3 z-10 bg-orange-600 hover:bg-orange-600 text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded-none px-2 py-0.5">
                FLASH SALE
              </Badge>
            )}
            {product.is_new_arrival && !product.is_flash_sale && (
              <Badge className="absolute top-3 left-3 z-10 bg-neutral-950 hover:bg-neutral-950 text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded-none px-2 py-0.5">
                NEW SPEC
              </Badge>
            )}
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded border overflow-hidden bg-white shrink-0 transition-all cursor-pointer ${
                    currentImg === img ? "border-orange-600 scale-95 ring-1 ring-orange-600" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-neutral-200 pb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                {product.brand.name} &bull; {product.category.name}
              </span>
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-orange-600">
                <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-neutral-400 font-normal">({product.review_count})</span>
              </div>
            </div>

            <h2 className="text-lg font-black text-neutral-900 tracking-tight leading-snug">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-mono font-black text-neutral-950">
                ₦{activePrice.toLocaleString("en-NG")}
              </span>
              {activeComparePrice && activeComparePrice > activePrice && (
                <span className="text-sm font-mono font-semibold text-neutral-400 line-through">
                  ₦{activeComparePrice.toLocaleString("en-NG")}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 pt-2 border-t border-neutral-200">
              {product.short_description || product.description}
            </p>

            {/* SKU & Stock */}
            <div className="flex items-center justify-between gap-4 text-xs pt-2 font-mono">
              <span className="text-neutral-500">
                SKU: <span className="text-neutral-900 font-semibold">{product.sku}</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> IN STOCK ({product.stock_quantity} UNITS)
              </span>
            </div>

            {/* Variant Selector if available */}
            {product.variants.length > 0 && (
              <div className="pt-3 border-t border-neutral-200 space-y-2">
                <span className="text-[11px] font-mono font-bold text-neutral-900 block uppercase tracking-wider">
                  Select Specification:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(idx)}
                      className={`px-3 py-1.5 rounded border text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedVariant === idx
                          ? "border-orange-600 bg-orange-50 text-orange-600"
                          : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <div className="grid grid-cols-5 gap-2">
              <Button
                variant="outline"
                onClick={() => toggleWishlist(product)}
                className={`col-span-2 h-11 font-mono font-bold text-xs gap-1.5 rounded border ${
                  inWishlist
                    ? "border-orange-600 text-orange-600 bg-orange-50"
                    : "border-neutral-300 text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? "fill-orange-600 text-orange-600" : ""}`} />
                {inWishlist ? "SAVED" : "SAVE SPEC"}
              </Button>

              <Button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: activePrice,
                    image: currentImg,
                    quantity: 1,
                  });
                  onClose();
                }}
                className="col-span-3 h-11 font-mono font-bold text-xs gap-1.5 rounded bg-neutral-950 text-white hover:bg-orange-600 shadow-md transition-all active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" /> ADD TO CART
              </Button>
            </div>

            <div className="grid grid-cols-1">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="w-full h-11 flex items-center justify-center gap-2 rounded bg-neutral-950 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-sm"
              >
                Complete Hardware Spec & Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>100% FACTORY SEALED & GENUINE WARRANTY GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

