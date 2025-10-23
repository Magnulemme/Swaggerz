"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Collection } from "./types";
import { Check } from "lucide-react";
import StarRating from "@/components/ui/StarRating";

interface RightSectionProps {
  collection: Collection;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function RightSection({ collection }: RightSectionProps) {
  return (
    <div className="relative w-full h-full overflow-hidden z-0 rounded-r-3xl">
      <div className="relative z-50 flex flex-col h-full py-8 lg:py-10 gap-6 lg:gap-7 px-6 lg:pr-10">
        {/* Artist Presentation - Minimal & Elegant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-shrink-0 space-y-3"
        >
          {/* Artist Header - Inline */}
          <div className="flex items-center gap-3">
            {/* Avatar with subtle glow */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border border-orange-400/30 flex items-center justify-center font-black text-white text-sm shadow-lg">
                R
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

          {/* Artist Description */}
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
            Pioniere dell'arte urbana italiana, Rebkon fonde graffiti
            tradizionali con elementi digitali. Le sue opere esplorano il
            confine tra street culture e alta moda, creando pezzi unici che
            ridefiniscono lo streetwear contemporaneo.
          </p>
        </motion.div>

        {/* Gallery Grid - Clean & Focused */}
        <div className="relative z-50 flex-1 min-h-[280px] grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4">
          {/* Main Image - Large, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative row-span-2 min-h-[280px] rounded-xl lg:rounded-2xl overflow-hidden border border-zinc-800/60 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={collection.images[0]}
              alt={`${collection.title} by Rebkon`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
            />

            {/* Subtle artist signature - bottom right */}
            <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-md border border-zinc-700/50">
              <span className="text-white text-[10px] font-bold tracking-wide">
                Rebkon
              </span>
            </div>

            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-xl lg:rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
          </motion.div>

          {/* Secondary Images - Clean */}
          {collection.images.slice(1, 3).map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="relative min-h-[135px] rounded-lg lg:rounded-xl overflow-hidden border border-zinc-800/60 group cursor-pointer"
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <Image
                src={img}
                alt={`${collection.title} ${idx + 2}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />

              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Border glow on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/40 transition-colors duration-300 rounded-lg lg:rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
