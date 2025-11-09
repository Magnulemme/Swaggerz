// app/layout.tsx
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const pastorOfMuppets = localFont({
  src: "../../public/fonts/PastorOfMuppets.ttf",
  variable: "--font-pastor-of-muppets",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SwaggerZ - Streetwear & Digital Art",
  description: "SwaggerZ - Premium streetwear e-commerce con design esclusivi, arte digitale e NFT. Scopri le collezioni Essentials, Generative Art e Retrò.",
  keywords: ["streetwear", "digital art", "NFT", "essentials", "generative art", "retro", "vintage", "limited edition", "e-commerce"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical hero images - Desktop */}
        <link
          rel="preload"
          as="image"
          href="/hero desk/swaggerz-hero.avif"
          type="image/avif"
          media="(min-width: 1024px)"
        />

        {/* Preload critical hero images - Mobile */}
        <link
          rel="preload"
          as="image"
          href="/hero mob/hero-streetwear-1.avif"
          type="image/avif"
          media="(max-width: 1023px)"
        />

        {/* Preload font Pastor of Muppets */}
        <link
          rel="preload"
          href="/fonts/PastorOfMuppets.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Preconnect to external image domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Preload Cloudflare Turnstile script */}
        <link
          rel="preload"
          href="https://challenges.cloudflare.com/turnstile/v0/api.js"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${jost.variable} ${pastorOfMuppets.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}