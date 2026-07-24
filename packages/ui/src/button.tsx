"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "destructive" | "success" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Enterprise Button Component
 * Complies with 08_DESIGN_SYSTEM.md button specifications:
 * - Brand orange (#F97316) for primary interactive actions
 * - Consistent padding & typography scale
 * - Accessible keyboard focus ring without layout shift
 * - Built-in loading spinner preservation
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 border border-border",
      outline:
        "border border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
      text:
        "bg-transparent text-foreground hover:bg-muted/60 active:bg-muted",
      ghost:
        "bg-transparent text-foreground hover:bg-muted/60 active:bg-muted",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-sm",
      success:
        "bg-success text-success-foreground hover:bg-success/90 active:bg-success/80 shadow-sm",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      md: "h-10 px-4 py-2 text-sm rounded-md gap-2",
      lg: "h-12 px-6 py-3 text-base rounded-lg gap-2.5",
      icon: "h-10 w-10 rounded-md justify-center",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? "true" : undefined}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
