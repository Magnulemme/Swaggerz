"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';

interface ExploreButtonProps {
  title: string;
  variants?: any;
}

export const ExploreButton: React.FC<ExploreButtonProps> = ({
  title,
  variants
}) => {
  return (
    <motion.button
      variants={variants}
      className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold tracking-wide text-lg cursor-pointer rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
      />
      <span className="relative flex items-center gap-3 text-md lg:text-lg">
        <Flame className="w-[1.4em] h-[1.4em] lg:w-[1.2em] lg:h-[1.2em] text-yellow-300" />
        Esplora {title}
        <ArrowRight className="w-[1.4em] h-[1.4em] lg:w-[1.2em] lg:h-[1.2em] group-hover:translate-x-1 transition-transform duration-200" />
      </span>
    </motion.button>
  );
};