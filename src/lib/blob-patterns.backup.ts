// Pattern di movimento per i blob - completamente indipendenti e asimmetrici
// Ogni blob ha la sua personalità e danza liberamente attraverso lo schermo

export interface BlobPattern {
  // Posizioni verticali durante lo scroll (in percentuale)
  topKeyframes: number[];
  // Posizioni orizzontali durante lo scroll (in percentuale)
  leftKeyframes: number[];
  // Progressi dello scroll per le keyframes
  scrollProgress: number[];
  // Opacità durante lo scroll
  opacityKeyframes: number[];
  opacityProgress: number[];
  // Scale durante lo scroll
  scaleKeyframes: number[];
  scaleProgress: number[];
  // Dimensioni base
  size: { mobile: number; desktop: number };
  // Blur
  blur: { mobile: number; desktop: number };
  // Gradiente di colore
  gradient: string;
  // Classi di animazione aggiuntive
  animationClasses: string;
}

export const blobPatterns: BlobPattern[] = [
  // ========================================
  // BLOB 1 - "Il Viaggiatore Folle" - ARANCIONE CALDO
  // ========================================
  {
    topKeyframes: [5, 60, 20, 75, 15, 85, 40, 10, 90],
    leftKeyframes: [-20, 5, 40, -5, 70, 20, 95, 50, 110],
    scrollProgress: [0, 0.08, 0.19, 0.32, 0.48, 0.61, 0.75, 0.88, 1],
    opacityKeyframes: [0.3, 0.6, 0.45, 0.7, 0.5, 0.65, 0.45, 0.6, 0.25],
    opacityProgress: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.82, 0.92, 1],
    scaleKeyframes: [0.8, 1.5, 0.9, 1.7, 1.1, 1.6, 1.0, 1.4, 0.85],
    scaleProgress: [0, 0.12, 0.27, 0.43, 0.58, 0.72, 0.84, 0.93, 1],
    size: { mobile: 280, desktop: 520 },
    blur: { mobile: 70, desktop: 120 },
    gradient: "from-orange-400 via-orange-500 to-red-500",
    animationClasses: "animate-blob animation-delay-1000",
  },

  // ========================================
  // BLOB 2 - "L'Ubriaco" - GIALLO INTENSO
  // ========================================
  {
    topKeyframes: [80, 30, 70, 10, 85, 50, 20, 65, 15, 75],
    leftKeyframes: [-10, 45, 10, 60, 25, 75, 40, 15, 70, 35],
    scrollProgress: [0, 0.07, 0.16, 0.28, 0.41, 0.54, 0.66, 0.78, 0.89, 1],
    opacityKeyframes: [0.4, 0.7, 0.5, 0.75, 0.55, 0.65, 0.6, 0.7, 0.5, 0.3],
    opacityProgress: [0, 0.09, 0.21, 0.35, 0.48, 0.61, 0.73, 0.84, 0.93, 1],
    scaleKeyframes: [1.0, 1.4, 1.6, 1.1, 1.5, 0.9, 1.45, 1.2, 1.55, 1.0],
    scaleProgress: [0, 0.11, 0.24, 0.38, 0.51, 0.64, 0.75, 0.85, 0.94, 1],
    size: { mobile: 160, desktop: 340 },
    blur: { mobile: 50, desktop: 85 },
    gradient: "from-yellow-400 via-yellow-500 to-orange-400",
    animationClasses: "animate-blob-fast animation-delay-3500",
  },

  // ========================================
  // BLOB 3 - "Il Saltatore" - ROSSO VIBRANTE
  // ========================================
  {
    topKeyframes: [50, 10, 70, 25, 90, 40, 15, 80, 35],
    leftKeyframes: [-15, 10, 5, 20, -5, 25, 15, -10, 18],
    scrollProgress: [0, 0.13, 0.26, 0.39, 0.53, 0.66, 0.78, 0.9, 1],
    opacityKeyframes: [0.45, 0.65, 0.55, 0.75, 0.5, 0.7, 0.6, 0.65, 0.35],
    opacityProgress: [0, 0.14, 0.29, 0.44, 0.58, 0.71, 0.83, 0.92, 1],
    scaleKeyframes: [0.95, 1.6, 1.05, 1.5, 1.3, 0.85, 1.65, 1.15, 1.1],
    scaleProgress: [0, 0.15, 0.3, 0.45, 0.59, 0.72, 0.84, 0.93, 1],
    size: { mobile: 240, desktop: 460 },
    blur: { mobile: 65, desktop: 110 },
    gradient: "from-red-400 via-red-500 to-red-600",
    animationClasses: "animate-blob animation-delay-2000",
  },

  // ========================================
  // BLOB 4 - "Il Tornado" - ARANCIONE BRUCIATO
  // ========================================
  {
    topKeyframes: [12, 65, 20, 80, 35, 90, 50, 10, 95],
    leftKeyframes: [100, 60, 90, 40, 75, 25, 60, 85, -15],
    scrollProgress: [0, 0.09, 0.21, 0.35, 0.49, 0.62, 0.74, 0.86, 1],
    opacityKeyframes: [0.4, 0.7, 0.55, 0.75, 0.6, 0.65, 0.7, 0.55, 0.25],
    opacityProgress: [0, 0.12, 0.26, 0.41, 0.55, 0.68, 0.8, 0.91, 1],
    scaleKeyframes: [1.0, 1.55, 1.2, 1.65, 1.3, 0.9, 1.6, 1.25, 0.95],
    scaleProgress: [0, 0.14, 0.29, 0.44, 0.58, 0.71, 0.82, 0.92, 1],
    size: { mobile: 320, desktop: 580 },
    blur: { mobile: 75, desktop: 130 },
    gradient: "from-orange-500 via-red-500 to-red-600",
    animationClasses: "animate-blob animation-delay-1500",
  },

  // ========================================
  // BLOB 5 - "Lo Spirito Pazzo" - GIALLO DORATO
  // ========================================
  {
    topKeyframes: [25, 70, 15, 85, 40, 90, 55, 10, 75, 30],
    leftKeyframes: [95, 55, 80, 30, 65, 15, 75, 45, 85, 60],
    scrollProgress: [0, 0.08, 0.18, 0.3, 0.43, 0.56, 0.68, 0.79, 0.9, 1],
    opacityKeyframes: [0.5, 0.75, 0.55, 0.8, 0.6, 0.65, 0.75, 0.6, 0.7, 0.3],
    opacityProgress: [0, 0.1, 0.23, 0.37, 0.5, 0.63, 0.75, 0.85, 0.93, 1],
    scaleKeyframes: [0.95, 1.45, 1.7, 1.15, 1.6, 1.1, 1.5, 1.3, 1.4, 1.05],
    scaleProgress: [0, 0.12, 0.26, 0.4, 0.53, 0.65, 0.76, 0.86, 0.94, 1],
    size: { mobile: 180, desktop: 370 },
    blur: { mobile: 55, desktop: 90 },
    gradient: "from-yellow-300 via-yellow-400 to-orange-400",
    animationClasses: "animate-blob-fast animation-delay-4000",
  },

  // ========================================
  // BLOB 6 - "L'Impazzito Destro" - ROSSO SCARLATTO
  // ========================================
  {
    topKeyframes: [60, 15, 80, 10, 90, 35, 75, 25, 88],
    leftKeyframes: [88, 98, 75, 95, 70, 90, 65, 85, 92],
    scrollProgress: [0, 0.12, 0.25, 0.39, 0.53, 0.66, 0.78, 0.9, 1],
    opacityKeyframes: [0.55, 0.7, 0.8, 0.6, 0.75, 0.65, 0.7, 0.6, 0.35],
    opacityProgress: [0, 0.13, 0.28, 0.43, 0.57, 0.7, 0.82, 0.92, 1],
    scaleKeyframes: [1.15, 1.4, 1.65, 1.05, 1.55, 1.2, 1.5, 1.3, 0.95],
    scaleProgress: [0, 0.15, 0.31, 0.46, 0.6, 0.73, 0.84, 0.93, 1],
    size: { mobile: 200, desktop: 420 },
    blur: { mobile: 60, desktop: 100 },
    gradient: "from-red-500 via-red-600 to-orange-600",
    animationClasses: "animate-blob animation-delay-2500",
  },

  // ========================================
  // BLOB 7 - "Il Pazzo del Basso" - ARANCIONE SOLE
  // ========================================
  {
    topKeyframes: [70, 95, 60, 85, 55, 98, 75, 90, 65],
    leftKeyframes: [10, 50, 75, 25, 85, 15, 60, 35, 70],
    scrollProgress: [0, 0.11, 0.24, 0.38, 0.52, 0.65, 0.77, 0.89, 1],
    opacityKeyframes: [0.4, 0.65, 0.75, 0.55, 0.7, 0.6, 0.7, 0.65, 0.4],
    opacityProgress: [0, 0.13, 0.27, 0.42, 0.56, 0.69, 0.81, 0.91, 1],
    scaleKeyframes: [0.9, 1.55, 1.15, 1.5, 1.3, 1.0, 1.6, 1.25, 1.1],
    scaleProgress: [0, 0.15, 0.3, 0.45, 0.59, 0.72, 0.83, 0.92, 1],
    size: { mobile: 140, desktop: 300 },
    blur: { mobile: 45, desktop: 75 },
    gradient: "from-orange-300 via-orange-400 to-yellow-400",
    animationClasses: "animate-blob-fast animation-delay-3000",
  },

  // ========================================
  // BLOB 8 - "L'Anarchico Centrale" (solo desktop) - ROSSO FUOCO
  // ========================================
  {
    topKeyframes: [30, 75, 20, 85, 45, 70, 25, 80, 35],
    leftKeyframes: [40, 70, 30, 65, 25, 75, 50, 60, 45],
    scrollProgress: [0, 0.12, 0.25, 0.39, 0.53, 0.66, 0.78, 0.9, 1],
    opacityKeyframes: [0.4, 0.6, 0.7, 0.5, 0.65, 0.55, 0.65, 0.6, 0.35],
    opacityProgress: [0, 0.13, 0.28, 0.43, 0.57, 0.7, 0.82, 0.92, 1],
    scaleKeyframes: [1.1, 1.45, 1.65, 1.2, 1.5, 1.3, 1.55, 1.35, 1.05],
    scaleProgress: [0, 0.15, 0.31, 0.46, 0.6, 0.73, 0.84, 0.93, 1],
    size: { mobile: 0, desktop: 480 },
    blur: { mobile: 0, desktop: 115 },
    gradient: "from-red-400 via-orange-500 to-yellow-500",
    animationClasses: "animate-blob animation-delay-1800",
  },
];
