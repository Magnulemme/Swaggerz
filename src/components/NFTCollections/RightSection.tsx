"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Collection } from "./types";
import { Sparkles } from "lucide-react";
import StarRating from "@/components/ui/StarRating";

interface RightSectionProps {
  collection: Collection;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function RightSection({ collection }: RightSectionProps) {
  // Map badge colors to Tailwind classes
  const badgeColorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };

  const gradientMap = {
    emerald: "from-emerald-500/20 to-transparent",
    cyan: "from-cyan-500/20 to-transparent",
    orange: "from-orange-500/20 to-transparent",
    purple: "from-purple-500/20 to-transparent",
  };

  return (
    <div className="relative w-full h-full overflow-hidden z-0 rounded-r-3xl">
      <div className="relative z-50 flex flex-col h-full py-8 lg:py-10 gap-4 lg:gap-5 px-6 lg:pr-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-shrink-0 flex items-center justify-between"
        >
          {/* Left side */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 text-sm font-semibold">
              Nuovi arrivi
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <span className="text-zinc-500 text-xs">
              {collection.pieces} pezzi
            </span>
          </div>

          {/* Right side - Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              badgeColorMap[collection.badgeColor]
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {collection.badge}
          </span>
        </motion.div>

        {/* Image Gallery Grid - Dynamic Layout */}
        <div className="relative z-50 flex-1 min-h-[280px] grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4">
          {/* First image - Large, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative row-span-2 min-h-[280px] rounded-xl lg:rounded-2xl overflow-hidden border border-zinc-800/50 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={collection.images[0]}
              alt={`${collection.title} 1`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
            />

            {/* Badge "New Collection" */}
            <div className="absolute top-2 left-2 z-20 px-2.5 py-1 bg-white rounded-full shadow-lg">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-wide">
                New Collection
              </span>
            </div>

            {/* Info overlay on hover */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="backdrop-blur-md bg-black/60 rounded-lg p-2.5 border border-white/10">
                <p className="text-white text-xs font-bold mb-0.5">
                  Featured Item
                </p>
                <p className="text-zinc-300 text-[10px]">Limited Edition</p>
              </div>
            </div>

            {/* Gradient overlay based on collection color */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                gradientMap[collection.badgeColor]
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Glow effect on hover */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${
                gradientMap[collection.badgeColor]
              } rounded-xl lg:rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`}
            />
          </motion.div>

          {/* Remaining images - Smaller */}
          {collection.images.slice(1, 3).map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="relative min-h-[135px] rounded-lg lg:rounded-xl overflow-hidden border border-zinc-800/50 group cursor-pointer"
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <Image
                src={img}
                alt={`${collection.title} ${idx + 2}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />

              {/* Badge "New Collection" */}
              <div className="absolute top-2 left-2 z-20 px-2.5 py-1 bg-white rounded-full shadow-lg">
                <span className="text-emerald-600 text-[10px] font-black uppercase tracking-wide">
                  New Collection
                </span>
              </div>

              {/* Info overlay on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="backdrop-blur-md bg-black/60 rounded-md p-2 border border-white/10">
                  <p className="text-white text-[10px] font-bold">Premium</p>
                </div>
              </div>

              {/* Subtle gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  gradientMap[collection.badgeColor]
                } opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
              />

              {/* Border glow on hover */}
              <div
                className={`absolute inset-0 border-2 border-transparent group-hover:border-${collection.badgeColor}-500/50 transition-colors duration-300 rounded-lg lg:rounded-xl`}
              />
            </motion.div>
          ))}
        </div>

        {/* Collection Info Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex-shrink-0 space-y-2"
        >
          {/* Top row - NFT Label and Price */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/40">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-xs">
                Include{" "}
                <span className="text-white font-bold">
                  {collection.nftLabel}
                </span>{" "}
                certificato
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 text-[10px] uppercase tracking-wider">
                Da
              </span>
              <span className="text-white text-base font-black font-jost">
                {collection.price}
              </span>
            </div>
          </div>

          {/* Bottom row - Rating */}
          <div className="flex items-center gap-2">
            <StarRating
              rating={4.9}
              reviewCount={156}
              size="sm"
              starClassName="fill-emerald-400 text-emerald-400"
              textClassName="text-zinc-300"
            />
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
              Premium Collection
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
