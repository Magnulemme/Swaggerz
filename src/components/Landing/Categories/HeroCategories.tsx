"use client";

import { useState, useEffect } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Test con 5 card colorate
  const testCards = [
    { id: 0, color: 'bg-red-500', label: 'Card 0' },
    { id: 1, color: 'bg-blue-500', label: 'Card 1' },
    { id: 2, color: 'bg-green-500', label: 'Card 2' },
    { id: 3, color: 'bg-yellow-500', label: 'Card 3' },
    { id: 4, color: 'bg-purple-500', label: 'Card 4' },
  ];

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setAutoplayEnabled(false);
    setActiveIndex((prev) => (prev === 0 ? testCards.length - 1 : prev - 1));
    setTimeout(() => {
      setIsTransitioning(false);
      setAutoplayEnabled(true);
      setAutoplayKey((prev) => prev + 1); // Reset autoplay timer
    }, 1500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setAutoplayEnabled(false);
    setActiveIndex((prev) => (prev === testCards.length - 1 ? 0 : prev + 1));
    setTimeout(() => {
      setIsTransitioning(false);
      setAutoplayEnabled(true);
      setAutoplayKey((prev) => prev + 1); // Reset autoplay timer
    }, 1500);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isTransitioning || !isDragging) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;

    const diff = touchEnd - touchStart;

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);

    // Swipe right (positive diff) = go prev
    // Swipe left (negative diff) = go next
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStart || isTransitioning || !isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;

    const diff = touchStart - touchEnd;

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);

    // Mouse: left drag (positive diff) = go next
    // Mouse: right drag (negative diff) = go prev
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Autoplay
  useEffect(() => {
    if (!autoplayEnabled) return;

    const interval = setInterval(() => {
      if (!document.hidden && !isTransitioning) {
        setIsTransitioning(true);
        setActiveIndex((prev) => (prev === testCards.length - 1 ? 0 : prev + 1));
        setTimeout(() => {
          setIsTransitioning(false);
          setAutoplayKey((prev) => prev + 1); // Reset autoplay timer after autoplay transition
        }, 1500);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [autoplayEnabled, isTransitioning, testCards.length, autoplayKey]);

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

      {/* Controlli navigazione - nascosti solo su mobile */}
      <div className="hidden md:flex px-md md:px-lg lg:px-xl xl:px-2xl justify-end gap-3 mb-8 mt-6">
        <button
          onClick={goToNext}
          disabled={isTransitioning}
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
          onClick={goToPrev}
          disabled={isTransitioning}
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

      {/* Custom Carousel - Universale per tutti i dispositivi */}
      <div
        className="relative w-full overflow-hidden py-8"
        data-lenis-prevent
      >
        {/* Background parallax blur - solo desktop */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className={`w-[50vw] h-[60vh] transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${testCards[activeIndex].color} rounded-full`}
            style={{
              filter: 'blur(80px) brightness(0.3)',
              opacity: 0.25,
            }}
          />
        </div>

        <div
          className="relative flex items-center justify-center gap-8 h-[80vh] max-h-[500px] cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Render all cards, each calculates its position relative to activeIndex */}
          {testCards.map((card, index) => {
            // Calculate relative position to activeIndex
            const diff = (index - activeIndex + testCards.length) % testCards.length;

            // Determine which slot this card belongs to
            let slotClasses = '';
            if (diff === 0) {
              // This is the active card (center)
              slotClasses = 'left-1/2 -translate-x-1/2 rotate-0 scale-100 opacity-100';
            } else if (diff === testCards.length - 1 || diff === -1) {
              // This is prev (left visible) - responsive positioning, completamente visibile su desktop
              slotClasses = 'left-[-25%] md:left-[5%] lg:left-[15%] -translate-x-1/2 rotate-90 scale-[0.6] md:scale-[0.65] lg:scale-[0.7] opacity-60 md:opacity-80 lg:opacity-100';
            } else if (diff === 1) {
              // This is next (right visible) - USING LEFT INSTEAD OF RIGHT for smooth transitions
              slotClasses = 'left-[125%] md:left-[95%] lg:left-[85%] -translate-x-1/2 rotate-90 scale-[0.6] md:scale-[0.65] lg:scale-[0.7] opacity-60 md:opacity-80 lg:opacity-100';
            } else if (diff === testCards.length - 2 || diff === -2) {
              // This is prevPrev (hidden left) - same position/rotation as prev, only invisible
              slotClasses = 'left-[-25%] md:left-[5%] lg:left-[15%] -translate-x-1/2 rotate-90 scale-[0.6] md:scale-[0.65] lg:scale-[0.7] opacity-0';
            } else if (diff === 2) {
              // This is nextNext (hidden right) - USING LEFT INSTEAD OF RIGHT for smooth transitions
              slotClasses = 'left-[125%] md:left-[95%] lg:left-[85%] -translate-x-1/2 rotate-90 scale-[0.6] md:scale-[0.65] lg:scale-[0.7] opacity-0';
            } else {
              // Hidden cards (should not show)
              slotClasses = 'left-1/2 -translate-x-1/2 opacity-0 invisible';
            }

            // Determine if this card is clickable (prev or next)
            const isClickable = diff === testCards.length - 1 || diff === 1;
            const handleCardClick = () => {
              if (!isClickable || isTransitioning) return;
              if (diff === testCards.length - 1) {
                goToPrev();
              } else if (diff === 1) {
                goToNext();
              }
            };

            return (
              <div
                key={index}
                className={`absolute w-[70vw] max-w-[350px] h-[70vh] max-h-[450px] transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${slotClasses} ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
                onClick={handleCardClick}
              >
                <div className={`relative w-full h-full ${card.color} rounded-2xl flex flex-col gap-4 items-center justify-center text-white font-bold overflow-visible`}>
                  {/* Title - mobile inside card, desktop centered */}
                  <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black drop-shadow-2xl tracking-tight leading-none">
                    {card.label}
                  </div>
                  <div className="text-8xl bg-black/70 px-8 py-4 rounded-xl">
                    {diff}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
