"use client";

import React from "react";
import { type MockProduct } from "@hopsy/commerce/src/mock-data";
import { ShopProductCard } from "./shop-product-card";

interface ProductCardProps {
  product: MockProduct;
  onQuickView?: (product: MockProduct) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  return <ShopProductCard product={product} onQuickView={onQuickView} />;
}

