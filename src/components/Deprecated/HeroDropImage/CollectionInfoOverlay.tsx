import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CollectionInfoMobile from './CollectionInfoMobile';
import CollectionInfoDesktop from './CollectionInfoDesktop';

interface CollectionInfoOverlayProps {
  collection: any;
  currentCollection: number;
}

const CollectionInfoOverlay: React.FC<CollectionInfoOverlayProps> = ({
  collection,
  currentCollection
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={`overlay-${currentCollection}`}
        className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >

        {/* Bottom section */}
        <div className="pointer-events-auto pb-4">
          <CollectionInfoMobile
            collection={collection}
            isHovered={isHovered}
            onHoverChange={setIsHovered}
          />

          <CollectionInfoDesktop
            collection={collection}
            isHovered={isHovered}
            onHoverChange={setIsHovered}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CollectionInfoOverlay;