import HeroVideoBanner from "./Landing/Hero/HeroVideoBanner";
import TransitionBanner from "./Landing/TransitionBanner/TransitionBanner";
import UnlockDesignsSection from "./Landing/UnlockDesigns/UnlockDesignsSection";
import ReviewsSection from "./Landing/Reviews/ReviewsSection";
import ShippingInfoSection from "./Landing/Shipping/ShippingInfoSection";
import NewsletterBanner from "./Landing/Newsletter/NewsletterBanner";
import { StreetwearEssentials } from "./Landing/StreetwearEssentials";

const Landing = () => {
  return (
    <section className="relative bg-zinc-950 font-jost min-h-screen ">
      {/* Main content container */}
      <div className="relative z-50 w-full">
        {/* Hero Video Banner */}
        <div className="relative w-full z-50">
          <HeroVideoBanner />
        </div>

        {/* Streetwear Essentials - Contains Product Showcase, Collections, Categories */}
        <StreetwearEssentials />

        {/* Temporary Collection & Featured Products - Bento Grid Layout */}
        <div className="relative z-50 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50">
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
