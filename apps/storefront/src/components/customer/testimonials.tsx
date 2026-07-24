"use client";
import { MOCK_TESTIMONIALS } from "@hopsy/commerce/src/mock-data";
import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";


export function TestimonialsSection() {
  return (
    <section className="py-20 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-orange-500 uppercase tracking-widest">
              ENTERPRISE & PROFESSIONAL FIELD REPORTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">
              Executive Deployment Reviews
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-normal">
            See why IT infrastructure directors, studio sound engineers, and field technicians rely on Hopsy Plaza for factory-sealed hardware allocation.
          </p>
        </div>

        {/* Clean High-Contrast Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all relative group"
            >
              <Quote className="w-8 h-8 text-neutral-800 absolute top-6 right-6 pointer-events-none group-hover:text-neutral-700 transition-colors" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-orange-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-orange-500" />
                  ))}
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed font-normal">
                  &ldquo;{(t as any).content || (t as any).comment}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between relative z-10">
                <div>
                  <h4 className="text-xs font-bold text-white tracking-tight">{(t as any).author || (t as any).user_name}</h4>
                  <p className="text-[11px] font-mono text-neutral-400 mt-0.5">{t.role}</p>
                </div>

                <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                  <CheckCircle2 className="w-3 h-3" /> Verified Deployment
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

