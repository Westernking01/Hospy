import { prisma } from "@hopsy/database";
import { MOCK_BANNERS, MOCK_TESTIMONIALS, MOCK_FAQS } from "./mock-data";

export async function getBanners() {
  const dbBanners = await prisma.homepageBanner.findMany({
    where: { is_active: true },
    orderBy: { display_order: "asc" },
  });

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

export async function getTestimonials() {
  return MOCK_TESTIMONIALS;
}

export async function getFaqs() {
  return MOCK_FAQS;
}
