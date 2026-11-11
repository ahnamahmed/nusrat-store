"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CollectionItem {
    label: string;
    href: string;
    description: string;
}

const COLLECTION_ITEMS: CollectionItem[] = [
    {
        label: "Embroidery Panjabi",
        href: "/shop/embroidery-panjabi",
        description: "Intricate handcrafted needlework",
    },
    {
        label: "Printed Panjabi",
        href: "/shop/printed-panjabi",
        description: "Contemporary refined prints",
    },
    {
        label: "Signature Panjabi",
        href: "/shop/signature-panjabi",
        description: "Exclusive luxury tailoring",
    },
    {
        label: "Thobe",
        href: "/shop/thobe",
        description: "Classic Arabian silhouettes",
    },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsCollectionsOpen(true);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsCollectionsOpen(false);
        }, 150);
    };

    // Close on click outside and escape key for accessibility
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsCollectionsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsCollectionsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("keydown", handleKeyDown);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#ededed]">
            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 min-[810px]:px-6 min-[1200px]:px-10">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Nusrat Panjabi"
                        width={160}
                        height={40}
                        priority
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden min-[810px]:flex items-center gap-6">
                    {/* SHOP */}
                    <Link
                        href="/shop/all"
                        className="group relative px-2.5 py-1 text-[13px] font-medium tracking-[0.14em] text-[#121212] uppercase transition-colors hover:text-gold"
                    >
                        <span>SHOP</span>
                        <span className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 border-t border-l border-gold opacity-0 transition-all group-hover:top-0 group-hover:left-0 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-gold opacity-0 transition-all group-hover:bottom-0 group-hover:left-0 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 border-t border-r border-gold opacity-0 transition-all group-hover:top-0 group-hover:right-0 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-gold opacity-0 transition-all group-hover:bottom-0 group-hover:right-0 group-hover:opacity-100" />
                    </Link>

                    {/* COLLECTIONS Dropdown */}
                    <div
                        ref={dropdownRef}
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            type="button"
                            onClick={() => setIsCollectionsOpen((prev) => !prev)}
                            className={`group relative flex items-center gap-1.5 px-2.5 py-1 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors hover:text-gold cursor-pointer ${
                                isCollectionsOpen ? "text-gold" : "text-[#121212]"
                            }`}
                            aria-expanded={isCollectionsOpen}
                            aria-haspopup="true"
                        >
                            <span>COLLECTIONS</span>
                            <svg
                                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                    isCollectionsOpen ? "rotate-180 text-gold" : "text-[#121212] group-hover:text-gold"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>

                            {/* Gold Corner Accent Brackets on Hover or Open */}
                            <span
                                className={`pointer-events-none absolute -top-1 -left-1 h-2 w-2 border-t border-l border-gold transition-all ${
                                    isCollectionsOpen
                                        ? "top-0 left-0 opacity-100"
                                        : "opacity-0 group-hover:top-0 group-hover:left-0 group-hover:opacity-100"
                                }`}
                            />
                            <span
                                className={`pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-gold transition-all ${
                                    isCollectionsOpen
                                        ? "bottom-0 left-0 opacity-100"
                                        : "opacity-0 group-hover:bottom-0 group-hover:left-0 group-hover:opacity-100"
                                }`}
                            />
                            <span
                                className={`pointer-events-none absolute -top-1 -right-1 h-2 w-2 border-t border-r border-gold transition-all ${
                                    isCollectionsOpen
                                        ? "top-0 right-0 opacity-100"
                                        : "opacity-0 group-hover:top-0 group-hover:right-0 group-hover:opacity-100"
                                }`}
                            />
                            <span
                                className={`pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-gold transition-all ${
                                    isCollectionsOpen
                                        ? "bottom-0 right-0 opacity-100"
                                        : "opacity-0 group-hover:bottom-0 group-hover:right-0 group-hover:opacity-100"
                                }`}
                            />
                        </button>

                        {/* Floating Dropdown Card */}
                        <div
                            className={`absolute left-1/2 top-full -translate-x-1/2 pt-2.5 transition-all duration-200 z-50 ${
                                isCollectionsOpen
                                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                                    : "opacity-0 invisible -translate-y-1.5 pointer-events-none"
                            }`}
                        >
                            <div className="w-64 rounded-xl border border-[#EAE5DB] bg-white p-2 shadow-xl ring-1 ring-black/5">
                                <div className="flex flex-col gap-1">
                                    {COLLECTION_ITEMS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsCollectionsOpen(false)}
                                            className="group/item flex flex-col gap-0.5 rounded-lg px-3.5 py-2.5 transition-colors hover:bg-gold/10 text-left"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-[13px] font-medium tracking-[0.03em] text-[#121212] transition-colors group-hover/item:text-gold">
                                                    {item.label}
                                                </span>
                                                <svg
                                                    className="h-3 w-3 text-[#121212]/30 opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-gold"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </div>
                                            <span className="text-[11px] font-light text-[#8f8f8f] transition-colors group-hover/item:text-[#121212]/70">
                                                {item.description}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OUR STORY */}
                    <Link
                        href="/our-story"
                        className="group relative px-2.5 py-1 text-[13px] font-medium tracking-[0.14em] text-[#121212] uppercase transition-colors hover:text-gold"
                    >
                        <span>OUR STORY</span>
                        <span className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 border-t border-l border-gold opacity-0 transition-all group-hover:top-0 group-hover:left-0 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-gold opacity-0 transition-all group-hover:bottom-0 group-hover:left-0 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 border-t border-r border-gold opacity-0 transition-all group-hover:top-0 group-hover:right-0 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-gold opacity-0 transition-all group-hover:bottom-0 group-hover:right-0 group-hover:opacity-100" />
                    </Link>
                </nav>

                {/* Utility Icons */}
                <div className="flex items-center gap-3">
                    <button
                        aria-label="Search"
                        className="flex h-10 w-10 items-center justify-center text-[#121212] transition-colors hover:text-gold"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="h-5 w-[1px] bg-[#ededed]" />

                    <Link
                        href="/shop/all"
                        aria-label="Cart"
                        className="flex h-10 w-10 items-center justify-center text-[#121212] transition-colors hover:text-gold"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                        className="group relative flex h-10 w-10 items-center justify-center min-[810px]:hidden"
                    >
                        <span
                            className={`absolute h-[2px] w-[23px] bg-[#121212] transition-all duration-300 group-hover:bg-gold ${
                                mobileOpen ? "rotate-45" : "-translate-y-1.5"
                            }`}
                        />
                        <span
                            className={`absolute h-[2px] bg-[#121212] transition-all duration-300 group-hover:bg-gold ${
                                mobileOpen ? "w-[23px] -rotate-45" : "w-[17px] translate-x-[3px] translate-y-1.5"
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="flex min-h-[calc(100dvh-64px)] flex-col justify-between border-t border-[#ededed] bg-white px-5 py-10 min-[810px]:hidden overflow-y-auto">
                    <nav className="flex flex-col gap-6">
                        <Link
                            href="/shop/all"
                            onClick={() => setMobileOpen(false)}
                            className="font-serif-sc text-2xl font-medium uppercase text-[#121212] transition-colors hover:text-gold"
                        >
                            SHOP
                        </Link>

                        {/* Mobile Collections Accordion */}
                        <div className="flex flex-col">
                            <button
                                type="button"
                                onClick={() => setMobileCollectionsOpen((prev) => !prev)}
                                className="flex items-center justify-between font-serif-sc text-2xl font-medium uppercase text-[#121212] transition-colors hover:text-gold text-left"
                                aria-expanded={mobileCollectionsOpen}
                            >
                                <span>COLLECTIONS</span>
                                <svg
                                    className={`h-5 w-5 text-[#121212] transition-transform duration-200 ${
                                        mobileCollectionsOpen ? "rotate-180 text-gold" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {mobileCollectionsOpen && (
                                <div className="mt-3 flex flex-col gap-2 border-l-2 border-gold/40 pl-4 ml-1">
                                    {COLLECTION_ITEMS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => {
                                                setMobileOpen(false);
                                                setMobileCollectionsOpen(false);
                                            }}
                                            className="group flex flex-col py-1.5 text-left transition-colors"
                                        >
                                            <span className="text-[15px] font-medium text-[#121212] transition-colors group-hover:text-gold">
                                                {item.label}
                                            </span>
                                            <span className="text-[12px] font-light text-[#8f8f8f]">
                                                {item.description}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/our-story"
                            onClick={() => setMobileOpen(false)}
                            className="font-serif-sc text-2xl font-medium uppercase text-[#121212] transition-colors hover:text-gold"
                        >
                            OUR STORY
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
