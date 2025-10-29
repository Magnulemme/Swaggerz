"use client";

import ShaderText from "@/components/ShaderText";
import { motion } from "framer-motion";
import { CategoryCard } from "./CategoryCard";

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
    <div
      className={`relative w-full py-2xl md:py-3xl lg:py-3xl px-md md:px-lg lg:px-xl xl:px-2xl ${className}`}
    >
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
          className="text-center mb-xl md:mb-2xl lg:mb-3xl space-y-md md:space-y-lg"
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-light-subtle bg-dark-elevated text-light-secondary text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Collezione 2025
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="flex flex-wrap items-start justify-center gap-4 lg:gap-5 ">
            <h2 className="text-4xl md:text-5xl lg:text-8xl font-black text-light leading-none tracking-tight font-jost">
              Streetwear
            </h2>
            <div className="">
              <ShaderText
                fontSize="150"
                fontWeight="900"
                maxFontSize={150}
                className="leading-none"
              >
                Essentials
              </ShaderText>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-light-secondary max-w-prose mx-auto leading-relaxed">
            Crea il tuo outfit dei sogni, o completa il tuo guardaroba con i
            nostri esclusivi capi streetwear
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md md:gap-lg">
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <CategoryCard image={image} useWaveShader={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
