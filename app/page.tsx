import { Navbar } from "@/components/Navbar";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ParallaxBanner } from "@/components/ParallaxBanner";
import { FeaturedProductSection } from "@/components/FeaturedProductSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FaqSection } from "@/components/FaqSection";
import { BenefitsBar } from "@/components/BenefitsBar";
import { Footer } from "@/components/Footer";

export default function BataviaHomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white">
      <Navbar />
      <NewsletterPopup />
      <HeroSection />

      <div className="relative z-10 flex w-full flex-col bg-white">
        <ProductsSection />
        <ParallaxBanner />
        <FeaturedProductSection />
        <TestimonialsSection />
        <CategoryGrid />
        <FaqSection />
        <BenefitsBar />
        <Footer />
      </div>
    </main>
  );
}