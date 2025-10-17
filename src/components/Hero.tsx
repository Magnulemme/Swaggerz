"use client";

import React from "react";
import HeroBackground from "./Hero/HeroBackground";
import Hero3dContent from "./Hero/Hero3dContent";
import HeroVideoBanner from "./Hero/HeroVideoBanner";

const BentoHero = () => {
  return (
    <section className="relative bg-zinc-950 font-jost  min-h-screen">
      {/* Background with animated gradients */}
      <HeroBackground />

      {/* Main content container */}
      <div className="relative z-50 container lg:mx-auto lg:pt-32 w-full">
        {/* Simplified Hero Grid - Only Banner and 3D Content */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 auto-rows-auto z-50">
          {/* Video Banner Section */}
          <div className="col-span-2 lg:col-span-4 lg:row-span-2 min-h-[400px]">
            <HeroVideoBanner />
          </div>

          {/* 3D Content Section */}
          <div className="col-span-2 lg:col-span-4 lg:row-span-2 h-full">
            <Hero3dContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoHero;
