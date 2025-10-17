// app/layout.tsx
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const pastorOfMuppets = localFont({
  src: "../../public/fonts/PastorOfMuppets.ttf",
  variable: "--font-pastor-of-muppets",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swaggerz Collective - Streetwear Autentico",
  description: "Abbigliamento che unisce cultura della strada e arte contemporanea. Espressione autentica per chi vive la città.",
  keywords: ["streetwear", "moda urbana", "limited edition", "street culture", "Milano"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Preload video critico - inizia il download SUBITO */}
        <link
          rel="preload"
          href="/videos/hero-video-optimized.mp4"
          as="video"
          type="video/mp4"
        />

        {/* Preload font Pastor of Muppets */}
        <link
          rel="preload"
          href="/fonts/PastorOfMuppets.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Preconnect a domini esterni per immagini */}
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