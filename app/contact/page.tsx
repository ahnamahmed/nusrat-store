// app/contact/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] selection:bg-[#B89047] selection:text-white">
            {/* Editorial Navigation Bar */}
            <header className="sticky top-0 z-40 border-b border-[#EAE5DB] bg-[#FDFBF7]/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#1A1A1A]">
                            NUSRAT
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-[0.25em] uppercase text-[#4A4A4A]">
                        <Link href="/" className="hover:text-[#B89047] transition-colors">
                            Shop
                        </Link>
                        <Link href="/exclusive" className="hover:text-[#B89047] transition-colors">
                            Collections
                        </Link>
                        <Link href="/story" className="hover:text-[#B89047] transition-colors">
                            Our Story
                        </Link>
                        <Link href="/contact" className="text-[#B89047] transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/exclusive"
                            className="border border-[#B89047] bg-[#B89047] px-6 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:bg-[#9B7735]"
                        >
                            Order Online
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Header */}
            <section className="border-b border-[#EAE5DB] bg-white py-16 sm:py-24 text-center px-4">
                <div className="mx-auto max-w-3xl">
                    <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#B89047]">
                        Est. 2020 • Atelier Support
                    </span>
                    <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal tracking-[0.08em] uppercase text-[#1A1A1A]">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-xs sm:text-sm font-light tracking-wide text-[#666666] leading-relaxed max-w-xl mx-auto">
                        For bespoke tailoring inquiries, delivery tracking, or size consultations, our client concierge is at your service.
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
                {/* Three Pillar Cards: Direct Contact Details */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {/* Phone & WhatsApp */}
                    <div className="border border-[#EAE5DB] bg-white p-8 text-center flex flex-col justify-between transition-all duration-300 hover:border-[#B89047]/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B89047]">
                                Immediate Assistance
                            </span>
                            <h2 className="mt-2 font-serif text-xl tracking-wide uppercase text-[#1A1A1A]">
                                Phone & WhatsApp
                            </h2>
                            <p className="mt-2 text-xs font-light text-[#777777]">
                                Available daily from 10:00 AM to 10:00 PM (GMT+6)
                            </p>
                        </div>
                        <div className="mt-8 space-y-3">
                            <a
                                href="tel:+8801700000000"
                                className="block text-sm font-medium tracking-wider text-[#1A1A1A] hover:text-[#B89047] transition-colors"
                            >
                                +880 1700-000000
                            </a>
                            <a
                                href="https://wa.me/8801700000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block border border-[#B89047]/40 bg-[#FDFBF7] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B89047] hover:bg-[#B89047] hover:text-white transition-all duration-200"
                            >
                                Chat on WhatsApp →
                            </a>
                        </div>
                    </div>

                    {/* Email Support */}
                    <div className="border border-[#EAE5DB] bg-white p-8 text-center flex flex-col justify-between transition-all duration-300 hover:border-[#B89047]/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B89047]">
                                Client Desk
                            </span>
                            <h2 className="mt-2 font-serif text-xl tracking-wide uppercase text-[#1A1A1A]">
                                Email Concierge
                            </h2>
                            <p className="mt-2 text-xs font-light text-[#777777]">
                                For general support, corporate orders, and exchanges
                            </p>
                        </div>
                        <div className="mt-8">
                            <a
                                href="mailto:support@nusratpunjabi.com"
                                className="text-sm font-medium tracking-wider text-[#B89047] underline underline-offset-4 hover:text-[#9B7735] transition-colors"
                            >
                                support@nusratpunjabi.com
                            </a>
                            <p className="mt-2 text-[11px] text-[#888888]">
                                Average response time: within 12 hours
                            </p>
                        </div>
                    </div>

                    {/* Physical Showroom & Studio */}
                    <div className="border border-[#EAE5DB] bg-white p-8 text-center flex flex-col justify-between transition-all duration-300 hover:border-[#B89047]/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B89047]">
                                Atelier & Dispatch
                            </span>
                            <h2 className="mt-2 font-serif text-xl tracking-wide uppercase text-[#1A1A1A]">
                                Dhaka Studio
                            </h2>
                            <p className="mt-2 text-xs font-light text-[#777777]">
                                Product pick-ups, fittings, and direct order fulfillment
                            </p>
                        </div>
                        <div className="mt-8">
                            <p className="text-xs font-medium leading-relaxed tracking-wider text-[#333333]">
                                House 12, Road 04, Sector 03,
                                <br />
                                Uttara, Dhaka - 1230, Bangladesh
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form and Map Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Inquiry Form */}
                    <div className="border border-[#EAE5DB] bg-white p-8 sm:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.02)] lg:col-span-7">
                        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#B89047]">
                            Message The Atelier
                        </span>
                        <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-light uppercase tracking-wider text-[#1A1A1A]">
                            Send An Inquiry
                        </h2>
                        <p className="mt-2 text-xs font-light tracking-wide text-[#777777]">
                            Complete the form below and our client management team will be in touch shortly.
                        </p>

                        {submitted ? (
                            <div className="mt-10 border border-[#B89047] bg-[#FDFBF7] p-8 text-center">
                                <span className="font-serif text-2xl text-[#B89047]">✓</span>
                                <h3 className="mt-3 font-serif text-lg tracking-wide uppercase text-[#1A1A1A]">
                                    Inquiry Received
                                </h3>
                                <p className="mt-2 text-xs font-light text-[#666666]">
                                    Thank you for reaching out. A representative will contact you via phone or email shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 border border-[#B89047] px-6 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B89047] hover:bg-[#B89047] hover:text-white transition-all"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div>
                                    <label className="block text-[11px] font-medium tracking-[0.2em] uppercase text-[#444444] mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Asif Ahmed"
                                        className="h-12 w-full border border-[#EAE5DB] bg-[#FAFAF8] px-4 text-xs text-[#1A1A1A] outline-none transition-colors focus:border-[#B89047] focus:bg-white"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[11px] font-medium tracking-[0.2em] uppercase text-[#444444] mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="01XXXXXXXXX"
                                            className="h-12 w-full border border-[#EAE5DB] bg-[#FAFAF8] px-4 text-xs text-[#1A1A1A] outline-none transition-colors focus:border-[#B89047] focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium tracking-[0.2em] uppercase text-[#444444] mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="name@example.com"
                                            className="h-12 w-full border border-[#EAE5DB] bg-[#FAFAF8] px-4 text-xs text-[#1A1A1A] outline-none transition-colors focus:border-[#B89047] focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium tracking-[0.2em] uppercase text-[#444444] mb-2">
                                        Subject / Order Reference
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="e.g. Size Exchange / Order Status Inquiry"
                                        className="h-12 w-full border border-[#EAE5DB] bg-[#FAFAF8] px-4 text-xs text-[#1A1A1A] outline-none transition-colors focus:border-[#B89047] focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium tracking-[0.2em] uppercase text-[#444444] mb-2">
                                        Message Details *
                                    </label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Write your inquiry or notes here..."
                                        className="w-full border border-[#EAE5DB] bg-[#FAFAF8] p-4 text-xs text-[#1A1A1A] outline-none transition-colors focus:border-[#B89047] focus:bg-white"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full border border-[#B89047] bg-[#B89047] py-4 text-[11px] font-semibold tracking-[0.25em] uppercase text-white transition-all duration-300 hover:bg-[#9B7735]"
                                >
                                    Submit Inquiry
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Map & Social Channels */}
                    <div className="flex flex-col gap-8 lg:col-span-5">
                        {/* Google Maps Container */}
                        <div className="border border-[#EAE5DB] bg-white p-4 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                            <span className="mb-3 block px-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1A1A1A]">
                                Studio Location
                            </span>
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE6DC]">
                                <iframe
                                    title="Nusrat Atelier Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700318683568!2d90.3842539!3d23.8674404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c421715e45a7%3A0xda098b1ef38a0a9c!2sSector%203%2C%20Uttara%2C%20Dhaka%201230!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full grayscale contrast-125 opacity-90"
                                />
                            </div>
                        </div>

                        {/* Social Media Connections */}
                        <div className="border border-[#EAE5DB] bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B89047]">
                                Social Media
                            </span>
                            <h3 className="mt-1 font-serif text-xl tracking-wide uppercase text-[#1A1A1A]">
                                Follow Our Stories
                            </h3>
                            <p className="mt-2 text-xs font-light text-[#777777]">
                                Discover seasonal releases, campaign teasers, and exclusive capsule collections.
                            </p>

                            <div className="mt-6 space-y-3">
                                <a
                                    href="https://facebook.com/nusratpanjabi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between border border-[#EAE5DB] bg-[#FAFAF8] p-4 text-xs tracking-wider transition-all hover:border-[#B89047] hover:bg-white"
                                >
                                    <span className="font-medium text-[#1A1A1A] uppercase tracking-[0.15em] text-[11px]">
                                        Facebook
                                    </span>
                                    <span className="text-[11px] text-[#B89047]">@nusratpanjabi →</span>
                                </a>

                                <a
                                    href="https://instagram.com/wearpaisle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between border border-[#EAE5DB] bg-[#FAFAF8] p-4 text-xs tracking-wider transition-all hover:border-[#B89047] hover:bg-white"
                                >
                                    <span className="font-medium text-[#1A1A1A] uppercase tracking-[0.15em] text-[11px]">
                                        Instagram
                                    </span>
                                    <span className="text-[11px] text-[#B89047]">@wearpaisle →</span>
                                </a>

                                <a
                                    href="https://wa.me/8801700000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between border border-[#EAE5DB] bg-[#FAFAF8] p-4 text-xs tracking-wider transition-all hover:border-[#B89047] hover:bg-white"
                                >
                                    <span className="font-medium text-[#1A1A1A] uppercase tracking-[0.15em] text-[11px]">
                                        WhatsApp Concierge
                                    </span>
                                    <span className="text-[11px] text-[#B89047]">Direct Chat →</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Editorial Footer */}
            <footer className="border-t border-[#EAE5DB] bg-white py-10 text-center text-xs text-[#777777]">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="font-serif text-lg tracking-[0.2em] text-[#1A1A1A] mb-4">
                        NUSRAT
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-[11px] font-medium tracking-[0.18em] uppercase text-[#555555]">
                        <Link href="/privacy-policy" className="hover:text-[#B89047] transition-colors">
                            Privacy Policy
                        </Link>
                        <span>•</span>
                        <Link href="/terms" className="hover:text-[#B89047] transition-colors">
                            Terms & Conditions
                        </Link>
                        <span>•</span>
                        <Link href="/refund-policy" className="hover:text-[#B89047] transition-colors">
                            Return & Refund
                        </Link>
                        <span>•</span>
                        <Link href="/contact" className="hover:text-[#B89047] transition-colors">
                            Contact
                        </Link>
                    </div>
                    <p className="mt-6 text-[10px] tracking-[0.2em] uppercase text-[#999999]">
                        © 2026 NUSRAT. Fashion that stands the test of time.
                    </p>
                </div>
            </footer>
        </div>
    );
}