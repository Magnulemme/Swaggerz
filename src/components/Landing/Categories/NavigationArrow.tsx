import { HOVER_CLASSES } from "./categories.ui-constants";

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
}

export function NavigationArrow({
  direction,
  onClick,
  visible,
}: NavigationArrowProps) {
  if (!visible) return null;

  const isLeft = direction === "left";
  const positionClass = isLeft ? "left-4" : "right-4";
  const ariaLabel = isLeft ? "Previous slides" : "Next slides";

  return (
    <button
      onClick={onClick}
      className={`
        absolute ${positionClass} top-1/2 -translate-y-1/2 z-20
        flex group p-sm rounded-full items-center justify-center
        ${HOVER_CLASSES.brandBorder}
        bg-dark-elevated cursor-pointer
      `}
      aria-label={ariaLabel}
    >
      <svg
        className={`size-icon text-light-primary group-hover:text-brand transition-all duration-500`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {isLeft ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        )}
      </svg>
    </button>
  );
}
