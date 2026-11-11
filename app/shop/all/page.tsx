// app/shop/all/page.tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ShopCatalog from "@/components/ShopCatalog";
import { getShopProducts } from "@/lib/sanity";

export const metadata = {
    title: "Shop All Collections | Nusrat Panjabi",
    description:
        "Explore our complete collection of timeless, minimalist high-end apparel.",
};

export default async function ShopAllPage() {
    const products = await getShopProducts();

    return (
        <main className="min-h-screen w-full bg-white pt-[102px]">
            <Navbar />
            <ShopCatalog initialCategory="all" products={products} />
            <Footer />
        </main>
    );
}
