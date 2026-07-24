"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  Lock,
} from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Giant Architectural Wordmark Header (Matching exact screenshot aesthetic) */}
      <div className="border-b border-neutral-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4">
          <Link href="/" className="group flex items-center">
            <BrandLogo
              variant="horizontal-white"
              size="auto"
              className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto group-hover:opacity-95 transition-opacity"
              priority={false}
            />
          </Link>
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-400 font-bold sm:self-end">
            Hardware &bull; Enterprise &bull; Procurement
          </span>
        </div>
      </div>

      {/* Newsletter Subscribe Section */}
      <div className="border-b border-neutral-900 py-10 px-4 sm:px-6 lg:px-8 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-1 text-center lg:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-500">
              STAY AHEAD OF HARDWARE LAUNCHES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Subscribe To Our Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Get weekly drop notifications, B2B procurement tier pricing, and exclusive flash sale access.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed to HOPSY PLAZA Enterprise Dispatch!");
            }}
            className="w-full lg:w-auto flex-1 max-w-md flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="w-full h-12 pl-4 pr-10 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute right-3.5 top-4 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Multi-Column Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: About Hopsy */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-tight text-white uppercase font-mono border-l-2 border-orange-600 pl-2">
              About Hopsy
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              HOPSY PLAZA is West Africa’s premier enterprise hardware engineering and retail marketplace, sourcing 100% factory-sealed electronics directly from global OEMs.
            </p>
            <div className="space-y-2 text-xs text-neutral-400 pt-2 font-mono">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>+234 (0) 800 HOPSY PLAZA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>concierge@hopsyplaza.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-tight text-white uppercase font-mono border-l-2 border-orange-600 pl-2">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li>
                <Link href="/categories/smart-home-and-voice" className="hover:text-orange-400 transition-colors">
                  Smart Home & Voice
                </Link>
              </li>
              <li>
                <Link href="/categories/high-performance-gaming" className="hover:text-orange-400 transition-colors">
                  High-Performance Gaming
                </Link>
              </li>
              <li>
                <Link href="/categories/virtual-and-augmented-reality" className="hover:text-orange-400 transition-colors">
                  Virtual & Augmented Reality
                </Link>
              </li>
              <li>
                <Link href="/categories/premium-audio-and-earbuds" className="hover:text-orange-400 transition-colors">
                  Premium Audio & Earbuds
                </Link>
              </li>
              <li>
                <Link href="/categories/pro-photography-and-action" className="hover:text-orange-400 transition-colors">
                  Pro Photography & Action
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-tight text-white uppercase font-mono border-l-2 border-orange-600 pl-2">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li>
                <Link href="/faq" className="hover:text-orange-400 transition-colors">
                  Support & FAQ Center
                </Link>
              </li>
              <li>
                <Link href="/order-status" className="hover:text-orange-400 transition-colors">
                  Track Your Dispatch
                </Link>
              </li>
              <li>
                <Link href="/warranty-claim" className="hover:text-orange-400 transition-colors">
                  OEM Warranty Portal
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-orange-400 transition-colors">
                  30-Day Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                  Privacy & Data Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Enterprise Solutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-tight text-white uppercase font-mono border-l-2 border-orange-600 pl-2">
              Enterprise & B2B
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  Corporate Procurement
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  System Architecture Consulting
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-orange-400 transition-colors">
                  Volume Ordering & RFQ
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-orange-400 transition-colors">
                  Become an Authorized Vendor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect With Us */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-tight text-white uppercase font-mono border-l-2 border-orange-600 pl-2">
              Connect With Us
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Join our engineering network for exclusive unboxings and hardware benchmark events.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {["X / Twitter", "LinkedIn", "Instagram", "GitHub"].map((platform, idx) => (
                <a
                  key={idx}
                  href={`#${platform.toLowerCase().replace(/\s+/g, "")}`}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-orange-600 text-[11px] font-mono font-bold text-neutral-300 hover:text-white transition-colors border border-neutral-800"
                >
                  {platform.split(" ")[0]}
                </a>
              ))}
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-orange-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Factory Sealed & Assured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Security Bar */}
      <div className="border-t border-neutral-900 py-6 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-orange-500" />
            <span>&copy; {new Date().getFullYear()} HOPSY PLAZA ENTERPRISE LTD. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>&bull;</span>
            <span>Cookie Preferences</span>
            <span>&bull;</span>
            <span className="text-neutral-400">Powered by Next.js & Hopsy Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
