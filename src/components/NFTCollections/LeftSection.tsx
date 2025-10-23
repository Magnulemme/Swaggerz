"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Collection } from "./types";
import { Check } from "lucide-react";

interface LeftSectionProps {
  collection: Collection;
}

const colorMap = {
  emerald: {
    shadow: "rgba(16, 185, 129, 0.6)",
  },
  cyan: {
    shadow: "rgba(6, 182, 212, 0.6)",
  },
  orange: {
    shadow: "rgba(249, 115, 22, 0.6)",
  },
  purple: {
    shadow: "rgba(168, 85, 247, 0.6)",
  },
};

export default function LeftSection({ collection }: LeftSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const colors = colorMap[collection.badgeColor];

  return (
    <div className="relative w-full h-full">
      {/* Floating Badge - Top Left */}
      <div className="absolute top-0 left-0 z-[100]">
        <motion.div
          className="relative"
          initial={{ x: -50, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background esteso per coprire bordo */}
          <div className="absolute -inset-[1px] bg-zinc-950 rounded-br-3xl"></div>
        </motion.div>
      </div>

      <div className="relative flex flex-col h-full px-6 lg:px-10 py-8 lg:py-10 gap-6 lg:gap-8 z-50">
        {/* Top Row: Limited Edition Badge + Pieces Count */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-50 flex-shrink-0 flex items-center justify-between"
        >
          {/* Limited Edition Badge with Rotating Border */}
          <div className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px]">
            {/* Animated rotating gradient border */}
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d37918_0%,#111111_50%,#d37918_100%)]" />

            {/* Badge content */}
            <span className="inline-flex h-full w-full items-center justify-center rounded-full px-4 py-1 bg-zinc-950 backdrop-blur-sm">
              <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-amber-400">
                Limited Edition
              </span>
            </span>
          </div>

          {/* Pieces Counter - Discrete */}
          <span className="text-xs text-zinc-500 font-medium">
            247/500 pieces
          </span>
        </motion.div>

        {/* Title - UPPERCASE for statement */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-50 flex-shrink-0"
        >
          <h2 className="relative z-50 text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white font-jost uppercase">
            {collection.title}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-50 flex-shrink-0 text-base lg:text-lg text-zinc-300 leading-relaxed max-w-lg"
        >
          {collection.description}
        </motion.p>

        {/* Featured Card - Video or Image */}
        <motion.div
          className="relative z-50 flex-shrink-0 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-xl lg:rounded-2xl overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect esterno */}
          <motion.div
            className="absolute -inset-1 rounded-2xl blur-xl"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${colors.shadow}, transparent 65%)`,
            }}
            animate={{
              opacity: isHovered ? 0.7 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Featured Video or Image */}
          <div className="relative w-full h-64 lg:h-72 xl:h-80 overflow-hidden group cursor-pointer">
            {collection.video ? (
              <video
                ref={videoRef}
                src={collection.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={collection.images[0]}
                alt={`${collection.title} featured`}
                fill
                className="object-cover"
              />
            )}

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Overlay scuro on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </motion.div>

        {/* Brand Info - Collab */}
        <div className="relative z-50 flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-4 lg:p-5">
          <div className="relative z-50 flex items-center justify-between">
            {/* Avatars con overlap */}
            <div className="flex items-center -space-x-3">
              <div className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center font-black text-black text-lg lg:text-xl">
                S
              </div>
              <div className="relative z-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-zinc-900 flex items-center justify-center font-black text-white text-lg lg:text-xl">
                R
              </div>
            </div>

            {/* Collab Info */}
            <div className="relative z-50 flex-1 ml-4">
              <p className="relative z-50 text-sm lg:text-base text-white font-bold flex items-center gap-2">
                Swaggerz
                <span className="text-amber-500 font-black">✕</span>
                Rebkon
                <span className="relative z-50 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
                </span>
              </p>
              <p className="relative z-50 text-xs text-zinc-500">
                Limited Collaboration
              </p>
              {collection.endDate && (
                <p className="relative z-50 text-xs text-zinc-400 mt-1">
                  Ends {collection.endDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA Button - Secondary Style with Shimmer Effect */}
        <div className="relative z-50 flex-shrink-0 flex justify-center w-full">
          <motion.button
            className="group overflow-hidden relative bg-transparent p-[2px] inline-flex rounded-full"
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 z-0 rounded-full"
              animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />

            <div
              className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-full px-10 py-6 md:px-12 md:py-8 text-white text-sm uppercase tracking-[0.3em] font-semibold backdrop-blur-lg bg-white/5 border border-orange-500/40
transition-all duration-300"
            >
              Esplora la Collezione
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-110"
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
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
