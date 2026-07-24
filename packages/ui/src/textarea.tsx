"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

/**
 * Enterprise Textarea Component
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, label, helperText, error, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-foreground select-none flex items-center justify-between"
          >
            <span>{label}</span>
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "flex min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error ? "border-destructive focus-visible:ring-destructive" : "border-border",
            className
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";
