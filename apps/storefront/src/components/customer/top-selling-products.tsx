"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_TOP_SELLING_PRODUCTS, type MockProduct, type MockLayoutCardItem } from "@hopsy/commerce/src/mock-data";
import { ShopProductCard } from "./shop-product-card";
import { QuickViewModal } from "./quick-view-modal";

function toMockProduct(item: MockLayoutCardItem): MockProduct {
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
    stock_quantity: 40,
    status: "ACTIVE",
    is_featured: true,
    is_trending: false,
    is_new_arrival: false,
    is_best_seller: true,
    is_flash_sale: false,
    category: {
      id: "cat-top",
      name: item.category || "Best Seller",
      slug: "best-seller",
      description: "",
      image_url: "",
      itemCount: 1,
    },
    brand: {
      id: "br-top",
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
    rating: item.rating || 4.9,
    review_count: item.reviews || 128,
  };
}

export function TopSellingProductsSection() {
  const [quickViewProduct, setQuickViewProduct] = useState<MockProduct | null>(null);

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header exactly matching screenshot with title left and navigation buttons right */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
            Top-selling Products
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

        {/* 4-Column Product Grid matching Veluno ShopProductCard layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TOP_SELLING_PRODUCTS.map((item) => {
            const adapted = toMockProduct(item);
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

