"use client";

import React, { useState, useEffect } from "react";
import HeroVideoBanner from "./Landing/Hero/HeroVideoBanner";
import { HeroCategories } from "./Landing/Categories/HeroCategories";
import ProductShowcase from "./Landing/ProductShowcase/ProductShowcase";
import BannerAndFeaturedProductLg from "./Landing/BannerAndFeaturedProduct/BannerAndFeaturedProductLg";
import BannerAndFeaturedProductMobile from "./Landing/BannerAndFeaturedProduct/BannerAndFeaturedProductMobile";
import FeaturedProduct from "./Landing/BannerAndFeaturedProduct/FeaturedProduct";
import TransitionBanner from "./Landing/TransitionBanner/TransitionBanner";
import UnlockDesignsSection from "./Landing/UnlockDesigns/UnlockDesignsSection";
import ReviewsSection from "./Landing/Reviews/ReviewsSection";
import ShippingInfoSection from "./Landing/Shipping/ShippingInfoSection";
import NewsletterBanner from "./Landing/Newsletter/NewsletterBanner";

const Landing = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if screen is desktop (>= 1280px for shader performance)
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1280;
      setIsDesktop(desktop);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section className="relative bg-zinc-950 font-jost min-h-screen overflow-x-hidden">
      {/* Main content container */}
      <div className="relative z-50 w-full overflow-x-hidden">
        {/* Hero & Categories Grid */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 auto-rows-auto z-50">
          {/* Hero Video Banner Section */}
          <div className="col-span-2 lg:col-span-4 lg:row-span-2 w-full">
            <HeroVideoBanner />
          </div>

          {/* Categories Section - Responsive Slider with Shader on Desktop */}
          <div className="col-span-2 lg:col-span-4 w-full">
            <HeroCategories useWaveShader={isDesktop} />
          </div>
        </div>

        {/* Temporary Collection & Featured Products - Bento Grid Layout */}
        <div className="relative z-50 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50">
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

            {/* Product Showcase - Full width carousel */}
            <div className="col-span-2 lg:col-span-4 min-h-[400px] z-20">
              <ProductShowcase />
            </div>

            {/* Transition Banner - Full width */}
            <div className="col-span-2 lg:col-span-4 z-20">
              <TransitionBanner />
            </div>

            {/* Unlock Designs Section - Full width */}
            <div className="col-span-2 lg:col-span-4 z-20">
              <UnlockDesignsSection />
            </div>
          </div>
        </div>

        {/* Reviews, Shipping & Newsletter Section */}
        <div className="relative w-full bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950">
          {/* Reviews Section - Full Width, no container restrictions */}
          <ReviewsSection />

          {/* Shipping Section - Full Width, no container restrictions */}
          <ShippingInfoSection />

          {/* Newsletter Section - With Container */}
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <NewsletterBanner />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
