"use client";

import { ArrowLeft, ArrowRight, Flame, Sparkles, Crown, Trophy } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Card, { CardProps } from "@/components/Card";
import Link from "next/link";

export interface GalleryStripProps {
  title: string;
  subtitle?: string;
  items: CardProps[];
  viewAllHref?: string;
  className?: string;
  icon?: "flame" | "sparkles" | "crown" | "trophy";
}

const iconMap = {
  flame: Flame,
  sparkles: Sparkles,
  crown: Crown,
  trophy: Trophy,
};

export default function GalleryStrip({
  title,
  subtitle,
  items,
  viewAllHref = "/gallery",
  className = "",
  icon = "flame"
}: GalleryStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const IconComponent = iconMap[icon];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    const element = scrollRef.current;
    if (element) {
      checkScroll();
      element.addEventListener('scroll', checkScroll);
      return () => element.removeEventListener('scroll', checkScroll);
    }
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={`w-full mx-auto relative bg-zinc-950 py-24 overflow-hidden font-jost ${className}`}>
      {/* Background effects - matching Slider style */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black opacity-90" />
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/3 to-orange-500/3 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        {/* Header - matching Slider style */}
        <div className={`text-center transform transition-all duration-1000 ease-out mb-12 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Top indicator with icon */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-red-500 to-orange-500"></div>
            <div className="flex items-center gap-2 text-zinc-400 tracking-[0.25em] uppercase text-xs font-medium">
              <IconComponent size={16} className="text-orange-500" />
              <span>NFT Collection</span>
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-red-500 to-orange-500"></div>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {subtitle && (
            <p className="text-zinc-400 text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="relative">
            {/* Controls - matching Slider style */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`group w-10 h-10 rounded-2xl bg-white border transition-all duration-200 flex items-center justify-center cursor-pointer
                  ${!canScrollLeft
                    ? "opacity-40 !cursor-not-allowed border-zinc-200"
                    : "opacity-100 border-zinc-300 hover:border-orange-500"
                  }`}
                >
                  <ArrowLeft
                    className={`w-4 h-4 transition-colors duration-200
                    ${!canScrollLeft
                      ? "text-zinc-400"
                      : "text-zinc-600 group-hover:text-orange-500"
                    }`}
                  />
                </button>

                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`group w-10 h-10 rounded-2xl bg-white border transition-all duration-200 flex items-center justify-center cursor-pointer
                  ${!canScrollRight
                    ? "opacity-40 !cursor-not-allowed border-zinc-200"
                    : "opacity-100 border-zinc-300 hover:border-orange-500"
                  }`}
                >
                  <ArrowRight
                    className={`w-4 h-4 transition-colors duration-200
                    ${!canScrollRight
                      ? "text-zinc-400"
                      : "text-zinc-600 group-hover:text-orange-500"
                    }`}
                  />
                </button>
              </div>

              {/* View All CTA */}
              <Link
                href={viewAllHref}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02]"
              >
                <span>Vedi Tutto</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Cards Container */}
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {items.map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-80">
                    <Card {...item} />
                  </div>
                ))}
              </div>

              {/* Gradient overlays for visual cues */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none z-10" />
              )}
              {canScrollRight && (
                <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none z-10" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}