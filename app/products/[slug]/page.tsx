// app/products/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SHOP_PRODUCTS, ShopProduct } from "@/data/shopProducts";
import ProductGallery from "@/components/product/ProductGallery";
import ProductAccordion from "@/components/product/ProductAccordion";
import CustomerReviews from "@/components/product/CustomerReviews";
import ProductFaq from "@/components/product/ProductFaq";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return SHOP_PRODUCTS.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = SHOP_PRODUCTS.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    // Recommended products (excluding current)
    const relatedProducts = SHOP_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
    const galleryImages = [product.frontImage, product.backImage];

    return (
        <main className="min-h-screen w-full bg-white pt-[102px]">
            <Navbar />

            {/* Main Split Section: Gallery (Left) & Purchase Info (Right) */}
            <section className="mx-auto w-full max-w-[1200px] px-5 py-10 min-[810px]:px-6 min-[1200px]:px-10">
                <div className="grid grid-cols-1 gap-12 min-[1200px]:grid-cols-2">
                    {/* Sticky Left: Gallery */}
                    <div className="w-full min-[1200px]:sticky min-[1200px]:top-24 min-[1200px]:h-[calc(100vh-120px)]">
                        <ProductGallery images={galleryImages} productName={product.name} />
                    </div>

                    {/* Scrollable Right: Purchase Specs */}
                    <div className="flex flex-col gap-8">
                        {/* Title & Pricing */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-medium tracking-tight text-[#121212] min-[810px]:text-3xl">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-semibold text-[#121212]">
                                    ৳{product.price * 10} {/* Adapt to BDT or keep $ */}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg font-light text-[#8f8f8f] line-through">
                                        ৳{product.originalPrice * 10}
                                    </span>
                                )}
                                <span className="rounded bg-[#C5A059]/10 px-2 py-0.5 text-xs font-semibold text-[#C5A059]">
                                    SAVE 20%
                                </span>
                            </div>

                            {/* Review Stars Counter */}
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex text-[#C5A059]">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-[#8f8f8f]">(25 verified reviews)</span>
                            </div>
                        </div>

                        {/* Value Guarantees Banner */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#ededed] py-4 text-xs font-medium uppercase tracking-wider text-[#121212]">
                            <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-[#C5A059]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Safe Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-[#C5A059]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-[#C5A059]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Delivery in 2-5 days</span>
                            </div>
                        </div>

                        {/* Direct Order Now Action Button */}
                        <div className="flex flex-col gap-3">
                            <button className="group relative flex h-14 w-full cursor-pointer items-center justify-center bg-[#121212] px-8 text-sm font-semibold tracking-[0.16em] uppercase text-white transition-colors duration-200 hover:bg-[#C5A059] hover:text-black">
                                <span>ORDER NOW (CASH ON DELIVERY)</span>
                            </button>
                        </div>

                        {/* Collapsible Info Tabs */}
                        <ProductAccordion />
                    </div>
                </div>
            </section>

            {/* Editorial Parallax Statement */}
            <section className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden bg-black text-center text-white">
                <img
                    src="https://framerusercontent.com/images/Wg8myZVK5Mxw0zGEgVFDte0NX0.jpg"
                    alt="Brand Ethos"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="relative z-10 px-5">
                    <h2 className="font-serif-sc text-3xl font-light uppercase tracking-wider min-[810px]:text-5xl">
                        Handcrafted with precision &amp;<br />timeless Arabian tailoring.
                    </h2>
                </div>
            </section>

            {/* Customer Testimonials Grid */}
            <CustomerReviews />

            {/* Related Products: More For You */}
            <section className="mx-auto w-full max-w-[1200px] px-5 py-24 min-[810px]:px-6 min-[1200px]:px-10">
                <div className="mb-12 border-b border-[#ededed] pb-6">
                    <h2 className="font-serif-sc text-3xl font-medium uppercase text-[#121212]">
                        More for you
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3">
                    {relatedProducts.map((rel) => (
                        <Link
                            key={rel.slug}
                            href={`/products/${rel.slug}`}
                            className="group flex flex-col gap-4 no-underline"
                        >
                            <div className="relative aspect-[0.874] w-full overflow-hidden bg-[#f5f5f5]">
                                <img
                                    src={rel.frontImage}
                                    alt={rel.name}
                                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[17px] font-medium text-[#121212]">{rel.name}</p>
                                    <p className="text-[14px] font-light text-[#4b4b4b]">{rel.category}</p>
                                </div>
                                <p className="text-[18px] font-semibold text-[#121212]">৳{rel.price * 10}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <ProductFaq />

            <Footer />
        </main>
    );
}