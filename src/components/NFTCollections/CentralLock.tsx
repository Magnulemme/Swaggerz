"use client";

import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

export default function CentralLock() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative"
      >
        {/* Glow effect multipli */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, rgba(239, 68, 68, 0.3) 50%, transparent 100%)',
              'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(234, 179, 8, 0.3) 50%, transparent 100%)',
              'radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, rgba(249, 115, 22, 0.3) 50%, transparent 100%)',
            ],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondo layer glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(239, 68, 68, 0.4) 40%, transparent 70%)'
          }}
        />

        {/* Container lucchetto */}
        <motion.div
          className="relative w-32 h-32 rounded-full border-2 flex items-center justify-center shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(39, 39, 42, 1) 0%, rgba(24, 24, 27, 1) 100%)',
            borderColor: 'rgba(249, 115, 22, 0.3)',
            boxShadow: `
              0 0 30px rgba(249, 115, 22, 0.3),
              0 0 60px rgba(239, 68, 68, 0.2),
              inset 0 2px 10px rgba(255, 255, 255, 0.1),
              inset 0 -2px 10px rgba(0, 0, 0, 0.5)
            `
          }}
          animate={{
            boxShadow: [
              '0 0 30px rgba(249, 115, 22, 0.3), 0 0 60px rgba(239, 68, 68, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.1), inset 0 -2px 10px rgba(0, 0, 0, 0.5)',
              '0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(249, 115, 22, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.1), inset 0 -2px 10px rgba(0, 0, 0, 0.5)',
              '0 0 30px rgba(249, 115, 22, 0.3), 0 0 60px rgba(239, 68, 68, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.1), inset 0 -2px 10px rgba(0, 0, 0, 0.5)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Animazione lock/unlock con rotazione 3D */}
          <motion.div
            className="relative w-14 h-14"
            animate={{ rotateY: [0, 180, 180, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.4, 0.6, 1],
              ease: "easeInOut"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Lock - fronte */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Lock className="w-14 h-14 text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
            </div>

            {/* Unlock - retro */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden'
              }}
            >
              <Unlock className="w-14 h-14 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
