"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShirtIcon,
  LayersIcon,
  UsersIcon,
  SparklesIcon,
  StarIcon,
  CrownIcon,
  ZapIcon,
  GemIcon
} from 'lucide-react';

interface StreetStatsProps {
  stats: Record<string, string>;
  isActive: boolean;
  index: number;
}

export const StreetStats: React.FC<StreetStatsProps> = ({
  stats,
  isActive,
  index
}) => {
  // Configurazione per ogni categoria con icone e styling streetwear
  const statsConfigs = [
    {
      // Streetwear
      pieces: {
        icon: ShirtIcon,
        label: "PIECES",
        gradient: "from-red-500 to-orange-500",
        bg: "bg-red-500/10",
        accent: "text-red-400"
      },
      collections: {
        icon: LayersIcon,
        label: "DROPS",
        gradient: "from-orange-500 to-red-500",
        bg: "bg-orange-500/10",
        accent: "text-orange-400"
      }
    },
    {
      // Arte
      artists: {
        icon: UsersIcon,
        label: "ARTISTS",
        gradient: "from-purple-500 to-pink-500",
        bg: "bg-purple-500/10",
        accent: "text-purple-400"
      },
      pieces: {
        icon: SparklesIcon,
        label: "WORKS",
        gradient: "from-pink-500 to-purple-500",
        bg: "bg-pink-500/10",
        accent: "text-pink-400"
      }
    },
    {
      // Collezionabili
      limited: {
        icon: GemIcon,
        label: "LIMITED",
        gradient: "from-yellow-500 to-amber-500",
        bg: "bg-yellow-500/10",
        accent: "text-yellow-400"
      },
      exclusives: {
        icon: CrownIcon,
        label: "EXCLUSIVES",
        gradient: "from-amber-500 to-yellow-500",
        bg: "bg-amber-500/10",
        accent: "text-amber-400"
      }
    }
  ];

  const config = statsConfigs[index] || statsConfigs[0];

  return (
    <div className="flex flex-wrap items-center gap-3 py-6">
      {Object.entries(stats).map(([key, value], idx) => {
        const statConfig = config[key as keyof typeof config];
        if (!statConfig) return null;

        const Icon = statConfig.icon;

        return (
          <motion.div
            key={key}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 ${statConfig.bg} backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 20,
              scale: isActive ? 1 : 0.9
            }}
            transition={{
              duration: 0.6,
              delay: 0.4 + idx * 0.15,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
          >
            {/* Icona */}
            <div className={`p-1.5 rounded-lg ${statConfig.bg}`}>
              <Icon className={`w-4 h-4 ${statConfig.accent}`} />
            </div>

            {/* Stats content */}
            <div className="flex flex-col">
              <span className={`text-lg font-black bg-gradient-to-r ${statConfig.gradient} bg-clip-text text-transparent`}>
                {value}
              </span>
              <span className="text-xs font-bold tracking-wider text-white/60 uppercase">
                {statConfig.label}
              </span>
            </div>

            {/* Decorative accent */}
            <div className="ml-1">
              <ZapIcon className="w-3 h-3 text-white/20" />
            </div>
          </motion.div>
        );
      })}

      {/* Decorative street elements */}
      <motion.div
        className="flex items-center gap-2 ml-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <div className="w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <StarIcon className="w-3 h-3 text-white/20" />
        <div className="w-4 h-px bg-gradient-to-r from-white/5 to-transparent" />
      </motion.div>
    </div>
  );
};