export function BenefitsBar() {
    return (
        <section className="relative z-10 w-full bg-white p-5 min-[810px]:p-6 min-[1200px]:p-10">
            <div className="mx-auto flex max-w-[1120px] flex-col min-[810px]:flex-row items-stretch justify-center gap-4">
                {/* Card 1: Free Shipping */}
                <div className="flex flex-1 flex-col items-center justify-start gap-6 bg-[#fafafa] px-6 py-10 text-center">
                    <div className="h-10 w-10 text-[#121212]">
                        <svg viewBox="0 0 256 256" className="h-full w-full fill-current">
                            <path d="M235.85,72.57,129.65,42.23a6,6,0,0,0-2.5-.17L22,57.08A14.07,14.07,0,0,0,10,70.94V185.06a14.07,14.07,0,0,0,12,13.86l105.13,15a6.07,6.07,0,0,0,.85.06,6.14,6.14,0,0,0,1.65-.23l106.2-30.34A14.06,14.06,0,0,0,246,170V86A14.06,14.06,0,0,0,235.85,72.57ZM96,122H78V61.2l44-6.28V201.08L78,194.8V134H96a6,6,0,0,0,0-12ZM22,185.06V70.94a2,2,0,0,1,1.72-2l42.28-6V122H48a6,6,0,0,0,0,12H66v59.08l-42.28-6A2,2,0,0,1,22,185.06ZM234,170a2,2,0,0,1-1.45,1.92L134,200.05V56l98.55,28.16A2,2,0,0,1,234,86Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[18px] font-medium tracking-[-0.02em] leading-[1.4] text-[#121212]">
                            Free Shipping
                        </h4>
                        <p className="text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#121212]">
                            Get Free shipping On all orders over $100
                        </p>
                    </div>
                </div>

                {/* Card 2: Secure Checkout */}
                <div className="flex flex-1 flex-col items-center justify-start gap-6 bg-[#fafafa] px-6 py-10 text-center">
                    <div className="h-10 w-10 text-[#121212]">
                        <svg viewBox="0 0 256 256" className="h-full w-full fill-current">
                            <path d="M208,42H48A14,14,0,0,0,34,56v56c0,51.94,25.12,83.4,46.2,100.64,22.73,18.6,45.27,24.89,46.22,25.15a6,6,0,0,0,3.16,0c.95-.26,23.49-6.55,46.22-25.15C196.88,195.4,222,163.94,222,112V56A14,14,0,0,0,208,42Zm2,70c0,37.76-13.94,68.39-41.44,91.06A131.17,131.17,0,0,1,128,225.72a130.94,130.94,0,0,1-40.56-22.66C59.94,180.39,46,149.76,46,112V56a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2ZM172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[18px] font-medium tracking-[-0.02em] leading-[1.4] text-[#121212]">
                            Secure Checkout
                        </h4>
                        <p className="text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#121212]">
                            We make sure everything is safe for you
                        </p>
                    </div>
                </div>

                {/* Card 3: Return Policy */}
                <div className="flex flex-1 flex-col items-center justify-start gap-6 bg-[#fafafa] px-6 py-10 text-center">
                    <div className="h-10 w-10 text-[#121212]">
                        <svg viewBox="0 0 256 256" className="h-full w-full fill-current">
                            <path d="M222,128a94,94,0,0,1-160.47,66.47l-1.06-1.06A6,6,0,0,1,68.95,185l1.06,1.06a82,82,0,1,0-2.16-118.06L46.46,89H80a6,6,0,0,1,0,12H32a6,6,0,0,1-6-6V47a6,6,0,0,1,12,0V79.89l21.37-20.3A94,94,0,0,1,222,128Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[18px] font-medium tracking-[-0.02em] leading-[1.4] text-[#121212]">
                            30-Day Returns
                        </h4>
                        <p className="text-[16px] font-light tracking-[-0.03em] leading-[1.5] text-[#121212]">
                            Simple and hassle-free exchange process
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}