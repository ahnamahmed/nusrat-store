// components/FeaturedProductSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CornerBrackets } from "./CornerBrackets";

const GALLERY_IMAGES = [
    "/products/jubba-black-front.jpg",
    "/products/jubba-black-back.jpg",
    "/products/jubba-white-front.jpg",
    "/products/jubba-deepblue-front.jpg",
];

export function FeaturedProductSection() {
    const [selectedIdx, setSelectedIdx] = useState(0);

    return (
        <section className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col min-[1200px]:flex-row items-start bg-white">
            {/* Left 50% Sticky Interactive Image Gallery */}
            <div className="relative w-full min-[1200px]:w-1/2 h-[600px] min-[810px]:h-[800px] min-[1200px]:h-[95vh] min-[1200px]:sticky min-[1200px]:top-16 overflow-hidden bg-[#f5f5f5]">
                {GALLERY_IMAGES.map((src, idx) => (
                    <img
                        key={src}
                        src={src}
                        alt={`Nusrat Arabian Jubba view ${idx + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 ${selectedIdx === idx ? "scale-100 opacity-100" : "scale-110 opacity-0"
                            }`}
                    />
                ))}

                {/* Bottom Dark Gradient */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%]"
                    style={{
                        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%)",
                    }}
                />
                <div className="bg-noise pointer-events-none absolute inset-0 opacity-10" />

                {/* Thumbnail Selector Bar */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex w-[80%] min-[810px]:w-[60%] items-center justify-center gap-4">
                    {GALLERY_IMAGES.map((src, idx) => {
                        const isSelected = selectedIdx === idx;
                        return (
                            <button
                                key={src}
                                onClick={() => setSelectedIdx(idx)}
                                className={`group relative aspect-square flex-1 max-w-[93px] cursor-pointer overflow-visible transition-all ${isSelected ? "ring-2 ring-gold" : "opacity-80 hover:opacity-100"
                                    }`}
                            >
                                <CornerBrackets active={isSelected} />
                                <div className="relative h-full w-full overflow-hidden">
                                    <img
                                        src={src}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="h-full w-full object-cover object-top"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-[#121212] transition-opacity ${isSelected ? "opacity-0" : "opacity-40 group-hover:opacity-10"
                                            }`}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Right 50% Product Details */}
            <div className="flex w-full min-[1200px]:w-1/2 flex-col items-start justify-center bg-white px-5 py-10 min-[810px]:px-6 min-[1200px]:p-10">
                <div className="flex w-full max-w-[800px] flex-col items-start gap-10">
                    {/* Top Mini Header */}
                    <div className="flex w-full flex-col gap-4">
                        <div className="flex w-full flex-wrap items-center justify-between gap-4">
                            <h2 className="font-serif-sc text-[24px] font-medium uppercase leading-[1.04] text-[#121212]">
                                Signature Collection
                            </h2>
                            <Link
                                href="/shop/arabian-jubba"
                                className="group flex h-9 items-center justify-center border border-gold px-6 text-[14px] font-medium tracking-[0.14em] uppercase text-[#121212] transition-colors hover:bg-gold hover:text-white"
                            >
                                SEE ALL
                            </Link>
                        </div>
                        <div className="h-[1px] w-full bg-[#ededed]" />
                    </div>

                    {/* Product Title, Price & Review Rating */}
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-serif-sc text-[24px] min-[810px]:text-[32px] font-medium tracking-tight leading-[1.2] text-[#121212]">
                                Nusrat Arabian Jubba - Midnight Edition
                            </h3>

                            <div className="flex items-center gap-3 pt-1">
                                <div className="flex items-center text-[22px] min-[810px]:text-[28px] font-bold tracking-tight text-gold">
                                    <span>৳</span>
                                    <span>2,350</span>
                                </div>
                                <div className="flex items-center text-[18px] font-light tracking-tight text-[#8f8f8f] line-through">
                                    <span>৳</span>
                                    <span>2,950</span>
                                </div>
                                <span className="rounded bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                                    SAVE ৳600
                                </span>
                            </div>
                        </div>

                        {/* 5 Gold Stars */}
                        <div className="flex items-center gap-2 pt-1">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        viewBox="0 0 256 256"
                                        className="h-[18px] w-[18px] fill-gold"
                                    >
                                        <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-[14px] font-light text-[#8f8f8f]">
                                (24 Customer Reviews)
                            </span>
                        </div>
                    </div>

                    {/* 3 Benefit Badges */}
                    <div className="flex w-full flex-wrap items-center justify-between gap-4 border-t border-[#ededed] pt-4">
                        <div className="flex min-w-[150px] items-center gap-2.5">
                            <svg viewBox="0 0 256 256" className="h-[20px] w-[20px] fill-gold">
                                <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z" />
                            </svg>
                            <span className="text-[15px] font-light text-[#121212]">
                                Cash On Delivery
                            </span>
                        </div>

                        <div className="flex min-w-[150px] items-center gap-2.5">
                            <svg viewBox="0 0 256 256" className="h-[20px] w-[20px] fill-gold">
                                <path d="M255.42,117l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.42,117ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H223a32.06,32.06,0,0,0-31-24V128h48Z" />
                            </svg>
                            <span className="text-[15px] font-light text-[#121212]">
                                Nationwide Delivery
                            </span>
                        </div>

                        <div className="flex min-w-[150px] items-center gap-2.5">
                            <svg viewBox="0 0 256 256" className="h-[20px] w-[20px] fill-gold">
                                <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z" />
                            </svg>
                            <span className="text-[15px] font-light text-[#121212]">
                                2–5 Days Dispatch
                            </span>
                        </div>
                    </div>

                    {/* Primary CTA Button */}
                    <Link
                        href="/products/nusrat-arabian-jubba-black"
                        className="flex w-full min-[1200px]:max-w-[360px] items-center justify-center bg-gold px-8 py-4 text-xs font-semibold tracking-[0.18em] text-[#121212] uppercase transition-all duration-300 hover:bg-gold-hover hover:text-white"
                    >
                        ORDER NOW (CASH ON DELIVERY)
                    </Link>

                    {/* Description Block */}
                    <div className="flex w-full flex-col gap-2">
                        <h5 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold">
                            Garment Details
                        </h5>
                        <p className="text-[15px] font-light leading-[1.6] text-[#4b4b4b]">
                            অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}