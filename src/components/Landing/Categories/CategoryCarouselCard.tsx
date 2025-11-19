import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCarouselStore } from "@/store/useCarouselStore";

interface CategoryCarouselCardProps {
  cardIndex: number;
  image: string;
  label: string;
  slotClasses: string;
  zIndex: number;
  rotateY: number;
  isHorizontal: boolean;
  isClickable: boolean;
  isActive: boolean;
  onClick: () => void;
  gridPosition?: { left: number; top: number } | null;
  centerY?: number | null; // Y coordinate for side cards to align with center card
  isFirstRender?: boolean;
  isDesktop: boolean;
  isXL: boolean;
  onMainCardHoverChange?: (isHovered: boolean) => void;
  onSideCardHoverChange?: (isHovered: boolean) => void;
}

export function CategoryCarouselCard({
  cardIndex,
  image,
  label,
  slotClasses,
  zIndex,
  rotateY,
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
}: CategoryCarouselCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLG, setIsLG] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Determine if this is left or right card based on rotateY
  const isLeftCard = rotateY < 0;
  const isRightCard = rotateY > 0;

  const { cardPositions, currentPhase } = useCarouselStore();

  // Get current position from store
  const currentPosition = cardPositions.get(cardIndex) || null;

  // Only render label for prev/next cards (not active or hidden)
  const shouldRenderLabel = currentPosition === 'prev' || currentPosition === 'next';

  // Show animation only when transition is complete
  const isTransitioning = currentPhase === 'transitioning';

  // Track viewport changes
  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLG(lgMediaQuery.matches); // Set initial value on mount

    const handleLgChange = (e: MediaQueryListEvent) => {
      setIsLG(e.matches);
    };

    lgMediaQuery.addEventListener("change", handleLgChange);

    return () => {
      lgMediaQuery.removeEventListener("change", handleLgChange);
    };
  }, []);

  // Custom hover detection using mouse coordinates
  // For side cards: check card AND label
  // For main card: check only card (to avoid conflicts with overlaid elements)
  useEffect(() => {
    if (!isClickable && !isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if mouse is within card bounding box
      let isInsideCard = false;
      if (cardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        isInsideCard =
          mouseX >= cardRect.left &&
          mouseX <= cardRect.right &&
          mouseY >= cardRect.top &&
          mouseY <= cardRect.bottom;
      }

      // Check if mouse is within label bounding box (only for side cards)
      let isInsideLabel = false;
      if (labelRef.current && shouldRenderLabel && isClickable) {
        const labelRect = labelRef.current.getBoundingClientRect();
        isInsideLabel =
          mouseX >= labelRect.left &&
          mouseX <= labelRect.right &&
          mouseY >= labelRect.top &&
          mouseY <= labelRect.bottom;
      }

      // Set hovered if inside either card OR label
      setIsHovered(isInsideCard || isInsideLabel);
    };

    // Add listener to document to track mouse globally
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isClickable, isActive, shouldRenderLabel]);

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

  return (
    <div
      className={`absolute ${
        !isFirstRender ? "transition-all duration-[1400ms]" : ""
      } ${slotClasses} ${isClickable ? "cursor-pointer" : ""} ${
        shouldHide ? "opacity-0 invisible" : ""
      }`}
      style={{
        zIndex,
        transform: `rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        ...(!isFirstRender && {
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }),
        // Swap width/height based on orientation + 3D rotation
        // On mobile, limit horizontal cards to vertical card max width
        width: isHorizontal ? "min(70vh, 70vw)" : "70vw",
        // Active card: lg=300px, xl=350px; Side cards: always 350px
        maxWidth: isHorizontal
          ? "350px"
          : isActive && isDesktop && !isXL
          ? "300px"
          : "350px",
        // Height: 50vh on mobile (< lg), 70vh on desktop (>= lg)
        height: isHorizontal ? "70vw" : isDesktop ? "70vh" : "50vh",
        maxHeight: isHorizontal ? "350px" : "450px",
        // Use grid position if available (for active card)
        ...(gridPosition && {
          left: `${gridPosition.left}px`,
          top: `${gridPosition.top}px`,
          transform: `translate(-50%, -50%) rotateY(${rotateY}deg)`,
        }),
        // For side cards: use centerY to align with center card
        ...(centerY && !gridPosition && {
          top: `${centerY}px`,
        }),
      }}
      onClick={onClick}
    >
      {/* BOX 1: Card image wrapper with ref for hover detection */}
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Image layer with 3D effect */}
        <div
          className={`absolute inset-0 ${
            !isFirstRender ? "transition-all duration-[1400ms]" : ""
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: isActive ? "blur(0)" : "blur(0)",
            ...(!isFirstRender && {
              transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
            }),
          }}
        />
      </div>

      {/* BOX 2: Label below card with ref for hover detection */}
      <AnimatePresence>
        {shouldRenderLabel && (
          <motion.div
            key={`${cardIndex}-${currentPosition}`}
            ref={labelRef}
            className="hidden md:flex absolute -bottom-16 left-0 right-0 items-center"
            style={{
              pointerEvents: !isActive ? "auto" : "none",
              justifyContent: isXL
                ? "space-between"
                : isLG
                ? "flex-start"
                : isLeftCard
                ? "flex-start"
                : "flex-end",
              gap: isXL ? "0" : "0.75rem",
            }}
          >
            <h3
              className="font-light text-2xl xl:text-3xl tracking-[0.2em] uppercase drop-shadow-lg"
            >
              {[...label.split(""), "→"].map((char, i) => {
                const isArrow = char === "→";
                return (
                  <motion.span
                    key={`${cardIndex}-${currentPosition}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isTransitioning
                        ? { opacity: 0, y: 20 }
                        : { opacity: 1, y: 0 }
                    }
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: isTransitioning ? 0 : 0.8,
                      delay: isTransitioning ? 0 : i * 0.02,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    className={
                      isArrow
                        ? `inline-block text-3xl xl:text-4xl ml-3 transition-colors duration-300 ${
                            isHovered
                              ? "text-brand"
                              : "text-white/70"
                          }`
                        : `inline-block transition-colors duration-300 ${
                            isHovered ? "text-brand" : "text-white/90"
                          }`
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
