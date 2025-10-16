"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { NFTCollection } from '@/constants/nftCollections';

interface NFTSliderProps {
  title: string;
  collections: NFTCollection[];
}

export default function NFTSlider({ title, collections }: NFTSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
  }, [emblaApi, onSelect]);

  return (
    <div className="relative font-jost py-8 md:py-10">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-2 rounded-full bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-2 rounded-full bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {collections.map((nft) => (
              <Link
                key={nft.id}
                href={nft.href}
                className="group relative flex-[0_0_240px] bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-purple-500/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-zinc-800">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* NFT Name */}
                  <h3 className="text-white font-semibold text-sm mb-1 truncate group-hover:text-purple-400 transition-colors">
                    {nft.name}
                  </h3>

                  {/* Drop Name */}
                  <p className="text-zinc-400 text-xs mb-2 truncate">
                    {nft.dropName}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <div>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Floor</p>
                      <p className="text-white font-bold text-xs">{nft.floorPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Creator</p>
                      <p className="text-purple-400 text-xs truncate max-w-[80px]">{nft.creator}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
