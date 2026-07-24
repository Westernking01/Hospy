"use server";

import { prisma } from "@hopsy/database";

export async function getStorefrontProducts() {
  const dbProducts = await prisma.product.findMany({
    where: { status: "PUBLISHED", deleted_at: null },
    orderBy: { created_at: "desc" },
    include: {
      category: true,
      brand: true,
      variants: { include: { inventories: true } },
      images: { orderBy: { display_order: "asc" } },
    }
  });

  return dbProducts.map((p: any) => {
    const stock = p.variants?.reduce((acc: number, v: any) => acc + (v.inventories?.reduce((s: number, i: any) => s + i.available_quantity, 0) || 0), 0) || 0;
    const priceNgn = p.variants?.[0]?.price ? Number(p.variants[0].price) : 0;
    
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku_prefix || (p.variants?.[0]?.sku ?? "SKU-0000"),
      description: p.description || p.short_description || "",
      short_description: p.short_description || "",
      price: priceNgn,
      compare_at_price: p.variants?.[0]?.compare_at_price ? Number(p.variants[0].compare_at_price) : undefined,
      currency: "NGN",
      stock_quantity: stock,
      status: p.status,
      is_featured: p.is_featured,
      is_trending: p.is_featured,
      is_new_arrival: true,
      is_best_seller: true,
      is_flash_sale: p.is_flash_sale,
      category: {
        id: p.category?.id || "cat-1",
        name: p.category?.name || "Category",
        slug: p.category?.slug || "category",
        description: "",
        image_url: "",
        itemCount: 1,
      },
      brand: {
        id: p.brand?.id || "br-1",
        name: p.brand?.name || "Brand",
        slug: p.brand?.slug || "brand",
        logo_url: p.brand?.logo_url || "",
        productCount: 0,
      },
      image_url: p.images?.[0]?.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      images: p.images?.map((i: any) => i.image_url) || [],
      variants: p.variants?.map((v: any) => ({
        id: v.id,
        name: v.variant_name || "Default",
        sku: v.sku,
        price: Number(v.price),
        stock_quantity: v.inventories?.reduce((s: number, i: any) => s + i.available_quantity, 0) || 0
      })) || [],
      rating: 4.5,
      reviews_count: 12,
      created_at: p.created_at.toISOString(),
      updated_at: p.updated_at.toISOString(),
    };
  });
}
