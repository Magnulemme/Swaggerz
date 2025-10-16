"use client"

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRandomDirections } from "@/hooks/useRandomDirections"
import NavigationDots from './NavigationDots';
import CollectionInfoOverlay from './CollectionInfoOverlay';
import LatestDropsBadge from './LatestDropsBadge';


interface Collection {
  id: number;
  name: string;
  image: string;
  badge: string;
  description: string;
  price: string;
  category: string;
}

interface HeroDropCardProps {
  currentCollection: number;
  collections: Collection[];
  onCollectionChange: (index: number) => void;
}

const HeroDropCard: React.FC<HeroDropCardProps> = ({
  currentCollection,
  collections,
  onCollectionChange
}) => {
  const { getTransitionConfigs } = useRandomDirections();
  const previousIndexRef = useRef<number | null>(null);
  const [forcedDirection, setForcedDirection] = useState<'left' | 'right' | 'top' | 'bottom' | undefined>(undefined);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Ottieni le configurazioni per la transizione corrente
  const configs = getTransitionConfigs(currentCollection, previousIndexRef.current, forcedDirection);

  // Reset forced direction dopo l'uso
  useEffect(() => {
    if (forcedDirection) {
      setForcedDirection(undefined);
    }
  }, [currentCollection, forcedDirection]);

  // Aggiorna l'indice precedente dopo il cambio
  useEffect(() => {
    if (!isFirstRender) {
      previousIndexRef.current = currentCollection;
    } else {
      setIsFirstRender(false);
    }
  }, [currentCollection, isFirstRender]);

  // Gestione click sui pulsanti con direzione basata sulla posizione
  const handleDotClick = (index: number) => {
    if (index === currentCollection) return;
    
    // Determina la direzione basata sulla posizione relativa
    if (index < currentCollection) {
      // Navigazione verso sinistra
      setForcedDirection('right'); // Carta esce a destra
    } else {
      // Navigazione verso destra
      setForcedDirection('left'); // Carta esce a sinistra
    }
    
    onCollectionChange(index);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        className="relative w-full h-full group"
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Badge unificato DROP SALE */}
        <LatestDropsBadge />
        {/* Contenitore immagine */}
        <motion.div
          className="relative w-full h-full rounded-3xl shadow-2xl shadow-black/50 z-20 overflow-hidden border border-zinc-800/50 transition-colors duration-500 bg-zinc-950"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Collection Images Carousel con direzioni randomiche corrette */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="sync">
              {collections.map((collection, index) => {
                if (index !== currentCollection) return null;
                
                return (
                  <motion.div
                    key={`image-${collection.id}`}
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                    initial={isFirstRender && index === 0 ? false : { 
                      x: configs.enter.initial.x,
                      y: configs.enter.initial.y,
                      scale: 1.05,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      x: configs.enter.animate.x,
                      y: configs.enter.animate.y,
                      scale: 1,
                      filter: "blur(0px)"
                    }}
                    exit={{ 
                      x: configs.exit.exit.x,
                      y: configs.exit.exit.y,
                      scale: 0.98,
                      filter: "blur(6px)"
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      scale: { duration: 0.5 }
                    }}
                  >
                    {/* Layer immagine con effetto parallasse */}
                    <motion.div
                      className="relative w-full h-full"
                      initial={isFirstRender && index === 0 ? false : { 
                        x: configs.enter.parallax.initial.x,
                        y: configs.enter.parallax.initial.y
                      }}
                      animate={{ 
                        x: configs.enter.parallax.animate.x,
                        y: configs.enter.parallax.animate.y
                      }}
                      exit={{ 
                        x: configs.exit.parallax.exit.x,
                        y: configs.exit.parallax.exit.y
                      }}
                      transition={{ 
                        duration: 0.9, 
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.4 }
                      }}
                    >
                      <Image
                        src={collection.image}
                        alt={`${collection.name} - Swaggerz Collection`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 600px"
                        priority={index === currentCollection}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Enhanced gradient overlay con animazione */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Collection Info Overlay Component */}
          <CollectionInfoOverlay
            collection={collections[currentCollection]}
            currentCollection={currentCollection}
          />

          {/* Navigation Dots Component */}
          <NavigationDots
            collections={collections}
            currentCollection={currentCollection}
            onDotClick={handleDotClick}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroDropCard;