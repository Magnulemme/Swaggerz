import { useState, useEffect, useRef } from "react";
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
  isFirstRender?: boolean;
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
  isFirstRender = false,
  onMainCardHoverChange,
  onSideCardHoverChange,
}: CategoryCarouselCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
  );
  const [isLG, setIsLG] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
  );
  const [isXL, setIsXL] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1280px)").matches
  );
  const [showLabel, setShowLabel] = useState(false);
  const [isLabelExiting, setIsLabelExiting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Refs for guards - prevent re-execution within same phase
  const lastPhaseRef = useRef<string>('idle');
  const hasProcessedExitRef = useRef(false);

  // Determine if this is left or right card based on rotateY
  const isLeftCard = rotateY < 0;
  const isRightCard = rotateY > 0;

  const { currentPhase, cardPositions, previousCardPositions } = useCarouselStore();

  // Get current and previous positions from store
  const currentPosition = cardPositions.get(cardIndex) || null;
  const previousPosition = previousCardPositions.get(cardIndex) || null;

  // useEffect #1: Handle exitPhase - trigger exit animation for cards that were prev/next
  useEffect(() => {
    if (currentPhase !== 'exitPhase') return;

    // Guard: prevent multiple executions in same phase
    if (lastPhaseRef.current === 'exitPhase' && hasProcessedExitRef.current) {
      return;
    }

    // Mark that we've entered exit phase
    lastPhaseRef.current = 'exitPhase';

    // Only cards that WERE prev/next should have exit animation
    if (previousPosition === 'prev' || previousPosition === 'next') {
      console.log(`🚪 EXIT - Card ${cardIndex} (${label})`);
      setIsLabelExiting(true);
      hasProcessedExitRef.current = true;

      const timer = setTimeout(() => {
        setShowLabel(false);
        setIsLabelExiting(false);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      // Other cards: hide without animation
      setShowLabel(false);
      setIsLabelExiting(false);
    }
  }, [currentPhase, previousPosition, cardIndex, label]);

  // useEffect #2: Handle centerContentPhase - reset all states
  useEffect(() => {
    if (currentPhase !== 'centerContentPhase') return;

    lastPhaseRef.current = 'centerContentPhase';
    hasProcessedExitRef.current = false; // Reset exit guard for next transition

    setShowLabel(false);
    setIsLabelExiting(false);
  }, [currentPhase]);

  // useEffect #3: Handle sideLabelsPhase - show labels for prev/next cards
  useEffect(() => {
    if (currentPhase !== 'sideLabelsPhase') return;

    lastPhaseRef.current = 'sideLabelsPhase';

    if (currentPosition === 'prev' || currentPosition === 'next') {
      // Show label with entry animation
      console.log(`✅ PHASE 3 ENTRY - Card ${cardIndex} (${label}) - Setting showLabel=true, isLabelExiting=false`);
      setShowLabel(true);
      setIsLabelExiting(false);
    } else {
      // Active/hidden cards: ensure label is hidden
      setShowLabel(false);
      setIsLabelExiting(false);
    }
  }, [currentPhase, currentPosition, cardIndex, label]);

  // useEffect #4: Handle idle - maintain label visibility for prev/next
  useEffect(() => {
    if (currentPhase !== 'idle') return;

    lastPhaseRef.current = 'idle';

    if (currentPosition === 'prev' || currentPosition === 'next') {
      setShowLabel(true);
      setIsLabelExiting(false);
    } else {
      setShowLabel(false);
      setIsLabelExiting(false);
    }
  }, [currentPhase, currentPosition]);

  // Track viewport changes
  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");
    const xlMediaQuery = window.matchMedia("(min-width: 1280px)");

    const handleLgChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setIsLG(e.matches);
    };
    const handleXlChange = (e: MediaQueryListEvent) => setIsXL(e.matches);

    lgMediaQuery.addEventListener("change", handleLgChange);
    xlMediaQuery.addEventListener("change", handleXlChange);

    return () => {
      lgMediaQuery.removeEventListener("change", handleLgChange);
      xlMediaQuery.removeEventListener("change", handleXlChange);
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
      if (labelRef.current && showLabel && isClickable) {
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
  }, [isClickable, isActive, showLabel]);

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
  const shouldHide = isActive && !gridPosition && isFirstRender;

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
      {(showLabel || isLabelExiting) && (
        <div
          ref={labelRef}
          className="hidden md:flex absolute -bottom-16 left-0 right-0 items-center"
          style={{
            pointerEvents: showLabel && !isActive ? "auto" : "none",
            // Layout logic:
            // xl+: space-between (arrow far from text)
            // lg: flex-start for both cards (arrow next to text, aligned left)
            // md (tablet): flex-start for left card, flex-end for right card
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
            className={`font-light text-2xl xl:text-3xl tracking-[0.2em] uppercase drop-shadow-lg transition-colors duration-300 ${
              isHovered ? "text-brand" : "text-white/90"
            }`}
          >
            {label.split("").map((char, i) => {
              // Log when rendering with exit animation during phase 3
              if (i === 0 && isLabelExiting && currentPhase === 'sideLabelsPhase') {
                console.log(`🔴 RENDERING EXIT ANIMATION IN PHASE 3! Card ${cardIndex} (${label})`);
              }
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animationName: isLabelExiting ? 'slideUpOut' : 'slideUpIn',
                    animationDuration: isLabelExiting ? '0.3s' : '0.8s',
                    animationTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
                    animationFillMode: 'forwards',
                    animationDelay: `${i * 0.02}s`,
                    willChange: "transform, opacity",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </h3>
          <div
            className={`text-3xl xl:text-4xl transition-all duration-300 ${
              isHovered
                ? "text-brand translate-x-2"
                : "text-white/70 translate-x-0"
            }`}
            style={{
              animationName: isLabelExiting ? 'slideUpOut' : 'slideUpIn',
              animationDuration: isLabelExiting ? '0.3s' : '0.8s',
              animationTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
              animationFillMode: 'forwards',
              animationDelay: isLabelExiting ? '0s' : `${label.length * 0.02 + 0.05}s`,
              willChange: "transform, opacity",
            }}
          >
            →
          </div>
        </div>
      )}
    </div>
  );
}
