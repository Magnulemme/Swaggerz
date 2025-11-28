import { AnimatedCharacters } from "./AnimatedCharacters";
import { HOVER_CLASSES, TEXT_CLASSES } from "./categories.ui-constants";
import type { CategoryCard } from "./categories.constants";

interface CategoryCTAProps {
  collection: CategoryCard;
  isTransitioning: boolean;
  previousCollection?: CategoryCard;
  animationKeyPrefix: string;
}

export function CategoryCTA({
  collection,
  isTransitioning,
  previousCollection,
  animationKeyPrefix,
}: CategoryCTAProps) {
  return (
    <div className="relative pointer-events-auto pt-4">
      {/* Previous CTA - sliding out */}
      {isTransitioning && previousCollection && (
        <a
          key={`cta-${animationKeyPrefix}-exit-${previousCollection.label}`}
          href="#"
          className="absolute group inline-flex items-center gap-2 cursor-pointer"
        >
          <AnimatedCharacters
            text="Scopri la Collezione"
            isExiting={true}
            as="span"
            className={TEXT_CLASSES.cta}
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-brand"
            style={{
              animation: "slideUpOut 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards",
              animationDelay: "0s",
              willChange: "transform, opacity",
            }}
          >
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}

      {/* Current CTA - sliding in */}
      <a
        key={`cta-${animationKeyPrefix}-enter-${collection.label}`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          console.log("Category selected:", collection.label);
        }}
        className="group relative inline-flex items-center gap-2 cursor-pointer"
        style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
      >
        <span className="relative">
          <AnimatedCharacters
            text="Scopri la Collezione"
            isExiting={false}
            as="span"
            className={TEXT_CLASSES.cta}
          />
          {/* Animated underline - solo dopo che l'animazione è completa */}
          {!isTransitioning && <span className={HOVER_CLASSES.underline} />}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-brand opacity-0 transform transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{
            animation: "slideUpIn 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
            animationDelay: "0.85s",
            willChange: "transform, opacity",
          }}
        >
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
