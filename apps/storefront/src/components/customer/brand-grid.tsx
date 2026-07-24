"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { MOCK_BRANDS } from "@hopsy/commerce/src/mock-data";

export function BrandGrid() {
  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Precision Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-neutral-900">
          <div>
            <span className="text-[11px] font-mono font-bold text-orange-600 uppercase tracking-widest">
              FACTORY DIRECT PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 mt-1">
              Authorized Manufacturer Roster
            </h2>
          </div>
          <Link
            href="/brands"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-orange-600 uppercase tracking-wider transition-colors group"
          >
            <span>Complete Brand Roster</span>
            <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Premier Platform Identity & OEM Direct Partnership Feature Box */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="h-16 px-6 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-neutral-200">
              {/* Use uploaded company logo exactly as provided without modification */}
              <img
                src="/branding/logo/logo-horizontal.svg"
                alt="HOPSY PLAZA Official Brand Mark"
                className="h-8 w-auto max-w-[170px] object-contain"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                <span>Premier OEM Platform Identity</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Direct Global Foundry Procurement Network
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                HOPSY PLAZA operates as the verified central supply architecture connecting institutional buyers directly with top-tier global hardware manufacturers.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm group/btn"
            >
              <span>Our Supply Protocol</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Clean Architectural Grid of 10 Official Vector Logos (Zero AI/Cartoonish Assets) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {MOCK_BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col justify-between p-6 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-100/80 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="h-14 px-4 min-w-[70px] rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-mono font-bold text-base text-neutral-900 group-hover:border-orange-500 group-hover:text-orange-600 transition-colors shadow-xs">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={`${brand.name} official vector mark`}
                      className="h-6 sm:h-7 w-auto max-w-[100px] object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    brand.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-600 bg-neutral-200/80 px-2.5 py-1 rounded">
                  {brand.productCount}
                </span>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors tracking-tight">
                  {brand.name}
                </h3>
                <p className="text-[11px] text-neutral-500 font-medium mt-0.5 line-clamp-1">
                  OEM Authorized Hardware
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-neutral-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
          <span>Every product verified with official manufacturer serial numbers and direct OEM warranty coverage across all 10 partner foundries.</span>
        </div>
      </div>
    </section>
  );
}

