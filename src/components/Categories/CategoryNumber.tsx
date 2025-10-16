"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Hash, Star, Crown } from 'lucide-react';

interface CategoryNumberProps {
  index: number;
  variants?: any;
}

export const CategoryNumber: React.FC<CategoryNumberProps> = ({
  index,
  variants
}) => {
  const badges = [
    {
      label: "DROP",
      number: "01",
      icon: Hash,
      gradient: "from-red-500 to-orange-500",
      bg: "bg-red-500/10"
    },
    {
      label: "ART",
      number: "02",
      icon: Star,
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/10"
    },
    {
      label: "LIMITED",
      number: "03",
      icon: Crown,
      gradient: "from-yellow-500 to-amber-500",
      bg: "bg-yellow-500/10"
    }
  ];

  const currentBadge = badges[index] || badges[0];
  const Icon = currentBadge.icon;

  return (
    <motion.div
      variants={variants}
      className="flex items-center gap-4 mb-6"
    >
      {/* Badge principale streetwear style */}
      <div className={`relative flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 ${currentBadge.bg} backdrop-blur-sm`}>
        {/* Icona */}
        <Icon className="w-4 h-4 text-white/70" />

        {/* Label + Number */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-white/80 uppercase">
            {currentBadge.label}
          </span>
          <div className="w-px h-4 bg-white/20" />
          <span className={`text-sm font-black bg-gradient-to-r ${currentBadge.gradient} bg-clip-text text-transparent`}>
            {currentBadge.number}
          </span>
        </div>
      </div>

      {/* Decorative lines streetwear style */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="w-1 h-1 bg-white/30 rounded-full" />
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </motion.div>
  );
};