import React from "react";
import BannerSectionLeft from "./BannerSectionLeft";
import BannerSectionRight from "./BannerSectionRight";

const BannerAndFeaturedProductMobile = () => {
  return (
    <>
      {/* Banner Sections Wrapper - Single border around both */}
      <div className="col-span-2 border border-zinc-700/50 rounded-xl lg:border-0 lg:rounded-none overflow-hidden relative bg-black">
        {/* Gradient Background - Only on mobile/tablet */}
        <div className="absolute inset-0 pointer-events-none lg:hidden">
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 20%, rgba(234, 179, 8, 0.12), transparent 60%),
                radial-gradient(ellipse 70% 45% at 30% 60%, rgba(249, 115, 22, 0.08), transparent 55%),
                radial-gradient(ellipse 75% 50% at 70% 80%, rgba(239, 68, 68, 0.08), transparent 60%)
              `,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `
                radial-gradient(ellipse 65% 45% at 50% 30%, rgba(234, 179, 8, 0.15), transparent 58%),
                radial-gradient(ellipse 60% 40% at 60% 70%, rgba(249, 115, 22, 0.12), transparent 55%)
              `,
              filter: "blur(60px)",
              opacity: 0.4,
            }}
          />
        </div>

        {/* Banner Section Left */}
        <div className="min-h-[500px] md:min-h-[600px] relative z-10">
          <BannerSectionLeft />
        </div>

        {/* Banner Section Right */}
        <div className="min-h-[400px] md:min-h-[500px] relative z-10">
          <BannerSectionRight />
        </div>
      </div>
    </>
  );
};

export default BannerAndFeaturedProductMobile;
