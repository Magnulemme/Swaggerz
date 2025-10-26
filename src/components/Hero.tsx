"use client";

import React, { useState, useEffect } from "react";
import HeroVideoBanner from "./Hero/HeroVideoBanner";
import { HeroWaveImages } from "./Hero/HeroWaveImages";
import { HeroWaveImagesMobile } from "./Hero/HeroWaveImagesMobile";
import GridContent from "./GridContent";
import ReviewsSection from "./NFTCollections/ReviewsSection";
import ShippingInfoSection from "./NFTCollections/ShippingInfoSection";
import NewsletterBanner from "./NFTCollections/NewsletterBanner";

const BentoHero = () => {
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
    <section className="relative bg-zinc-950 font-jost  min-h-screen">
      {/* Main content container */}
      <div className="relative z-50 w-full">
        {/* Simplified Hero Grid - Only Banner and 3D Content */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 auto-rows-auto z-50">
          {/* Video Banner Section */}
          <div className="col-span-2 lg:col-span-4 lg:row-span-2 w-full">
            <HeroVideoBanner />
          </div>

          {/* Wave Images Section - Desktop: Shader, Mobile/Tablet: No Shader */}
          <div className="col-span-2 lg:col-span-4 w-full">
            {isDesktop ? <HeroWaveImages /> : <HeroWaveImagesMobile />}
          </div>

          {/* Grid Content Section - Banners and Collections */}
          <div className="col-span-2 lg:col-span-4 w-full">
            <GridContent />
          </div>
        </div>

        {/* Reviews & Shipping Section - Outside grid for full control */}
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

export default BentoHero;
