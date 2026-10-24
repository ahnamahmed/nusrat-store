"use client";

import { useState } from "react";

const FAQS = [
    {
        question: "How to place an order in an online store?",
        answer:
            "To place an order in our online store, simply browse our products and add your desired items to the cart. Once you're ready, go to your cart, review your selections, and proceed to checkout. Enter your shipping details, choose a payment method, and confirm your order. After completing the payment, you'll receive a confirmation email with your order details.",
    },
    {
        question: "How much does the delivery cost?",
        answer:
            "The delivery cost depends on your location and the shipping method selected at checkout. You can view the exact shipping fees before completing your purchase.",
    },
    {
        question: "What are the delivery methods?",
        answer:
            "We offer several delivery methods, including standard shipping, express shipping, and same-day delivery (where available). The available options will be shown at checkout based on your location.",
    },
    {
        question: "How do I find out the availability of goods in the store?",
        answer:
            "You can check the availability of goods directly on the product page. If an item is out of stock, it will be indicated on the page. For further inquiries, feel free to contact our support team.",
    },
    {
        question: "How to exchange or return the goods?",
        answer:
            "To exchange or return an item, please visit our Returns & Exchanges page and follow the provided instructions. Ensure the item is in its original condition and packaging. If you have any questions, feel free to contact our support team.",
    },
];

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative z-10 w-full bg-white py-[100px] px-5 min-[810px]:px-6 min-[1200px]:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-12">
                <h2 className="font-serif-sc text-[32px] min-[810px]:text-[40px] font-semibold uppercase leading-[1.04] text-[#121212] text-center">
                    FAQ
                </h2>

                <div className="flex w-full max-w-[800px] flex-col gap-6">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={faq.question} className="flex flex-col gap-6">
                                <div
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="flex w-full cursor-pointer flex-col"
                                >
                                    <div className="flex w-full items-center justify-between gap-6">
                                        <h4 className="flex-1 text-left text-[18px] font-medium tracking-[-0.02em] leading-[1.4] text-[#121212]">
                                            {faq.question}
                                        </h4>

                                        {/* Plus / Minus Icon */}
                                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                                            <span className="absolute h-[2px] w-4 rounded-full bg-[#121212]" />
                                            <span
                                                className={`absolute h-4 w-[2px] rounded-full bg-[#121212] transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen
                                                ? "grid-rows-[1fr] opacity-100 pt-2.5"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#121212]">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {idx < FAQS.length - 1 && (
                                    <div className="h-[1px] w-full bg-[#ededed]" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}