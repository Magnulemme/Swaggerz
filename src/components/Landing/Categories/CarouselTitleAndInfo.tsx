import React, { useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { AnimatedTitle } from "./AnimatedTitle";
import { CategoryDescription } from "./CategoryDescription";
import { CategoryStats } from "./CategoryStats";
import { CategoryCTA } from "./CategoryCTA";
import { useCardPositionCalculation } from "./useCardPositionCalculation";
import { CARD_DIMENSIONS } from "./categories.ui-constants";
import type { CategoryCard } from "./categories.constants";

interface CarouselTitleAndInfoProps {
  currentLabel: string;
  previousLabel?: string;
  isTransitioning: boolean;
  collection: CategoryCard;
  previousCollection?: CategoryCard;
  onCardPositionCalculated?: (position: { left: number; top: number }) => void;
  cardsContainerRef: React.RefObject<HTMLDivElement | null>;
  isFirstRender?: boolean;
  isXL: boolean;
}

export function CarouselTitleAndInfo({
  currentLabel,
  previousLabel,
  isTransitioning,
  collection,
  previousCollection,
  onCardPositionCalculated,
  cardsContainerRef,
  isXL,
}: CarouselTitleAndInfoProps) {
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Calculate card position
  useCardPositionCalculation({
    mobileCardRef,
    desktopCardRef,
    cardsContainerRef,
    onCardPositionCalculated,
    isXL,
  });

  return (
    <>
      {/* Layout MOBILE/TABLET - OPEN LAYOUT */}
      <div
        ref={mobileContainerRef}
        className="lg:hidden flex flex-col items-center pointer-events-none gap-3"
        style={{ zIndex: 70 }}
      >
        {/* Clickable image (without overlayed title) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log("Category selected:", collection.label);
          }}
          className="pointer-events-auto cursor-pointer group"
          style={{
            width: CARD_DIMENSIONS.mobile.width,
            maxWidth: CARD_DIMENSIONS.mobile.maxWidth,
            height: CARD_DIMENSIONS.mobile.height,
            maxHeight: CARD_DIMENSIONS.mobile.maxHeight,
          }}
        >
          {/* Fake card spacer for position calculation */}
          <div
            ref={mobileCardRef}
            className="pointer-events-none w-full h-full"
          />
        </a>

        {/* Content below image: Title + Description + CTA */}
        <motion.div
          className="flex flex-col gap-3 items-center px-4 pt-6 pointer-events-none"
          style={{
            width: "80vw",
            maxWidth: "400px",
          }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Title */}
          <AnimatedTitle
            currentLabel={currentLabel}
            previousLabel={previousLabel}
            isTransitioning={isTransitioning}
            viewport="mobile"
            animationKey="mobile"
          />

          {/* Description with number */}
          <CategoryDescription
            collection={collection}
            previousCollection={previousCollection}
            isTransitioning={isTransitioning}
            viewport="mobile"
          />

          {/* Secondary CTA */}
          <motion.div className="relative pointer-events-auto" variants={staggerContainer}>
            <CategoryCTA
              collection={collection}
              isTransitioning={isTransitioning}
              previousCollection={previousCollection}
              animationKeyPrefix="mobile"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Layout DESKTOP - GRID */}
      <div
        className="hidden lg:grid absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible"
        style={{
          gridTemplateColumns: "auto auto",
          gridTemplateRows: "auto auto",
          zIndex: 70,
        }}
      >
        {/* Fake card spacer - Grid position: col 1, rows 1-2 */}
        <div
          ref={desktopCardRef}
          className="pointer-events-none"
          style={{
            gridColumn: "1",
            gridRow: "1 / 3",
            width: CARD_DIMENSIONS.desktop.width,
            maxWidth: isXL ? CARD_DIMENSIONS.desktopXL.maxWidth : CARD_DIMENSIONS.desktop.maxWidth,
            height: CARD_DIMENSIONS.desktop.height,
            maxHeight: CARD_DIMENSIONS.desktop.maxHeight,
          }}
        />

        {/* Title - Grid position: col 2, row 1 */}
        <div
          className="uppercase pointer-events-none flex items-center justify-center relative"
          style={{
            gridColumn: "2",
            gridRow: "1",
            minWidth: 0,
            overflow: "visible",
            minHeight: "150px",
          }}
        >
          <AnimatedTitle
            currentLabel={currentLabel}
            previousLabel={previousLabel}
            isTransitioning={isTransitioning}
            viewport="desktop"
            animationKey="desktop"
          />
        </div>

        {/* Desktop Description - Grid position: col 2, row 2 */}
        <div
          className="flex items-start justify-start pl-4"
          style={{
            gridColumn: "2",
            gridRow: "2",
          }}
        >
          <motion.div
            className="w-[240px] xl:w-[300px] flex flex-col gap-6 pointer-events-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {/* Description with Category Number */}
            <CategoryDescription
              collection={collection}
              previousCollection={previousCollection}
              isTransitioning={isTransitioning}
              viewport="desktop"
            />

            {/* Stats Row */}
            <CategoryStats
              collection={collection}
              previousCollection={previousCollection}
              isTransitioning={isTransitioning}
            />

            {/* Desktop CTA */}
            <CategoryCTA
              collection={collection}
              isTransitioning={isTransitioning}
              previousCollection={previousCollection}
              animationKeyPrefix="desktop"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
