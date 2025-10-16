import React from 'react';
import HeroDropCard from '../HeroDropImage/HeroDropCard';
import { collections } from '@/constants/heroCollections';

interface HeroDropSectionProps {
  currentCollection: number;
  onCollectionChange: (index: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Hero drop card section with collection rotation
 */
export default function HeroDropSection({
  currentCollection,
  onCollectionChange,
  onMouseEnter,
  onMouseLeave
}: HeroDropSectionProps) {
  return (
    <div
      className="col-span-2 lg:col-span-3 lg:row-span-2 overflow-hidden min-h-[400px] lg:min-h-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <HeroDropCard
        currentCollection={currentCollection}
        collections={collections}
        onCollectionChange={onCollectionChange}
      />
    </div>
  );
}
