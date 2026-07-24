import React from 'react';

export function ProductJsonLd({
  productName,
  description,
  brand,
  sku,
  gtin,
  image,
  offers,
  reviews,
}: {
  productName: string;
  description: string;
  brand: string;
  sku?: string;
  gtin?: string;
  image: string[];
  offers: {
    price: number;
    priceCurrency: string;
    availability: string; // e.g. "https://schema.org/InStock"
    url: string;
  };
  reviews?: {
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: { ratingValue: number; bestRating?: number };
  }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: productName,
    image,
    description,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    sku,
    gtin,
    offers: {
      '@type': 'Offer',
      url: offers.url,
      priceCurrency: offers.priceCurrency,
      price: offers.price,
      availability: offers.availability,
    },
    review: reviews?.map(r => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.reviewRating.ratingValue,
        bestRating: r.reviewRating.bestRating || 5,
      },
      author: {
        '@type': 'Person',
        name: r.author,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  sameAs,
}: {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
