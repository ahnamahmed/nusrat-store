"use client";

import React, { useState } from "react";

interface ProductAccordionProps {
    description?: string;
    fabricDetails?: string;
    sizes?: (string | number)[];
}

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

export default function ProductAccordion({
    description,
    fabricDetails,
    sizes = [40, 42, 44, 46, 48],
}: ProductAccordionProps) {
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
                        "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।"}
                </p>
            ),
        },
        {
            id: "materials",
            title: "Materials & Care",
            content: (
                <div className="space-y-2 text-[15px] font-light leading-[1.6] text-[#4b4b4b]">
                    {fabricDetails && (
                        <p>
                            <strong className="text-[#121212]">ফ্যাব্রিক:</strong> {fabricDetails}
                        </p>
                    )}
                    <p>
                        মেশিন ওয়াশ জেন্টল অথবা ড্রাই ক্লিন করুন। ব্লিচ ব্যবহার পরিহার করুন। কাপড়ের উজ্জ্বলতা ও স্থায়িত্ব ধরে রাখতে সরাসরি কড়া রোদে বেশিক্ষণ রাখবেন না এবং উল্টো পাশে হালকা আয়রন করুন।
                    </p>
                </div>
            ),
        },
        {
            id: "shipping",
            title: "Shipping Information",
            content: (
                <div className="space-y-1 text-[15px] font-light leading-[1.6] text-[#4b4b4b]">
                    <p>• <strong>ঢাকার ভেতরে:</strong> ডেলিভারি চার্জ ৳৭০ (২-৩ কার্যদিবস)</p>
                    <p>• <strong>ঢাকার বাইরে:</strong> ডেলিভারি চার্জ ৳১৩০ (৩-৫ কার্যদিবস)</p>
                    <p className="pt-1 text-xs text-[#8f8f8f]">
                        *সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। পার্সেল ডেলিভারি ম্যানের সামনে দেখে বুঝে নেওয়ার সুযোগ পাবেন।
                    </p>
                </div>
            ),
        },
        {
            id: "size-chart",
            title: "Size Chart",
            content: (
                <div className="space-y-1.5 text-[14px] font-light leading-[1.6] text-[#4b4b4b]">
                    {sizes.map((s) => (
                        <p key={s}>
                            <strong className="text-[#121212]">সাইজ {s}:</strong> ঝুল {s} ইঞ্চি | বডি {s}–{Number(s) + 2} ইঞ্চি (রেগুলার ফিট)
                        </p>
                    ))}
                    <p className="pt-2 text-xs text-[#8f8f8f]">
                        *উচ্চতা অনুযায়ী সাইজ নির্বাচন করুন: 5&apos;4&quot;–5&apos;5&quot; (40), 5&apos;6&quot;–5&apos;7&quot; (42), 5&apos;8&quot;–5&apos;9&quot; (44), 5&apos;10&quot;–5&apos;11&quot; (46), 6&apos;0&quot;+ (48)।
                    </p>
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
                            type="button"
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