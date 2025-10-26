/**
 * SWAGGERZ DESIGN TOKENS
 *
 * Questo file contiene tutti i valori standardizzati per spacing, typography,
 * colors, shadows, borders e altri elementi del design system.
 *
 * Usa questi token per mantenere coerenza visiva in tutto il sito.
 */

// ============================================================================
// SPACING SCALE
// ============================================================================
export const spacing = {
  // Base spacing values
  '2xs': '0.25rem', // 4px  - Spaziature micro, gap tight
  xs: '0.5rem',     // 8px  - Spaziature minime
  sm: '0.75rem',    // 12px - Spaziature piccole
  md: '1rem',       // 16px - Spaziature base
  lg: '1.5rem',     // 24px - Spaziature medie
  xl: '2rem',       // 32px - Spaziature larghe
  '2xl': '2.5rem',  // 40px - Spaziature extra larghe
  '3xl': '3rem',    // 48px - Spaziature molto larghe
  '4xl': '4rem',    // 64px - Section spacing
  '5xl': '5rem',    // 80px - Large section spacing
  '6xl': '6rem',    // 96px - Hero spacing
} as const;

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================
export const typography = {
  // Font sizes semantici
  sizes: {
    caption: '0.75rem',      // 12px - Testo piccolo, note
    small: '0.875rem',       // 14px - Testo secondario
    body: '1rem',            // 16px - Testo principale
    'body-lg': '1.125rem',   // 18px - Testo enfatizzato
    description: '0.875rem',  // 14px - Descrizioni prodotti
    label: '0.875rem',        // 14px - Labels form
    subheader: '1.25rem',     // 20px - Sottotitoli
    header: '1.5rem',         // 24px - Titoli sezioni
    'header-lg': '1.875rem',  // 30px - Titoli grandi
    display: '2.25rem',       // 36px - Display text
    'display-lg': '3rem',     // 48px - Hero titles
    'display-xl': '3.75rem',  // 60px - Large hero
    'display-2xl': '4.5rem',  // 72px - Extra large hero
  },

  // Line heights
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Font weights
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================
export const radius = {
  none: '0',
  sm: '0.375rem',   // 6px - Small elements
  md: '0.5rem',     // 8px - Inputs, small cards
  lg: '0.75rem',    // 12px - Buttons, medium cards
  xl: '1rem',       // 16px - Cards, panels
  '2xl': '1.25rem', // 20px - Large cards
  '3xl': '1.75rem', // 28px - Featured sections
  '4xl': '2rem',    // 32px - Hero sections
  full: '9999px',   // Circular elements
} as const;

// ============================================================================
// SHADOWS
// ============================================================================
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow: '0 0 20px rgb(255 255 255 / 0.1)',
  'glow-lg': '0 0 40px rgb(255 255 255 / 0.15)',
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================
export const containers = {
  sm: '640px',   // Small container (forms, narrow content)
  md: '768px',   // Medium container
  lg: '1024px',  // Large container
  xl: '1280px',  // Extra large container
  '2xl': '1536px', // 2XL container
  full: '100%',  // Full width
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================
export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

export const easings = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS (per reference)
// ============================================================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// SEMANTIC SPACING PRESETS
// ============================================================================
export const spacingPresets = {
  // Padding presets per tipologia di componente
  card: {
    sm: spacing.md,      // 16px
    md: spacing.lg,      // 24px
    lg: spacing.xl,      // 32px
  },

  section: {
    mobile: spacing.md,     // 16px
    tablet: spacing.lg,     // 24px
    desktop: spacing['3xl'], // 48px
  },

  container: {
    mobile: spacing.md,     // 16px
    tablet: spacing.xl,     // 32px
    desktop: spacing['3xl'], // 48px
  },

  // Gap presets per layout
  stack: {
    tight: spacing.xs,   // 8px
    normal: spacing.sm,  // 12px
    relaxed: spacing.md, // 16px
    loose: spacing.lg,   // 24px
  },

  grid: {
    tight: spacing.md,   // 16px
    normal: spacing.lg,  // 24px
    relaxed: spacing.xl, // 32px
  },
} as const;

// ============================================================================
// COMPONENT SIZING
// ============================================================================
export const componentSizes = {
  // Button sizes
  button: {
    sm: { px: spacing.md, py: spacing.xs, text: typography.sizes.small },
    md: { px: spacing.lg, py: spacing.sm, text: typography.sizes.body },
    lg: { px: spacing.xl, py: spacing.md, text: typography.sizes['body-lg'] },
  },

  // Icon sizes
  icon: {
    xs: '1rem',    // 16px
    sm: '1.25rem', // 20px
    md: '1.5rem',  // 24px
    lg: '2rem',    // 32px
    xl: '2.5rem',  // 40px
  },

  // Input heights
  input: {
    sm: '2.5rem',  // 40px
    md: '3rem',    // 48px
    lg: '3.5rem',  // 56px
  },
} as const;

// ============================================================================
// EXPORT TYPES (per TypeScript)
// ============================================================================
export type SpacingKey = keyof typeof spacing;
export type TypographySizeKey = keyof typeof typography.sizes;
export type RadiusKey = keyof typeof radius;
export type ShadowKey = keyof typeof shadows;
export type ContainerKey = keyof typeof containers;
