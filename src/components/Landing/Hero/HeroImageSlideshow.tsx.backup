"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Texture, TextureLoader, LinearFilter } from "three";

const WaterRippleImage = dynamic(() => import("./WaterRippleImage"), {
  ssr: false,
});

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

export default function HeroImageSlideshow() {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null); // Inizialmente null, l'immagine statica è già sotto
  const [animatingIndex, setAnimatingIndex] = useState(1); // Parte dalla seconda immagine con effetto
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [texturesReady, setTexturesReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Per far partire la prima transizione una sola volta

  // Textures precaricate
  const desktopTexturesRef = useRef<Texture[]>([]);
  const mobileTexturesRef = useRef<Texture[]>([]);

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
    window.addEventListener("resize", debouncedCheckMobile);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedCheckMobile);
    };
  }, [isMobile]);

  // Carica tutte le texture
  useEffect(() => {
    // Aspetta che il device sia stato rilevato
    if (isMobile === null) return;

    // Reset stati quando cambia device
    setTexturesReady(false);

    const imagesToLoad = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;
    const targetTextures = isMobile
      ? mobileTexturesRef.current
      : desktopTexturesRef.current;

    const loader = new TextureLoader();
    let loadedCount = 0;

    // Carica tutte le texture
    imagesToLoad.forEach((src, index) => {
      loader.load(
        src,
        (texture) => {
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          targetTextures[index] = texture;

          loadedCount++;
          // Quando tutte sono caricate, imposta texturesReady
          if (loadedCount === imagesToLoad.length) {
            setTexturesReady(true);
          }
        },
        undefined,
        (error) => {
          console.error(`[HeroSlideshow] Error loading texture ${index}:`, error);
        }
      );
    });

    // Cleanup: dispose textures al unmount
    return () => {
      targetTextures.forEach((texture) => texture?.dispose());
    };
  }, [isMobile]); // Ricarica quando cambia mobile/desktop

  // Reset degli indici quando cambiano le immagini (mobile/desktop switch)
  useEffect(() => {
    setVisibleIndex(null); // Null, l'immagine statica è già sotto
    setAnimatingIndex(1); // Parte dalla seconda
    setHasStarted(false); // Reset per far ripartire la prima transizione
  }, [isMobile]);

  // Avvia la prima transizione quando tutto è pronto
  useEffect(() => {
    if (!texturesReady || hasStarted) {
      return;
    }

    // Avvia la prima transizione shader 5 secondi dopo il mount
    const timeout = setTimeout(() => {
      setHasStarted(true);

      // Dopo l'animazione, aggiorna il canvas inferiore
      setTimeout(() => {
        setVisibleIndex(1);
      }, 1800);
    }, 5000); // 5 secondi dopo il mount

    return () => {
      clearTimeout(timeout);
    };
  }, [texturesReady, hasStarted]);

  // Carosello automatico
  useEffect(() => {
    if (!texturesReady || !hasStarted) {
      return;
    }

    const interval = setInterval(() => {
      // Calcola il prossimo indice
      const nextIndex = (animatingIndex + 1) % SLIDESHOW_IMAGES.length;

      // Inizia la transizione: il canvas superiore carica la nuova immagine
      setAnimatingIndex(nextIndex);

      // Dopo l'animazione: aggiorna il canvas inferiore con l'immagine appena mostrata
      setTimeout(() => {
        setVisibleIndex(nextIndex);
      }, 1800); // Deve corrispondere alla durata dell'animazione in WaterRippleImage
    }, SLIDE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [texturesReady, hasStarted, SLIDESHOW_IMAGES.length, animatingIndex]);

  // Seleziona le texture corrette in base a mobile/desktop
  const currentTextures = isMobile
    ? mobileTexturesRef.current
    : desktopTexturesRef.current;
  const visibleTexture = visibleIndex !== null ? currentTextures[visibleIndex] || null : null;
  const animatingTexture = currentTextures[animatingIndex] || null;

  // Non renderizzare nulla finché le texture non sono pronte
  if (!texturesReady || !animatingTexture) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full z-10">
      {/* Canvas inferiore: mostra l'immagine completamente visibile dopo la prima transizione */}
      {visibleTexture && (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <WaterRippleImage
            texture={visibleTexture}
            isActive={false}
          />
        </div>
      )}

      {/* Canvas superiore: esegue l'animazione della nuova immagine che entra */}
      {hasStarted && (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
          <WaterRippleImage
            texture={animatingTexture}
            isActive={true}
          />
        </div>
      )}
    </div>
  );
}
