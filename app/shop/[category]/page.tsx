// app/shop/[category]/page.tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ShopCatalog from "@/components/ShopCatalog";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export default async function ShopCategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    return (
        <main className="min-h-screen w-full bg-white pt-[102px]">
            <Navbar />
            <ShopCatalog initialCategory={category} />
            <Footer />
        </main>
    );
}