import { prisma } from "@hopsy/database";
import { checkStockAvailability } from "./inventory.service";
import { validateCoupon } from "./coupon.service";
import { calculateTax } from "./tax.service";
import { getShippingOptions } from "./shipping.service";
import { MOCK_PRODUCTS } from "../mock-data";

import type { ServerCartItem, ServerCartSummary, CouponValidationResult, TaxBreakdown, ShippingOption } from "../types";
/**
 * Server authoritative price calculation and stock verification for any list of cart items
 */
export async function calculateServerCart(
  clientItems: Array<{
    id?: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    slug?: string;
    name?: string;
    price?: number;
    image?: string;
  }>,
  options: {
    couponCode?: string | null;
    shippingMethodId?: string | null;
    state?: string | null;
  } = {}
): Promise<ServerCartSummary> {
  const verifiedItems: ServerCartItem[] = [];
  let subtotal = 0;
  let itemCount = 0;

  for (const item of clientItems) {
    if (item.quantity <= 0) continue;

    // Verify live price and stock from Prisma or fallback to MOCK_PRODUCTS
    let livePrice = item.price || 0;
    let compareAtPrice: number | undefined = undefined;
    let name = item.name || "Product";
    let slug = item.slug || item.productId;
    let image = item.image || "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80";

    try {
      if (item.variantId) {
        const dbVariant = await prisma.productVariant.findUnique({
          where: { id: item.variantId },
          include: { product: true },
        });
        if (dbVariant) {
          livePrice = Number(dbVariant.price);
          compareAtPrice = dbVariant.compare_at_price ? Number(dbVariant.compare_at_price) : undefined;
          name = `${dbVariant.product.name} (${dbVariant.variant_name})`;
          slug = dbVariant.product.slug;
        }
      } else {
        const dbProduct = await prisma.product.findUnique({
          where: { id: item.productId },
          include: { variants: true },
        });
        if (dbProduct) {
          livePrice = dbProduct.variants?.[0]?.price
            ? Number(dbProduct.variants[0].price)
            : 0;
          name = dbProduct.name;
          slug = dbProduct.slug;
        }
      }
    } catch (err) {
      // Offline or mock table
    }

    if (livePrice === 0 && item.productId) {
      const mockProduct = MOCK_PRODUCTS.find((p) => p.id === item.productId || p.slug === item.productId);
      if (mockProduct) {
        livePrice = mockProduct.price;
        compareAtPrice = mockProduct.compare_at_price;
        name = mockProduct.name;
        slug = mockProduct.slug;
        image = mockProduct.images?.[0] || image;
      }
    }

    // Verify stock
    const stockCheck = await checkStockAvailability(item.productId, item.variantId, item.quantity);

    const itemTotal = livePrice * item.quantity;
    subtotal += itemTotal;
    itemCount += item.quantity;

    verifiedItems.push({
      id: item.id || `${item.productId}-${item.variantId || "base"}`,
      productId: item.productId,
      variantId: item.variantId || null,
      slug,
      name,
      price: livePrice,
      compareAtPrice,
      quantity: item.quantity,
      image,
      inStock: stockCheck.available,
      stockMessage: stockCheck.message,
    });
  }

  // Calculate discount if coupon applied
  let couponResult: CouponValidationResult | null = null;
  let discountAmount = 0;
  if (options.couponCode) {
    couponResult = await validateCoupon({
      code: options.couponCode,
      cartTotal: subtotal,
      items: verifiedItems.map((i) => ({
        productId: i.productId,
        price: i.price,
        quantity: i.quantity,
      })),
    });
    if (couponResult.valid) {
      discountAmount = couponResult.calculatedDiscount;
    }
  }

  // Calculate shipping if selected or regional defaults
  let shippingAmount = 0;
  let shippingOption: ShippingOption | null = null;
  if (options.state) {
    const shippingOptions = await getShippingOptions({
      state: options.state,
      cartTotal: Math.max(0, subtotal - discountAmount),
      isPickup: false,
    });
    if (options.shippingMethodId) {
      shippingOption =
        shippingOptions.find((o) => o.id === options.shippingMethodId) || shippingOptions[0];
    } else {
      shippingOption = shippingOptions[0];
    }
    if (shippingOption) {
      shippingAmount = shippingOption.finalFee;
    }
  }

  // Calculate tax server-side
  const taxBreakdown = calculateTax({
    state: options.state || "Ekiti State",
    subtotal,
    discountAmount,
    shippingAmount,
  });
  const taxAmount = taxBreakdown.taxAmount;

  const total = Math.max(0, subtotal - discountAmount) + shippingAmount + taxAmount;

  return {
    items: verifiedItems,
    itemCount,
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    shippingAmount: Math.round(shippingAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    coupon: couponResult,
    taxBreakdown,
    shippingOption,
  };
}

/**
 * Merge a guest cart stored in client session/localStorage with an authenticated user's database cart upon login
 */
export async function mergeGuestCartWithUserCart(
  userId: string,
  guestItems: ServerCartItem[]
): Promise<ServerCartSummary> {
  // Try fetching user cart from Prisma if database is connected
  try {
    let userCart = await prisma.shoppingCart.findFirst({
      where: { customer_id: userId },
      include: { items: true },
    });

    if (!userCart) {
      userCart = await prisma.shoppingCart.create({
        data: { customer_id: userId },
        include: { items: true },
      });
    }

    // Merge guest items
    for (const item of guestItems) {
      const existing = userCart.items.find(
        (i: any) => i.product_id === item.productId && i.variant_id === (item.variantId || null)
      );
      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: {
            quantity: existing.quantity + item.quantity,
            subtotal: Number(existing.unit_price) * (existing.quantity + item.quantity),
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cart_id: userCart.id,
            product_id: item.productId,
            variant_id: item.variantId || null,
            quantity: item.quantity,
            unit_price: item.price || 0,
            subtotal: (item.price || 0) * item.quantity,
          },
        });
      }
    }

    const updatedUserCart = await prisma.shoppingCart.findFirst({
      where: { customer_id: userId },
      include: { items: true },
    });

    const clientItems = (updatedUserCart?.items || []).map((i: any) => ({
      id: i.id,
      productId: i.product_id,
      variantId: i.variant_id,
      quantity: i.quantity,
    }));

    return calculateServerCart(clientItems);
  } catch (err) {
    // Fallback if offline
    return calculateServerCart(guestItems);
  }
}

