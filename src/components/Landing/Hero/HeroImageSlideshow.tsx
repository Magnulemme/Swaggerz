"use client";

import { motion, MotionValue } from "framer-motion";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const WaterRippleImage = dynamic(() => import("./WaterRippleImage"), {
  ssr: false,
});

interface HeroImageSlideshowProps {
  imageOpacity: MotionValue<number>;
  onTransitionChange?: (isTransitioning: boolean) => void;
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

const SLIDE_INTERVAL = 5000; // 5 secondi tra le transizioni

export default function HeroImageSlideshow({
  imageOpacity,
  onTransitionChange,
}: HeroImageSlideshowProps) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setComponentReady = useLoadingStore((state) => state.setComponentReady);
  const [visibleIndex, setVisibleIndex] = useState(0); // Immagine completamente visibile (canvas inferiore)
  const [animatingIndex, setAnimatingIndex] = useState(0); // Immagine che sta entrando (canvas superiore)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [texturesReady, setTexturesReady] = useState(false);
  const [firstImageReady, setFirstImageReady] = useState(false);

  // Textures precaricate
  const desktopTexturesRef = useRef<THREE.Texture[]>([]);
  const mobileTexturesRef = useRef<THREE.Texture[]>([]);

  // Seleziona le immagini in base alla dimensione dello schermo
  const SLIDESHOW_IMAGES = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

  // Preload tutte le texture (desktop e mobile) al mount
  useEffect(() => {
    console.log('[HeroSlideshow] Starting texture preload');
    const loader = new THREE.TextureLoader();
    let loadedCount = 0;
    const totalTextures = DESKTOP_IMAGES.length + MOBILE_IMAGES.length;

    // Copia i ref per il cleanup
    const desktopTextures = desktopTexturesRef.current;
    const mobileTextures = mobileTexturesRef.current;

    const checkAllLoaded = () => {
      loadedCount++;
      console.log(`[HeroSlideshow] Loaded ${loadedCount}/${totalTextures} textures`);
      if (loadedCount === totalTextures) {
        console.log('[HeroSlideshow] All textures loaded successfully');
        setTexturesReady(true);
      }
    };

    // Preload desktop images
    DESKTOP_IMAGES.forEach((src, i) => {
      loader.load(
        src,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          desktopTextures[i] = texture;
          console.log(`[HeroSlideshow] Desktop texture ${i} loaded:`, {
            size: `${texture.image.width}x${texture.image.height}`,
            src
          });
          checkAllLoaded();
        },
        undefined,
        (error) => {
          console.error(`[HeroSlideshow] Error loading desktop texture ${i}:`, error);
          checkAllLoaded();
        }
      );
    });

    // Preload mobile images
    MOBILE_IMAGES.forEach((src, i) => {
      loader.load(
        src,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          mobileTextures[i] = texture;
          console.log(`[HeroSlideshow] Mobile texture ${i} loaded:`, {
            size: `${texture.image.width}x${texture.image.height}`,
            src
          });
          checkAllLoaded();
        },
        undefined,
        (error) => {
          console.error(`[HeroSlideshow] Error loading mobile texture ${i}:`, error);
          checkAllLoaded();
        }
      );
    });

    // Cleanup: dispose textures al unmount
    return () => {
      console.log('[HeroSlideshow] Disposing all textures');
      desktopTextures.forEach((texture) => texture?.dispose());
      mobileTextures.forEach((texture) => texture?.dispose());
    };
  }, []); // Solo al mount

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

  // Notifica il parent quando cambia lo stato di transizione
  useEffect(() => {
    onTransitionChange?.(isTransitioning);
  }, [isTransitioning, onTransitionChange]);

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

  // Notifica il loader quando tutto è pronto
  useEffect(() => {
    if (texturesReady && firstImageReady) {
      console.log('[HeroSlideshow] All resources ready, notifying loader');
      setComponentReady('heroSlideshow');
    }
  }, [texturesReady, firstImageReady, setComponentReady]);

  // Seleziona le texture corrette in base a mobile/desktop
  const currentTextures = isMobile ? mobileTexturesRef.current : desktopTexturesRef.current;
  const visibleTexture = currentTextures[visibleIndex] || null;
  const animatingTexture = currentTextures[animatingIndex] || null;

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ opacity: imageOpacity }}
    >
      {/* Canvas inferiore: mostra sempre l'immagine completamente visibile (statica) */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <WaterRippleImage
          texture={visibleTexture}
          isActive={false}
          isTransitioning={false}
          onReady={() => setFirstImageReady(true)}
        />
      </div>

      {/* Canvas superiore: esegue l'animazione della nuova immagine che entra */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
        <WaterRippleImage
          texture={animatingTexture}
          isActive={true}
          isTransitioning={isTransitioning}
        />
      </div>

      {/* Overlay scuro per migliorare la leggibilità del testo */}
      <div className="absolute inset-0 bg-black/40 z-10" />
    </motion.div>
  );
}
