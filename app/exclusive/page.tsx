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
        image: "/products/jubba-white-front.jpg",
        price: 1950,
        originalPrice: 2450,
    },
    {
        id: "nusrat-blue",
        name: "Nusrat Embroidery Blue",
        subtitle: "Design 02",
        image: "/products/jubba-deepblue-front.jpg",
        price: 1950,
        originalPrice: 2450,
    },
    {
        id: "nusrat-maroon",
        name: "Nusrat Embroidery Maroon",
        subtitle: "Design 03",
        image: "/products/jubba-black-front.jpg",
        price: 1950,
        originalPrice: 2450,
    },
];

const SIZES = ["M (৪০)", "L (৪২)", "XL (৪৪)", "XXL (৪৬)"];

export default function ExclusiveFunnelPage() {
    const formRef = useRef<HTMLDivElement>(null);

    // Selection states
    const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
    const [selectedSize, setSelectedSize] = useState<string>("L (৪২)");
    const [quantity, setQuantity] = useState<number>(1);
    const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">("inside");

    // Customer inputs
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    // Tracking & submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [eventId] = useState(() => "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
    const [hasTrackedCheckout, setHasTrackedCheckout] = useState(false);

    const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
    const deliveryCharge = deliveryArea === "inside" ? 70 : 130;
    const subtotal = selectedProduct.price * quantity;
    const grandTotal = subtotal + deliveryCharge;

    const scrollToForm = (productId?: string) => {
        if (productId) setSelectedProductId(productId);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Browser Pixel: InitiateCheckout
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

    // Browser Pixel: Purchase + CAPI Deduplication dispatch
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

        // 1. Fire Browser-Side Purchase Event with matching eventID
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

        // 2. Submit to backend API route for CAPI and Telegram alert
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
        <div className="min-h-screen bg-[#FCFAF6] text-[#121212] selection:bg-gold selection:text-black">
            {/* Meta Pixel Base Code */}
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
            <main className="mx-auto max-w-[880px] px-4 py-8 sm:px-6">
                {orderComplete ? (
                    <div className="my-16 border-2 border-gold bg-white p-8 text-center shadow-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-3xl text-gold">
                            ✓
                        </div>
                        <h1 className="mt-5 font-serif-sc text-3xl font-bold text-[#121212]">
                            আপনার অর্ডারটি সফল হয়েছে!
                        </h1>
                        <p className="mt-2 text-sm text-[#4b4b4b]">
                            ধন্যবাদ <strong>{customerName}</strong>! আমাদের প্রতিনিধি খুব দ্রুত আপনার সাথে কল করে ঠিকানা কনফার্ম করবেন।
                        </p>
                        <div className="mx-auto mt-6 max-w-sm rounded border border-[#ededed] bg-[#fafafa] p-4 text-left text-xs leading-relaxed">
                            <p>আইটেম: <strong>{selectedProduct.name}</strong></p>
                            <p>সাইজ: <strong>{selectedSize}</strong> ({quantity} টি)</p>
                            <p>ডেলিভারি এলাকা: <strong>{deliveryArea === "inside" ? "ঢাকা সিটি (৳৭০)" : "ঢাকার বাইরে (৳১৩০)"}</strong></p>
                            <p className="mt-2 text-sm font-bold text-gold">
                                সর্বমোট প্রদেয়: ৳{grandTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি)
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="mt-6 inline-block rounded bg-gold px-8 py-3 text-xs font-bold tracking-wider text-[#121212] uppercase transition-colors hover:bg-gold-hover hover:text-white"
                        >
                            হোমপেজে ফিরে যান
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-12 sm:gap-16">
                        {/* Section 1: Hero Announcement */}
                        <section className="flex flex-col items-center text-center">
                            <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                                NUSRAT EMBROIDERY EDITION
                            </span>
                            <h1 className="mt-4 font-serif-sc text-3xl font-bold leading-tight text-[#121212] sm:text-5xl">
                                ১০০% জ্যাকার্ড কটন পাঞ্জাবি <br />
                                <span className="text-gold">অভিজ্ঞ কারিগরের নিখুঁত এমব্রয়ডারি</span>
                            </h1>
                            <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-[#666666]">
                                Refined Embroidery • Premium Fabric • Double Threadwork
                            </p>

                            {/* Folded Panjabi Box */}
                            <div className="relative mt-6 aspect-[16/10] w-full max-w-[620px] overflow-hidden rounded-2xl border-2 border-gold/30 bg-white p-2.5 shadow-lg">
                                <div className="relative h-full w-full overflow-hidden rounded-xl">
                                    <Image
                                        src="/products/jubba-black-front.jpg"
                                        alt="Nusrat Panjabi Showcase"
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => scrollToForm()}
                                className="mt-6 w-full max-w-[360px] rounded-lg border border-gold bg-gold py-4 text-sm font-bold tracking-widest text-[#121212] uppercase shadow-md transition-all hover:bg-gold-hover hover:text-white"
                            >
                                অর্ডার করতে নিচে ক্লিক করুন
                            </button>
                        </section>

                        {/* Section 2: Why Us Cards */}
                        <section className="flex flex-col items-center text-center">
                            <h2 className="font-serif-sc text-2xl font-bold text-[#121212] sm:text-3xl">
                                কেন আমাদের পাঞ্জাবি অন্যদের চেয়ে আলাদা?
                            </h2>
                            <p className="mt-1 text-xs text-[#777777]">
                                আমাদের প্রতিটি পাঞ্জাবি নিজস্ব দক্ষ কারিগর দ্বারা তৈরি হয়, যার ফলে প্রতিটি সেলাই আর ফিনিশিং থাকে নিখুঁত
                            </p>

                            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3 w-full">
                                <div className="flex flex-col items-center rounded-xl border border-gold/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m10.5 0a2.25 2.25 0 012.25 2.25v7.5A2.25 2.25 0 0118.75 21h-13.5A2.25 2.25 0 013 18.75v-7.5A2.25 2.25 0 015.25 9h13.5z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-3 text-sm font-bold text-[#121212]">Premium Jacquard Fabric</h3>
                                    <p className="mt-1 text-xs leading-relaxed text-[#666666]">
                                        ১০০% পিউর জ্যাকার্ড কটন, সারাদিন পরার উপযোগী ও সহজে কুঁচকায় না
                                    </p>
                                </div>

                                <div className="flex flex-col items-center rounded-xl border border-gold/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-3 text-sm font-bold text-[#121212]">Artisan Handwork</h3>
                                    <p className="mt-1 text-xs leading-relaxed text-[#666666]">
                                        অভিজ্ঞ কারিগরের হাতে নিখুঁত সূচিকর্ম যা ধোয়ার পরেও নতুনের মতো শক্ত থাকবে
                                    </p>
                                </div>

                                <div className="flex flex-col items-center rounded-xl border border-gold/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-3 text-sm font-bold text-[#121212]">Semi-Slim Comfort Fit</h3>
                                    <p className="mt-1 text-xs leading-relaxed text-[#666666]">
                                        দেশীয় বডি প্যাটার্ন অনুসারে নিখুঁত কাটিং ও ফিটিংস
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Product Showcase */}
                        <section className="flex flex-col items-center">
                            <h2 className="font-serif-sc text-2xl font-bold text-[#121212] sm:text-3xl">
                                আমাদের এক্সক্লুসিভ এমব্রয়ডারি কালেকশন
                            </h2>
                            <p className="mt-1 text-xs text-[#777777]">
                                আপনার পছন্দের ডিজাইনটি বেছে নিয়ে সরাসরি অর্ডার করুন
                            </p>

                            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full">
                                {PRODUCTS.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="flex flex-col overflow-hidden rounded-xl border border-[#ededed] bg-white shadow-sm transition-all hover:border-gold"
                                    >
                                        <div className="relative aspect-square w-full bg-[#f7f7f7]">
                                            <span className="absolute top-3 right-3 z-10 rounded bg-[#121212] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                                                {prod.subtitle}
                                            </span>
                                            <Image
                                                src={prod.image}
                                                alt={prod.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between p-4">
                                            <div>
                                                <h3 className="text-sm font-bold text-[#121212]">{prod.name}</h3>
                                                <div className="mt-1.5 flex items-baseline gap-2">
                                                    <span className="text-lg font-bold text-gold">৳{prod.price}</span>
                                                    <span className="text-xs text-[#8f8f8f] line-through">৳{prod.originalPrice}</span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => scrollToForm(prod.id)}
                                                className="mt-4 w-full rounded border border-gold bg-gold py-2.5 text-xs font-bold uppercase tracking-wider text-[#121212] transition-colors hover:bg-gold-hover hover:text-white"
                                            >
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 4: Gift Box Offer */}
                        <section className="rounded-xl border border-gold/40 bg-gradient-to-b from-gold/10 to-gold/5 p-6 text-center sm:p-8">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                            <h3 className="mt-3 font-serif-sc text-xl font-bold text-[#121212] sm:text-2xl">
                                পাঞ্জাবির সাথে পাচ্ছেন সিগনেচার গিফট বক্স
                            </h3>
                            <p className="mt-1 text-xs text-[#555555] sm:text-sm">
                                নিজেকে উপহার দিতে অথবা প্রিয়জনকে পাঠানোর জন্য এটি একটি প্রিমিয়াম প্যাকেজ
                            </p>
                            <div className="mt-4 inline-block rounded-full border border-gold/40 bg-white px-5 py-2 text-xs font-bold text-gold shadow-xs">
                                ★ প্রতিটি অর্ডারের সাথে প্রিমিয়াম আতর সম্পূর্ণ ফ্রি!
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
                                <span className="text-[10px] text-[#777777]">প্যাকেট খুলে দেখে নেওয়ার সুযোগ</span>
                            </div>

                            <div className="flex flex-col items-center rounded-xl border border-gold/15 bg-white p-4 text-center shadow-xs">
                                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <span className="mt-2 text-xs font-bold text-[#121212]">Size Exchange</span>
                                <span className="text-[10px] text-[#777777]">সাইজ সমস্যা হলে ৭ দিনে এক্সচেঞ্জ</span>
                            </div>

                            <div className="flex flex-col items-center rounded-xl border border-gold/15 bg-white p-4 text-center shadow-xs">
                                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                                <span className="mt-2 text-xs font-bold text-[#121212]">Direct Support</span>
                                <span className="text-[10px] text-[#777777]">২৪/৭ ফোন ও হোয়াটসঅ্যাপ সাপোর্ট</span>
                            </div>
                        </section>

                        {/* Section 6: Checkout Form with onFocus InitiateCheckout */}
                        <section ref={formRef} className="rounded-2xl border-2 border-gold/60 bg-white p-5 shadow-2xl sm:p-8">
                            <div className="border-b border-[#ededed] pb-4 text-center">
                                <h2 className="font-serif-sc text-2xl font-bold uppercase tracking-wider text-gold sm:text-3xl">
                                    অর্ডার করতে নিচের ফর্মটি পূরণ করুন
                                </h2>
                                <p className="mt-1 text-xs text-[#777777]">
                                    দয়া করে সঠিক নাম, মোবাইল নম্বর ও সম্পূর্ণ ঠিকানা প্রদান করুন
                                </p>
                            </div>

                            <form onSubmit={handleOrderSubmit} onFocus={trackInitiateCheckout} className="mt-6 flex flex-col gap-8">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-12 sm:items-start">

                                    {/* Left Column: Product & Size Chooser (5 cols) */}
                                    <div className="flex flex-col gap-4 sm:col-span-5 border-b border-[#ededed] pb-6 sm:border-b-0 sm:border-r sm:pr-6">
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                                            আপনার পছন্দ
                                        </span>

                                        {/* Product Selector Radios */}
                                        <div className="flex flex-col gap-2">
                                            {PRODUCTS.map((prod) => {
                                                const isChecked = selectedProductId === prod.id;
                                                return (
                                                    <div
                                                        key={prod.id}
                                                        onClick={() => setSelectedProductId(prod.id)}
                                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-all ${isChecked
                                                            ? "border-gold bg-gold/10 ring-1 ring-gold"
                                                            : "border-[#ededed] bg-white hover:border-gold/40"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="radio"
                                                                checked={isChecked}
                                                                onChange={() => setSelectedProductId(prod.id)}
                                                                className="h-4 w-4 accent-gold"
                                                            />
                                                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-[#f5f5f5]">
                                                                <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                                                            </div>
                                                            <div className="text-xs">
                                                                <p className="font-bold text-[#121212]">{prod.name}</p>
                                                                <p className="text-gold font-semibold">৳{prod.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Size Selector */}
                                        <div className="mt-2 flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                                                সাইজ নির্বাচন করুন:
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {SIZES.map((size) => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`rounded-md border py-2.5 text-center text-xs transition-all ${selectedSize === size
                                                            ? "border-gold bg-gold text-[#121212] font-bold shadow-xs"
                                                            : "border-[#ededed] bg-[#fafafa] text-[#4b4b4b] hover:border-gold/40"
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="mt-2 flex items-center justify-between rounded-lg border border-[#ededed] bg-[#fafafa] p-3">
                                            <span className="text-xs font-semibold text-[#121212]">পরিমাণ (Quantity):</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                                    className="flex h-8 w-8 items-center justify-center rounded border border-[#ededed] bg-white text-sm font-bold text-[#121212] transition-colors hover:bg-gold hover:text-white"
                                                >
                                                    -
                                                </button>
                                                <span className="w-5 text-center text-sm font-bold text-[#121212]">{quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity((prev) => prev + 1)}
                                                    className="flex h-8 w-8 items-center justify-center rounded border border-[#ededed] bg-white text-sm font-bold text-[#121212] transition-colors hover:bg-gold hover:text-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Customer Details & Summary (7 cols) */}
                                    <div className="flex flex-col gap-4 sm:col-span-7">
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                                            বিলিং এর তথ্য
                                        </span>

                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-[#4b4b4b]">
                                                আপনার নাম *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                placeholder="আপনার পুরো নাম লিখুন"
                                                className="h-11 w-full rounded-md border border-[#ededed] bg-[#fafafa] px-3.5 text-xs text-[#121212] outline-none transition-colors focus:border-gold focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-[#4b4b4b]">
                                                মোবাইল নম্বর *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                placeholder="১১ ডিজিটের মোবাইল নম্বর দিন (017...)"
                                                className="h-11 w-full rounded-md border border-[#ededed] bg-[#fafafa] px-3.5 text-xs text-[#121212] outline-none transition-colors focus:border-gold focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-[#4b4b4b]">
                                                সম্পূর্ণ ডেলিভারি ঠিকানা *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={customerAddress}
                                                onChange={(e) => setCustomerAddress(e.target.value)}
                                                placeholder="বাসা/হোল্ডিং নম্বর, রোড, এলাকা, জেলা"
                                                className="h-11 w-full rounded-md border border-[#ededed] bg-[#fafafa] px-3.5 text-xs text-[#121212] outline-none transition-colors focus:border-gold focus:bg-white"
                                            />
                                        </div>

                                        {/* Delivery Location Toggle */}
                                        <div className="flex flex-col gap-1.5 pt-1">
                                            <label className="text-xs font-medium text-[#4b4b4b]">
                                                ডেলিভারি চার্জ
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setDeliveryArea("inside")}
                                                    className={`rounded-md border p-2.5 text-center text-xs transition-all ${deliveryArea === "inside"
                                                        ? "border-gold bg-gold/15 font-bold text-[#121212] ring-1 ring-gold"
                                                        : "border-[#ededed] bg-[#fafafa] text-[#4b4b4b]"
                                                        }`}
                                                >
                                                    <div>ঢাকা সিটির ভেতরে</div>
                                                    <div className="text-gold font-bold">৳৭০</div>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeliveryArea("outside")}
                                                    className={`rounded-md border p-2.5 text-center text-xs transition-all ${deliveryArea === "outside"
                                                        ? "border-gold bg-gold/15 font-bold text-[#121212] ring-1 ring-gold"
                                                        : "border-[#ededed] bg-[#fafafa] text-[#4b4b4b]"
                                                        }`}
                                                >
                                                    <div>ঢাকা সিটির বাইরে</div>
                                                    <div className="text-gold font-bold">৳১৩০</div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Payment Notice */}
                                        <div className="rounded-lg border border-gold/30 bg-gold/10 p-3 text-xs text-[#4b4b4b]">
                                            <span className="font-bold text-[#121212]">পেমেন্ট পদ্ধতি:</span> ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা পরিশোধ করুন)
                                        </div>

                                        {/* Order Summary */}
                                        <div className="rounded-lg border border-[#ededed] bg-[#fafafa] p-3.5 text-xs space-y-1.5">
                                            <div className="flex justify-between text-[#777777]">
                                                <span>সাবটোটাল:</span>
                                                <span>৳{subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[#777777]">
                                                <span>ডেলিভারি চার্জ:</span>
                                                <span>৳{deliveryCharge}</span>
                                            </div>
                                            <div className="flex justify-between border-t border-[#ededed] pt-2 text-sm font-bold text-[#121212]">
                                                <span>সর্বমোট:</span>
                                                <span className="text-gold text-base">৳{grandTotal.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {errorMessage && (
                                            <p className="text-xs font-medium text-red-500">{errorMessage}</p>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="mt-2 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border border-gold bg-gold text-sm font-bold uppercase tracking-widest text-[#121212] shadow-lg transition-all hover:bg-gold-hover hover:text-white disabled:opacity-50"
                                        >
                                            {isSubmitting ? "অর্ডার প্রসেসিং হচ্ছে..." : `অর্ডার কনফার্ম করুন • ৳${grandTotal.toLocaleString()}`}
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
                <p>© 2026 NUSRAT. All Rights Reserved.</p>
                <p className="mt-1">
                    সরাসরি সাহায্যের জন্য কল করুন:{" "}
                    <a href="tel:+8801700000000" className="text-gold font-semibold underline">
                        +880 1700-000000
                    </a>
                </p>
            </footer>
        </div>
    );
}