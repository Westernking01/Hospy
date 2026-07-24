"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";
import { ChevronDown } from "lucide-react";

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  helperText?: string;
  error?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  containerClassName?: string;
}

/**
 * Enterprise Select Component
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      containerClassName,
      label,
      helperText,
      error,
      options,
      placeholder = "Select an option",
      onChange,
      id,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-foreground select-none flex items-center justify-between"
          >
            <span>{label}</span>
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-destructive focus-visible:ring-destructive" : "border-border",
              className
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error ? (
          <p id={errorId} className="text-xs font-medium text-destructive mt-0.5" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-muted-foreground mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
