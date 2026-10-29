export default function PrivacyPolicyPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-12 text-[#121212]">
            <h1 className="font-serif text-3xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-xs text-[#777]">Last updated: October 2026</p>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#4b4b4b]">
                <section>
                    <h2 className="text-base font-bold text-[#121212]">1. Information We Collect</h2>
                    <p className="mt-1">
                        When you place an order or interact with our website, we collect personal information necessary to fulfill your purchase, including:
                    </p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li>Your full name</li>
                        <li>Mobile phone number</li>
                        <li>Delivery address and area</li>
                        <li>Browser and device data collected via cookies (such as Meta Pixel) to improve your shopping experience.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">2. How We Use Your Information</h2>
                    <p className="mt-1">We use your details strictly for business operations:</p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li>To confirm, process, and ship your clothing orders.</li>
                        <li>To call or message you regarding order status and delivery updates.</li>
                        <li>To measure and optimize our advertising performance (via Meta Conversions API).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">3. Data Security</h2>
                    <p className="mt-1">
                        We value your privacy. Your personal information is kept secure and is never sold, traded, or rented to third parties. It is only shared with trusted courier partners to deliver your package.
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">4. Contact Us</h2>
                    <p className="mt-1">
                        If you have any questions regarding your data, contact us directly at support@nusratpunjabi.com or call our hotline.
                    </p>
                </section>
            </div>
        </main>
    );
}