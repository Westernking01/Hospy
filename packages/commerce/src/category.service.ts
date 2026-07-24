import { prisma } from "@hopsy/database";
import { MOCK_CATEGORIES, type MockCategory } from "./mock-data";

export async function getCategories(): Promise<MockCategory[]> {
  try {
    const dbCategories = await prisma.category.findMany({
      where: { is_active: true },
      orderBy: { display_order: "asc" },
      include: {
        _count: {
          select: { products: { where: { status: "PUBLISHED", deleted_at: null } } },
        },
      },
    });

    if (dbCategories.length > 0) {
      return dbCategories.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || "",
        image_url: c.image_url || "",
        icon: c.icon || "Laptop",
        itemCount: c._count.products,
      }));
    }
  } catch {
    // Fallback during local offline dev or prior to seeding
  }

  return MOCK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<MockCategory | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}
