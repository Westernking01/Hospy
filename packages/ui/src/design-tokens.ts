/**
 * HOPSY PLAZA Ecosystem Design Tokens
 * Centralized token definitions adhering to 08_DESIGN_SYSTEM.md
 */

export const colors = {
  brand: {
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316", // Primary interactive accent — single source of truth (matches --primary)
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407",
    },
    white: "#ffffff",
    black: "#0a0a0a",
  },
  neutral: {
    50: "#f9fafb", // Soft Silver / Light Backgrounds
    100: "#f3f4f6", // Light Gray
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  status: {
    success: {
      light: "#ecfdf5",
      DEFAULT: "#10b981",
      dark: "#047857",
    },
    warning: {
      light: "#fffbeb",
      DEFAULT: "#f59e0b",
      dark: "#b45309",
    },
    error: {
      light: "#fef2f2",
      DEFAULT: "#ef4444",
      dark: "#b91c1c",
    },
    info: {
      light: "#eff6ff",
      DEFAULT: "#3b82f6",
      dark: "#1d4ed8",
    },
  },
} as const;

export const spacing = {
  px: "1px",
  0: "0px",
  1: "0.25rem", // 4px
  2: "0.5rem",  // 8px
  3: "0.75rem", // 12px
  4: "1rem",    // 16px
  5: "1.25rem", // 20px
  6: "1.5rem",  // 24px
  8: "2rem",    // 32px
  10: "2.5rem", // 40px
  12: "3rem",   // 48px
  16: "4rem",   // 64px
  20: "5rem",   // 80px
  24: "6rem",   // 96px
} as const;

export const typography = {
  fonts: {
    sans: "var(--font-sans), system-ui, -apple-system, sans-serif",
    mono: "var(--font-mono), monospace",
  },
  sizes: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export const radius = {
  none: "0px",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px - Restrained corner rounding per 08_DESIGN_SYSTEM.md
  md: "0.375rem", // 6px
  lg: "0.5rem",   // 8px
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const designTokens = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  breakpoints,
} as const;
