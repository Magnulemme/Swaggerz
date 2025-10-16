"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Base L section - 1 column, 1 row
 * Foundation piece for the L-shaped structure with brand storytelling
 */
export default function BaseLSection() {
  return (
    <div className="relative w-full h-full rounded-3xl border  border-zinc-700/50 bg-black overflow-visible group transition-all duration-500">

      {/* Inner container with overflow hidden for effects */}
      <div className="absolute inset-0 rounded-3xl rounded-t-none overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-50" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-8 lg:p-10">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              Est. 2024
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight"
        >
          Non un brand, 
          <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            una Community
          </span>
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-sm lg:text-base leading-relaxed mb-6 max-w-md"
        >
          Swaggerz nasce per chi vive la strada come una tela da reinventare.
Non seguiamo le tendenze: le creiamo.
Con ogni drop, celebriamo l&apos;arte, la libertà e la voglia di cambiare le regole — insieme. Non avere paura, entra nel movimento.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm group/btn transition-colors"
        >
          <span>Scopri la nostra storia</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}