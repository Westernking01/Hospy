"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    direction?: "up" | "down";
    period?: string;
    label?: string;
  };
  icon: React.ElementType | React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  highlight?: boolean;
  /** Retained for API compatibility; maps to a restrained icon accent tint. */
  variant?: string;
  tooltip?: string;
}

/** Muted icon accents keyed by legacy variant names — status color only, sparingly. */
const VARIANT_ICON: Record<string, string> = {
  navy: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  orange: "bg-primary/10 text-primary",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  crimson: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
};

export function AdminStatCard({
  title,
  value,
  subtitle,
  trend,
  icon: IconProp,
  iconBg,
  iconColor,
  action,
  highlight = false,
  variant,
  tooltip,
}: AdminStatCardProps) {
  const isPositiveTrend =
    trend?.isPositive !== undefined
      ? trend.isPositive
      : trend?.direction === "up";
  const trendSubtext = trend?.period ? `vs ${trend.period}` : trend?.label;

  const iconAccent =
    iconBg || iconColor
      ? cn(iconBg, iconColor)
      : VARIANT_ICON[variant ?? ""] ??
        "bg-muted text-muted-foreground";

  const iconElement = React.isValidElement(IconProp)
    ? IconProp
    : typeof IconProp === "function" ||
        (typeof IconProp === "object" && IconProp !== null)
      ? React.createElement(IconProp as React.ElementType, {
          className: "h-5 w-5",
        })
      : null;

  return (
    <div
      title={tooltip}
      className={cn(
        "rounded-xl border bg-card p-5 shadow-sm transition-colors",
        highlight
          ? "border-primary/30 ring-1 ring-primary/10"
          : "border-border hover:border-slate-300 dark:hover:border-slate-700"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            iconAccent
          )}
        >
          {iconElement}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </span>
        {subtitle && (
          <span className="text-xs font-medium text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>

      {(trend || action) && (
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs">
          {trend ? (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-semibold",
                  isPositiveTrend
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {isPositiveTrend ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {trend.value}
              </span>
              {trendSubtext && (
                <span className="text-muted-foreground">{trendSubtext}</span>
              )}
            </div>
          ) : (
            <span />
          )}

          {action && (
            <button
              onClick={action.onClick}
              className="font-medium text-primary transition-colors hover:text-primary-hover"
            >
              {action.label} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
