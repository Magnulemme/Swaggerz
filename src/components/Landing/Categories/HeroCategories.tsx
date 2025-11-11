"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css/bundle";
import "swiper/css/effect-coverflow";
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
  // Duplicate images for better loop performance with coverflow
  const duplicatedImages = [...images, ...images, ...images];

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const scrollPrev = () => swiperInstance?.slidePrev();
  const scrollNext = () => swiperInstance?.slideNext();

  // Force update on mount to fix initial loop rendering
  useEffect(() => {
    if (swiperInstance) {
      // First update immediately
      swiperInstance.update();

      // Second update after a delay to fix loop positioning
      setTimeout(() => {
        swiperInstance.update();
        swiperInstance.slideToLoop(0, 0); // Force to first slide without animation
        setIsReady(true);
      }, 200);
    }
  }, [swiperInstance]);

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

      {/* Griglia statica - visibile solo su desktop grande quando ci sono <= 4 card */}
      {images.length <= 4 && (
        <div className="hidden xl:grid grid-cols-4 gap-6 px-md md:px-lg lg:px-xl xl:px-2xl mt-8">
          {images.map((image) => (
            <div key={image.url} className="w-full max-w-[380px] mx-auto">
              <CategoryCard image={image} />
            </div>
          ))}
        </div>
      )}

      {/* Controlli navigazione - nascosti su mobile e su desktop se griglia statica */}
      <div
        className={`${
          images.length <= 4 ? "xl:hidden" : ""
        } hidden md:flex px-md md:px-lg lg:px-xl xl:px-2xl justify-end gap-3 mb-8 mt-6`}
      >
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

      {/* Slider Container - nascosto solo su desktop XL se ci sono <= 4 card */}
      <div
        className={`${
          images.length <= 4 ? "xl:hidden" : ""
        } relative w-full transition-opacity duration-300 ${
          !isReady ? "opacity-0" : "opacity-100"
        }`}
        data-lenis-prevent
      >
        <Swiper
          modules={[Navigation, EffectCoverflow, Autoplay]}
          effect="coverflow"
          loop={true}
          initialSlide={0}
          observer={true}
          observeParents={true}
          watchSlidesProgress={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
            scale: 0.85,
          }}
          slidesPerView={1.5}
          centeredSlides={true}
          grabCursor={true}
          threshold={5}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
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
          className="py-8 categories-coverflow"
        >
          {duplicatedImages.map((image, index) => (
            <SwiperSlide key={`${image.url}-${index}`}>
              <div className="max-w-[380px] mx-auto">
                <CategoryCard image={image} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
