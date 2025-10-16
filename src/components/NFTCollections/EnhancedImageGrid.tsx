"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface EnhancedImageGridProps {
  images: string[];
  title: string;
  badgeColor: "emerald" | "cyan" | "orange" | "purple";
}

const colorMap = {
  emerald: {
    glow: 'shadow-emerald-500/50',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10'
  },
  cyan: {
    glow: 'shadow-cyan-500/50',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10'
  },
  orange: {
    glow: 'shadow-orange-500/50',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10'
  },
  purple: {
    glow: 'shadow-purple-500/50',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10'
  }
};

export default function EnhancedImageGrid({ images, title, badgeColor }: EnhancedImageGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const colors = colorMap[badgeColor];

  return (
    <div className="relative">
      {/* Decorative corner accents */}
      <motion.div
        className={`absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 ${colors.border} rounded-tl-2xl opacity-50`}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className={`absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 ${colors.border} rounded-br-2xl opacity-50`}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      />

      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05, zIndex: 10 }}
          >
            {/* Glow effect background */}
            <motion.div
              className={`absolute -inset-1 ${colors.bg} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
              initial={false}
              animate={{
                scale: hoveredIndex === index ? 1.2 : 1,
                opacity: hoveredIndex === index ? 1 : 0
              }}
            />

            {/* Image container with border */}
            <div className={`relative w-full h-full border-2 border-zinc-800 group-hover:${colors.border} rounded-2xl overflow-hidden transition-all duration-300`}>
              <Image
                src={image}
                alt={`${title} Product ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0"
                initial={{ x: "-100%", y: "-100%" }}
                whileHover={{ x: "100%", y: "100%" }}
                transition={{ duration: 0.8 }}
                style={{ opacity: 0.5 }}
              />

              {/* Number badge */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-lg ${colors.bg} backdrop-blur-md border ${colors.border}`}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-white text-sm font-bold">
                      #{index + 1}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover icon */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className={`w-14 h-14 rounded-full ${colors.bg} backdrop-blur-md border-2 ${colors.border} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating particles on hover */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 ${colors.bg} rounded-full`}
                      initial={{
                        x: "50%",
                        y: "50%",
                        scale: 0,
                        opacity: 0
                      }}
                      animate={{
                        x: `${50 + (Math.random() - 0.5) * 100}%`,
                        y: `${50 + (Math.random() - 0.5) * 100}%`,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        className="mt-4 flex justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 rounded-full ${hoveredIndex === index ? colors.bg : 'bg-white/10'}`}
            style={{ width: hoveredIndex === index ? '32px' : '8px' }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
