import Link from "next/link";

export function ParallaxBanner() {
    return (
        <section className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0">
                <img
                    src="https://framerusercontent.com/images/RiZLSSntGVvWa6nQSIFKTjeIbe0.jpg?width=4000&height=2667"
                    alt="Embrace independence"
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#121212]/25" />
                <div className="bg-noise pointer-events-none absolute inset-0 opacity-10" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-10 px-5 text-center">
                <h2
                    className="font-serif-sc text-[32px] min-[810px]:text-[40px] font-semibold uppercase leading-[1.04] text-white"
                    style={{ textShadow: "0 1px 10px rgba(0,0,0,0.25)" }}
                >
                    Embrace independence
                    <br />
                    and redefine
                    <br />
                    your fashion
                </h2>

                <Link
                    href="/our-story"
                    className="border border-white px-6 py-2.5 text-[16px] font-light tracking-[-0.03em] text-white transition-colors hover:bg-white hover:text-[#121212]"
                >
                    OUR STORY
                </Link>
            </div>
        </section>
    );
}