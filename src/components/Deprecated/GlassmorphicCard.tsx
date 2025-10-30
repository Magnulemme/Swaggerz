"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
  glowColor?: string;
}

export default function GlassmorphicCard({
  children,
  className = "",
  variant = 'default',
  glowColor = 'rgba(168, 85, 247, 0.4)'
}: GlassmorphicCardProps) {

  const variants = {
    default: "bg-white/5 backdrop-blur-xl border border-white/10",
    elevated: "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl",
    subtle: "bg-white/[0.02] backdrop-blur-md border border-white/5"
  };

  return (
    <motion.div
      className={`relative rounded-2xl ${variants[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 20px 60px ${glowColor}`,
        transition: { duration: 0.3 }
      }}
    >
      {/* Glow effect interno */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
