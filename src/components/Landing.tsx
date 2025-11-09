import dynamic from "next/dynamic";
import Hero from "./Landing/Hero/Hero";
import { StreetwearEssentials } from "./Landing/StreetwearEssentials";

// Lazy load below-the-fold sections for better initial bundle size
const TransitionBanner = dynamic(() => import("./Landing/TransitionBanner/TransitionBanner"));
const UnlockDesignsSection = dynamic(() => import("./Landing/UnlockDesigns/UnlockDesignsSection"));
const ReviewsSection = dynamic(() => import("./Landing/Reviews/ReviewsSection"));
const ShippingInfoSection = dynamic(() => import("./Landing/Shipping/ShippingInfoSection"));
const NewsletterBanner = dynamic(() => import("./Landing/Newsletter/NewsletterBanner"));

const Landing = () => {
  return (
    <section className="relative bg-zinc-950 font-jost min-h-screen ">
      {/* Main content container */}
      <div className="relative z-50 w-full">
        {/* Hero */}
        <div className="relative w-full z-50">
          <Hero />
        </div>

        {/* Streetwear Essentials - Contains Product Showcase, Collections, Categories */}
        <StreetwearEssentials />

        {/* Temporary Collection & Featured Products - Bento Grid Layout */}
        <div className="relative z-50 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50">
            <div className="col-span-2 lg:col-span-4 z-20">
              <TransitionBanner />
            </div>

            <div className="col-span-2 lg:col-span-4 z-20">
              <UnlockDesignsSection />
            </div>
          </div>
        </div>

        {/* Reviews, Shipping & Newsletter Section */}
        <div className="relative w-full bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950">
          <ReviewsSection />

          <ShippingInfoSection />

          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <NewsletterBanner />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
