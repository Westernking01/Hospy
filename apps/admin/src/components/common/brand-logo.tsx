"use client";

import React from "react";
import Image from "next/image";

export type BrandLogoVariant =
  | "primary"
  | "white"
  | "black"
  | "icon"
  | "horizontal"
  | "horizontal-white"
  | "vertical";

export type BrandLogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "auto";

export type BrandLogoLayout = "image-only" | "with-text" | "stacked";

export interface BrandLogoProps {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  layout?: BrandLogoLayout;
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  priority?: boolean;
  alt?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

const SIZE_CONFIG: Record<
  BrandLogoSize,
  { width: number; height: number; text: string; container: string }
> = {
  xs: { width: 80, height: 24, text: "text-xs", container: "h-6" },
  sm: { width: 110, height: 32, text: "text-sm", container: "h-8" },
  md: { width: 140, height: 40, text: "text-base", container: "h-10" },
  lg: { width: 180, height: 52, text: "text-lg", container: "h-12" },
  xl: { width: 220, height: 64, text: "text-xl", container: "h-16" },
  "2xl": { width: 280, height: 80, text: "text-2xl", container: "h-20" },
  auto: { width: 1024, height: 302, text: "text-base", container: "h-auto w-auto" },
};

/**
 * Official HOPSY PLAZA Brand Logo Component
 * Enforces production-ready branding, crisp SVG scaling, accessibility,
 * zero layout shift, and proper aspect-ratio dimensions across all viewports.
 */
export function BrandLogo({
  variant = "primary",
  size = "md",
  layout = "image-only",
  className = "",
  imageClassName = "",
  showText = false,
  priority = true,
  alt = "HOPSY PLAZA — Enterprise Electronics & Hardware Storefront",
  showWordmark = false,
  wordmarkClassName = "",
}: BrandLogoProps) {
  // Determine exact asset path based on variant
  const getAssetConfig = (v: BrandLogoVariant) => {
    switch (v) {
      case "white":
        return {
          src: "/branding/logo/logo-white.svg",
          width: 1024,
          height: 546,
          aspectRatio: "1024/546",
        };
      case "horizontal-white":
        return {
          src: "/branding/logo/logo-horizontal-white.svg",
          width: 1024,
          height: 302,
          aspectRatio: "1024/302",
        };
      case "black":
        return {
          src: "/branding/logo/logo-black.svg",
          width: 1024,
          height: 546,
          aspectRatio: "1024/546",
        };
      case "icon":
        return {
          src: "/branding/logo/logo-icon.svg",
          width: 512,
          height: 512,
          aspectRatio: "1/1",
        };
      case "horizontal":
        return {
          src: "/branding/logo/logo-horizontal.svg",
          width: 1024,
          height: 302,
          aspectRatio: "1024/302",
        };
      case "vertical":
        return {
          src: "/branding/logo/logo-vertical.svg",
          width: 800,
          height: 800,
          aspectRatio: "1/1",
        };
      case "primary":
      default:
        return {
          src: "/branding/logo/logo.svg",
          width: 1024,
          height: 546,
          aspectRatio: "1024/546",
        };
    }
  };

  const asset = getAssetConfig(variant);

  // Determine size classes (height-driven to preserve exact proportions)
  const getSizeClasses = (s: BrandLogoSize, v: BrandLogoVariant) => {
    if (s === "auto") return "h-auto w-auto max-h-full max-w-full";
    if (v === "icon") {
      switch (s) {
        case "xs":
          return "h-6 w-6";
        case "sm":
          return "h-8 w-8";
        case "md":
          return "h-10 w-10";
        case "lg":
          return "h-12 w-12";
        case "xl":
          return "h-16 w-16";
        case "2xl":
          return "h-20 w-20";
        default:
          return "h-10 w-10";
      }
    } else if (v === "horizontal") {
      switch (s) {
        case "xs":
          return "h-6 w-auto";
        case "sm":
          return "h-8 w-auto";
        case "md":
          return "h-10 w-auto";
        case "lg":
          return "h-12 w-auto";
        case "xl":
          return "h-16 w-auto";
        case "2xl":
          return "h-20 w-auto";
        default:
          return "h-10 w-auto";
      }
    } else {
      switch (s) {
        case "xs":
          return "h-7 w-auto";
        case "sm":
          return "h-9 w-auto";
        case "md":
          return "h-11 w-auto";
        case "lg":
          return "h-14 w-auto";
        case "xl":
          return "h-20 w-auto";
        case "2xl":
          return "h-28 w-auto";
        default:
          return "h-11 w-auto";
      }
    }
  };

  const sizeClass = getSizeClasses(size, variant);

  return (
    <div
      className={`relative inline-flex items-center shrink-0 select-none ${className}`}
      style={{ aspectRatio: asset.aspectRatio }}
    >
      <img
        src={asset.src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`object-contain transition-transform duration-200 ${sizeClass}`}
      />
      {showWordmark && (
        <span
          className={`ml-2.5 font-black tracking-tighter leading-none ${wordmarkClassName}`}
        >
          HOPSY <span className="text-orange-600">PLAZA</span>
        </span>
      )}
    </div>
  );
}
