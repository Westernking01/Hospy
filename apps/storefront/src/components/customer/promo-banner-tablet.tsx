"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function PromoBannerTablet() {
  return (
    <section className="py-12 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full width beige/warm-neutral banner exactly matching screenshot */}
        <div className="relative rounded-3xl bg-[#EBE9E4] overflow-hidden border border-neutral-300/80 shadow-sm p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 group">
          {/* Left Text Box */}
          <div className="relative z-10 max-w-xl space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Next-Gen Tablet Pro</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tighter leading-tight">
              iPad 6T Pro
            </h2>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal max-w-lg">
              Experience the next generation of portable computing with ultra-thin OLED Liquid Retina displays and enterprise-grade neural processing speed.
            </p>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-orange-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Tablet Mockup Stage */}
          <div className="relative z-10 w-full max-w-md lg:max-w-lg shrink-0 flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80"
                alt="iPad 6T Pro Display Mockup"
                className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
