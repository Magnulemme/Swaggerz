"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { SectionTitle } from "../SectionTitle";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
  colors?: string[]; // Colori disponibili (hex)
  sizes?: string[]; // Taglie disponibili
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
        image:
          "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&h=1000&fit=crop&q=80",
        title: "Luxury Sneakers",
        category: "Footwear",
        price: "€450",
        rating: 4.9,
        reviewCount: 156,
        colors: ["#FFFFFF", "#000000", "#DC2626"],
        sizes: ["39", "40", "41", "42", "43", "44"],
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop&q=80",
        title: "Designer Watch",
        category: "Accessories",
        price: "€1,200",
        rating: 4.7,
        reviewCount: 82,
        colors: ["#C0C0C0", "#FFD700", "#1C1C1C"],
        sizes: ["S", "M", "L"],
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=1000&fit=crop&q=80",
        title: "Leather Jacket",
        category: "Outerwear",
        price: "€890",
        rating: 4.8,
        reviewCount: 134,
        colors: ["#000000", "#8B4513", "#2C3E50"],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80",
        title: "Premium Sunglasses",
        category: "Accessories",
        price: "€320",
        rating: 4.6,
        reviewCount: 93,
        colors: ["#000000", "#FFD700", "#8B4513"],
        sizes: ["Unica"],
      },
      {
        id: 5,
        image:
          "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop&q=80",
        title: "Minimalist Bag",
        category: "Bags",
        price: "€650",
        rating: 4.9,
        reviewCount: 201,
        colors: ["#000000", "#A0826D", "#FFFFFF"],
        sizes: ["Unica"],
      },
      {
        id: 6,
        image:
          "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=1000&fit=crop&q=80",
        title: "Statement Ring",
        category: "Jewelry",
        price: "€280",
        rating: 4.7,
        reviewCount: 67,
        colors: ["#FFD700", "#C0C0C0", "#CD7F32"],
        sizes: ["XS", "S", "M", "L"],
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
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop&q=80",
        title: "Classic Hoodie",
        category: "Streetwear",
        price: "€120",
        rating: 4.9,
        reviewCount: 342,
      },
      {
        id: 8,
        image:
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop&q=80",
        title: "Cargo Pants",
        category: "Bottoms",
        price: "€180",
        rating: 4.8,
        reviewCount: 287,
      },
      {
        id: 9,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop&q=80",
        title: "Limited Edition Sneakers",
        category: "Footwear",
        price: "€350",
        rating: 5.0,
        reviewCount: 198,
      },
      {
        id: 10,
        image:
          "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&q=80",
        title: "Baseball Cap",
        category: "Accessories",
        price: "€45",
        rating: 4.7,
        reviewCount: 421,
      },
      {
        id: 11,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&q=80",
        title: "Bomber Jacket",
        category: "Outerwear",
        price: "€280",
        rating: 4.9,
        reviewCount: 165,
      },
      {
        id: 12,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop&q=80",
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
        image:
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop&q=80",
        title: "Oversized Tee",
        category: "T-Shirts",
        price: "€65",
        rating: 4.8,
        reviewCount: 156,
      },
      {
        id: 14,
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop&q=80",
        title: "Track Pants",
        category: "Bottoms",
        price: "€110",
        rating: 4.7,
        reviewCount: 98,
      },
      {
        id: 15,
        image:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=1000&fit=crop&q=80",
        title: "High-Top Sneakers",
        category: "Footwear",
        price: "€220",
        rating: 4.9,
        reviewCount: 176,
      },
      {
        id: 16,
        image:
          "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=1000&fit=crop&q=80",
        title: "Chain Necklace",
        category: "Jewelry",
        price: "€85",
        rating: 4.6,
        reviewCount: 112,
      },
      {
        id: 17,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80",
        title: "Aviator Sunglasses",
        category: "Accessories",
        price: "€150",
        rating: 4.8,
        reviewCount: 20,
      },
      {
        id: 18,
        image:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&q=80",
        title: "Backpack",
        category: "Bags",
        price: "€175",
        rating: 4.9,
        reviewCount: 145,
      },
    ],
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-xs lg:mb-sm bg-gradient-to-br from-zinc-900 to-zinc-950 border border-light-subtle">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Product Info */}
      <div className="space-y-2xs">
        <h3 className="font-bold text-sm lg:text-base text-light transition-colors duration-300 line-clamp-2 font-jost">
          {product.title}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <p className="text-light-secondary font-semibold text-base lg:text-lg font-jost">
            {product.price}
          </p>

          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-light-subtle/30"
                  style={{ backgroundColor: color }}
                  title={`Colore ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Available Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.sizes.map((size, index) => (
              <span
                key={index}
                className="text-light-tertiary text-xs font-jost"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  // Show products from the first collection (Di Tendenza) - 1 row on desktop
  const products = collections[0].products;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = () => swiperInstance?.slidePrev();
  const scrollNext = () => swiperInstance?.slideNext();

  return (
    <div className="w-full pb-xl relative z-50 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
      {/* Section Title */}
      <SectionTitle
        eyebrow="Collezione 2025"
        title="Streetwear"
        shaderText="Essentials"
        description="Scopri le categorie, le nostre collezioni e le collaborazioni esclusive"
        size="lg"
      />
      {/* Product Slider - Desktop only, Grid on mobile */}
      <div className="mb-lg md:mb-xl">
        {/* Mobile: Grid with Stagger Animation */}
        <motion.div
          className="grid grid-cols-2 gap-sm md:hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.once}
        >
          {products.slice(0, 4).map((product) => (
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop: Slider */}
        <div className="hidden md:block relative">
          {/* Navigation Arrows - Top Right */}
          <div className="absolute -top-xl right-0 z-20 flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="flex group p-2.5 rounded-full items-center justify-center border border-light-subtle/20 hover:border-brand transition-all duration-300 bg-dark-elevated/80 backdrop-blur-sm cursor-pointer shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous products"
            >
              <svg
                className="w-4 h-4 text-light group-hover:text-brand transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="flex group p-2.5 rounded-full items-center justify-center border border-light-subtle/20 hover:border-brand transition-all duration-300 bg-dark-elevated/80 backdrop-blur-sm cursor-pointer shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next products"
            >
              <svg
                className="w-4 h-4 text-light group-hover:text-brand transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.once}
          >
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 24 },
                1536: { slidesPerView: 6, spaceBetween: 24 },
              }}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => {
                setCanScrollPrev(!swiper.isBeginning);
                setCanScrollNext(!swiper.isEnd);
              }}
              onInit={(swiper) => {
                setCanScrollPrev(!swiper.isBeginning);
                setCanScrollNext(!swiper.isEnd);
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <motion.div variants={staggerItem}>
                    <ProductCard product={product} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <a
          href="/products"
          className="group inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-brand hover:gap-2.5 transition-all duration-300 cursor-pointer"
        >
          <span>Vedi Tutti i Prodotti</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProductShowcase;
