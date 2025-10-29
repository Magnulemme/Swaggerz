import { RefObject, useEffect, useState } from "react";
import { getJostPastorRatio } from "@/utils/fontRatioCalculator";

interface UseAlignedFontSizeOptions {
  /**
   * Rapporto manuale da applicare (opzionale)
   * Se non fornito, usa il rapporto Jost/Pastor precalcolato
   */
  ratio?: number;

  /**
   * Moltiplicatore aggiuntivo per fine-tuning visivo (default: 1.0)
   * Utile per aggiustamenti ottici senza ricalcolare il rapporto
   */
  visualAdjustment?: number;

  /**
   * Debounce time in ms per resize events (default: 100)
   */
  debounceMs?: number;

  /**
   * Se true, aggiorna il fontSize anche quando cambia il contenuto del riferimento
   * Utile se il font size cambia dinamicamente (default: false)
   */
  watchContent?: boolean;
}

/**
 * Hook per allineare automaticamente il fontSize di ShaderText con un font di riferimento
 *
 * Legge il fontSize computato di un elemento di riferimento (es. testo con Jost),
 * applica un rapporto di scaling, e ritorna il fontSize appropriato per ShaderText
 *
 * @param referenceElementRef - Ref all'elemento HTML con il font di riferimento
 * @param options - Opzioni di configurazione
 * @returns fontSize calcolato (es. "96px") o null se il riferimento non è disponibile
 *
 * @example
 * ```tsx
 * const jostRef = useRef<HTMLHeadingElement>(null);
 * const shaderFontSize = useAlignedFontSize(jostRef);
 *
 * return (
 *   <>
 *     <h2 ref={jostRef} className="text-4xl md:text-5xl lg:text-8xl">
 *       Streetwear
 *     </h2>
 *     <ShaderText fontSize={shaderFontSize || "72px"}>
 *       Essentials
 *     </ShaderText>
 *   </>
 * );
 * ```
 */
export function useAlignedFontSize<T extends HTMLElement = HTMLElement>(
  referenceElementRef: RefObject<T> | RefObject<T | null>,
  options: UseAlignedFontSizeOptions = {}
): string | null {
  const {
    ratio,
    visualAdjustment = 1.0,
    debounceMs = 100,
    watchContent = false,
  } = options;

  const [fontSize, setFontSize] = useState<string | null>(null);

  useEffect(() => {
    const element = referenceElementRef.current;
    if (!element) {
      console.warn("🔍 useAlignedFontSize: Reference element not available");
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const updateFontSize = async () => {
      // Clear any pending timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Aspetta che i font siano caricati
      if (document.fonts && document.fonts.ready) {
        console.log("⏳ Waiting for fonts to load...");
        try {
          await document.fonts.ready;
          console.log("✅ Fonts loaded!");

          // Verifica che i font specifici siano caricati
          const fontsStatus = {
            jost: document.fonts.check("900 100px Jost"),
            pastor: document.fonts.check("900 100px PastorOfMuppets"),
          };
          console.log("🔍 Fonts availability check:", fontsStatus);
        } catch (error) {
          console.warn("⚠️ Error waiting for fonts:", error);
        }
      }

      if (!isMounted) return;

      // Debounce per evitare troppi ricalcoli durante resize
      timeoutId = setTimeout(() => {
        if (!isMounted) return;
        console.log("🔍 useAlignedFontSize: Starting calculation...");
        console.log("🔍 Reference element:", {
          tagName: element.tagName,
          className: element.className,
          textContent: element.textContent?.substring(0, 50),
        });

        const computed = window.getComputedStyle(element);

        // Log TUTTI gli style rilevanti
        console.log("🔍 Computed styles:", {
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          fontWeight: computed.fontWeight,
          width: computed.width,
          height: computed.height,
          display: computed.display,
          lineHeight: computed.lineHeight,
        });

        const referenceFontSize = parseFloat(computed.fontSize);

        if (isNaN(referenceFontSize) || referenceFontSize === 0) {
          console.warn(
            "⚠️ useAlignedFontSize: Could not read reference font size",
            { fontSize: computed.fontSize, parsed: referenceFontSize }
          );
          return;
        }

        console.log("✅ Reference fontSize parsed:", `${referenceFontSize}px`);

        // Usa il rapporto fornito o quello precalcolato
        const appliedRatio = ratio ?? getJostPastorRatio();
        console.log("🔢 Applied ratio:", appliedRatio);

        // Calcola fontSize allineato con aggiustamento visivo
        const alignedSize = referenceFontSize * appliedRatio * visualAdjustment;
        console.log("🧮 Calculation:", {
          referenceFontSize,
          ratio: appliedRatio,
          visualAdjustment,
          formula: `${referenceFontSize} × ${appliedRatio} × ${visualAdjustment}`,
          result: alignedSize,
        });

        // Arrotonda a 2 decimali per evitare problemi di precision
        const roundedSize = Math.round(alignedSize * 100) / 100;

        const newFontSize = `${roundedSize}px`;

        console.log("✅ Final fontSize for ShaderText:", newFontSize);

        setFontSize(newFontSize);
      }, debounceMs);
    };

    // Calcolo iniziale
    updateFontSize();

    // Observer per resize
    const resizeObserver = new ResizeObserver(() => {
      updateFontSize();
    });

    resizeObserver.observe(element);

    // Observer per contenuto (opzionale)
    let mutationObserver: MutationObserver | null = null;
    if (watchContent) {
      mutationObserver = new MutationObserver(() => {
        updateFontSize();
      });
      mutationObserver.observe(element, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    // Listener per window resize (fallback)
    window.addEventListener("resize", updateFontSize);

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("resize", updateFontSize);
    };
  }, [referenceElementRef, ratio, visualAdjustment, debounceMs, watchContent]);

  return fontSize;
}

/**
 * Hook semplificato per l'allineamento Jost/Pastor of Muppets
 * Usa il rapporto precalcolato senza opzioni aggiuntive
 *
 * @param referenceElementRef - Ref all'elemento con font Jost
 * @returns fontSize calcolato per ShaderText
 *
 * @example
 * ```tsx
 * const jostRef = useRef<HTMLHeadingElement>(null);
 * const shaderFontSize = useJostAlignment(jostRef);
 *
 * return (
 *   <>
 *     <h2 ref={jostRef} className="text-8xl">Streetwear</h2>
 *     <ShaderText fontSize={shaderFontSize || "72px"}>Essentials</ShaderText>
 *   </>
 * );
 * ```
 */
export function useJostAlignment<T extends HTMLElement = HTMLElement>(
  referenceElementRef: RefObject<T> | RefObject<T | null>
): string | null {
  return useAlignedFontSize(referenceElementRef);
}
