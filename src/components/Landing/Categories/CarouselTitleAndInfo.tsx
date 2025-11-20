import React, { useRef } from "react";
import { type CategoryCard } from "./categories.constants";

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

interface CharWithLine {
  char: string;
  lineIndex: number;
  charIndex: number;
  charsInLine: number; // Total chars in this line for dynamic delay calculation
}

/**
 * Helper component that calculates line breaks based on actual rendered positions
 * Works for any text: descriptions, labels, numbers, etc.
 */
function AnimatedText({
  text,
  // animationKey is used as React key for forced re-renders (passed externally)
  isExiting = false,
  className,
  as: Component = "p",
}: {
  text: string;
  animationKey: string;
  isExiting?: boolean;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  const containerRef = React.useRef<HTMLParagraphElement>(null);
  const [charsWithLines, setCharsWithLines] = React.useState<CharWithLine[]>(
    []
  );

  React.useEffect(() => {
    if (!containerRef.current) return;

    const spans =
      containerRef.current.querySelectorAll<HTMLSpanElement>(".char-span");

    // First pass: detect lines and count chars per line
    const tempChars: Omit<CharWithLine, "charsInLine">[] = [];
    const charsPerLine: number[] = [0];
    let currentLineIndex = 0;
    let lastY = -1;
    let charIndexInLine = 0;

    spans.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const y = Math.round(rect.top);

      // New line detected
      if (lastY !== -1 && y > lastY + 5) {
        currentLineIndex++;
        charIndexInLine = 0;
        charsPerLine[currentLineIndex] = 0;
      }

      tempChars.push({
        char: span.textContent || "",
        lineIndex: currentLineIndex,
        charIndex: charIndexInLine,
      });

      charsPerLine[currentLineIndex]++;
      lastY = y;
      charIndexInLine++;
    });

    // Second pass: add charsInLine to each char
    const chars: CharWithLine[] = tempChars.map((char) => ({
      ...char,
      charsInLine: charsPerLine[char.lineIndex],
    }));

    setCharsWithLines(chars);
  }, [text]);

  // Sync with title animation timing
  const animationName = isExiting ? "slideUpOut" : "slideUpIn";
  const animationDuration = isExiting ? "0.3s" : "0.8s"; // Exit faster, enter same as title
  const baseDelay = isExiting ? 0 : 0.6; // Same as title (0.6s for enter)
  const lineDelay = isExiting ? 0.03 : 0.08; // Exit lines faster (30ms), enter with slight offset (80ms)

  // Title target: ~0.3s wave time for ~15 chars (0.02s per char)
  const targetWaveTime = 0.3;

  return (
    <Component
      ref={containerRef as any}
      className={`${className} ${
        charsWithLines.length === 0 ? "invisible" : ""
      }`}
    >
      {charsWithLines.length === 0
        ? // Initial render: invisible spans for measurement (hidden but measurable)
          text.split("").map((char, i) => (
            <span key={i} className="char-span inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))
        : // After measurement: animated spans with per-line dynamic delay
          charsWithLines.map((item, i) => {
            // Calculate delay specific to this line's length
            const dynamicCharDelay = Math.min(
              targetWaveTime / item.charsInLine,
              0.02
            ); // Cap at title's delay
            const charDelay = isExiting
              ? dynamicCharDelay * 0.4
              : dynamicCharDelay; // Exit faster

            return (
              <span
                key={i}
                className={`inline-block ${isExiting ? "" : "opacity-0"}`}
                style={{
                  animation: `${animationName} ${animationDuration} cubic-bezier(0.65, 0, 0.35, 1) forwards`,
                  animationDelay: `${
                    baseDelay +
                    item.lineIndex * lineDelay +
                    item.charIndex * charDelay
                  }s`,
                  willChange: "transform, opacity",
                }}
              >
                {item.char === " " ? "\u00A0" : item.char}
              </span>
            );
          })}
    </Component>
  );
}

// Alias for backwards compatibility
const AnimatedDescription = AnimatedText;

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
  // Ref condiviso per mobile e desktop
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Use useLayoutEffect to calculate position BEFORE paint (sync)
  React.useLayoutEffect(() => {
    if (!cardsContainerRef.current || !onCardPositionCalculated) return;

    const updatePosition = () => {
      // Determina quale ref usare in base al viewport
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const activeRef = isDesktop ? desktopCardRef : mobileCardRef;

      if (!activeRef.current || !cardsContainerRef.current) return;

      const fakeCardRect = activeRef.current.getBoundingClientRect();
      const containerRect = cardsContainerRef.current.getBoundingClientRect();

      // Su mobile: la fake card è dentro mobileContainerRef che è centrato rispetto al cardsContainer
      // Dobbiamo calcolare la posizione della card rispetto al cards container, non rispetto al mobile container
      const position = {
        left: fakeCardRect.left - containerRect.left + fakeCardRect.width / 2,
        top: fakeCardRect.top - containerRect.top + fakeCardRect.height / 2,
      };

      console.log('📍 Position calculated:', {
        isDesktop,
        fakeCardTop: fakeCardRect.top,
        containerTop: containerRect.top,
        fakeCardHeight: fakeCardRect.height,
        calculatedTop: position.top,
        fakeCardRect,
        containerRect,
      });

      onCardPositionCalculated(position);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [onCardPositionCalculated, cardsContainerRef, collection.label, isXL]);

  return (
    <>
      {/* Layout MOBILE/TABLET - OPEN LAYOUT */}
      <div
        ref={mobileContainerRef}
        className="lg:hidden flex flex-col items-center pointer-events-none"
        style={{ zIndex: 70 }}
      >
        {/* Immagine cliccabile (senza titolo overlayed) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log("Category selected:", collection.label);
          }}
          className="pointer-events-auto cursor-pointer group"
          style={{
            width: "70vw",
            maxWidth: "350px",
            height: "50vh",
            maxHeight: "450px",
          }}
        >
          {/* Fake card spacer per calcolo posizione - IDENTICA all'immagine, occupa spazio naturale */}
          <div
            ref={mobileCardRef}
            className="pointer-events-none w-full h-full"
          />
        </a>

        {/* Contenuto sotto l'immagine: Titolo + Descrizione + CTA */}
        <div
          className="flex flex-col gap-3 items-center px-4 pt-6 pointer-events-none"
          style={{
            width: "80vw",
            maxWidth: "400px",
          }}
        >
          {/* Titolo */}
          <div className="uppercase flex items-center justify-center w-full">
            {/* Previous title - sliding out upwards */}
            {isTransitioning && previousLabel && (
              <div
                key={`title-mobile-exit-${previousLabel}`}
                className="absolute text-3xl md:text-4xl font-black tracking-tight leading-none text-center text-white whitespace-nowrap"
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
              key={`title-mobile-enter-${currentLabel}`}
              className="text-3xl md:text-4xl font-black tracking-tight leading-none text-center text-white whitespace-nowrap"
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

          {/* Descrizione */}
          {collection.description && (
            <div className="relative text-center min-h-[50px] w-full">
              {isTransitioning && previousCollection?.description && (
                <AnimatedDescription
                  key={`desc-mobile-exit-${previousCollection.label}`}
                  text={previousCollection.description}
                  animationKey={`mobile-${previousCollection.label}`}
                  isExiting={true}
                  className="absolute inset-0 text-white/70 text-sm font-light leading-relaxed tracking-wide"
                />
              )}

              <AnimatedDescription
                key={`desc-mobile-enter-${collection.label}`}
                text={collection.description}
                animationKey={`mobile-${collection.label}`}
                isExiting={false}
                className="text-white/70 text-sm font-light leading-relaxed tracking-wide"
              />
            </div>
          )}

          {/* CTA Secondaria (stile ProductShowcase) */}
          <div className="relative pointer-events-auto">
            {/* Previous CTA - sliding out */}
            {isTransitioning && previousCollection && (
              <a
                key={`cta-mobile-exit-${previousCollection.label}`}
                href="#"
                className="absolute group inline-flex items-center text-sm font-semibold text-brand cursor-pointer"
              >
                <AnimatedText
                  text="Scopri la Collezione →"
                  animationKey={`cta-mobile-exit-${previousCollection.label}`}
                  isExiting={true}
                  as="span"
                  className="text-sm font-semibold text-brand"
                />
              </a>
            )}

            {/* Current CTA - sliding in */}
            <a
              key={`cta-mobile-enter-${collection.label}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log("Category selected:", collection.label);
              }}
              className="group inline-flex items-center text-sm font-semibold text-brand hover:gap-1 cursor-pointer transition-all duration-300"
            >
              <AnimatedText
                text="Scopri la Collezione →"
                animationKey={`cta-mobile-enter-${collection.label}`}
                isExiting={false}
                as="span"
                className="text-sm font-semibold text-brand"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Layout DESKTOP - GRID (come prima) */}
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
            width: "70vw",
            maxWidth: isXL ? "350px" : "300px",
            height: "70vh",
            maxHeight: "450px",
          }}
        />

        {/* Titolo - Grid position: col 2, row 1 */}
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
          {/* Previous title - sliding out upwards */}
          {isTransitioning && previousLabel && (
            <div
              key={`title-desktop-exit-${previousLabel}`}
              className="absolute text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white whitespace-nowrap"
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
            key={`title-desktop-enter-${currentLabel}`}
            className="absolute text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white whitespace-nowrap"
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

        {/* Descrizione Desktop - Grid position: col 2, row 2 (accanto al bottom della card) */}
        <div
          className="flex items-start justify-start pl-4"
          style={{
            gridColumn: "2",
            gridRow: "2",
          }}
        >
          <div
            className={`
            w-[240px] xl:w-[300px]
            flex flex-col gap-6
            pointer-events-auto
          `}
          >
            {/* Collection Label */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                {/* Previous "Collection" label - sliding out */}
                {isTransitioning && previousCollection && (
                  <AnimatedText
                    key={`collection-exit-${previousCollection.label}`}
                    text="Collection"
                    animationKey={`collection-${previousCollection.label}`}
                    isExiting={true}
                    as="span"
                    className="absolute text-white/40 text-xs font-light uppercase tracking-[0.3em]"
                  />
                )}

                {/* Current "Collection" label - sliding in */}
                <AnimatedText
                  key={`collection-enter-${collection.label}`}
                  text="Collection"
                  animationKey={`collection-${collection.label}`}
                  isExiting={false}
                  as="span"
                  className="text-white/40 text-xs font-light uppercase tracking-[0.3em]"
                />
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-white/30 to-transparent" />
            </div>

            {/* Description - Letters wave, lines together */}
            {collection.description && (
              <div className="relative min-h-[80px]">
                {/* Previous description - sliding out upwards */}
                {isTransitioning && previousCollection?.description && (
                  <AnimatedDescription
                    key={`desc-exit-${previousCollection.label}`}
                    text={previousCollection.description}
                    animationKey={previousCollection.label}
                    isExiting={true}
                    className="absolute text-white/70 text-sm xl:text-base font-light leading-relaxed tracking-wide"
                  />
                )}

                {/* Current description - sliding in from bottom */}
                <AnimatedDescription
                  key={`desc-enter-${collection.label}`}
                  text={collection.description}
                  animationKey={collection.label}
                  isExiting={false}
                  className="text-white/70 text-sm xl:text-base font-light leading-relaxed tracking-wide"
                />
              </div>
            )}

            {/* Item Count - Minimal Style */}
            {collection.itemCount && (
              <div className="flex items-baseline gap-3 pt-2 relative">
                {/* Previous item count - sliding out */}
                {isTransitioning && previousCollection?.itemCount && (
                  <>
                    <AnimatedText
                      key={`count-exit-${previousCollection.label}`}
                      text={String(previousCollection.itemCount)}
                      animationKey={`count-${previousCollection.label}`}
                      isExiting={true}
                      as="span"
                      className="absolute text-white text-4xl xl:text-5xl font-extralight tabular-nums"
                    />
                    <AnimatedText
                      key={`items-exit-${previousCollection.label}`}
                      text="Items"
                      animationKey={`items-${previousCollection.label}`}
                      isExiting={true}
                      as="span"
                      className="absolute left-[120px] xl:left-[150px] text-white/40 text-xs font-light uppercase tracking-[0.2em]"
                    />
                  </>
                )}

                {/* Current item count - sliding in */}
                <AnimatedText
                  key={`count-enter-${collection.label}`}
                  text={String(collection.itemCount)}
                  animationKey={`count-${collection.label}`}
                  isExiting={false}
                  as="span"
                  className="text-white text-4xl xl:text-5xl font-extralight tabular-nums"
                />
                <AnimatedText
                  key={`items-enter-${collection.label}`}
                  text="Items"
                  animationKey={`items-${collection.label}`}
                  isExiting={false}
                  as="span"
                  className="text-white/40 text-xs font-light uppercase tracking-[0.2em]"
                />
              </div>
            )}

            {/* CTA Secondaria Desktop */}
            <div className="relative pointer-events-auto pt-4">
              {/* Previous CTA - sliding out */}
              {isTransitioning && previousCollection && (
                <a
                  key={`cta-desktop-exit-${previousCollection.label}`}
                  href="#"
                  className="absolute group inline-flex items-center text-sm font-semibold text-brand cursor-pointer"
                >
                  <AnimatedText
                    text="Scopri la Collezione →"
                    animationKey={`cta-desktop-exit-${previousCollection.label}`}
                    isExiting={true}
                    as="span"
                    className="text-sm font-semibold text-brand"
                  />
                </a>
              )}

              {/* Current CTA - sliding in */}
              <a
                key={`cta-desktop-enter-${collection.label}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Category selected:", collection.label);
                }}
                className="group inline-flex items-center text-sm font-semibold text-brand hover:gap-1 cursor-pointer transition-all duration-300"
              >
                <AnimatedText
                  text="Scopri la Collezione →"
                  animationKey={`cta-desktop-enter-${collection.label}`}
                  isExiting={false}
                  as="span"
                  className="text-sm font-semibold text-brand"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
