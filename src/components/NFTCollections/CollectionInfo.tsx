"use client";

import { motion } from "framer-motion";

interface CollectionInfoProps {
  title: string;
  description: string;
}

export default function CollectionInfo({
  title,
  description,
}: CollectionInfoProps) {
  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Collection Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
          Collection
        </p>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-[0.95] tracking-tight text-white font-jost uppercase">
          {title}
        </h2>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
