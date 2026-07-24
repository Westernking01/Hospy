"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Standardized surface primitive for the HOPSY PLAZA Admin Dashboard.
 *
 * One card system used everywhere: restrained radius, subtle border, light
 * elevation — per 08_DESIGN_SYSTEM.md (avoid excessive shadows / rounded-everywhere).
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders without inner padding so tables/media can sit flush. */
  flush?: boolean;
  /** Adds a hover affordance for clickable cards. */
  interactive?: boolean;
}

export function Card({
  className,
  flush = false,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        !flush && "p-5 sm:p-6",
        interactive &&
          "transition-colors hover:border-slate-300 dark:hover:border-slate-700",
        className
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export function CardHeader({
  title,
  description,
  icon,
  actions,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
