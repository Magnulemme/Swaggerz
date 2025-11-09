import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../globals.css";
import StickyFooter from "@/components/StickyFooter";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwaggerZ - Streetwear & Digital Art",
  description: "SwaggerZ - Premium streetwear e-commerce con design esclusivi, arte digitale e NFT. Scopri le nostre collezioni Essentials, Generative Art e Retrò.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScrollProvider>
      <div className={`${jost.variable} antialiased min-h-screen bg-dark-900 text-white`}>
        {children}
        <StickyFooter />
      </div>
    </SmoothScrollProvider>
  );
}