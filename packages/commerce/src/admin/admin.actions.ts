"use server";

import { prisma } from "@hopsy/database";
import {
  AdminDashboardMetrics,
  AdminProductItem,
  AdminOrderItem,
  AdminInventoryItem,
  AdminInventoryLogItem,
  AdminCustomerItem,
  AdminReviewItem,
  AdminPromotionItem,
  AdminAuditLogItem
} from "./admin.types";

/**
 * Products
 */
export async function getProductsAction(query?: string, status?: string): Promise<AdminProductItem[]> {
  const whereClause: any = { deleted_at: null };
  if (query && query.trim()) {
    whereClause.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { sku_prefix: { contains: query, mode: "insensitive" } },
    ];
  }
  if (status && status !== "ALL") {
    whereClause.status = status;
  }

  const dbProducts = await prisma.product.findMany({
    where: whereClause,
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
      categoryName: p.category?.name || "Uncategorized",
      price: priceNgn,
      compareAtPrice: p.variants?.[0]?.compare_at_price ? Number(p.variants[0].compare_at_price) : null,
      stockQuantity: stock,
      status: p.status,
      imageUrl: p.images?.[0]?.image_url || "/branding/placeholder-square.jpg",
      variantsCount: p.variants?.length || 0,
      createdAt: p.created_at.toISOString(),
    };
  });
}

export async function createProductAction(data: any) {
  let category = await prisma.category.findFirst({ where: { name: data.categoryName } });
  if (!category) {
    category = await prisma.category.findFirst();
  }
  let brand = await prisma.brand.findFirst();
  if (!category || !brand) throw new Error("Need at least one category and brand in DB");

  const newProduct = await prisma.product.create({
    data: {
      name: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku_prefix: data.sku,
      description: data.description,
      status: data.status,
      category_id: category.id,
      brand_id: brand.id,
      images: {
        create: [
          {
            image_url: data.imageUrl,
            alt_text: data.title,
            display_order: 1
          }
        ]
      },
      variants: {
        create: [
          {
            variant_name: "Default",
            sku: data.sku,
            price: data.price,
            compare_at_price: data.compareAtPrice,
            cost_price: data.costPrice,
            is_active: true,
            is_default: true,
            inventories: {
              create: [
                {
                  warehouse_id: (await prisma.warehouse.findFirst())?.id || "unknown",
                  available_quantity: data.initialStock || 25,
                  low_stock_threshold: data.lowStockThreshold || 5
                }
              ]
            }
          }
        ]
      }
    }
  });
  return newProduct;
}

export async function deleteProductAction(id: string) {
  await prisma.product.update({
    where: { id },
    data: { deleted_at: new Date(), status: "ARCHIVED" }
  });
}

/**
 * Categories
 */
export async function getCategoriesAction() {
  const categories = await prisma.category.findMany({
    where: { deleted_at: null },
    orderBy: { display_order: "asc" },
    include: {
      _count: { select: { products: { where: { deleted_at: null } } } }
    }
  });
  
  return categories.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || "",
    imageUrl: c.image_url || "",
    itemCount: c._count.products,
    status: c.is_active ? "ACTIVE" : "INACTIVE"
  }));
}

/**
 * Brands
 */
export async function getBrandsAction() {
  const brands = await prisma.brand.findMany({
    where: { deleted_at: null },
    include: {
      _count: { select: { products: { where: { deleted_at: null } } } }
    }
  });
  
  return brands.map((b: any) => ({
    id: b.id,
    name: b.name,
    slug: b.slug,
    description: b.description || "",
    logoUrl: b.logo_url || "",
    productCount: b._count.products,
    isVerifiedPartner: true,
    partnershipTier: b.is_featured ? "PLATINUM" : "GOLD"
  }));
}

/**
 * Customers
 */
