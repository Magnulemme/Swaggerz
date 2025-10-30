"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

interface HeroCategoriesCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroCategoriesCard: React.FC<HeroCategoriesCardProps> = ({ onHover, onLeave }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const products = [
    {
      name: 'Oversized Tee',
      category: 'Streetwear',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    },
    {
      name: 'Graffiti Hoodie',
      category: 'Streetwear',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    },
    {
      name: 'Cargo Pants',
      category: 'Streetwear',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
    },
    {
      name: 'Bomber Jacket',
      category: 'Streetwear',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    },
    {
      name: 'Urban Graphic Tee',
      category: 'Streetwear',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
    },
    {
      name: 'Street Hoodie',
      category: 'Streetwear',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className="group relative rounded-3xl p-5 lg:p-7 overflow-hidden h-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-yellow-500/20 animate-pulse" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
           }}
      />

      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <h3 className="text-white text-2xl lg:text-3xl font-black tracking-tight">
                STREETWEAR
              </h3>
            </div>
            <p className="text-white/90 text-sm lg:text-base font-medium hidden lg:block">
              Cultura urbana, stile senza limiti
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`p-2.5 lg:p-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white transition-all duration-300 border-2 border-white/30 hover:bg-white/30 hover:scale-110 ${
                !canScrollPrev ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              aria-label="Scorri a sinistra"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`p-2.5 lg:p-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white transition-all duration-300 border-2 border-white/30 hover:bg-white/30 hover:scale-110 ${
                !canScrollNext ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              aria-label="Scorri a destra"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative flex-1 overflow-hidden">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex gap-4 lg:gap-5 h-full pb-2">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex-grow-0 basis-[200px] lg:basis-[240px] h-full group/cat cursor-pointer"
                >
                  <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover/cat:scale-105 group-hover/cat:rotate-1">
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 200px, 240px"
                      />
                      
                      {/* Gradient overlay - always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-5">
                        <div className="transform transition-all duration-300 translate-y-0">
                          <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-3">
                            <p className="text-xs text-white font-bold uppercase tracking-widest">
                              {product.category}
                            </p>
                          </div>
                          <h4 className="text-white text-lg lg:text-xl font-black mb-2 leading-tight">
                            {product.name}
                          </h4>
                          <div className="h-0.5 w-12 bg-gradient-to-r from-white to-transparent rounded-full" />
                        </div>
                      </div>

                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Fade Edges */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-16 lg:w-20 bg-gradient-to-r from-fuchsia-600 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              !canScrollPrev ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-16 lg:w-20 bg-gradient-to-l from-orange-500 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              !canScrollNext ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCategoriesCard;