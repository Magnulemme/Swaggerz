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

  console.log("🎨 Canvas measurement:", {
    fontString,
    appliedFont: ctx.font, // Questo mostra cosa il browser ha effettivamente applicato
    testText: testText.substring(0, 20),
  });

  const metrics = ctx.measureText(testText);

  const result = {
    width: metrics.width,
    height:
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    actualBoundingBoxAscent: metrics.actualBoundingBoxAscent,
    actualBoundingBoxDescent: metrics.actualBoundingBoxDescent,
  };

  console.log("📏 Canvas metrics:", result);

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
  console.log("🎨 SVG measurement starting:", {
    fontFamily,
    fontSize,
    testText: testText.substring(0, 20),
  });

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

  // Verifica computed style
  const computed = window.getComputedStyle(text);
  console.log("🔍 SVG computed font:", {
    requestedFamily: fontFamily,
    computedFamily: computed.fontFamily,
    fontSize: computed.fontSize,
    fontWeight: computed.fontWeight,
  });

  const bbox = text.getBBox();
  document.body.removeChild(svg);

  const result = {
    width: bbox.width,
    height: bbox.height,
  };

  console.log("📏 SVG metrics:", result);

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
    console.log("🔬 calculateFontRatio: Starting...", {
      referenceFont,
      targetFont,
      testText: testText.substring(0, 20) + "...",
      method,
    });

    if (method === "canvas") {
      const refMeasurement = measureFontWithCanvas(referenceFont, 100, testText);
      const targetMeasurement = measureFontWithCanvas(targetFont, 100, testText);
      const ratio = refMeasurement.width / targetMeasurement.width;

      console.log("📊 Canvas method result:", {
        refWidth: refMeasurement.width,
        targetWidth: targetMeasurement.width,
        ratio,
      });

      return ratio;
    }

    if (method === "svg") {
      const refMeasurement = measureFontWithSVG(referenceFont, 100, testText);
      const targetMeasurement = measureFontWithSVG(targetFont, 100, testText);
      const ratio = refMeasurement.width / targetMeasurement.width;

      console.log("📊 SVG method result:", {
        refWidth: refMeasurement.width,
        targetWidth: targetMeasurement.width,
        ratio,
      });

      return ratio;
    }

    // Hybrid: media pesata (Canvas 60%, SVG 40%)
    // Canvas è più veloce, SVG più accurato per decorazioni
    console.log("🔬 Using hybrid method (Canvas 60% + SVG 40%)...");

    const refCanvas = measureFontWithCanvas(referenceFont, 100, testText);
    const targetCanvas = measureFontWithCanvas(targetFont, 100, testText);
    const ratioCanvas = refCanvas.width / targetCanvas.width;

    console.log("📊 Canvas measurements:", {
      refWidth: refCanvas.width,
      targetWidth: targetCanvas.width,
      ratio: ratioCanvas,
    });

    const refSVG = measureFontWithSVG(referenceFont, 100, testText);
    const targetSVG = measureFontWithSVG(targetFont, 100, testText);
    const ratioSVG = refSVG.width / targetSVG.width;

    console.log("📊 SVG measurements:", {
      refWidth: refSVG.width,
      targetWidth: targetSVG.width,
      ratio: ratioSVG,
    });

    const finalRatio = ratioCanvas * 0.6 + ratioSVG * 0.4;

    console.log("✅ Hybrid ratio calculated:", {
      canvasRatio: ratioCanvas.toFixed(3),
      svgRatio: ratioSVG.toFixed(3),
      finalRatio: finalRatio.toFixed(3),
      formula: `${ratioCanvas.toFixed(3)} × 0.6 + ${ratioSVG.toFixed(3)} × 0.4 = ${finalRatio.toFixed(3)}`,
    });

    return finalRatio;
  } catch (error) {
    console.error("❌ Error calculating font ratio:", error);
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

  console.log("🔍 Testing Pastor font name candidates...");

  // Misura con fallback cursive come baseline
  const cursiveWidth = measureFontWithCanvas("cursive", 100, testText).width;
  console.log("📏 Cursive (fallback) width:", cursiveWidth);

  // Prova ogni candidato e cerca uno con width diversa da cursive
  for (const name of candidateNames) {
    try {
      const measurement = measureFontWithCanvas(`${name}, cursive`, 100, testText);
      console.log(`📏 Testing "${name}":`, measurement.width);

      // Se la width è significativamente diversa dal fallback, abbiamo trovato il font!
      const difference = Math.abs(measurement.width - cursiveWidth);
      if (difference > 50) { // Tolleranza di 50px su 100px font size
        console.log(`✅ Found working font name: "${name}" (difference: ${difference.toFixed(1)}px)`);
        return name;
      }
    } catch (error) {
      console.warn(`❌ Error testing "${name}":`, error);
    }
  }

  console.warn("⚠️ Could not find Pastor font, using cursive fallback");
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
    console.log("🎯 getJostPastorRatio: First call, calculating ratio...");

    // Trova il nome corretto del font
    detectedPastorFontName = findPastorFontName();
    console.log("🎨 Using Pastor font name:", detectedPastorFontName);

    // Calcola il ratio con il nome corretto
    cachedJostPastorRatio = calculateFontRatio(
      "Jost, sans-serif",
      `${detectedPastorFontName}, cursive`,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "hybrid"
    );

    console.log("✅ Font ratio cached (Jost/Pastor):", {
      ratio: cachedJostPastorRatio,
      meaning: `Pastor needs to be ${cachedJostPastorRatio.toFixed(2)}× ${cachedJostPastorRatio > 1 ? "LARGER" : "smaller"} than Jost`,
      warning: cachedJostPastorRatio > 3 ? "⚠️ Ratio seems too high! Font probably not loaded correctly." : "✅ Ratio seems reasonable",
    });
  } else {
    console.log("💾 getJostPastorRatio: Using cached ratio:", cachedJostPastorRatio);
  }

  return cachedJostPastorRatio;
}

/**
 * Resetta la cache del rapporto (utile per testing o dopo font load)
 */
export function resetFontRatioCache(): void {
  cachedJostPastorRatio = null;
}
