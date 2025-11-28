import { motion } from "framer-motion";
import { waveText } from "@/lib/animations";
import { AnimatedCharacters } from "./AnimatedCharacters";
import { TEXT_CLASSES } from "./categories.ui-constants";
import type { CategoryCard } from "./categories.constants";

interface CategoryStatsProps {
  collection: CategoryCard;
  previousCollection?: CategoryCard;
  isTransitioning: boolean;
}

/**
 * Category statistics component (item count)
 * Shows animated count with "Items" label
 */
export function CategoryStats({
  collection,
  previousCollection,
  isTransitioning,
}: CategoryStatsProps) {
  if (!collection.itemCount) return null;

  return (
    <motion.div className="flex items-baseline gap-2 relative" variants={waveText}>
      {/* Previous count */}
      {isTransitioning && previousCollection?.itemCount && (
        <AnimatedCharacters
          key={`count-exit-${previousCollection.label}`}
          text={String(previousCollection.itemCount)}
          isExiting={true}
          as="span"
          className={`absolute ${TEXT_CLASSES.itemCount}`}
        />
      )}

      {/* Current count */}
      <AnimatedCharacters
        key={`count-enter-${collection.label}`}
        text={String(collection.itemCount)}
        isExiting={false}
        as="span"
        className={TEXT_CLASSES.itemCount}
      />

      {/* Animated "Items" label */}
      <div className="relative">
        {/* Previous label */}
        {isTransitioning && previousCollection && (
          <AnimatedCharacters
            key={`items-label-exit-${previousCollection.label}`}
            text="Items"
            isExiting={true}
            as="span"
            className={`absolute ${TEXT_CLASSES.itemLabel}`}
          />
        )}

        {/* Current label */}
        <AnimatedCharacters
          key={`items-label-enter-${collection.label}`}
          text="Items"
          isExiting={false}
          as="span"
          className={TEXT_CLASSES.itemLabel}
        />
      </div>
    </motion.div>
  );
}
