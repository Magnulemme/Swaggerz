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
  "/hero desk/swaggerz-hero.avif",
  "/hero desk/adam-barclay-S2W3jMJ6ayc-unsplash.avif",
  "/hero desk/jc-gellidon-Zbrz62vBmb0-unsplash.avif",
];

// Immagini ottimizzate per mobile (portrait/verticali)
const MOBILE_IMAGES = [
  "/hero mob/hero-streetwear-1.avif",
  "/hero mob/hero-streetwear-4.avif",
  "/hero mob/jc-gellidon-ktME4-TLi1Q-unsplash.avif",
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
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null = non ancora rilevato
  const [texturesReady, setTexturesReady] = useState(false);
  const [firstImageReady, setFirstImageReady] = useState(false);

  // Textures precaricate
  const desktopTexturesRef = useRef<THREE.Texture[]>([]);
  const mobileTexturesRef = useRef<THREE.Texture[]>([]);

  // Seleziona le immagini in base alla dimensione dello schermo
  const SLIDESHOW_IMAGES = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

  // PRIMO: Detect mobile/desktop IMMEDIATAMENTE al mount
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const checkMobile = () => {
      const nowMobile = window.innerWidth < 1024;

      // Se cambia il breakpoint dopo aver caricato, ricarica la pagina
      if (isMobile !== null && isMobile !== nowMobile && (desktopTexturesRef.current.length > 0 || mobileTexturesRef.current.length > 0)) {
        console.log('[HeroSlideshow] Breakpoint changed, reloading...');
        window.location.reload();
      }

      setIsMobile(nowMobile);
    };

    const debouncedCheckMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150); // Debounce 150ms
    };

    checkMobile(); // Rileva subito al mount

    // Solo dopo il loading iniziale, ascolta i resize
    if (!isLoading) {
      window.addEventListener("resize", debouncedCheckMobile);
    }

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedCheckMobile);
    };
  }, [isMobile, isLoading]);

  // SECONDO: Progressive loading - carica PRIMA la prima immagine, poi le altre
  useEffect(() => {
    // Aspetta che il device sia stato rilevato
    if (isMobile === null) return;

    // Reset stati quando cambia device
    setTexturesReady(false);
    setFirstImageReady(false);

    const imagesToLoad = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;
    const targetTextures = isMobile ? mobileTexturesRef.current : desktopTexturesRef.current;

    console.log(`[HeroSlideshow] Progressive loading for ${isMobile ? 'mobile' : 'desktop'}`);

    const loader = new THREE.TextureLoader();

    // STEP 1: Carica SOLO la prima immagine (priorità massima)
    console.log('[HeroSlideshow] Loading first image...');
    loader.load(
      imagesToLoad[0],
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        targetTextures[0] = texture;
        console.log('[HeroSlideshow] First texture loaded!', {
          size: `${texture.image.width}x${texture.image.height}`
        });

        // ✅ Texture caricata - imposta texturesReady
        setTexturesReady(true);

        // Ora aspetta che WaterRippleImage la renderizzi
        // (onReady callback setterà firstImageReady)
        // Il loader si nasconderà solo quando ENTRAMBI sono true

        // STEP 2: Carica le altre immagini in background (bassa priorità)
        console.log('[HeroSlideshow] Loading remaining images in background...');
        let remainingLoaded = 0;

        imagesToLoad.slice(1).forEach((src, i) => {
          const actualIndex = i + 1; // Perché slice(1) inizia da index 1

          loader.load(
            src,
            (bgTexture) => {
              bgTexture.minFilter = THREE.LinearFilter;
              bgTexture.magFilter = THREE.LinearFilter;
              targetTextures[actualIndex] = bgTexture;
              remainingLoaded++;

              console.log(`[HeroSlideshow] Background texture ${actualIndex} loaded (${remainingLoaded}/${imagesToLoad.length - 1})`);

              // Tutte le texture caricate
              if (remainingLoaded === imagesToLoad.length - 1) {
                console.log('[HeroSlideshow] All textures loaded!');
              }
            },
            undefined,
            (error) => {
              console.error(`[HeroSlideshow] Error loading background texture ${actualIndex}:`, error);
            }
          );
        });
      },
      undefined,
      (error) => {
        console.error('[HeroSlideshow] Error loading first texture:', error);
        // Fallback: prova a caricare tutte in parallelo
        setTexturesReady(true);
      }
    );

    // Cleanup: dispose textures al unmount
    return () => {
      console.log('[HeroSlideshow] Disposing textures');
      targetTextures.forEach((texture) => texture?.dispose());
    };
  }, [isMobile]); // Ricarica quando cambia mobile/desktop

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
    console.log('[HeroSlideshow] 🔔 Loading state check', {
      texturesReady,
      firstImageReady,
      isLoading,
      timestamp: performance.now()
    });

    if (texturesReady && firstImageReady) {
      console.log('[HeroSlideshow] ✅ All resources ready, notifying loader');
      setComponentReady('heroSlideshow');
    }
  }, [texturesReady, firstImageReady, isLoading, setComponentReady]);

  // Seleziona le texture corrette in base a mobile/desktop
  const currentTextures = isMobile ? mobileTexturesRef.current : desktopTexturesRef.current;
  const visibleTexture = currentTextures[visibleIndex] || null;
  const animatingTexture = currentTextures[animatingIndex] || null;

  // Log cambio visibilità
  useEffect(() => {
    console.log('[HeroSlideshow] 👁️ Visibility changed', {
      firstImageReady,
      visibility: firstImageReady ? 'visible' : 'hidden',
      timestamp: performance.now()
    });
  }, [firstImageReady]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ opacity: imageOpacity }}
    >
      {/* Renderizza i canvas SOLO quando la prima texture è pronta */}
      {visibleTexture && (
        <>
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
        </>
      )}

      {/* Overlay scuro per migliorare la leggibilità del testo */}
      <div className="absolute inset-0 bg-black/40 z-10" />
    </motion.div>
  );
}
