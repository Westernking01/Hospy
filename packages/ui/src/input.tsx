"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  containerClassName?: string;
}

/**
 * Enterprise Input Component
 * Governed by 08_DESIGN_SYSTEM.md input rules:
 * Supports text, email, password (with toggle), phone, number, search, url, currency
 * Includes accessible aria attributes, label, validation error display, and helper text
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      label,
      helperText,
      error,
      prefixIcon,
      suffixIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground select-none flex items-center justify-between"
          >
            <span>{label}</span>
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {prefixIcon && (
            <div className="absolute left-3 flex items-center justify-center text-muted-foreground pointer-events-none">
              {prefixIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={actualType}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
              prefixIcon && "pl-10",
              (suffixIcon || isPassword) && "pr-10",
              error ? "border-destructive focus-visible:ring-destructive" : "border-border",
              className
            )}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none focus-visible:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          ) : suffixIcon ? (
            <div className="absolute right-3 flex items-center justify-center text-muted-foreground">
              {suffixIcon}
            </div>
          ) : null}
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

Input.displayName = "Input";
