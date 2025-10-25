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
  emoji?: string;
  waveIntensity?: number;
  waveSpeed?: number;
  badge?: "hot" | "sale" | "new" | "exclusive";
  aspectRatio?: number;
  soldCount?: number;
  popularityLabel?: string;
}

interface HeroWaveImagesProps {
  images?: ImageConfig[];
  className?: string;
}

const defaultImages: ImageConfig[] = [
  {
    url: "/felpa.jpg",
    alt: "Felpe",
    description:
      "Quando il comfort incontra l'attitudine. Perfette per chi non scende a compromessi",
    nickname: "Le Swag",
    emoji: "✨",
    badge: "hot",
    waveIntensity: 0.1,
    waveSpeed: 0.35,
    aspectRatio: 5 / 6,
  },
  {
    url: "/pants.jpg",
    alt: "Pantaloni",
    description:
      "L'energia della strada in ogni movimento. Progettati per chi vive al massimo",
    nickname: "Gli Hype",
    emoji: "⚡",
    waveIntensity: 0.08,
    waveSpeed: 0.3,
    aspectRatio: 5 / 6,
  },
  {
    url: "/tshirt.jpg",
    alt: "T-shirt",
    description:
      "Essenziali ma mai banali. L'equilibrio perfetto tra semplicità e carattere",
    nickname: "Le Cool",
    emoji: "🌟",
    badge: "new",
    waveIntensity: 0.12,
    waveSpeed: 0.4,
    aspectRatio: 5 / 6,
  },
  {
    url: "/giubbotto.jpg",
    alt: "Giubbotti",
    description:
      "L'eleganza incontra la strada. Statement piece che completa ogni outfit",
    nickname: "I Glamour",
    emoji: "👑",
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
    <div className={`relative w-full py-16 md:py-20 lg:py-24 px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}>
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
          className="text-center mb-12 md:mb-16 lg:mb-20 space-y-6 md:space-y-7"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Eyebrow text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/50 text-zinc-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Collezione 2025
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="flex flex-wrap items-start justify-center gap-4 lg:gap-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight font-jost">
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

          {/* Subtitle */}
          <p className="text-base md:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Crea il tuo outfit dei sogni, o completa il tuo guardaroba con i nostri esclusivi capi streetwear
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7 lg:gap-8 xl:gap-9">
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
              <div className="relative border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 bg-zinc-950 backdrop-blur-sm">
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
                <div className="relative px-6 pb-6 pt-3">
                  {/* Nickname Tag - Above title */}
                  {image.nickname && (
                    <span className="absolute -top-8 left-0 z-10 inline-block px-3 py-1 text-sm italic font-bold uppercase tracking-wider text-zinc-200 bg-zinc-950 rounded-tr-2xl shadow-lg backdrop-blur-sm group-hover:text-amber-400 transition-all duration-300">
                      {image.emoji && (
                        <span className="mr-1">{image.emoji}</span>
                      )}
                      &ldquo;{image.nickname}&rdquo;
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-jost font-black leading-tight tracking-tight text-white mb-3">
                    {image.alt}
                  </h3>

                  {/* Description */}
                  {image.description && (
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-5">
                      {image.description}
                    </p>
                  )}

                  {/* CTA Link */}
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 group-hover:text-amber-300 group-hover:gap-2.5 transition-all duration-300">
                      Scopri {image.alt === "Felpe" ? "le nostre" : image.alt === "T-shirt" ? "le nostre" : "i nostri"} {image.alt}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
      </div>
    </div>
  );
}
