export interface Collection {
  id: number;
  name: string;
  image: string;
  badge: string;
  description: string;
  price: string;
  category: string;
  stats: {
    items: number;
    floorPrice: string;
    volume24h: string;
    owners: number;
  };
  gallery?: string[];
}

export const collections: Collection[] = [
  {
    id: 1,
    name: "URBAN FLAMES",
    image: "/rebkon-hero-image.jpeg",
    badge: "ULTIMO DROP",
    description: "Streetwear che brucia le strade con energia pura",
    price: "€89 - €159",
    category: "STREETWEAR",
    stats: {
      items: 250,
      floorPrice: "€89",
      volume24h: "€12.5K",
      owners: 183
    },
    gallery: [
      "/rebkon-hero-image.jpeg",
      "/DigitalArtDrop.webp",
      "/VintageDrop.webp"
    ]
  },
  {
    id: 2,
    name: "DIGITAL ART",
    image: "/DigitalArtDrop.webp",
    badge: "LIMITED EDITION",
    description: "Fusione perfetta tra tecnologia e moda urbana",
    price: "€99 - €179",
    category: "TECH WEAR",
    stats: {
      items: 150,
      floorPrice: "€99",
      volume24h: "€18.2K",
      owners: 127
    },
    gallery: [
      "/DigitalArtDrop.webp",
      "/VintageDrop.webp",
      "/rebkon-hero-image.jpeg"
    ]
  },
  {
    id: 3,
    name: "VINTAGE SOUL",
    image: "/VintageDrop.webp",
    badge: "RETRO VIBES",
    description: "Classico rivisitato con stile contemporaneo",
    price: "€79 - €149",
    category: "VINTAGE",
    stats: {
      items: 300,
      floorPrice: "€79",
      volume24h: "€9.8K",
      owners: 241
    },
    gallery: [
      "/VintageDrop.webp",
      "/rebkon-hero-image.jpeg",
      "/DigitalArtDrop.webp"
    ]
  }
];