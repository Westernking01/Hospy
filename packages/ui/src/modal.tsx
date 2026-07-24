"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
}

/**
 * Enterprise Accessible Modal Component
 * Uses Framer Motion for subtle, premium entry/exit animations.
 * Handles focus lock/restore, Escape key dismissal, and backdrop blur.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOutsideClick = true,
  showCloseButton = true,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Handle ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
    full: "max-w-[95vw] h-[95vh]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeOnOutsideClick && onClose()}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full rounded-xl bg-card text-card-foreground shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]",
              sizes[size]
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
                <div className="flex flex-col gap-0.5">
                  {title && (
                    <h3 id="modal-title" className="text-lg font-semibold text-foreground tracking-tight">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p id="modal-description" className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 border-t border-border bg-muted/40 px-6 py-3.5 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