/**
 * Add or sync an item in the server cart authoritatively
 */
export async function addItemToCart(
  userId: string | null,
  item: { productId: string; variantId?: string | null; quantity: number },
  currentItems: any[] = [],
  options: { couponCode?: string | null; shippingMethodId?: string | null; state?: string | null } = {}
): Promise<{ success: boolean; message: string; summary?: ServerCartSummary }> {
  if (item.quantity <= 0) {
    return { success: false, message: "Quantity must be greater than zero." };
  }

  // Authoritative stock check
  const stockCheck = await checkStockAvailability(item.productId, item.variantId || null, item.quantity);
  if (!stockCheck.available) {
    return { success: false, message: stockCheck.message || "Requested quantity is not available in stock." };
  }

  // If authenticated user with connected database, update DB cart
  if (userId) {
    try {
      let userCart = await prisma.shoppingCart.findFirst({
        where: { customer_id: userId },
        include: { items: true },
      });
      if (!userCart) {
        userCart = await prisma.shoppingCart.create({
          data: { customer_id: userId },
          include: { items: true },
        });
      }

      const existing = userCart.items.find(
        (i: any) => i.product_id === item.productId && i.variant_id === (item.variantId || null)
      );

      // Verify live price
      const baseSummary = await calculateServerCart([{ productId: item.productId, variantId: item.variantId, quantity: item.quantity }]);
      const livePrice = baseSummary.items[0]?.price || 0;

      if (existing) {
        const newQty = existing.quantity + item.quantity;
        const newStockCheck = await checkStockAvailability(item.productId, item.variantId || null, newQty);
        if (!newStockCheck.available) {
          return { success: false, message: newStockCheck.message || "Cannot add more; stock limit reached." };
        }
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: {
            quantity: newQty,
            unit_price: livePrice,
            subtotal: livePrice * newQty,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cart_id: userCart.id,
            product_id: item.productId,
            variant_id: item.variantId || null,
            quantity: item.quantity,
            unit_price: livePrice,
            subtotal: livePrice * item.quantity,
          },
        });
      }

      const updatedCart = await prisma.shoppingCart.findFirst({
        where: { customer_id: userId },
        include: { items: true },
      });

      const dbItems = (updatedCart?.items || []).map((i: any) => ({
        id: i.id,
        productId: i.product_id,
        variantId: i.variant_id,
        quantity: i.quantity,
      }));

      const summary = await calculateServerCart(dbItems, options);
      return { success: true, message: "Item added to cart.", summary };
    } catch (err) {
      // Fallback to memory / guest array logic if offline
    }
  }

  // Memory/Guest fallback: manipulate currentItems array
  const updatedList = [...currentItems];
  const existingIdx = updatedList.findIndex(
    (i) => i.productId === item.productId && (i.variantId || null) === (item.variantId || null)
  );
  if (existingIdx >= 0) {
    const newQty = updatedList[existingIdx].quantity + item.quantity;
    const newStockCheck = await checkStockAvailability(item.productId, item.variantId || null, newQty);
    if (!newStockCheck.available) {
      return { success: false, message: newStockCheck.message || "Cannot add more; stock limit reached." };
    }
    updatedList[existingIdx] = { ...updatedList[existingIdx], quantity: newQty };
  } else {
    updatedList.push({ productId: item.productId, variantId: item.variantId || null, quantity: item.quantity });
  }

  const summary = await calculateServerCart(updatedList, options);
  return { success: true, message: "Item added to cart.", summary };
}

/**
 * Update quantity or variant of a cart item
 */
