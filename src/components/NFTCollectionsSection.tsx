"use client";

import React from 'react';
import { latestNFTs, trendingNFTs, exclusiveNFTs } from '@/constants/nftCollections';
import UnlockDesignsSection from '@/components/NFTCollections/UnlockDesignsSection';
import NFTSlider from '@/components/NFTCollections/NFTSlider';

export default function NFTCollectionsSection() {
  return (
    <section className="relative bg-zinc-950 font-jost">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-zinc-950 to-zinc-950" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Unlock Designs Section - Flow Diagram */}
        <UnlockDesignsSection />
      </div>

      {/* NFT Sliders - con background gradient continuo */}
      <div className="relative z-10 py-8 md:py-10 bg-gradient-to-b from-zinc-950 to-zinc-950 mt-8 md:mt-10">
        <NFTSlider title="Ultimi NFT" collections={latestNFTs} />
        <NFTSlider title="Trending" collections={trendingNFTs} />
        <NFTSlider title="Collezioni Esclusive" collections={exclusiveNFTs} />
      </div>
    </section>
  );
}
