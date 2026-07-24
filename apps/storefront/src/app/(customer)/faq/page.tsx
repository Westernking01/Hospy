"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, Search as SearchIcon, ChevronDown, CheckCircle2, ShieldCheck, Truck, Percent } from "lucide-react";
import { Badge } from "@hopsy/ui";

const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "warranty", label: "Factory Warranty & DOA" },
  { id: "shipping", label: "Express Logistics & Delivery" },
  { id: "b2b", label: "Corporate Invoicing & VAT" },
  { id: "payments", label: "Payments & Phase 3 Commerce" },
];

const FAQ_ITEMS = [
  {
    id: "1",
    category: "warranty",
    question: "How do I verify that my procured hardware is 100% factory sealed and genuine?",
    answer: "Every item dispatched by Hopsy Plaza comes directly from official global OEM distribution lines (Apple, Sony, Samsung, Best Buy channels). You can independently verify the device serial number or IMEI directly on the manufacturer's official support portal prior to activating the device.",
  },
  {
    id: "2",
    category: "warranty",
    question: "What is your Dead-On-Arrival (DOA) replacement policy?",
    answer: "If a device exhibits factory hardware defect upon unboxing within 7 days of delivery, Hopsy Plaza provides an instant, zero-hassle unit replacement once verified by our Victoria Island diagnostic lab. We do not force you into lengthy repair queues for brand new hardware.",
  },
  {
    id: "3",
    category: "shipping",
    question: "What are your standard delivery timelines across Nigeria?",
    answer: "Orders within Lagos (Victoria Island, Lekki, Ikoyi, Ikeja) and Abuja Central Business District benefit from same-day or next-day express armored courier dispatch. Nationwide shipments across other 34 states take 2 to 4 business days via insured DHL/FedEx logistics.",
  },
  {
    id: "4",
    category: "shipping",
    question: "Do you ship across other West African countries (ECOWAS)?",
    answer: "Yes. Enterprise B2B clients in Ghana, Côte d'Ivoire, and Senegal can request special cross-border freight handling and customs export clearance through our dedicated B2B procurement desk.",
  },
  {
    id: "5",
    category: "b2b",
    question: "How do I obtain an official corporate VAT invoice or pro-forma quotation?",
    answer: "You can submit an RFQ or upload your existing Bill of Materials (BOM) spreadsheet directly on our B2B Procurement Portal (/b2b). Our accounts team issues formal pro-forma quotations compliant with Nigerian corporate accounting audits and tax exemptions.",
  },
  {
    id: "6",
    category: "b2b",
    question: "Are volume discounts available for bulk corporate purchases?",
    answer: "Yes. We offer tiered wholesale rebates automatically: 10-24 units receive a 5% rebate, 25-49 units receive an 8% rebate, and orders exceeding 50 units qualify for custom VIP pricing of 12%+ along with dedicated account managers.",
  },
  {
    id: "7",
    category: "payments",
    question: "Why are the 'Add to Cart' and checkout workflows currently disabled or marked Phase 3?",
    answer: "Hopsy Plaza is currently executing Phase 2 (Customer Storefront & Catalog Architecture). As per our strict engineering roadmap, transaction processing, cart state, payment gateways (Paystack/Flutterwave/Stripe), and order deduction engines will be activated in Phase 3.",
  },
  {
    id: "8",
    category: "payments",
    question: "What payment security standards do you enforce once transactions activate?",
    answer: "All financial data is processed via PCI-DSS Level 1 compliant gateways using AES-256 TLS 1.3 encryption. Hopsy Plaza never stores raw credit card details or bank credentials on local databases.",
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openId, setOpenId] = useState<string | null>("1");

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-background py-8 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Frequently Asked Questions</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-3 py-1">
            PROCUREMENT & KNOWLEDGE CENTER
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Got Questions? We Have Answers.
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Everything you need to know regarding OEM warranties, corporate VAT invoicing, nationwide armored shipping, and Phase 3 commerce activation.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <input
              type="text"
              placeholder="Search keywords (e.g., warranty, shipping, VAT, cart)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-13 pl-12 pr-4 rounded-2xl bg-card border border-border text-sm font-semibold shadow-md focus:border-primary outline-none"
            />
            <SearchIcon className="w-5 h-5 text-muted-foreground absolute left-4 top-4 pointer-events-none" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? "bg-card border-primary shadow-md" : "bg-card/60 border-border hover:border-muted-foreground"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-sm sm:text-base font-black text-foreground pr-4 leading-snug">
                      {item.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform shrink-0 ${
                      isOpen ? "bg-primary text-white rotate-180" : "bg-secondary text-muted-foreground"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-3">
              <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto" />
              <h4 className="text-base font-bold text-foreground">No matching FAQ entries found</h4>
              <p className="text-xs text-muted-foreground">Try searching with simpler terms or contact our corporate support desk directly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
