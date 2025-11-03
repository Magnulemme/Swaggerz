"use client";

import { motion, MotionValue } from "framer-motion";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const WaterRippleImage = dynamic(() => import("./WaterRippleImage"), {
  ssr: false,
});

interface HeroImageSlideshowProps {
  imageOpacity: MotionValue<number>;
}

// Immagini ottimizzate per desktop (landscape/panoramiche)
const DESKTOP_IMAGES = [
  "/hero desk/swaggerz-hero.jpg",
  "/hero desk/adam-barclay-S2W3jMJ6ayc-unsplash.jpg",
  "/hero desk/jc-gellidon-Zbrz62vBmb0-unsplash.jpg",
];

// Immagini ottimizzate per mobile (portrait/verticali)
const MOBILE_IMAGES = [
  "/hero mob/hero-streetwear-1.jpg",
  "/hero mob/hero-streetwear-4.jpg",
  "/hero mob/jc-gellidon-ktME4-TLi1Q-unsplash.jpg",
];

const SLIDE_INTERVAL = 7000; // 7 secondi

export default function HeroImageSlideshow({ imageOpacity }: HeroImageSlideshowProps) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [visibleIndex, setVisibleIndex] = useState(0); // Immagine completamente visibile (canvas inferiore)
  const [animatingIndex, setAnimatingIndex] = useState(0); // Immagine che sta entrando (canvas superiore)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Seleziona le immagini in base alla dimensione dello schermo
  const SLIDESHOW_IMAGES = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset degli indici quando cambiano le immagini (mobile/desktop switch)
  useEffect(() => {
    setVisibleIndex(0);
    setAnimatingIndex(0);
    setIsTransitioning(false);
  }, [isMobile]);

  // Carosello automatico
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      // Calcola il prossimo indice
      const nextIndex = (animatingIndex + 1) % SLIDESHOW_IMAGES.length;

      // Inizia la transizione: il canvas superiore carica la nuova immagine
      setAnimatingIndex(nextIndex);
      setIsTransitioning(true);

      // Dopo l'animazione: aggiorna il canvas inferiore con l'immagine appena mostrata
      setTimeout(() => {
        setVisibleIndex(nextIndex);
        setIsTransitioning(false);
      }, 1800); // Deve corrispondere alla durata dell'animazione in WaterRippleImage
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isLoading, SLIDESHOW_IMAGES.length, animatingIndex]);

  const visibleImageSrc = SLIDESHOW_IMAGES[visibleIndex];
  const animatingImageSrc = SLIDESHOW_IMAGES[animatingIndex];

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ opacity: imageOpacity }}
    >
      {/* Canvas inferiore: mostra sempre l'immagine completamente visibile (staticca) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
        <WaterRippleImage
          imageSrc={visibleImageSrc}
          isActive={false}
          isTransitioning={false}
        />
      </div>

      {/* Canvas superiore: esegue l'animazione della nuova immagine che entra */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2 }}
      >
        <WaterRippleImage
          imageSrc={animatingImageSrc}
          isActive={true}
          isTransitioning={isTransitioning}
        />
      </div>

      {/* Overlay scuro per migliorare la leggibilità del testo */}
      <div className="absolute inset-0 bg-black/40 z-10" />
    </motion.div>
  );
}
