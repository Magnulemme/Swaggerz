import HeroImageSlideshow from "./HeroImageSlideshow";
import HeroContent from "./HeroContent";
import Image from "next/image";

const DESKTOP_IMAGE = "/hero desk/swaggerz-hero.avif";
const MOBILE_IMAGE = "/hero mob/hero-streetwear-1.avif";

export default function HeroVideoBanner() {
  return (
    <div className="w-full h-dvh relative bg-black overflow-hidden">
      {/* Static server-rendered first image - Available immediately */}
      <div className="absolute inset-0 z-0">
        {/* Desktop - hidden on mobile */}
        <Image
          src={DESKTOP_IMAGE}
          alt="Hero background"
          fill
          priority
          quality={95}
          className="object-cover hidden lg:block"
        />
        {/* Mobile - hidden on desktop */}
        <Image
          src={MOBILE_IMAGE}
          alt="Hero background"
          fill
          priority
          quality={95}
          className="object-cover lg:hidden"
        />
      </div>

      {/* Client-side slideshow overlay - Loads progressively */}
      <HeroImageSlideshow />

      {/* Content Overlay - Text, button, scroll indicator */}
      <HeroContent />
    </div>
  );
}
