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
      <div className="relative border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 bg-zinc-950 backdrop-blur-sm h-full">
        {/* Padding container per separare immagine dal bordo */}
        <div className="pb-2">
          {/* Image Container */}
          <div className="relative w-full overflow-hidden rounded-t-lg">
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
        </div>

        {/* Content Section */}
        <div className="relative px-6 pb-6 pt-3">
          {/* Nickname Tag - Above title */}
          {image.nickname && (
            <span className="absolute -top-8 left-0 z-10 inline-block px-3 py-1 text-sm italic font-bold uppercase tracking-wider text-zinc-200 bg-zinc-950 rounded-tr-2xl shadow-lg backdrop-blur-sm group-hover:text-amber-400 transition-all duration-300">
              &ldquo;{image.nickname}&rdquo;
            </span>
          )}

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-jost font-black leading-tight tracking-tight text-white mb-3">
            {image.alt}
          </h3>

          {/* Description */}
          {image.description && (
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-5">
              {image.description}
            </p>
          )}

          {/* CTA Link */}
          <div className="mt-auto">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 group-hover:text-amber-300 group-hover:gap-2.5 transition-all duration-300">
              Scopri {image.alt === "Felpe" ? "le nostre" : image.alt === "T-shirt" ? "le nostre" : "i nostri"} {image.alt}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
    <div className={`w-full pt-16 pb-8 ${className}`}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-6 px-4">
          {/* Eyebrow text */}
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/50 text-zinc-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Collezione 2025
            </span>
          </div>

          {/* Main Title */}
          <div className="flex flex-wrap items-start justify-center gap-3">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-white leading-none tracking-tight font-jost">
              Streetwear
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

          {/* Subtitle */}
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Crea il tuo outfit dei sogni, o completa il tuo guardaroba con i nostri esclusivi capi streetwear
          </p>
        </div>

        {/* Mobile: Slider */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 pl-4">
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
            {/* Spacer per padding finale */}
            <div className="w-4 flex-shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Tablet/Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-8">
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
      </div>
    </div>
  );
}
