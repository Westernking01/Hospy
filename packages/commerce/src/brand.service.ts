import { prisma } from "@hopsy/database";

export async function getBrands() {
  const dbBrands = await prisma.brand.findMany({
    where: { is_active: true },
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { products: { where: { status: "PUBLISHED", deleted_at: null } } },
      },
    },
  });

  return dbBrands.map((b: any) => ({
    id: b.id,
    name: b.name,
    slug: b.slug,
    description: b.description || "",
    logo_url: b.logo_url || "",
    productCount: b._count.products,
  }));
}

export async function getBrandBySlug(slug: string) {
  const brands = await getBrands();
  return brands.find((b) => b.slug === slug) || null;
}
