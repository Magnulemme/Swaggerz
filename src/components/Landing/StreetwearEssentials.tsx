import React from "react";
import dynamic from "next/dynamic";
import ProductShowcase from "./ProductShowcase/ProductShowcase";
import { LazyScrollingGradientBlobs } from "./StreetwearEssentials/LazyScrollingGradientBlobs";

// Lazy load below-fold sections
const CollectionsSection = dynamic(() => import("./Topics/CollectionsSection").then(mod => ({ default: mod.CollectionsSection })));
const HeroCategories = dynamic(() => import("./Categories/HeroCategories").then(mod => ({ default: mod.HeroCategories })));
const BannerAndFeaturedProductWithTitle = dynamic(() => import("./BannerAndFeaturedProduct/BannerAndFeaturedProductWithTitle"));

export function StreetwearEssentials() {
  return (
    <div className="relative h-full w-full bg-zinc-950 pt-xl">
      {/* Animated Gradient Blobs Background - Lazy loaded */}
      <LazyScrollingGradientBlobs />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Collections Section */}
      <CollectionsSection />

      {/* Categories Section - Gallery */}
      <div className="relative w-full z-[60]">
        <HeroCategories />
      </div>
      <BannerAndFeaturedProductWithTitle />
    </div>
  );
}
