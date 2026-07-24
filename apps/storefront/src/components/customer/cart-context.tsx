"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ServerCartSummary, ServerCartItem } from "@hopsy/commerce/src/types";

export interface CartItem {
  id: string;
  productId?: string;
  variantId?: string | null;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  quantity?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartSummary: ServerCartSummary | null;
  isSyncing: boolean;
  couponCode: string | null;
  shippingMethodId: string | null;
  shippingState: string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  setShippingSelection: (methodId: string | null, state: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<ServerCartSummary | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(null);
  const [shippingState, setShippingState] = useState<string>("Ekiti State");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("hopsy_cart");
      const storedCoupon = localStorage.getItem("hopsy_coupon");
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        setCartItems(parsed);
      }
      if (storedCoupon) {
        setCouponCode(storedCoupon);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
    }
  }, []);

  // Save items to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem("hopsy_cart", JSON.stringify(cartItems));
      if (couponCode) {
        localStorage.setItem("hopsy_coupon", couponCode);
      } else {
        localStorage.removeItem("hopsy_coupon");
      }
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cartItems, couponCode]);

  // Synchronize cart with authoritative server API (`/api/v1/cart`)
  const syncServerCart = useCallback(
    async (items: CartItem[], code: string | null, methodId: string | null, state: string) => {
      setIsSyncing(true);
      try {
        const payload = {
          items: items.map((i) => ({
            id: i.id,
            productId: i.productId || i.id,
            variantId: i.variantId || null,
            quantity: i.quantity || 1,
            slug: i.slug,
            name: i.name,
            price: i.price,
            image: i.image,
          })),
          couponCode: code,
          shippingMethodId: methodId,
          state,
        };

        const res = await fetch("/api/v1/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setCartSummary(json.data);
          }
        }
      } catch (err) {
        console.warn("Cart synchronization offline/fallback mode:", err);
      } finally {
        setIsSyncing(false);
      }
    },
    []
  );

  useEffect(() => {
    syncServerCart(cartItems, couponCode, shippingMethodId, shippingState);
  }, [cartItems, couponCode, shippingMethodId, shippingState, syncServerCart]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + (item.quantity || 1);
        return updated;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode(null);
    setCartSummary(null);
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const trimmed = code.trim().toUpperCase();
    try {
      const res = await fetch("/api/v1/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: trimmed,
          cartTotal: cartSummary?.subtotal || cartItems.reduce((acc, i) => acc + i.price * (i.quantity || 1), 0),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCouponCode(trimmed);
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || "Invalid coupon code." };
    } catch (err: any) {
      return { success: false, message: "Error validating coupon." };
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };

  const setShippingSelection = (methodId: string | null, state: string) => {
    setShippingMethodId(methodId);
    setShippingState(state);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSummary,
        isSyncing,
        couponCode,
        shippingMethodId,
        shippingState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setShippingSelection,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: [],
      cartSummary: null,
      isSyncing: false,
      couponCode: null,
      shippingMethodId: null,
      shippingState: "Ekiti State",
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      applyCoupon: async () => ({ success: false, message: "Cart context missing" }),
      removeCoupon: () => {},
      setShippingSelection: () => {},
    };
  }
  return context;
}

