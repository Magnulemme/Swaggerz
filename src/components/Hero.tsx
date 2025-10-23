"use client";

import React, { useState, useEffect } from "react";
import HeroBackground from "./Hero/HeroBackground";
import Hero3dContent from "./Hero/Hero3dContent";
import HeroVideoBanner from "./Hero/HeroVideoBanner";
import { HeroWaveImages } from "./Hero/HeroWaveImages";
import { HeroWaveImagesMobile } from "./Hero/HeroWaveImagesMobile";
import GridContent from "./GridContent";
import { useLoadingStore } from "@/store/useLoadingStore";

const BentoHero = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const setComponentReady = useLoadingStore((state) => state.setComponentReady);

  useEffect(() => {
    // Check if screen is desktop (>= 1280px for shader performance)
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1280;
      setIsDesktop(desktop);

      // Se non siamo su desktop, marca models3d come ready subito
      // perché Hero3dContent non verrà renderizzato
      if (!desktop) {
        setComponentReady('models3d');
      }
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, [setComponentReady]);

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

          {/* 3D Content Section - Disabled on mobile for performance */}
          {isDesktop && (
            <div className="col-span-2 lg:col-span-4 lg:row-span-2 h-full">
              <Hero3dContent />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BentoHero;
