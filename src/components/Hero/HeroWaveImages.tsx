"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { WaveImageShader } from "./WaveImageShader";

interface ImageConfig {
  url: string;
  alt: string;
  waveIntensity?: number;
  waveSpeed?: number;
  foldCount?: number;
}

interface HeroWaveImagesProps {
  images?: ImageConfig[];
  className?: string;
}

const defaultImages: ImageConfig[] = [
  {
    url: "/VintageDrop.webp",
    alt: "Vintage Drop Collection",
    waveIntensity: 0.25,
    waveSpeed: 1.0,
    foldCount: 6,
  },
  {
    url: "/DigitalArtDrop.webp",
    alt: "Digital Art Collection",
    waveIntensity: 0.28,
    waveSpeed: 1.2,
    foldCount: 7,
  },
  {
    url: "/trending-1.png",
    alt: "Trending Collection",
    waveIntensity: 0.26,
    waveSpeed: 1.1,
    foldCount: 6,
  },
];

export function HeroWaveImages({
  images = defaultImages,
  className = "",
}: HeroWaveImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer per lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // Pre-load un po' prima
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`w-full py-20 px-6 lg:px-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Esplora la Collezione
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Ogni pezzo è un&apos;opera d&apos;arte digitale certificata,
            pronta per essere indossata
          </p>
        </motion.div>

        {/* Images grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.9, y: 30 }
              }
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.15, // Stagger effect
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group"
            >
              {/* Card wrapper con hover effect */}
              <div className="relative rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 shadow-2xl hover:shadow-blue-500/10">
                {/* Wave shader image */}
                {isInView && (
                  <WaveImageShader
                    imageUrl={image.url}
                    waveIntensity={image.waveIntensity}
                    waveSpeed={image.waveSpeed}
                    foldCount={image.foldCount}
                    className="w-full aspect-[4/5]"
                  />
                )}

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Info overlay (appears on hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {image.alt}
                  </h3>
                  <p className="text-zinc-300 text-sm">
                    NFT Certificato • Limited Edition
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
