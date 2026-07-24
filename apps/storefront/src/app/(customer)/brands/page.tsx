"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";
import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Search, ArrowRight, CheckCircle2 } from "lucide-react";


export default function BrandsOverviewPage() {
  const { products, categories, brands, loading } = useStorefrontData();
  if (loading) return <div>Loading...</div>;

  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Brands</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              OFFICIAL MANUFACTURER PARTNERS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Authorized Brand Directory
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every hardware unit dispatched by Hopsy Plaza is sourced directly from certified OEM distribution channels with full international warranty support.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative shrink-0">
            <input
              type="text"
              placeholder="Filter brand names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-card border border-border text-sm focus:border-primary outline-none shadow-sm"
            />
            <Search className="w-4.5 h-4.5 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col justify-between p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-16 px-4 min-w-[64px] rounded-xl bg-white border border-border flex items-center justify-center font-black text-xl text-foreground group-hover:border-primary transition-all shadow-inner">
                    {brand.logo_url ? (
                      <img
                        src={brand.logo_url}
                        alt={`${brand.name} logo`}
                        className="h-8 w-auto max-w-[100px] object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      brand.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs font-bold text-foreground">
                    {brand.productCount} Authorized Products
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{brand.name}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> Direct OEM Warranty
                </span>
                <span className="text-primary font-bold group-hover:underline">
                  Explore Brand Showcase &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-secondary/40 border border-border text-center space-y-3">
          <ShieldCheck className="w-8 h-8 text-primary mx-auto" />
          <h3 className="text-base font-bold text-foreground">Are you a technology manufacturer or regional distributor?</h3>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            Join Hopsy Plaza&apos;s authorized vendor network to supply enterprise and consumer computing hardware to over 50,000 active buyers across West Africa.
          </p>
        </div>
      </div>
    </div>
  );
}

