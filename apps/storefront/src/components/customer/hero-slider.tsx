"use client";
import { MOCK_BANNERS } from "@hopsy/commerce/src/mock-data";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Star, Plus } from "lucide-react";

import { Button } from "@hopsy/ui";
import { Image } from "@/components/ui/image";

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_BANNERS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % MOCK_BANNERS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + MOCK_BANNERS.length) % MOCK_BANNERS.length);

  const currentBanner = MOCK_BANNERS[currentIndex];

  // 3 horizontal feature/promo cards exactly matching the screenshot structure below the hero banner
  const featureCards = [
    {
      title: "Self-cleaning AI Laptops",
      subtitle: "Silent thermal propulsion",
      link: "/categories/laptops-computers",
      thumbs: [
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80",
      ],
    },
    {
      title: "Lossless ANC Earbuds",
      subtitle: "30-hour spatial acoustics",
      link: "/categories/audio-headphones",
      thumbs: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80",
      ],
    },
    {
      title: "Pro Tandem OLED Tablet",
      subtitle: "M4 Ultra performance",
      link: "/categories/tablets-ereaders",
      thumbs: [
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=200&q=80",
      ],
    },
  ];

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-Width Rounded Hero Card matching screenshot ("Step Into The Future") */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 min-h-[460px] sm:min-h-[540px] flex flex-col justify-between p-8 sm:p-14 shadow-xl">
          {/* Background Image with subtle gradient overlay */}
          <Image
            key={currentBanner.id}
            src={currentBanner.image_url}
            alt={currentBanner.title}
            className="object-cover opacity-65 transition-transform duration-700 hover:scale-105"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />

          {/* Top Badge / Slider dots */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-700 text-[11px] font-mono font-bold uppercase tracking-wider text-orange-500">
              <Star className="w-3.5 h-3.5 shrink-0" />
              <span>{currentBanner.badge}</span>
            </div>

            <div className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-700 px-3 py-1.5 rounded-full">
              {MOCK_BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentIndex === idx ? "w-6 bg-orange-500" : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Main Hero Content ("Step Into The Future" layout) */}
          <div className="relative z-10 max-w-2xl space-y-5 my-auto py-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-white">
              {currentBanner.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-lg">
              {currentBanner.subtitle}
            </p>
            <div className="pt-2">
              <Link href={currentBanner.cta_link}>
                <Button className="h-12 px-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md gap-2">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 text-neutral-950" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Trust bar & arrows inside Hero */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                100% Genuine Manufacturer Warranty
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-500" />
                Same-Day Executive Dispatch
              </span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-neutral-900/80 border border-neutral-700 text-white flex items-center justify-center hover:bg-white hover:text-neutral-950 transition-colors"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-neutral-900/80 border border-neutral-700 text-white flex items-center justify-center hover:bg-white hover:text-neutral-950 transition-colors"
                aria-label="Next banner"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Horizontal Feature Cards directly below the Hero Banner exactly matching the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {featureCards.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group flex items-center justify-between p-5 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/80 transition-all duration-200"
            >
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-sm font-bold text-neutral-950 tracking-tight group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">{item.subtitle}</p>
                </div>

                {/* Overlaid thumbnail pills */}
                <div className="flex items-center -space-x-2">
                  {item.thumbs.map((thumbUrl, tIdx) => (
                    <div
                      key={tIdx}
                      className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0 bg-neutral-200"
                    >
                      <Image src={thumbUrl} alt={`${item.title} thumbnail`} className="object-cover" fill sizes="40px" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-neutral-950 group-hover:bg-orange-600 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

