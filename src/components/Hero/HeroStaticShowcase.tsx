"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Static hero showcase - placeholder for future 3D effect
 */
export default function HeroStaticShowcase() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-950">
      {/* Badge */}
      <div className="absolute top-6 left-6 z-30">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-full border border-white/20 shadow-2xl"
        >
          <span className="text-white font-bold text-sm tracking-wider uppercase">
            3D Experience Coming Soon
          </span>
        </motion.div>
      </div>

      {/* Main Image Container */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/rebkon-hero-image.jpeg"
          alt="Hero Showcase"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* 3D Effect Placeholder - Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </motion.div>

      {/* Info Overlay */}
      <motion.div
        className="absolute bottom-8 left-8 right-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-white font-bold text-3xl mb-2">
          Immersive Experience
        </h3>
        <p className="text-zinc-300 text-lg">
          Preparati a un&apos;esperienza 3D interattiva rivoluzionaria
        </p>
      </motion.div>
    </div>
  );
}
