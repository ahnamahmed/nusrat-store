// components/product/ProductFaq.tsx
"use client";

import React, { useState } from "react";

const FAQS = [
    {
        q: "How to place an order in an online store?",
        a: "Browse our collection, select your preferred size and color, and click 'Order Now'. You can choose Cash on Delivery at checkout without any advance payment.",
    },
    {
        q: "How much does delivery cost?",
        a: "Delivery is ৳70 within Dhaka and ৳130 for districts outside Dhaka. Free delivery is available on orders containing two or more pieces.",
    },
    {
        q: "What are the delivery methods?",
        a: "We ship nationwide via trusted courier partners (Steadfast / Pathao / Paperfly) with express door-to-door delivery.",
    },
    {
        q: "How do I find out the availability of goods in the store?",
        a: "All stock statuses shown on the product page are synchronized in real-time. If a size is selectable, it is ready for immediate dispatch.",
    },
    {
        q: "How to exchange or return the goods?",
        a: "You may check the fabric quality and size in front of the courier delivery person. If there is any issue with sizing, we provide instant hassle-free size exchanges within 3 days.",
    },
];

export default function ProductFaq() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section className="w-full bg-white py-24 text-[#121212]">
            <div className="mx-auto w-full max-w-[800px] px-5 min-[810px]:px-6">
                <h2 className="font-serif-sc mb-12 text-center text-3xl font-semibold uppercase tracking-wider min-[810px]:text-4xl">
                    FAQ
                </h2>

                <div className="divide-y divide-[#ededed] border-b border-t border-[#ededed]">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div key={idx} className="py-5">
                                <button
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="flex w-full cursor-pointer items-center justify-between text-left transition-colors hover:text-[#C5A059]"
                                >
                                    <h4 className="text-[17px] font-medium tracking-tight text-[#121212]">
                                        {faq.q}
                                    </h4>
                                    <span className="relative flex h-6 w-6 items-center justify-center text-[#121212]">
                                        <span className="h-0.5 w-4 bg-current" />
                                        <span
                                            className={`absolute h-4 w-0.5 bg-current transition-transform duration-200 ${isOpen ? "scale-0" : "scale-100"
                                                }`}
                                        />
                                    </span>
                                </button>
                                {isOpen && (
                                    <p className="pt-3 text-[15px] font-light leading-relaxed text-[#4b4b4b]">
                                        {faq.a}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}