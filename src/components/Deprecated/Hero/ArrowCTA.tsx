'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ArrowCTA() {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex flex-col items-center gap-3 group cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <span className="text-base font-bold text-white/70 group-hover:text-white transition-colors">
        Scopri di più
      </span>

      <ArrowRight
        className="w-20 h-20 text-white/90 group-hover:text-white transition-colors"
        strokeWidth={2}
      />
    </motion.button>
  );
}