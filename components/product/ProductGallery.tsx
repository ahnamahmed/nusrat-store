// components/product/ProductGallery.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="relative flex h-[520px] w-full flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] min-[810px]:h-[700px] min-[1200px]:h-[85vh]">
            {/* Active Main Image Container */}
            <div className="relative h-full w-full overflow-hidden">
                {images.map((img, idx) => {
                    const isActive = selectedIndex === idx;
                    return (
                        <div
                            key={idx}
                            className={`absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-500 ease-in-out ${
                                isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
                            }`}
                            style={{
                                transform: "translateZ(0)",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <Image
                                src={img}
                                alt={`${productName} view ${idx + 1}`}
                                fill
                                priority={idx === 0}
                                quality={90}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                className="object-contain object-center"
                                style={{
                                    transform: "translateZ(0)",
                                    backfaceVisibility: "hidden",
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Floating Thumbnail Bar */}
            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
                {images.map((img, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                        <button
                            type="button"
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            aria-label={`Select image ${idx + 1}`}
                            className={`relative h-16 w-16 cursor-pointer overflow-hidden transition-all duration-300 min-[810px]:h-20 min-[810px]:w-20 ${
                                isSelected
                                    ? "ring-2 ring-[#C5A059] shadow-lg scale-105"
                                    : "opacity-60 ring-1 ring-white/50 hover:opacity-100"
                            }`}
                            style={{
                                transform: "translateZ(0)",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                quality={90}
                                sizes="100px"
                                className="object-contain object-center p-1"
                                style={{
                                    transform: "translateZ(0)",
                                    backfaceVisibility: "hidden",
                                }}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
