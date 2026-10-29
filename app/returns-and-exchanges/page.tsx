// app/refund-policy/page.tsx
export default function RefundPolicyPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-12 text-[#121212]">
            <h1 className="font-serif text-3xl font-bold">Return & Refund Policy</h1>
            <p className="mt-2 text-xs text-[#777]">Last updated: October 2026</p>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#4b4b4b]">
                <section>
                    <h2 className="text-base font-bold text-[#121212]">1. Inspection Upon Delivery</h2>
                    <p className="mt-1">
                        We offer parcel checking at your doorstep. You are encouraged to inspect the panjabi fabric, color, and size while the delivery agent is present. If you receive a visibly damaged or incorrect product, you can return it directly to the delivery rider immediately at zero cost.
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">2. 7-Day Exchange Window</h2>
                    <p className="mt-1">
                        If the panjabi does not fit or you need a different size, you can request an exchange within <strong>7 days</strong> of delivery.
                    </p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li>The item must be unused, unwashed, and in its original folding state.</li>
                        <li>All original brand tags, packaging, and complimentary items (e.g., gift boxes or attar) must be included intact.</li>
                        <li>Exchange requests are subject to size availability in stock.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">3. Return Delivery Fees</h2>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li><strong>Defective or Wrong Item Sent:</strong> Nusrat covers all replacement delivery charges.</li>
                        <li><strong>Size Swap or Customer Preference Change:</strong> The customer is responsible for the standard return and re-shipping delivery fee (৳80 inside Dhaka, ৳100 outside Dhaka).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">4. Refund Process</h2>
                    <p className="mt-1">
                        Since orders are processed via Cash on Delivery (COD), cash refunds apply in cases where a returned defective item cannot be replaced due to stock shortage:
                    </p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li>Once the returned parcel reaches our office and passes quality inspection, the refund is initiated within <strong>3 to 5 business days</strong>.</li>
                        <li>Refunds are paid directly to your mobile wallet (bKash or Nagad) or designated bank account.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">5. Non-Eligible Items</h2>
                    <p className="mt-1">We cannot accept returns or process refunds for:</p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li>Any item that shows signs of wear, perfume scents, body odor, or washing.</li>
                        <li>Items returned without original packaging or tags.</li>
                        <li>Claims submitted more than 7 days after the delivery date.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-bold text-[#121212]">6. How to Request an Exchange</h2>
                    <p className="mt-1">
                        To start an exchange, message our Facebook Page or contact our WhatsApp support hotline with your <strong>Order Phone Number</strong> and the required size.
                    </p>
                </section>
            </div>
        </main>
    );
}