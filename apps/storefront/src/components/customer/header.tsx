"use client";
import { useStorefrontData } from "@/components/customer/storefront-context";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useWishlist } from "./wishlist-context";
import { useCart } from "./cart-context";

import { BrandLogo } from "@/components/common/brand-logo";

export function Header({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const router = useRouter();
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const suggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200 shadow-xs">
      {/* Top Bar matching Veluno clean utility header */}
      <div className="bg-neutral-950 text-neutral-300 px-4 py-2 text-xs font-mono border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-orange-500 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Factory Sealed & OEM Warranty
            </span>
            <span className="hidden md:inline-block text-neutral-700">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-neutral-300">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              Express Same-Day Dispatch Available
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-orange-500" /> +234 (0) 800 HOPSY PLAZA
            </span>
            <span className="hidden sm:inline-block text-neutral-700">|</span>
            <Link href="/faq" className="hover:text-white transition-colors">
              Support Center
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Enterprise B2B
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar matching exact screenshot layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Mobile Menu Trigger + Brand Logo with Pill */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 min-w-[44px] min-h-[44px] text-neutral-900 hover:bg-neutral-100 rounded-lg flex items-center justify-center"
              onClick={onOpenMobileNav}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center group">
              <BrandLogo
                variant="horizontal"
                size="lg"
                className="group-hover:scale-105 transition-transform"
                priority={true}
              />
            </Link>
          </div>

          {/* Center: Horizontal Navigation Links (matching screenshot tabs: Home, Shop, Categories, Deals, About, Contact) */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-bold text-neutral-950 hover:text-orange-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-bold text-neutral-700 hover:text-orange-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="text-sm font-bold text-neutral-700 hover:text-orange-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="text-sm font-bold text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-1"
            >
              <span>Deals</span>
              <span className="px-1.5 py-0.2 rounded bg-orange-100 text-orange-700 text-[9px] font-mono font-bold uppercase">
                HOT
              </span>
            </Link>
            <Link
              href="/about"
              className="text-sm font-bold text-neutral-700 hover:text-orange-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-bold text-neutral-700 hover:text-orange-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right: Search Pill + Account + Wishlist + Cart Badge */}
          <div className="flex items-center gap-2 sm:gap-3" ref={searchRef}>
            {/* Search Pill Trigger / Input Box */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="relative w-64 sm:w-80">
                  <input
                    type="text"
                    placeholder="Search hardware..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full h-10 pl-9 pr-8 rounded-full bg-neutral-100 border border-neutral-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-900 transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              )}

              {/* Instant Search Suggestions Dropdown */}
              {isSearchOpen && (searchQuery.trim() || suggestions.length > 0) && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-neutral-300 rounded-2xl shadow-xl overflow-hidden z-50">
                  {suggestions.length > 0 ? (
                    <div className="p-3">
                      <div className="text-[11px] font-mono font-bold text-neutral-500 uppercase px-3 py-1.5 border-b border-neutral-100">
                        Matching Hardware ({suggestions.length})
                      </div>
                      <div className="divide-y divide-neutral-100">
                        {suggestions.map((item) => (
                          <Link
                            key={item.id}
                            href={`/products/${item.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between gap-3 p-2.5 hover:bg-neutral-50 rounded-xl transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200 flex items-center justify-center p-1">
                                <img
                                  src={item.images[0]}
                                  alt={item.name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-orange-600 transition-colors">
                                  {item.name}
                                </p>
                                <p className="text-[10px] font-mono text-neutral-500">
                                  {item.brand.name} &bull; {item.category.name}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs font-mono font-bold text-neutral-950">
                              ₦{item.price.toLocaleString("en-NG")}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : searchQuery.trim() ? (
                    <div className="p-6 text-center text-neutral-500 text-xs font-mono">
                      No hardware units found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Account Icon */}
            <Link
              href="/auth/login"
              className="hidden sm:flex w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-200 items-center justify-center text-neutral-900 transition-colors"
              aria-label="User Account"
            >
              <User className="w-4.5 h-4.5" />
            </Link>

            {/* Wishlist Icon with Badge */}
            <Link
              href="/wishlist"
              className="hidden sm:flex relative w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-200 items-center justify-center text-neutral-900 transition-colors"
              aria-label={`Wishlist (${wishlistItems.length})`}
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Icon with Badge */}
            <Link
              href="/cart"
              className="relative w-11 h-11 rounded-full bg-neutral-950 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label={`Cart (${totalCartCount})`}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

