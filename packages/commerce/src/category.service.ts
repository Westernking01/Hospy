import { prisma } from "@hopsy/database";

export async function getCategories() {
  const dbCategories = await prisma.category.findMany({
    where: { is_active: true },
    orderBy: { display_order: "asc" },
    include: {
      _count: {
        select: { products: { where: { status: "PUBLISHED", deleted_at: null } } },
      },
    },
  });

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

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}
