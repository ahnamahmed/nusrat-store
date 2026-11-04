import { SectionHeader } from "./SectionHeader";

const REVIEWS = [
    {
        quote:
            "“Most online embroidery looks flat in person, but their detailing looks much sharper. The stitches are dense, clean, and completely mixed with fabric. Very refined work.”",
        author: "Habibur Rahman",
    },
    {
        quote:
            "“Finally, a brand that combines comfort and elegance! Their panjabi fit like they were custom-made just for me.”",
        author: "Lokman Hossain",
    },
    {
        quote:
            "“I ordered a Jubba sized 54(M) based on the size guide, and the length and shoulder fall are perfect. It has that structured, royal Arabian drape without feeling baggy around the chest.”",
        author: "Jahidul Islam",
    },
    {
        quote:
            "“Recently ordered a panjabi as a birthday gift for my elder brother. He really loved the fabrics and quality. Also the presentation box was perfect for the gift. It made the packeging more premium then i expected”",
        author: "Farukh Hossain",
    },
    {
        quote:
            "“I ordered a panjabi on sunday evening. They confirmed the order within an hour via call. I got the product next day morning. I was surpriced with this fast delivery.”",
        author: "Laxmon Saha",
    },
    {
        quote:
            "“I reached out through messenger to double-check my measurements, and their sizing guidance was 100% accurate. The size 56 fits cleanly across the chest and shoulders. Highly impressed with the quality.”",
        author: "Humayun Kabir",
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative z-10 w-full border-t border-[#EAE5DB] bg-[#FAF8F5] px-4 py-12 sm:py-16 min-[810px]:px-6 min-[1200px]:py-[80px] min-[1200px]:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-8 sm:gap-12">
                <SectionHeader title="WHAT OUR CUSTOMERS SAID" align="center" />

                <div className="grid grid-cols-1 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3">
                    {REVIEWS.map((review, index) => {
                        const hasRightBorder = index % 3 !== 2 ? "min-[1200px]:border-r" : "";
                        const hasTopBorder = index >= 3 ? "min-[1200px]:border-t" : "";

                        return (
                            <div
                                key={review.author}
                                className={`flex h-auto w-full flex-col items-center justify-center border-b border-[#EAE5DB] py-6 px-4 min-[810px]:h-[360px] min-[810px]:py-0 min-[810px]:px-6 min-[1200px]:h-[400px] last:border-b-0 min-[810px]:border-b-0 ${hasRightBorder} ${hasTopBorder}`}
                            >
                                <div className="flex w-full max-w-[340px] flex-col items-center gap-3 sm:gap-5 min-[1200px]:gap-6">
                                    {/* Compact Gold Stars */}
                                    <div className="flex items-center justify-center gap-1 text-gold">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                viewBox="0 0 256 256"
                                                className="h-4 w-4 fill-gold sm:h-5 sm:w-5"
                                            >
                                                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Compact Quote Body */}
                                    <p className="text-center text-[13px] font-normal leading-relaxed text-[#2D2D2D] sm:text-[15px]">
                                        {review.quote}
                                    </p>

                                    {/* Author Name */}
                                    <p className="text-center text-[11px] font-semibold tracking-wider text-[#777777] uppercase sm:text-[12px]">
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