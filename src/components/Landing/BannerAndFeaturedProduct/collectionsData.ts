import { Collection } from './types';

export const collections: Collection[] = [
  {
    id: 1,
    badge: "Novità",
    badgeColor: "slate",
    title: "Essentials",
    subtitle: "Timeless Basics",
    description: "Capi essenziali senza tempo in design minimalista. Qualità premium e stile versatile per ogni occasione.",
    price: "€59",
    pieces: "200",
    nftLabel: "+ NFT",
    href: "/collection/essentials",
    images: [
      "/mockups/essentials.png",
      "/mockups/essentials.png",
      "/mockups/essentials.png",
      "/mockups/essentials.png"
    ],
    video: "/videos/streetwear.mp4",
    gradientFrom: "slate-500/25",
    gradientVia: "gray-500/15",
    accentGradient: "from-slate-400/10 via-gray-500/12 to-zinc-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#64748b_0%,#111111_50%,#64748b_100%)]",
    buttonHoverColor: "#64748b",
    endDate: "December 31, 2026"
  },
  {
    id: 2,
    badge: "Novità",
    badgeColor: "cyan",
    title: "Generative Art",
    subtitle: "Digital Collection",
    description: "Arte generativa e algoritmica trasformata in streetwear. Design unici creati con intelligenza artificiale.",
    price: "€89",
    pieces: "150",
    nftLabel: "+ NFT",
    href: "/collection/generative-art",
    images: [
      "/mockups/generative.png",
      "/mockups/generative.png",
      "/mockups/generative.png",
      "/mockups/generative.png"
    ],
    video: "/videos/collezionabili.mp4",
    gradientFrom: "cyan-500/25",
    gradientVia: "blue-500/15",
    accentGradient: "from-cyan-400/10 via-blue-500/12 to-sky-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#111111_50%,#06b6d4_100%)]",
    buttonHoverColor: "#06b6d4",
    endDate: "June 30, 2026"
  },
  {
    id: 3,
    badge: "Novità",
    badgeColor: "orange",
    title: "Retrò",
    subtitle: "Vintage Collection",
    description: "Nostalgia vintage incontra lo streetwear moderno. Grafiche anni '80 e '90 reinterpretate in chiave contemporanea.",
    price: "€79",
    pieces: "180",
    nftLabel: "+ NFT",
    href: "/collection/retro",
    images: [
      "/mockups/retro.png",
      "/mockups/retro.png",
      "/mockups/retro.png",
      "/mockups/retro.png"
    ],
    video: "/videos/art.mp4",
    gradientFrom: "orange-500/25",
    gradientVia: "amber-500/15",
    accentGradient: "from-orange-400/10 via-amber-500/12 to-yellow-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#f97316_0%,#111111_50%,#f97316_100%)]",
    buttonHoverColor: "#f97316",
    endDate: "October 31, 2026"
  }
];
