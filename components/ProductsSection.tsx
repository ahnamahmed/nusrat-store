import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { CornerBrackets } from "./CornerBrackets";

const PRODUCTS = [
    {
        title: "Ruby Blazer",
        category: "Lux Blazer",
        price: 129,
        oldPrice: 149,
        href: "/products/ruby-blazer",
        frontImage: "https://framerusercontent.com/images/UdvTDVSod4EAdM8A9xSaqkZ8cDI.jpg?width=906&height=1200",
        backImage: "https://framerusercontent.com/images/VngDgYP4L3sfKsPLEadCijNcQ.jpg?width=906&height=1200",
    },
    {
        title: "Opal Blazer",
        category: "Lux Blazer",
        price: 129,
        oldPrice: 149,
        href: "/products/opal-blazer",
        frontImage: "https://framerusercontent.com/images/muBnem7t4J6SKYiypUjQNgZveI.jpg?width=906&height=1200",
        backImage: "https://framerusercontent.com/images/gf898oqWuwcRlbDJdeAaANZ8Eoo.jpg?width=906&height=1200",
    },
    {
        title: "Emerald Blazer",
        category: "Lux Blazer",
        price: 129,
        oldPrice: 149,
        href: "/products/emerald-blazer",
        frontImage: "https://framerusercontent.com/images/QeeKTaTbcVFVtybAtz9owbqxq4.jpg?width=906&height=1200",
        backImage: "https://framerusercontent.com/images/iU7FsQh4CSkGHIemsZixKshCoXU.jpg?width=906&height=1200",
    },
];

export function ProductsSection() {
    return (
        <section className="relative z-10 w-full bg-white py-[100px] px-5 min-[810px]:px-6 min-[1200px]:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
                <SectionHeader
                    eyebrow="NEW COLLECTION"
                    title="Lux blazer"
                    ctaText="SEE ALL PRODUCTS"
                    ctaHref="/shop/lux-blazer"
                />

                <div className="grid grid-cols-1 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-6 w-full">
                    {PRODUCTS.map((product) => (
                        <Link
                            key={product.title}
                            href={product.href}
                            className="group flex w-full flex-col gap-4"
                        >
                            {/* Image Mask (aspect-ratio: 0.874) */}
                            <div className="relative aspect-[0.874] w-full overflow-hidden bg-[#f5f5f5]">
                                {/* Back Image */}
                                <img
                                    src={product.backImage}
                                    alt={`${product.title} alternate view`}
                                    className="absolute inset-0 h-full w-full scale-115 object-cover object-top transition-transform duration-500 group-hover:scale-100"
                                />
                                {/* Front Image */}
                                <img
                                    src={product.frontImage}
                                    alt={product.title}
                                    className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-115 group-hover:opacity-0"
                                />
                                <div className="bg-noise pointer-events-none absolute inset-0 opacity-5" />
                                <CornerBrackets />
                            </div>

                            {/* Product Meta */}
                            <div className="flex w-full items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <p className="text-[18px] font-medium tracking-[-0.03em] leading-[1.4] text-[#121212]">
                                        {product.title}
                                    </p>
                                    <p className="text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#4b4b4b]">
                                        {product.category}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <div className="flex items-center text-[20px] font-medium tracking-[-0.03em] leading-[1.5] text-[#121212]">
                                        <span>$</span>
                                        <span>{product.price}</span>
                                    </div>
                                    <div className="flex items-center text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#8f8f8f] line-through">
                                        <span>$</span>
                                        <span>{product.oldPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}