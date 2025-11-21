/**
 * Framer Motion Animation System
 *
 * Sistema minimal di animazioni per Swaggerz.
 * Le animazioni sono sottili e funzionali, non invasive.
 *
 * Usage:
 * <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
 *   Content
 * </motion.div>
 */

import { Variants } from "framer-motion";

// ==============================================
// TIMING & EASING
// ==============================================

export const timing = {
  fast: 0.3,    // Micro-interactions
  base: 0.5,    // Standard animations
  slow: 0.7,    // Dramatic reveals
} as const;

// Custom easing curve (smooth, natural)
export const easing = [0.6, 0.05, 0.01, 0.9];

// Spring configs
export const spring = {
  soft: { type: "spring" as const, stiffness: 100, damping: 15 },
  bouncy: { type: "spring" as const, stiffness: 200, damping: 10 },
} as const;

// ==============================================
// CORE ANIMATIONS
// ==============================================

/**
 * Fade In Up - Elemento appare dal basso con fade
 * Uso: Sezioni, testi, contenuti generici
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.base,
      ease: easing,
    },
  },
};

/**
 * Fade In Up (Subtle) - Versione più sottile
 * Uso: Elementi secondari, quando fadeInUp è troppo
 */
export const fadeInUpSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.fast,
      ease: easing,
    },
  },
};

/**
 * Fade In - Solo fade, no movement
 * Uso: Overlay, modali, quando non serve movimento
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: timing.base,
    },
  },
};

/**
 * Scale In - Elemento "cresce" apparendo
 * Uso: Cards, immagini, elementi che appaiono
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: timing.base,
      ease: easing,
    },
  },
};

// ==============================================
// TEXT ANIMATIONS
// ==============================================

/**
 * Wave Text - Character-by-character wave effect
 * Uso: Con AnimatedText component
 */
export const waveText: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },
};

/**
 * Wave Text (Subtle) - Versione più delicata
 */
export const waveTextSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

// ==============================================
// STAGGER CONTAINERS
// ==============================================

/**
 * Stagger Container - Container per animare figli in sequenza
 * Uso: Wrap attorno a lista di cards/items
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay tra ogni figlio
      delayChildren: 0.1,   // Delay prima di iniziare
    },
  },
};

/**
 * Stagger Container (Fast) - Stagger più rapido
 * Uso: Quando hai molti elementi o vuoi effetto più rapido
 */
export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger Item - Item figlio del container
 * Uso: Singolo elemento dentro staggerContainer
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.fast,
    },
  },
};

// ==============================================
// PAGE TRANSITIONS
// ==============================================

/**
 * Page Transition - Transizione tra pagine
 * Uso: Layout principale con AnimatePresence
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.base,
      ease: easing,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: timing.fast,
    },
  },
};

// ==============================================
// VIEWPORT CONFIG
// ==============================================

/**
 * Viewport defaults per whileInView
 *
 * Usage:
 * <motion.div whileInView="visible" viewport={viewport.once}>
 */
export const viewport = {
  // Trigger una volta sola (default consigliato)
  // Più conservativo - parte solo quando l'elemento è veramente visibile
  once: {
    once: true,
    amount: 0.2, // Trigger quando 20% è visibile (più tollerante)
    margin: "0px 0px 0px 0px", // No margin - parte quando effettivamente visibile
  },

  // Trigger ogni volta che entra nel viewport
  repeat: {
    once: false,
    amount: 0.2,
    margin: "0px 0px 0px 0px",
  },

  // Trigger quando completamente visibile
  full: {
    once: true,
    amount: 0.8, // 80% visibile
    margin: "0px 0px 0px 0px",
  },

  // Trigger anticipato - per elementi che vuoi animare prima
  early: {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px", // Inizia 100px prima
  },
} as const;

// ==============================================
// ACCESSIBILITY
// ==============================================

/**
 * Reduced Motion Variants
 * Rispetta prefers-reduced-motion
 *
 * Usage:
 * const shouldReduceMotion = useReducedMotion()
 * <motion.div variants={shouldReduceMotion ? reducedMotionVariants : fadeInUp}>
 */
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

// ==============================================
// UTILITIES
// ==============================================

/**
 * Delay helper - Aggiunge delay custom a variant
 *
 * Usage:
 * <motion.div variants={withDelay(fadeInUp, 0.2)}>
 */
export function withDelay(variant: Variants, delay: number): Variants {
  return {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...(variant.visible as any).transition,
        delay,
      },
    },
  };
}

/**
 * Combine variants - Combina più variants
 *
 * Usage:
 * <motion.div variants={combine(fadeIn, slideUp)}>
 */
export function combine(...variants: Variants[]): Variants {
  return variants.reduce((acc, curr) => ({
    hidden: { ...acc.hidden, ...curr.hidden },
    visible: { ...acc.visible, ...curr.visible },
  }), { hidden: {}, visible: {} });
}
