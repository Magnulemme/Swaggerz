"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface DropStatsProps {
  stats: {
    items: number;
    floorPrice: string;
    volume24h: string;
    owners: number;
  };
  variant?: 'desktop' | 'mobile';
}

const DropStats: React.FC<DropStatsProps> = ({ stats, variant = 'desktop' }) => {
  const statsData = [
    {
      label: 'Items',
      value: stats.items.toLocaleString(),
      icon: '📦'
    },
    {
      label: 'Floor Price',
      value: stats.floorPrice,
      icon: '💎'
    },
    {
      label: '24h Volume',
      value: stats.volume24h,
      icon: '📊'
    },
    {
      label: 'Owners',
      value: stats.owners.toLocaleString(),
      icon: '👥'
    }
  ];

  const isDesktop = variant === 'desktop';

  return (
    <motion.div
      className={`inline-flex ${isDesktop ? 'gap-3' : 'gap-2'} items-center`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.23, 1, 0.320, 1] }}
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={`
            relative group
            ${isDesktop ? 'px-4 py-3' : 'px-3 py-2'}
            bg-black/70 backdrop-blur-md
            border border-white/10
            rounded-xl
            hover:bg-black/80 hover:border-white/20
            transition-all duration-300
          `}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.4 + (index * 0.1),
            ease: [0.23, 1, 0.320, 1]
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 }
          }}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none" />

          <div className="relative flex flex-col items-center gap-1">
            {/* Icon */}
            <span className={`${isDesktop ? 'text-lg' : 'text-base'} opacity-80 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </span>

            {/* Value */}
            <span className={`
              ${isDesktop ? 'text-base' : 'text-sm'}
              font-bold text-white
              group-hover:text-blue-300
              transition-colors duration-300
            `}>
              {stat.value}
            </span>

            {/* Label */}
            <span className={`
              ${isDesktop ? 'text-[10px]' : 'text-[9px]'}
              font-medium text-zinc-400 uppercase tracking-wider
              group-hover:text-zinc-300
              transition-colors duration-300
            `}>
              {stat.label}
            </span>
          </div>

          {/* Border shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DropStats;
