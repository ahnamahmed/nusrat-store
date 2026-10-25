// components/ShopCatalog.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SHOP_CATEGORIES, SHOP_PRODUCTS, ShopProduct } from "@/data/shopProducts";

interface ShopCatalogProps {
    initialCategory?: string;
}

export default function ShopCatalog({ initialCategory = "all" }: ShopCatalogProps) {
    const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

    const filteredProducts =
        activeCategory === "all"
            ? SHOP_PRODUCTS
            : SHOP_PRODUCTS.filter((product) => product.tags.includes(activeCategory));

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
                        return (
                            <button
                                key={category.slug}
                                onClick={() => setActiveCategory(category.slug)}
                                className={`cursor-pointer border px-4 py-2 text-[16px] font-light tracking-[-0.03em] transition-all duration-200 ${isActive
                                        ? "border-[#121212] text-[#121212]"
                                        : "border-transparent text-[#121212] hover:border-[#121212]/30"
                                    }`}
                            >
                                {category.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Product Grid Section */}
            <section className="mx-auto w-full max-w-[1200px] px-5 pb-28 min-[810px]:px-6 min-[1200px]:px-10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-12 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.slug} product={product} />
                    ))}
                </div>
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
            {/* Image Mask Container (Aspect Ratio 0.874 matching Framer .framer-1up0fn8) */}
            <div className="relative aspect-[0.874] w-full overflow-hidden bg-[#f5f5f5]">
                {/* Back Image (Revealed on Hover, scales down from 115% to 100%) */}
                <div className="absolute inset-0 h-full w-full">
                    <img
                        src={product.backImage}
                        alt={`${product.name} alternate view`}
                        loading="lazy"
                        className="block h-full w-full scale-[1.15] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-100"
                    />
                </div>

                {/* Front Image (Default visible, fades out & scales up to 115% on Hover) */}
                <div className="absolute inset-0 h-full w-full transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:opacity-0">
                    <img
                        src={product.frontImage}
                        alt={product.name}
                        loading="lazy"
                        className="block h-full w-full object-cover object-top"
                    />
                </div>

                {/* Subtle Noise Texture Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
                    style={{
                        backgroundImage:
                            'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
                        backgroundSize: "100px auto",
                        backgroundRepeat: "repeat",
                    }}
                />

                {/* Animated White Corner Brackets (Inset 24px -> 16px on hover) */}
                <div className="pointer-events-none absolute left-6 top-6 z-[2] h-[18px] w-[18px] border-l border-t border-white opacity-0 transition-all duration-300 ease-out group-hover:left-4 group-hover:top-4 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-6 left-6 z-[2] h-[18px] w-[18px] border-b border-l border-white opacity-0 transition-all duration-300 ease-out group-hover:bottom-4 group-hover:left-4 group-hover:opacity-100" />
                <div className="pointer-events-none absolute right-6 top-6 z-[2] h-[18px] w-[18px] border-r border-t border-white opacity-0 transition-all duration-300 ease-out group-hover:right-4 group-hover:top-4 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-6 right-6 z-[2] h-[18px] w-[18px] border-b border-r border-white opacity-0 transition-all duration-300 ease-out group-hover:bottom-4 group-hover:right-4 group-hover:opacity-100" />
            </div>

            {/* Product Description Row */}
            <div className="flex w-full items-center justify-between gap-4">
                {/* Left: Product Name & Category */}
                <div className="flex flex-1 flex-col items-start justify-center">
                    <p className="text-[18px] font-medium leading-[1.4] tracking-[-0.03em] text-[#121212]">
                        {product.name}
                    </p>
                    <p className="text-[16px] font-light leading-[1.5] tracking-[-0.03em] text-[#4b4b4b]">
                        {product.category}
                    </p>
                </div>

                {/* Right: Current Price & Strikethrough Original Price */}
                <div className="flex flex-col items-end justify-end">
                    <div className="flex items-center">
                        <h3 className="text-[20px] font-medium leading-[1.5] tracking-[-0.03em] text-[#121212]">
                            ${product.price}
                        </h3>
                    </div>
                    {product.originalPrice && (
                        <div className="flex items-center">
                            <p className="text-[16px] font-light leading-[1.5] tracking-[-0.03em] text-[#8f8f8f] line-through">
                                ${product.originalPrice}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}