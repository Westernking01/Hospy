"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type MockProduct } from "@hopsy/commerce/src/mock-data";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: MockProduct[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: MockProduct) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<MockProduct[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("hopsyplaza_wishlist");
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch {
      // localStorage disabled or SSR
    }
  }, []);

  const saveToStorage = (items: MockProduct[]) => {
    setWishlistItems(items);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("hopsyplaza_wishlist", JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: MockProduct) => {
    if (isInWishlist(product.id)) {
      saveToStorage(wishlistItems.filter((item) => item.id !== product.id));
    } else {
      saveToStorage([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    saveToStorage(wishlistItems.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    saveToStorage([]);
  };

  const wishlistIds = wishlistItems.map((item) => item.id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

