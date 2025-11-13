import { useState } from "react";

interface CategoryCarouselCardProps {
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
}

export function CategoryCarouselCard({
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
}: CategoryCarouselCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute transition-all duration-[1400ms] ${slotClasses} ${
        isClickable ? "cursor-pointer" : ""
      }`}
      style={{
        zIndex,
        transform: `rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        // Swap width/height based on orientation + 3D rotation
        width: isHorizontal ? "70vh" : "70vw",
        maxWidth: isHorizontal ? "450px" : "350px",
        height: isHorizontal ? "70vw" : "70vh",
        maxHeight: isHorizontal ? "350px" : "450px",
        // Use grid position if available (for active card)
        ...(gridPosition && {
          left: `${gridPosition.left}px`,
          top: `${gridPosition.top}px`,
          transform: `translate(-50%, -50%) rotateY(${rotateY}deg)`,
        }),
      }}
      onClick={onClick}
      onMouseEnter={() => isClickable && setIsHovered(true)}
      onMouseLeave={() => isClickable && setIsHovered(false)}
    >
      {/* Wrapper for rounded corners and overflow */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
        {/* Image layer with 3D effect */}
        <div
          className="absolute inset-0 transition-all duration-[1400ms]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: isActive ? "blur(0)" : "blur(2px)",
            transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />
      </div>

      {/* Label below card - visible only on side cards (lg+) with luxury styling */}
      {!isActive && isClickable && (
        <div
          className={`hidden lg:flex absolute -bottom-16 left-0 right-0 items-center justify-between pointer-events-none opacity-0 animate-[fadeIn_0.5s_ease-out_1.4s_forwards] transition-all duration-300 ${
            isHovered ? "translate-x-2" : ""
          }`}
        >
          <h3
            className={`font-light text-2xl xl:text-3xl tracking-[0.2em] uppercase drop-shadow-lg transition-colors duration-300 ${
              isHovered ? "text-brand" : "text-white/90"
            }`}
          >
            {label}
          </h3>
          <div
            className={`text-3xl xl:text-4xl transition-all duration-300 ${
              isHovered
                ? "text-brand translate-x-2"
                : "text-white/70 translate-x-0"
            }`}
          >
            →
          </div>
        </div>
      )}
    </div>
  );
}
