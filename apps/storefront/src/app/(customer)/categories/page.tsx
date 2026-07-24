"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";
import React from "react";
import Link from "next/link";
import {
  Laptop,
  Smartphone,
  Headphones,
  Tv,
  Gamepad2,
  Camera,
  Watch,
  Speaker,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";


export default function CategoriesOverviewPage() {
  const { products, categories, brands, loading } = useStorefrontData();
  if (loading) return <div>Loading...</div>;

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case "Laptop":
        return <Laptop className="w-8 h-8 text-primary" />;
      case "Smartphone":
        return <Smartphone className="w-8 h-8 text-primary" />;
      case "Headphones":
        return <Headphones className="w-8 h-8 text-primary" />;
      case "Tv":
        return <Tv className="w-8 h-8 text-primary" />;
      case "Gamepad":
        return <Gamepad2 className="w-8 h-8 text-primary" />;
      case "Camera":
        return <Camera className="w-8 h-8 text-primary" />;
      case "Watch":
        return <Watch className="w-8 h-8 text-primary" />;
      case "Speaker":
        return <Speaker className="w-8 h-8 text-primary" />;
      default:
        return <Laptop className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Categories</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALL HARDWARE DEPARTMENTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Explore Electronics Categories
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From high-performance M-series laptops to studio-grade acoustics and 144Hz OLED panels, browse our full directory of factory-sealed hardware.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col justify-between p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs font-bold text-foreground">
                    {cat.itemCount}+ Items
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" /> 100% Genuine Warranty
                </span>
                <span className="text-primary font-bold group-hover:underline">
                  Browse Catalog &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

