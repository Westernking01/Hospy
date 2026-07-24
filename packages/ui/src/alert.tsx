"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
  onDismiss?: () => void;
}

/**
 * Enterprise Alert Component
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, children, onDismiss, ...props }, ref) => {
    const icons = {
      default: <Info className="h-5 w-5 text-foreground shrink-0" />,
      success: <CheckCircle2 className="h-5 w-5 text-success shrink-0" />,
      warning: <AlertTriangle className="h-5 w-5 text-warning shrink-0" />,
      error: <AlertCircle className="h-5 w-5 text-destructive shrink-0" />,
      info: <Info className="h-5 w-5 text-info shrink-0" />,
    };

    const variants = {
      default: "bg-muted text-foreground border-border",
      success: "bg-success/10 border-success/30 text-foreground",
      warning: "bg-warning/10 border-warning/30 text-foreground",
      error: "bg-destructive/10 border-destructive/30 text-foreground",
      info: "bg-info/10 border-info/30 text-foreground",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn("relative flex items-start gap-3 rounded-lg border p-4 transition-all", variants[variant], className)}
        {...props}
      >
        {icons[variant]}
        <div className="flex-1 flex flex-col gap-1">
          {title && <h5 className="text-sm font-semibold leading-none tracking-tight">{title}</h5>}
          <div className="text-sm opacity-90 leading-relaxed">{children}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss alert"
            className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
