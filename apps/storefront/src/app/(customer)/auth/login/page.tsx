"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please provide your email address and password.");
      return;
    }
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error("Invalid email or password.");
      }

      // Success, route to account
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Sign in to your account
          </h1>
          <p className="text-sm text-neutral-500 font-normal mb-8">
            Welcome back! Enter your details to continue at HOPSY PLAZA
          </p>

          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="pass" className="text-sm font-bold text-neutral-950 block">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-bold text-neutral-600 hover:text-neutral-950 underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-4 pr-11 rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm font-medium text-neutral-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            {/* Primary Pill Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-neutral-950 hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center mt-2 disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Secondary Pill Button */}
          <div className="mt-3">
            <Link
              href="/auth/register"
              className="w-full py-3.5 px-6 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-950 font-bold text-sm transition-all text-center block shadow-2xs"
            >
              Create Account
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-neutral-200 flex-1" />
            <span className="text-xs font-semibold text-neutral-400">or continue with</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>

          {/* Social Pill Button */}
          <button
            type="button"
            onClick={() => {
              // Mock Google auth
              localStorage.setItem(
                "hopsyplaza_auth_user",
                JSON.stringify({
                  id: "usr_google_101",
                  email: "user@gmail.com",
                  name: "Google User",
                  role: "CUSTOMER",
                })
              );
              router.push("/account");
            }}
            className="w-full py-3.5 px-6 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-sm transition-all flex items-center justify-center gap-2.5 shadow-2xs"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>
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
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80"
                alt="Modern executive workspace with MacBook Pro workstation and premium audio equipment"
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
