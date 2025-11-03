"use client";

import React from "react";
import { SectionTitle } from "./SectionTitle";
import ProductShowcase from "./ProductShowcase/ProductShowcase";
import { CollectionsSection } from "./Topics/CollectionsSection";
import { HeroCategories } from "./Categories/HeroCategories";
import { ScrollingGradientBlobs } from "./StreetwearEssentials/ScrollingGradientBlobs";

export function StreetwearEssentials() {
  return (
    <div className="relative w-full bg-zinc-950 pt-xl">
      {/* Animated Gradient Blobs Background */}
      <ScrollingGradientBlobs />

      {/* Section Title */}
      <SectionTitle
        eyebrow="Collezione 2025"
        title="Streetwear"
        shaderText="Essentials"
        description="Scopri le categorie, le nostre collezioni e le collaborazioni esclusive"
        size="lg"
      />

      {/* Product Showcase */}
      <div className="relative z-50 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <ProductShowcase />
      </div>

      {/* Collections Section */}
      <CollectionsSection />

      {/* Categories Title */}
      <SectionTitle
        eyebrow="Shop by Style"
        title="Esplora le"
        shaderText="Categorie"
        description="Trova il tuo stile perfetto tra le nostre categorie curate"
        size="md"
      />

      {/* Categories Section - Gallery */}
      <div className="relative w-full z-[60]">
        <HeroCategories />
      </div>
    </div>
  );
}
