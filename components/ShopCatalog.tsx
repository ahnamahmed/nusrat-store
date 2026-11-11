// components/ShopCatalog.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { SHOP_CATEGORIES, SHOP_PRODUCTS, ShopProduct } from "@/data/shopProducts";

interface ShopCatalogProps {
    initialCategory?: string;
    products?: ShopProduct[];
}

export default function ShopCatalog({ initialCategory = "all", products }: ShopCatalogProps) {
    const params = useParams();
    const pathname = usePathname();

    const allProducts = products && products.length > 0 ? products : SHOP_PRODUCTS;

    // Read active category directly from params.category or URL pathname
    const routeCategory = (params?.category as string) || (pathname === "/shop/all" ? "all" : initialCategory) || "all";
    const activeCategory = routeCategory === "arabian-jubba" ? "thobe" : routeCategory;

    const isCategoryMatch = (product: ShopProduct, categorySlug: string) => {
        if (!categorySlug || categorySlug === "all") return true;

        if (categorySlug === "thobe" || categorySlug === "arabian-jubba") {
            return (
                product.tags?.includes("thobe") ||
                product.tags?.includes("arabian-jubba") ||
                product.categorySlug === "thobe" ||
                product.categorySlug === "arabian-jubba"
            );
        }

        return (
            product.tags?.includes(categorySlug) ||
            product.categorySlug === categorySlug
        );
    };

    const filteredProducts = allProducts.filter((product) =>
        isCategoryMatch(product, activeCategory)
    );

    return (
        <div className="w-full bg-white text-[#121212]">
            {/* Top Header & Category Filter Section */}
            <div className="mx-auto w-full max-w-[1200px] px-5 pt-16 min-[810px]:px-6 min-[1200px]:px-10">
                {/* Title + Bottom Divider */}
                <section className="flex flex-col gap-10 pb-8">
                    <h1 className="font-serif-sc text-[40px] font-medium uppercase leading-none tracking-normal text-[#121212] min-[810px]:text-[56px]">
                        Shop
                    </h1>
                    <div className="h-[1px] w-full bg-[#ededed]" />
                </section>

                {/* Category Filter Navigation Bar */}
                <nav
                    aria-label="Product categories"
                    className="flex flex-wrap items-center gap-2 pb-10 pt-2 min-[810px]:gap-3"
                >
                    {SHOP_CATEGORIES.map((category) => {
                        const isActive = activeCategory === category.slug;
                        const targetHref =
                            category.slug === "all" ? "/shop/all" : `/shop/${category.slug}`;

                        return (
                            <Link
                                key={category.slug}
                                href={targetHref}
                                className={`cursor-pointer border px-4 py-2 text-[15px] tracking-[-0.02em] transition-all duration-200 select-none ${
                                    isActive
                                        ? "border-gold bg-gold/10 font-medium text-gold"
                                        : "border-transparent text-[#121212] hover:border-gold/40 hover:text-gold"
                                }`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {category.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Product Grid / Empty State Section */}
            <section className="mx-auto w-full max-w-[1200px] px-5 pb-28 min-[810px]:px-6 min-[1200px]:px-10">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.slug} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#EAE5DB] bg-[#FCFAF6] px-6 py-20 text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                            <svg
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </div>

                        <h3 className="font-bengali text-2xl font-semibold text-[#121212] min-[810px]:text-3xl">
                            নতুন কালেকশন শীঘ্রই আসছে
                        </h3>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                            Coming Soon
                        </p>
                        <p className="mt-3 max-w-md text-[15px] font-light text-[#8f8f8f] leading-relaxed">
                            এই ক্যাটাগরির এক্সক্লুসিভ ডিজাইনগুলো প্রস্তুত হচ্ছে এবং খুব শীঘ্রই উন্মুক্ত করা হবে। আমাদের অন্যান্য কালেকশন দেখতে নিচে ক্লিক করুন।
                        </p>

                        <Link
                            href="/shop/all"
                            className="group relative mt-7 inline-flex items-center gap-2 border border-gold bg-gold px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#121212] transition-colors hover:bg-gold-hover hover:text-white"
                        >
                            <span>View All Products</span>
                            <svg
                                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}

function ProductCard({ product }: { product: ShopProduct }) {
    return (
        <Link
            href={`/products/${product.slug}`}
            className="group flex w-full cursor-pointer flex-col gap-4 no-underline"
        >
            {/* Image Mask Container (Aspect Ratio 0.874 matching Framer layout) */}
            <div className="relative aspect-[0.874] w-full overflow-hidden bg-[#f5f5f5]">
                {/* Back Image (Revealed on Hover, scales down from 115% to 100%) */}
                <div className="absolute inset-0 h-full w-full">
                    <Image
                        src={product.backImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top"
                    />
                </div>

                {/* Front Image (Default visible, fades out & scales up to 115% on Hover) */}
                <div className="absolute inset-0 h-full w-full transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:opacity-0">
                    <Image
                        src={product.frontImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top"
                    />
                </div>

                {/* Animated Gold Corner Brackets (Inset 24px -> 16px on hover) */}
                <div className="pointer-events-none absolute left-6 top-6 z-[2] h-[18px] w-[18px] border-l border-t border-gold opacity-0 transition-all duration-300 ease-out group-hover:left-4 group-hover:top-4 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-6 left-6 z-[2] h-[18px] w-[18px] border-b border-l border-gold opacity-0 transition-all duration-300 ease-out group-hover:bottom-4 group-hover:left-4 group-hover:opacity-100" />
                <div className="pointer-events-none absolute right-6 top-6 z-[2] h-[18px] w-[18px] border-r border-t border-gold opacity-0 transition-all duration-300 ease-out group-hover:right-4 group-hover:top-4 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-6 right-6 z-[2] h-[18px] w-[18px] border-b border-r border-gold opacity-0 transition-all duration-300 ease-out group-hover:bottom-4 group-hover:right-4 group-hover:opacity-100" />
            </div>

            {/* Product Description Row */}
            <div className="flex w-full items-center justify-between gap-4">
                {/* Left: Product Name & Category */}
                <div className="flex flex-1 flex-col items-start justify-center">
                    <p className="text-[17px] font-medium leading-[1.4] tracking-[-0.02em] text-[#121212] transition-colors duration-300 group-hover:text-gold">
                        {product.name}
                    </p>
                    <p className="text-[14px] font-light leading-[1.5] tracking-[-0.02em] text-[#8f8f8f]">
                        {product.category}
                    </p>
                </div>

                {/* Right: Current Price & Strikethrough Original Price */}
                <div className="flex flex-col items-end justify-end">
                    <div className="flex items-center text-[18px] font-semibold tracking-tight text-gold">
                        <span>৳</span>
                        <span>{product.price.toLocaleString()}</span>
                    </div>
                    {product.originalPrice && (
                        <div className="flex items-center text-[14px] font-light tracking-tight text-[#8f8f8f] line-through">
                            <span>৳</span>
                            <span>{product.originalPrice.toLocaleString()}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
