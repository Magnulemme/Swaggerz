import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCarouselStore } from "@/store/useCarouselStore";
import { CategoryBadge } from "./CategoryBadge";
import { CategoryLabel } from "./CategoryLabel";
import { CardImage } from "./CardImage";
import { useMediaQuery } from "./useMediaQuery";
import { useCustomHover } from "./useCustomHover";
import {
  getCardDimensions,
  shouldRenderLabel,
  BREAKPOINTS,
  type BadgeType,
} from "./categories.ui-constants";

interface CategoryCarouselCardProps {
  cardIndex: number;
  image: string;
  label: string;
  badge?: BadgeType;
  slotClasses: string;
  zIndex: number;
  rotateY: number;
  translateX: string;
  translateY: string;
  scale: number;
  isHorizontal: boolean;
  isClickable: boolean;
  isActive: boolean;
  onClick: () => void;
  gridPosition?: { left: number; top: number } | null;
  centerY?: number | null;
  isFirstRender?: boolean;
  isDesktop: boolean;
  isXL: boolean;
  onMainCardHoverChange?: (isHovered: boolean) => void;
  onSideCardHoverChange?: (isHovered: boolean) => void;
}

const CategoryCarouselCardComponent = ({
  cardIndex,
  image,
  label,
  badge,
  slotClasses,
  zIndex,
  rotateY,
  translateX,
  translateY,
  scale,
  isHorizontal,
  isClickable,
  isActive,
  onClick,
  gridPosition,
  centerY,
  isFirstRender = false,
  isDesktop,
  isXL,
  onMainCardHoverChange,
  onSideCardHoverChange,
}: CategoryCarouselCardProps): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const motionCardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const previousTransformRef = useRef<{ x: string; y: string; rotateY: number; scale: number } | null>(null);
  const currentTransformRef = useRef<{ x: string; y: string; rotateY: number; scale: number } | null>(null);

  // Determine if this is left card based on rotateY
  const isLeftCard = rotateY < 0;

  // Apply responsive values for side cards
  const responsiveTranslateX = isHorizontal
    ? translateX.replace(
        "60vw",
        isDesktop ? (isXL ? "38vw" : "42vw") : "60vw"
      )
    : translateX;

  const responsiveScale = isHorizontal
    ? isDesktop
      ? 0.6
      : 0.75
    : scale;

  const { cardPositions, currentPhase } = useCarouselStore();

  // Get current position from store
  const currentPosition = cardPositions.get(cardIndex) || null;

  // Only render label for prev/next cards (not active or hidden)
  const shouldShowLabel = shouldRenderLabel(currentPosition);

  // Show animation only when transition is complete
  const isTransitioning = currentPhase === "transitioning";

  // Track viewport changes
  const isLG = useMediaQuery(BREAKPOINTS.lg);

  // Custom hover detection
  const isHovered = useCustomHover({
    cardRef,
    labelRef,
    isClickable,
    isActive,
    shouldRenderLabel: shouldShowLabel,
  });

  // Notify parent about hover state changes
  useEffect(() => {
    // For side cards
    if (isClickable && onSideCardHoverChange) {
      onSideCardHoverChange(isHovered);
    }
    // For main card
    if (isActive && onMainCardHoverChange) {
      onMainCardHoverChange(isHovered);
    }
  }, [isHovered, isClickable, isActive, onSideCardHoverChange, onMainCardHoverChange]);

  // Hide active card until gridPosition is calculated (prevents flash)
  const shouldHideActive = isActive && !gridPosition && isFirstRender;

  // Hide side cards until centerY is calculated (prevents jump on mobile)
  const shouldHideSide = !isActive && !centerY && isFirstRender && !isDesktop;

  const shouldHide = shouldHideActive || shouldHideSide;

  // Get card dimensions based on viewport
  const dimensions = getCardDimensions(isDesktop, isXL);

  // Parse transform values for Framer Motion
  const getTransformValues = () => {
    const x = gridPosition ? translateX : responsiveTranslateX;
    const y = translateY;
    const rotation = rotateY;
    const scaleValue = gridPosition ? scale : responsiveScale;

    return { x, y, rotateY: rotation, scale: scaleValue };
  };

  const transformValues = getTransformValues();

  // Always update currentTransformRef with latest values
  currentTransformRef.current = transformValues;

  // Track phase changes to update previousTransformRef only when animation completes
  const prevPhaseRef = useRef(currentPhase);

  useEffect(() => {
    // Idle -> Transitioning: save current transform BEFORE new values are used
    if (prevPhaseRef.current === "idle" && currentPhase === "transitioning") {
      console.log(`🎬 Card ${cardIndex} animation starting, saving previous position:`, currentTransformRef.current);
      previousTransformRef.current = currentTransformRef.current;
    }
    prevPhaseRef.current = currentPhase;
  }, [currentPhase, cardIndex]);

  // Determine initial values: use previous transform if available, otherwise current
  const initialValues = previousTransformRef.current || transformValues;

  // DEBUG: Log when transform changes
  useEffect(() => {
    if (previousTransformRef.current &&
        (previousTransformRef.current.x !== transformValues.x ||
         previousTransformRef.current.rotateY !== transformValues.rotateY)) {
      console.log(`🔄 Card ${cardIndex} transform will change:`);
      console.log('  FROM (initial):', previousTransformRef.current);
      console.log('  TO (target):', transformValues);
    }
  }, [transformValues.x, transformValues.rotateY, cardIndex]);

  // Expose initial and animate values to DOM for debugging
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.setAttribute('data-initial-x', initialValues.x);
      cardRef.current.setAttribute('data-initial-y', initialValues.y);
      cardRef.current.setAttribute('data-initial-rotatey', String(initialValues.rotateY));
      cardRef.current.setAttribute('data-initial-scale', String(initialValues.scale));

      cardRef.current.setAttribute('data-target-x', transformValues.x);
      cardRef.current.setAttribute('data-target-y', transformValues.y);
      cardRef.current.setAttribute('data-target-rotatey', String(transformValues.rotateY));
      cardRef.current.setAttribute('data-target-scale', String(transformValues.scale));
    }
  }, [initialValues, transformValues]);

  return (
    <motion.div
      ref={cardRef}
      key={`card-${cardIndex}`}
      data-card-index={cardIndex}
      className={`absolute ${slotClasses} ${isClickable ? "cursor-pointer" : ""} ${
        shouldHide ? "opacity-0 invisible" : ""
      }`}
      initial={initialValues}
      animate={{
        x: transformValues.x,
        y: transformValues.y,
        rotateY: transformValues.rotateY,
        scale: transformValues.scale,
      }}
      transition={{
        duration: 1.4,
        ease: [0.65, 0, 0.35, 1],
      }}
      onAnimationStart={() => {
        if (cardRef.current && isActive) {
          const transform = window.getComputedStyle(cardRef.current).transform;
          console.log(`🎬 Card ${cardIndex} ANIMATION START - DOM transform:`, transform);
          console.log(`   Target values:`, transformValues);
        }
      }}
      onUpdate={(latest) => {
        if (isActive && latest.x !== transformValues.x) {
          console.log(`📍 Card ${cardIndex} animating... x=${latest.x}, rotateY=${latest.rotateY}`);
        }
      }}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        isolation: "isolate",
        // Fixed dimensions for all cards
        width: dimensions.width,
        maxWidth: dimensions.maxWidth,
        height: dimensions.height,
        maxHeight: dimensions.maxHeight,
        // Position for active card
        ...(gridPosition && {
          left: `${gridPosition.left}px`,
          top: `${gridPosition.top}px`,
        }),
        willChange: "transform, opacity",
      }}
      onClick={onClick}
    >
      {/* Badge overlay */}
      {badge && <CategoryBadge badge={badge} />}

      {/* Card image wrapper */}
      <CardImage
        image={image}
        isActive={isActive}
        isFirstRender={isFirstRender}
        cardRef={cardRef}
      />

      {/* Label below card */}
      <AnimatePresence>
        {shouldShowLabel && (
          <div ref={labelRef}>
            <CategoryLabel
              label={label}
              cardIndex={cardIndex}
              currentPosition={currentPosition}
              isTransitioning={isTransitioning}
              isHovered={isHovered}
              isXL={isXL}
              isLG={isLG}
              isLeftCard={isLeftCard}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Memoize component to prevent unnecessary re-renders
// Only re-render when props actually change
// TEMP: Disabled memo for debugging
export const CategoryCarouselCard = CategoryCarouselCardComponent; // memo(CategoryCarouselCardComponent);
