"use client";

import { motion } from "framer-motion";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import Image from "next/image";

const WaterRippleImage = dynamic(() => import("./WaterRippleImage"), {
  ssr: false,
});

interface HeroImageSlideshowProps {
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
  const [staticImageLoaded, setStaticImageLoaded] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);

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
      // TODO: Riattivare in production - disabilitato durante development per evitare reload continui
      // if (isMobile !== null && isMobile !== nowMobile && (desktopTexturesRef.current.length > 0 || mobileTexturesRef.current.length > 0)) {
      //   window.location.reload();
      // }

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
    const targetTextures = isMobile
      ? mobileTexturesRef.current
      : desktopTexturesRef.current;

    const loader = new THREE.TextureLoader();

    // STEP 1: Carica SOLO la prima immagine (priorità massima)
    loader.load(
      imagesToLoad[0],
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        targetTextures[0] = texture;

        // ✅ Texture caricata - imposta texturesReady
        setTexturesReady(true);

        // Ora aspetta che WaterRippleImage la renderizzi
        // (onReady callback setterà firstImageReady)
        // Il loader si nasconderà solo quando ENTRAMBI sono true

        // STEP 2: Carica le altre immagini in background (bassa priorità)
        imagesToLoad.slice(1).forEach((src, i) => {
          const actualIndex = i + 1; // Perché slice(1) inizia da index 1

          loader.load(
            src,
            (bgTexture) => {
              bgTexture.minFilter = THREE.LinearFilter;
              bgTexture.magFilter = THREE.LinearFilter;
              targetTextures[actualIndex] = bgTexture;
            },
            undefined,
            (error) => {
              console.error(
                `[HeroSlideshow] Error loading background texture ${actualIndex}:`,
                error
              );
            }
          );
        });
      },
      undefined,
      (error) => {
        console.error("[HeroSlideshow] Error loading first texture:", error);
        // Fallback: prova a caricare tutte in parallelo
        setTexturesReady(true);
      }
    );

    // Cleanup: dispose textures al unmount
    return () => {
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

  // Notifica il loader quando l'immagine statica è caricata (priorità assoluta)
  useEffect(() => {
    if (staticImageLoaded) {
      setComponentReady("heroSlideshow");
    }
  }, [staticImageLoaded, setComponentReady]);

  // Una volta che lo shader è pronto, inizia il crossfade
  useEffect(() => {
    if (texturesReady && firstImageReady) {
      // Aspetta un frame per essere sicuri che il canvas sia renderizzato
      requestAnimationFrame(() => {
        setShaderReady(true);
      });
    }
  }, [texturesReady, firstImageReady]);

  // Seleziona le texture corrette in base a mobile/desktop
  const currentTextures = isMobile
    ? mobileTexturesRef.current
    : desktopTexturesRef.current;
  const visibleTexture = currentTextures[visibleIndex] || null;
  const animatingTexture = currentTextures[animatingIndex] || null;

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Immagine statica - Caricamento immediato (priorità assoluta) */}
      {isMobile !== null && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
          animate={{ opacity: shaderReady ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={SLIDESHOW_IMAGES[0]}
            alt="Hero background"
            fill
            priority
            quality={95}
            className="object-cover"
            onLoad={() => setStaticImageLoaded(true)}
          />
        </motion.div>
      )}

      {/* Canvas shader - Caricato in background e fade in quando pronto */}
      {visibleTexture && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: shaderReady ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
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
        </motion.div>
      )}

      {/* Overlay scuro per migliorare la leggibilità del testo */}
      <div className="absolute inset-0 bg-black/40 z-10" />
    </motion.div>
  );
}
