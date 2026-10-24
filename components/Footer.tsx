import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative z-10 w-full bg-[#121212] pt-20 px-5 min-[810px]:px-6 min-[1200px]:px-10 text-white overflow-hidden">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-[100px]">
                {/* Top Row: Columns + Newsletter */}
                <div className="flex flex-col min-[1200px]:flex-row items-start justify-between gap-10 min-[1200px]:gap-6">
                    {/* Left Link Columns */}
                    <div className="flex w-full flex-1 flex-col min-[810px]:flex-row gap-8">
                        <div className="flex w-full min-[810px]:w-[60%] gap-2">
                            <div className="flex flex-1 flex-col gap-3.5">
                                <p className="text-[12px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                    SHOP
                                </p>
                                <div className="flex flex-col gap-4 text-[16px] font-light tracking-[-0.03em]">
                                    <Link href="/shop/all" className="hover:text-[#8f8f8f] transition-colors">All Products</Link>
                                    <Link href="/shop/lux-blazer" className="hover:text-[#8f8f8f] transition-colors">Lux Blazer</Link>
                                    <Link href="/shop/one-piece" className="hover:text-[#8f8f8f] transition-colors">One Piece</Link>
                                    <Link href="/shop/batavia-essentials" className="hover:text-[#8f8f8f] transition-colors">Batavia Essentials</Link>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-3.5">
                                <p className="text-[12px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                    INFORMATION
                                </p>
                                <div className="flex flex-col gap-4 text-[16px] font-light tracking-[-0.03em]">
                                    <Link href="/our-story" className="hover:text-[#8f8f8f] transition-colors">Our Story</Link>
                                    <Link href="/blog" className="hover:text-[#8f8f8f] transition-colors">Blog</Link>
                                    <Link href="/contact" className="hover:text-[#8f8f8f] transition-colors">Contact Us</Link>
                                    <Link href="/faq" className="hover:text-[#8f8f8f] transition-colors">FAQ</Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-3.5">
                            <p className="text-[12px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                LEGAL
                            </p>
                            <div className="flex flex-col gap-4 text-[16px] font-light tracking-[-0.03em]">
                                <Link href="/privacy" className="hover:text-[#8f8f8f] transition-colors">Privacy Policy</Link>
                                <Link href="/terms" className="hover:text-[#8f8f8f] transition-colors">Terms & Conditions</Link>
                                <Link href="/returns" className="hover:text-[#8f8f8f] transition-colors">Returns & Exchanges</Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Newsletter Box */}
                    <div className="flex w-full min-[810px]:max-w-[50%] min-[1200px]:max-w-[30%] flex-col gap-3.5">
                        <p className="text-[12px] uppercase tracking-[0.14em] text-white">
                            NEWSLETTER
                        </p>
                        <p className="text-[16px] font-light tracking-[-0.03em] text-[#8f8f8f]">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="relative flex w-full items-center">
                            <input
                                type="email"
                                required
                                placeholder="Your Email"
                                className="h-14 w-full border border-[#4b4b4b] bg-transparent px-4 pr-[136px] text-[16px] text-white placeholder:text-[#8f8f8f] focus:border-white focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-[120px] bg-white text-[14px] font-medium uppercase tracking-wider text-[#121212] hover:bg-[#ededed] transition-colors cursor-pointer"
                            >
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Giant Wordmark & Copyright */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col min-[810px]:flex-row items-center justify-between gap-2 text-[14px] font-light text-[#8f8f8f]">
                        <p>© {new Date().getFullYear()} Batavia. All rights reserved.</p>
                        <p>Designed for timeless wardrobes.</p>
                    </div>

                    <div className="flex w-full justify-center overflow-hidden">
                        <span className="font-serif-sc text-[16vw] leading-[0.8] font-semibold uppercase tracking-tight text-white/95 select-none">
                            BATAVIA
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}