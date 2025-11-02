"use client";

import React from "react";
import { SectionTitle } from "./SectionTitle";
import ProductShowcase from "./ProductShowcase/ProductShowcase";
import { CollectionsSection } from "./Topics/CollectionsSection";
import { HeroCategories } from "./Categories/HeroCategories";

export function StreetwearEssentials() {
  return (
    <div className="relative w-full bg-zinc-950">
      {/* Section Title */}
      <SectionTitle
        eyebrow="Collezione 2025"
        title="Streetwear"
        shaderText="Essentials"
        description="Scopri le categorie, le nostre collezioni e le collaborazioni esclusive"
        size="lg"
      />

      {/* Product Showcase */}
      <div className="relative z-50 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 pb-2xl md:pb-3xl">
        <ProductShowcase />
      </div>

      {/* Collections Section */}
      <CollectionsSection />

      {/* Categories Section - Gallery */}
      <div className="relative w-full z-[60]">
        <HeroCategories />
      </div>
    </div>
  );
}
