import { motion } from "framer-motion";
import { getCategoryNumberFormatted } from "./categories.ui-constants";

interface CategoryLabelProps {
  label: string;
  cardIndex: number;
  currentPosition: string | null;
  isTransitioning: boolean;
  isHovered: boolean;
  isXL?: boolean;
  isLG?: boolean;
  isLeftCard?: boolean;
}

export function CategoryLabel({
  label,
  cardIndex,
  currentPosition,
  isTransitioning,
  isHovered,
  isXL = false,
  isLG = false,
  isLeftCard = false,
}: CategoryLabelProps) {
  return (
    <motion.div
      key={`${cardIndex}-${currentPosition}`}
      className="hidden md:flex absolute -bottom-16 left-0 right-0 items-center"
      style={{
        pointerEvents: "auto",
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
          {getCategoryNumberFormatted(cardIndex)}
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
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}
