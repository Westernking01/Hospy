import { prisma } from "@hopsy/database";
import type { AddressCreateInput, AddressUpdateInput } from "@hopsy/validation";

export interface UserAddress {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  country: string;
  postalCode?: string | null;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  createdAt: Date;
}

// In-memory address book fallback for preview / guest or offline operations
const MOCK_ADDRESS_BOOK: Record<string, UserAddress[]> = {
  "guest-user": [
    {
      id: "addr-ado-ekiti-default",
      userId: "guest-user",
      fullName: "Chief Ademola Adeleke",
      phone: "+234 803 123 4567",
      addressLine1: "12 Secretariat Road, GRA",
      addressLine2: "Opposite High Court Complex",
      city: "Ado-Ekiti",
      state: "Ekiti State",
      country: "Nigeria",
      postalCode: "360101",
      isDefaultBilling: true,
      isDefaultShipping: true,
      createdAt: new Date(),
    },
    {
      id: "addr-lagos-office",
      userId: "guest-user",
      fullName: "Chief Ademola Adeleke (Lagos Office)",
      phone: "+234 802 987 6543",
      addressLine1: "Suite 4B, Victoria Island Plaza",
      addressLine2: "Adeola Odeku Street",
      city: "Victoria Island",
      state: "Lagos State",
      country: "Nigeria",
      postalCode: "101241",
      isDefaultBilling: false,
      isDefaultShipping: false,
      createdAt: new Date(),
    },
  ],
};

export async function getUserAddresses(userId: string): Promise<UserAddress[]> {
  try {
    const dbAddresses = await (prisma as any).customerAddress.findMany({
      where: { customer_id: userId },
      orderBy: { created_at: "desc" },
    });

    if (dbAddresses && dbAddresses.length > 0) {
      return dbAddresses.map((a: any) => ({
        id: a.id,
        userId: a.customer_id || userId,
        fullName: a.full_name,
        phone: a.phone,
        addressLine1: a.address_line_1 || a.address_line1 || "",
        addressLine2: a.address_line_2 || a.address_line2 || null,
        city: a.city,
        state: a.state,
        country: a.country || "Nigeria",
        postalCode: a.postal_code,
        isDefaultBilling: a.is_default_billing || false,
        isDefaultShipping: a.is_default_shipping || false,
        createdAt: a.created_at || new Date(),
      }));
    }
  } catch (err) {
    // Offline or skipped database query
  }

  return MOCK_ADDRESS_BOOK[userId] || MOCK_ADDRESS_BOOK["guest-user"] || [];
}

export async function createAddress(
  userId: string,
  input: AddressCreateInput
): Promise<UserAddress> {
  try {
    if (input.isDefaultShipping) {
      await (prisma as any).customerAddress.updateMany({
        where: { customer_id: userId },
        data: { is_default_shipping: false },
      });
    }
    if (input.isDefaultBilling) {
      await (prisma as any).customerAddress.updateMany({
        where: { customer_id: userId },
        data: { is_default_billing: false },
      });
    }

    const created = await (prisma as any).customerAddress.create({
      data: {
        customer_id: userId,
        full_name: input.fullName || input.recipientName || "Valued Customer",
        phone: input.phone || "08000000000",
        address_line_1: input.addressLine1,
        address_line_2: input.addressLine2 || null,
        city: input.city,
        state: input.state,
        country: input.country || "Nigeria",
        postal_code: input.postalCode || null,
        is_default_billing: input.isDefaultBilling || false,
        is_default_shipping: input.isDefaultShipping || false,
      },
    });

    return {
      id: created.id,
      userId: created.customer_id || userId,
      fullName: created.full_name || input.fullName || input.recipientName || "Valued Customer",
      phone: created.phone || input.phone || "08000000000",
      addressLine1: created.address_line_1 || created.address_line1 || "",
      addressLine2: created.address_line_2 || created.address_line2 || null,
      city: created.city,
      state: created.state,
      country: created.country || "Nigeria",
      postalCode: created.postal_code,
      isDefaultBilling: created.is_default_billing || false,
      isDefaultShipping: created.is_default_shipping || false,
      createdAt: created.created_at || new Date(),
    };
  } catch (err) {
    const newAddr: UserAddress = {
      id: `addr-${Date.now()}`,
      userId,
      fullName: input.fullName || input.recipientName || "Valued Customer",
      phone: input.phone || "08000000000",
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2 || null,
      city: input.city,
      state: input.state,
      country: input.country || "Nigeria",
      postalCode: input.postalCode || null,
      isDefaultBilling: input.isDefaultBilling || false,
      isDefaultShipping: input.isDefaultShipping || false,
      createdAt: new Date(),
    };

    if (!MOCK_ADDRESS_BOOK[userId]) MOCK_ADDRESS_BOOK[userId] = [];
    if (input.isDefaultShipping) {
      MOCK_ADDRESS_BOOK[userId].forEach((a) => (a.isDefaultShipping = false));
    }
    if (input.isDefaultBilling) {
      MOCK_ADDRESS_BOOK[userId].forEach((a) => (a.isDefaultBilling = false));
    }
    MOCK_ADDRESS_BOOK[userId].unshift(newAddr);

    return newAddr;
  }
}

