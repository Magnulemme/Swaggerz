"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Collection } from "./types";
import { Check } from "lucide-react";
import ShaderText from "../ShaderText";

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

          {/* Container principale arrotondato */}
          <div className="relative bg-zinc-950 rounded-br-3xl border-b border-r border-zinc-800/50">
            <div className="relative w-full h-full px-6 py-4">
              {/* Contenuto badge */}
              <div className="relative flex items-center gap-3">
                {/* Indicatore status con pulse */}
                <div className="relative">
                  <motion.div
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 4px rgba(16, 185, 129, 0.6)",
                        "0 0 12px rgba(16, 185, 129, 1)",
                        "0 0 4px rgba(16, 185, 129, 0.6)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Separatore */}
                <div className="w-0.5 h-4 bg-gradient-to-b from-transparent via-emerald-400/80 to-transparent rounded-full"></div>

                {/* Testo NUOVA COLLEZIONE */}
                <motion.span
                  className="text-emerald-400 text-sm font-mono font-black tracking-[0.15em] uppercase whitespace-nowrap"
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(16, 185, 129, 0.5)",
                      "0 0 16px rgba(16, 185, 129, 0.9)",
                      "0 0 8px rgba(16, 185, 129, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  NUOVA COLLEZIONE
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative flex flex-col h-full px-6 lg:px-10 py-8 lg:py-10 gap-5 lg:gap-6 z-50">
        {/* Title - Flexible height */}
        <div className="relative z-50 flex-shrink-0">
          <h2 className="relative z-50 text-2xl lg:text-4xl xl:text-5xl font-black text-white leading-none tracking-tight">
            {collection.title}
          </h2>
        </div>

        {/* Description - Flexible height */}
        <p className="relative z-50 flex-shrink-0 text-sm lg:text-base text-zinc-300 leading-relaxed font-medium">
          {collection.description}
        </p>

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

        {/* Brand Info - Flexible */}
        <div className="relative z-50 flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-4 lg:p-5">
          <div className="relative z-50 flex items-center gap-3">
            <div className="relative z-50 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center font-black text-black text-lg lg:text-xl">
              S
            </div>
            <div className="relative z-50">
              <p className="relative z-50 text-sm lg:text-base text-white font-bold flex items-center gap-2">
                Swaggerz
                <span className="relative z-50 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
                </span>
              </p>
              <p className="relative z-50 text-xs text-zinc-500">
                Brand Ufficiale
              </p>
            </div>
          </div>
        </div>

        {/* White Button */}
        <div className="relative z-50 flex-shrink-0">
          <motion.button
            className="group/btn w-full bg-white hover:bg-zinc-100 rounded-xl lg:rounded-2xl px-6 py-4 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl text-black font-bold text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            Esplora
          </motion.button>
        </div>
      </div>
    </div>
  );
}
