import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import { SHOP_PRODUCTS, ShopProduct } from '@/data/shopProducts'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'awvodzr6'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-09'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Alias export for convenience
export const client = sanityClient

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
})

export function urlFor(source: any) {
  return imageBuilder.image(source).auto('format').quality(95)
}

const PRODUCT_GROQ_FIELDS = `
  "slug": slug.current,
  name,
  nameBn,
  "category": coalesce(category, "Signature Panjabi"),
  "categorySlug": coalesce(categorySlug, "signature-panjabi"),
  "tags": coalesce(tags, ["all", "signature-panjabi", "mens"]),
  price,
  originalPrice,
  "frontImage": frontImage.asset->url,
  "backImage": coalesce(backImage.asset->url, frontImage.asset->url),
  "gallery": coalesce(gallery[].asset->url, []),
  description,
  fabricDetails,
  "sizes": coalesce(sizes, [40, 42, 44, 46]),
  "inStock": coalesce(inStock, true)
`

export async function getShopProducts(): Promise<ShopProduct[]> {
  try {
    const sanityProducts = await sanityClient.fetch<ShopProduct[]>(
      `*[_type == "product" && (!defined(inStock) || inStock == true)] | order(_createdAt desc) {
        ${PRODUCT_GROQ_FIELDS}
      }`,
      {},
      { next: { revalidate: 60 } }
    )

    if (sanityProducts && sanityProducts.length > 0) {
      return sanityProducts
    }
  } catch (error) {
    console.warn("Could not fetch products from Sanity CMS, using static fallback:", error)
  }

  // Gracefully fallback to static products if Sanity returns empty or encounters network error
  return SHOP_PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<ShopProduct | null> {
  try {
    const product = await sanityClient.fetch<ShopProduct | null>(
      `*[_type == "product" && slug.current == $slug][0] {
        ${PRODUCT_GROQ_FIELDS}
      }`,
      { slug },
      { next: { revalidate: 60 } }
    )

    if (product) {
      return product
    }
  } catch (error) {
    console.warn(`Could not fetch product for slug "${slug}" from Sanity CMS:`, error)
  }

  // Fallback to static product
  const fallbackProduct = SHOP_PRODUCTS.find((p) => p.slug === slug)
  return fallbackProduct || null
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(
      `*[_type == "product" && defined(slug.current)].slug.current`,
      {},
      { next: { revalidate: 60 } }
    )

    if (slugs && slugs.length > 0) {
      const staticSlugs = SHOP_PRODUCTS.map((p) => p.slug)
      return Array.from(new Set([...slugs, ...staticSlugs]))
    }
  } catch (error) {
    console.warn("Could not fetch product slugs from Sanity CMS:", error)
  }

  return SHOP_PRODUCTS.map((p) => p.slug)
}