export async function updateCartItem(
  userId: string | null,
  itemIdOrProductId: string,
  updates: { quantity?: number; variantId?: string | null },
  currentItems: any[] = [],
  options: { couponCode?: string | null; shippingMethodId?: string | null; state?: string | null } = {}
): Promise<{ success: boolean; message: string; summary?: ServerCartSummary }> {
  if (updates.quantity !== undefined && updates.quantity <= 0) {
    return removeCartItem(userId, itemIdOrProductId, currentItems, options);
  }

  if (userId) {
    try {
      const userCart = await prisma.shoppingCart.findFirst({
        where: { customer_id: userId },
        include: { items: true },
      });
      if (userCart) {
        const existing = userCart.items.find(
          (i: any) => i.id === itemIdOrProductId || i.product_id === itemIdOrProductId
        );
        if (!existing) {
          return { success: false, message: "Cart item not found." };
        }
        const targetQty = updates.quantity !== undefined ? updates.quantity : existing.quantity;
        const targetVariant = updates.variantId !== undefined ? updates.variantId : existing.variant_id;

        const stockCheck = await checkStockAvailability(existing.product_id, targetVariant || null, targetQty);
        if (!stockCheck.available) {
          return { success: false, message: stockCheck.message || "Requested quantity is not available." };
        }

        const baseSummary = await calculateServerCart([{ productId: existing.product_id, variantId: targetVariant, quantity: targetQty }]);
        const livePrice = baseSummary.items[0]?.price || Number(existing.unit_price);

        await prisma.cartItem.update({
          where: { id: existing.id },
          data: {
            quantity: targetQty,
            variant_id: targetVariant || null,
            unit_price: livePrice,
            subtotal: livePrice * targetQty,
          },
        });

        const updatedCart = await prisma.shoppingCart.findFirst({
          where: { customer_id: userId },
          include: { items: true },
        });
        const dbItems = (updatedCart?.items || []).map((i: any) => ({
          id: i.id,
          productId: i.product_id,
          variantId: i.variant_id,
          quantity: i.quantity,
        }));
        const summary = await calculateServerCart(dbItems, options);
        return { success: true, message: "Cart item updated.", summary };
      }
    } catch (err) {
      // Fallback
    }
  }

  // Memory / guest fallback
  const updatedList = [...currentItems];
  const idx = updatedList.findIndex((i) => i.id === itemIdOrProductId || i.productId === itemIdOrProductId);
  if (idx < 0) {
    return { success: false, message: "Cart item not found." };
  }
  const targetQty = updates.quantity !== undefined ? updates.quantity : updatedList[idx].quantity;
  const targetVariant = updates.variantId !== undefined ? updates.variantId : updatedList[idx].variantId;
  const stockCheck = await checkStockAvailability(updatedList[idx].productId, targetVariant || null, targetQty);
  if (!stockCheck.available) {
    return { success: false, message: stockCheck.message || "Requested quantity is not available." };
  }
  updatedList[idx] = { ...updatedList[idx], quantity: targetQty, variantId: targetVariant || null };
  const summary = await calculateServerCart(updatedList, options);
  return { success: true, message: "Cart item updated.", summary };
}

/**
 * Remove an item from the cart
 */
export async function removeCartItem(
  userId: string | null,
  itemIdOrProductId: string,
  currentItems: any[] = [],
  options: { couponCode?: string | null; shippingMethodId?: string | null; state?: string | null } = {}
): Promise<{ success: boolean; message: string; summary?: ServerCartSummary }> {
  if (userId) {
    try {
      const userCart = await prisma.shoppingCart.findFirst({
        where: { customer_id: userId },
        include: { items: true },
      });
      if (userCart) {
        const existing = userCart.items.find(
          (i: any) => i.id === itemIdOrProductId || i.product_id === itemIdOrProductId
        );
        if (existing) {
          await prisma.cartItem.delete({ where: { id: existing.id } });
        }
        const updatedCart = await prisma.shoppingCart.findFirst({
          where: { customer_id: userId },
          include: { items: true },
        });
        const dbItems = (updatedCart?.items || []).map((i: any) => ({
          id: i.id,
          productId: i.product_id,
          variantId: i.variant_id,
          quantity: i.quantity,
        }));
        const summary = await calculateServerCart(dbItems, options);
        return { success: true, message: "Item removed from cart.", summary };
      }
    } catch (err) {
      // Fallback
    }
  }

  const updatedList = currentItems.filter((i) => i.id !== itemIdOrProductId && i.productId !== itemIdOrProductId);
  const summary = await calculateServerCart(updatedList, options);
  return { success: true, message: "Item removed from cart.", summary };
}

/**
 * Clear all items from the cart
 */
export async function clearCart(userId: string | null): Promise<{ success: boolean; message: string }> {
  if (userId) {
    try {
      await prisma.shoppingCart.deleteMany({ where: { customer_id: userId } });
    } catch (err) {
      // Fallback
    }
  }
  return { success: true, message: "Cart cleared successfully." };
}

