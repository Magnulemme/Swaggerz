import React from "react";
import { type CategoryCard } from "./categories.constants";

interface CarouselTitleAndInfoProps {
  currentLabel: string;
  previousLabel?: string;
  isTransitioning: boolean;
  collection: CategoryCard;
  onCardPositionCalculated?: (position: { left: number; top: number }) => void;
  cardsContainerRef: React.RefObject<HTMLDivElement>;
}

export function CarouselTitleAndInfo({
  currentLabel,
  previousLabel,
  isTransitioning,
  collection,
  onCardPositionCalculated,
  cardsContainerRef,
}: CarouselTitleAndInfoProps) {
  const fakeCardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!fakeCardRef.current || !cardsContainerRef.current || !onCardPositionCalculated) return;

    const updatePosition = () => {
      const fakeCardRect = fakeCardRef.current!.getBoundingClientRect();
      const containerRect = cardsContainerRef.current!.getBoundingClientRect();

      onCardPositionCalculated({
        left: fakeCardRect.left - containerRect.left + fakeCardRect.width / 2,
        top: fakeCardRect.top - containerRect.top + fakeCardRect.height / 2,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [onCardPositionCalculated, cardsContainerRef]);
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none grid overflow-visible"
      style={{
        gridTemplateColumns: "auto auto",
        gridTemplateRows: "auto auto",
        zIndex: 30,
      }}
    >
      {/* Grid layout:
          Col 1 = Card area (with fake spacer)
          Col 2 = Description area
          Row 1 = Top half (title overlays card)
          Row 2 = Bottom half (card continues, description beside)

          Note: Active card is rendered in HeroCategories.tsx with absolute positioning
          This grid only positions title and description relative to card dimensions
      */}

      {/* Fake card spacer - Grid position: col 1, rows 1-2 (spans both) */}
      <div
        ref={fakeCardRef}
        className="invisible"
        style={{
          gridColumn: "1",
          gridRow: "1 / 3",
          width: "70vw",
          maxWidth: "350px",
          height: "70vh",
          maxHeight: "450px",
        }}
      />

      {/* Titolo - Grid position: col 1, row 1 (sovrapposto al top della card) */}
      <div
        className="uppercase pointer-events-none flex items-center justify-center relative"
        style={{
          gridColumn: "1",
          gridRow: "1",
          minWidth: 0,
          overflow: "visible",
          minHeight: "150px",
        }}
      >
        {/* Previous title - sliding out upwards */}
        {isTransitioning && previousLabel && (
          <div
            key={`title-exit-${previousLabel}`}
            className="absolute text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white whitespace-nowrap"
          >
            {previousLabel.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation:
                    "slideUpOut 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                  animationDelay: `${i * 0.02}s`,
                  willChange: "transform, opacity",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        )}

        {/* Current title - sliding in from bottom */}
        <div
          key={`title-enter-${currentLabel}`}
          className="absolute text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white whitespace-nowrap"
        >
          {currentLabel.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block opacity-0"
              style={{
                animation:
                  "slideUpIn 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                animationDelay: `${0.6 + i * 0.02}s`,
                willChange: "transform, opacity",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>

      {/* Descrizione - Grid position: col 2, row 2 (accanto al bottom della card) */}
      <div
        className="hidden lg:flex items-start justify-start pl-8 xl:pl-12"
        style={{
          gridColumn: "2",
          gridRow: "2",
        }}
      >
        <div
          className={`
            w-[300px] xl:w-[360px]
            flex flex-col gap-6
            transition-all duration-700 ease-out
            pointer-events-auto
            ${isTransitioning ? "opacity-0 translate-x-12" : "opacity-100 translate-x-0"}
          `}
        >
          {/* Collection Label */}
          <div className="flex flex-col gap-2">
            <span className="text-white/40 text-xs font-light uppercase tracking-[0.3em]">
              Collection
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-white/30 to-transparent" />
          </div>

          {/* Nickname - Premium Typography */}
          {collection.nickname && (
            <h3 className="text-white text-3xl xl:text-4xl font-light tracking-tight leading-tight">
              {collection.nickname}
            </h3>
          )}

          {/* Description - Premium Typography */}
          {collection.description && (
            <p className="text-white/70 text-sm xl:text-base font-light leading-relaxed tracking-wide">
              {collection.description}
            </p>
          )}

          {/* Item Count - Minimal Style */}
          {collection.itemCount && (
            <div className="flex items-baseline gap-3 pt-4">
              <span className="text-white text-4xl xl:text-5xl font-extralight tabular-nums">
                {collection.itemCount}
              </span>
              <span className="text-white/40 text-xs font-light uppercase tracking-[0.2em]">
                Items
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
