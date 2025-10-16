import React from 'react';
import { motion } from 'framer-motion';
import ExploreButton from './ExploreButton';
import DropStats from './DropStats';
import DropGallery from './DropGallery';

interface Collection {
  name: string;
  description: string;
  price: string;
  stats: {
    items: number;
    floorPrice: string;
    volume24h: string;
    owners: number;
  };
  gallery?: string[];
}

interface CollectionInfoDesktopProps {
  collection: Collection;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const CollectionInfoDesktop: React.FC<CollectionInfoDesktopProps> = ({
  collection,
  isHovered,
  onHoverChange
}) => {
  return (
    <motion.div
      className="hidden lg:flex flex-row items-end justify-between gap-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.320, 1] }}
    >
      {/* Colonna sinistra: Titolo e Gallery */}
      <div className="flex flex-col gap-3 flex-1">
        <motion.div
          className="inline-block px-4 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 self-start"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.320, 1] }}
        >
          <div className="flex flex-col gap-1.5">
            <h2 className="text-3xl font-black text-white leading-none tracking-tight">
              {collection.name}
            </h2>
            <span className="text-zinc-400 text-xs font-medium">
              by <span className="text-white font-bold">Swaggerz Studio</span>
            </span>
          </div>
        </motion.div>

        {/* Gallery orizzontale compatta */}
        {collection.gallery && collection.gallery.length > 0 && (
          <DropGallery gallery={collection.gallery} collectionName={collection.name} />
        )}
      </div>

      {/* Colonna centrale: Stats */}
      <div className="flex items-end">
        <DropStats stats={collection.stats} variant="desktop" />
      </div>

      {/* Colonna destra: Descrizione e CTA */}
      <div className="flex flex-col items-end gap-3 max-w-xs">
        {/* Descrizione */}
        <motion.div
          className="inline-block px-4 py-2.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.320, 1] }}
        >
          <span className="block text-white text-sm font-semibold leading-relaxed text-right">
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
    </motion.div>
  );
};

export default CollectionInfoDesktop;
