"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Search,
  ChevronRight,
  Laptop,
  Smartphone,
  Headphones,
  Tv,
  Gamepad2,
  Camera,
  Watch,
  Speaker,
  Heart,
  User,
  ShieldCheck,
  Phone,
} from "lucide-react";

import { Button } from "@hopsy/ui";
import { BrandLogo } from "@/components/common/brand-logo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { products, categories, brands } = useStorefrontData();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"categories" | "brands" | "links">("categories");

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case "Laptop":
        return <Laptop className="w-4 h-4 text-orange-600" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4 text-orange-600" />;
      case "Headphones":
        return <Headphones className="w-4 h-4 text-orange-600" />;
      case "Tv":
        return <Tv className="w-4 h-4 text-orange-600" />;
      case "Gamepad":
        return <Gamepad2 className="w-4 h-4 text-orange-600" />;
      case "Camera":
        return <Camera className="w-4 h-4 text-orange-600" />;
      case "Watch":
        return <Watch className="w-4 h-4 text-orange-600" />;
      case "Speaker":
        return <Speaker className="w-4 h-4 text-orange-600" />;
      default:
        return <Laptop className="w-4 h-4 text-orange-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Solid Black Backdrop without blur slop */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-4/5 max-w-sm bg-white border-r border-neutral-300 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center">
            <BrandLogo variant="horizontal" size="md" />
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu" className="rounded border border-neutral-200 hover:bg-neutral-100">
            <X className="w-5 h-5 text-neutral-900" />
          </Button>
        </div>

        {/* Mobile Search Input */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search hardware, OEMs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded bg-white border border-neutral-300 text-sm font-mono focus:border-neutral-950 outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
          </form>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-100 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "categories"
                ? "text-orange-600 border-orange-600 bg-white"
                : "border-transparent hover:text-neutral-900"
            }`}
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("brands")}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "brands"
                ? "text-orange-600 border-orange-600 bg-white"
                : "border-transparent hover:text-neutral-900"
            }`}
          >
            OEM Brands
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("links")}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "links"
                ? "text-orange-600 border-orange-600 bg-white"
                : "border-transparent hover:text-neutral-900"
            }`}
          >
            Quick Links
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "categories" && (
            <div className="space-y-1 font-mono">
              <Link
                href="/categories"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors mb-3"
              >
                <span>Complete Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center shrink-0">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{cat.name}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">{cat.itemCount}+ units</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ))}
            </div>
          )}

          {activeTab === "brands" && (
            <div className="space-y-1 font-mono">
              <Link
                href="/brands"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors mb-3"
              >
                <span>Authorized Brand Showcase</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 px-1.5 min-w-[32px] rounded bg-white border border-neutral-200 flex items-center justify-center font-mono font-bold text-xs text-neutral-900 shrink-0">
                      {brand.logo_url ? (
                        <img
                          src={brand.logo_url}
                          alt={`${brand.name} logo`}
                          className="h-4 w-auto max-w-[50px] object-contain"
                          loading="lazy"
                        />
                      ) : (
                        brand.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <span className="text-xs font-bold text-neutral-900">{brand.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ))}
            </div>
          )}

          {activeTab === "links" && (
            <div className="space-y-2 text-xs font-mono font-bold uppercase tracking-wider">
              <Link
                href="/search?isTrending=true"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded hover:bg-neutral-50 text-neutral-900 border border-transparent hover:border-neutral-200"
              >
                <span>Trending Units</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
              <Link
                href="/search?isNewArrival=true"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded hover:bg-neutral-50 text-neutral-900 border border-transparent hover:border-neutral-200"
              >
                <span>New Specifications</span>
              </Link>
              <Link
                href="/search?isFlashSale=true"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded hover:bg-neutral-50 text-orange-600 border border-transparent hover:border-orange-600"
              >
                <span>Price Drops & Offers</span>
                <ChevronRight className="w-4 h-4 text-orange-600" />
              </Link>
              <Link
                href="/track-order"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded hover:bg-neutral-50 text-neutral-900 border border-transparent hover:border-neutral-200"
              >
                <span>Dispatch Status</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
              <Link
                href="/faq"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded hover:bg-neutral-50 text-neutral-900 border border-transparent hover:border-neutral-200"
              >
                <span>Technical Support & FAQ</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-3 font-mono">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/auth/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-neutral-950 text-white font-bold text-xs shadow-sm hover:bg-orange-600 transition-colors uppercase tracking-wider"
            >
              <User className="w-4 h-4" /> Account
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-white text-neutral-900 font-bold text-xs border border-neutral-300 hover:bg-neutral-100 transition-colors uppercase tracking-wider"
            >
              <Heart className="w-4 h-4 text-orange-600" /> Wishlist
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>100% GENUINE HARDWARE GUARANTEE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

