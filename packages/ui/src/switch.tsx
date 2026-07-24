"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

/**
 * Enterprise Switch Component
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, label, description, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    return (
      <div className="flex items-center justify-between gap-4">
        {(label || description) && (
          <label
            htmlFor={switchId}
            className={cn("flex flex-col select-none cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}
          >
            {label && <span className="text-sm font-medium text-foreground">{label}</span>}
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
          </label>
        )}
        <button
          id={switchId}
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onCheckedChange?.(!checked)}
          className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            checked ? "bg-primary" : "bg-border dark:bg-neutral-800",
            className
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>
    );
  }
);

Switch.displayName = "Switch";
