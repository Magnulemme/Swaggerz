"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TopicBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  href?: string;
  index?: number;
}

export function TopicBanner({
  title,
  subtitle,
  imageUrl,
  href = "#",
  index = 0,
}: TopicBannerProps) {
  // Calcola valori per effetto sticky stacking
  const topValue = 24 + index * 24; // Parte da 24px e incrementa di 24px per ogni card
  const zIndex = 10 - index; // Z-index decrescente (10, 9, 8...)

  return (
    <motion.a
      href={href}
      className="group sticky block w-full overflow-hidden rounded-2xl cursor-pointer"
      style={{
        aspectRatio: "21 / 9",
        top: `${topValue}px`,
        zIndex: zIndex,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
        />
      </div>

      {/* Overlay Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/80"
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 z-10">
        <motion.div
          className="space-y-2"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        >
          {subtitle && (
            <p className="text-xs md:text-sm uppercase tracking-wider text-brand font-semibold">
              {subtitle}
            </p>
          )}
          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none font-jost">
            {title}
          </h3>
        </motion.div>

        {/* Arrow Icon */}
        <motion.div
          className="absolute right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2"
          initial={{ x: -10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5 transition-all duration-500 group-hover:border-brand group-hover:bg-brand/20 group-hover:scale-110">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            transform: "translateX(-100%)",
            animation: "shine 2s infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shine {
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </motion.a>
  );
}
