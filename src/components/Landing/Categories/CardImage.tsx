import { TRANSITION_CLASSES } from "./categories.ui-constants";

interface CardImageProps {
  image: string;
  isActive: boolean;
  isFirstRender: boolean;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Card image wrapper component with 3D effect
 * Abstracted from CategoryCarouselCard
 */
export function CardImage({
  image,
  isActive,
  isFirstRender,
  cardRef,
}: CardImageProps) {
  return (
    <div
      ref={cardRef}
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
    >
      <div
        className={`absolute inset-0 ${
          !isFirstRender ? TRANSITION_CLASSES.image : ""
        }`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isActive ? "blur(0)" : "blur(0)",
          ...(!isFirstRender && {
            transitionTimingFunction: TRANSITION_CLASSES.imageEasing,
          }),
        }}
      />
    </div>
  );
}
