"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ShaderText from "@/components/ShaderText";

interface ImageConfig {
  url: string;
  alt: string;
  description?: string;
  price?: string;
  nickname?: string;
  badge?: "hot" | "sale" | "new" | "exclusive";
  aspectRatio?: number;
}

interface HeroWaveImagesMobileProps {
  images?: ImageConfig[];
  className?: string;
}

const defaultImages: ImageConfig[] = [
  {
    url: "/felpa.jpg",
    alt: "Felpe",
    description: "Design unici e comfort streetwear per il tuo stile urban",
    nickname: "Le Swag",
    badge: "hot",
    aspectRatio: 4 / 5,
  },
  {
    url: "/pants.jpg",
    alt: "Pantaloni",
    description: "Comfort e stile per le tue giornate in movimento",
    nickname: "Gli Hype",
    aspectRatio: 4 / 5,
  },
  {
    url: "/tshirt.jpg",
    alt: "T-shirt",
    description: "Grafiche esclusive e tessuti premium per il tuo look",
    nickname: "Le Cool",
    badge: "new",
    aspectRatio: 4 / 5,
  },
  {
    url: "/giubbotto.jpg",
    alt: "Giubbotti",
    description: "Layer perfetti per ogni stagione e occasione",
    nickname: "I Glamour",
    aspectRatio: 4 / 5,
  },
];

// Card component riutilizzabile
function CategoryCard({ image }: { image: ImageConfig }) {
  return (
    <article className="group relative flex flex-col cursor-pointer h-full">
      {/* Container esterno con bordo e glow */}
      <div className="relative border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 bg-gradient-to-b from-zinc-900/95 via-zinc-900/90 to-black/95 backdrop-blur-sm h-full">
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
              loading="eager"
              unoptimized
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="relative px-4 pb-4 pt-3 space-y-2">
          {/* Nickname Tag - Above title */}
          {image.nickname && (
            <span className="absolute -top-5 left-0 z-10 inline-block px-3 py-2 text-xs italic font-bold uppercase tracking-wider text-zinc-200 bg-zinc-950 rounded-tr-lg  group-hover:text-amber-400 group-hover:border-amber-500/50 group-hover:bg-zinc-900/90 transition-all duration-300">
              &ldquo;{image.nickname}&rdquo;
            </span>
          )}

          {/* Title */}
          <h3 className="text-4xl font-jost font-black leading-tight w-fit bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {image.alt}
          </h3>

          {/* Description */}
          {image.description && (
            <p className="text-sm text-zinc-300/80 leading-relaxed line-clamp-2">
              {image.description}
            </p>
          )}

          {/* CTA Link */}
          <div className="pt-2">
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
