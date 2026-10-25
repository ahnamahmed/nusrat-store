"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
    { label: "SHOP", href: "/shop/all" },
    { label: "COLLECTIONS", href: "/shop/lux-blazer" },
    { label: "OUR STORY", href: "/our-story" },
    { label: "BLOG", href: "/blog" },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

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
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="group relative px-2 py-1 text-[13px] font-normal tracking-[0.14em] text-[#121212] uppercase"
                        >
                            <span>{link.label}</span>
                            {/* Mini Corner Brackets on Nav Hover */}
                            <span className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 border-t border-l border-[#121212] opacity-0 transition-all group-hover:top-0 group-hover:left-0 group-hover:opacity-100" />
                            <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-[#121212] opacity-0 transition-all group-hover:bottom-0 group-hover:left-0 group-hover:opacity-100" />
                            <span className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 border-t border-r border-[#121212] opacity-0 transition-all group-hover:top-0 group-hover:right-0 group-hover:opacity-100" />
                            <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-[#121212] opacity-0 transition-all group-hover:bottom-0 group-hover:right-0 group-hover:opacity-100" />
                        </Link>
                    ))}
                </nav>

                {/* Utility Icons */}
                <div className="flex items-center gap-3">
                    <button
                        aria-label="Search"
                        className="flex h-10 w-10 items-center justify-center text-[#121212] hover:opacity-70"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="h-5 w-[1px] bg-[#ededed]" />

                    <button
                        aria-label="Cart"
                        className="flex h-10 w-10 items-center justify-center text-[#121212] hover:opacity-70"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </button>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                        className="relative flex h-10 w-10 items-center justify-center min-[810px]:hidden"
                    >
                        <span
                            className={`absolute h-[2px] w-[23px] bg-[#121212] transition-transform duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1.5"
                                }`}
                        />
                        <span
                            className={`absolute h-[2px] bg-[#121212] transition-all duration-300 ${mobileOpen ? "w-[23px] -rotate-45" : "w-[17px] translate-x-[3px] translate-y-1.5"
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="flex min-h-[calc(100dvh-64px)] flex-col justify-between bg-white px-5 py-10 min-[810px]:hidden">
                    <nav className="flex flex-col gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="font-serif-sc text-2xl font-medium uppercase text-[#121212]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}