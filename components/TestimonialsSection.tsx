import { SectionHeader } from "./SectionHeader";

const REVIEWS = [
    {
        quote:
            "“অনলাইনে বেশিরভাগ পাঞ্জাবির এমব্রয়ডারি বাস্তবে দেখতে সাদামাটা লাগে, কিন্তু নুসরাত পাঞ্জাবির কাজগুলো বাস্তবে অনেক বেশি নিখুঁত ও স্পষ্ট। এক কথায় দারুণ ফিনিশিং”",
        author: "হাবিবুর রহমান, ধানমন্ডি",
    },
    {
        quote:
            "“অবশেষে এমন একটি ব্র্যান্ড পেলাম যেখানে আরাম আর আভিজাত্য দুটোই একসাথে আছে! পাঞ্জাবিটির ফিটিং দেখে মনে হয়েছে যেন দর্জি দিয়ে একদম আমার গায়ের মাপে বানিয়ে নেওয়া”",
        author: "লোকমান হোসেন, চট্টগ্রাম",
    },
    {
        quote:
            "“সাইজ চার্ট দেখে ৫৪ (M) সাইজের জুব্বা অর্ডার করেছিলাম, লম্বা আর কাঁধের মাপ একদম পারফেক্ট হয়েছে। বুকের কাছে ঢিলেঢালা ভাব নেই, খাঁটি অ্যারাবিয়ান লুকটা চমৎকারভাবে ফুটে উঠেছে”",
        author: "জাহিদুল ইসলাম, উত্তরা",
    },
    {
        quote:
            "“বড় ভাইয়ের জন্মদিনের উপহার হিসেবে পাঞ্জাবিটি অর্ডার করেছিলাম। ফেব্রিক আর কোয়ালিটি ভাইয়ের খুবই পছন্দ হয়েছে। সাথে যে সিগনেচার গিফট বক্সটি পেয়েছি, তা উপহার দেওয়ার জন্য এক কথায় অসাধারণ। প্যাকেজিং প্রত্যাশার চেয়েও বেশি প্রিমিয়াম ছিল।”",
        author: "তানভীর আহমেদ, বনানী",
    },
    {
        quote:
            "“রবিবার সন্ধ্যায় অর্ডার দিয়েছিলাম, এক ঘণ্টার মধ্যেই কল করে অর্ডার কনফার্ম করে। আর পরের দিন সকালেই পার্সেল হাতে পেয়ে গেলাম! তাদের এত দ্রুত ডেলিভারি সার্ভিস দেখে সত্যিই অবাক হয়েছি।”",
        author: "কামরুল হাসান, মিরপুর",
    },
    {
        quote:
            "“সাইজ নিয়ে কিছুটা দ্বিধায় ছিলাম, তাই মেসেঞ্জারে যোগাযোগ করি। তাদের সাইজ গাইডেন্স ১০০% সঠিক ছিল। ৫৬ সাইজটি বুক আর কাঁধে একদম পারফেক্ট বসেছে। ফেব্রিক ও সেলাইয়ের মানে আমি সত্যিই মুগ্ধ।”",
        author: "সাজিদ চৌধুরী, সিলেট",
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative z-10 w-full border-t border-[#EAE5DB] bg-[#FAF8F5] px-4 py-12 sm:py-16 min-[810px]:px-6 min-[1200px]:py-[80px] min-[1200px]:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-8 sm:gap-12">
                <SectionHeader title="WHAT OUR CUSTOMERS SAID" align="center" />

                <div className="grid grid-cols-1 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3">
                    {REVIEWS.map((review, index) => {
                        const hasRightBorder = index % 3 !== 2 ? "min-[1200px]:border-r" : "";
                        const hasTopBorder = index >= 3 ? "min-[1200px]:border-t" : "";

                        return (
                            <div
                                key={review.author}
                                className={`flex h-auto w-full flex-col items-center justify-center border-b border-[#EAE5DB] py-6 px-4 min-[810px]:h-[360px] min-[810px]:py-0 min-[810px]:px-6 min-[1200px]:h-[400px] last:border-b-0 min-[810px]:border-b-0 ${hasRightBorder} ${hasTopBorder}`}
                            >
                                <div className="flex w-full max-w-[340px] flex-col items-center gap-3 sm:gap-5 min-[1200px]:gap-6">
                                    {/* Compact Gold Stars */}
                                    <div className="flex items-center justify-center gap-1 text-gold">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                viewBox="0 0 256 256"
                                                className="h-4 w-4 fill-gold sm:h-5 sm:w-5"
                                            >
                                                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Compact Quote Body */}
                                    <p className="text-center text-[13px] font-normal leading-relaxed text-[#2D2D2D] sm:text-[15px]">
                                        {review.quote}
                                    </p>

                                    {/* Author Name */}
                                    <p className="text-center text-[11px] font-semibold tracking-wider text-[#777777] uppercase sm:text-[12px]">
                                        {review.author}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}