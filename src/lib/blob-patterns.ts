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
  // Hue rotation durante lo scroll (in gradi)
  hueRotateKeyframes: number[];
  hueRotateProgress: number[];
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
  // BLOB 1 - "Il Danzatore Sinistro" - ARANCIONE CALDO
  // Parte da sinistra, attraversa rapidamente il centro, arriva a destra
  // ========================================
  {
    topKeyframes: [8, 25, 28, 30, 35, 30, 40],
    leftKeyframes: [-35, 15, 15, 8, 75, 82, 88],
    scrollProgress: [0, 0.3, 0.42, 0.48, 0.68, 0.82, 1],
    opacityKeyframes: [0.3, 0.35, 0.38, 0.4, 0.35, 0.15, 0],
    opacityProgress: [0, 0.2, 0.4, 0.6, 0.75, 0.9, 1],
    scaleKeyframes: [1.0, 1.15, 1.2, 1.25, 1.15, 1.0],
    scaleProgress: [0, 0.15, 0.4, 0.6, 0.8, 1],
    hueRotateKeyframes: [0, 15, 30, 20, 10, 0],
    hueRotateProgress: [0, 0.25, 0.5, 0.75, 0.9, 1],
    size: { mobile: 320, desktop: 550 },
    blur: { mobile: 70, desktop: 110 },
    gradient: "from-orange-400 via-orange-500 to-red-500",
    animationClasses: "animate-blob animation-delay-1000",
  },

  // ========================================
  // BLOB 2 - "Il Danzatore Destro" - ROSSO VIBRANTE
  // Parte da destra, attraversa rapidamente il centro, arriva a sinistra
  // ========================================
  {
    topKeyframes: [58, 70, 72, 73, 75, 78, 72],
    leftKeyframes: [92, 78, 58, 82, 25, 12, 0],
    scrollProgress: [0, 0.25, 0.38, 0.44, 0.62, 0.8, 1],
    opacityKeyframes: [0.32, 0.38, 0.4, 0.42, 0.38, 0.18, 0],
    opacityProgress: [0, 0.2, 0.4, 0.6, 0.75, 0.9, 1],
    scaleKeyframes: [1.05, 1.18, 1.22, 1.28, 1.18, 1.05],
    scaleProgress: [0, 0.15, 0.4, 0.6, 0.8, 1],
    hueRotateKeyframes: [0, -10, -20, -15, -5, 0],
    hueRotateProgress: [0, 0.25, 0.5, 0.75, 0.9, 1],
    size: { mobile: 340, desktop: 600 },
    blur: { mobile: 75, desktop: 120 },
    gradient: "from-red-400 via-red-500 to-red-600",
    animationClasses: "animate-blob animation-delay-1500",
  },
];
