import { useRef, useEffect, memo } from "react";
import { AnimatePresence } from "framer-motion";
import { useCarouselStore } from "@/store/useCarouselStore";
import { CategoryBadge } from "./CategoryBadge";
import { CategoryLabel } from "./CategoryLabel";
import { CardImage } from "./CardImage";
import { useMediaQuery } from "./useMediaQuery";
import { useCustomHover } from "./useCustomHover";
import {
  getCardDimensions,
  shouldRenderLabel,
  TRANSITION_CLASSES,
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
  const labelRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className={`absolute ${
        !isFirstRender ? TRANSITION_CLASSES.card : ""
      } ${slotClasses} ${isClickable ? "cursor-pointer" : ""} ${
        shouldHide ? "opacity-0 invisible" : ""
      }`}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        isolation: "isolate",
        ...(!isFirstRender && {
          transitionTimingFunction: TRANSITION_CLASSES.cardEasing,
        }),
        // Fixed dimensions for all cards
        width: dimensions.width,
        maxWidth: dimensions.maxWidth,
        height: dimensions.height,
        maxHeight: dimensions.maxHeight,
        // Active card: positioned by grid
        ...(gridPosition && {
          left: `${gridPosition.left}px`,
          top: `${gridPosition.top}px`,
          transform: `translate(${translateX}, ${translateY}) rotateY(${rotateY}deg) scale(${scale})`,
        }),
        // Side cards: compose all transforms inline to prevent overwrite
        ...(!gridPosition && {
          transform: `translate(${responsiveTranslateX}, ${translateY}) rotateY(${rotateY}deg) scale(${responsiveScale})`,
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
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
// Only re-render when props actually change
export const CategoryCarouselCard = memo(CategoryCarouselCardComponent);
