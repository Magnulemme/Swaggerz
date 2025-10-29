"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ShaderText from '@/components/ShaderText';
import AnimatedGradientOrb from './AnimatedGradientOrb';
import CollectionBadge from './CollectionBadge';
import ShopButton from './ShopButton';
import { Collection } from './types';

interface CarouselSlideProps {
  collection: Collection;
}

const colorMap = {
  emerald: { shadow: 'rgba(16, 185, 129, 0.6)', gradient: 'from-emerald-500 via-green-600 to-teal-500' },
  cyan: { shadow: 'rgba(6, 182, 212, 0.6)', gradient: 'from-cyan-500 via-blue-600 to-sky-500' },
  orange: { shadow: 'rgba(249, 115, 22, 0.6)', gradient: 'from-orange-500 via-amber-600 to-yellow-500' },
  purple: { shadow: 'rgba(168, 85, 247, 0.6)', gradient: 'from-purple-500 via-violet-600 to-fuchsia-500' }
};

export default function CarouselSlide({ collection }: CarouselSlideProps) {
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  const colors = colorMap[collection.badgeColor];

  return (
    <motion.div
      className="relative w-full min-h-[700px] overflow-hidden rounded-3xl border-2 border-zinc-800 bg-gradient-to-br from-zinc-950 to-black mx-2"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} blur-3xl`}
          style={{ animation: 'pulse 4s ease-in-out infinite' }}
        />
      </div>

      <AnimatedGradientOrb
        position="top-right"
        gradientFrom={collection.gradientFrom}
        gradientVia={collection.gradientVia}
      />

      {/* Main Grid: 2:1 ratio */}
      <div className="relative h-full px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 min-h-[600px]">

          {/* LEFT COLUMN - 2/3 - Titolo sopra + Immagini sotto */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-8">

            {/* Titolo in alto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <CollectionBadge badge={collection.badge} badgeColor={collection.badgeColor} />

              <h2 className="text-6xl lg:text-7xl font-black text-white mt-6 mb-4 leading-none tracking-tight">
                {collection.title}
              </h2>

              <ShaderText fontSize="64px" fontWeight="900">
                {collection.subtitle}
              </ShaderText>
            </motion.div>

            {/* Griglia 2x2 immagini in basso */}
            <motion.div
              className="grid grid-cols-2 gap-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {collection.images.slice(0, 4).map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative aspect-square cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  onMouseEnter={() => setHoveredImg(idx)}
                  onMouseLeave={() => setHoveredImg(null)}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 50,
                    rotate: idx % 2 === 0 ? 2 : -2
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-3 rounded-2xl blur-2xl"
                    style={{ background: `radial-gradient(circle, ${colors.shadow}, transparent 70%)` }}
                    animate={{
                      opacity: hoveredImg === idx ? 1 : 0,
                      scale: hoveredImg === idx ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-zinc-800 group-hover:border-white/30 transition-colors">
                    <Image
                      src={img}
                      alt={`${collection.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                      style={{
                        transform: hoveredImg === idx ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.7s ease-out'
                      }}
                    />

                    {/* Gradient overlay on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} mix-blend-overlay`}
                      animate={{ opacity: hoveredImg === idx ? 0.3 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Number badge */}
                    <motion.div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center font-bold text-white"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{
                        scale: hoveredImg === idx ? 1 : 0,
                        rotate: hoveredImg === idx ? 0 : -180
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      {idx + 1}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN - 1/3 - Descrizione + CTA in basso */}
          <div className="lg:col-span-1 flex flex-col justify-end">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-xl text-zinc-300 leading-relaxed">
                {collection.description}
              </p>

              <ShopButton
                badgeColor={collection.badgeColor}
                buttonGradient={collection.buttonGradient}
                buttonHoverColor={collection.buttonHoverColor}
                href={collection.href}
              />
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1.5); }
          50% { opacity: 0.3; transform: scale(1.7); }
        }
      `}</style>
    </motion.div>
  );
}
