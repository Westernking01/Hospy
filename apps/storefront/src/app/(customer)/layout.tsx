"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { WishlistProvider } from "@/components/customer/wishlist-context";
import { CartProvider } from "@/components/customer/cart-context";
import { StorefrontProvider } from "@/components/customer/storefront-context";
import { Header } from "@/components/customer/header";
import { MegaNav } from "@/components/customer/mega-nav";
import { MobileNav } from "@/components/customer/mobile-nav";
import { Footer } from "@/components/customer/footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <StorefrontProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">
            {!isAuthPage && (
              <>
                <Header onOpenMobileNav={() => setIsMobileNavOpen(true)} />
                <MegaNav />
                <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
              </>
            )}
            
            <main className="flex-1 flex flex-col">
              {children}
            </main>

            {!isAuthPage && <Footer />}
          </div>
        </CartProvider>
      </WishlistProvider>
    </StorefrontProvider>
  );
}
