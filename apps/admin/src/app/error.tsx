"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home, ShieldAlert } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring system in production
    console.error("Global System Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between p-6 sm:p-12 font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between z-10">
        <Link href="/" className="inline-flex items-center">
          <BrandLogo variant="white" size="lg" />
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>System Alert</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto text-center z-10 py-16">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 text-red-500">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-4">
          Unexpected System <span className="text-red-500">Fault</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 max-w-lg mx-auto mb-8 leading-relaxed font-normal">
          An unexpected hardware or server communication error occurred. Our engineering telemetry has logged this incident.
        </p>

        {error.digest && (
          <div className="max-w-md mx-auto mb-8 p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-left font-mono text-xs text-neutral-400">
            <span className="text-neutral-500">Telemetry Digest: </span>
            <code className="text-orange-400">{error.digest}</code>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-wide transition-all shadow-lg hover:shadow-orange-600/20"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-bold tracking-wide border border-neutral-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 flex flex-col sm:flex-row items-center justify-between border-t border-neutral-900 pt-6 text-xs text-neutral-500 gap-4">
        <span>&copy; {new Date().getFullYear()} HOPSY PLAZA Enterprise Systems.</span>
        <span className="font-mono text-neutral-600">Infrastructure Status: Monitored</span>
      </footer>
    </div>
  );
}
