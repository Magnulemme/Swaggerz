"use client"

import React from 'react';
import { motion } from 'framer-motion';

const LatestDropsBadge: React.FC = () => {
  return (
    <div className="absolute -top-1 -right-1 z-[100]">
      <motion.div
        className="relative"
        initial={{ x: 50, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
      >
        {/* Container principale arrotondato */}
        <div className="relative bg-zinc-950 backdrop-blur-md rounded-bl-3xl border-b border-l border-zinc-800/50">
          <div className='relative w-full h-full px-8 py-6'>
            {/* Angoli tech decorativi più spessi */}
            <div className="absolute top-3 left-3 w-3 h-3 border-l-[3px] border-t-[3px] border-green-400 rounded-tl-lg"></div>
            <div className="absolute top-3 right-3 w-3 h-3 border-r-[3px] border-t-[3px] border-green-400 rounded-tr-lg"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l-[3px] border-b-[3px] border-green-400 rounded-bl-lg"></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r-[3px] border-b-[3px] border-green-400 rounded-br-lg"></div>

            {/* Contenuto orizzontale più compatto */}
            <div className="relative flex items-center gap-4">
              {/* Indicatore status con pulse verde */}
              <div className="relative">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 4px rgba(34, 197, 94, 0.6)',
                      '0 0 12px rgba(34, 197, 94, 1)',
                      '0 0 4px rgba(34, 197, 94, 0.6)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 w-2 h-2 bg-green-300 rounded-full"
                  animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
              </div>

              {/* Separatore */}
              <div className="w-0.5 h-5 bg-gradient-to-b from-transparent via-green-400/80 to-transparent rounded-full"></div>

              {/* Testo DROP SALE */}
              <motion.span
                className="text-green-400 text-xl font-mono font-black tracking-[0.2em] uppercase whitespace-nowrap"
                animate={{
                  textShadow: [
                    '0 0 8px rgba(34, 197, 94, 0.5)',
                    '0 0 16px rgba(34, 197, 94, 0.9)',
                    '0 0 8px rgba(34, 197, 94, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                LATEST DROPS
              </motion.span>

              {/* Separatore */}
              <div className="w-0.5 h-5 bg-gradient-to-b from-transparent via-green-400/80 to-transparent rounded-full"></div>

              {/* Live indicator */}
              <motion.span
                className="text-green-300 text-xs font-mono font-black tracking-wider"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.98, 1.02, 0.98]
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                [LIVE]
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LatestDropsBadge;