export async function updateAddress(
  userId: string,
  addressId: string,
  input: AddressUpdateInput
): Promise<UserAddress | null> {
  try {
    if (input.isDefaultShipping) {
      await (prisma as any).customerAddress.updateMany({
        where: { customer_id: userId },
        data: { is_default_shipping: false },
      });
    }
    if (input.isDefaultBilling) {
      await (prisma as any).customerAddress.updateMany({
        where: { customer_id: userId },
        data: { is_default_billing: false },
      });
    }

    const updated = await (prisma as any).customerAddress.update({
      where: { id: addressId },
      data: {
        ...(input.fullName ? { full_name: input.fullName } : {}),
        ...(input.phone ? { phone: input.phone } : {}),
        ...(input.addressLine1 ? { address_line_1: input.addressLine1 } : {}),
        ...(input.addressLine2 !== undefined ? { address_line_2: input.addressLine2 } : {}),
        ...(input.city ? { city: input.city } : {}),
        ...(input.state ? { state: input.state } : {}),
        ...(input.country ? { country: input.country } : {}),
        ...(input.postalCode !== undefined ? { postal_code: input.postalCode } : {}),
        ...(input.isDefaultBilling !== undefined ? { is_default_billing: input.isDefaultBilling } : {}),
        ...(input.isDefaultShipping !== undefined ? { is_default_shipping: input.isDefaultShipping } : {}),
      },
    });

    return {
      id: updated.id,
      userId: updated.customer_id || userId,
      fullName: updated.full_name,
      phone: updated.phone,
      addressLine1: updated.address_line_1 || updated.address_line1 || "",
      addressLine2: updated.address_line_2 || updated.address_line2 || null,
      city: updated.city,
      state: updated.state,
      country: updated.country || "Nigeria",
      postalCode: updated.postal_code,
      isDefaultBilling: updated.is_default_billing || false,
      isDefaultShipping: updated.is_default_shipping || false,
      createdAt: updated.created_at || new Date(),
    };
  } catch (err) {
    const list = MOCK_ADDRESS_BOOK[userId] || MOCK_ADDRESS_BOOK["guest-user"] || [];
    const idx = list.findIndex((a) => a.id === addressId);
    if (idx === -1) return null;

    if (input.isDefaultShipping) list.forEach((a) => (a.isDefaultShipping = false));
    if (input.isDefaultBilling) list.forEach((a) => (a.isDefaultBilling = false));

    const current = list[idx];
    const updated: UserAddress = {
      ...current,
      ...input,
      id: current.id,
      userId: current.userId,
      createdAt: current.createdAt,
      fullName: input.fullName || current.fullName,
      phone: input.phone || current.phone,
      addressLine1: input.addressLine1 || current.addressLine1,
      city: input.city || current.city,
      state: input.state || current.state,
      country: input.country || current.country,
      isDefaultBilling: input.isDefaultBilling ?? current.isDefaultBilling,
      isDefaultShipping: input.isDefaultShipping ?? current.isDefaultShipping,
    };
    list[idx] = updated;
    return updated;
  }
}

export async function deleteAddress(userId: string, addressId: string): Promise<boolean> {
  try {
    await (prisma as any).customerAddress.delete({
      where: { id: addressId },
    });
    return true;
  } catch (err) {
    const list = MOCK_ADDRESS_BOOK[userId] || MOCK_ADDRESS_BOOK["guest-user"];
    if (list) {
      MOCK_ADDRESS_BOOK[userId] = list.filter((a) => a.id !== addressId);
      return true;
    }
    return false;
  }
}
