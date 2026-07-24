/**
 * HOPSY PLAZA — Enterprise Design System Tokens
 * Governed by 08_DESIGN_SYSTEM.md
 */

export const DESIGN_TOKENS = {
  colors: {
    primary: {
      default: '#F97316',   // Brand Orange
      hover: '#EA580C',     // Darker orange for hover states
      active: '#C2410C',    // Active click state
      light: '#FFF7ED',     // Soft orange surface/background tint
      dark: '#9A3412',      // Dark contrast orange
    },
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617',
    },
    supporting: {
      white: '#FFFFFF',
      black: '#0A0A0A',
      lightGray: '#F8FAFC',
      softSilver: '#E2E8F0',
    },
    status: {
      success: {
        default: '#10B981',
        light: '#ECFDF5',
        dark: '#065F46',
      },
      warning: {
        default: '#F59E0B',
        light: '#FFFBEB',
        dark: '#92400E',
      },
      error: {
        default: '#EF4444',
        light: '#FEF2F2',
        dark: '#991B1B',
      },
      info: {
        default: '#3B82F6',
        light: '#EFF6FF',
        dark: '#1E40AF',
      },
    },
  },
  typography: {
    fontFamily: {
      sans: 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'var(--font-mono), "JetBrains Mono", Menlo, Monaco, Consolas, monospace',
    },
    scale: {
      xs: { size: '0.75rem', lineHeight: '1.125rem', letterSpacing: '0.01em' },
      sm: { size: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.005em' },
      base: { size: '1rem', lineHeight: '1.5rem', letterSpacing: '0em' },
      lg: { size: '1.125rem', lineHeight: '1.75rem', letterSpacing: '-0.005em' },
      xl: { size: '1.25rem', lineHeight: '1.75rem', letterSpacing: '-0.01em' },
      '2xl': { size: '1.5rem', lineHeight: '2rem', letterSpacing: '-0.015em' },
      '3xl': { size: '1.875rem', lineHeight: '2.25rem', letterSpacing: '-0.02em' },
      '4xl': { size: '2.25rem', lineHeight: '2.5rem', letterSpacing: '-0.025em' },
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  spacing: {
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.375rem', // 6px — standard restrained corner rounding
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px — modals and large cards
    '2xl': '1rem',  // 16px
    full: '9999px', // pills and avatars
  },
  elevation: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
  },
  motion: {
    durations: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easings: {
      default: [0.16, 1, 0.3, 1] as [number, number, number, number],
      inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
