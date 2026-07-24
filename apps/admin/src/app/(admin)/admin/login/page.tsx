"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, ShieldCheck, Boxes, LineChart } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        // Do not reveal whether the account exists (per security spec).
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      // Full navigation so the middleware picks up the freshly set session cookies.
      window.location.assign("/admin");
    } catch {
      setError("Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans lg:grid lg:grid-cols-2">
      {/* ============ Left Column: Form Stage ============ */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Top Navigation Back Icon & Brand Header */}
          <div className="mb-10 flex items-center justify-between sm:mb-14">
            <Link
              href="/"
              aria-label="Back to store"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold tracking-wide text-neutral-700 shadow-2xs transition-all hover:bg-neutral-50 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4 text-neutral-500 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Store</span>
            </Link>

            <Link
              href="/"
              aria-label="HOPSY PLAZA home"
              className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <BrandLogo variant="horizontal" size="md" />
            </Link>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-8">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Enterprise Admin Portal
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm font-normal text-neutral-500">
              Sign in to manage your HOPSY PLAZA store — products, orders, customers, and support.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-600"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleStandardLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-neutral-950"
              >
                Administrator Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@hopsyplaza.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-950 shadow-2xs transition-all placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="pass" className="block text-sm font-bold text-neutral-950">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-4 pr-11 text-sm font-medium text-neutral-950 shadow-2xs transition-all placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-neutral-400 transition-colors hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-neutral-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              />
              Keep me signed in on this device
            </label>

            {/* Primary Pill Button — HOPSY brand orange */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-md transition-all hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Authenticating..." : "Secure Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-neutral-400">
            Protected by HOPSY PLAZA enterprise-grade session security.
          </p>
        </div>
      </div>

      {/* ============ Right Column: Hero Panel (hidden below lg) ============ */}
      <div className="relative hidden p-4 lg:block xl:p-6">
        <div className="relative flex h-full w-full flex-col">
          {/* Top folder tab / pill badge */}
          <div className="relative z-20 -mb-5 ml-8 rounded-full border border-white/10 bg-neutral-900 px-6 py-3 text-sm font-bold text-white shadow-sm w-fit xl:ml-12">
            Admin Command Center
          </div>

          {/* Main Photographic Card — HOPSY logistics / warehouse imagery */}
          <div className="group relative z-10 flex flex-1 flex-col justify-end overflow-hidden rounded-[36px] border border-neutral-200/60 bg-neutral-950 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=80"
              alt="HOPSY PLAZA distribution and fulfillment operations"
              className="absolute inset-0 h-full w-full object-cover grayscale-[0.35] contrast-110 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Brand orange ambient glow accent */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />

            {/* Bottom dark gradient overlay + messaging */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex h-4/5 flex-col justify-end bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-transparent p-10 xl:p-14">
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <Boxes className="h-4 w-4 text-orange-400" />
                  Inventory
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <LineChart className="h-4 w-4 text-orange-400" />
                  Analytics
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  Secure Access
                </span>
              </div>

              <h2 className="mb-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Complete control over your store ecosystem
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70">
                Manage store operations, orders, and enterprise commerce from one authoritative
                HOPSY PLAZA command center.
              </p>

              {/* Bottom left indicator dots */}
              <div className="mt-8 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
