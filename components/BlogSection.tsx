import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { CornerBrackets } from "./CornerBrackets";

const POSTS = [
    {
        title: "Make Your Home Match with Your Style",
        excerpt: "Transform your space with our guide to Make Your Home Match Your Style.",
        category: "Fashion",
        date: "Jan 16, 2025",
        href: "/blog/make-your-home-match-with-your-style",
        image: "https://framerusercontent.com/images/19wMNoNuMNRWVadtVPSIDxwq00.jpg?scale-down-to=1024",
    },
    {
        title: "Behind the Scene: Muslim Dessert",
        excerpt:
            "Muslim Dessert! Discover the rich history, unique flavors, and cultural significance of traditional Muslim",
        category: "Fashion",
        date: "Jan 16, 2025",
        href: "/blog/behind-the-scene-muslim-dessert",
        image: "https://framerusercontent.com/images/cC4SSVubEBBc32cNfTMzFuNHhk.jpg?scale-down-to=1024",
    },
    {
        title: "Guide to be a Sigma Male",
        excerpt:
            "Discover the ultimate Guide to Be a Sigma Male without any BS and straight to the point.",
        category: "Unique",
        date: "Jan 16, 2025",
        href: "/blog/guide-to-be-a-sigma-male",
        image: "https://framerusercontent.com/images/HrNJferZHbxPYle7f6Vy8AlQqac.jpg?scale-down-to=1024",
    },
];

export function BlogSection() {
    return (
        <section className="relative z-10 w-full bg-white py-[100px] px-5 min-[810px]:px-6 min-[1200px]:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-12">
                <SectionHeader title="LATEST BLOG" ctaText="SEE ALL" ctaHref="/blog" />

                <div className="grid grid-cols-1 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-8 min-[810px]:gap-4">
                    {POSTS.map((post) => (
                        <Link
                            key={post.title}
                            href={post.href}
                            className="group flex w-full flex-col gap-4"
                        >
                            {/* Image Mask (aspect-ratio: 1.46281) */}
                            <div className="relative aspect-[1.46281] w-full overflow-hidden bg-[#e4e4e4]">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="bg-noise pointer-events-none absolute inset-0 opacity-10" />
                                <CornerBrackets size="w-4 h-4" />

                                {/* Centered Read More Hover Prompt */}
                                <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1 opacity-0 transition-all duration-300 group-hover:top-1/2 group-hover:opacity-100">
                                    <span className="text-[12px] font-normal uppercase tracking-[0.14em] text-white">
                                        READ MORE
                                    </span>
                                    <svg viewBox="0 0 256 256" className="h-3.5 w-3.5 fill-white">
                                        <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <h3 className="line-clamp-2 text-[20px] font-medium tracking-[-0.03em] leading-[1.5] text-[#121212]">
                                        {post.title}
                                    </h3>
                                    <p className="line-clamp-2 text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#121212]">
                                        {post.excerpt}
                                    </p>
                                </div>

                                {/* Category & Date */}
                                <div className="flex items-center gap-2 border-t border-[#ededed] pt-2">
                                    <span className="text-[16px] font-light tracking-[-0.03em] text-[#121212]">
                                        {post.category}
                                    </span>
                                    <span className="h-[1px] w-3 bg-[#8f8f8f]" />
                                    <span className="text-[16px] font-light tracking-[-0.03em] text-[#4b4b4b]">
                                        {post.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}