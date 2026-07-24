import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "HOPSY PLAZA Admin",
  description: "HOPSY PLAZA Admin Dashboard",
};

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
      </body>
    </html>
  );
}
