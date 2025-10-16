import React from 'react';
import { motion } from 'framer-motion';
import ExploreButton from './ExploreButton';
import DropStats from './DropStats';
import DropGallery from './DropGallery';

interface Collection {
  name: string;
  description: string;
  category: string;
  price: string;
  stats: {
    items: number;
    floorPrice: string;
    volume24h: string;
    owners: number;
  };
  gallery?: string[];
}

interface CollectionInfoMobileProps {
  collection: Collection;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const CollectionInfoMobile: React.FC<CollectionInfoMobileProps> = ({
  collection,
  isHovered,
  onHoverChange
}) => {
  return (
    <motion.div
      className="lg:hidden flex flex-col gap-3"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.320, 1] }}
    >
      {/* Gallery - solo su tablet/mobile landscape */}
      {collection.gallery && collection.gallery.length > 0 && (
        <div className="hidden md:block">
          <DropGallery gallery={collection.gallery} collectionName={collection.name} />
        </div>
      )}

      {/* Statistiche */}
      <div className="flex justify-center">
        <DropStats stats={collection.stats} variant="mobile" />
      </div>

      {/* Info collezione */}
      <div className="flex items-end justify-between gap-4">
        {/* Colonna sinistra: Titolo e Autore */}
        <motion.div
          className="inline-block px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.320, 1] }}
        >
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
              {collection.name}
            </h2>
            <span className="text-zinc-400 text-[10px] md:text-xs font-medium">
              by <span className="text-white font-bold">Swaggerz Studio</span>
            </span>
          </div>
        </motion.div>

        {/* Colonna destra: Descrizione (solo tablet) e CTA */}
        <div className="flex flex-col items-end gap-2">
          {/* Descrizione - solo su tablet (md) */}
          <motion.div
            className="hidden md:inline-block px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 max-w-xs"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.320, 1] }}
          >
            <span className="block text-white text-xs font-semibold leading-relaxed text-right">
              {collection.description}
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.23, 1, 0.320, 1] }}
          >
            <ExploreButton
              collectionName={collection.name}
              isHovered={isHovered}
              onHoverChange={onHoverChange}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionInfoMobile;
