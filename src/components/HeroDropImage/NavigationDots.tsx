import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationDotsProps {
  collections: any[];
  currentCollection: number;
  onDotClick: (index: number) => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({
  collections,
  currentCollection,
  onDotClick
}) => {
  return (
    <motion.div 
      className="absolute bottom-4 left-6 flex gap-3 z-30"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
    >
      {collections.map((_, index) => (
        <motion.button
          key={index}
          className={`relative transition-all duration-300 cursor-pointer ${
            index === currentCollection
              ? 'w-8 h-2'
              : 'w-2 h-2 hover:scale-125'
          }`}
          onClick={() => onDotClick(index)}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.9 + index * 0.05,
            ease: [0.23, 1, 0.320, 1]
          }}
        >
          {/* Background del pulsante */}
          <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            index === currentCollection
              ? 'bg-gradient-to-r from-orange-400 to-red-400 shadow-lg shadow-orange-500/50'
              : 'bg-white/30 hover:bg-white/50'
          }`} />
          
          {/* Animazione pulse per il pulsante attivo */}
          <AnimatePresence>
            {index === currentCollection && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default NavigationDots;