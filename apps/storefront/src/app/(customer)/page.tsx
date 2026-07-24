"use client";

import React, { useState } from "react";
import { HeroSlider } from "@/components/customer/hero-slider";
import { CategoryGrid } from "@/components/customer/category-grid";
import { YouMightLikeSection } from "@/components/customer/you-might-like";
import { WhyChooseUsSection } from "@/components/customer/why-choose-us";
import { TopSellingProductsSection } from "@/components/customer/top-selling-products";
import dynamic from "next/dynamic";
import { type MockProduct } from "@hopsy/commerce/src/mock-data";

const PromoBannerTablet = dynamic(() => import("@/components/customer/promo-banner-tablet").then(mod => mod.PromoBannerTablet));
const TrendingProductsSection = dynamic(() => import("@/components/customer/trending-products").then(mod => mod.TrendingProductsSection));
const PromoBannerAudio = dynamic(() => import("@/components/customer/promo-banner-audio").then(mod => mod.PromoBannerAudio));
const LatestLaunchesSection = dynamic(() => import("@/components/customer/latest-launches").then(mod => mod.LatestLaunchesSection));
const BrandGrid = dynamic(() => import("@/components/customer/brand-grid").then(mod => mod.BrandGrid));
const TestimonialsSection = dynamic(() => import("@/components/customer/testimonials").then(mod => mod.TestimonialsSection));
const FaqAccordion = dynamic(() => import("@/components/customer/faq-accordion").then(mod => mod.FaqAccordion));
const QuickViewModal = dynamic(() => import("@/components/customer/quick-view-modal").then(mod => mod.QuickViewModal));

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<MockProduct | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Showcase & Feature Cards (Veluno exact layout) */}
      <HeroSlider />

      {/* 2. Explore By Category Bento Grid & Horizontal Watch Promos */}
      <CategoryGrid />

      {/* 3. You Might Like These (Spotlight Card Left + 4 Square Product Grid Right) */}
      <YouMightLikeSection />

      {/* 4. Why Choose Us (Split Lifestyle Left + Accordion Right + 4 Benefit Cards) */}
      <WhyChooseUsSection />

      {/* 5. Top-selling Products */}
      <TopSellingProductsSection />

      {/* 6. Tablet Promo Banner (iPad 6T Pro Beige Banner) */}
      <PromoBannerTablet />

      {/* 7. Trending Products (+ Cart buttons) */}
      <TrendingProductsSection />

      {/* 8. Audio Promo Banner (AIR PRO X TWS Dark Banner) */}
      <PromoBannerAudio />

      {/* 9. Latest Launches */}
      <LatestLaunchesSection />

      {/* 10. Enterprise Brand Grid */}
      <BrandGrid />

      {/* 11. Testimonials & Client Endorsements */}
      <TestimonialsSection />

      {/* 12. FAQ Accordion */}
      <FaqAccordion />

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

