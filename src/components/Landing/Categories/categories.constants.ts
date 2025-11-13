// Type definitions
export interface ImageConfig {
  url: string;
  alt: string;
  description?: string;
  price?: string;
  nickname?: string;
  emoji?: string;
  badge?: "hot" | "sale" | "new" | "exclusive";
  aspectRatio?: number;
  soldCount?: number;
  popularityLabel?: string;
}

export interface CategoryCard {
  id: number;
  image: string;
  label: string;
  description?: string;
  nickname?: string;
  emoji?: string;
  badge?: "hot" | "sale" | "new" | "exclusive";
  itemCount?: number;
}

// Carousel animation constants
export const CAROUSEL_TIMINGS = {
  TRANSITION_DURATION: 1400, // ms - Card transition duration
  AUTOPLAY_INTERVAL: 4000, // ms - Time between auto transitions
  TEXT_ENTER_DURATION: 0.8, // seconds - Title slide in duration
  TEXT_EXIT_DURATION: 0.6, // seconds - Title slide out duration
  TEXT_INITIAL_DELAY: 0.6, // seconds - Delay before text starts entering
  CHAR_STAGGER_DELAY: 0.02, // seconds - Delay between each character
} as const;

export const CAROUSEL_EASING = "cubic-bezier(0.65, 0, 0.35, 1)" as const;

// Default images configuration (for future use)
export const DEFAULT_IMAGES: ImageConfig[] = [
  {
    url: "/felpa.jpg",
    alt: "Felpe",
    description:
      "Quando il comfort incontra l'attitudine. Perfette per chi non scende a compromessi",
    nickname: "Le Swag",
    emoji: "✨",
    badge: "hot",
    aspectRatio: 5 / 6,
  },
  {
    url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=960&fit=crop",
    alt: "Pantaloni",
    description:
      "L'energia della strada in ogni movimento. Progettati per chi vive al massimo",
    nickname: "Gli Hype",
    emoji: "⚡",
    aspectRatio: 5 / 6,
  },
  {
    url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=960&fit=crop",
    alt: "T-shirt",
    description:
      "Essenziali ma mai banali. L'equilibrio perfetto tra semplicità e carattere",
    nickname: "Le Cool",
    emoji: "🌟",
    badge: "new",
    aspectRatio: 5 / 6,
  },
  {
    url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=960&fit=crop",
    alt: "Giubbotti",
    description:
      "L'eleganza incontra la strada. Statement piece che completa ogni outfit",
    nickname: "I Glamour",
    emoji: "👑",
    aspectRatio: 5 / 6,
  },
];

// Active category cards (currently used in carousel)
export const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 0,
    image: "/mockups/generative.png",
    label: "Digital Art",
    description:
      "Esplora l'arte digitale del futuro. Design generativi e pattern unici che ridefiniscono lo streetwear",
    nickname: "Il Futuristico",
    emoji: "🎨",
    badge: "new",
    itemCount: 24,
  },
  {
    id: 1,
    image: "/mockups/retro.png",
    label: "Retro Style",
    description:
      "Viaggia nel tempo con i nostri design vintage. L'estetica degli anni '80 e '90 reinterpretata per oggi",
    nickname: "Il Nostalgico",
    emoji: "📼",
    badge: "hot",
    itemCount: 18,
  },
  {
    id: 2,
    image: "/mockups/essentials.png",
    label: "Essential",
    description:
      "Minimalismo che parla. Pezzi essenziali che non passano mai di moda, perfetti per ogni occasione",
    nickname: "Il Minimal",
    emoji: "⚡",
    itemCount: 32,
  },
  {
    id: 3,
    image: "/giubbotto.jpg",
    label: "Street Wear",
    description:
      "L'energia della strada in ogni capo. Urban style autentico per chi vive la città al massimo",
    nickname: "L'Urbano",
    emoji: "🔥",
    badge: "hot",
    itemCount: 27,
  },
  {
    id: 4,
    image: "/felpa.jpg",
    label: "Premium",
    description:
      "Lusso incontra streetwear. Materiali premium e design esclusivi per chi non scende a compromessi",
    nickname: "L'Esclusivo",
    emoji: "👑",
    badge: "exclusive",
    itemCount: 15,
  },
];
