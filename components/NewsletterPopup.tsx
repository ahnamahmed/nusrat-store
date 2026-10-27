"use client";

import { useState, useEffect } from "react";

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 2500);
        return () => clearTimeout(timer);
    }, []);

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
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
            } else {
                setErrorMessage(data.error || "Subscription failed. Please try again.");
            }
        } catch {
            setErrorMessage("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 right-0 left-0 min-[810px]:left-auto min-[810px]:bottom-6 min-[810px]:right-6 z-40 flex w-full min-[810px]:w-[580px] min-h-[280px] bg-white shadow-2xl overflow-hidden border border-[#ededed]">
            {/* Left Image */}
            <div className="relative hidden min-[810px]:block w-[222px] min-h-[280px] shrink-0 overflow-hidden">
                <img
                    src="https://framerusercontent.com/images/WnuMbRu1MWsY5PzO6LLjODYGr0.jpg?scale-down-to=1024"
                    alt="Newsletter promo"
                    className="h-full w-full object-cover object-center"
                />
                <div className="bg-noise pointer-events-none absolute inset-0 opacity-10" />
            </div>

            {/* Right Content */}
            <div className="flex flex-1 flex-col justify-between bg-white px-[18px] py-4">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                        FIRST TIMER?
                    </p>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close modal"
                        className="flex h-5 w-5 items-center justify-center text-[#121212] hover:text-gold transition-colors cursor-pointer"
                    >
                        <svg viewBox="0 0 256 256" className="h-3.5 w-3.5 fill-current">
                            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                        </svg>
                    </button>
                </div>

                <p className="font-serif-sc text-[24px] font-medium uppercase leading-[1.04] text-[#121212]">
                    Sign up and get <span className="text-gold">20% off</span> your first order
                </p>

                <div className="flex flex-col gap-2">
                    {isSubscribed ? (
                        <div className="flex flex-col gap-1 rounded-sm border border-gold/30 bg-gold/10 p-3 text-center">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                                ✓ Welcome to Nusrat
                            </p>
                            <p className="text-[11px] text-[#4b4b4b]">
                                Use code <strong className="text-[#121212]">NUSRAT20</strong> at checkout for 20% off.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="relative flex w-full flex-col gap-1.5">
                            <div className="relative flex w-full items-center">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
                                    className="h-12 w-full border border-[#ededed] bg-white pl-3 pr-[128px] text-[15px] tracking-[-0.03em] text-[#121212] placeholder:text-[#8f8f8f] focus:border-gold focus:outline-none transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-[120px] bg-gold text-[13px] font-semibold uppercase tracking-wider text-[#121212] hover:bg-gold-hover hover:text-white transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmitting ? "WAIT..." : "SUBSCRIBE"}
                                </button>
                            </div>
                            {errorMessage && (
                                <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
                            )}
                        </form>
                    )}

                    <p className="text-[11px] font-normal tracking-[-0.02em] leading-[15px] text-[#8f8f8f]">
                        Subscribe to receive special promotions, private Eid discounts, and collection arrivals.
                    </p>
                </div>
            </div>
        </div>
    );
}