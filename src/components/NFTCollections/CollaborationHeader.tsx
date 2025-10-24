"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CollaborationHeaderProps {
  brand1: {
    name: string;
    letter: string;
    bgColor: string;
    textColor: string;
  };
  brand2: {
    name: string;
    letter: string;
    bgColor: string;
    textColor: string;
    verified?: boolean;
  };
}

export default function CollaborationHeader({
  brand1,
  brand2,
}: CollaborationHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex items-center gap-3 flex-wrap"
    >
      {/* Brand 1 Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: brand1.bgColor, color: brand1.textColor }}
        >
          <span className="font-[family-name:var(--font-pastor-of-muppets)] text-xl lg:text-2xl">
            {brand1.letter}
          </span>
        </div>
        <span className="text-xl font-black text-white">
          {brand1.name}
        </span>
      </div>

      {/* Collaboration symbol */}
      <span className="text-amber-500 font-black text-2xl">✕</span>

      {/* Brand 2 Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: brand2.bgColor, color: brand2.textColor }}
        >
          <span className="font-[family-name:var(--font-pastor-of-muppets)] text-xl lg:text-2xl">
            {brand2.letter}
          </span>
          {/* Verified badge */}
          {brand2.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-zinc-900 shadow-md">
              <Check className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        <span
          className="text-xl font-black"
          style={{ color: brand2.textColor }}
        >
          {brand2.name}
        </span>
      </div>
    </motion.div>
  );
}
