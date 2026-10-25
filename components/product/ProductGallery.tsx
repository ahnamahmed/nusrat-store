// components/product/ProductGallery.tsx
"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="relative flex h-[520px] w-full flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] min-[810px]:h-[700px] min-[1200px]:h-[85vh]">
            {/* Active Main Image */}
            <div className="relative h-full w-full">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-in-out ${selectedIndex === idx ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <img
                            src={img}
                            alt={`${productName} view ${idx + 1}`}
                            className="h-full w-full object-cover object-top"
                        />
                    </div>
                ))}

                {/* Bottom subtle gradient vignette */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent" />

                {/* Noise texture overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
                        backgroundSize: "100px auto",
                        backgroundRepeat: "repeat",
                    }}
                />
            </div>

            {/* Floating Thumbnail Bar */}
            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
                {images.map((img, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            aria-label={`Select image ${idx + 1}`}
                            className={`relative h-16 w-16 cursor-pointer overflow-hidden transition-all duration-300 min-[810px]:h-20 min-[810px]:w-20 ${isSelected
                                    ? "ring-2 ring-[#C5A059] shadow-lg scale-105"
                                    : "opacity-60 ring-1 ring-white/50 hover:opacity-100"
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="h-full w-full object-cover object-top"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}