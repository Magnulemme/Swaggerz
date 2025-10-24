"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface CollectionGalleryProps {
  images: string[];
  title: string;
  price: string;
  pieces: string;
}

export default function CollectionGallery({
  images,
  title,
  price,
  pieces,
}: CollectionGalleryProps) {
  const [isMainHovered, setIsMainHovered] = useState(false);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4 h-full">
      {/* Main Image - Large, spans 2 rows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative row-span-2 h-full rounded-xl lg:rounded-2xl overflow-hidden border border-zinc-800/60 group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => setIsMainHovered(true)}
        onMouseLeave={() => setIsMainHovered(false)}
      >
        <Image
          src={images[0]}
          alt={`${title} featured`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Product Info Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="space-y-1.5">
            <p className="text-white text-sm font-bold">{title}</p>
            <div className="flex items-center gap-3">
              <span className="text-zinc-300 text-xs">{pieces}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400 text-sm font-bold">{price}</span>
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 rounded-xl lg:rounded-2xl blur-lg -z-10"
          animate={{
            opacity: isMainHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Secondary Images - Clean */}
      {images.slice(1, 3).map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
          className="relative h-full rounded-lg lg:rounded-xl overflow-hidden border border-zinc-800/60 group cursor-pointer"
          whileHover={{ scale: 1.05, zIndex: 10 }}
        >
          <Image
            src={img}
            alt={`${title} ${idx + 2}`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />

          {/* Product Info Overlay on Hover - Compact version */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
            <div className="space-y-0.5">
              <p className="text-white text-xs font-bold">{title}</p>
              <div className="flex items-center gap-2">
                <span className="text-zinc-300 text-[10px]">{pieces}</span>
                <span className="text-zinc-600 text-[10px]">•</span>
                <span className="text-amber-400 text-xs font-bold">
                  {price}
                </span>
              </div>
            </div>
          </div>

          {/* Border glow on hover */}
          <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 rounded-lg lg:rounded-xl" />
        </motion.div>
      ))}
    </div>
  );
}
