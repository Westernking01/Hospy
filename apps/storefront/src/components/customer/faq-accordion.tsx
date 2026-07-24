"use client";
import { MOCK_FAQS } from "@hopsy/commerce/src/mock-data";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";


interface FaqAccordionProps {
  items?: MockFaq[];
  showTitle?: boolean;
}

export function FaqAccordion({ items = MOCK_FAQS, showTitle = true }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="mb-12 pb-5 border-b border-neutral-900 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-orange-600 uppercase tracking-widest">
                HARDWARE SPECIFICATION & LOGISTICS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 mt-1">
                Technical FAQ & Policies
              </h2>
            </div>
            <p className="text-xs text-neutral-500 font-mono sm:text-right max-w-xs">
              Every order backed by factory warranty & immediate replacement protocols.
            </p>
          </div>
        )}

        <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || faq.question || index}
                className="transition-colors duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 text-left flex items-center justify-between gap-4 font-bold text-base text-neutral-900 hover:text-orange-600 transition-colors"
                >
                  <span className="tracking-tight">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center shrink-0 transition-all border ${
                      isOpen
                        ? "bg-neutral-950 border-neutral-950 text-white rotate-180"
                        : "bg-neutral-100 border-neutral-200 text-neutral-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-6 pt-1 text-sm text-neutral-600 leading-relaxed font-normal animate-in fade-in-0 duration-150 pr-8">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showTitle && (
          <div className="mt-12 p-8 rounded-lg bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="text-sm font-bold text-neutral-900 tracking-tight">Need specialized corporate PO allocation or bulk enterprise tenders?</h4>
              <p className="text-xs text-neutral-600 mt-1 font-normal">
                Our executive B2B hardware consultants dispatch directly across major metropolitan zones.
              </p>
            </div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-neutral-950 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
            >
              <span>Support & Knowledge Base</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

