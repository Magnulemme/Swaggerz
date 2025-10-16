"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface DecorativeGridProps {
  position?: 'left' | 'right' | 'center';
  opacity?: number;
}

export default function DecorativeGrid({ position = 'left', opacity = 0.15 }: DecorativeGridProps) {
  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  return (
    <motion.div
      className={`absolute top-0 ${positionClasses[position]} w-full h-full pointer-events-none overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5 }}
    >
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-white/20"
            />
          </pattern>

          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="50%" stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="grid-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Grid base */}
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* Gradient overlay */}
        <rect width="100%" height="100%" fill="url(#grid-gradient)" />
      </svg>

      {/* Animated line accents */}
      <motion.div
        className="absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: -128 }}
        animate={{ x: '100vw' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 0
        }}
      />

      <motion.div
        className="absolute top-2/3 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: -96 }}
        animate={{ x: '100vw' }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />
    </motion.div>
  );
}
