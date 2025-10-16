"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Palette, Gem, TrendingUp, Users, Lock } from 'lucide-react';

interface CategoryTagsProps {
  subtitle: string;
  index: number;
}

export const CategoryTags: React.FC<CategoryTagsProps> = ({ index }) => {
  const tagConfigs = [
    {
      // Streetwear - Culture Urbana
      primary: {
        text: "CULTURE",
        icon: TrendingUp,
        gradient: "from-red-500 to-orange-500",
        bg: "bg-red-500/10"
      },
      secondary: {
        text: "URBAN",
        icon: Zap,
        gradient: "from-orange-400 to-red-400",
        bg: "bg-orange-500/10"
      }
    },
    {
      // Arte - Espressione Digitale
      primary: {
        text: "DIGITAL",
        icon: Palette,
        gradient: "from-purple-500 to-pink-500",
        bg: "bg-purple-500/10"
      },
      secondary: {
        text: "ART",
        icon: Users,
        gradient: "from-pink-400 to-purple-400",
        bg: "bg-pink-500/10"
      }
    },
    {
      // Collezionabili - Esclusività Limitata
      primary: {
        text: "LIMITED",
        icon: Gem,
        gradient: "from-yellow-500 to-amber-500",
        bg: "bg-yellow-500/10"
      },
      secondary: {
        text: "EXCLUSIVE",
        icon: Lock,
        gradient: "from-amber-400 to-yellow-400",
        bg: "bg-amber-500/10"
      }
    }
  ];

  const config = tagConfigs[index] || tagConfigs[0];
  const PrimaryIcon = config.primary.icon;
  const SecondaryIcon = config.secondary.icon;

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Tag principale */}
      <motion.div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 ${config.primary.bg} backdrop-blur-sm`}
        whileHover={{ scale: 1.05 }}
      >
        <PrimaryIcon className="w-3.5 h-3.5 text-white/70" />
        <span className={`text-xs font-bold tracking-wider bg-gradient-to-r ${config.primary.gradient} bg-clip-text text-transparent uppercase`}>
          {config.primary.text}
        </span>
      </motion.div>

      {/* Connector */}
      <div className="flex items-center gap-1">
        <div className="w-4 h-px bg-gradient-to-r from-white/20 to-transparent" />
        <div className="w-0.5 h-0.5 bg-white/30 rounded-full" />
      </div>

      {/* Tag secondario */}
      <motion.div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 ${config.secondary.bg} backdrop-blur-sm`}
        whileHover={{ scale: 1.05 }}
      >
        <SecondaryIcon className="w-3.5 h-3.5 text-white/70" />
        <span className={`text-xs font-bold tracking-wider bg-gradient-to-r ${config.secondary.gradient} bg-clip-text text-transparent uppercase`}>
          {config.secondary.text}
        </span>
      </motion.div>

      {/* Decorative element */}
      <div className="ml-2 flex items-center gap-1">
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <div className="w-2 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>
    </div>
  );
};