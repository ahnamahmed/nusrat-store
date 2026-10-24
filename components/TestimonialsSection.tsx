import { SectionHeader } from "./SectionHeader";

const REVIEWS = [
    {
        quote:
            "“The quality of the fabric and the attention to detail blew me away. I feel confident and stylish every time I wear their clothes!”",
        author: "Samantha Luna",
    },
    {
        quote:
            "“Finally, a brand that combines comfort and elegance! Their pieces fit like they were custom-made just for me.”",
        author: "James Knight",
    },
    {
        quote:
            "“I’ve never received so many compliments on my outfits! This brand truly knows how to create timeless designs.”",
        author: "Nina Roscoe",
    },
    {
        quote:
            "“This brand is everything I’ve been looking for—stylish and high-quality. Their collection is the perfect mix of modern trends and classic staples, which makes it so easy to mix & match.”",
        author: "Daniel Moonlight",
    },
    {
        quote:
            "“I’m so impressed by how this brand combines sustainability with fashion. Knowing that they’re created with care for the environment makes me feel good about supporting them.”",
        author: "Emma Stone",
    },
    {
        quote:
            "“I absolutely love how versatile their pieces are. I can take the same outfit and dress it up with heels or keep it casual with sneakers, and it always works perfectly.”",
        author: "Alex Washington",
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative z-10 w-full bg-[#121212] py-[100px] px-5 min-[810px]:px-6 min-[1200px]:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-12">
                <SectionHeader title="WHAT OUR CUSTOMERS SAID" align="center" dark />

                <div className="grid grid-cols-1 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3">
                    {REVIEWS.map((review, index) => {
                        // Replicate Framer's internal border matrix on desktop
                        const hasRightBorder = index % 3 !== 2 ? "min-[1200px]:border-r" : "";
                        const hasTopBorder = index >= 3 ? "min-[1200px]:border-t" : "";

                        return (
                            <div
                                key={review.author}
                                className={`flex h-[420px] w-full flex-col items-center justify-center p-6 border-[#4b4b4b] border-b last:border-b-0 min-[810px]:border-b-0 ${hasRightBorder} ${hasTopBorder}`}
                            >
                                <div className="flex w-full flex-col items-center gap-10">
                                    {/* 5 White Stars */}
                                    <div className="flex items-center justify-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                viewBox="0 0 256 256"
                                                className="h-6 w-6 fill-white"
                                            >
                                                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className="text-center text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-white">
                                        {review.quote}
                                    </p>

                                    <p className="text-center text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#8f8f8f]">
                                        {review.author}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}