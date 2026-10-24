import Link from "next/link";
import { CornerBrackets } from "./CornerBrackets";

const CATEGORIES = [
    {
        title: "LUX BLAZER",
        href: "/shop/lux-blazer",
        image: "https://framerusercontent.com/images/otVZiHJiKaAnE0b5isBNq4aILGo.jpeg?width=800&height=1200",
    },
    {
        title: "ONE PIECE",
        href: "/shop/one-piece",
        image: "https://framerusercontent.com/images/tMmGAHlf23sBQcfidBA0MK096KI.jpeg?width=906&height=1200",
    },
    {
        title: "BATAVIA ESSENTIALS",
        href: "/shop/batavia-essentials",
        image: "https://framerusercontent.com/images/UBsyFIAvzS76eDApmmCYVo365mM.jpg?width=1920&height=2880",
    },
];

export function CategoryGrid() {
    return (
        <section className="relative z-10 w-full bg-white overflow-hidden">
            <div className="mx-auto flex max-w-[1200px] flex-col min-[810px]:flex-row w-full">
                {CATEGORIES.map((cat) => (
                    <Link
                        key={cat.title}
                        href={cat.href}
                        className="group relative flex aspect-square w-full min-[810px]:flex-1 flex-col items-center justify-center overflow-hidden"
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-115"
                        />
                        <div className="absolute inset-0 bg-black/32" />
                        <div className="bg-noise pointer-events-none absolute inset-0 opacity-5" />

                        <CornerBrackets size="w-4 h-4" />

                        <h3 className="relative z-10 text-[18px] min-[810px]:text-[24px] font-medium tracking-[-0.03em] text-white">
                            {cat.title}
                        </h3>

                        {/* Hover "SEE COLLECTIONS" */}
                        <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 opacity-0 transition-all duration-300 group-hover:bottom-[40px] group-hover:opacity-100">
                            <span className="text-[12px] font-normal uppercase tracking-[0.14em] text-white whitespace-nowrap">
                                SEE COLLECTIONS
                            </span>
                            <svg viewBox="0 0 256 256" className="h-3.5 w-3.5 fill-white">
                                <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}