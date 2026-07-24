"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, FileText, Lock, CheckCircle2, AlertTriangle, Building2 } from "lucide-react";
import { Badge } from "@hopsy/ui";

export default function TermsAndPrivacyPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  return (
    <div className="min-h-screen bg-background py-8 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Legal Documentation & Policies</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-3">
          <Badge className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-3 py-1">
            LEGAL & COMPLIANCE FRAMEWORK
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Terms of Service & Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Review the formal commercial terms governing hardware procurement, OEM warranty execution, corporate VAT billing, and data protection across the Hopsy Plaza platform.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-border justify-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={`flex items-center gap-2 px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "terms"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-4 h-4" /> Commercial Terms of Service
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "privacy"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Lock className="w-4 h-4" /> Privacy Policy & Data Protection
          </button>
        </div>

        {/* Content Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-sm text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-8">
          {activeTab === "terms" && (
            <div className="space-y-6 animate-in fade-in-0 duration-200">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">SECTION 1</span>
                <h3 className="text-xl font-black text-foreground mt-1">1. Acceptance of Commercial Terms</h3>
                <p className="mt-2">
                  By accessing, browsing, or registering for an enterprise or personal procurement account on the Hopsy Plaza portal, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. These terms govern all sales of physical electronics, hardware accessories, and technical services provided across our distribution channels.
                </p>
              </div>

              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">SECTION 2</span>
                <h3 className="text-xl font-black text-foreground mt-1">2. Hardware Authenticity & Serial Lineage</h3>
                <p className="mt-2">
                  Hopsy Plaza guarantees that all hardware units dispatched (including but not limited to Apple, Sony, Samsung, Bose, Best Buy, and Framework devices) are 100% factory sealed, brand new, and procured directly from authorized OEM regional distributors. Every device carries clean serial numbers eligible for direct manufacturer verification and warranty registration.
                </p>
              </div>

              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">SECTION 3</span>
                <h3 className="text-xl font-black text-foreground mt-1">3. Corporate Pro-forma Invoices & VAT Exemption</h3>
                <p className="mt-2">
                  Enterprise B2B clients who submit Request for Quotation (RFQ) specifications or upload hardware Bills of Materials (BOM) will receive formal pro-forma invoices. All pricing displayed across our catalog is inclusive of standard Nigerian Value Added Tax (VAT) unless specifically flagged under an approved corporate tax exemption certificate (TIN validation required).
                </p>
              </div>

              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">SECTION 4</span>
                <h3 className="text-xl font-black text-foreground mt-1">4. Dead-On-Arrival (DOA) & Return Policies</h3>
                <p className="mt-2">
                  Devices with verified out-of-the-box hardware failures reported within 7 calendar days of physical delivery will be replaced with brand new, sealed units upon return inspection at our Victoria Island diagnostic laboratory. Cosmetic damages resulting from post-delivery handling by the customer or unauthorized tampering void the instant DOA replacement privilege.
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">SECTION 5</span>
                <h3 className="text-xl font-black text-foreground mt-1">5. Phase 3 Commerce Activation Notice</h3>
                <p className="mt-2">
                  Please note that Phase 2 of the Hopsy Plaza platform represents the complete storefront catalog, search filtering, and specification architecture. Direct online shopping cart checkout and automated payment gateway debits (via Paystack/Flutterwave) are scheduled for deployment during Phase 3. Until Phase 3 activation, all transactions are finalized via formal pro-forma invoices or direct B2B desk interaction.
                </p>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6 animate-in fade-in-0 duration-200">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">DATA PROTECTION 1</span>
                <h3 className="text-xl font-black text-foreground mt-1">1. Information Collection & Corporate Identity</h3>
                <p className="mt-2">
                  When registering on the Hopsy Plaza portal, submitting an RFQ, or bookmarking items on your wishlist, we collect essential operational data including contact names, corporate email addresses, physical shipping locations, and company Tax Identification Numbers (TIN). We do not collect or store sensitive biometric information or unencrypted financial credentials.
                </p>
              </div>

              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">DATA PROTECTION 2</span>
                <h3 className="text-xl font-black text-foreground mt-1">2. AES-256 Encryption & Zero-Storage of Card Data</h3>
                <p className="mt-2">
                  All platform sessions, portal authentication tokens, and customer communications are encrypted using enterprise-grade AES-256 TLS 1.3 cryptographic protocols. Upon activation of Phase 3 payment engines, debit/credit card processing will occur exclusively through Level 1 PCI-DSS certified banking gateways; Hopsy Plaza servers will never retain raw card numbers or CVV codes.
                </p>
              </div>

              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">DATA PROTECTION 3</span>
                <h3 className="text-xl font-black text-foreground mt-1">3. Non-Disclosure & Third-Party Logistics</h3>
                <p className="mt-2">
                  We strictly prohibit the sale, leasing, or brokering of corporate procurement lists to third-party marketing agencies. Physical delivery addresses and contact phone numbers are shared solely with our vetted, insured logistics partners (DHL & FedEx Express) for the sole purpose of executing verified hardware drop-offs.
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">DATA PROTECTION 4</span>
                <h3 className="text-xl font-black text-foreground mt-1">4. Customer Rights & Data Deletion Requests</h3>
                <p className="mt-2">
                  Under applicable Nigerian Data Protection Regulations (NDPR) and international privacy guidelines, portal members retain the right to request a full export of their saved order histories or demand permanent deletion of their account records by contacting <span className="font-mono font-bold text-foreground">privacy@hopsyplaza.com</span>.
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-semibold">
            <span>Document Revision: July 2026 &bull; Hopsy Plaza Legal & Compliance Desk</span>
            <Link href="/contact" className="text-primary hover:underline font-bold">
              Have legal or compliance questions? Contact our team &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
