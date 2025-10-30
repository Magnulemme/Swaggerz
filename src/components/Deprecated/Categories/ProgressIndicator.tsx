"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  totalItems: number;
  currentIndex: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  totalItems,
  currentIndex
}) => {
  return (
    <div className="absolute top-8 right-8 z-20">
      <div className="flex flex-col gap-2">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <motion.div
            key={idx}
            className="w-1 h-8 bg-white/10 rounded-full overflow-hidden"
            animate={{
              backgroundColor: idx === currentIndex
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full bg-white"
              initial={{ height: "0%" }}
              animate={{
                height: idx === currentIndex ? "100%" : "0%"
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};