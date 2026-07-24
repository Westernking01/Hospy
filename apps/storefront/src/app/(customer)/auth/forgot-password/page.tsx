"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-12 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Form Stage (Strictly matching screenshot layout & button shapes) */}
        <div className="lg:col-span-6 max-w-md mx-auto lg:mx-0 w-full flex flex-col justify-center py-6">
          {/* Top Navigation Back Icon & Brand Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <Link
              href="/"
              aria-label="Back to store"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-950 text-xs font-bold tracking-wide transition-all shadow-2xs group"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Store</span>
            </Link>

            <Link href="/" className="flex items-center">
              <BrandLogo variant="horizontal" size="md" />
            </Link>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight mb-2">
            Reset your password
          </h1>
          <p className="text-sm text-neutral-500 font-normal mb-8">
            Enter your email address and we will send you instructions to reset your password.
          </p>

          {submitted ? (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-3" />
                <h3 className="font-bold text-neutral-950 text-base mb-1">Check your inbox</h3>
                <p className="text-sm text-neutral-600">
                  We sent a password recovery link to <span className="font-bold text-neutral-950">{email}</span>.
                </p>
              </div>
              <Link
                href="/auth/login"
                className="w-full py-3.5 px-6 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-bold text-neutral-950 block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="hello@hopsyplaza.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none transition-all shadow-2xs"
                />
              </div>

              {/* Primary Pill Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center mt-4 disabled:opacity-70"
              >
                {loading ? "Sending link..." : "Send Reset Link"}
              </button>
            </form>
          )}

          {/* Secondary Pill Button */}
          {!submitted && (
            <div className="mt-4">
              <Link
                href="/auth/login"
                className="w-full py-3.5 px-6 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Folder Notch Card Stage exactly matching screenshot */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full max-w-lg mx-auto lg:max-w-none">
          <div className="flex flex-col items-start w-full">
            {/* Top folder tab/pill badge exactly like "Your Crypto platform" */}
            <div className="bg-white border border-neutral-200/80 shadow-sm rounded-t-2xl sm:rounded-full px-6 py-3 font-bold text-sm text-neutral-950 relative z-20 -mb-4 sm:-mb-5 ml-6 sm:ml-10">
              Your HOPSY PLAZA platform
            </div>

            {/* Main Photographic Card with futuristic/high-end visual */}
            <div className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[36px] overflow-hidden relative bg-neutral-950 border border-neutral-200/60 shadow-2xl z-10 flex flex-col justify-end group">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
                alt="Professional electronics setup featuring smart home appliances and entertainment devices"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Bottom Dark Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent flex flex-col justify-end p-8 sm:p-10 lg:p-12 z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6 max-w-md">
                  The Simplest way to manage your tech & lifestyle
                </h2>

                {/* Bottom left 3 indicator dots exactly matching screenshot */}
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
