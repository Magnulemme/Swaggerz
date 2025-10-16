import React from 'react';
import FeaturedCollectionBanner from '../NFTCollections/FeaturedCollectionBanner';

/**
 * Left banner section with gradient backgrounds and L-shaped border
 */
export default function BannerSectionLeft() {
  return (
    <div className="relative col-span-2 lg:col-span-2 lg:row-span-3
      lg:border-l lg:border-b lg:border-zinc-700/50
      lg:rounded-l-3xl rounded-tr-3xl lg:overflow-visible

      before:lg:content-[''] before:lg:absolute before:lg:w-[calc(100%-1px)] before:lg:h-[32px]
      before:lg:border-r before:lg:border-t before:lg:border-zinc-700/50
      before:lg:rounded-t-3xl before:lg:-top-[0] before:lg:-right-0
      before:lg:z-10
      "
    >
      <div className="lg:overflow-hidden lg:rounded-t-3xl lg:rounded-bl-3xl h-full relative">
        <FeaturedCollectionBanner section="left" />
      </div>
    </div>
  );
}