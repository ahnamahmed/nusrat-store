import type { Metadata } from "next";
import { Cormorant_SC, Geist } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nusrat - Traditional Clothing",
  description:
    "Nusrat is designed for your wardrobe with timeless clothes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorantSC.variable} ${geist.variable} ${hindSiliguri.variable}`}>
      <body className="bg-white text-[#121212] font-sans antialiased selection:bg-[#121212] selection:text-white">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
