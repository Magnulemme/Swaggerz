'use client'

import React from 'react';
import { collections } from '@/constants/heroCollections';
import BannerSectionLeft from './Hero/BannerSectionLeft';
import BannerSectionRight from './Hero/BannerSectionRight';
import BrandIdentityWindow from './Hero/BrandIdentityWindow';
import TopCollections from './Hero/TopCollections';
import ProductShowcase from './Hero/ProductShowcase';
import FeaturedArtist from './FeaturedArtist';

const GridContent = () => {
  return (
    <section className="relative bg-zinc-950 font-jost py-12">
      {/* Main content container */}
      <div className="relative z-50 container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Unified Bento Grid */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50">

          {/* GRADIENT TOP - col 1, row 1 (sovrapposto a Left Banner) */}
          <div className="hidden lg:block lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2 pointer-events-none z-20 relative bg-black rounded-t-3xl">
            <div
              className="absolute inset-0 rounded-t-3xl"
              style={{
                background: `
                  radial-gradient(ellipse 130% 110% at 28% 18%, rgba(234, 179, 8, 0.22), transparent 58%),
                  radial-gradient(ellipse 115% 95% at 72% 28%, rgba(250, 204, 21, 0.18), transparent 62%),
                  radial-gradient(ellipse 90% 75% at 50% 45%, rgba(202, 138, 4, 0.12), transparent 68%),
                  linear-gradient(180deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.04) 50%, transparent 85%)
                `
              }}
            />
            <div
              className="absolute inset-0 rounded-t-3xl"
              style={{
                background: `
                  radial-gradient(ellipse 105% 88% at 35% 22%, rgba(234, 179, 8, 0.25), transparent 60%),
                  radial-gradient(ellipse 98% 80% at 68% 38%, rgba(250, 204, 21, 0.2), transparent 65%)
                `,
                filter: 'blur(70px)',
                opacity: 0.35
              }}
            />
          </div>

          {/* GRADIENT BOTTOM - col 1-2, row 2-3 (sovrapposto a Left Banner e Brand Identity) */}
          <div className="hidden lg:block lg:col-start-1 lg:col-end-5 lg:row-start-2 lg:row-end-4 pointer-events-none z-20 relative bg-black">
            <div
              className="absolute inset-0 rounded-r-3xl rounded-bl-3xl"
              style={{
                background: `
                  radial-gradient(ellipse 90% 60% at 30% 40%, rgba(234, 179, 8, 0.11), transparent 65%),
                  radial-gradient(ellipse 80% 65% at 60% 55%, rgba(250, 204, 21, 0.09), transparent 70%),
                  radial-gradient(ellipse 70% 55% at 48% 70%, rgba(202, 138, 4, 0.08), transparent 68%),
                  radial-gradient(ellipse 95% 50% at 70% 45%, rgba(250, 204, 21, 0.06), transparent 72%)
                `
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 85% 55% at 35% 42%, rgba(234, 179, 8, 0.13), transparent 68%),
                  radial-gradient(ellipse 88% 58% at 62% 58%, rgba(250, 204, 21, 0.1), transparent 72%),
                  radial-gradient(ellipse 75% 48% at 50% 68%, rgba(202, 138, 4, 0.09), transparent 70%)
                `,
                filter: 'blur(65px)',
                opacity: 0.28
              }}
            />
          </div>

          {/* Banner Section Left - col 1-2, row 1-3 */}
          <div className="col-span-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4 z-30">
            <BannerSectionLeft />
          </div>
          <div className="col-span-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4 z-10 bg-black w-full h-full rounded-3xl">
          </div>

          {/* Bordo laterale destro SOLO per row 1 del Left Banner */}
          <div className="hidden lg:block lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2
            pointer-events-none z-30 relative
            after:content-[''] after:absolute after:h-[calc(100%-32px)] after:top-8
            after:border-l after:border-zinc-700/50
            after:right-0
          ">
          </div>

          {/* Brand Identity Window - col 3-4, row 1 */}
          <div className="col-span-2 lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-2 min-h-[200px] z-30">
            <BrandIdentityWindow />
          </div>

          {/* Banner Section Right - col 3-4, row 2-3 */}
          <div className="col-span-2 lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-4 z-20">
            <BannerSectionRight />
          </div>

          {/* Product Showcase - row 4, full width */}
          <div className="col-span-2 lg:col-span-4 min-h-[400px] z-20">
            <ProductShowcase />
          </div>

          {/* Top Collections Sidebar - row 5-6 */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 min-h-[300px] lg:min-h-0 z-20">
            <TopCollections />
          </div>

          {/* Featured Artist - row 5-6 */}
          <div className="col-span-2 lg:col-span-3 lg:row-span-2 min-h-[400px] lg:min-h-0 z-20">
            <FeaturedArtist
              name="Beeple"
              avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
              backgroundImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop"
              verified={true}
              followers="2.1M"
              galleryCards={collections.map((col, idx) => ({
                id: idx + 1,
                image: col.image,
                title: col.name
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridContent;