export async function getCustomersAction(query?: string) {
  const where: any = {};
  if (query) {
    where.OR = [
      { first_name: { contains: query, mode: "insensitive" } },
      { last_name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } }
    ];
  }
  
  const customers = await prisma.customer.findMany({
    where,
    include: {
      orders: {
        select: { total_amount: true, status: true }
      },
      _count: { select: { orders: true } }
    }
  });
  
  return customers.map((c: any) => {
    const totalSpent = c.orders
      .filter((o: any) => o.status === "PAID" || o.status === "DELIVERED")
      .reduce((sum: number, o: any) => sum + Number(o.total_amount), 0);
      
    return {
      id: c.id,
      fullName: `${c.first_name} ${c.last_name}`.trim(),
      name: `${c.first_name} ${c.last_name}`.trim(),
      email: c.email,
      phone: c.phone || "",
      totalOrders: c._count.orders,
      ordersCount: c._count.orders,
      lifetimeSpend: totalSpent,
      totalSpent: totalSpent,
      isVerified: c.is_verified,
      vipStatus: totalSpent > 5000000,
      status: c.is_active ? "ACTIVE" : "INACTIVE",
      createdAt: c.created_at.toISOString(),
      joinedAt: c.created_at.toISOString()
    };
  });
}

/**
 * Orders
 */
export async function getOrdersAction(status?: string, search?: string) {
  const where: any = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  
  if (search) {
    where.OR = [
      { order_number: { contains: search, mode: "insensitive" } },
      { customer: { email: { contains: search, mode: "insensitive" } } },
      { customer: { first_name: { contains: search, mode: "insensitive" } } }
    ];
  }
  
  const orders = await prisma.order.findMany({
    where,
    orderBy: { created_at: "desc" },
    include: {
      customer: true,
      shipping_address: true,
      items: true
    }
  });
  
  return orders.map((o: any) => ({
    id: o.id,
    orderNumber: o.order_number,
    customerName: `${o.customer.first_name} ${o.customer.last_name}`.trim(),
    customerEmail: o.customer.email,
    customerPhone: o.customer.phone || "",
    totalAmount: Number(o.total_amount),
    subtotal: Number(o.subtotal),
    shippingFee: Number(o.shipping_amount),
    taxFee: Number(o.tax_amount),
    status: o.status,
    paymentStatus: o.payment_status,
    paymentMethod: "PAYSTACK", // Mapped from related table if needed
    shippingAddress: o.shipping_address ? {
      recipientName: o.shipping_address.full_name,
      addressLine1: o.shipping_address.address_line_1,
      city: o.shipping_address.city,
      state: o.shipping_address.state,
      country: o.shipping_address.country,
    } : null,
    items: o.items.map((i: any) => ({
      id: i.id,
      productName: i.product_name,
      sku: i.sku,
      unitPrice: Number(i.unit_price),
      quantity: i.quantity,
      subtotal: Number(i.subtotal)
    })),
    createdAt: o.created_at.toISOString()
  }));
}

export async function getDashboardOverviewAction(): Promise<AdminDashboardMetrics> {
  const orders = await getOrdersAction();
  
  const totalRevenue = orders
    .filter((o: any) => o.status !== "CANCELLED" && o.status !== "REFUNDED")
    .reduce((sum: number, o: any) => sum + o.totalAmount, 0);
    
  const activeProducts = await prisma.product.count({ where: { status: "PUBLISHED", deleted_at: null }});
  
  return {
    totalRevenue,
    totalOrders: orders.length,
    activeProducts,
    lowStockCount: 0,
    revenueChartData: [], // TODO: Generate last 7 days chart data based on real dates
    recentOrders: orders.slice(0, 8).map((o: any) => ({
      ...o,
      itemsCount: o.items.reduce((sum: number, i: any) => sum + i.quantity, 0)
    }))
  };
}

export async function getInventoryAction(): Promise<{
  stockItems: AdminInventoryItem[];
  movementLogs: AdminInventoryLogItem[];
}> {
  return { stockItems: [], movementLogs: [] };
}

export async function getReviewsAction(status?: string): Promise<AdminReviewItem[]> {
  return [];
}

export async function getPromotionsAction(): Promise<AdminPromotionItem[]> {
  return [];
}
