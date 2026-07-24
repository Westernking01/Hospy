"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | string;
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth,
  size = "lg",
}: AdminModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${
          widthClasses[(maxWidth || size || "lg") as keyof typeof widthClasses] || "max-w-lg"
        } z-10 flex max-h-[90vh] flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-xl animate-in zoom-in-95 duration-150`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-foreground">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2.5 border-t border-border bg-muted/40 p-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
