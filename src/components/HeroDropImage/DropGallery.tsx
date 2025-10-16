"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface DropGalleryProps {
  gallery: string[];
  collectionName: string;
}

const DropGallery: React.FC<DropGalleryProps> = ({ gallery, collectionName }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <motion.div
      className="w-full"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.23, 1, 0.320, 1] }}
    >
      <div className="flex gap-3">
        {gallery.map((img, index) => (
          <motion.div
            key={index}
            className="relative flex-1 aspect-[4/5] rounded-xl overflow-hidden border border-white/10 cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.7 + (index * 0.1),
              ease: [0.23, 1, 0.320, 1]
            }}
            whileHover={{
              scale: 1.05,
              y: -4,
              transition: { duration: 0.2 }
            }}
          >
            {/* Glow effect on hover */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-lg rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`${collectionName} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 30vw, 150px"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

              {/* Index number */}
              <motion.div
                className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
              >
                <span className="text-[10px] font-bold text-white">
                  {index + 1}
                </span>
              </motion.div>
            </div>

            {/* Border shimmer on hover */}
            {hoveredIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DropGallery;
