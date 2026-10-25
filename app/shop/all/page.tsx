// app/shop/all/page.tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ShopCatalog from "@/components/ShopCatalog";

export const metadata = {
    title: "Shop All | Batavia",
    description:
        "Explore our complete collection of timeless, minimalist high-end apparel.",
};

export default function ShopAllPage() {
    return (
        <main className="min-h-screen w-full bg-white pt-[102px]">
            <Navbar />
            <ShopCatalog initialCategory="all" />
            <Footer />
        </main>
    );
}