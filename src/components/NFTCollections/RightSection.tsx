"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Collection } from "./types";
import { Check } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface RightSectionProps {
  collection: Collection;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function RightSection({ collection }: RightSectionProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden z-0 rounded-r-3xl">
      <div className="relative z-50 flex flex-col h-full py-8 lg:py-10 gap-6 lg:gap-7 px-6 lg:pr-10">
        {/* Two Column Layout: md + xl (1 col on lg) */}
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 md:gap-8 xl:gap-8">
          {/* Left Column: Artist Presentation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-shrink-0 md:flex-1 lg:flex-none xl:flex-1 space-y-4"
          >
            {/* Header - More prominent on md+ */}
            <div className="flex items-baseline gap-2 md:mb-2">
              <h4 className="text-white font-bold text-sm md:text-base md:font-black uppercase tracking-wider">
                Conosci l&apos;Artista
              </h4>
            </div>

            {/* Artist Header - Inline */}
            <div className="flex items-center gap-3">
              {/* Avatar with subtle glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border border-orange-400/30 flex items-center justify-center text-white text-sm shadow-lg">
                  <span className="font-[family-name:var(--font-pastor-of-muppets)] text-base">
                    R
                  </span>
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-zinc-900 shadow-md">
                  <Check className="w-2 h-2 text-white" />
                </div>
              </div>

              {/* Artist Name & Speciality */}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-white font-black text-lg">Rebkon</h3>
                <span className="text-zinc-600">•</span>
                <span className="text-orange-400 text-sm font-bold">
                  Street Artist
                </span>
              </div>
            </div>

            {/* Editorial Style: CSS Multi-column on lg, single column on md and xl */}
            <div
              className="md:columns-1 lg:columns-2 xl:columns-1 lg:gap-6 xl:gap-4"
              style={{ columnFill: "balance" }}
            >
              {/* Artist Description - flows automatically */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Pioniere dell&apos;arte urbana italiana, Rebkon fonde graffiti
                tradizionali con elementi digitali. Le sue opere esplorano il
                confine tra street culture e alta moda, creando pezzi unici che
                ridefiniscono lo streetwear contemporaneo.
              </p>

              {/* Additional Info - Essential Artist Data */}
              <div className="hidden md:block space-y-3 break-inside-avoid">
                {/* Location Info */}
                <div className="space-y-1 break-inside-avoid">
                  <p className="text-zinc-400 text-sm">
                    <span className="mr-1.5">From</span>
                    <span className="text-base">🇮🇹</span>
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Based in{" "}
                    <span className="text-white font-semibold">Milano</span>
                  </p>
                </div>

                {/* Style */}
                <div className="pt-1 break-inside-avoid">
                  <p className="text-zinc-500 text-xs mb-1.5">Style</p>
                  <p className="text-zinc-300 text-sm">
                    Urban Art / Digital Fusion
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-2 flex items-center gap-2 break-inside-avoid">
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
                    aria-label="Website"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bonus NFT - Minimal gift presentation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 md:flex-1 lg:flex-none xl:flex-1 flex flex-col"
          >
            {/* Header - Aligned with artist section style */}
            <div className="flex items-baseline gap-2 md:mb-4 pt-4 md:pt-0">
              <h4 className="text-white font-bold text-sm md:text-base md:font-black uppercase tracking-wider">
                Un NFT In Omaggio per Te
              </h4>
            </div>

            {/* Layout: horizontal on mobile/lg, vertical on md/xl */}
            <div className="flex-1 flex flex-row md:flex-col lg:flex-row xl:flex-col lg:items-stretch gap-3 md:gap-4 pt-3 md:pt-0">
              {/* NFT Image - compact square on mobile/lg, full width on md/xl */}
              <motion.div
                className="relative w-24 md:w-full lg:w-32 xl:w-full flex-shrink-0 aspect-square md:aspect-[16/9] lg:aspect-square xl:aspect-[16/9] rounded-lg overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-lg blur-lg"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.25), transparent 60%)`,
                  }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative w-full h-full rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&h=800&fit=crop"
                    alt="Bonus Collector NFT"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* NFT Info overlay */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-end justify-end">
                    <div className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded border border-blue-500/30">
                      <span className="text-blue-400 text-[10px] font-bold tracking-wider">
                        #1/50
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text content - After image */}
              <div className="flex flex-col h-full space-y-1.5">
                <h5 className="text-white text-sm md:text-base font-bold">
                  Collector&apos;s NFT
                </h5>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  Ricevi questo NFT certificato con ogni acquisto. Edizione
                  limitata, numerato e trasferibile.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer - CTA and End Date - Solo fino a md */}
        <div className="flex lg:hidden flex-col items-center gap-5 pt-6">
          {/* End Date - Typography Style */}
          {collection.endDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 mb-0.5">
                Available Until
              </p>
              <p className="text-sm font-bold text-zinc-300 tracking-wide">
                {collection.endDate}
              </p>
            </motion.div>
          )}

          <AnimatedButton
            as="button"
            size="sm"
            className="md:text-base md:px-8 md:py-3"
          >
            Explore Collection
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
