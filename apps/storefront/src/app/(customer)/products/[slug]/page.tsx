import { useStorefrontData } from "@/components/customer/storefront-context";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailsClient } from "./product-details-client";
import { ProductJsonLd, BreadcrumbJsonLd } from "@hopsy/ui";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Hopsy Plaza",
      description: "The product you are looking for does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.name} | Hopsy Plaza`;
  const description = product.short_description || product.description;
  const url = `https://hopsyplaza.com/products/${product.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Hopsy Plaza",
      images: [
        {
          url: product.images[0] || "",
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0] || ""],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://hopsyplaza.com/" },
          { name: "Products", url: "https://hopsyplaza.com/products" },
          { name: product.name, url: `https://hopsyplaza.com/products/${product.slug}` },
        ]}
      />
      <ProductJsonLd
        productName={product.name}
        description={product.short_description || product.description}
        brand={product.brand.name}
        sku={product.sku}
        image={product.images}
        offers={{
          price: product.price,
          priceCurrency: "NGN",
          availability: product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `https://hopsyplaza.com/products/${product.slug}`,
        }}
        reviews={product.reviews.map((r) => ({
          author: r.user_name,
          datePublished: r.created_at,
          reviewBody: r.comment,
          reviewRating: { ratingValue: r.rating },
        }))}
      />
      <ProductDetailsClient />
    </>
  );
}
