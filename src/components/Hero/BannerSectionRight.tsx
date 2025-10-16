import React from 'react';
import FeaturedCollectionBanner from '../NFTCollections/FeaturedCollectionBanner';

/**
 * Right banner section with custom border and corner styling
 */
export default function BannerSectionRight() {
  return (
    <div className="h-full relative col-span-2 lg:col-span-2 lg:row-span-2
      lg:border lg:border-l-0 lg:border-zinc-700/50
      lg:rounded-tr-3xl lg:rounded-br-3xl lg:overflow-visible z-20

      before:lg:content-[''] before:lg:absolute before:lg:w-[33px] before:lg:h-[calc(100%+1px)]
     before:lg:-left-[33px] before:lg:-bottom-[1px]
      border-0 before:lg:border-b before:lg:border-zinc-700/50
      before:lg:z-10"
    >
      <svg
        className="hidden lg:block absolute -left-[33px] -top-[33px] z-10 rotate-270"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        style={{ transform: 'translateZ(0)' }}
      >
        <path
          d="M 0 33 Q 0 0 33 0 L 0 0 Z"
          fill="black"
          stroke="none"
        />
        <path
          d="M 0.5 33 Q 0.5 0.5 33 0.5"
          fill="none"
          stroke="rgb(63 63 70 / 0.5)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <FeaturedCollectionBanner section="right" />
    </div>
  );
}