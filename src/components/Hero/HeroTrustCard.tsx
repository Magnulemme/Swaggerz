"use client"

import React from 'react';
import { Shield, Award } from 'lucide-react';

interface HeroTrustCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroTrustCard: React.FC<HeroTrustCardProps> = ({ onHover, onLeave }) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-5 lg:p-6 border border-zinc-800/50 overflow-hidden hover:border-zinc-700/50 transition-all duration-500 h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col justify-between min-h-[120px]">
        <div className="flex-shrink-0 flex items-center justify-center gap-3 lg:gap-4">
          <Shield className="w-7 h-7 lg:w-8 lg:h-8 text-teal-500" />
          <Award className="w-7 h-7 lg:w-8 lg:h-8 text-yellow-500" />
        </div>
        <div className="flex-grow flex flex-col justify-end items-center">
          <p className="text-white font-bold text-base lg:text-lg text-center mb-1.5 lg:mb-2">100% Garantito</p>
          <p className="text-zinc-400 text-xs lg:text-sm text-center leading-relaxed">Soddisfatti o rimborsati</p>
        </div>
      </div>
    </div>
  );
};

export default HeroTrustCard;