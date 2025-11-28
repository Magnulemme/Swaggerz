import { motion } from "framer-motion";
import { waveText } from "@/lib/animations";
import { TEXT_CLASSES } from "./categories.ui-constants";

interface AnimatedTitleProps {
  currentLabel: string;
  previousLabel?: string;
  isTransitioning: boolean;
  viewport?: "mobile" | "desktop";
  animationKey: string;
}

/**
 * Animated title component with slide-up transitions
 * Handles both mobile and desktop layouts
 */
export function AnimatedTitle({
  currentLabel,
  previousLabel,
  isTransitioning,
  viewport = "desktop",
  animationKey,
}: AnimatedTitleProps) {
  const textClass = viewport === "mobile" ? TEXT_CLASSES.title.mobile : TEXT_CLASSES.title.desktop;

  return (
    <div className="uppercase flex items-center justify-center w-full">
      {/* Previous title - sliding out upwards */}
      {isTransitioning && previousLabel && (
        <div
          key={`title-${animationKey}-exit-${previousLabel}`}
          className={`absolute ${textClass}`}
        >
          {previousLabel.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block font-jost"
              style={{
                animation: "slideUpOut 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                animationDelay: `${i * 0.02}s`,
                willChange: "transform, opacity",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      )}

      {/* Current title - wave effect */}
      <motion.div
        key={`title-${animationKey}-enter-${currentLabel}`}
        className={`${viewport === "desktop" ? "absolute" : ""} ${textClass}`}
        variants={waveText}
        initial={viewport === "desktop" ? "hidden" : undefined}
        whileInView={viewport === "desktop" ? "visible" : undefined}
        viewport={viewport === "desktop" ? { once: true, amount: 0.5 } : undefined}
      >
        {currentLabel}
      </motion.div>
    </div>
  );
}
