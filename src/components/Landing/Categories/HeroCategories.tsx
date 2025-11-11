"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { CategoryCard } from "./CategoryCard";
import { SectionTitle } from "../SectionTitle";

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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1.15);

  // Update slides per view on resize
  // Con centeredSlides, questi valori mostrano peek su entrambi i lati
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1536) setSlidesPerView(2.5);
      else if (width >= 1280) setSlidesPerView(2.2);
      else if (width >= 1024) setSlidesPerView(1.8);
      else if (width >= 640) setSlidesPerView(1.4);
      else setSlidesPerView(1.2);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const scrollPrev = () => swiperInstance?.slidePrev();
  const scrollNext = () => swiperInstance?.slideNext();

  return (
    <div className={`relative w-full ${className}`}>
      {/* Title */}
      <div className="px-md md:px-lg lg:px-xl xl:px-2xl">
        <SectionTitle
          title="Esplora le"
          shaderText="Categorie"
          description="Trova il tuo stile perfetto tra le nostre categorie curate"
          size="md"
        />
      </div>

      {/* Controlli navigazione - nascosti su mobile */}
      <div className="hidden md:flex px-md md:px-lg lg:px-xl xl:px-2xl justify-end gap-3 mb-8 mt-6">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="flex group p-sm rounded-full items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 bg-dark-elevated cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10"
          aria-label="Previous slides"
        >
          <svg
            className="size-icon text-light-primary group-hover:text-brand transition-all duration-500 group-disabled:group-hover:text-light-primary"
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

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="flex group p-sm rounded-full items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 bg-dark-elevated cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10"
          aria-label="Next slides"
        >
          <svg
            className="size-icon text-light-primary group-hover:text-brand transition-all duration-500 group-disabled:group-hover:text-light-primary"
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
      </div>

      <div className="relative max-w-[1600px] mx-auto z-10 px-md md:px-lg lg:px-xl xl:px-2xl">
        {/* Swiper con effetto peek e scale */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={32}
          slidesPerView={slidesPerView}
          centeredSlides={true}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            setCanScrollPrev(!swiper.isBeginning);
            setCanScrollNext(!swiper.isEnd);
            setActiveIndex(swiper.activeIndex);
          }}
          onInit={(swiper) => {
            setCanScrollPrev(!swiper.isBeginning);
            setCanScrollNext(!swiper.isEnd);
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            const scale = isActive ? 1 : 0.5;

            return (
              <SwiperSlide key={image.url}>
                <div
                  className="transition-transform duration-500 ease-out origin-center"
                  style={{ transform: `scale(${scale})` }}
                >
                  <CategoryCard image={image} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
