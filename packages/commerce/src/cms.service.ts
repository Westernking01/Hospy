import { prisma } from "@hopsy/database";
import { MOCK_BANNERS, MOCK_TESTIMONIALS, MOCK_FAQS } from "./mock-data";

export async function getBanners() {
  try {
    const dbBanners = await prisma.homepageBanner.findMany({
      where: { is_active: true },
      orderBy: { display_order: "asc" },
    });

    if (dbBanners.length > 0) {
      return dbBanners.map((b: any) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle || "",
        tagline: "FEATURED PROMOTION",
        cta_text: b.button_text || "Explore Now",
        cta_link: b.button_link || "/categories",
        image_url: b.image_url,
        badge: "OFFICIAL STORE",
      }));
    }
  } catch {
    // Fallback to mock banners
  }

  return MOCK_BANNERS;
}

export async function getTestimonials() {
  return MOCK_TESTIMONIALS;
}

export async function getFaqs() {
  return MOCK_FAQS;
}
