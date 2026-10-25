// components/product/ProductAccordion.tsx
"use client";

import React, { useState } from "react";

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

export default function ProductAccordion({ description }: { description?: string }) {
    const [openId, setOpenId] = useState<string | null>("description");

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    const items: AccordionItem[] = [
        {
            id: "description",
            title: "Description",
            content: (
                <p className="text-[15px] font-light leading-[1.6] text-[#4b4b4b]">
                    {description ||
                        "Crafted from a premium cotton-linen blend, this garment offers a lightweight, breathable fit. Its tailored design ensures versatility for both formal wear and casual occasions."}
                </p>
            ),
        },
        {
            id: "materials",
            title: "Materials & Care",
            content: (
                <p className="text-[15px] font-light leading-[1.6] text-[#4b4b4b]">
                    Crafted from premium fabrics like cotton, linen, wool, and silk, our clothing ensures comfort and durability. For lasting wear, follow care instructions, machine wash gentle, air dry when needed, and avoid high heat for delicate materials.
                </p>
            ),
        },
        {
            id: "shipping",
            title: "Shipping Information",
            content: (
                <p className="text-[15px] font-light leading-[1.6] text-[#4b4b4b]">
                    Orders ship within 1-2 business days. Delivery takes 2-3 days inside Dhaka and 3-5 days across all districts of Bangladesh. Tracking details provided via SMS upon dispatch.
                </p>
            ),
        },
        {
            id: "size-chart",
            title: "Size Chart",
            content: (
                <div className="space-y-1.5 text-[14px] font-light leading-[1.6] text-[#4b4b4b]">
                    <p><strong>Size 40:</strong> Chest 40 in | Length 40 in</p>
                    <p><strong>Size 42:</strong> Chest 42 in | Length 42 in</p>
                    <p><strong>Size 44:</strong> Chest 44 in | Length 44 in</p>
                    <p><strong>Size 46:</strong> Chest 46 in | Length 46 in</p>
                    <p className="pt-2 text-xs text-[#8f8f8f]">*Measurements correspond to standard regular fit garment specifications.</p>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full divide-y divide-[#ededed] border-b border-t border-[#ededed]">
            {items.map((item) => {
                const isOpen = openId === item.id;
                return (
                    <div key={item.id} className="py-4">
                        <button
                            onClick={() => toggle(item.id)}
                            className="flex w-full cursor-pointer items-center justify-between text-left transition-colors hover:text-[#C5A059]"
                        >
                            <span className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#121212]">
                                {item.title}
                            </span>
                            <span
                                className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#C5A059]" : "rotate-0 text-[#121212]"
                                    }`}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                                </svg>
                            </span>
                        </button>

                        {isOpen && <div className="pt-3">{item.content}</div>}
                    </div>
                );
            })}
        </div>
    );
}