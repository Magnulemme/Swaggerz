import React, { useRef, useState, useEffect } from "react";
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

/**
 * Helper function to determine style for a specific word
 */
function getWordStyle(word: string): 'bold' | 'normal' {
  const lowerWord = word.toLowerCase();

  // Bold keywords - solo le parole chiave più importanti
  const boldKeywords = ['oversize', 'essenziali', 'bold', 'premium', 'statement', 'attitudine', 'comfort', 'tech'];
  if (boldKeywords.includes(lowerWord)) return 'bold';

  return 'normal';
}

/**
 * Simplified AnimatedText component with natural word-wrapping
 * Words are kept as units, characters are animated within each word
 */
function AnimatedText({
  text,
  // animationKey is used as React key for forced re-renders (passed externally)
  isExiting = false,
  className,
  as: Component = "p",
  enableStyling = false,
}: {
  text: string;
  animationKey: string;
  isExiting?: boolean;
  className?: string;
  as?: "p" | "span" | "div";
  enableStyling?: boolean;
}) {
  // Sync with title animation timing
  const animationName = isExiting ? "slideUpOut" : "slideUpIn";
  const animationDuration = isExiting ? "0.3s" : "0.8s";
  const baseDelay = isExiting ? 0 : 0.6;
  const charDelay = isExiting ? 0.002 : 0.004; // Exit: 2ms, Enter: 4ms

  // Build character array with styles
  const styledChars: Array<{ char: string; style: 'bold' | 'normal' }> = [];

  if (enableStyling) {
    // Split by words and spaces, preserving both
    const words = text.split(/(\s+)/);
    words.forEach(word => {
      const style = getWordStyle(word.trim());
      word.split('').forEach(char => {
        styledChars.push({ char, style: char.trim() ? style : 'normal' });
      });
    });
  } else {
    text.split('').forEach(char => {
      styledChars.push({ char, style: 'normal' });
    });
  }

  // Group styled characters into words
  const groupedStyledWords: Array<Array<{ char: string; style: 'bold' | 'normal' }>> = [];
  let currentWordChars: Array<{ char: string; style: 'bold' | 'normal' }> = [];

  styledChars.forEach((item) => {
    if (item.char === ' ') {
      if (currentWordChars.length > 0) {
        groupedStyledWords.push(currentWordChars);
        currentWordChars = [];
      }
      // Add space as a separate "word"
      groupedStyledWords.push([{ char: ' ', style: 'normal' }]);
    } else {
      currentWordChars.push(item);
    }
  });

  // Add last word if exists
  if (currentWordChars.length > 0) {
    groupedStyledWords.push(currentWordChars);
  }

  // Calculate global character index for delay
  let globalCharIndex = 0;

  return (
    <Component className={className}>
      {groupedStyledWords.map((wordChars, wordIdx) => {
        const isSpace = wordChars.length === 1 && wordChars[0].char === ' ';

        if (isSpace) {
          globalCharIndex++;
          return <span key={`space-${wordIdx}`}> </span>;
        }

        return (
          <span key={`word-${wordIdx}`} className="inline-block">
            {wordChars.map((item, charIdx) => {
              const currentGlobalIndex = globalCharIndex++;

              const styleClasses =
                item.style === 'bold' ? 'font-semibold text-white' : '';

              return (
                <span
                  key={charIdx}
                  className={`inline-block ${isExiting ? "" : "opacity-0"} ${styleClasses}`}
                  style={{
                    animation: `${animationName} ${animationDuration} cubic-bezier(0.65, 0, 0.35, 1) forwards`,
                    animationDelay: `${baseDelay + currentGlobalIndex * charDelay}s`,
                    willChange: "transform, opacity",
                  }}
                >
                  {item.char}
                </span>
              );
            })}
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

  // State per controllare quale descrizione mostrare nello spacer
  const [spacerDescription, setSpacerDescription] = useState(collection.description);

  // Aggiorna spacer description con timing corretto
  useEffect(() => {
    if (isTransitioning && previousCollection?.description) {
      // Durante la transizione, mantieni la descrizione precedente
      setSpacerDescription(previousCollection.description);

      // Aggiorna dopo 0.4s (tra exit 0.3s e enter 0.6s)
      const timer = setTimeout(() => {
        setSpacerDescription(collection.description);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      // Quando non c'è transizione, usa sempre la corrente
      setSpacerDescription(collection.description);
    }
  }, [isTransitioning, collection.description, previousCollection?.description]);

  // Use useLayoutEffect to calculate position BEFORE paint (sync)
  // La fake card è sempre nello stesso posto, quindi calcoliamo solo on mount e resize
  React.useLayoutEffect(() => {
    if (!cardsContainerRef.current || !onCardPositionCalculated) return;

    const updatePosition = () => {
      // Determina quale ref usare in base al viewport
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const activeRef = isDesktop ? desktopCardRef : mobileCardRef;

      if (!activeRef.current || !cardsContainerRef.current) return;

      const fakeCardRect = activeRef.current.getBoundingClientRect();
      const containerRect = cardsContainerRef.current.getBoundingClientRect();

      // La fake card è dentro un grid che ha transform: translate(-50%, -50%)
      // La vera card è position: absolute dentro cardsContainerRef
      // Dobbiamo calcolare la posizione della fake card rispetto al cardsContainer
      // e poi usare quella posizione per la vera card

      // Centro della fake card rispetto al viewport
      const fakeCardCenterX = fakeCardRect.left + fakeCardRect.width / 2;
      const fakeCardCenterY = fakeCardRect.top + fakeCardRect.height / 2;

      // Centro del container rispetto al viewport
      const containerLeft = containerRect.left;
      const containerTop = containerRect.top;

      // Posizione del centro della fake card rispetto al container
      const fakeCardRelativeX = fakeCardCenterX - containerLeft;
      const fakeCardRelativeY = fakeCardCenterY - containerTop;

      const position = {
        left: fakeCardRelativeX,
        top: fakeCardRelativeY,
      };

      console.log('📍 Position calculated:', {
        isDesktop,
        fakeCardCenterX,
        fakeCardCenterY,
        containerLeft,
        containerTop,
        fakeCardRelativeX,
        fakeCardRelativeY,
        fakeCardRect,
        containerRect,
      });

      onCardPositionCalculated(position);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [onCardPositionCalculated, cardsContainerRef, isXL]);

  return (
    <>
      {/* Layout MOBILE/TABLET - OPEN LAYOUT */}
      <div
        ref={mobileContainerRef}
        className="lg:hidden flex flex-col items-center pointer-events-none gap-3"
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
                    className="inline-block font-jost"
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
              className="text-3xl md:text-4xl font-black tracking-tight leading-none text-center text-white whitespace-nowrap font-jost"
            >
              {currentLabel.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block opacity-0 font-jost"
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

          {/* Descrizione con numero */}
          {collection.description && (
            <div className="relative min-h-[50px] w-full flex items-baseline justify-start gap-2">
              {/* Category Number - decorative, secondary */}
              <div className="relative flex-shrink-0">
                {/* Previous number */}
                {isTransitioning && previousCollection && (
                  <span
                    key={`number-mobile-exit-${previousCollection.label}`}
                    className="absolute text-brand/40 text-xs font-jost font-medium"
                    style={{
                      animation: "slideUpOut 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                      animationDelay: "0s",
                    }}
                  >
                    [{String(previousCollection.id + 1).padStart(2, '0')}]
                  </span>
                )}

                {/* Current number */}
                <span
                  key={`number-mobile-enter-${collection.label}`}
                  className="text-brand/40 text-xs font-jost font-medium opacity-0"
                  style={{
                    animation: "slideUpIn 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                    animationDelay: "0.6s",
                  }}
                >
                  [{String(collection.id + 1).padStart(2, '0')}]
                </span>
              </div>

              {/* Description text */}
              <div className="relative flex-1">
                {/* Invisible spacer to maintain height - aggiornato con timing preciso */}
                <div className="invisible text-light-secondary text-sm leading-relaxed font-jost break-words text-left">
                  {spacerDescription}
                </div>

                {isTransitioning && previousCollection?.description && (
                  <AnimatedDescription
                    key={`desc-mobile-exit-${previousCollection.label}`}
                    text={previousCollection.description}
                    animationKey={`mobile-${previousCollection.label}`}
                    isExiting={true}
                    className="absolute inset-0 text-light-secondary text-sm leading-relaxed font-jost break-words text-left"
                  />
                )}

                <AnimatedDescription
                  key={`desc-mobile-enter-${collection.label}`}
                  text={collection.description}
                  animationKey={`mobile-${collection.label}`}
                  isExiting={false}
                  enableStyling={false}
                  className="absolute inset-0 text-light-secondary text-sm leading-relaxed font-jost break-words text-left"
                />
              </div>
            </div>
          )}

          {/* CTA Secondaria (stile ProductShowcase) */}
          <div className="relative pointer-events-auto">
            {/* Previous CTA - sliding out */}
            {isTransitioning && previousCollection && (
              <a
                key={`cta-mobile-exit-${previousCollection.label}`}
                href="#"
                className="absolute group inline-flex items-center gap-2 text-sm font-semibold text-brand cursor-pointer"
              >
                <AnimatedText
                  text="Scopri la Collezione"
                  animationKey={`cta-mobile-exit-${previousCollection.label}`}
                  isExiting={true}
                  as="span"
                  className="text-sm font-semibold text-brand font-jost"
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
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
              className="group relative inline-flex items-center gap-2 cursor-pointer"
              style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}
            >
              <span className="relative">
                <AnimatedText
                  text="Scopri la Collezione"
                  animationKey={`cta-mobile-enter-${collection.label}`}
                  isExiting={false}
                  as="span"
                  className="text-sm font-semibold text-brand font-jost"
                />
                {/* Animated underline - solo dopo che l'animazione è completa */}
                {!isTransitioning && (
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full" />
                )}
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
                  animationDelay: "0.85s", // Dopo l'ultimo carattere del testo
                  willChange: "transform, opacity",
                }}
              >
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                  className="inline-block font-jost"
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
            className="absolute text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white whitespace-nowrap font-jost"
          >
            {currentLabel.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block opacity-0 font-jost"
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
            {/* Description with Category Number */}
            {collection.description && (
              <div className="relative min-h-[75px] flex items-baseline gap-3">
                {/* Category Number - decorative, secondary */}
                <div className="relative flex-shrink-0">
                  {/* Previous number */}
                  {isTransitioning && previousCollection && (
                    <span
                      key={`number-desc-exit-${previousCollection.label}`}
                      className="absolute text-brand/40 text-sm font-jost font-medium"
                      style={{
                        animation: "slideUpOut 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                        animationDelay: "0s",
                      }}
                    >
                      [{String(previousCollection.id + 1).padStart(2, '0')}]
                    </span>
                  )}

                  {/* Current number */}
                  <span
                    key={`number-desc-enter-${collection.label}`}
                    className="text-brand/40 text-sm font-jost font-medium opacity-0"
                    style={{
                      animation: "slideUpIn 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                      animationDelay: "0.6s",
                    }}
                  >
                    [{String(collection.id + 1).padStart(2, '0')}]
                  </span>
                </div>

                {/* Description text */}
                <div className="relative flex-1">
                  {/* Invisible spacer to maintain height - aggiornato con timing preciso */}
                  <div className="invisible text-light-secondary text-base xl:text-lg leading-relaxed font-jost break-words text-left">
                    {spacerDescription}
                  </div>

                  {/* Previous description - sliding out upwards */}
                  {isTransitioning && previousCollection?.description && (
                    <AnimatedDescription
                      key={`desc-exit-${previousCollection.label}`}
                      text={previousCollection.description}
                      animationKey={previousCollection.label}
                      isExiting={true}
                      enableStyling={false}
                      className="absolute inset-0 text-light-secondary text-base xl:text-lg leading-relaxed font-jost break-words text-left"
                    />
                  )}

                  {/* Current description - sliding in from bottom */}
                  <AnimatedDescription
                    key={`desc-enter-${collection.label}`}
                    text={collection.description}
                    animationKey={collection.label}
                    isExiting={false}
                    enableStyling={false}
                    className="absolute inset-0 text-light-secondary text-base xl:text-lg leading-relaxed font-jost break-words text-left"
                  />
                </div>
              </div>
            )}

            {/* Stats Row */}
            {collection.itemCount && (
              <div className="flex items-baseline gap-2 relative">
                {/* Previous count */}
                {isTransitioning && previousCollection?.itemCount && (
                  <AnimatedText
                    key={`count-exit-${previousCollection.label}`}
                    text={String(previousCollection.itemCount)}
                    animationKey={`count-${previousCollection.label}`}
                    isExiting={true}
                    as="span"
                    className="absolute text-white text-4xl xl:text-5xl font-light tabular-nums font-jost"
                  />
                )}
                {/* Current count */}
                <AnimatedText
                  key={`count-enter-${collection.label}`}
                  text={String(collection.itemCount)}
                  animationKey={`count-${collection.label}`}
                  isExiting={false}
                  as="span"
                  className="text-white text-4xl xl:text-5xl font-light tabular-nums font-jost"
                />

                {/* Animated "Items" label */}
                <div className="relative">
                  {/* Previous label */}
                  {isTransitioning && previousCollection && (
                    <AnimatedText
                      key={`items-label-exit-${previousCollection.label}`}
                      text="Items"
                      animationKey={`items-label-${previousCollection.label}`}
                      isExiting={true}
                      as="span"
                      className="absolute text-white/40 text-sm font-light uppercase tracking-wider font-jost"
                    />
                  )}
                  {/* Current label */}
                  <AnimatedText
                    key={`items-label-enter-${collection.label}`}
                    text="Items"
                    animationKey={`items-label-${collection.label}`}
                    isExiting={false}
                    as="span"
                    className="text-white/40 text-sm font-light uppercase tracking-wider font-jost"
                  />
                </div>
              </div>
            )}

            {/* CTA Secondaria Desktop */}
            <div className="relative pointer-events-auto pt-4">
              {/* Previous CTA - sliding out */}
              {isTransitioning && previousCollection && (
                <a
                  key={`cta-desktop-exit-${previousCollection.label}`}
                  href="#"
                  className="absolute group inline-flex items-center gap-2 text-sm font-semibold text-brand cursor-pointer"
                >
                  <AnimatedText
                    text="Scopri la Collezione"
                    animationKey={`cta-desktop-exit-${previousCollection.label}`}
                    isExiting={true}
                    as="span"
                    className="text-sm font-semibold text-brand font-jost"
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
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
                className="group relative inline-flex items-center gap-2 cursor-pointer"
                style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}
              >
                <span className="relative">
                  <AnimatedText
                    text="Scopri la Collezione"
                    animationKey={`cta-desktop-enter-${collection.label}`}
                    isExiting={false}
                    as="span"
                    className="text-sm font-semibold text-brand font-jost"
                  />
                  {/* Animated underline - solo dopo che l'animazione è completa */}
                  {!isTransitioning && (
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full" />
                  )}
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
                    animationDelay: "0.85s", // Dopo l'ultimo carattere del testo
                    willChange: "transform, opacity",
                  }}
                >
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
