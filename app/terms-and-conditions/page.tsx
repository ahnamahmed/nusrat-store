export default function TermsPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-12 text-[#121212]">
            <h1 className="font-serif text-3xl font-bold">Terms & Conditions</h1>
            <p className="mt-2 text-xs text-[#777]">Last updated: October 2026</p>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#4b4b4b]">
                <section>
                    <h2 className="text-base font-bold text-[#121212]">1. Overview</h2>
                    <p className="mt-1">
                        Welcome to Nusrat. By visiting our website and placing an order, you agree to comply with the following terms and conditions. Please read them carefully before purchasing.
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">2. Orders & Confirmation</h2>
                    <p className="mt-1">
                        All orders placed online are treated as provisional until confirmed by our support team. We reserve the right to cancel or verify any order due to stock unavailability, pricing errors, or incorrect customer contact details.
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">3. Pricing & Payment</h2>
                    <p className="mt-1">
                        All prices are listed in Bangladeshi Taka (BDT). We currently operate on **Cash on Delivery (COD)**, allowing you to inspect your parcel upon delivery before making payment to the courier agent.
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">4. Delivery & Shipping</h2>
                    <p className="mt-1">
                        Delivery charges vary by location (e.g., Inside Dhaka vs. Outside Dhaka). Estimated delivery time ranges between 2 to 5 business days depending on your location and courier workload.
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">5. Size Exchange Policy</h2>
                    <p className="mt-1">
                        If you receive the wrong size, you may request an exchange within 7 days of delivery, provided the item is unworn, unwashed, and in its original packaging with tags intact.
                    </p>
                </section>
            </div>
        </main>
    );
}