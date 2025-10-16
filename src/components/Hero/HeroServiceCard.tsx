"use client"

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HeroServiceCardProps {
  icon: LucideIcon;
  iconColor: string;
  gradientColors: string;
  title: string;
  description: string;
  cardId: string;
  onHover: (cardId: string) => void;
  onLeave: () => void;
}

const HeroServiceCard: React.FC<HeroServiceCardProps> = ({
  icon: Icon,
  iconColor,
  gradientColors,
  title,
  description,
  cardId,
  onHover,
  onLeave
}) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-5 lg:p-6 border border-zinc-800/50 overflow-hidden hover:border-zinc-700/50 transition-all duration-500 h-full"
      onMouseEnter={() => onHover(cardId)}
      onMouseLeave={onLeave}
    >
      <div className={`absolute inset-0 ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative h-full flex flex-col justify-between min-h-[120px]">
        <div className="flex-shrink-0">
          <Icon className={`w-7 h-7 lg:w-8 lg:h-8 ${iconColor} mb-3 lg:mb-4`} />
        </div>
        <div className="flex-grow flex flex-col justify-end">
          <h3 className="text-white font-bold text-base lg:text-lg mb-1.5 lg:mb-2">{title}</h3>
          <p className="text-zinc-400 text-xs lg:text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroServiceCard;