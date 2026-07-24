import { prisma } from "@hopsy/database";
import { MOCK_BRANDS, type MockBrand } from "./mock-data";

export async function getBrands(): Promise<MockBrand[]> {
  try {
    const dbBrands = await prisma.brand.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: { where: { status: "PUBLISHED", deleted_at: null } } },
        },
      },
    });

    if (dbBrands.length > 0) {
      return dbBrands.map((b: any) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        description: b.description || "",
        logo_url: b.logo_url || "",
        productCount: b._count.products,
      }));
    }
  } catch {
    // Fallback during local offline dev or prior to seeding
  }

  return MOCK_BRANDS;
}

export async function getBrandBySlug(slug: string): Promise<MockBrand | null> {
  const brands = await getBrands();
  return brands.find((b) => b.slug === slug) || null;
}
