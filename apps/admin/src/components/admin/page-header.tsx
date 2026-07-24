"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Consistent page-level header used at the top of every admin page.
 *
 * Establishes hierarchy through typography (size/weight), not color — per
 * 07_ADMIN_DASHBOARD_UI_UX.md §10. Title + optional description on the left,
 * actions on the right.
 */
export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned actions (buttons, filters). */
  actions?: React.ReactNode;
  /** Optional eyebrow label above the title. */
  eyebrow?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 space-y-1">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}
