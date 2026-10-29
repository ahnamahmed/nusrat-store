"use client";

import React, { useState } from "react";
import Link from "next/link";

export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsSubscribed(true);
                setEmail("");
            } else {
                setErrorMessage(data.error || "Subscription failed. Please try again.");
            }
        } catch {
            setErrorMessage("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="relative z-10 w-full bg-[#121212] pt-20 px-5 min-[810px]:px-6 min-[1200px]:px-10 text-white overflow-hidden">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-[100px]">
                {/* Top Row: Columns + Newsletter */}
                <div className="flex flex-col min-[1200px]:flex-row items-start justify-between gap-10 min-[1200px]:gap-6">
                    {/* Left Link Columns */}
                    <div className="flex w-full flex-1 flex-col min-[810px]:flex-row gap-8">
                        <div className="flex w-full min-[810px]:w-[60%] gap-2">
                            {/* Column 1: Shop */}
                            <div className="flex flex-1 flex-col gap-3.5">
                                <p className="text-[12px] uppercase tracking-[0.14em] text-gold font-semibold">
                                    SHOP
                                </p>
                                <div className="flex flex-col gap-4 text-[16px] font-light tracking-[-0.03em]">
                                    <Link href="/shop/all" className="hover:text-gold transition-colors">All Products</Link>
                                    <Link href="/shop/arabian-jubba" className="hover:text-gold transition-colors">Arabian Jubba</Link>
                                    <Link href="/shop/premium-panjabi" className="hover:text-gold transition-colors">Premium Panjabi</Link>
                                    <Link href="/shop/new-arrival" className="hover:text-gold transition-colors">New Arrivals</Link>
                                </div>
                            </div>

                            {/* Column 2: Information */}
                            <div className="flex flex-1 flex-col gap-3.5">
                                <p className="text-[12px] uppercase tracking-[0.14em] text-gold font-semibold">
                                    INFORMATION
                                </p>
                                <div className="flex flex-col gap-4 text-[16px] font-light tracking-[-0.03em]">
                                    <Link href="/our-story" className="hover:text-gold transition-colors">Our Story</Link>
                                    <Link href="./contact" className="hover:text-gold transition-colors">Contact Us</Link>
                                    <Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Legal */}
                        <div className="flex flex-1 flex-col gap-3.5">
                            <p className="text-[12px] uppercase tracking-[0.14em] text-gold font-semibold">
                                LEGAL
                            </p>
                            <div className="flex flex-col gap-4 text-[16px] font-light tracking-[-0.03em]">
                                <Link href="./privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
                                <Link href="./terms-and-conditions" className="hover:text-gold transition-colors">Terms & Conditions</Link>
                                <Link href="./returns-and-exchanges" className="hover:text-gold transition-colors">Returns & Exchanges</Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Newsletter Box */}
                    <div className="flex w-full min-[810px]:max-w-[50%] min-[1200px]:max-w-[32%] flex-col gap-3.5">
                        <p className="text-[12px] uppercase tracking-[0.14em] text-gold font-semibold">
                            NEWSLETTER
                        </p>
                        <p className="text-[15px] font-light tracking-[-0.03em] text-[#8f8f8f] leading-relaxed">
                            Subscribe to receive early access to new collection drops and private Eid discounts.
                        </p>

                        {isSubscribed ? (
                            <div className="flex items-center gap-2 border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
                                <span>✓</span>
                                <span>Thank you for subscribing! Check your inbox soon.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="relative flex w-full flex-col gap-2">
                                <div className="relative flex w-full items-center">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your Email"
                                        className="h-14 w-full border border-white/20 bg-transparent px-4 pr-[136px] text-[15px] text-white placeholder:text-[#8f8f8f] focus:border-gold focus:outline-none transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-[120px] bg-gold text-[13px] font-semibold uppercase tracking-wider text-[#121212] hover:bg-gold-hover hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                                    >
                                        {isSubmitting ? "WAIT..." : "SUBSCRIBE"}
                                    </button>
                                </div>
                                {errorMessage && (
                                    <p className="text-xs text-red-400">{errorMessage}</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Giant Wordmark & Copyright */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col min-[810px]:flex-row items-center justify-between gap-2 text-[14px] font-light text-[#8f8f8f] border-t border-white/10 pt-8">
                        <p>© {new Date().getFullYear()} Nusrat. All rights reserved.</p>
                        <p>Designed for timeless wardrobes.</p>
                    </div>

                    <div className="flex w-full justify-center overflow-hidden">
                        <span className="font-serif-sc text-[16vw] leading-[0.8] font-semibold uppercase tracking-tight text-gold/15 hover:text-gold/25 transition-colors duration-500 select-none">
                            NUSRAT
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}