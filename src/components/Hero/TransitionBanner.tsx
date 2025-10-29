"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TransitionBanner() {
  return (
    <div className="relative w-full pt-16 lg:pt-24">
      <div className="w-full flex flex-wrap justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white font-jost uppercase tracking-tight leading-tight max-w-title text-center text-balance"
        >
          Hai ancora sete di Streetwear?
        </motion.h2>
      </div>
    </div>
  );
}
