import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicGlowEffectProps {
  currentCollection: number;
}

const DynamicGlowEffect: React.FC<DynamicGlowEffectProps> = ({
  currentCollection
}) => {
  return (
    <AnimatePresence>
      <motion.div 
        key={`glow-${currentCollection}`}
        className={`absolute inset-0 opacity-40 ${
          currentCollection === 0 ? 'bg-gradient-to-br from-red-500/90 via-transparent to-orange-500/90' :
          currentCollection === 1 ? 'bg-gradient-to-br from-blue-500/90 via-transparent to-purple-500/90' :
          'bg-gradient-to-br from-amber-500/90 via-transparent to-yellow-500/90'
        }`}
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 0.4, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </AnimatePresence>
  );
};

export default DynamicGlowEffect;
