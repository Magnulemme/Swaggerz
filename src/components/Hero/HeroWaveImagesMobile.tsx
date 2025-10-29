"use client";

import useEmblaCarousel from "embla-carousel-react";
import ShaderText from "@/components/ShaderText";
import { CategoryCard } from "./CategoryCard";

interface ImageConfig {
  url: string;
  alt: string;
  description?: string;
  price?: string;
  nickname?: string;
  emoji?: string;
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
    emoji: "✨",
    badge: "hot",
    aspectRatio: 4 / 5,
  },
  {
    url: "/pants.jpg",
    alt: "Pantaloni",
    description: "Comfort e stile per le tue giornate in movimento",
    nickname: "Gli Hype",
    emoji: "⚡",
    aspectRatio: 4 / 5,
  },
  {
    url: "/tshirt.jpg",
    alt: "T-shirt",
    description: "Grafiche esclusive e tessuti premium per il tuo look",
    nickname: "Le Cool",
    emoji: "🌟",
    badge: "new",
    aspectRatio: 4 / 5,
  },
  {
    url: "/giubbotto.jpg",
    alt: "Giubbotti",
    description: "Layer perfetti per ogni stagione e occasione",
    nickname: "I Glamour",
    emoji: "👑",
    aspectRatio: 4 / 5,
  },
];

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
    <div className={`w-full pt-2xl pb-lg ${className}`}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-xl space-y-md px-sm">
          {/* Eyebrow text */}
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-light-subtle bg-dark-elevated text-light-secondary text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Collezione 2025
            </span>
          </div>

          {/* Main Title */}
          <div className="flex flex-wrap items-start justify-center gap-3">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-light leading-none tracking-tight font-jost">
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
          <p className="text-base text-light-secondary max-w-prose mx-auto leading-relaxed">
            Crea il tuo outfit dei sogni, o completa il tuo guardaroba con i
            nostri esclusivi capi streetwear
          </p>
        </div>

        {/* Mobile: Slider */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-sm pl-sm">
            {images.map((image, index) => (
              <div
                key={image.url}
                className="flex-[0_0_85%] min-w-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CategoryCard image={image} useWaveShader={false} />
              </div>
            ))}
            {/* Spacer per padding finale */}
            <div className="w-sm flex-shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Tablet/Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-md px-md md:px-lg">
          {images.map((image, index) => (
            <div
              key={image.url}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CategoryCard image={image} useWaveShader={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
