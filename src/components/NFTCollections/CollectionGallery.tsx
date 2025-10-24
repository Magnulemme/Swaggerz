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
      {/* All Images - 4 equal sized on lg, 1 large + 2 small on xl+ */}
      {images.slice(0, 4).map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
          className={`relative h-full rounded-lg lg:rounded-xl overflow-hidden border border-zinc-800/60 group cursor-pointer ${
            idx === 0 ? 'xl:row-span-2 xl:min-h-[300px]' : ''
          }`}
          whileHover={{ scale: idx === 0 ? 1.02 : 1.05, zIndex: 10 }}
          onMouseEnter={() => idx === 0 && setIsMainHovered(true)}
          onMouseLeave={() => idx === 0 && setIsMainHovered(false)}
        >
          <Image
            src={img}
            alt={`${title} ${idx + 1}`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />

          {/* Product Info Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end ${
            idx === 0 ? 'p-4' : 'p-2.5'
          }`}>
            <div className={idx === 0 ? 'space-y-1.5' : 'space-y-0.5'}>
              <p className={`text-white font-bold ${idx === 0 ? 'text-sm' : 'text-xs'}`}>
                {title}
              </p>
              <div className="flex items-center gap-2">
                <span className={`text-zinc-300 ${idx === 0 ? 'text-xs' : 'text-[10px]'}`}>
                  {pieces}
                </span>
                <span className={`text-zinc-600 ${idx === 0 ? 'text-xs' : 'text-[10px]'}`}>
                  •
                </span>
                <span className={`text-amber-400 font-bold ${idx === 0 ? 'text-sm' : 'text-xs'}`}>
                  {price}
                </span>
              </div>
            </div>
          </div>

          {/* Glow effect on hover - first image only on xl+ */}
          {idx === 0 && (
            <motion.div
              className="hidden xl:block absolute -inset-1 rounded-xl lg:rounded-2xl blur-lg -z-10"
              animate={{
                opacity: isMainHovered ? 0.5 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
