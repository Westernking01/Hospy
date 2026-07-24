import { MetadataRoute } from 'next';
import { MOCK_PRODUCTS } from '@hopsy/commerce/src/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hopsyplaza.com';

  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Product routes
  const productRoutes = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Category routes (deduplicated)
  const categorySlugs = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category.slug)));
  const dynamicCategoryRoutes = categorySlugs.map((slug) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...productRoutes, ...dynamicCategoryRoutes];
}
