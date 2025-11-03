/**
 * Utility per calcolare il rapporto tra font diversi
 * Usato per allineare ShaderText (Pastor of Muppets) con font standard (Jost)
 */

interface FontMeasurement {
  width: number;
  height: number;
  actualBoundingBoxAscent: number;
  actualBoundingBoxDescent: number;
}

/**
 * Misura le dimensioni effettive di un testo con un font specifico usando Canvas
 * Più veloce e accurato per calcoli di width
 */
function measureFontWithCanvas(
  fontFamily: string,
  fontSize: number = 100,
  testText: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
): FontMeasurement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not available");
  }

  // Imposta font con fallback
  const fontString = `900 ${fontSize}px ${fontFamily}`;
  ctx.font = fontString;
  const metrics = ctx.measureText(testText);

  const result = {
    width: metrics.width,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    actualBoundingBoxAscent: metrics.actualBoundingBoxAscent,
    actualBoundingBoxDescent: metrics.actualBoundingBoxDescent,
  };

  return result;
}

/**
 * Misura le dimensioni effettive usando SVG getBBox()
 * Più accurato per font decorativi con ornamenti
 */
function measureFontWithSVG(
  fontFamily: string,
  fontSize: number = 100,
  testText: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
): { width: number; height: number } {
  // Crea SVG temporaneo nascosto
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "absolute";
  svg.style.visibility = "hidden";
  svg.style.pointerEvents = "none";
  document.body.appendChild(svg);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("font-family", fontFamily);
  text.setAttribute("font-size", fontSize.toString());
  text.setAttribute("font-weight", "900");
  text.textContent = testText;
  svg.appendChild(text);

  // Forza layout
  svg.getBoundingClientRect();

  const bbox = text.getBBox();
  document.body.removeChild(svg);

  const result = {
    width: bbox.width,
    height: bbox.height,
  };

  return result;
}

/**
 * Calcola il rapporto tra due font basandosi sulla width percepita
 *
 * @param referenceFont - Font di riferimento (es. "Jost")
 * @param targetFont - Font da scalare (es. "Pastor of Muppets")
 * @param testText - Testo di test per la misurazione
 * @param method - Metodo di misurazione ("canvas" | "svg" | "hybrid")
 * @returns Rapporto da applicare al targetFont per allinearlo al referenceFont
 *
 * @example
 * // Se Jost è largo 500px e Pastor è largo 400px
 * // ratio = 500/400 = 1.25
 * // Per allinearli: pastorSize = jostSize * 1.25
 */
export function calculateFontRatio(
  referenceFont: string,
  targetFont: string,
  testText: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  method: "canvas" | "svg" | "hybrid" = "hybrid"
): number {
  try {
    if (method === "canvas") {
      const refMeasurement = measureFontWithCanvas(
        referenceFont,
        100,
        testText
      );
      const targetMeasurement = measureFontWithCanvas(
        targetFont,
        100,
        testText
      );
      const ratio = refMeasurement.width / targetMeasurement.width;

      return ratio;
    }

    if (method === "svg") {
      const refMeasurement = measureFontWithSVG(referenceFont, 100, testText);
      const targetMeasurement = measureFontWithSVG(targetFont, 100, testText);
      const ratio = refMeasurement.width / targetMeasurement.width;

      return ratio;
    }

    // Hybrid: media pesata (Canvas 60%, SVG 40%)
    // Canvas è più veloce, SVG più accurato per decorazioni
    const refCanvas = measureFontWithCanvas(referenceFont, 100, testText);
    const targetCanvas = measureFontWithCanvas(targetFont, 100, testText);
    const ratioCanvas = refCanvas.width / targetCanvas.width;

    const refSVG = measureFontWithSVG(referenceFont, 100, testText);
    const targetSVG = measureFontWithSVG(targetFont, 100, testText);
    const ratioSVG = refSVG.width / targetSVG.width;

    const finalRatio = ratioCanvas * 0.6 + ratioSVG * 0.4;

    return finalRatio;
  } catch {
    // Fallback: rapporto neutro
    return 1.0;
  }
}

/**
 * Trova il nome corretto del font Pastor of Muppets provando diverse varianti
 */
function findPastorFontName(): string {
  const testText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const candidateNames = [
    "PastorOfMuppets",
    "Pastor Of Muppets",
    "Pastor of Muppets",
    "pastorOfMuppets",
    "pastor-of-muppets",
    "Pastor",
  ];

  // Misura con fallback cursive come baseline
  const cursiveWidth = measureFontWithCanvas("cursive", 100, testText).width;

  // Prova ogni candidato e cerca uno con width diversa da cursive
  for (const name of candidateNames) {
    try {
      const measurement = measureFontWithCanvas(
        `${name}, cursive`,
        100,
        testText
      );

      // Se la width è significativamente diversa dal fallback, abbiamo trovato il font!
      const difference = Math.abs(measurement.width - cursiveWidth);
      if (difference > 50) {
        // Tolleranza di 50px su 100px font size
        return name;
      }
    } catch {
      // Ignora errori e prova il prossimo candidato
    }
  }

  return "cursive";
}

/**
 * Cache globale del rapporto Jost/Pastor of Muppets
 * Calcolato una volta al primo uso
 */
let cachedJostPastorRatio: number | null = null;
let detectedPastorFontName: string | null = null;

/**
 * Ottiene il rapporto precalcolato tra Jost e Pastor of Muppets
 * Usa cache per evitare ricalcoli
 *
 * IMPORTANTE: Questa funzione deve essere chiamata dopo che i font sono caricati!
 */
export function getJostPastorRatio(): number {
  if (cachedJostPastorRatio === null) {
    // Trova il nome corretto del font
    detectedPastorFontName = findPastorFontName();

    // Calcola il ratio con il nome corretto
    cachedJostPastorRatio = calculateFontRatio(
      "Jost, sans-serif",
      `${detectedPastorFontName}, cursive`,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "hybrid"
    );
  }

  return cachedJostPastorRatio;
}

/**
 * Resetta la cache del rapporto (utile per testing o dopo font load)
 */
export function resetFontRatioCache(): void {
  cachedJostPastorRatio = null;
}
