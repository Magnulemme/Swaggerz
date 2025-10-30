"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, Star, TrendingUp, Palette, Clock } from 'lucide-react';
import type { Variants } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
  iconType: string;
  iconColor: string;
}

interface StatsSectionProps {
  stats: StatItem[];
  variants?: Variants;
}

const getIconStyles = (iconColor: string) => {
  const colorMap = {
    blue: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.6) 100%)',
      color: 'rgb(147, 197, 253)'
    },
    green: {
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(22, 163, 74, 0.6) 100%)',
      color: 'rgb(134, 239, 172)'
    },
    purple: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(147, 51, 234, 0.6) 100%)',
      color: 'rgb(221, 214, 254)'
    },
    orange: {
      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.8) 0%, rgba(234, 88, 12, 0.6) 100%)',
      color: 'rgb(253, 186, 116)'
    },
    pink: {
      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.8) 0%, rgba(219, 39, 119, 0.6) 100%)',
      color: 'rgb(249, 168, 212)'
    },
    cyan: {
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.8) 0%, rgba(8, 145, 178, 0.6) 100%)',
      color: 'rgb(103, 232, 249)'
    },
    red: {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.6) 100%)',
      color: 'rgb(252, 165, 165)'
    },
    yellow: {
      background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.8) 0%, rgba(202, 138, 4, 0.6) 100%)',
      color: 'rgb(254, 240, 138)'
    }
  };
  
  return colorMap[iconColor as keyof typeof colorMap] || {
    background: 'linear-gradient(135deg, rgba(113, 113, 122, 0.8) 0%, rgba(82, 82, 91, 0.6) 100%)',
    color: 'rgb(212, 212, 216)'
  };
};

const renderIcon = (iconType: string, iconColor: string) => {
  const styles = getIconStyles(iconColor);
  const iconProps = {
    className: "w-4 h-4 sm:w-5 sm:h-5", // Ridotto su mobile
    style: { color: styles.color }
  };

  switch(iconType) {
    case 'package': return <Package {...iconProps} />;
    case 'users': return <Users {...iconProps} />;
    case 'star': return <Star {...iconProps} />;
    case 'trending': return <TrendingUp {...iconProps} />;
    case 'palette': return <Palette {...iconProps} />;
    case 'clock': return <Clock {...iconProps} />;
    default: return <Package {...iconProps} />;
  }
};

// Componente divider ottimizzato
const StatDivider: React.FC = () => (
  <div className="hidden md:flex flex-col items-center justify-center px-2">
    <div className="h-12 w-px bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent"></div>
  </div>
);

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, variants }) => {
  // Calcola il numero di stats da mostrare (max 2 su mobile + spedizione gratuita)
  const displayStats = stats.slice(0, 2);
  
  return (
    <motion.div variants={variants} className='w-full'>
      <div 
        className="relative p-[1px] rounded-xl sm:rounded-2xl" // Border radius ridotto su mobile
        style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(234, 179, 8, 0.9) 50%, rgba(249, 115, 22, 0.9) 100%)'
        }}
      >
        {/* Layout mobile: stack verticale, desktop: orizzontale */}
        <div className="bg-gradient-to-br from-zinc-950/85 to-zinc-800/95 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          
          {/* Layout mobile: Grid a 2 colonne */}
          <div className="grid grid-cols-2 gap-3 p-4 md:hidden">
            {displayStats.map((stat, idx) => {
              const iconStyles = getIconStyles(stat.iconColor);
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-2">
                  <div 
                    className="p-2.5 rounded-lg shadow-lg" // Padding ridotto
                    style={{ background: iconStyles.background }}
                  >
                    {renderIcon(stat.iconType, stat.iconColor)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-zinc-400 tracking-wide uppercase leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {/* Spedizione gratuita span su entrambe le colonne */}
            <div className="col-span-2 flex flex-col items-center text-center space-y-2 pt-2 border-t border-zinc-700/50">
              <div 
                className="p-2.5 rounded-lg shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(22, 163, 74, 0.6) 100%)'
                }}
              >
                <Package className="w-4 h-4" style={{ color: 'rgb(134, 239, 172)' }} />
              </div>
              <div>
                <p className="text-base font-bold text-white">
                  Spedizione Gratuita
                </p>
                <p className="text-xs text-zinc-400 tracking-wide uppercase">
                  Sempre inclusa
                </p>
              </div>
            </div>
          </div>

          {/* Layout desktop: layout orizzontale originale */}
          <div className="hidden md:flex justify-around items-center gap-6 lg:gap-8 p-6">
            {/* Prima stat */}
            {displayStats.slice(0, 1).map((stat, idx) => {
              const iconStyles = getIconStyles(stat.iconColor);
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div 
                    className="p-3 rounded-xl shadow-lg"
                    style={{ background: iconStyles.background }}
                  >
                    {renderIcon(stat.iconType, stat.iconColor)}
                  </div>
                  <div>
                    <p className="text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
                      {stat.value}
                    </p>
                    <p className="text-xs lg:text-sm text-zinc-400 tracking-wider uppercase whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}

            <StatDivider />

            {/* Seconda stat */}
            {displayStats.slice(1, 2).map((stat, idx) => {
              const iconStyles = getIconStyles(stat.iconColor);
              return (
                <div key={idx + 1} className="flex items-center gap-3">
                  <div 
                    className="p-3 rounded-xl shadow-lg"
                    style={{ background: iconStyles.background }}
                  >
                    {renderIcon(stat.iconType, stat.iconColor)}
                  </div>
                  <div>
                    <p className="text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
                      {stat.value}
                    </p>
                    <p className="text-xs lg:text-sm text-zinc-400 tracking-wider uppercase whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}

            <StatDivider />

            {/* Spedizione gratuita */}
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(22, 163, 74, 0.6) 100%)'
                }}
              >
                <Package className="w-5 h-5" style={{ color: 'rgb(134, 239, 172)' }} />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
                  Spedizione
                </p>
                <p className="text-xs lg:text-sm text-zinc-400 tracking-wider uppercase whitespace-nowrap">
                  Gratuita
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};