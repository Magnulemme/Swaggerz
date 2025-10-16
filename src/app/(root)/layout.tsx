import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rebkon",
  description: "Rebkon - An e-commerce for clothes, stickers and digital art to add style and personality to your spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${jost.variable} antialiased min-h-screen bg-dark-900 text-white`}>
      {children}
    </div>
  );
}