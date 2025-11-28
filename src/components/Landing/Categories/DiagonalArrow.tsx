import { SVG_PATHS, SVG_DIMENSIONS } from "./categories.ui-constants";

interface DiagonalArrowProps {
  size?: "small" | "large";
  className?: string;
  animated?: boolean;
  animationDelay?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable diagonal arrow SVG component
 * Used across CategoryLabel, CategoryCTA, and CarouselTitleAndInfo
 */
export function DiagonalArrow({
  size = "small",
  className = "text-brand",
  animated = false,
  animationDelay = "0.85s",
  style,
}: DiagonalArrowProps) {
  const dimensions = size === "large" ? SVG_DIMENSIONS.arrowLarge : SVG_DIMENSIONS.arrow;

  const animationStyle = animated
    ? {
        animation: "slideUpIn 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        animationDelay,
        willChange: "transform, opacity" as const,
      }
    : {};

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox={dimensions.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...animationStyle, ...style }}
    >
      <path
        d={SVG_PATHS.diagonalArrow}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
