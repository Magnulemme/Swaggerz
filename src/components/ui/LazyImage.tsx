"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps extends Omit<ImageProps, "onLoad"> {
  /**
   * Threshold per l'IntersectionObserver (0-1)
   * @default 0.01
   */
  threshold?: number;
  /**
   * Root margin per l'IntersectionObserver
   * Carica l'immagine PRIMA che entri nel viewport
   * @default "200px" - carica quando mancano 200px
   */
  rootMargin?: string;
  /**
   * Mostra blur placeholder durante il caricamento
   * @default true
   */
  showPlaceholder?: boolean;
  /**
   * Classe CSS per il placeholder
   */
  placeholderClassName?: string;
  /**
   * Classe CSS per il wrapper container
   */
  wrapperClassName?: string;
  /**
   * Bypassa lazy loading e carica l'immagine immediatamente
   * Usare per: slider/carousel, above-the-fold images, LCP images
   * @default false
   */
  eager?: boolean;
}

/**
 * LazyImage - Componente ottimizzato per lazy loading con IntersectionObserver
 *
 * Carica le immagini solo quando stanno per entrare nel viewport,
 * riducendo drasticamente il tempo di caricamento iniziale.
 *
 * @example
 * ```tsx
 * <LazyImage
 *   src="/image.jpg"
 *   alt="Description"
 *   width={800}
 *   height={600}
 *   rootMargin="300px" // Carica 300px prima
 * />
 * ```
 */
export function LazyImage({
  threshold = 0.01,
  rootMargin = "200px",
  showPlaceholder = true,
  placeholderClassName,
  wrapperClassName,
  className,
  eager = false,
  ...imageProps
}: LazyImageProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(eager); // Se eager, inizia come visibile
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Se eager, carica immediatamente senza observer
    if (eager) {
      setIsVisible(true);
      return;
    }

    const imgElement = imgRef.current;
    if (!imgElement) return;

    // Controlla se l'immagine è già nel viewport (above-the-fold)
    // Se sì, caricala immediatamente senza aspettare l'observer
    const rect = imgElement.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      setIsVisible(true);
      return; // Non serve observer
    }

    // IntersectionObserver per rilevare quando l'immagine sta per entrare nel viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnetti observer una volta che l'immagine è visibile
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin, // Carica in anticipo per UX fluida
      }
    );

    observer.observe(imgElement);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, eager]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Se l'immagine usa fill, il wrapper deve avere position: relative
  const needsRelative = imageProps.fill === true;
  const finalWrapperClassName = needsRelative
    ? `relative ${wrapperClassName || ""}`
    : wrapperClassName;

  return (
    <div ref={imgRef} className={finalWrapperClassName}>
      {/* Placeholder - mostra mentre l'immagine carica */}
      {showPlaceholder && !isLoaded && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 animate-pulse ${
            placeholderClassName || ""
          }`}
          style={{
            aspectRatio:
              imageProps.width && imageProps.height
                ? `${imageProps.width} / ${imageProps.height}`
                : undefined,
          }}
        />
      )}

      {/* Immagine reale - carica solo quando visibile */}
      {isVisible && (
        <Image
          {...imageProps}
          alt={imageProps.alt || ""}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className || ""}`}
          onLoad={handleLoad}
          loading="lazy" // Next.js native lazy loading come fallback
        />
      )}
    </div>
  );
}
