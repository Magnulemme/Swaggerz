"use client"

import React from 'react';
import { motion } from 'framer-motion';

const DropHeader: React.FC = () => {
  return (
    <div className="relative mb-8 w-full flex justify-center lg:justify-end">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.320, 1] }}
      >
        {/* Container principale più marcato */}
        <div className="relative bg-black border-2 border-green-500 px-8 py-4 rounded-xl shadow-lg shadow-green-500/30">
          {/* Angoli tech decorativi più visibili */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-[3px] border-t-[3px] border-green-400 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-r-[3px] border-t-[3px] border-green-400 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-[3px] border-b-[3px] border-green-400 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-[3px] border-b-[3px] border-green-400 rounded-br-lg"></div>
          
          {/* Contenuto */}
          <div className="relative flex items-center gap-4">
            {/* Indicatore status più grande con pulse */}
            <div className="relative">
              <motion.div 
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ 
                  boxShadow: [
                    '0 0 8px rgba(34, 197, 94, 0.6)',
                    '0 0 16px rgba(34, 197, 94, 1)',
                    '0 0 8px rgba(34, 197, 94, 0.6)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* Separatore tech più spesso */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-transparent via-green-400 to-transparent rounded-full"></div>
            
            {/* Testo principale più grande e marcato */}
            <motion.span 
              className="text-green-400 text-sm md:text-base font-mono font-bold tracking-[0.25em] uppercase"
              animate={{ 
                textShadow: [
                  '0 0 6px rgba(34, 197, 94, 0.5)',
                  '0 0 12px rgba(34, 197, 94, 0.8)',
                  '0 0 6px rgba(34, 197, 94, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              LATEST DROPS
            </motion.span>
            
            {/* Separatore tech più spesso */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-transparent via-green-400 to-transparent rounded-full"></div>
            
            {/* Indicatore live più marcato */}
            <motion.span 
              className="text-green-300 text-xs md:text-sm font-mono font-bold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              [LIVE]
            </motion.span>
          </div>
          
          {/* Glow effect più intenso */}
          <motion.div 
            className="absolute inset-0 bg-green-400/10 rounded-xl pointer-events-none"
            animate={{ 
              boxShadow: [
                'inset 0 0 20px rgba(34, 197, 94, 0.2)',
                'inset 0 0 30px rgba(34, 197, 94, 0.3)',
                'inset 0 0 20px rgba(34, 197, 94, 0.2)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Linea decorativa superiore */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          
          {/* Linea decorativa inferiore */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
        </div>
        
        {/* Glow esterno più marcato */}
        <motion.div 
          className="absolute inset-0 bg-green-500/20 blur-xl rounded-xl -z-10"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default DropHeader;