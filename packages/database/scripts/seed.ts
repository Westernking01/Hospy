import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import {
  MOCK_CATEGORIES,
  MOCK_BRANDS,
  MOCK_PRODUCTS,
} from "../../commerce/src/mock-data";
import crypto from "crypto";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function generateUuid(id: string) {
  const hash = crypto.createHash('md5').update(id).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

async function main() {
  console.log("Starting database seeding...");

  // 1. Seed Categories
  console.log(`Seeding ${MOCK_CATEGORIES.length} categories...`);
  for (const category of MOCK_CATEGORIES) {
    const categoryId = generateUuid(category.id);
    await prisma.category.upsert({
      where: { id: categoryId },
      update: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        image_url: category.image_url,
      },
      create: {
        id: categoryId,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image_url: category.image_url,
      },
    });
  }

  // 2. Seed Brands
  console.log(`Seeding ${MOCK_BRANDS.length} brands...`);
  for (const brand of MOCK_BRANDS) {
    const brandId = generateUuid(brand.id);
    await prisma.brand.upsert({
      where: { id: brandId },
      update: {
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo_url: brand.logo_url,
      },
      create: {
        id: brandId,
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo_url: brand.logo_url,
      },
    });
  }

  // 3. Create Default Warehouse for Inventory
  console.log(`Creating default warehouse...`);
  const warehouseId = generateUuid("default-warehouse");
  await prisma.warehouse.upsert({
    where: { id: warehouseId },
    update: {
      name: "Main Distribution Center",
      address: "123 Tech Avenue",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
    create: {
      id: warehouseId,
      name: "Main Distribution Center",
      address: "123 Tech Avenue",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    }
  });

  // 4. Seed Products
  console.log(`Seeding ${MOCK_PRODUCTS.length} products...`);
  for (const product of MOCK_PRODUCTS) {
    const productId = generateUuid(product.id);
    
    // Create or update Product
    await prisma.product.upsert({
      where: { id: productId },
      update: {
        name: product.name,
        slug: product.slug,
        sku_prefix: product.sku,
        description: product.description,
        short_description: product.short_description,
        status: product.status === "ACTIVE" ? "PUBLISHED" : "DRAFT",
        is_featured: product.is_featured,
        category_id: generateUuid(product.category.id),
        brand_id: generateUuid(product.brand.id),
      },
      create: {
        id: productId,
        name: product.name,
        slug: product.slug,
        sku_prefix: product.sku,
        description: product.description,
        short_description: product.short_description,
        status: product.status === "ACTIVE" ? "PUBLISHED" : "DRAFT",
        is_featured: product.is_featured,
        category_id: generateUuid(product.category.id),
        brand_id: generateUuid(product.brand.id),
      },
    });

    // Seed Product Images
    for (const [index, image_url] of product.images.entries()) {
      const imageId = generateUuid(`${product.id}-img-${index}`);
      await prisma.productImage.upsert({
        where: { id: imageId },
        update: {
          product_id: productId,
          image_url,
          display_order: index,
          is_featured: index === 0,
        },
        create: {
          id: imageId,
          product_id: productId,
          image_url,
          display_order: index,
          is_featured: index === 0,
        }
      });
    }

    // Seed Product Variants
    for (const [index, variant] of product.variants.entries()) {
      const variantId = generateUuid(variant.id);
      await prisma.productVariant.upsert({
        where: { id: variantId },
        update: {
          product_id: productId,
          variant_name: variant.name,
          sku: variant.sku,
          price: variant.price,
          compare_at_price: variant.compare_at_price || null,
          is_default: index === 0,
        },
        create: {
          id: variantId,
          product_id: productId,
          variant_name: variant.name,
          sku: variant.sku,
          price: variant.price,
          compare_at_price: variant.compare_at_price || null,
          is_default: index === 0,
        },
      });

      // Seed Inventory for Variant
      const inventoryId = generateUuid(`${variant.id}-inv`);
      // First check if inventory exists to avoid composite key conflicts on upsert if schema has unique constraints
      const existingInv = await prisma.inventory.findFirst({
        where: { variant_id: variantId, warehouse_id: warehouseId }
      });
      
      if (existingInv) {
        await prisma.inventory.update({
          where: { id: existingInv.id },
          data: { available_quantity: variant.stock_quantity }
        });
      } else {
        await prisma.inventory.create({
          data: {
            id: inventoryId,
            variant_id: variantId,
            warehouse_id: warehouseId,
            available_quantity: variant.stock_quantity,
          }
        });
      }
    }
    
    // Seed Specifications
    if (product.specifications) {
      for (const [index, spec] of product.specifications.entries()) {
        const specId = generateUuid(`${product.id}-spec-${index}`);
        await prisma.productSpecification.upsert({
           where: { id: specId },
           update: {
              product_id: productId,
              specification_name: spec.name,
              specification_value: spec.value,
              display_order: index,
           },
           create: {
              id: specId,
              product_id: productId,
              specification_name: spec.name,
              specification_value: spec.value,
              display_order: index,
           }
        });
      }
    }
  }

  console.log("Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("Seeding failed:");
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
