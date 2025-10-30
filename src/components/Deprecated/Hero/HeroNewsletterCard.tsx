"use client"

import React from 'react';
import { Users } from 'lucide-react';

interface HeroNewsletterCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroNewsletterCard: React.FC<HeroNewsletterCardProps> = ({ onHover, onLeave }) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl p-6 border border-red-500/20 md:col-span-2 overflow-hidden hover:border-red-500/30 transition-all duration-500"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col justify-between">
        <div>
          <Users className="w-6 h-6 text-red-500 mb-3" />
          <p className="text-white font-semibold mb-2">Join the Club</p>
          <p className="text-zinc-400 text-sm">Ricevi sconti esclusivi e anteprime</p>
        </div>
        <button className="mt-3 w-full py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors">
          Iscriviti →
        </button>
      </div>
    </div>
  );
};

export default HeroNewsletterCard;