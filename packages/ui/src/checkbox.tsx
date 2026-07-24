"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

/**
 * Enterprise Checkbox Component
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, disabled, indeterminate, checked, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2.5">
          <div className="relative flex items-center justify-center pt-0.5">
            <input
              id={checkboxId}
              ref={ref}
              type="checkbox"
              disabled={disabled}
              checked={checked}
              onChange={onChange}
              className="peer sr-only"
              {...props}
            />
            <div
              onClick={() => {
                if (!disabled && onChange) {
                  const event = {
                    target: { checked: !checked },
                  } as React.ChangeEvent<HTMLInputElement>;
                  onChange(event);
                }
              }}
              className={cn(
                "h-4 w-4 shrink-0 rounded border transition-colors flex items-center justify-center cursor-pointer",
                "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                checked || indeterminate
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-border bg-background hover:border-muted-foreground",
                disabled && "cursor-not-allowed opacity-50 bg-muted",
                error && "border-destructive",
                className
              )}
            >
              {checked ? (
                <Check className="h-3 w-3 stroke-[3]" />
              ) : indeterminate ? (
                <Minus className="h-3 w-3 stroke-[3]" />
              ) : null}
            </div>
          </div>
          {(label || description) && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "flex flex-col cursor-pointer select-none",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label && <span className="text-sm font-medium text-foreground leading-none">{label}</span>}
              {description && <span className="text-xs text-muted-foreground mt-1">{description}</span>}
            </label>
          )}
        </div>
        {error && <p className="text-xs text-destructive font-medium pl-6">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
