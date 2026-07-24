import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } from "../mock-data";

export interface AdminDashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  activeProducts: number;
  lowStockCount: number;
  revenueChartData: { date: string; revenue: number; orders: number }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    createdAt: string;
    itemsCount: number;
  }[];
}

export interface AdminProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryName: string;
  price: number;
  compareAtPrice: number | null;
  stockQuantity: number;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  imageUrl: string;
  variantsCount: number;
  createdAt: string;
}

export interface AdminOrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  subtotal: number;
  shippingFee: number;
  taxFee: number;
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  paymentStatus: string;
  paymentMethod: string;
  paymentReference?: string;
  shippingAddress: any;
  items: {
    id: string;
    productName: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }[];
  createdAt: string;
}

export interface AdminInventoryItem {
  id: string;
  productName: string;
  sku: string;
  warehouseLocation: string;
  stockQuantity: number;
  reservedQuantity: number;
  reorderThreshold: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  lastUpdated: string;
}

export interface AdminInventoryLogItem {
  id: string;
  productName: string;
  sku: string;
  movementType: "PURCHASE" | "SALE" | "RESTOCK" | "DAMAGE" | "MANUAL_ADJUSTMENT";
  quantityChange: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  adminName: string;
  createdAt: string;
}

export interface AdminCustomerItem {
  id: string;
  fullName: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  ordersCount: number;
  lifetimeSpend: number;
  totalSpent: number;
  isVerified: boolean;
  vipStatus: boolean;
  status: string;
  createdAt: string;
  joinedAt: string;
}

export interface AdminReviewItem {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  status: "PENDING" | "APPROVED" | "FLAGGED" | "REJECTED" | "REPORTED" | string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface AdminPromotionItem {
  id: string;
  code: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT" | "FIXED" | string;
  discountValue: number;
  minOrderAmount: number;
  maxUses: number;
  currentUses: number;
  usageCount: number;
  isActive: boolean;
  status: string;
  expiresAt: string;
  validUntil: string;
}

export interface AdminAuditLogItem {
  id: string;
  action: string;
  module: string;
  description: string;
  adminName: string;
  ipAddress: string;
  createdAt: string;
}
