import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines CSS classes cleanly using clsx and tailwind-merge.
 * Ensures consistent Tailwind class merging across all UI components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Nigerian Naira (NGN) or USD with enterprise localization standards.
 */
export function formatCurrency(amount: number, currency: "NGN" | "USD" = "NGN"): string {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Safely parse JSON or return fallback
 */
export function safeParseJson<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}
