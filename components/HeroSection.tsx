import Link from "next/link";

export function HeroSection() {
    return (
        <section className="sticky top-0 z-0 flex h-[90vh] min-[810px]:h-screen w-full flex-col items-center justify-center overflow-hidden bg-white">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src="https://videos.pexels.com/video-files/10678919/10678919-uhd_2732_1440_25fps.mp4"
                    loop
                    muted
                    autoPlay
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover object-center"
                />
            </div>

            {/* Top Gradient Overlay */}
            <div
                className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-[174px]"
                style={{ background: "linear-gradient(rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)" }}
            />

            {/* Bottom Gradient Overlay */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[348px]"
                style={{ background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)" }}
            />

            {/* Dark Tint & Film Noise */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[#121212]/15" />
            <div className="bg-noise pointer-events-none absolute inset-0 z-10 opacity-10" />

            {/* Bottom Content Row */}
            <div className="absolute bottom-5 left-5 right-5 min-[810px]:bottom-20 min-[810px]:left-6 min-[810px]:right-6 min-[1200px]:left-10 min-[1200px]:right-10 z-20 mx-auto flex max-w-[1120px] flex-col min-[810px]:flex-row items-end justify-between gap-6">
                {/* Left Title Stack */}
                <div className="flex w-full min-[810px]:flex-1 flex-col items-start gap-2.5">
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] leading-[18px] text-gold">
                        EST..2020
                    </p>
                    <div className="flex flex-col">
                        <h1 className="font-serif-sc text-[40px] min-[810px]:text-[56px] font-medium uppercase leading-none text-white">
                            Fashion That Stands
                        </h1>
                        <h1 className="font-serif-sc text-[40px] min-[810px]:text-[56px] font-medium uppercase leading-none text-white">
                            the Test of Time
                        </h1>
                    </div>
                </div>

                {/* Right Description + CTA */}
                <div className="flex w-full min-[810px]:w-[32%] min-[810px]:max-w-[500px] flex-col items-start gap-6">
                    <p className="text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-white">
                        We bring fashion that transcends time, a blend of classic aesthetics with modern materials.
                    </p>

                    <Link
                        href="/shop/all"
                        className="group relative flex w-full items-center justify-between border border-gold bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.18em] text-[#121212] uppercase transition-all duration-300 hover:bg-gold-hover hover:text-white"
                    >
                        <span>SHOP NOW</span>
                        <div className="relative flex h-[18px] w-[18px] items-center justify-end overflow-hidden transition-all">
                            <svg
                                viewBox="0 0 256 256"
                                className="h-[18px] w-[18px] shrink-0 fill-current transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z" />
                            </svg>
                        </div>

                        {/* Subtle Corner Brackets on Hover */}
                        {/* <span className="pointer-events-none absolute -left-1 -top-1 h-2 w-2 border-l border-t border-gold opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-gold opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -right-1 -top-1 h-2 w-2 border-r border-t border-gold opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-gold opacity-0 transition-all duration-300 group-hover:opacity-100" /> */}
                    </Link>
                </div>
            </div>
        </section>
    );
}