"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Lock,
  ShieldCheck,
  Headphones,
  RotateCcw,
  BadgeCheck,
  Tag,
  PackageCheck,
  UserCheck,
  Gift,
} from "lucide-react";

export function WhyChooseUsSection() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const accordionItems = [
    {
      title: "1. Official Manufacturer Warranty",
      content:
        "Every hardware unit is dispatched with full OEM factory sealing and verifiable serial numbers valid at certified service centers nationwide.",
    },
    {
      title: "2. 24/7 Expert Tech Support",
      content:
        "Direct access to our certified system architects and hardware engineers to assist with workstation setups, network configuration, and diagnostics.",
    },
    {
      title: "3. Express Same-Day Dispatch",
      content:
        "Instant allocation and insured courier delivery across Lagos and major business districts for orders confirmed before 2:00 PM.",
    },
    {
      title: "4. Easy 30-Day Returns & Exchange",
      content:
        "Comprehensive DOA (dead on arrival) and factory defect replacement guarantee with no administrative bottlenecks or restocking fees.",
    },
  ];

  const allFeatureCards = [
    {
      title: "Fast Delivery",
      desc: "Insured same-day dispatch & express nationwide courier tracking.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Secure Payment",
      desc: "End-to-end encrypted multi-layer financial transaction gateways.",
      icon: <Lock className="w-6 h-6" />,
    },
    {
      title: "Official Warranty",
      desc: "Direct OEM manufacturer replacement guarantee & valid serial IDs.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Customer Support",
      desc: "24/7 dedicated system architects & hardware engineers on standby.",
      icon: <Headphones className="w-6 h-6" />,
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free 30-day DOA replacement & exchange assurance.",
      icon: <RotateCcw className="w-6 h-6" />,
    },
    {
      title: "Quality Assurance",
      desc: "100% multi-stage diagnostic testing before unit dispatch.",
      icon: <BadgeCheck className="w-6 h-6" />,
    },
    {
      title: "Best Tier Prices",
      desc: "Direct factory procurement rates & B2B volume tier allocation.",
      icon: <Tag className="w-6 h-6" />,
    },
    {
      title: "Authentic Products",
      desc: "Guaranteed factory-sealed packaging directly from brand foundries.",
      icon: <PackageCheck className="w-6 h-6" />,
    },
    {
      title: "Verified Sellers",
      desc: "Rigorous OEM verification & direct supply chain transparency.",
      icon: <UserCheck className="w-6 h-6" />,
    },
    {
      title: "Shopping Benefits",
      desc: "Priority drop notifications, loyalty rewards & enterprise tier credit.",
      icon: <Gift className="w-6 h-6" />,
    },
  ];


  return (
    <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Half: Split Lifestyle Display Left + Accordion Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Architectural Hardware Showcase */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-md aspect-[4/3] flex items-center justify-center p-6 group">
            <img
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"
              alt="Hopsy Plaza Hardware Bundle & Workstation Space"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105 opacity-85"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-neutral-950/95 border border-neutral-800 text-white flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[11px] font-mono font-bold text-orange-500 uppercase tracking-wider">
                  COMPLETE ECOSYSTEM SETUP
                </span>
                <h4 className="text-base font-bold tracking-tight mt-0.5 text-white">
                  Factory-Sealed Smart Appliances & Workstations
                </h4>
              </div>
              <span className="shrink-0 w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                100%
              </span>
            </div>
          </div>

          {/* Right Column: Why Choose Us & Interactive Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] font-mono font-bold text-orange-600 uppercase tracking-widest">
                ENTERPRISE COMMITMENT
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-neutral-950 mt-1">
                Why Choose Us
              </h2>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                We provide the highest specification electronics and hardware with direct manufacturer warranty & express insured delivery.
              </p>
            </div>

            {/* Interactive Accordion */}
            <div className="space-y-3 pt-2">
              {accordionItems.map((item, idx) => {
                const isOpen = openAccordion === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "bg-neutral-50 border-neutral-400 shadow-sm"
                        : "bg-white border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors"
                    >
                      <span className="font-bold text-sm sm:text-base text-neutral-900 tracking-tight">
                        {item.title}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                          isOpen ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal border-t border-neutral-200/60 pt-3">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Half: 10 Professional SVG Feature Cards Grid (100% Vector, Zero AI/Cartoonish Assets) */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-orange-600 uppercase tracking-widest">
                VERIFIED PLATFORM STANDARDS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 mt-1">
                Enterprise Assurance & Shopping Benefits
              </h3>
            </div>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-950 hover:text-orange-600 uppercase tracking-wider transition-colors group"
            >
              <span>Join Enterprise Network</span>
              <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {allFeatureCards.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-100/70 transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 group-hover:border-orange-500 flex items-center justify-center text-neutral-900 group-hover:text-orange-600 transition-colors shadow-xs shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors tracking-tight">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-medium mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
