import { ANIMATION_CONFIGS, getWordStyle, type WordStyle } from "./categories.ui-constants";

interface StyledChar {
  char: string;
  style: WordStyle;
}

interface AnimatedCharactersProps {
  text: string;
  isExiting?: boolean;
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3";
  enableStyling?: boolean;
  isFirstRender?: boolean;
}

/**
 * Component that animates text character by character with slide-up effect.
 * Words are kept as units for natural wrapping, characters animate within each word.
 *
 * For first render (viewport-based), wrap in motion.div with whileInView
 * For transitions, uses CSS animations directly
 */
export function AnimatedCharacters({
  text,
  isExiting = false,
  className = "",
  as: Component = "p",
  enableStyling = false,
  isFirstRender = false,
}: AnimatedCharactersProps) {

  const config = isExiting
    ? ANIMATION_CONFIGS.slideUpOut
    : ANIMATION_CONFIGS.slideUpIn;

  const animationName = config.name;
  const animationDuration = config.duration;
  const baseDelay = config.baseDelay;
  const charDelay = config.charDelay;

  // Build character array with styles
  const styledChars: StyledChar[] = [];

  if (enableStyling) {
    // Split by words and spaces, preserving both
    const words = text.split(/(\s+)/);
    words.forEach((word) => {
      const style = getWordStyle(word.trim());
      word.split("").forEach((char) => {
        styledChars.push({ char, style: char.trim() ? style : "normal" });
      });
    });
  } else {
    text.split("").forEach((char) => {
      styledChars.push({ char, style: "normal" });
    });
  }

  // Group styled characters into words
  const groupedStyledWords: StyledChar[][] = [];
  let currentWordChars: StyledChar[] = [];

  styledChars.forEach((item) => {
    if (item.char === " ") {
      if (currentWordChars.length > 0) {
        groupedStyledWords.push(currentWordChars);
        currentWordChars = [];
      }
      // Add space as a separate "word"
      groupedStyledWords.push([{ char: " ", style: "normal" }]);
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

  // For transitions (isExiting or not first render), use CSS animations
  // For first render, the parent motion.div with whileInView will trigger visibility
  const shouldAnimate = !isFirstRender || isExiting;

  return (
    <Component className={className}>
      {groupedStyledWords.map((wordChars, wordIdx) => {
        const isSpace = wordChars.length === 1 && wordChars[0].char === " ";

        if (isSpace) {
          globalCharIndex++;
          return <span key={`space-${wordIdx}`}> </span>;
        }

        return (
          <span key={`word-${wordIdx}`} className="inline-block">
            {wordChars.map((item, charIdx) => {
              const currentGlobalIndex = globalCharIndex++;

              const styleClasses =
                item.style === "bold" ? "font-semibold text-white" : "";

              return (
                <span
                  key={charIdx}
                  className={`inline-block ${isExiting ? "" : "opacity-0"} ${styleClasses}`}
                  style={
                    shouldAnimate
                      ? {
                          animation: `${animationName} ${animationDuration} ${config.easing} forwards`,
                          animationDelay: `${baseDelay + currentGlobalIndex * charDelay}s`,
                          willChange: "transform, opacity",
                        }
                      : undefined
                  }
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
