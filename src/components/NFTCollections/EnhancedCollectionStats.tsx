"use client";

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import GlassmorphicCard from './GlassmorphicCard';

interface EnhancedCollectionStatsProps {
  price: string;
  pieces: string;
  nftLabel: string;
  badgeColor: "emerald" | "cyan" | "orange" | "purple";
}

const colorMap = {
  emerald: {
    text: 'text-emerald-400',
    glow: 'rgba(16, 185, 129, 0.3)',
    gradient: 'from-emerald-500/20 to-green-500/10',
    border: 'border-emerald-500/30'
  },
  cyan: {
    text: 'text-cyan-400',
    glow: 'rgba(6, 182, 212, 0.3)',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30'
  },
  orange: {
    text: 'text-orange-400',
    glow: 'rgba(249, 115, 22, 0.3)',
    gradient: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500/30'
  },
  purple: {
    text: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.3)',
    gradient: 'from-purple-500/20 to-violet-500/10',
    border: 'border-purple-500/30'
  }
};

export default function EnhancedCollectionStats({
  price,
  pieces,
  nftLabel,
  badgeColor
}: EnhancedCollectionStatsProps) {
  const colors = colorMap[badgeColor];

  return (
    <div className="space-y-4">
      {/* Stat Cards Stack */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Price Card */}
        <GlassmorphicCard
          variant="elevated"
          glowColor={colors.glow}
          className="group p-5 hover:border-white/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.p
                className="text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                A partire da
              </motion.p>
              <div className="flex items-baseline gap-2">
                <AnimatedCounter
                  value={price}
                  className="text-3xl font-bold text-white"
                  duration={1.5}
                />
                <motion.span
                  className={`text-sm ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}
                  initial={{ x: -5 }}
                  whileInView={{ x: 0 }}
                >
                  /pezzo
                </motion.span>
              </div>
            </div>
            {/* Icon */}
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className={`h-full bg-gradient-to-r ${colors.gradient}`}
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.7 }}
              style={{ width: '75%' }}
            />
          </motion.div>
        </GlassmorphicCard>

        {/* Pieces Card */}
        <GlassmorphicCard
          variant="elevated"
          glowColor={colors.glow}
          className="group p-5 hover:border-white/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.p
                className="text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Disponibili
              </motion.p>
              <div className="flex items-baseline gap-2">
                <AnimatedCounter
                  value={pieces}
                  className="text-3xl font-bold text-white"
                  duration={2}
                />
                <span className="text-sm text-zinc-500">pezzi</span>
              </div>
            </div>
            {/* Icon */}
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
              whileHover={{ rotate: -5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </motion.div>
          </div>

          {/* Stock indicator */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i < 3 ? colors.text : 'bg-white/10'}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </div>
            <span className="text-xs text-zinc-500">Stock medio</span>
          </div>
        </GlassmorphicCard>

        {/* NFT Badge Card */}
        <GlassmorphicCard
          variant="elevated"
          glowColor={colors.glow}
          className={`group p-5 border-2 ${colors.border} relative overflow-hidden`}
        >
          {/* Animated background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100`}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <motion.p
                className="text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Limited Edition
              </motion.p>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${colors.text}`}>{nftLabel}</span>
                <motion.div
                  className={`px-2 py-1 rounded-md bg-white/5 text-xs ${colors.text} font-medium`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  INCLUDED
                </motion.div>
              </div>
            </div>

            {/* NFT Icon with pulse */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} blur-xl opacity-50`} />
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center border ${colors.border}`}>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}
