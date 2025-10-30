"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Urban Flame Hoodie",
    category: "Felpe",
    price: "€129",
    image: "/rebkon-hero-image.jpeg"
  },
  {
    id: 2,
    name: "Digital Tech Jacket",
    category: "Giubbotti",
    price: "€179",
    image: "/DigitalArtDrop.webp"
  },
  {
    id: 3,
    name: "Vintage Soul Tee",
    category: "T-Shirt",
    price: "€79",
    image: "/VintageDrop.webp"
  }
];

/**
 * Compact product showcase for hero column
 */
export default function ProductShowcaseColumn() {
  return (
    <div className="relative h-full rounded-3xl border border-zinc-700/50 bg-black overflow-hidden group">
      {/* Header */}
      <div className="relative px-6 py-5 border-b border-zinc-700/50">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white font-bold text-xl mb-1">
            Featured Products
          </h3>
          <p className="text-zinc-400 text-sm">
            Latest drops from our collection
          </p>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="relative p-4 space-y-4">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="relative flex gap-4 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group/item"
          >
            {/* Product Image */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover/item:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-purple-400 text-xs font-semibold uppercase tracking-wide mb-0.5">
                {product.category}
              </p>
              <h4 className="text-white font-bold text-sm mb-1 truncate group-hover/item:text-purple-200 transition-colors">
                {product.name}
              </h4>
              <p className="text-zinc-300 font-bold text-base">
                {product.price}
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="flex-shrink-0 flex items-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="relative px-6 pb-6">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 backdrop-blur-sm border border-purple-400/40 hover:border-purple-300/60 rounded-xl text-purple-200 hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
        >
          View All Products
        </motion.button>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent pointer-events-none" />
    </div>
  );
}
