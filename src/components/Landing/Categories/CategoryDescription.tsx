import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { waveText } from "@/lib/animations";
import { AnimatedCharacters } from "./AnimatedCharacters";
import { getCategoryNumberFormatted, TEXT_CLASSES, CAROUSEL_TIMING } from "./categories.ui-constants";
import type { CategoryCard } from "./categories.constants";

interface CategoryDescriptionProps {
  collection: CategoryCard;
  previousCollection?: CategoryCard;
  isTransitioning: boolean;
  viewport?: "mobile" | "desktop";
}

/**
 * Category description with number and animated text
 * Handles spacer logic for smooth transitions
 */
export function CategoryDescription({
  collection,
  previousCollection,
  isTransitioning,
  viewport = "desktop",
}: CategoryDescriptionProps) {
  const [spacerDescription, setSpacerDescription] = useState(collection.description);

  // Update spacer description with correct timing
  useEffect(() => {
    if (isTransitioning && previousCollection?.description) {
      // During transition, keep previous description
      setSpacerDescription(previousCollection.description);

      // Update after delay (between exit and enter animations)
      const timer = setTimeout(() => {
        setSpacerDescription(collection.description);
      }, CAROUSEL_TIMING.descriptionUpdateDelay);

      return () => clearTimeout(timer);
    } else {
      // When not transitioning, use current description
      setSpacerDescription(collection.description);
    }
  }, [isTransitioning, collection.description, previousCollection?.description]);

  if (!collection.description) return null;

  const descClass = viewport === "mobile"
    ? TEXT_CLASSES.description.mobile
    : TEXT_CLASSES.description.desktop;

  return (
    <motion.div
      className={`relative ${viewport === "mobile" ? "min-h-[50px]" : "min-h-[75px]"} ${viewport === "mobile" ? "w-full" : ""} flex items-baseline ${viewport === "mobile" ? "justify-start gap-2" : "gap-3"}`}
      variants={waveText}
    >
      {/* Category Number - decorative, secondary */}
      <div className="relative flex-shrink-0">
        {/* Previous number */}
        {isTransitioning && previousCollection && (
          <span
            key={`number-${viewport}-exit-${previousCollection.label}`}
            className={`absolute ${TEXT_CLASSES.categoryNumber}`}
            style={{
              animation: "slideUpOut 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards",
              animationDelay: "0s",
            }}
          >
            {getCategoryNumberFormatted(previousCollection.id)}
          </span>
        )}

        {/* Current number */}
        <span
          key={`number-${viewport}-enter-${collection.label}`}
          className={`${TEXT_CLASSES.categoryNumber} opacity-0`}
          style={{
            animation: "slideUpIn 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
            animationDelay: "0.6s",
          }}
        >
          {getCategoryNumberFormatted(collection.id)}
        </span>
      </div>

      {/* Description text */}
      <div className="relative flex-1">
        {/* Invisible spacer to maintain height */}
        <div className={`invisible ${descClass}`}>
          {spacerDescription}
        </div>

        {/* Previous description - sliding out upwards */}
        {isTransitioning && previousCollection?.description && (
          <AnimatedCharacters
            key={`desc-${viewport}-exit-${previousCollection.label}`}
            text={previousCollection.description}
            isExiting={true}
            enableStyling={false}
            className={`absolute inset-0 ${descClass}`}
          />
        )}

        {/* Current description - sliding in from bottom */}
        <AnimatedCharacters
          key={`desc-${viewport}-enter-${collection.label}`}
          text={collection.description}
          isExiting={false}
          enableStyling={false}
          className={`absolute inset-0 ${descClass}`}
        />
      </div>
    </motion.div>
  );
}
