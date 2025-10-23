"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ShaderText from "@/components/ShaderText";

interface ImageConfig {
  url: string;
  alt: string;
  description?: string;
  price?: string;
  category?: string;
  badge?: "hot" | "sale" | "new" | "exclusive";
  aspectRatio?: number;
}

interface HeroWaveImagesMobileProps {
  images?: ImageConfig[];
  className?: string;
}

const defaultImages: ImageConfig[] = [
  {
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=90",
    alt: "Felpe",
    description: "Design unici e comfort streetwear per il tuo stile urban",
    category: "Le Swag",
    badge: "hot",
    aspectRatio: 4 / 5,
  },
  {
    url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=90",
    alt: "Pants",
    description: "Comfort e stile per le tue giornate in movimento",
    category: "Gli Hype",
    aspectRatio: 4 / 5,
  },
  {
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=90",
    alt: "T-shirt",
    description: "Grafiche esclusive e tessuti premium per il tuo look",
    category: "Le Cool",
    badge: "new",
    aspectRatio: 4 / 5,
  },
  {
    url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=90",
    alt: "Giubbotti",
    description: "Layer perfetti per ogni stagione e occasione",
    category: "I Glamour",
    aspectRatio: 4 / 5,
  },
];

// Card component riutilizzabile
function CategoryCard({ image }: { image: ImageConfig }) {
  return (
    <article className="group relative flex flex-col cursor-pointer h-full">
      {/* Container esterno con bordo e glow */}
      <div className="relative border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 bg-gradient-to-b from-zinc-900/95 via-zinc-900/90 to-black/95 backdrop-blur-sm h-full">
        {/* Badge */}
        {image.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm text-[10px] font-bold shadow-lg ${
                image.badge === "hot"
                  ? "bg-red-500/95 text-white"
                  : image.badge === "sale"
                  ? "bg-yellow-500/95 text-black"
                  : image.badge === "new"
                  ? "bg-green-500/95 text-white"
                  : "bg-white/95 text-black"
              }`}
            >
              <ShoppingBag className="w-2.5 h-2.5" />
              {image.badge.toUpperCase()}
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative w-full overflow-hidden rounded-t-2xl">
          <div
            className="relative w-full"
            style={{
              aspectRatio: `${image.aspectRatio ?? 4 / 5}`,
            }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 pb-4 pt-3 space-y-2">
          {/* Category Badge */}
          {image.category && (
            <span className="inline-block text-sm font-semibold text-white">
              {image.category}
            </span>
          )}

          {/* Title */}
          <h3 className="font-bold leading-tight w-fit">
            <ShaderText fontSize="50px" fontWeight="900">
              {image.alt}
            </ShaderText>
          </h3>

          {/* Description */}
          {image.description && (
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
              {image.description}
            </p>
          )}

          {/* CTA Link */}
          <div className="pt-1.5">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 group-hover:text-amber-400 group-hover:gap-2.5 transition-all duration-300">
              Vedi tutti i prodotti
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HeroWaveImagesMobile({
  images = defaultImages,
  className = "",
}: HeroWaveImagesMobileProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  return (
    <div className={`w-full py-16 ${className}`}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4 px-4">
          <div className="flex flex-wrap items-start justify-center gap-3">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-none">
              Street
            </h2>
            <ShaderText
              fontSize="clamp(60px, 12vw, 90px)"
              fontWeight="900"
              maxFontSize={90}
              className="leading-none"
            >
              Essentials
            </ShaderText>
          </div>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto">
            Scegli il tuo stile tra le nostre categorie di capi esclusivi
          </p>
        </div>

        {/* Mobile: Slider */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-4">
            {images.map((image, index) => (
              <div
                key={image.url}
                className="flex-[0_0_85%] min-w-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CategoryCard image={image} />
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {images.map((image, index) => (
            <div
              key={image.url}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CategoryCard image={image} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-sm shadow-lg shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
            <span>Esplora l&apos;intero catalogo</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
