import Link from "next/link";

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    ctaText?: string;
    ctaHref?: string;
    align?: "left" | "center";
    dark?: boolean;
}

export function SectionHeader({
    eyebrow,
    title,
    ctaText,
    ctaHref,
    align = "left",
    dark = false,
}: SectionHeaderProps) {
    return (
        <div className="flex w-full flex-col gap-6">
            <div
                className={`flex w-full flex-wrap items-center gap-2.5 ${align === "center" ? "justify-center text-center" : "justify-between"
                    }`}
            >
                <div
                    className={`flex flex-1 min-w-[240px] flex-col gap-2 ${align === "center" ? "items-center" : "items-start"
                        }`}
                >
                    {eyebrow && (
                        <p
                            className={`text-[12px] font-normal uppercase tracking-[0.14em] leading-[18px] ${dark ? "text-white" : "text-[#121212]"
                                }`}
                        >
                            {eyebrow}
                        </p>
                    )}
                    <h2
                        className={`font-serif-sc text-[32px] min-[810px]:text-[40px] font-semibold uppercase leading-[1.04] ${dark ? "text-white" : "text-[#121212]"
                            }`}
                    >
                        {title}
                    </h2>
                </div>

                {ctaText && ctaHref && (
                    <Link
                        href={ctaHref}
                        className={`inline-flex items-center justify-center border px-6 py-2.5 text-[16px] font-light tracking-[-0.03em] transition-colors duration-200 ${dark
                                ? "border-white text-white hover:bg-white hover:text-[#121212]"
                                : "border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white"
                            }`}
                    >
                        {ctaText}
                    </Link>
                )}
            </div>

            <div
                className={`h-[1px] w-full ${dark ? "bg-[#4b4b4b]" : "bg-[#ededed]"
                    }`}
            />
        </div>
    );
}