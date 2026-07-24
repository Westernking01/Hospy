"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  HelpCircle,
  Percent,
  TrendingDown,
  PhoneCall,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@hopsy/ui";
import { Badge } from "@hopsy/ui";

const DISCOUNT_TIERS = [
  { min: 10, max: 24, discount: "5% Corporate Rebate", benefit: "Dedicated Account Manager & Priority Fulfillment" },
  { min: 25, max: 49, discount: "8% Corporate Rebate", benefit: "Custom Pro-forma Invoicing + Net 30 Terms Eligible" },
  { min: 50, max: 999, discount: "12%+ VIP Wholesale Rate", benefit: "Direct OEM Factory Dispatch & Free Nationwide Transit" },
];

export default function B2bPortalPage() {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tin, setTin] = useState("");
  const [rfqDetails, setRfqDetails] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName && email) {
      setSubmitted(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Corporate & B2B Procurement Portal</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-xl border border-neutral-800">
          <div className="lg:col-span-7 space-y-6">
            <Badge className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-3 py-1">
              ENTERPRISE PROCUREMENT CHANNEL
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Hardware Procurement for Enterprises & Government
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              Hopsy Plaza equips corporations, IT departments, financial institutions, and educational networks with factory-direct electronics, official VAT invoicing, and volume-tiered rebate schedules.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                <span className="text-xs font-bold text-neutral-200">100% OEM Factory Sealed & Serialized</span>
              </div>
              <div className="flex items-center gap-3">
                <Percent className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-neutral-200">Up to 12% Volume Discount Tiers</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-neutral-200">Official VAT Pro-forma Invoices</span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Hotline Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-5 text-neutral-200">
            <h3 className="text-lg font-black text-white">Direct B2B Desk Hotline</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Need immediate quotation turnaround for tender submissions or urgent enterprise deployments? Contact our corporate accounts team directly.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm font-bold text-white">
                <PhoneCall className="w-5 h-5 text-primary" />
                <span>+234 (0) 803 HOPSY B2B / +234 1 234 5678</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm font-bold text-white">
                <Mail className="w-5 h-5 text-primary" />
                <span>enterprise@hopsyplaza.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Volume Discount Tiers Matrix */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">WHOLESALE PRICING MATRIX</span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Standard Volume Rebate Schedule</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Discounts are automatically calculated and applied to corporate quotations based on single-order unit volumes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DISCOUNT_TIERS.map((t, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col justify-between space-y-6 hover:border-primary transition-colors">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
                    Tier {idx + 1}: {t.min} &ndash; {t.max} Units
                  </span>
                  <h3 className="text-3xl font-black text-foreground">{t.discount}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.benefit}</p>
                </div>
                <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-foreground">
                  <span>Rebate Applied to Pro-forma</span>
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RFQ & Bulk Spreadsheet Submission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Spreadsheet Upload Simulation (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-card border border-border shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">BULK ORDER SIMPLIFIER</span>
              <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" /> Upload Procurement Spreadsheet
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Have an existing hardware Bill of Materials (BOM) in Excel or CSV format? Upload your requisition file below for automated SKU matching and instant quote generation.
              </p>
            </div>

            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <input
                type="file"
                id="bom-upload"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="bom-upload" className="cursor-pointer space-y-3 block">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    {uploadedFile ? uploadedFile.name : "Click to select or drag spreadsheet here"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">Supported file formats: .XLSX, .XLS, or .CSV (Max 10MB)</span>
                </div>
              </label>
            </div>

            {uploadedFile && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-semibold flex items-center justify-between animate-in fade-in-0 duration-200">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Spreadsheet Loaded: {uploadedFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="text-[10px] underline uppercase tracking-wider font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2 text-xs text-muted-foreground">
              <h5 className="font-bold text-foreground">Recommended Spreadsheet Columns:</h5>
              <p className="font-mono text-[11px]">SKU or Model Number | Manufacturer Brand | Quantity Required | Target Delivery Date</p>
            </div>
          </div>

          {/* RFQ Form Submission (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">RFQ SUBMISSION FORM</span>
              <h3 className="text-2xl font-black text-foreground">Request Corporate Quotation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Submit your procurement specifications or attach an uploaded BOM. Our account managers dispatch formal pro-forma invoices within 4 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-center space-y-4 animate-in fade-in-0 duration-300">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                <h4 className="text-lg font-black">Quotation Request Successfully Registered</h4>
                <p className="text-xs sm:text-sm text-emerald-600/90 leading-relaxed max-w-lg mx-auto">
                  Thank you, <span className="font-bold">{contactPerson || "Procurement Officer"}</span>. Your RFQ for <span className="font-bold">{companyName}</span> has been logged into our corporate dispatch queue. A dedicated enterprise officer will email your pro-forma quotation to <span className="font-mono font-bold">{email}</span>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-bold text-xs"
                >
                  Submit Another Requisition
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Company / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shell Nigeria Petroleum Dev."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Contact Officer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Engr. Adebayo Ogunlesi"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Corporate Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@organization.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Direct Phone Number / Extension *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                    Tax Identification Number (TIN / CAC Reg No)
                  </label>
                  <input
                    type="text"
                    placeholder="TIN-0099881122-NG (Required for Corporate VAT Exemption or Pro-forma Invoice)"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold font-mono focus:border-primary outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                    Detailed Requisition Notes or Hardware Specifications
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe specific models, quantities, RAM/SSD configurations, or delivery deadlines required..."
                    value={rfqDetails}
                    onChange={(e) => setRfqDetails(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-13 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg gap-2 mt-2"
                >
                  Submit Corporate Quotation Request <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
