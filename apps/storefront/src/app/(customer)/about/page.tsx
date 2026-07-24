"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Users, Globe, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@hopsy/ui";
import { Badge } from "@hopsy/ui";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">About Hopsy Plaza</span>
        </nav>

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-3 py-1">
              THE HOPSY PLAZA STANDARD
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-tight">
              Elevating Hardware Retail across Africa with Factory-Direct Precision.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Hopsy Plaza was established to bridge the gap between world-class electronics manufacturers—Apple, Sony, Samsung, Bose, Best Buy standards—and African enterprises, IT departments, and discerning consumers. We eliminate counterfeit risks, grey-market imports, and unverified warranties.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-secondary/50 border border-border space-y-2 text-center">
              <span className="text-3xl font-black text-primary block">100%</span>
              <span className="text-xs font-bold text-foreground uppercase tracking-wider block">OEM Factory Sealed</span>
              <span className="text-[11px] text-muted-foreground">Direct supply chain</span>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/50 border border-border space-y-2 text-center">
              <span className="text-3xl font-black text-foreground block">50,000+</span>
              <span className="text-xs font-bold text-foreground uppercase tracking-wider block">Devices Delivered</span>
              <span className="text-[11px] text-muted-foreground">Across 36 states & FCT</span>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/50 border border-border space-y-2 text-center">
              <span className="text-3xl font-black text-foreground block">24/7</span>
              <span className="text-xs font-bold text-foreground uppercase tracking-wider block">Technical Support</span>
              <span className="text-[11px] text-muted-foreground">Certified diagnostic lab</span>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/50 border border-border space-y-2 text-center">
              <span className="text-3xl font-black text-emerald-600 block">7-Day</span>
              <span className="text-xs font-bold text-foreground uppercase tracking-wider block">DOA Replacement</span>
              <span className="text-[11px] text-muted-foreground">Zero-hassle exchange</span>
            </div>
          </div>
        </div>

        {/* Our Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">WHY CHOOSE HOPSY PLAZA</span>
            <h2 className="text-3xl font-black text-foreground">The Four Pillars of Quality Assurance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-foreground">Direct Manufacturer Lineage</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every laptop, display, and audio device in our inventory is procured directly from authorized OEM distributors, ensuring clean IMEI/serial registration and verifiable international warranty coverage.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-foreground">Transparent Corporate Invoicing</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We provide full corporate tax compliance with detailed pro-forma quotations and official VAT invoices suitable for corporate accounting audits, government procurement, and institutional budgeting.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-foreground">Express Logistics Network</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our distribution centers in Lagos and Abuja utilize insured, armored logistics partners (DHL & FedEx Express) to ensure high-value hardware reaches your doorstep without transit damage or loss.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-foreground">Pre-Dispatch Diagnostic Inspection</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upon request, our certified technicians perform rigorous pre-delivery hardware burn-in and pixel diagnostics before dispatch to guarantee zero out-of-box failures for enterprise deployments.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Showroom & Lab Showcase */}
        <div className="p-8 sm:p-12 rounded-3xl bg-secondary/30 border border-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-foreground">Visit Our Experience Centers & Tech Labs</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We invite procurement managers and individual enthusiasts to visit our high-tech experience lounges in Victoria Island, Lagos, and Central Business District, Abuja. Experience side-by-side color accuracy tests on OLED monitors, acoustic demos of studio headphones, and stress-test custom workstation builds before ordering.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-foreground pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Victoria Island Showroom</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Abuja Tech Lounge</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Port Harcourt Corporate Hub</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center gap-3">
            <Link href="/contact">
              <Button size="lg" className="w-full h-13 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md gap-2">
                Book Showroom Appointment <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/b2b">
              <Button variant="outline" size="lg" className="w-full h-13 font-bold text-xs uppercase tracking-wider rounded-xl">
                Open Enterprise Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
