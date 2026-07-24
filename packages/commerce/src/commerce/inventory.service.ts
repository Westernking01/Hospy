import { prisma } from "@hopsy/database";
import { MOCK_PRODUCTS } from "../mock-data";

export interface StockCheckResult {
  available: boolean;
  productId: string;
  variantId?: string | null;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  message: string;
}

// In-memory stock reservations tracking for preview / mock fallback operations
const MOCK_STOCK_RESERVATIONS: Record<string, number> = {};

/**
 * Check stock availability before checkout or order placement
 */
export async function checkStockAvailability(
  productId: string,
  variantId: string | null | undefined,
  requestedQuantity: number
): Promise<StockCheckResult> {
  // 1. Try checking real Prisma database stock first
  try {
    let targetVariantId = variantId;
    if (!targetVariantId) {
      const firstVariant = await (prisma as any).productVariant.findFirst({
        where: { product_id: productId },
      });
      if (firstVariant) {
        targetVariantId = firstVariant.id;
      }
    }

    if (targetVariantId) {
      const inventorySum = await (prisma as any).inventory.aggregate({
        where: { variant_id: targetVariantId },
        _sum: {
          available_quantity: true,
          reserved_quantity: true,
        },
      });

      const currentStock = inventorySum?._sum?.available_quantity ?? 0;
      const reservedStock = inventorySum?._sum?.reserved_quantity ?? 0;
      const availableStock = Math.max(0, currentStock - reservedStock);
      const available = availableStock >= requestedQuantity;

      return {
        available,
        productId,
        variantId: targetVariantId || null,
        currentStock,
        reservedStock,
        availableStock,
        message: available
          ? "Stock available."
          : `Only ${availableStock} item(s) left in stock for this variant.`,
      };
    }
  } catch (err) {
    // Prisma inventory lookup skipped or offline
  }

  // 2. Fallback to mock data check
  const mockProduct = MOCK_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
  const totalStock = mockProduct ? mockProduct.stock_quantity : 50; // default 50 for preview items
  const reserved = MOCK_STOCK_RESERVATIONS[variantId || productId] || 0;
  const availableStock = Math.max(0, totalStock - reserved);
  const available = availableStock >= requestedQuantity;

  return {
    available,
    productId,
    variantId: variantId || null,
    currentStock: totalStock,
    reservedStock: reserved,
    availableStock,
    message: available
      ? "Stock available."
      : `Insufficient stock. Only ${availableStock} item(s) currently available.`,
  };
}

/**
 * Reserve stock upon order placement initiation
 */
export async function reserveStockForOrder(
  items: Array<{ productId: string; variantId?: string | null; quantity: number }>
): Promise<{ success: boolean; failedItems: string[] }> {
  const failedItems: string[] = [];

  // First verify all items have sufficient stock
  for (const item of items) {
    const check = await checkStockAvailability(item.productId, item.variantId, item.quantity);
    if (!check.available) {
      failedItems.push(item.productId);
    }
  }

  if (failedItems.length > 0) {
    return { success: false, failedItems };
  }

  // Deduct / reserve in database or in-memory
  for (const item of items) {
    try {
      let targetVariantId = item.variantId;
      if (!targetVariantId) {
        const firstVariant = await (prisma as any).productVariant.findFirst({
          where: { product_id: item.productId },
        });
        if (firstVariant) targetVariantId = firstVariant.id;
      }

      if (targetVariantId) {
        const inv = await (prisma as any).inventory.findFirst({
          where: { variant_id: targetVariantId },
        });
        if (inv) {
          await (prisma as any).inventory.update({
            where: { id: inv.id },
            data: {
              available_quantity: { decrement: item.quantity },
              reserved_quantity: { increment: item.quantity },
            },
          });
          continue;
        }
      }
      throw new Error("No inventory found to decrement");
    } catch (err) {
      const key = item.variantId || item.productId;
      MOCK_STOCK_RESERVATIONS[key] = (MOCK_STOCK_RESERVATIONS[key] || 0) + item.quantity;
    }
  }

  return { success: true, failedItems: [] };
}

/**
 * Restore stock upon order cancellation or failed payment timeout
 */
export async function restoreStockForOrder(
  items: Array<{ productId: string; variantId?: string | null; quantity: number }>
): Promise<void> {
  for (const item of items) {
    try {
      let targetVariantId = item.variantId;
      if (!targetVariantId) {
        const firstVariant = await (prisma as any).productVariant.findFirst({
          where: { product_id: item.productId },
        });
        if (firstVariant) targetVariantId = firstVariant.id;
      }

      if (targetVariantId) {
        const inv = await (prisma as any).inventory.findFirst({
          where: { variant_id: targetVariantId },
        });
        if (inv) {
          await (prisma as any).inventory.update({
            where: { id: inv.id },
            data: {
              available_quantity: { increment: item.quantity },
              reserved_quantity: { decrement: item.quantity },
            },
          });
          continue;
        }
      }
      throw new Error("No inventory found to increment");
    } catch (err) {
      const key = item.variantId || item.productId;
      if (MOCK_STOCK_RESERVATIONS[key]) {
        MOCK_STOCK_RESERVATIONS[key] = Math.max(0, MOCK_STOCK_RESERVATIONS[key] - item.quantity);
      }
    }
  }
}
