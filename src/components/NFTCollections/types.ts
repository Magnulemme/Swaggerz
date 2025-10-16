export interface Collection {
  id: number;
  badge: string;
  badgeColor: "emerald" | "cyan" | "orange" | "purple";
  title: string;
  subtitle: string;
  description: string;
  price: string;
  pieces: string;
  nftLabel: string;
  href: string;
  images: string[];
  gradientFrom: string;
  gradientVia: string;
  accentGradient: string;
  buttonGradient: string;
  buttonHoverColor: string;
}
