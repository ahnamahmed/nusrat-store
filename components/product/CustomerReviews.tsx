// components/product/CustomerReviews.tsx
import React from "react";

const REVIEWS = [
    {
        quote: "“The quality of the fabric and the attention to detail blew me away. I feel confident and stylish every time I wear their clothes!”",
        author: "Samantha Luna",
    },
    {
        quote: "“Finally, a brand that combines comfort and elegance! Their pieces fit like they were custom-made just for me.”",
        author: "James Knight",
    },
    {
        quote: "“I’ve never received so many compliments on my outfits! This brand truly knows how to create timeless designs.”",
        author: "Nina Roscoe",
    },
    {
        quote: "“This brand is everything I’ve been looking for—stylish and high-quality. Their collection is the perfect mix of modern trends and classic staples.”",
        author: "Daniel Moonlight",
    },
    {
        quote: "“I’m so impressed by how this brand combines sustainability with fashion. Knowing that they’re created with care makes me feel good about supporting them.”",
        author: "Emma Stone",
    },
    {
        quote: "“I absolutely love how versatile their pieces are. I can take the same outfit and dress it up or keep it casual, and it always works perfectly.”",
        author: "Alex Washington",
    },
];

export default function CustomerReviews() {
    return (
        <section className="w-full bg-[#121212] py-24 text-white">
            <div className="mx-auto w-full max-w-[1200px] px-5 min-[810px]:px-6 min-[1200px]:px-10">
                {/* Section Title */}
                <div className="mb-16 border-b border-[#4b4b4b] pb-8 text-center">
                    <h2 className="font-serif-sc text-3xl font-semibold uppercase tracking-wider text-white min-[810px]:text-4xl">
                        What Our Customers Said
                    </h2>
                </div>

                {/* 3-Column Reviews Grid */}
                <div className="grid grid-cols-1 divide-y divide-[#4b4b4b] min-[810px]:grid-cols-2 min-[810px]:divide-y-0 min-[810px]:gap-8 min-[1200px]:grid-cols-3">
                    {REVIEWS.map((rev, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-between gap-6 p-6 text-center">
                            {/* Gold 5 Stars */}
                            <div className="flex gap-1 text-[#C5A059]">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-[15px] font-light leading-relaxed text-[#ededed]">
                                {rev.quote}
                            </p>

                            <p className="text-[13px] font-normal tracking-[0.1em] text-[#8f8f8f] uppercase">
                                {rev.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}