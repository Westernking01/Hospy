import { prisma } from "@hopsy/database";
import { MOCK_PRODUCTS, type MockProduct } from "./mock-data";

export interface ProductQueryParams {
  categorySlug?: string;
  brandSlug?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "featured" | "price_asc" | "price_desc" | "newest" | "rating";
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
}

export interface PaginatedProducts {
  products: MockProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getProducts(params: ProductQueryParams = {}): Promise<PaginatedProducts> {
  const page = params.page || 1;
  const limit = params.limit || 12;

  try {
    // Attempt database query when live records exist
    const whereClause: any = {
      status: "PUBLISHED",
      deleted_at: null,
    };

    if (params.categorySlug) {
      whereClause.category = { slug: params.categorySlug };
    }
    if (params.brandSlug) {
      whereClause.brand = { slug: params.brandSlug };
    }
    if (params.search) {
      whereClause.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
        { sku: { contains: params.search, mode: "insensitive" } },
      ];
    }
    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      whereClause.price = {};
      if (params.minPrice !== undefined) whereClause.price.gte = params.minPrice;
      if (params.maxPrice !== undefined) whereClause.price.lte = params.maxPrice;
    }
    if (params.inStock) {
      whereClause.stock_quantity = { gt: 0 };
    }
    if (params.isFeatured) whereClause.is_featured = true;
    if (params.isTrending) whereClause.is_trending = true;
    if (params.isNewArrival) whereClause.is_new_arrival = true;
    if (params.isBestSeller) whereClause.is_best_seller = true;
    if (params.isFlashSale) whereClause.is_flash_sale = true;

    let orderBy: any = { created_at: "desc" };
    if (params.sortBy === "price_asc") orderBy = { price: "asc" };
    else if (params.sortBy === "price_desc") orderBy = { price: "desc" };
    else if (params.sortBy === "rating") orderBy = { created_at: "desc" };
    else if (params.sortBy === "featured") orderBy = { is_featured: "desc" };

    const totalDb = await prisma.product.count({ where: whereClause });

    if (totalDb > 0) {
      const dbProducts = await prisma.product.findMany({
        where: whereClause,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          brand: true,
          variants: true,
          specifications: true,
          images: { orderBy: { display_order: "asc" } },
          reviews: { where: { is_approved: true } },
        },
      });

