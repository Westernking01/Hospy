import * as React from "react";
import { cn } from "@hopsy/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error" | "info" | "destructive";
  size?: "sm" | "md";
}

/**
 * Enterprise Badge Component
 * Complies with 08_DESIGN_SYSTEM.md badge variants and status colors.
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-primary/15 text-primary border-primary/20",
      secondary: "bg-secondary text-secondary-foreground border-border",
      outline: "border border-border text-foreground bg-transparent",
      success: "bg-success/15 text-success border-success/20 dark:bg-emerald-950/40 dark:text-emerald-400",
      warning: "bg-warning/15 text-warning border-warning/20 dark:bg-amber-950/40 dark:text-amber-400",
      error: "bg-destructive/15 text-destructive border-destructive/20 dark:bg-red-950/40 dark:text-red-400",
      destructive: "bg-destructive/15 text-destructive border-destructive/20 dark:bg-red-950/40 dark:text-red-400",
      info: "bg-info/15 text-info border-info/20 dark:bg-blue-950/40 dark:text-blue-400",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
      md: "px-2.5 py-0.5 text-xs font-medium",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border transition-colors select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
