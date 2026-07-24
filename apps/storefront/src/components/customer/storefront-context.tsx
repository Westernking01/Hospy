"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getStorefrontProducts } from "@hopsy/commerce/src/storefront/storefront.actions";
import { getCategoriesAction, getBrandsAction } from "@hopsy/commerce/src/admin/admin.actions";

type StorefrontContextType = {
  products: any[];
  categories: any[];
  brands: any[];
  loading: boolean;
};

const StorefrontContext = createContext<StorefrontContextType>({
  products: [],
  categories: [],
  brands: [],
  loading: true,
});

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getStorefrontProducts(),
      getCategoriesAction(),
      getBrandsAction()
    ]).then(([p, c, b]) => {
      setProducts(p);
      setCategories(c);
      setBrands(b);
      setLoading(false);
    });
  }, []);

  return (
    <StorefrontContext.Provider value={{ products, categories, brands, loading }}>
      {children}
    </StorefrontContext.Provider>
  );
}

export const useStorefrontData = () => useContext(StorefrontContext);
