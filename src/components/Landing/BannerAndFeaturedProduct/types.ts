export interface Collection {
  id: number;
  badge: string;
  badgeColor: "emerald" | "cyan" | "orange" | "purple" | "slate";
  title: string;
  subtitle: string;
  description: string;
  price: string;
  pieces: string;
  nftLabel: string;
  href: string;
  images: string[];
  video?: string; // Optional video URL for featured content
  gradientFrom: string;
  gradientVia: string;
  accentGradient: string;
  buttonGradient: string;
  buttonHoverColor: string;
  endDate?: string; // Optional end date for collaboration (e.g., "December 31, 2025")
}
