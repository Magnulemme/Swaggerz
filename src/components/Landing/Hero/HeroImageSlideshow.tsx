"use client";

import Image from "next/image";
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
  "/swaggerz-hero.jpg",           // 5616x3744 - 1.5:1
  "/hero-streetwear-2.jpg",       // 1920x1282 - 1.5:1
  "/hero-streetwear-3.jpg",       // 1920x1280 - 1.5:1
];

// Immagini ottimizzate per mobile (portrait/verticali)
const MOBILE_IMAGES = [
  "/hero-streetwear-1.jpg",       // 1920x2756 - 0.7:1
  "/hero-streetwear-4.jpg",       // 1920x2658 - 0.7:1
  "/swaggerz-hero.jpg",           // fallback
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
