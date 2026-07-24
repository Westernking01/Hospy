"use client";

import * as React from "react";
import { cn } from "@hopsy/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Enterprise Drawer / Sheet Component
 * Slides in from any edge with smooth Framer Motion spring physics.
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "right",
  title,
  description,
  children,
  footer,
  className,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const slideVariants = {
    right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
    left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
    top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
    bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
  };

  const positionStyles = {
    right: "inset-y-0 right-0 w-full max-w-md border-l",
    left: "inset-y-0 left-0 w-full max-w-md border-r",
    top: "inset-x-0 top-0 h-auto max-h-[85vh] border-b",
    bottom: "inset-x-0 bottom-0 h-auto max-h-[85vh] border-t",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={slideVariants[position].initial}
            animate={slideVariants[position].animate}
            exit={slideVariants[position].exit}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className={cn(
              "fixed z-10 bg-card text-card-foreground shadow-2xl border-border flex flex-col overflow-hidden",
              positionStyles[position],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || description) ? (
              <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
                <div className="flex flex-col gap-0.5">
                  {title && <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>}
                  {description && <p className="text-xs text-muted-foreground">{description}</p>}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="absolute top-4 right-4 z-20">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="h-4 w-4" />
                </button>
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
