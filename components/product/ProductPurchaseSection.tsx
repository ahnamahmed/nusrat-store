"use client";

import React, { useState } from "react";

interface ProductPurchaseSectionProps {
    productName: string;
    price: number;
    availableSizes?: (string | number)[];
}

export default function ProductPurchaseSection({
    productName,
    price,
    availableSizes = [40, 42, 44, 46, 48],
}: ProductPurchaseSectionProps) {
    const [selectedSize, setSelectedSize] = useState<string | number>(availableSizes[0] || 42);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        deliveryArea: "inside", // "inside" (৳70) or "outside" (৳130)
    });

    const deliveryCharge = formData.deliveryArea === "inside" ? 70 : 130;
    const subtotal = price * quantity;
    const total = subtotal + deliveryCharge;

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Connect to your Google Sheet / n8n webhook / database here
        console.log("Order Placed:", {
            product: productName,
            size: selectedSize,
            quantity,
            subtotal,
            deliveryCharge,
            total,
            customer: formData,
        });
        setIsSubmitted(true);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setFormData({ name: "", phone: "", address: "", deliveryArea: "inside" });
        setQuantity(1);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Size Selector */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#121212]">
                    <span className="font-semibold">Select Size:</span>
                    <span className="text-[#C5A059] font-medium">Selected: {selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {availableSizes.map((size) => {
                        const isSelected = selectedSize === size;
                        return (
                            <button
                                key={size}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className={`flex h-11 min-w-[50px] cursor-pointer items-center justify-center border px-3 text-sm font-medium transition-all ${isSelected
                                        ? "border-[#C5A059] bg-[#C5A059] text-black shadow-sm font-semibold"
                                        : "border-[#ededed] bg-white text-[#121212] hover:border-[#C5A059]/60"
                                    }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Quantity & Order Button */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Quantity Toggle */}
                <div className="flex h-12 w-32 items-center justify-between border border-[#ededed] px-3">
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-lg text-[#8f8f8f] hover:text-[#121212]"
                    >
                        -
                    </button>
                    <span className="text-sm font-semibold text-[#121212]">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-lg text-[#8f8f8f] hover:text-[#121212]"
                    >
                        +
                    </button>
                </div>

                {/* Action Button */}
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex h-12 flex-1 cursor-pointer items-center justify-center bg-[#121212] px-6 text-xs font-semibold tracking-[0.16em] uppercase text-white transition-colors duration-200 hover:bg-[#C5A059] hover:text-black"
                >
                    ORDER NOW (CASH ON DELIVERY)
                </button>
            </div>

            {/* Cash on Delivery Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                    <div className="relative w-full max-w-lg border border-[#ededed] bg-white p-6 shadow-2xl sm:p-8">
                        {/* Close Button */}
                        <button
                            onClick={resetForm}
                            className="absolute right-4 top-4 text-[#8f8f8f] hover:text-[#121212]"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmitOrder} className="flex flex-col gap-5">
                                <div>
                                    <h3 className="font-serif-sc text-2xl font-semibold uppercase tracking-wide text-[#121212]">
                                        Confirm Your Order
                                    </h3>
                                    <p className="text-xs text-[#8f8f8f]">
                                        ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করতে নিচের তথ্যগুলো পূরণ করুন।
                                    </p>
                                </div>

                                {/* Selected Item Summary */}
                                <div className="border border-[#ededed] bg-[#fbfbfb] p-3 text-xs leading-relaxed text-[#4b4b4b]">
                                    <p className="font-semibold text-[#121212]">{productName}</p>
                                    <p>সাইজ: <span className="text-[#C5A059] font-medium">{selectedSize}</span> | পরিমাণ: {quantity} টি</p>
                                </div>

                                {/* Input Fields */}
                                <div className="flex flex-col gap-3.5">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium uppercase text-[#121212]">
                                            আপনার নাম (Full Name) *
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. মোঃ তানভীর আহমেদ"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border border-[#ededed] px-3.5 py-2.5 text-sm text-[#121212] outline-none focus:border-[#C5A059]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-medium uppercase text-[#121212]">
                                            মোবাইল নম্বর (Phone Number) *
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="01XXXXXXXXX"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full border border-[#ededed] px-3.5 py-2.5 text-sm text-[#121212] outline-none focus:border-[#C5A059]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-medium uppercase text-[#121212]">
                                            ডেলিভারি এলাকা (Delivery Area) *
                                        </label>
                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <label
                                                className={`flex cursor-pointer items-center justify-between border p-3 ${formData.deliveryArea === "inside"
                                                        ? "border-[#C5A059] bg-[#C5A059]/10 font-semibold text-[#121212]"
                                                        : "border-[#ededed] text-[#4b4b4b]"
                                                    }`}
                                            >
                                                <span className="flex items-center gap-1.5">
                                                    <input
                                                        type="radio"
                                                        name="deliveryArea"
                                                        checked={formData.deliveryArea === "inside"}
                                                        onChange={() => setFormData({ ...formData, deliveryArea: "inside" })}
                                                    />
                                                    ঢাকার ভেতরে
                                                </span>
                                                <span>৳70</span>
                                            </label>

                                            <label
                                                className={`flex cursor-pointer items-center justify-between border p-3 ${formData.deliveryArea === "outside"
                                                        ? "border-[#C5A059] bg-[#C5A059]/10 font-semibold text-[#121212]"
                                                        : "border-[#ededed] text-[#4b4b4b]"
                                                    }`}
                                            >
                                                <span className="flex items-center gap-1.5">
                                                    <input
                                                        type="radio"
                                                        name="deliveryArea"
                                                        checked={formData.deliveryArea === "outside"}
                                                        onChange={() => setFormData({ ...formData, deliveryArea: "outside" })}
                                                    />
                                                    ঢাকার বাইরে
                                                </span>
                                                <span>৳130</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-medium uppercase text-[#121212]">
                                            সম্পূর্ণ ঠিকানা (Full Delivery Address) *
                                        </label>
                                        <textarea
                                            required
                                            rows={2}
                                            placeholder="বাড়ি নম্বর, রোড নম্বর, এলাকা, জেলা"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full border border-[#ededed] px-3.5 py-2 text-sm text-[#121212] outline-none focus:border-[#C5A059]"
                                        />
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="border-t border-[#ededed] pt-3 text-xs text-[#4b4b4b]">
                                    <div className="flex justify-between py-1">
                                        <span>প্রোডাক্ট মূল্য:</span>
                                        <span>৳{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span>ডেলিভারি চার্জ:</span>
                                        <span>৳{deliveryCharge}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-[#ededed] pt-2 text-sm font-bold text-[#121212]">
                                        <span>সর্বমোট প্রদেয় (Total):</span>
                                        <span className="text-[#C5A059]">৳{total}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="flex h-12 w-full cursor-pointer items-center justify-center bg-[#121212] text-xs font-semibold tracking-widest uppercase text-white transition-colors hover:bg-[#C5A059] hover:text-black"
                                >
                                    অর্ডার নিশ্চিত করুন (CONFIRM ORDER)
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C5A059]/20 text-[#C5A059]">
                                    ✓
                                </div>
                                <h3 className="font-serif-sc text-2xl font-bold uppercase text-[#121212]">
                                    Order Placed Successfully!
                                </h3>
                                <p className="max-w-xs text-xs text-[#4b4b4b]">
                                    ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই কল করে পার্সেল কনফার্ম করবেন।
                                </p>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="mt-2 border border-[#121212] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121212] hover:bg-[#121212] hover:text-white"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}