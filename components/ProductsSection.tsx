import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { CornerBrackets } from "./CornerBrackets";
import Image from "next/image";

const PRODUCTS = [
    {
        title: "Arabian Jubba - Black",
        category: "Arabian Jubba",
        price: 2350,
        oldPrice: 2950,
        href: "/products/nusrat-arabian-jubba-black",
        frontImage: "/products/jubba-black-front.jpg",
        backImage: "/products/jubba-black-back.jpg",
    },
    {
        title: "Arabian Jubba - Deep Blue",
        category: "Arabian Jubba",
        price: 2350,
        oldPrice: 2950,
        href: "/products/nusrat-arabian-jubba-deep-blue",
        frontImage: "/products/jubba-deepblue-front.jpg",
        backImage: "/products/jubba-deepblue-back.jpg",
    },
    {
        title: "Arabian Jubba - Ash",
        category: "Arabian Jubba",
        price: 2350,
        oldPrice: 2950,
        href: "/products/nusrat-arabian-jubba-ash",
        frontImage: "/products/jubba-ash-front.jpg",
        backImage: "/products/jubba-ash-back.jpg",
    },
];

export function ProductsSection() {
    return (
        <section className="relative z-10 w-full bg-white py-[100px] px-5 min-[810px]:px-6 min-[1200px]:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
                <SectionHeader
                    eyebrow="NEW ARRIVALS"
                    title="Arabian Jubba"
                    ctaText="SEE ALL PRODUCTS"
                    ctaHref="/shop/all"
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
                                <Image
                                    src={product.backImage}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-top"
                                />
                                {/* Front Image */}
                                <Image
                                    src={product.frontImage}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-top transition-all duration-500 group-hover:scale-115 group-hover:opacity-0"
                                />
                                <div className="bg-noise pointer-events-none absolute inset-0 opacity-5" />
                                <CornerBrackets />
                            </div>

                            {/* Product Meta */}
                            <div className="flex w-full items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <p className="text-[17px] font-medium tracking-[-0.02em] leading-[1.3] text-[#121212] transition-colors duration-300 group-hover:text-gold">
                                        {product.title}
                                    </p>
                                    <p className="text-[14px] font-light tracking-[-0.02em] leading-[1.5] text-[#8f8f8f]">
                                        {product.category}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <div className="flex items-center text-[18px] font-semibold tracking-tight text-gold">
                                        <span>৳</span>
                                        <span>{product.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center text-[14px] font-light tracking-tight text-[#8f8f8f] line-through">
                                        <span>৳</span>
                                        <span>{product.oldPrice.toLocaleString()}</span>
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