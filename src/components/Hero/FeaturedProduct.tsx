"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import StarRating from "@/components/ui/StarRating";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Oversized Hoodie",
    description:
      "Comfort estremo con design urban. Perfetto per ogni stagione.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: 2,
    name: "Cargo Pants Premium",
    description: "Stile e funzionalità in un unico capo. Multiple tasche.",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop",
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 3,
    name: "Vintage Tee",
    description: "Design esclusivo su cotone premium. Limited edition.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop",
    rating: 4.7,
    reviewCount: 89,
  },
];

export default function FeaturedProduct() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = () => swiperInstance?.slidePrev();
  const scrollNext = () => swiperInstance?.slideNext();

  const currentProduct = featuredProducts[selectedIndex];

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-3xl border border-zinc-700/50 bg-black overflow-hidden group/slider">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Swiper Carousel Container */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
        className="h-full"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            {/* Responsive Layout: Vertical on mobile, Horizontal on md+ */}
            <div className="relative h-full flex flex-col md:flex-row p-6 gap-4 md:gap-6">
                {/* Product Image */}
                <div className="relative w-full md:w-[50%] xl:w-[55%] flex-1 md:flex-none md:h-full min-h-[150px]">
                  <motion.div
                    className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-transparent rounded-2xl blur-xl -z-10"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Image */}
                    <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800/60">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="relative w-full md:w-[50%] xl:w-[45%] flex flex-col justify-center gap-3 md:gap-4 xl:gap-5">
                  {/* Eyebrow */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <span className="inline-flex items-center gap-2 text-xs xl:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      <span className="w-1 h-3 xl:h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
                      Scelti per Te da Swaggerz
                    </span>
                  </motion.div>

                  {/* Title, Description & Price */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col items-start gap-3">
                      {/* Product Title */}
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-black text-white font-jost leading-tight tracking-tight">
                          {product.name}
                        </h3>
                      </motion.div>

                      {/* Price */}
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl md:text-2xl xl:text-3xl font-black text-white font-jost">
                            €{product.price}
                          </span>
                        </div>
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                      >
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                          {product.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Rating & CTA Row */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-4 pt-2 border-t border-zinc-800/50"
                  >
                    {/* Rating */}
                    <StarRating
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      size="sm"
                      textClassName="text-zinc-300"
                      starClassName="fill-amber-500 text-amber-500"
                    />

                    {/* CTA Button */}
                    <motion.button
                      className="group/btn inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Aggiungi al Carrello</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
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
                    </motion.button>
                  </motion.div>
                </div>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows - Visible only on hover */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/60 flex items-center justify-center text-white hover:bg-amber-500 hover:border-amber-500 hover:scale-110 transition-all duration-300 shadow-lg opacity-0 group-hover/slider:opacity-100"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/60 flex items-center justify-center text-white hover:bg-amber-500 hover:border-amber-500 hover:scale-110 transition-all duration-300 shadow-lg opacity-0 group-hover/slider:opacity-100"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Dots Indicator - Visible only on hover */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperInstance?.slideToLoop(index)}
            className={`transition-all duration-300 rounded-full ${
              index === selectedIndex
                ? "w-8 h-2 bg-amber-500"
                : "w-2 h-2 bg-zinc-600 hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
    </div>
  );
}
