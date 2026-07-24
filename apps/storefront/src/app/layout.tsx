import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://hopsyplaza.com'),
  title: {
    default: "HOPSY PLAZA — Enterprise Electronics & Hardware Storefront",
    template: "%s | HOPSY PLAZA",
  },
  description:
    "Enterprise-grade electronics, IT infrastructure, networking equipment, and hardware procurement storefront and management platform.",
  keywords: [
    "HOPSY PLAZA",
    "electronics",
    "hardware",
    "IT procurement",
    "enterprise networking",
    "servers",
    "workstations",
    "e-commerce",
  ],
  authors: [{ name: "HOPSY PLAZA Enterprise Systems" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/branding/favicon/favicon.ico", sizes: "any" },
      { url: "/branding/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/branding/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/branding/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/branding/favicon/favicon-180.png", sizes: "180x180", type: "image/png" },
      { url: "/branding/app-icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/branding/favicon/favicon.svg",
        color: "#ea580c",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hopsyplaza.com",
    title: "HOPSY PLAZA — Enterprise Electronics & Hardware",
    description:
      "Official storefront for HOPSY PLAZA enterprise hardware, electronics, and IT infrastructure procurement.",
    siteName: "HOPSY PLAZA",
    images: [
      {
        url: "/branding/logo/logo.png",
        width: 1024,
        height: 546,
        alt: "HOPSY PLAZA Official Brand Identity",
      },
      {
        url: "/branding/logo/logo-horizontal.png",
        width: 1024,
        height: 302,
        alt: "HOPSY PLAZA Storefront Header",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPSY PLAZA — Enterprise Electronics & Hardware",
    description:
      "Enterprise-grade electronics, hardware, and IT equipment procurement storefront.",
    images: ["/branding/logo/logo.png"],
  },
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
        style={{
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-background focus:z-50">Skip to content</a>
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
