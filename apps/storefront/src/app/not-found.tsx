"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, HelpCircle } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between p-6 sm:p-12 font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between z-10">
        <Link href="/" className="inline-flex items-center">
          <BrandLogo variant="white" size="lg" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-sm font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto text-center z-10 py-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-widest mb-6">
          Error 404 &bull; Page Not Found
        </div>

        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-white mb-6">
          Lost in the <span className="text-orange-500">Plaza</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
          The hardware component, server rack, or storefront page you are looking for has been moved, decommissioned, or does not exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-wide transition-all shadow-lg hover:shadow-orange-600/20"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-bold tracking-wide border border-neutral-800 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Search Store Catalog</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 flex flex-col sm:flex-row items-center justify-between border-t border-neutral-900 pt-6 text-xs text-neutral-500 gap-4">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} HOPSY PLAZA Enterprise Systems. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 font-mono">
          <Link href="/contact" className="hover:text-neutral-400 transition-colors">
            Support Desk
          </Link>
          <span>&bull;</span>
          <Link href="/terms" className="hover:text-neutral-400 transition-colors">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
