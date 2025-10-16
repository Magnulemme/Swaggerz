import { useState, useEffect } from 'react';

interface UseCollectionRotationProps {
  totalCollections: number;
  rotationInterval?: number;
  pauseAfterHoverDuration?: number;
}

/**
 * Hook to manage automatic collection rotation with hover pause functionality
 */
export function useCollectionRotation({
  totalCollections,
  rotationInterval = 4000,
  pauseAfterHoverDuration = 2500
}: UseCollectionRotationProps) {
  const [currentCollection, setCurrentCollection] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [justExitedHover, setJustExitedHover] = useState(false);

  // Auto-rotate collections (pause on hover)
  useEffect(() => {
    if (hoveredCard === 'drops') {
      setJustExitedHover(false);
      return; // Stop rotation when hovering drop card
    }

    // If just exited hover, wait before changing image
    if (justExitedHover) {
      const quickTimeout = setTimeout(() => {
        setCurrentCollection((prev) => (prev + 1) % totalCollections);
        setJustExitedHover(false);
      }, pauseAfterHoverDuration);

      return () => clearTimeout(quickTimeout);
    }

    // Normal rotation
    const interval = setInterval(() => {
      setCurrentCollection((prev) => (prev + 1) % totalCollections);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [hoveredCard, justExitedHover, totalCollections, rotationInterval, pauseAfterHoverDuration]);

  return {
    currentCollection,
    setCurrentCollection,
    hoveredCard,
    setHoveredCard,
    setJustExitedHover
  };
}
