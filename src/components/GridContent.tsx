"use client";

import React from "react";
import ProductShowcase from "./Hero/ProductShowcase";
import BannerAndFeaturedProductLg from "./Hero/BannerAndFeaturedProductLg";
import BannerAndFeaturedProductMobile from "./Hero/BannerAndFeaturedProductMobile";
import FeaturedProduct from "./Hero/FeaturedProduct";
import UnlockDesignsSection from "./NFTCollections/UnlockDesignsSection";
import TransitionBanner from "./Hero/TransitionBanner";

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

          {/* Transition Text - full width */}
          <div className="col-span-2 lg:col-span-4 z-20">
            <TransitionBanner />
          </div>

          {/* Unlock Designs Section - full width */}
          <div className="col-span-2 lg:col-span-4 z-20">
            <UnlockDesignsSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridContent;
