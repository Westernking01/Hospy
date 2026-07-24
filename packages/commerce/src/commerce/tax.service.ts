import type { TaxCalculationInput } from "@hopsy/validation";

import type { TaxBreakdown } from "../types";

export function calculateTax(input: TaxCalculationInput): TaxBreakdown {
  const taxableBase = Math.max(0, input.subtotal - input.discountAmount);
  
  // Standard Nigerian Value Added Tax (VAT) is 7.5%
  const NIGERIA_VAT_RATE = 0.075;
  
  // Check if regional or special exempt rules apply
  const state = (input.state || "").trim().toLowerCase();
  
  // In our business rules, standard consumer electronics sold within Nigeria attract 7.5% VAT.
  // B2B export orders outside Nigeria or registered free-trade zone deliveries can be 0% exempt.
  const isExportOrExempt = state === "export" || state.includes("free trade zone");
  
  if (isExportOrExempt) {
    return {
      taxClass: "VAT_EXEMPT_ZERO_RATED",
      taxRatePercentage: 0,
      taxableBaseAmount: Math.round(taxableBase * 100) / 100,
      taxAmount: 0,
      isTaxExempt: true,
      regionalRuleApplied: "Export / Free Trade Zone Zero-Rated VAT Exemption",
    };
  }

  const taxAmount = Math.round(taxableBase * NIGERIA_VAT_RATE * 100) / 100;

  return {
    taxClass: "STANDARD_ELECTRONICS_VAT",
    taxRatePercentage: 7.5,
    taxableBaseAmount: Math.round(taxableBase * 100) / 100,
    taxAmount,
    isTaxExempt: false,
    regionalRuleApplied: "Nigeria Federal Inland Revenue Service (FIRS) Standard 7.5% VAT",
  };
}
