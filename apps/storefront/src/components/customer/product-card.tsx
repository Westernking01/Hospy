"use client";

import React from "react";

import { ShopProductCard } from "./shop-product-card";

interface ProductCardProps {
  product: MockProduct;
  onQuickView?: (product: MockProduct) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  return <ShopProductCard product={product} onQuickView={onQuickView} />;
}

