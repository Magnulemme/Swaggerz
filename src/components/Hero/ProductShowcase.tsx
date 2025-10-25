"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating";
import useEmblaCarousel from "embla-carousel-react";

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
}

interface Collection {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
}

const collections: Collection[] = [
  {
    id: "trending",
    title: "Di Tendenza",
    subtitle: "Scopri i capi più trend del momento",
    products: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&h=1000&fit=crop&q=80",
        title: "Luxury Sneakers",
        category: "Footwear",
        price: "€450",
        rating: 4.9,
        reviewCount: 156,
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop&q=80",
        title: "Designer Watch",
        category: "Accessories",
        price: "€1,200",
        rating: 4.7,
        reviewCount: 82,
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=1000&fit=crop&q=80",
        title: "Leather Jacket",
        category: "Outerwear",
        price: "€890",
        rating: 4.8,
        reviewCount: 134,
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80",
        title: "Premium Sunglasses",
        category: "Accessories",
        price: "€320",
        rating: 4.6,
        reviewCount: 93,
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop&q=80",
        title: "Minimalist Bag",
        category: "Bags",
        price: "€650",
        rating: 4.9,
        reviewCount: 201,
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=1000&fit=crop&q=80",
        title: "Statement Ring",
        category: "Jewelry",
        price: "€280",
        rating: 4.7,
        reviewCount: 67,
      },
    ],
  },
  {
    id: "bestsellers",
    title: "Più Venduti",
    subtitle: "I prodotti preferiti dai nostri clienti",
    products: [
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop&q=80",
        title: "Classic Hoodie",
        category: "Streetwear",
        price: "€120",
        rating: 4.9,
        reviewCount: 342,
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop&q=80",
        title: "Cargo Pants",
        category: "Bottoms",
        price: "€180",
        rating: 4.8,
        reviewCount: 287,
      },
      {
        id: 9,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop&q=80",
        title: "Limited Edition Sneakers",
        category: "Footwear",
        price: "€350",
        rating: 5.0,
        reviewCount: 198,
      },
      {
        id: 10,
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&q=80",
        title: "Baseball Cap",
        category: "Accessories",
        price: "€45",
        rating: 4.7,
        reviewCount: 421,
      },
      {
        id: 11,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&q=80",
        title: "Bomber Jacket",
        category: "Outerwear",
        price: "€280",
        rating: 4.9,
        reviewCount: 165,
      },
      {
        id: 12,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop&q=80",
        title: "Crossbody Bag",
        category: "Bags",
        price: "€95",
        rating: 4.6,
        reviewCount: 234,
      },
    ],
  },
  {
    id: "recommended",
    title: "Consigliati per Te",
    subtitle: "Selezionati in base ai tuoi gusti",
    products: [
      {
        id: 13,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop&q=80",
        title: "Oversized Tee",
        category: "T-Shirts",
        price: "€65",
        rating: 4.8,
        reviewCount: 156,
      },
      {
        id: 14,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop&q=80",
        title: "Track Pants",
        category: "Bottoms",
        price: "€110",
        rating: 4.7,
        reviewCount: 98,
      },
      {
        id: 15,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=1000&fit=crop&q=80",
        title: "High-Top Sneakers",
        category: "Footwear",
        price: "€220",
        rating: 4.9,
        reviewCount: 176,
      },
      {
        id: 16,
        image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=1000&fit=crop&q=80",
        title: "Chain Necklace",
        category: "Jewelry",
        price: "€85",
        rating: 4.6,
        reviewCount: 112,
      },
      {
        id: 17,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80",
        title: "Aviator Sunglasses",
        category: "Accessories",
        price: "€150",
        rating: 4.8,
        reviewCount: 203,
      },
      {
        id: 18,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&q=80",
        title: "Backpack",
        category: "Bags",
        price: "€175",
        rating: 4.9,
        reviewCount: 145,
      },
    ],
  },
];

const ProductShowcase = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const currentCollection = collections[selectedIndex];

  return (
    <div className="relative w-full bg-black rounded-3xl overflow-hidden border border-zinc-700/50">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-orange-500/8 to-red-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header with Tabs */}
      <div className="relative px-6 lg:px-8 pt-6 lg:pt-8 pb-4 lg:pb-6 border-b border-zinc-800/50">
        <div className="flex flex-col gap-4">
          {/* Title & Subtitle - Fixed */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-1 font-jost tracking-tight uppercase">
              Nuova Collezione
            </h2>
            <p className="text-zinc-400 text-sm">
              Esplora la nostra selezione curata
            </p>
          </div>

          {/* Tabs - Pills style */}
          <div className="flex flex-wrap gap-2">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                onClick={() => scrollTo(index)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedIndex === index
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200"
                }`}
              >
                {collection.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {collections.map((collection) => (
            <div key={collection.id} className="flex-[0_0_100%] min-w-0">
              {/* Product Grid */}
              <div className="relative px-6 lg:px-8 py-6 lg:py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
                  {collection.products.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 lg:mb-4 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute -inset-1 bg-gradient-to-t from-amber-500/0 group-hover:from-amber-500/20 via-transparent to-transparent rounded-2xl blur-xl transition-all duration-300 -z-10" />

                        {/* Category Tag */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 bg-black/70 backdrop-blur-sm text-amber-400 text-[10px] lg:text-xs font-semibold uppercase tracking-wider rounded-full border border-amber-500/20">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-sm lg:text-base text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 font-jost">
                          {product.title}
                        </h3>
                        <p className="text-white font-semibold text-base lg:text-lg font-jost">
                          {product.price}
                        </p>
                        <StarRating
                          rating={product.rating}
                          reviewCount={product.reviewCount}
                          size="sm"
                          showValue={true}
                          textClassName="text-zinc-400"
                          starClassName="fill-amber-500 text-amber-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="relative px-6 lg:px-8 py-4 lg:py-6 border-t border-zinc-800/50 bg-zinc-950/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 text-xs lg:text-sm">
            Nuovi arrivi ogni settimana
          </p>
          <button className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors group">
            <span>Vedi Tutti</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
    </div>
  );
};

export default ProductShowcase;
