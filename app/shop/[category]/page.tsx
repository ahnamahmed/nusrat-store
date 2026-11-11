// app/shop/[category]/page.tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ShopCatalog from "@/components/ShopCatalog";
import { SHOP_CATEGORIES } from "@/data/shopProducts";
import { getShopProducts } from "@/lib/sanity";
import { Metadata } from "next";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return [
        { category: "embroidery-panjabi" },
        { category: "printed-panjabi" },
        { category: "signature-panjabi" },
        { category: "thobe" },
        { category: "arabian-jubba" },
    ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const cat = SHOP_CATEGORIES.find((c) => c.slug === category);
    const label = cat ? cat.name : category === "arabian-jubba" ? "Thobe" : "Collection";
    return {
        title: `${label} Collection | Nusrat Panjabi`,
        description: `Explore our exclusive ${label} collection featuring bespoke craftsmanship and premium comfort.`,
    };
}

export default async function ShopCategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const products = await getShopProducts();

    return (
        <main className="min-h-screen w-full bg-white pt-[102px]">
            <Navbar />
            <ShopCatalog initialCategory={category} products={products} />
            <Footer />
        </main>
    );
}
