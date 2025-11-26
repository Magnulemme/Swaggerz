import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCarouselStore } from "@/store/useCarouselStore";

interface CategoryCarouselCardProps {
  cardIndex: number;
  image: string;
  label: string;
  badge?: "hot" | "sale" | "new" | "exclusive";
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
  badge,
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

  // Determine if this is left card based on rotateY
  const isLeftCard = rotateY < 0;

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
        !isFirstRender ? "transition-all duration-[1200ms]" : ""
      } ${slotClasses} ${isClickable ? "cursor-pointer" : ""} ${
        shouldHide ? "opacity-0 invisible" : ""
      }`}
      style={{
        zIndex,
        transform: `rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        isolation: "isolate",
        ...(!isFirstRender && {
          transitionTimingFunction: "cubic-bezier(0.3, 0, 0.8, 1)",
        }),
        // Fixed dimensions for all cards - no width/height transitions
        width: "70vw",
        maxWidth: isDesktop && !isXL ? "300px" : "350px",
        height: isDesktop ? "70vh" : "50vh",
        maxHeight: "450px",
        // Use grid position if available (for active card)
        ...(gridPosition ? {
          // Position using absolute coordinates from fake card calculation
          left: `${gridPosition.left}px`,
          top: `${gridPosition.top}px`,
          transform: `translate(-50%, -50%) rotateY(${rotateY}deg)`,
        } : {
          // For side cards: use centerY to align with center card
          left: "50%",
          ...(centerY && {
            top: `${centerY}px`,
          }),
        }),
      }}
      onClick={onClick}
    >
      {/* Badge overlay - positioned in top-left corner with shimmer */}
      {/* Only render if badge exists */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          className="absolute top-4 left-4 pointer-events-none z-20"
        >
          <div
            className={`
              relative inline-flex h-8 md:h-9 overflow-hidden rounded-full p-[1px] flex-shrink-0
              ${badge === 'hot' ? 'bg-gradient-to-r from-red-900 via-red-600 to-red-900' : ''}
              ${badge === 'new' ? 'bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-900' : ''}
              ${badge === 'exclusive' ? 'bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900' : ''}
              ${badge === 'sale' ? 'bg-gradient-to-r from-amber-900 via-amber-600 to-amber-900' : ''}
            `}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 z-0 rounded-full"
              animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  badge === 'hot' ? "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(248, 113, 113, 0.6) 50%, transparent 70%, transparent 100%)" :
                  badge === 'new' ? "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(52, 211, 153, 0.6) 50%, transparent 70%, transparent 100%)" :
                  badge === 'exclusive' ? "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(192, 132, 252, 0.6) 50%, transparent 70%, transparent 100%)" :
                  "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(251, 191, 36, 0.6) 50%, transparent 70%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />

            <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full px-3 md:px-4 py-1 bg-zinc-950 backdrop-blur-sm">
              <span
                className={`
                  text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest font-jost
                  ${badge === 'hot' ? 'text-red-400' : ''}
                  ${badge === 'new' ? 'text-emerald-400' : ''}
                  ${badge === 'exclusive' ? 'text-purple-400' : ''}
                  ${badge === 'sale' ? 'text-amber-400' : ''}
                `}
              >
                {badge}
              </span>
            </span>
          </div>
        </motion.div>
      )}

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
            backgroundImage: `url(${image})`,
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
            <div className="flex items-center gap-3">
              {/* Category Number */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isTransitioning
                    ? { opacity: 0, y: 20 }
                    : { opacity: 1, y: 0 }
                }
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: isTransitioning ? 0 : 0.8,
                  delay: isTransitioning ? 0 : 0,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className={`text-lg xl:text-xl font-jost font-semibold transition-colors duration-300 ${
                  isHovered ? "text-brand" : "text-brand/80"
                }`}
              >
                [{String(cardIndex + 1).padStart(2, '0')}]
              </motion.span>

              {/* Label */}
              <h3 className="font-light text-2xl xl:text-3xl tracking-[0.2em] uppercase drop-shadow-lg">
                {label.split("").map((char, i) => (
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
                    className={`inline-block transition-colors duration-300 ${
                      isHovered ? "text-brand" : "text-white/90"
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h3>

              {/* Diagonal Arrow SVG */}
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isTransitioning
                    ? { opacity: 0, y: 20 }
                    : { opacity: 1, y: 0 }
                }
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: isTransitioning ? 0 : 0.6,
                  delay: isTransitioning ? 0 : 0.08,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className={`transition-all duration-300 ${
                  isHovered
                    ? "text-brand translate-x-0.5 -translate-y-0.5"
                    : "text-white/70"
                }`}
              >
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
