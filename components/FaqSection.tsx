"use client";

import { useState } from "react";

const FAQS = [
    {
        question: "Can I check the product before paying?",
        answer:
            "Yes. We offer Cash on Delivery nationwide. When the delivery rider arrives, you can open the parcel, inspect the fabric, embroidery, and finish to ensure everything meets your expectations, and then pay the total amount.",
    },
    {
        question: "How do I know which size will fit me best?",
        answer:
            "Our detailed Size Guide located on every product page, which maps out measurements based on height and chest size. If you are unsure between two sizes, feel free to contact us via WhatsApp or Messenger—our team will recommend the exact fit for your body.",
    },
    {
        question: "What is your exchange policy if the size does not fit?",
        answer:
            "If there is any sizing mismatch, you can request an exchange within 48 hours of delivery. The item must be unused, unwashed, and in its original condition with the signature gift box and tags intact. Contact our support line to arrange an exchange parcel.",
    },
    {
        question: "How long does delivery take, and what are the delivery charges?",
        answer:
            "Inside Dhaka, delivery typically takes 24–48 hours (৳80). For deliveries outside Dhaka, parcels arrive within 2–4 business days (৳110). You will receive an automated tracking update as soon as your parcel is dispatched.",
    },
    {
        question: "How do I find out the availability of product in the store?",
        answer:
            "You can check the availability of goods directly on the product page. If an item is out of stock, it will be indicated on the page. For further inquiries, feel free to contact our support team.",
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