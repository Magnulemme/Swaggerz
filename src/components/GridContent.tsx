"use client";

import React from "react";
import { collections } from "@/constants/heroCollections";
import TopCollections from "./Hero/TopCollections";
import ProductShowcase from "./Hero/ProductShowcase";
import FeaturedArtist from "./FeaturedArtist";
import BannerAndFeaturedProductLg from "./Hero/BannerAndFeaturedProductLg";
import BannerAndFeaturedProductMobile from "./Hero/BannerAndFeaturedProductMobile";
import FeaturedProduct from "./Hero/FeaturedProduct";

const GridContent = () => {
  return (
    <section className="relative bg-zinc-950 font-jost">
      {/* Main content container */}
      <div className="relative z-50 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Unified Bento Grid */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50">
          {/* Desktop Layout (lg+) */}
          <div className="hidden lg:contents">
            <BannerAndFeaturedProductLg />
          </div>

          {/* Mobile/Tablet Layout (< lg) */}
          <div className="lg:hidden contents">
            <BannerAndFeaturedProductMobile />
          </div>

          {/* Featured Product - SOLO mobile, dopo la collezione */}
          <div className="col-span-2 lg:hidden min-h-[300px] z-20">
            <FeaturedProduct />
          </div>

          {/* Product Showcase - row 5, full width */}
          <div className="col-span-2 lg:col-span-4 min-h-[400px] z-20">
            <ProductShowcase />
          </div>

          {/* Top Collections Sidebar - row 6-7 */}
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
                title: col.name,
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridContent;