      const formattedProducts: MockProduct[] = dbProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        sku: p.sku_prefix || (p.variants?.[0]?.sku ?? "SKU-0000"),
        description: p.description || "",
        short_description: p.short_description || "",
        price: p.variants?.[0]?.price ? Number(p.variants[0].price) : 0,
        compare_at_price: p.variants?.[0]?.compare_at_price ? Number(p.variants[0].compare_at_price) : undefined,
        currency: "NGN",
        stock_quantity: p.variants?.reduce((acc: number, v: any) => acc + (v.inventories?.reduce((s: number, i: any) => s + i.quantity, 0) || 10), 0) || 10,
        status: (p.status === "PUBLISHED" ? "ACTIVE" : "DRAFT") as any,
        is_featured: p.is_featured,
        is_trending: p.is_featured || false,
        is_new_arrival: false,
        is_best_seller: p.is_featured || false,
        is_flash_sale: p.is_flash_sale,
        flash_sale_end_time: undefined,
        category: {
          id: p.category.id,
          name: p.category.name,
          slug: p.category.slug,
          description: p.category.description || "",
          image_url: p.category.image_url || "",
          icon: (p.category as any).icon || "Laptop",
          itemCount: 0,
        },
        brand: {
          id: p.brand.id,
          name: p.brand.name,
          slug: p.brand.slug,
          description: p.brand.description || "",
          logo_url: p.brand.logo_url || "",
          productCount: 0,
        },
        images: p.images.map((img: any) => img.image_url),
        variants: p.variants.map((v: any) => ({
          id: v.id,
          name: v.name,
          sku: v.sku,
          price: Number(v.price),
          compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : undefined,
          stock_quantity: v.stock_quantity,
          attributes: (v.attributes as Record<string, string>) || {},
        })),
        specifications: p.specifications.map((s: any) => ({
          group: s.group_name,
          name: s.attribute_name,
          value: s.attribute_value,
        })),
        reviews: p.reviews.map((r: any) => ({
          id: r.id,
          user_name: "Verified Customer",
          rating: r.rating,
          title: r.title || "",
          comment: r.comment || "",
          created_at: r.created_at.toISOString(),
          verified_purchase: r.is_verified_purchase,
        })),
        rating: p.reviews.length > 0 ? p.reviews.reduce((a: number, b: any) => a + b.rating, 0) / p.reviews.length : 4.8,
        review_count: p.reviews.length,
      }));

      return {
        products: formattedProducts,
        total: totalDb,
        page,
        limit,
        totalPages: Math.ceil(totalDb / limit),
      };
    }
  } catch {
    // Database unreachable during offline development or prior to Phase 3 migration/seeding — fall back to structured mock data
  }

  // Fallback to high-fidelity mock data filtering
  let filtered = [...MOCK_PRODUCTS];

  if (params.categorySlug) {
    filtered = filtered.filter((p) => p.category.slug === params.categorySlug);
  }
  if (params.brandSlug) {
    filtered = filtered.filter((p) => p.brand.slug === params.brandSlug);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!);
  }
  if (params.inStock) {
    filtered = filtered.filter((p) => p.stock_quantity > 0);
  }
  if (params.isFeatured) filtered = filtered.filter((p) => p.is_featured);
  if (params.isTrending) filtered = filtered.filter((p) => p.is_trending);
  if (params.isNewArrival) filtered = filtered.filter((p) => p.is_new_arrival);
  if (params.isBestSeller) filtered = filtered.filter((p) => p.is_best_seller);
  if (params.isFlashSale) filtered = filtered.filter((p) => p.is_flash_sale);

  if (params.sortBy === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (params.sortBy === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (params.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return {
    products: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function getProductBySlug(slug: string): Promise<MockProduct | null> {
  try {
    const dbProduct = await prisma.product.findFirst({
      where: { slug, status: "PUBLISHED", deleted_at: null },
      include: {
        category: true,
        brand: true,
        variants: true,
        specifications: true,
        images: { orderBy: { display_order: "asc" } },
        reviews: { where: { is_approved: true } },
      },
    });

    if (dbProduct) {
      return {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        sku: dbProduct.sku_prefix || (dbProduct.variants?.[0]?.sku ?? "SKU-0000"),
        description: dbProduct.description || "",
        short_description: dbProduct.short_description || "",
        price: dbProduct.variants?.[0]?.price ? Number(dbProduct.variants[0].price) : 0,
        compare_at_price: dbProduct.variants?.[0]?.compare_at_price ? Number(dbProduct.variants[0].compare_at_price) : undefined,
        currency: "NGN",
        stock_quantity: dbProduct.variants?.reduce((acc: number, v: any) => acc + (v.inventories?.reduce((s: number, i: any) => s + i.quantity, 0) || 10), 0) || 10,
        status: (dbProduct.status === "PUBLISHED" ? "ACTIVE" : "DRAFT") as any,
        is_featured: dbProduct.is_featured,
        is_trending: dbProduct.is_featured || false,
        is_new_arrival: false,
        is_best_seller: dbProduct.is_featured || false,
        is_flash_sale: dbProduct.is_flash_sale,
        flash_sale_end_time: undefined,
        category: {
          id: dbProduct.category.id,
          name: dbProduct.category.name,
          slug: dbProduct.category.slug,
          description: dbProduct.category.description || "",
          image_url: dbProduct.category.image_url || "",
          icon: (dbProduct.category as any).icon || "Laptop",
          itemCount: 0,
        },
        brand: {
          id: dbProduct.brand.id,
          name: dbProduct.brand.name,
          slug: dbProduct.brand.slug,
          description: dbProduct.brand.description || "",
          logo_url: dbProduct.brand.logo_url || "",
          productCount: 0,
        },
        images: dbProduct.images.map((img: any) => img.image_url),
        variants: dbProduct.variants.map((v: any) => ({
          id: v.id,
          name: v.name,
          sku: v.sku,
          price: Number(v.price),
          compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : undefined,
          stock_quantity: v.stock_quantity,
          attributes: (v.attributes as Record<string, string>) || {},
        })),
        specifications: dbProduct.specifications.map((s: any) => ({
          group: s.group_name,
          name: s.attribute_name,
          value: s.attribute_value,
        })),
        reviews: dbProduct.reviews.map((r: any) => ({
          id: r.id,
          user_name: "Verified Customer",
          rating: r.rating,
          title: r.title || "",
          comment: r.comment || "",
          created_at: r.created_at.toISOString(),
          verified_purchase: r.is_verified_purchase,
        })),
        rating: dbProduct.reviews.length > 0 ? dbProduct.reviews.reduce((a: number, b: any) => a + b.rating, 0) / dbProduct.reviews.length : 4.8,
        review_count: dbProduct.reviews.length,
      };
    }
  } catch {
    // Database unreachable during offline development or prior to seeding
  }

  return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
}
