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
  AUTOPLAY_INTERVAL: 5000, // ms - Time between auto transitions (5s = 1.5s transition + 3.5s pause)
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
    image: "/felpa.jpg",
    label: "Felpe",
    description:
      "Comfort e stile si incontrano. Dalle hoodie oversize ai crewneck essenziali, trova la felpa perfetta per il tuo look",
    nickname: "Il Comfort",
    emoji: "🔥",
    badge: "hot",
    itemCount: 42,
  },
  {
    id: 1,
    image: "/mockups/essentials.png",
    label: "T-Shirt",
    description:
      "Essenziali ma mai banali. Grafiche bold, fit perfetto e cotone premium per tee che fanno la differenza",
    nickname: "L'Essential",
    emoji: "⚡",
    itemCount: 67,
  },
  {
    id: 2,
    image: "/mockups/retro.png",
    label: "Pantaloni",
    description:
      "Dal cargo streetwear ai jogger tech. Ogni pantalone è progettato per movimento, comfort e attitudine",
    nickname: "Il Dynamic",
    emoji: "💨",
    badge: "new",
    itemCount: 38,
  },
  {
    id: 3,
    image: "/giubbotto.jpg",
    label: "Giubbotti",
    description:
      "Statement piece che completa ogni outfit. Bomber, denim jacket e puffer per affrontare la città con stile",
    nickname: "L'Icon",
    emoji: "🧥",
    badge: "exclusive",
    itemCount: 29,
  },
  {
    id: 4,
    image: "/mockups/generative.png",
    label: "Accessori",
    description:
      "I dettagli che fanno la differenza. Cappelli, borse e accessori per elevare ogni look streetwear",
    nickname: "Il Detail",
    emoji: "🎒",
    itemCount: 53,
  },
];
