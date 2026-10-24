import type { Metadata } from "next";
import { Cormorant_SC, Geist } from "next/font/google";
import "./globals.css";

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
  title: "Batavia - Timeless E-commerce Fashion Template",
  description:
    "Batavia is a template designed for fashion brands and trendsetters looking to upgrade their wardrobe with timeless clothes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorantSC.variable} ${geist.variable}`}>
      <body className="bg-white text-[#121212] font-sans antialiased selection:bg-[#121212] selection:text-white">
        {children}
      </body>
    </html>
  );
}
