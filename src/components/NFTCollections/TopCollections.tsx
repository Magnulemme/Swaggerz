"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'trending' | 'volume' | 'gainers';

interface TopCollectionsProps {
  className?: string;
}

const TopCollections: React.FC<TopCollectionsProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('trending');

  const filters: { id: FilterType; label: string; icon: string }[] = [
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'volume', label: 'Volume', icon: '💎' },
    { id: 'gainers', label: 'Gainers', icon: '📈' }
  ];

  // Mock data - da sostituire con dati reali
  const mockCollections = {
    trending: [
      { name: 'Cyber Punks', volume: '1,234 ETH', change: '+12.5%', positive: true },
      { name: 'Neo Genesis', volume: '987 ETH', change: '+8.3%', positive: true },
      { name: 'Pixel Dreams', volume: '756 ETH', change: '-2.1%', positive: false },
    ],
    volume: [
      { name: 'Crypto Apes', volume: '2,456 ETH', change: '+5.2%', positive: true },
      { name: 'Digital Souls', volume: '1,892 ETH', change: '+3.7%', positive: true },
      { name: 'Meta Worlds', volume: '1,567 ETH', change: '-1.8%', positive: false },
    ],
    gainers: [
      { name: 'Quantum Art', volume: '892 ETH', change: '+24.8%', positive: true },
      { name: 'Future Relics', volume: '645 ETH', change: '+18.6%', positive: true },
      { name: 'Neon Knights', volume: '534 ETH', change: '+15.2%', positive: true },
    ]
  };

  const currentCollections = mockCollections[activeFilter];

  return (
    <div className={`h-full bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-zinc-700/50 overflow-hidden ${className || ''}`}>
      {/* Header con filtri */}
      <div className="p-4 border-b border-zinc-700/50">
        <h3 className="text-white font-bold text-base mb-3">Top Collections</h3>

        {/* Filtri */}
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/50'
                  : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/30 hover:bg-zinc-800 hover:text-zinc-300'
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista collezioni */}
      <div className="p-4 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {currentCollections.map((collection, index) => (
              <motion.div
                key={`${activeFilter}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-700/30 hover:border-purple-500/30 rounded-xl p-3 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  {/* Rank e Nome */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                      <span className="text-purple-300 text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-semibold truncate group-hover:text-purple-300 transition-colors">
                        {collection.name}
                      </h4>
                      <p className="text-zinc-400 text-xs">{collection.volume}</p>
                    </div>
                  </div>

                  {/* Change percentage */}
                  <div className={`flex-shrink-0 px-2 py-1 rounded-md text-xs font-bold ${
                    collection.positive
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {collection.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Coming Soon Overlay (opzionale) */}
        {/* <div className="absolute inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white font-bold text-lg mb-2">Coming Soon</p>
            <p className="text-zinc-400 text-sm">Live blockchain data</p>
          </div>
        </div> */}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <button className="w-full py-2 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 hover:border-purple-400/50 rounded-lg text-purple-300 text-xs font-semibold transition-all duration-300">
          View All Collections →
        </button>
      </div>
    </div>
  );
};

export default TopCollections;
