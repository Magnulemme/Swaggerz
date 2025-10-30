// components/Categories/FixedTextSection.tsx
"use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { VideoDataItem } from '@/types/video.types';
import { ExploreButton } from './ExploreButton';
import { StatsSection } from './StatsSection';
import ShaderText from '@/components/ShaderText';

interface FixedTextSectionProps {
  item: VideoDataItem;
  index: number;
  isActive: boolean;
}

// Container principale con orchestrazione più fluida
const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Effetto reveal per il ShaderText - solo movimento dal basso, fluido e immediato
const shaderCanvasRevealVariants: Variants = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as any
    }
  }
};

// Descrizione con effetto split reveal per parola
const descriptionRevealVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.3
    }
  }
};

const wordRevealVariants: Variants = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as any
    }
  }
};

// Stats con effetto più fluido
const statsRevealVariants: Variants = {
  initial: {
    opacity: 0,
    y: 40
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.5
    }
  }
};

// CTA con effetto fluido
const ctaRevealVariants: Variants = {
  initial: {
    opacity: 0,
    y: 35
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.6
    }
  }
};

// Componente per splitting per parola della descrizione
const SplitDescription = ({ text }: { text: string }) => {
  const words = text.split(' ');
  
  return (
    <motion.div 
      variants={descriptionRevealVariants}
      className="flex flex-wrap"
    >
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden mr-[0.3em]">
          <motion.span
            variants={wordRevealVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

export const FixedTextSection: React.FC<FixedTextSectionProps> = ({
  item,
  index,
  isActive
}) => {
  
  if (!isActive) return null;
  
  return (
    <motion.div
      key={`${item.id}-${index}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="xl:absolute xl:inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-4 lg:py-16"
    >
      <div className="max-w-3xl w-full space-y-6 lg:space-y-12">
        
        {/* Titolo con ShaderText - reveal dal basso fluido */}
        <div className="space-y-3 lg:space-y-6">
          <div className="relative overflow-hidden">
            <motion.div
              variants={shaderCanvasRevealVariants}
              className="relative"
            >
              <ShaderText
                className="leading-tight"
                fontSize="clamp(2rem, 6vw, 5rem)"
                fontWeight="900"
              >
                {item.title}
              </ShaderText>
            </motion.div>
          </div>
          
          {/* Descrizione con reveal per parola */}
          <div className="text-base sm:text-lg lg:text-2xl text-zinc-200 leading-relaxed max-w-2xl line-clamp-3 lg:line-clamp-none">
            <SplitDescription text={item.description} />
          </div>
        </div>

        {/* Stats con reveal fluido */}
        <motion.div variants={statsRevealVariants}>
          <StatsSection stats={item.stats} />
        </motion.div>

        {/* CTA con effetto fluido */}
        <motion.div 
          className="pt-2 lg:pt-6"
          variants={ctaRevealVariants}
        >
          <ExploreButton title={item.title} />
        </motion.div>
       
      </div>
    </motion.div>
  );
};

export const scrollConfig = {
  snapConfig: {
    scrollDuration: {
      mobile: 800,
      tablet: 600,
      desktop: 400
    },
    threshold: {
      mobile: 100,
      tablet: 75,
      desktop: 50
    }
  },
  navbarHeight: 80,
  bannerHeight: 128,
  totalOffset: 208,
};