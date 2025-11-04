"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
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
  soldCount?: number;
  popularityLabel?: string;
}

interface HeroCategoriesProps {
  images?: ImageConfig[];
  className?: string;
}

const defaultImages: ImageConfig[] = [
  {
    url: "/felpa.jpg",
    alt: "Felpe",
    description:
      "Quando il comfort incontra l'attitudine. Perfette per chi non scende a compromessi",
    nickname: "Le Swag",
    emoji: "✨",
    badge: "hot",
    aspectRatio: 5 / 6,
  },
  {
    url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=960&fit=crop",
    alt: "Pantaloni",
    description:
      "L'energia della strada in ogni movimento. Progettati per chi vive al massimo",
    nickname: "Gli Hype",
    emoji: "⚡",
    aspectRatio: 5 / 6,
  },
  {
    url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=960&fit=crop",
    alt: "T-shirt",
    description:
      "Essenziali ma mai banali. L'equilibrio perfetto tra semplicità e carattere",
    nickname: "Le Cool",
    emoji: "🌟",
    badge: "new",
    aspectRatio: 5 / 6,
  },
  {
    url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=960&fit=crop",
    alt: "Giubbotti",
    description:
      "L'eleganza incontra la strada. Statement piece che completa ogni outfit",
    nickname: "I Glamour",
    emoji: "👑",
    aspectRatio: 5 / 6,
  },
];

export function HeroCategories({
  images = defaultImages,
  className = "",
}: HeroCategoriesProps) {
  const imageCount = images.length;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Configura slidesPerView dinamicamente
  const getSlidesPerView = (breakpoint: number) => {
    if (breakpoint >= 6 && imageCount >= 6) return 6;
    if (breakpoint >= 4 && imageCount >= 4) return 4;
    if (breakpoint >= 3 && imageCount >= 3) return 3;
    if (breakpoint >= 2 && imageCount >= 2) return 2;
    return 1;
  };

  const scrollPrev = () => swiperInstance?.slidePrev();
  const scrollNext = () => swiperInstance?.slideNext();

  return (
    <div
      className={`relative w-full px-md md:px-lg lg:px-xl xl:px-2xl  ${className}`}
    >
      <div className="relative max-w-[1600px] mx-auto z-10">
        {/* Slider con controlli overlay */}
        <div className="relative">
          {/* Freccia Sinistra - Overlay */}
          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex group p-sm rounded-full items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 bg-dark-elevated cursor-pointer"
              aria-label="Previous slides"
            >
              <svg
                className="size-icon text-light-primary group-hover:text-brand transition-all duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </button>
          )}

          {/* Swiper - dimensioni automatiche */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={getSlidesPerView(1)}
            breakpoints={{
              640: { slidesPerView: getSlidesPerView(2) },
              1024: { slidesPerView: getSlidesPerView(3) },
              1280: { slidesPerView: getSlidesPerView(4) },
              1536: { slidesPerView: getSlidesPerView(6) },
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setCanScrollPrev(!swiper.isBeginning);
              setCanScrollNext(!swiper.isEnd);
            }}
            onInit={(swiper) => {
              setCanScrollPrev(!swiper.isBeginning);
              setCanScrollNext(!swiper.isEnd);
            }}
          >
            {images.map((image) => (
              <SwiperSlide key={image.url}>
                <CategoryCard image={image} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Freccia Destra - Overlay */}
          {canScrollNext && (
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex group p-sm rounded-full items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 bg-dark-elevated cursor-pointer"
              aria-label="Next slides"
            >
              <svg
                className="size-icon text-light-primary group-hover:text-brand transition-all duration-500"
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
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
