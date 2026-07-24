"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Single source of truth for status pills across the admin dashboard.
 *
 * Status colors communicate system state only (08_DESIGN_SYSTEM.md §5). Tone is
 * neutral by default; semantic tones stay muted and consistent everywhere.
 */
export type StatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "purple";

const TONE_STYLES: Record<StatusTone, string> = {
  neutral:
    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700",
  success:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
  warning:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
  error:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900",
  info:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
  purple:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900",
};

/** Maps common domain status strings to a consistent tone. */
const STATUS_TONE_MAP: Record<string, StatusTone> = {
  // Orders / payments
  PAID: "info",
  PROCESSING: "warning",
  SHIPPED: "purple",
  DELIVERED: "success",
  COMPLETED: "success",
  PENDING: "warning",
  CANCELLED: "error",
  REFUNDED: "neutral",
  FAILED: "error",
  // Lifecycle
  ACTIVE: "success",
  INACTIVE: "neutral",
  DRAFT: "neutral",
  PUBLISHED: "success",
  ARCHIVED: "neutral",
  SCHEDULED: "info",
  EXPIRED: "error",
  // Moderation
  APPROVED: "success",
  REJECTED: "error",
  // Stock
  IN_STOCK: "success",
  LOW_STOCK: "warning",
  OUT_OF_STOCK: "error",
};

export interface StatusBadgeProps {
  /** Domain status string (auto-mapped) or free label when `tone` is supplied. */
  status: string;
  /** Override the auto-mapped tone. */
  tone?: StatusTone;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  className?: string;
  /** Show a leading tone-colored dot. */
  dot?: boolean;
}

function humanize(status: string) {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function StatusBadge({
  status,
  tone,
  icon,
  className,
  dot = false,
}: StatusBadgeProps) {
  const resolvedTone: StatusTone =
    tone ?? STATUS_TONE_MAP[status?.toUpperCase?.()] ?? "neutral";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
        TONE_STYLES[resolvedTone],
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-slate-400": resolvedTone === "neutral",
            "bg-emerald-500": resolvedTone === "success",
            "bg-amber-500": resolvedTone === "warning",
            "bg-red-500": resolvedTone === "error",
            "bg-blue-500": resolvedTone === "info",
            "bg-violet-500": resolvedTone === "purple",
          })}
        />
      )}
      {icon}
      {humanize(status)}
    </span>
  );
}
