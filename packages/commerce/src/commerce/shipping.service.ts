import { prisma } from "@hopsy/database";
import type { ShippingCalculationInput } from "@hopsy/validation";

import type { ShippingOption } from "../types";

export async function getShippingOptions(
  input: ShippingCalculationInput
): Promise<ShippingOption[]> {
  const state = input.state.trim().toLowerCase();
  const cartTotal = input.cartTotal;

  // 1. Query database shipping methods if available
  let dbMethods: any[] = [];
  try {
    dbMethods = await prisma.shippingMethod.findMany({
      where: { is_active: true },
    });
  } catch (err) {
    console.warn("Database shipping lookup skipped or offline:", err);
  }

  // 2. Define our authoritative Nigerian regional zones and free shipping thresholds
  const isEkiti = state.includes("ekiti") || state.includes("ado");
  const isSouthwest =
    state.includes("lagos") ||
    state.includes("oyo") ||
    state.includes("ogun") ||
    state.includes("ondo") ||
    state.includes("osun") ||
    state.includes("ibadan");
  const isAbujaOrSouth =
    state.includes("abuja") ||
    state.includes("fct") ||
    state.includes("rivers") ||
    state.includes("port harcourt") ||
    state.includes("delta") ||
    state.includes("anambra") ||
    state.includes("enugu");

  const options: ShippingOption[] = [];

  // Option 1: Store Pickup at HOPSY PLAZA Ado-Ekiti (Always available and always FREE)
  options.push({
    id: "pickup-ado-ekiti",
    name: "Store Pickup at HOPSY PLAZA Warehouse",
    description: "Pickup from our flagship center at 75 Ureje, Beside Immigration Office, Poly Road, Ado-Ekiti.",
    estimatedDays: 1,
    basePrice: 0,
    finalFee: 0,
    isFree: true,
    isPickup: true,
    zone: "Ekiti State",
  });

  // Option 2: Regional Standard / Express Delivery based on state
  if (isEkiti) {
    const isFree = cartTotal >= 500000;
    const baseFee = 5000;
    options.push({
      id: "ekiti-local-express",
      name: "Ekiti Local Express Delivery",
      description: "Direct courier dispatch within Ado-Ekiti and surrounding towns in Ekiti State.",
      estimatedDays: 1,
      basePrice: baseFee,
      finalFee: isFree ? 0 : baseFee,
      isFree,
      isPickup: false,
      zone: "Ekiti State",
    });
  } else if (isSouthwest) {
    const isFree = cartTotal >= 1500000;
    const baseFee = 15000;
    options.push({
      id: "southwest-regional-courier",
      name: "Southwest Regional Courier (GIG / Kwik / DHL)",
      description: "Insured hardware shipping to Lagos, Ibadan, Ogun, Ondo, and Osun states.",
      estimatedDays: 2,
      basePrice: baseFee,
      finalFee: isFree ? 0 : baseFee,
      isFree,
      isPickup: false,
      zone: "Southwest Nigeria",
    });
  } else if (isAbujaOrSouth) {
    const isFree = cartTotal >= 2500000;
    const baseFee = 25000;
    options.push({
      id: "interstate-priority-air",
      name: "Interstate Priority Air Courier",
      description: "Fast-track air cargo delivery to Abuja FCT, Port Harcourt, Enugu, and South-East/South-South.",
      estimatedDays: 3,
      basePrice: baseFee,
      finalFee: isFree ? 0 : baseFee,
      isFree,
      isPickup: false,
      zone: "Interstate Priority",
    });
  } else {
    // Other Northern/National states or International
    const baseFee = 35000;
    options.push({
      id: "national-insured-freight",
      name: "National Insured Logistics & Freight",
      description: "Armored logistics dispatch across Northern states and nationwide delivery zones.",
      estimatedDays: 5,
      basePrice: baseFee,
      finalFee: baseFee,
      isFree: false,
      isPickup: false,
      zone: "National Logistics",
    });
  }

  // Option 3: Dedicated White-Glove VIP Installation & Delivery (Optional Upgrade)
  options.push({
    id: "vip-white-glove-installation",
    name: "VIP White-Glove Delivery & On-Site Setup",
    description: "Senior HOPSY PLAZA engineering team transports, unpacks, installs, and tests hardware on your premises.",
    estimatedDays: 2,
    basePrice: 85000,
    finalFee: 85000,
    isFree: false,
    isPickup: false,
    zone: "Nationwide VIP",
  });

  return options;
}

export async function validateShippingSelection(
  shippingMethodId: string,
  state: string,
  cartTotal: number
): Promise<ShippingOption> {
  const options = await getShippingOptions({
    state,
    cartTotal,
    isPickup: false,
  });

  const selected = options.find((o) => o.id === shippingMethodId);
  if (!selected) {
    // If not exact ID match or fallback, return the default regional delivery
    return options.find((o) => !o.isPickup) || options[0];
  }
  return selected;
}
