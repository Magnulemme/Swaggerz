"use client";

import { WaveImageShader } from "./WaveImageShader";
import ShaderText from "@/components/ShaderText";
import { motion } from "framer-motion";

interface ImageConfig {
  url: string;
  alt: string;
  description?: string;
  price?: string;
  nickname?: string;
  waveIntensity?: number;
  waveSpeed?: number;
  badge?: "hot" | "sale" | "new" | "exclusive";
  aspectRatio?: number;
}

interface HeroWaveImagesProps {
  images?: ImageConfig[];
  className?: string;
}

const defaultImages: ImageConfig[] = [
  {
    url: "/felpa.jpg",
    alt: "Felpe",
    description: "Design unici e comfort streetwear per il tuo stile urban",
    nickname: "Le Swag",
    badge: "hot",
    waveIntensity: 0.1,
    waveSpeed: 0.35,
    aspectRatio: 5 / 6,
  },
  {
    url: "/pants.jpg",
    alt: "Pantaloni",
    description: "Comfort e stile per le tue giornate in movimento",
    nickname: "Gli Hype",
    waveIntensity: 0.08,
    waveSpeed: 0.3,
    aspectRatio: 5 / 6,
  },
  {
    url: "/tshirt.jpg",
    alt: "T-shirt",
    description: "Grafiche esclusive e tessuti premium per il tuo look",
    nickname: "Le Cool",
    badge: "new",
    waveIntensity: 0.12,
    waveSpeed: 0.4,
    aspectRatio: 5 / 6,
  },
  {
    url: "/giubbotto.jpg",
    alt: "Giubbotti",
    description: "Layer perfetti per ogni stagione e occasione",
    nickname: "I Glamour",
    waveIntensity: 0.07,
    waveSpeed: 0.3,
    aspectRatio: 5 / 6,
  },
];

export function HeroWaveImages({
  images = defaultImages,
  className = "",
}: HeroWaveImagesProps) {
  return (
    <div className={`relative w-full py-24 px-6 lg:px-16 ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 50%, rgba(234, 179, 8, 0.15), transparent 70%),
              radial-gradient(ellipse 60% 40% at 30% 60%, rgba(239, 68, 68, 0.1), transparent 60%),
              radial-gradient(ellipse 70% 45% at 70% 40%, rgba(249, 115, 22, 0.12), transparent 65%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 75% 48% at 45% 55%, rgba(234, 179, 8, 0.18), transparent 68%),
              radial-gradient(ellipse 65% 42% at 60% 45%, rgba(249, 115, 22, 0.14), transparent 63%)
            `,
            filter: "blur(80px)",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex flex-wrap items-start justify-center gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none">
              Streetwear
            </h2>
            <ShaderText
              fontSize="clamp(48px, 8vw, 96px)"
              fontWeight="900"
              maxFontSize={96}
              className="leading-none"
            >
              Essentials
            </ShaderText>
          </div>
          <p className="text-lg md:text-xl text-zinc-200/95 max-w-3xl mx-auto">
            Esplora le nostre categorie e scopri i pezzi essenziali per il tuo
            guardaroba street
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-16">
          {images.map((image, index) => (
            <motion.article
              key={image.url}
              className="group relative flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Container esterno con bordo e glow */}
              <div className="relative border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 bg-gradient-to-b from-zinc-900/95 via-zinc-900/90 to-black/95 backdrop-blur-sm">
                {/* Padding container per separare immagine dal bordo */}
                <div className="pb-2">
                  {/* Image Container con overflow hidden */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        aspectRatio: `${(image.aspectRatio ?? 2 / 3) * 1.2}`,
                      }}
                    >
                      {/* Canvas con margine extra per l'effetto wave */}
                      <div
                        className="absolute inset-0"
                        style={{
                          width: "calc(100% + 64px)",
                          height: "calc(100% + 64px)",
                          left: "-32px",
                          top: "-32px",
                        }}
                      >
                        <WaveImageShader
                          imageUrl={image.url}
                          aspectRatio={image.aspectRatio ?? 4 / 5}
                          amplitude={image.waveIntensity}
                          waveSpeed={image.waveSpeed}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative px-5 pb-5 pt-2">
                  {/* Nickname Tag - Above title */}
                  {image.nickname && (
                    <span className="absolute -top-8 left-0 z-10 inline-block px-3 py-1 text-sm italic font-bold uppercase tracking-wider text-zinc-200 bg-zinc-950 rounded-tr-2xl shadow-lg backdrop-blur-sm group-hover:text-amber-400 group-hover:border-amber-500/50 group-hover:bg-zinc-900/90 transition-all duration-300">
                      &ldquo;{image.nickname}&rdquo;
                    </span>
                  )}
                  {/* Title */}
                  <h3 className="text-3xl font-jost font-black leading-tight w-fit bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent pb-4">
                    {image.alt}
                  </h3>

                  {/* Description */}
                  {image.description && (
                    <p className="text-sm text-zinc-300/80 leading-relaxed line-clamp-2">
                      {image.description}
                    </p>
                  )}

                  {/* CTA Link */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 group-hover:text-amber-400 group-hover:gap-2.5 transition-all duration-300">
                      Vedi tutti i prodotti
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-base shadow-lg shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
            <span>Esplora l&apos;intero catalogo</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
