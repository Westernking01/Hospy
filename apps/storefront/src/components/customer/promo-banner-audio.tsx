"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";

export function PromoBannerAudio() {
  return (
    <section className="py-12 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full width dark audio banner exactly matching screenshot */}
        <div className="relative rounded-3xl bg-neutral-950 text-white overflow-hidden border border-neutral-800 shadow-md p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 group">
          {/* Left Text Box */}
          <div className="relative z-10 max-w-xl space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
              <Headphones className="w-3.5 h-3.5" />
              <span>Acoustic Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
              AIR PRO X TWS
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-lg">
              Next-gen active noise cancellation with spatial audio immersion, custom beryllium drivers, and 48-hour ultra-dense battery capacity.
            </p>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-orange-600 text-neutral-950 hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-4 h-4 text-orange-600 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Audio Earbuds Stage */}
          <div className="relative z-10 w-full max-w-md lg:max-w-lg shrink-0 flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80"
                alt="Air Pro X TWS Audio Studio Mockup"
                className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
