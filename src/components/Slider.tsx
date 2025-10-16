"use client";
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

// Importa Card dal file originale (assumiamo che sia disponibile)
import Card from "./Card";

// Define proper types for the slider items
interface SliderItem {
  id: number;
  title: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  createdAt: Date;
  // Add other properties as needed based on your data structure
  [key: string]: unknown; // For any additional properties
}

interface SliderProps {
  items?: SliderItem[];
  children?: React.ReactNode;
  showHeader?: boolean;
  showBackground?: boolean;
}

export default function Slider({ items, children, showHeader = true, showBackground = true }: SliderProps) {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(max-width: 639px)': { slidesToScroll: 1 },
      '(min-width: 640px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
    setIsLoaded(true);
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
    <div className={`w-full mx-auto relative overflow-hidden font-jost ${showBackground ? 'bg-light-100 py-24' : ''}`}>
      {/* Background effects */}
      {showBackground && (
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
      )}

      <div className="relative z-10">
        {/* Header Section */}
        {showHeader && (
          <div
            className={`text-center transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Top indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-red-500 to-orange-500"></div>
              <span className="text-zinc-400 tracking-[0.25em] uppercase text-xs font-medium">
                Latest Collection
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-red-500 to-orange-500"></div>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Ultimi Modelli
              </span>
            </h2>

            <p className="text-dark-500 text-lg">
              Scopri le nostre ultime collezioni
            </p>
          </div>
        )}

        <div className="relative">
          <div className="relative px-8 max-sm:px-4">
            <div className="py-8  w-full flex items-center justify-center">
              
              {/* Container che definisce la larghezza del contenuto */}
              <div className="w-full lg:max-w-7xl relative">
                
                {/* Frecce allineate al contenuto delle slide */}
                <div className="flex justify-end gap-3 mb-4">
                <button
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    className={`group w-10 h-10 rounded-2xl bg-white border transition-all duration-200 flex items-center justify-center cursor-pointer
                    ${
                        !canScrollPrev
                        ? "opacity-40 !cursor-not-allowed border-zinc-200"
                        : "opacity-100 border-zinc-300 hover:border-orange-500"
                    }`}
                >
                    <ArrowLeft
                    className={`w-4 h-4 transition-colors duration-200
                        ${
                        !canScrollPrev
                            ? "text-zinc-400"
                            : "text-zinc-600 group-hover:text-orange-500"
                        }`}
                    />
                </button>

                <button
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    className={`group w-10 h-10 rounded-2xl bg-white border transition-all duration-200 flex items-center justify-center cursor-pointer
                    ${
                        !canScrollNext
                        ? "opacity-40 !cursor-not-allowed border-zinc-200"
                        : "opacity-100 border-zinc-300 hover:border-orange-500"
                    }`}
                >
                    <ArrowRight
                    className={`w-4 h-4 transition-colors duration-200
                        ${
                        !canScrollNext
                            ? "text-zinc-400"
                            : "text-zinc-600 group-hover:text-orange-500"
                        }`}
                    />
                </button>
                </div>


                {/* Dissolvenze responsive */}
                <div
                  className={`absolute left-0 top-14 bottom-0 w-4 max-sm:w-0 bg-gradient-to-r from-light-100 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
                    !canScrollPrev ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div
                  className={`absolute right-0 top-14 bottom-0 w-4 max-sm:w-0 bg-gradient-to-l from-light-100 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
                    !canScrollNext ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div className="embla overflow-hidden pb-8 px-3 max-sm:px-0" ref={emblaRef}>
                    <div className="embla__container flex gap-4 max-sm:gap-2 items-stretch">
                        {children ? (
                          children
                        ) : items ? (
                          items.map((p, i) => (
                            <div
                                key={p.id}
                                className="embla__slide flex-none
                                    max-sm:w-[calc(100%)]
                                    sm:w-[calc(50%-8px)]
                                    lg:w-[350px]"
                            >
                                <Card
                                  title={p.title}
                                  description={p.description || "No description available"}
                                  imageSrc={`/shoes/shoe-${6 + i}.avif`}
                                  price={p.priceCents / 100}
                                  href={"/#"}
                                />
                            </div>
                          ))
                        ) : null}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}