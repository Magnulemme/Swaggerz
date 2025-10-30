"use client";

import React from "react";
import { collections } from "@/constants/heroCollections";
import TopCollections from "@/components/NFTCollections/TopCollections";
import FeaturedArtist from "@/components/FeaturedArtist";

export default function NFTCollectionsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              NFT Collections
            </h1>
            <p className="text-zinc-400 text-lg lg:text-xl max-w-2xl mx-auto">
              Esplora le collezioni NFT esclusive e gli artisti in evidenza
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Top Collections Sidebar */}
            <div className="col-span-2 lg:col-span-1 lg:row-span-2 min-h-[300px] lg:min-h-0">
              <TopCollections />
            </div>

            {/* Featured Artist */}
            <div className="col-span-2 lg:col-span-3 lg:row-span-2 min-h-[400px] lg:min-h-0">
              <FeaturedArtist
                name="Beeple"
                avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                backgroundImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop"
                verified={true}
                followers="2.1M"
                galleryCards={collections.map((col, idx) => ({
                  id: idx + 1,
                  image: col.image,
                  title: col.name,
                }))}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
