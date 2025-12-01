import { motion } from "framer-motion";

type CardPosition = "prev" | "active" | "next" | "hidden";

interface SlotCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CategoryCarouselCardV2Props {
  cardIndex: number;
  position: CardPosition;
  previousPosition?: CardPosition;
  label: string;
  image?: string;
  slotCoordinates?: Record<CardPosition, SlotCoordinates | null>;
}

/**
 * CategoryCarouselCardV2 - Card animata con coordinate esatte
 */
export const CategoryCarouselCardV2 = ({
  cardIndex,
  position,
  previousPosition,
  label,
  image,
  slotCoordinates,
}: CategoryCarouselCardV2Props) => {
  // Determina il tipo di transizione
  const isEntering = previousPosition === "hidden" && position !== "hidden";
  const isExiting = previousPosition !== "hidden" && position === "hidden";

  // Se abbiamo coordinate, usiamo quelle, altrimenti fallback
  const getAnimationProps = () => {
    if (slotCoordinates && slotCoordinates[position]) {
      const coords = slotCoordinates[position]!;
      return {
        x: coords.x,
        y: coords.y,
        width: coords.width,
        height: coords.height,
        opacity: 1,
        scale: 1,
        rotateY: position === "prev" ? 50 : position === "next" ? -50 : 0,
      };
    }

    // Fallback se non abbiamo coordinate
    return {
      x: 0,
      y: 0,
      width: 300,
      height: 400,
      opacity: position === "hidden" ? 0 : 1,
      scale: position === "hidden" ? 0.8 : 1,
      rotateY: 0,
    };
  };

  // Initial values: from position
  const getInitialValues = () => {
    if (isEntering) {
      // Card che entra: FROM = TO (stessa posizione finale, solo opacity a 0)
      const currentProps = getAnimationProps();
      return {
        ...currentProps,
        opacity: 0, // Solo fade in, nessun movimento
      };
    }

    if (isExiting && previousPosition && slotCoordinates?.[previousPosition]) {
      // Card che esce: FROM = TO (stessa posizione precedente)
      const prevCoords = slotCoordinates[previousPosition];
      return {
        x: prevCoords.x,
        y: prevCoords.y,
        width: prevCoords.width,
        height: prevCoords.height,
        opacity: 1,
        scale: 1,
        rotateY: previousPosition === "prev" ? 50 : previousPosition === "next" ? -50 : 0,
      };
    }

    // Card che si muove: FROM = previous position
    if (previousPosition && slotCoordinates?.[previousPosition]) {
      const prevCoords = slotCoordinates[previousPosition];
      return {
        x: prevCoords.x,
        y: prevCoords.y,
        width: prevCoords.width,
        height: prevCoords.height,
        opacity: 1,
        scale: 1,
        rotateY: previousPosition === "prev" ? 50 : previousPosition === "next" ? -50 : 0,
      };
    }

    // Default: current position
    return getAnimationProps();
  };

  // Animate values
  const getAnimateValues = () => {
    const baseProps = getAnimationProps();

    if (isExiting && previousPosition && slotCoordinates?.[previousPosition]) {
      // Card che esce: zoom out dalla posizione precedente (senza muoversi lateralmente)
      const prevCoords = slotCoordinates[previousPosition];
      return {
        x: prevCoords.x, // Rimane nella stessa posizione x
        y: prevCoords.y, // Rimane nella stessa posizione y
        width: prevCoords.width,
        height: prevCoords.height,
        opacity: 0,
        scale: 0.7, // Zoom out
        rotateY: previousPosition === "prev" ? 50 : previousPosition === "next" ? -50 : 0,
      };
    }

    return baseProps;
  };

  const initialValues = getInitialValues();
  const animateValues = getAnimateValues();
  const zIndex = position === "active" ? 10 : position === "hidden" ? 0 : 5;

  // Non renderizzare card hidden che non stanno uscendo
  if (position === "hidden" && !isExiting) {
    return null;
  }

  return (
    <motion.div
      data-card-index={cardIndex}
      data-position={position}
      data-previous-position={previousPosition}
      layoutId={`carousel-card-${cardIndex}`}
      className="absolute top-0 left-0 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600"
      initial={initialValues}
      animate={animateValues}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1.0],
        layout: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }, // Morphing fluido
      }}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
      }}
    >
      {image ? (
        <img src={image} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <div className="text-7xl font-bold mb-4">{cardIndex}</div>
          <div className="text-xl font-medium">{label}</div>
        </div>
      )}

      {/* Badge debug */}
      <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-white text-xs font-mono">
        {position}
      </div>
    </motion.div>
  );
};
