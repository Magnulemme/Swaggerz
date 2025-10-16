"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { collections } from './collectionsData';
import CarouselSlide from './CarouselSlide';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import NavigationButton from './NavigationButton';
import DotsIndicator from './DotsIndicator';

interface FeaturedCollectionBannerProps {
  section?: 'full' | 'left' | 'right';
}

export default function FeaturedCollectionBanner({ section = 'full' }: FeaturedCollectionBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const collection = collections[selectedIndex];

  // Render Left Section (Titolo + Immagini)
  if (section === 'left') {
    return <LeftSection collection={collection} />;
  }

  // Render Right Section (Descrizione + CTA)
  if (section === 'right') {
    return (
      <RightSection
        collection={collection}
        onPrevious={scrollPrev}
        onNext={scrollNext}
      />
    );
  }

  // Render Full Section (Original Layout)
  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {collections.map((collection) => (
            <div key={collection.id} className="flex-[0_0_100%] min-w-0">
              <CarouselSlide collection={collection} />
            </div>
          ))}
        </div>
      </div>

      <NavigationButton direction="prev" onClick={scrollPrev} />
      <NavigationButton direction="next" onClick={scrollNext} />

      <DotsIndicator
        totalDots={collections.length}
        selectedIndex={selectedIndex}
        onDotClick={(index) => emblaApi?.scrollTo(index)}
      />
    </div>
  );
}
