import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface ExploreButtonProps {
  collectionName?: string;
  isHovered?: boolean;
  onHoverChange?: (hovered: boolean) => void;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({
  collectionName,
  isHovered,
  onHoverChange = () => {}
}) => {
  return (
    <motion.button
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange/40 focus:ring-offset-2 focus:ring-offset-zinc-950"
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={(e) => {
        e.stopPropagation();
        console.log(`Navigating to ${collectionName} collection`);
      }}
    >
      {/* Animated rotating gradient border */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d37918_0%,#111111_50%,#d37918_100%)]" />

      {/* Button content with animated background */}
      <motion.span 
        className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 backdrop-blur-3xl overflow-hidden relative"
        animate={{
          backgroundColor: isHovered ? '#d37918' : '#09090b'
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
      >
        {/* Text container with slide animation */}
        <span className="relative inline-flex flex-col h-full items-center justify-center overflow-hidden">
          <motion.span
            className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2"
            animate={{
              y: isHovered ? '-120%' : '0%',
              opacity: isHovered ? 0 : 1
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
              opacity: { duration: 0.3 }
            }}
          >
            Acquista
            <ShoppingBag className="w-4 h-4" />
          </motion.span>

          <motion.span
            className="text-sm font-bold uppercase tracking-wider text-zinc-950 absolute flex items-center gap-2"
            animate={{
              y: isHovered ? '0%' : '120%',
              opacity: isHovered ? 1 : 0
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
              opacity: { duration: 0.3, delay: isHovered ? 0.1 : 0 }
            }}
          >
            Acquista
            <ShoppingBag className="w-4 h-4" />
          </motion.span>
        </span>
      </motion.span>
    </motion.button>
  );
};

export default ExploreButton;