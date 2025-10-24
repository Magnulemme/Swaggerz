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
  const [isHovered, setIsHovered] = React.useState(false);

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
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border border-orange-400/30 flex items-center justify-center text-white text-sm shadow-lg">
                <span className="font-[family-name:var(--font-pastor-of-muppets)] text-base">
                  R
                </span>
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

        {/* Featured Video - Artist Showcase */}
        {collection.video && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-50 flex-shrink-0 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-xl lg:rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-2xl blur-xl"
              style={{
                background: `radial-gradient(circle at 50% 30%, rgba(249, 115, 22, 0.6), transparent 65%)`,
              }}
              animate={{
                opacity: isHovered ? 0.7 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Video container */}
            <div className="relative w-full h-64 lg:h-72 xl:h-80 overflow-hidden group cursor-pointer">
              <video
                src={collection.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Artist signature overlay */}
              <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg border border-orange-500/30">
                <span className="text-white text-xs font-bold tracking-wide">
                  Rebkon • Artist Showcase
                </span>
              </div>

              {/* Overlay scuro on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
