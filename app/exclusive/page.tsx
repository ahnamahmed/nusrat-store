// app/exclusive/page.tsx
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

interface ProductItem {
    id: string;
    name: string;
    subtitle: string;
    image: string;
    price: number;
    originalPrice: number;
}

const PRODUCTS: ProductItem[] = [
    {
        id: "nusrat-white",
        name: "Nusrat Embroidery White",
        subtitle: "Design 01",
        image: "/products/embroidery-white-3.jpg",
        price: 1550,
        originalPrice: 1950,
    },
    {
        id: "nusrat-blue",
        name: "Nusrat Embroidery Blue",
        subtitle: "Design 02",
        image: "/products/embroidery-blue-3.jpg",
        price: 1550,
        originalPrice: 1950,
    },
    {
        id: "nusrat-maroon",
        name: "Nusrat Embroidery Maroon",
        subtitle: "Design 03",
        image: "/products/embroidery-maroon-3.jpg",
        price: 1550,
        originalPrice: 1950,
    },
];

const SIZES = ["M (৪০)", "L (৪২)", "XL (৪৪)", "XXL (৪৬)"];

export default function ExclusiveFunnelPage() {
    const formRef = useRef<HTMLDivElement>(null);

    const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
    const [selectedSize, setSelectedSize] = useState<string>("L (৪২)");
    const [quantity, setQuantity] = useState<number>(1);
    const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">("inside");

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [eventId] = useState(() => "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
    const [hasTrackedCheckout, setHasTrackedCheckout] = useState(false);

    const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
    const deliveryCharge = deliveryArea === "inside" ? 80 : 110;
    const subtotal = selectedProduct.price * quantity;
    const grandTotal = subtotal + deliveryCharge;

    const scrollToForm = (productId?: string) => {
        if (productId) setSelectedProductId(productId);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const trackInitiateCheckout = () => {
        if (!hasTrackedCheckout) {
            setHasTrackedCheckout(true);
            if (typeof window !== "undefined" && (window as any).fbq) {
                (window as any).fbq("track", "InitiateCheckout", {
                    content_name: selectedProduct.name,
                    currency: "BDT",
                    value: subtotal,
                });
            }
        }
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        const phoneRegex = /^01[3-9]\d{8}$/;
        if (!phoneRegex.test(customerPhone.trim())) {
            setErrorMessage("অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)");
            setIsSubmitting(false);
            return;
        }

        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq(
                "track",
                "Purchase",
                {
                    content_name: selectedProduct.name,
                    currency: "BDT",
                    value: grandTotal,
                },
                { eventID: eventId }
            );
        }

        try {
            const payload = {
                eventId,
                productName: selectedProduct.name,
                size: selectedSize,
                quantity,
                price: selectedProduct.price,
                deliveryCharge,
                total: grandTotal,
                customer: {
                    name: customerName,
                    phone: customerPhone,
                    address: customerAddress,
                    area: deliveryArea === "inside" ? "Inside Dhaka" : "Outside Dhaka",
                },
                source: "High-Converting Sales Funnel",
            };

            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setOrderComplete(true);
            } else {
                setErrorMessage("অর্ডার সম্পন্ন করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
            }
        } catch {
            setErrorMessage("নেটওয়ার্ক সমস্যা। দয়া করে ইন্টারনেট সংযোগ চেক করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFAF6] font-bengali text-[#121212] selection:bg-gold selection:text-black">
            {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
                <>
                    <Script id="meta-pixel-init" strategy="afterInteractive">
                        {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
                    </Script>
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
                            alt=""
                        />
                    </noscript>
                </>
            )}

            <main className="mx-auto max-w-[880px] px-3.5 py-6 sm:px-6 sm:py-10">
                {orderComplete ? (
                    <div className="my-10 border-2 border-gold bg-white p-6 sm:p-8 text-center shadow-lg">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">
                            ✓
                        </div>
                        <h1 className="mt-4 text-xl sm:text-2xl font-bold text-[#121212]">
                            আপনার অর্ডারটি সফল হয়েছে!
                        </h1>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#4b4b4b]">
                            ধন্যবাদ <strong>{customerName}</strong>! আমাদের প্রতিনিধি খুব দ্রুত কল করে অর্ডার কনফার্ম করবেন।
                        </p>
                        <div className="mx-auto mt-5 max-w-sm rounded border border-[#ededed] bg-[#fafafa] p-3 text-left text-xs leading-relaxed">
                            <p>আইটেম: <strong>{selectedProduct.name}</strong></p>
                            <p>সাইজ: <strong>{selectedSize}</strong> ({quantity} টি)</p>
                            <p>এলাকা: <strong>{deliveryArea === "inside" ? "ঢাকা সিটি (৳৭০)" : "ঢাকার বাইরে (৳১৩০)"}</strong></p>
                            <p className="mt-2 text-xs font-bold text-gold">
                                সর্বমোট প্রদেয়: ৳{grandTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি)
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="mt-5 inline-block rounded bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#121212] hover:bg-gold-hover hover:text-white"
                        >
                            হোমপেজে ফিরে যান
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 sm:gap-12">
                        {/* Hero Announcement */}
                        <section className="flex flex-col items-center text-center">
                            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-gold uppercase">
                                NUSRAT EMBROIDERY EDITION
                            </span>
                            <h1 className="mt-3 text-xl sm:text-3xl font-bold leading-snug text-[#121212]">
                                ১০০% জ্যাকার্ড কটন পাঞ্জাবি <br />
                                <span className="text-gold">অভিজ্ঞ কারিগরের নিখুঁত এমব্রয়ডারি</span>
                            </h1>
                            <p className="mt-1.5 text-xs text-[#666666]">
                                Premium Fabric • Refined Embroidery • Double Threadwork
                            </p>

                            {/* Folded Panjabi Box - Square Format */}
                            <div className="relative mt-4 aspect-square w-full max-w-[280px] overflow-hidden rounded-xl border border-gold/30 bg-white p-2 shadow-md">
                                <div className="relative h-full w-full overflow-hidden rounded-lg">
                                    <Image
                                        src="/products/embroidery-collection.jpg"
                                        alt="Nusrat Panjabi Showcase"
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 100vw, 480px"
                                        className="object-cover object-center"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => scrollToForm()}
                                className="mt-4 inline-flex items-center justify-center rounded-full border border-gold bg-gold px-6 py-2 text-[11px] font-bold tracking-wider text-[#121212] uppercase shadow-xs transition-all hover:bg-gold-hover hover:text-white"
                            >
                                অর্ডার করতে নিচে ক্লিক করুন
                            </button>
                        </section>

                        {/* Why Us Cards */}
                        <section className="flex flex-col items-center text-center">
                            <h2 className="text-lg sm:text-2xl font-bold text-[#121212]">
                                কেন আমাদের পাঞ্জাবি অন্যদের চেয়ে আলাদা?
                            </h2>
                            <p className="mt-1 text-[11px] text-[#777777]">
                                আমাদের প্রতিটি পাঞ্জাবি নিজস্ব দক্ষ কারিগর দ্বারা তৈরি হয়, যার ফলে প্রতিটি সেলাই আর ফিনিশিং থাকে নিখুঁত
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 w-full">
                                {/* Card 1: Premium Fabric (Complete Textile Weave Swatch) */}
                                <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-white p-4 shadow-2xs">
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                                            <line x1="3.5" y1="9" x2="20.5" y2="9" strokeLinecap="round" />
                                            <line x1="3.5" y1="15" x2="20.5" y2="15" strokeLinecap="round" />
                                            <line x1="9" y1="3.5" x2="9" y2="20.5" strokeLinecap="round" />
                                            <line x1="15" y1="3.5" x2="15" y2="20.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xs font-bold text-[#121212]">Premium Fabric</h3>
                                    <p className="mt-1 text-[11px] leading-relaxed text-[#666666]">
                                        উন্নতমানের কটন ফেব্রিক্স যা আরামদায়ক পরিধান নিশ্চিত করে
                                    </p>
                                </div>

                                {/* Card 2: Artisan Handwork (Continuous Needle & Embroidery Thread) */}
                                <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-white p-4 shadow-2xs">
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            {/* Solid needle shaft */}
                                            <line x1="4" y1="20" x2="15" y2="9" strokeLinecap="round" />
                                            {/* Needle head & eye loop */}
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l3-3a1.5 1.5 0 0 1 2.12 2.12l-3 3" />
                                            <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
                                            {/* Continuous embroidery thread flowing from needle eye */}
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.2 6.8C20 3.5 15 2 12 4.5S8.5 9 11 11.5s5 2.5 4 5.5-3.5 3.5-6.5 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xs font-bold text-[#121212]">Refined Embroidery</h3>
                                    <p className="mt-1 text-[11px] leading-relaxed text-[#666666]">
                                        অভিজ্ঞ কারিগরের নিখুঁত এমব্রয়ডারি যা আপনাকে দেবে পরিপাটি লুক
                                    </p>
                                </div>

                                {/* Card 3: Semi-Slim Comfort Fit (Fully Connected Tailor Scissors) */}
                                <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-white p-4 shadow-2xs">
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            {/* Scissor handles */}
                                            <circle cx="6" cy="6" r="3" />
                                            <circle cx="6" cy="18" r="3" />
                                            {/* Full blade 1 */}
                                            <line x1="20" y1="4" x2="8.12" y2="15.88" strokeLinecap="round" />
                                            {/* Full blade 2 crossing through pivot */}
                                            <line x1="8.12" y1="8.12" x2="12" y2="12" strokeLinecap="round" />
                                            <line x1="14.47" y1="14.48" x2="20" y2="20" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xs font-bold text-[#121212]">Comfort Finishing</h3>
                                    <p className="mt-1 text-[11px] leading-relaxed text-[#666666]">
                                        সাইজ প্যাটার্ন অনুসারে নিখুঁত কাটিং ও ফিনিশিং
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Product Showcase */}
                        <section className="flex flex-col items-center">
                            <h2 className="text-lg sm:text-2xl font-bold text-[#121212]">
                                আমাদের এক্সক্লুসিভ কালেকশন
                            </h2>
                            <p className="mt-1 text-[11px] text-[#777777]">
                                পছন্দের ডিজাইনটি বেছে নিয়ে সরাসরি অর্ডার করুন
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 w-full">
                                {PRODUCTS.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="flex flex-col overflow-hidden rounded-lg border border-[#ededed] bg-white shadow-2xs transition-all hover:border-gold"
                                    >
                                        <div className="relative aspect-square w-full bg-[#f7f7f7]">
                                            <span className="absolute top-2 right-2 z-10 rounded bg-[#121212] px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                                                {prod.subtitle}
                                            </span>
                                            <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between p-3.5">
                                            <div>
                                                <h3 className="text-xs font-bold text-[#121212]">{prod.name}</h3>
                                                <div className="mt-1 flex items-baseline gap-2">
                                                    <span className="text-base font-bold text-gold">৳{prod.price}</span>
                                                    <span className="text-[11px] text-[#8f8f8f] line-through">৳{prod.originalPrice}</span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => scrollToForm(prod.id)}
                                                className="mt-3 w-full rounded border border-gold bg-gold py-2 text-[11px] font-bold uppercase tracking-wider text-[#121212] hover:bg-gold-hover hover:text-white"
                                            >
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Size Guide Section */}
                        <section className="flex flex-col items-center">
                            <div className="text-center">
                                <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-gold">
                                    Size Guide
                                </span>
                                <h2 className="mt-2 text-lg sm:text-2xl font-bold text-[#121212]">
                                    পাঞ্জাবি সাইজ চার্ট (Size Chart)
                                </h2>
                                <p className="mt-1 text-[11px] text-[#777777]">
                                    আপনার সঠিক ফিটিংস নিশ্চিত করতে নিচের পরিমাপগুলো দেখে নিন
                                </p>
                            </div>

                            <div className="mt-5 w-full max-w-2xl rounded-xl border border-[#ededed] bg-white p-4 shadow-2xs sm:p-6">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="rounded-full border border-gold/30 bg-[#FAF7F0] px-3 py-1 text-[10px] font-semibold text-gold">
                                        All measurements in inches (ইঞ্চি)
                                    </span>
                                    <span className="text-[10px] text-[#999999]">Regular Semi-Slim Fit</span>
                                </div>

                                <table className="w-full text-center text-xs">
                                    <thead>
                                        <tr className="border-b border-[#EAE5DB] bg-[#FAF8F5] text-[11px] font-bold text-[#121212]">
                                            <th className="py-2.5 px-3 text-left">Size</th>
                                            <th className="py-2.5 px-2">Length</th>
                                            <th className="py-2.5 px-2">Chest</th>
                                            <th className="py-2.5 px-2">Shoulder</th>
                                            <th className="py-2.5 px-2">Sleeve</th>
                                            <th className="py-2.5 px-2">Collar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F0ECE1] text-[#444444]">
                                        <tr className="transition-colors hover:bg-gold/5">
                                            <td className="py-2.5 px-3 text-left font-bold text-[#121212]">S</td>
                                            <td className="py-2.5 px-2">40</td>
                                            <td className="py-2.5 px-2">40</td>
                                            <td className="py-2.5 px-2">16</td>
                                            <td className="py-2.5 px-2">24</td>
                                            <td className="py-2.5 px-2">16</td>
                                        </tr>
                                        <tr className="bg-[#FCFAF6] transition-colors hover:bg-gold/5">
                                            <td className="py-2.5 px-3 text-left font-bold text-[#121212]">M</td>
                                            <td className="py-2.5 px-2">42</td>
                                            <td className="py-2.5 px-2">42</td>
                                            <td className="py-2.5 px-2">16.5</td>
                                            <td className="py-2.5 px-2">24.5</td>
                                            <td className="py-2.5 px-2">17</td>
                                        </tr>
                                        <tr className="transition-colors hover:bg-gold/5">
                                            <td className="py-2.5 px-3 text-left font-bold text-[#121212]">L</td>
                                            <td className="py-2.5 px-2">44</td>
                                            <td className="py-2.5 px-2">44</td>
                                            <td className="py-2.5 px-2">17</td>
                                            <td className="py-2.5 px-2">25</td>
                                            <td className="py-2.5 px-2">17</td>
                                        </tr>
                                        <tr className="bg-[#FCFAF6] transition-colors hover:bg-gold/5">
                                            <td className="py-2.5 px-3 text-left font-bold text-[#121212]">XL</td>
                                            <td className="py-2.5 px-2">46</td>
                                            <td className="py-2.5 px-2">46</td>
                                            <td className="py-2.5 px-2">18</td>
                                            <td className="py-2.5 px-2">25.5</td>
                                            <td className="py-2.5 px-2">17.5</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="mt-3 text-[10px] text-[#777777]">
                                    * আপনি সাধারণত যে সাইজের রেগুলার শার্ট বা পাঞ্জাবি পরেন, সেই সাইজটি বেছে নিন। সাইজে সমস্যা হলে ২ দিনে এক্সচেঞ্জ সুবিধা রয়েছে।
                                </p>
                            </div>
                        </section>

                        {/* Gift Banner */}
                        <section className="rounded-lg border border-gold/40 bg-gradient-to-b from-gold/10 to-gold/5 p-4 text-center sm:p-6">
                            <h3 className="text-base sm:text-lg font-bold text-[#121212]">
                                পাঞ্জাবির সাথে পাচ্ছেন সিগনেচার গিফট বক্স
                            </h3>
                            <p className="mt-1 text-[11px] text-[#555555]">
                                নিজেকে উপহার দিতে অথবা প্রিয়জনকে পাঠানোর জন্য প্রিমিয়াম প্যাকেজ
                            </p>
                            <div className="mt-3 inline-block rounded-full border border-gold/40 bg-white px-4 py-1 text-[11px] font-bold text-gold">
                                প্রতিটি অর্ডারের সাথে প্রিমিয়াম গিফট বক্স ফ্রি!
                            </div>
                        </section>

                        {/* Section 5: Trust Badges */}

                        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                            <div className="flex flex-col items-center rounded-xl border border-gold/15 bg-white p-4 text-center shadow-xs">

                                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">

                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75m0 3.75h4.5m-4.5 0v3.75m0 0h4.5" />

                                </svg>

                                <span className="mt-2 text-xs font-bold text-[#121212]">Home Delivery</span>

                                <span className="text-[10px] text-[#777777]">সারা বাংলাদেশে হোম ডেলিভারি</span>

                            </div>



                            <div className="flex flex-col items-center rounded-xl border border-gold/15 bg-white p-4 text-center shadow-xs">

                                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">

                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />

                                </svg>

                                <span className="mt-2 text-xs font-bold text-[#121212]">Parcel Check</span>

                                <span className="text-[10px] text-[#777777]">বক্স খুলে দেখে নেওয়ার সুযোগ</span>

                            </div>



                            <div className="flex flex-col items-center rounded-xl border border-gold/15 bg-white p-4 text-center shadow-xs">

                                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">

                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />

                                </svg>

                                <span className="mt-2 text-xs font-bold text-[#121212]">Size Exchange</span>

                                <span className="text-[10px] text-[#777777]">সাইজ সমস্যা হলে ২ দিনে এক্সচেঞ্জ</span>

                            </div>



                            <div className="flex flex-col items-center rounded-xl border border-gold/15 bg-white p-4 text-center shadow-xs">

                                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">

                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />

                                </svg>

                                <span className="mt-2 text-xs font-bold text-[#121212]">Direct Support</span>

                                <span className="text-[10px] text-[#777777]">২৪/৭ কল সাপোর্ট</span>

                            </div>

                        </section>

                        {/* Form Section */}
                        <section ref={formRef} className="rounded-xl border border-gold/60 bg-white p-4 shadow-xl sm:p-7">
                            <div className="border-b border-[#ededed] pb-3 text-center">
                                <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-gold">
                                    অর্ডার করতে ফর্মটি পূরণ করুন
                                </h2>
                                <p className="mt-1 text-[11px] text-[#777777]">
                                    সঠিক নাম, মোবাইল নম্বর ও সম্পূর্ণ ঠিকানা প্রদান করুন
                                </p>
                            </div>

                            <form onSubmit={handleOrderSubmit} onFocus={trackInitiateCheckout} className="mt-5 flex flex-col gap-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-start">

                                    {/* Left Column: Product Selection */}
                                    <div className="flex flex-col gap-3 sm:col-span-5 border-b border-[#ededed] pb-5 sm:border-b-0 sm:border-r sm:pr-5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#121212]">
                                            আপনার পছন্দ
                                        </span>

                                        <div className="flex flex-col gap-2">
                                            {PRODUCTS.map((prod) => {
                                                const isChecked = selectedProductId === prod.id;
                                                return (
                                                    <div
                                                        key={prod.id}
                                                        onClick={() => setSelectedProductId(prod.id)}
                                                        className={`flex cursor-pointer items-center justify-between rounded-md border p-2.5 transition-all ${isChecked
                                                            ? "border-gold bg-gold/10 ring-1 ring-gold"
                                                            : "border-[#ededed] bg-white hover:border-gold/40"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            <input
                                                                type="radio"
                                                                checked={isChecked}
                                                                onChange={() => setSelectedProductId(prod.id)}
                                                                className="h-3.5 w-3.5 accent-gold"
                                                            />
                                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-[#f5f5f5]">
                                                                <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                                                            </div>
                                                            <div className="text-[11px]">
                                                                <p className="font-bold text-[#121212]">{prod.name}</p>
                                                                <p className="text-gold font-semibold">৳{prod.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-1 flex flex-col gap-1.5">
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#121212]">
                                                সাইজ নির্বাচন করুন:
                                            </label>
                                            <div className="grid grid-cols-2 gap-1.5">
                                                {SIZES.map((size) => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`rounded border py-2 text-center text-xs transition-all ${selectedSize === size
                                                            ? "border-gold bg-gold text-[#121212] font-bold shadow-2xs"
                                                            : "border-[#ededed] bg-[#fafafa] text-[#4b4b4b]"
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-1 flex items-center justify-between rounded border border-[#ededed] bg-[#fafafa] p-2.5">
                                            <span className="text-[11px] font-semibold text-[#121212]">পরিমাণ (Quantity):</span>
                                            <div className="flex items-center gap-2.5">
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                                    className="flex h-7 w-7 items-center justify-center rounded border border-[#ededed] bg-white text-xs font-bold text-[#121212] hover:bg-gold hover:text-white"
                                                >
                                                    -
                                                </button>
                                                <span className="w-4 text-center text-xs font-bold text-[#121212]">{quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity((prev) => prev + 1)}
                                                    className="flex h-7 w-7 items-center justify-center rounded border border-[#ededed] bg-white text-xs font-bold text-[#121212] hover:bg-gold hover:text-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Customer Info */}
                                    <div className="flex flex-col gap-3.5 sm:col-span-7">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#121212]">
                                            বিলিং এর তথ্য
                                        </span>

                                        <div>
                                            <label className="mb-1 block text-[11px] font-medium text-[#4b4b4b]">
                                                আপনার নাম *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                placeholder="আপনার পুরো নাম লিখুন"
                                                className="h-10 w-full rounded border border-[#ededed] bg-[#fafafa] px-3 text-xs text-[#121212] outline-none focus:border-gold focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-[11px] font-medium text-[#4b4b4b]">
                                                মোবাইল নম্বর *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                placeholder="১১ ডিজিটের মোবাইল নম্বর দিন (017...)"
                                                className="h-10 w-full rounded border border-[#ededed] bg-[#fafafa] px-3 text-xs text-[#121212] outline-none focus:border-gold focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-[11px] font-medium text-[#4b4b4b]">
                                                সম্পূর্ণ ডেলিভারি ঠিকানা *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={customerAddress}
                                                onChange={(e) => setCustomerAddress(e.target.value)}
                                                placeholder="বাসা নম্বর, রোড, এলাকা, জেলা"
                                                className="h-10 w-full rounded border border-[#ededed] bg-[#fafafa] px-3 text-xs text-[#121212] outline-none focus:border-gold focus:bg-white"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 pt-1">
                                            <label className="text-[11px] font-medium text-[#4b4b4b]">ডেলিভারি চার্জ</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setDeliveryArea("inside")}
                                                    className={`rounded border p-2 text-center text-xs transition-all ${deliveryArea === "inside"
                                                        ? "border-gold bg-gold/15 font-bold text-[#121212] ring-1 ring-gold"
                                                        : "border-[#ededed] bg-[#fafafa] text-[#4b4b4b]"
                                                        }`}
                                                >
                                                    <div>ঢাকা সিটির ভেতরে</div>
                                                    <div className="text-gold font-bold">৳৮০</div>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeliveryArea("outside")}
                                                    className={`rounded border p-2 text-center text-xs transition-all ${deliveryArea === "outside"
                                                        ? "border-gold bg-gold/15 font-bold text-[#121212] ring-1 ring-gold"
                                                        : "border-[#ededed] bg-[#fafafa] text-[#4b4b4b]"
                                                        }`}
                                                >
                                                    <div>ঢাকা সিটির বাইরে</div>
                                                    <div className="text-gold font-bold">৳১১০</div>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="rounded border border-gold/30 bg-gold/10 p-2.5 text-[11px] text-[#4b4b4b]">
                                            <span className="font-bold text-[#121212]">পেমেন্ট পদ্ধতি:</span> ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ করুন)
                                        </div>

                                        <div className="rounded border border-[#ededed] bg-[#fafafa] p-3 text-xs space-y-1">
                                            <div className="flex justify-between text-[#777777]">
                                                <span>সাবটোটাল:</span>
                                                <span>৳{subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[#777777]">
                                                <span>ডেলিভারি চার্জ:</span>
                                                <span>৳{deliveryCharge}</span>
                                            </div>
                                            <div className="flex justify-between border-t border-[#ededed] pt-1.5 text-xs font-bold text-[#121212]">
                                                <span>সর্বমোট:</span>
                                                <span className="text-gold text-sm">৳{grandTotal.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {errorMessage && (
                                            <p className="text-xs text-red-500">{errorMessage}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="mt-1 flex h-12 w-full cursor-pointer items-center justify-center rounded border border-gold bg-gold text-xs font-bold uppercase tracking-wider text-[#121212] shadow-md transition-all hover:bg-gold-hover hover:text-white disabled:opacity-50"
                                        >
                                            {isSubmitting ? "প্রসেসিং হচ্ছে..." : `অর্ডার কনফার্ম করুন • ৳${grandTotal.toLocaleString()}`}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-[#ededed] bg-white py-6 text-center text-xs text-[#8f8f8f]">
                <div className="mt-2 flex justify-center gap-1 text-[#555]">
                    <Link href="/privacy-policy" className="hover:text-black hover:underline">Privacy Policy</Link>
                    <span>•</span>
                    <Link href="/terms-and-conditions" className="hover:text-black hover:underline">Terms & Conditions</Link>
                    <span>•</span>
                    <Link href="/returns-and-exchanges" className="hover:text-black hover:underline">Return & Refund</Link>
                    <span>•</span>
                    <Link href="/contact" className="hover:text-black hover:underline">Contact</Link>
                </div>
                <p className="mt-2">
                    সরাসরি যোগাযোগ জন্য কল করুন:{" "}
                    <a href="tel:+8801924272664" className="text-gold font-semibold underline">
                        +8801924272664
                    </a>
                </p>
            </footer>
        </div>
    );
}