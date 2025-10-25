"use client";

import React from "react";
import BannerSectionLeft from "./BannerSectionLeft";
import BannerSectionRight from "./BannerSectionRight";
import FeaturedProduct from "./FeaturedProduct";

const BannerAndFeaturedProductLg = () => {
  return (
    <>
      {/* GRADIENT TOP - col 1, row 1 (sovrapposto a Left Banner) */}
      <div className="hidden lg:block lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2 pointer-events-none z-20 relative bg-black rounded-t-3xl">
        <div
          className="absolute inset-0 rounded-t-3xl"
          style={{
            background: `
              radial-gradient(ellipse 130% 110% at 28% 18%, rgba(234, 179, 8, 0.22), transparent 58%),
              radial-gradient(ellipse 115% 95% at 72% 28%, rgba(250, 204, 21, 0.18), transparent 62%),
              radial-gradient(ellipse 90% 75% at 50% 45%, rgba(202, 138, 4, 0.12), transparent 68%),
              linear-gradient(180deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.04) 50%, transparent 85%)
            `,
          }}
        />
        <div
          className="absolute inset-0 rounded-t-3xl"
          style={{
            background: `
              radial-gradient(ellipse 105% 88% at 35% 22%, rgba(234, 179, 8, 0.25), transparent 60%),
              radial-gradient(ellipse 98% 80% at 68% 38%, rgba(250, 204, 21, 0.2), transparent 65%)
            `,
            filter: "blur(70px)",
            opacity: 0.35,
          }}
        />
      </div>

      {/* GRADIENT BOTTOM - col 1-2, row 2-3 (sovrapposto a Left Banner e Brand Identity) */}
      <div className="hidden lg:block lg:col-start-1 lg:col-end-5 lg:row-start-2 lg:row-end-4 pointer-events-none z-20 relative bg-black">
        <div
          className="absolute inset-0 rounded-r-3xl rounded-bl-3xl"
          style={{
            background: `
              radial-gradient(ellipse 90% 60% at 30% 40%, rgba(234, 179, 8, 0.11), transparent 65%),
              radial-gradient(ellipse 80% 65% at 25% 55%, rgba(250, 204, 21, 0.09), transparent 70%),
              radial-gradient(ellipse 70% 55% at 35% 70%, rgba(202, 138, 4, 0.08), transparent 68%),
              radial-gradient(ellipse 95% 50% at 75% 45%, rgba(239, 68, 68, 0.12), transparent 72%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 30% 42%, rgba(234, 179, 8, 0.13), transparent 68%),
              radial-gradient(ellipse 88% 58% at 78% 58%, rgba(220, 38, 38, 0.15), transparent 72%),
              radial-gradient(ellipse 75% 48% at 25% 68%, rgba(250, 204, 21, 0.09), transparent 70%)
            `,
            filter: "blur(65px)",
            opacity: 0.28,
          }}
        />
      </div>

      {/* Banner Section Left - col 1-2, row 1-3 */}
      <div className="col-span-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4 z-30 h-full">
        <BannerSectionLeft />
      </div>
      <div className="col-span-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4 z-10 bg-black w-full h-full rounded-3xl"></div>

      {/* Bordo laterale destro SOLO per row 1 del Left Banner */}
      <div
        className="hidden lg:block lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2
        pointer-events-none z-30 relative
        after:content-[''] after:absolute after:h-[calc(100%-32px)] after:top-8
        after:border-l after:border-zinc-700/50
        after:right-0
      "
      ></div>

      {/* Featured Product - col 3-4, row 1 */}
      <div className="col-span-2 lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-2 min-h-[200px] z-30">
        <FeaturedProduct />
      </div>

      {/* Banner Section Right - col 3-4, row 2-3 */}
      <div className="col-span-2 lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-4 z-20 h-full">
        <BannerSectionRight />
      </div>
    </>
  );
};

export default BannerAndFeaturedProductLg;
