import React from "react";
import { SectionTitle } from "./SectionTitle";
import ProductShowcase from "./ProductShowcase/ProductShowcase";
import { CollectionsSection } from "./Topics/CollectionsSection";
import { HeroCategories } from "./Categories/HeroCategories";
import { LazyScrollingGradientBlobs } from "./StreetwearEssentials/LazyScrollingGradientBlobs";
import BannerAndFeaturedProductLg from "./BannerAndFeaturedProduct/BannerAndFeaturedProductLg";
import BannerAndFeaturedProductMobile from "./BannerAndFeaturedProduct/BannerAndFeaturedProductMobile";
import FeaturedProduct from "./BannerAndFeaturedProduct/FeaturedProduct";

export function StreetwearEssentials() {
  return (
    <div className="relative h-full w-full bg-zinc-950 pt-xl">
      {/* Animated Gradient Blobs Background - Lazy loaded */}
      <LazyScrollingGradientBlobs />

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
        title="Esplora le"
        shaderText="Categorie"
        description="Trova il tuo stile perfetto tra le nostre categorie curate"
        size="md"
      />

      {/* Categories Section - Gallery */}
      <div className="relative w-full z-[60]">
        <HeroCategories />
      </div>
      {/* Collaborations Subtitle */}
      <SectionTitle
        title="Collaborazioni"
        shaderText="Esclusive"
        description="Drop limitati e partnership uniche con i migliori brand streetwear"
        size="md"
      />
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50 mx-lg">
        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:contents">
          <BannerAndFeaturedProductLg />
        </div>

        {/* Mobile/Tablet Layout (< lg) */}
        <div className="lg:hidden contents">
          <BannerAndFeaturedProductMobile />
        </div>

        {/* Featured Product - SOLO mobile */}
        <div className="col-span-2 lg:hidden min-h-[300px] z-20">
          <FeaturedProduct />
        </div>
      </div>
    </div>
  );
}
