"use client";

import { LazyImage } from "@/components/ui/LazyImage";
import { WaveImageShader } from "./WaveImageShader";

export interface CategoryCardImage {
  url: string;
  alt: string;
  description?: string;
  nickname?: string;
  emoji?: string;
  aspectRatio?: number;
  waveIntensity?: number;
  waveSpeed?: number;
}

interface CategoryCardProps {
  image: CategoryCardImage;
  useWaveShader?: boolean;
}

export function CategoryCard({ image, useWaveShader = false }: CategoryCardProps) {
  return (
    <article className="group relative flex flex-col cursor-pointer h-full">
      {/* Container esterno con bordo e glow */}
      <div className="relative border border-light-subtle rounded-2xl overflow-hidden hover:border-brand-subtle hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 bg-dark-elevated backdrop-blur-sm h-full">
        {/* Padding container per separare immagine dal bordo */}
        <div className="pb-xs">
          {/* Image Container */}
          <div className="relative w-full overflow-hidden rounded-t-lg max-h-[450px]">
            {useWaveShader ? (
              // Desktop: Wave Shader Version
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: `${(image.aspectRatio ?? 4 / 5) * 1.2}`,
                }}
              >
                {/* Canvas con margine extra per l'effetto wave */}
                <div
                  className="absolute inset-0"
                  style={{
                    width: "calc(100% + 64px)",
                    height: "calc(100% + 64px)",
                    left: "-32px",
                    top: "-32px",
                  }}
                >
                  <WaveImageShader
                    imageUrl={image.url}
                    aspectRatio={image.aspectRatio ?? 4 / 5}
                    amplitude={image.waveIntensity}
                    waveSpeed={image.waveSpeed}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ) : (
              // Mobile: Simple Image Version
              <div className="relative w-full aspect-[4/5]">
                <LazyImage
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  rootMargin="300px"
                  eager={true}
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative px-md pb-md pt-xs">
          {/* Nickname Tag - Above title */}
          {image.nickname && (
            <span className="absolute -top-lg left-0 z-10 inline-block px-sm py-xs text-sm italic font-bold uppercase tracking-wider text-light-secondary bg-dark-elevated rounded-tr-2xl shadow-lg backdrop-blur-sm group-hover:text-brand transition-all duration-300">
              {image.emoji && (
                <span className="pl-2xs mr-2xs">{image.emoji}</span>
              )}
              &ldquo;{image.nickname}&rdquo;
            </span>
          )}

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-jost font-black leading-tight tracking-tight text-light mb-xs">
            {image.alt}
          </h3>

          {/* Description */}
          {image.description && (
            <p className="text-base text-light-tertiary leading-relaxed line-clamp-2 mb-sm">
              {image.description}
            </p>
          )}

          {/* CTA Link */}
          <div className="mt-auto">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:text-brand group-hover:gap-2.5 transition-all duration-300">
              Scopri{" "}
              {image.alt === "Felpe"
                ? "le nostre"
                : image.alt === "T-shirt"
                ? "le nostre"
                : "i nostri"}{" "}
              {image.alt}
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
