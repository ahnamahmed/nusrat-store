"use client";

import { useState, useEffect } from "react";

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 right-0 left-0 min-[810px]:left-auto min-[810px]:bottom-6 min-[810px]:right-6 z-40 flex w-full min-[810px]:w-[580px] h-[280px] bg-white shadow-2xl overflow-hidden border border-[#ededed]">
            {/* Left Image (Hidden on small mobile to match 390px variant) */}
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
                    <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#121212]">
                        First timer?
                    </p>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close modal"
                        className="flex h-4 w-4 items-center justify-center text-[#121212] hover:opacity-60 cursor-pointer"
                    >
                        <svg viewBox="0 0 256 256" className="h-3.5 w-3.5 fill-current">
                            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                        </svg>
                    </button>
                </div>

                <p className="font-serif-sc text-[24px] font-medium uppercase leading-[1.04] text-[#121212]">
                    Sign up and get 20% off your first order
                </p>

                <div className="flex flex-col gap-2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                        }}
                        className="relative flex w-full items-center"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Your Email"
                            className="h-12 w-full border border-[#ededed] bg-white pl-3 pr-[128px] text-[16px] tracking-[-0.03em] text-[#121212] placeholder:text-[#8f8f8f] focus:border-[#121212] focus:outline-none transition-colors"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-[120px] bg-[#121212] text-[16px] font-light tracking-[-0.03em] text-white hover:bg-[#4b4b4b] transition-colors cursor-pointer"
                        >
                            SUBSCRIBE
                        </button>
                    </form>

                    <p className="text-[12px] font-normal tracking-[-0.03em] leading-[18px] text-[#8f8f8f]">
                        Subscribe to our newsletter and be the first to hear about our new arrivals, special promotions and online exclusives.
                    </p>
                </div>
            </div>
        </div>
    );
}