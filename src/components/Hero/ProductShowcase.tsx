"use client"

import React from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&h=1000&fit=crop&q=80",
    title: "Luxury Sneakers",
    category: "Footwear",
    price: "€450"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop&q=80",
    title: "Designer Watch",
    category: "Accessories",
    price: "€1,200"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=1000&fit=crop&q=80",
    title: "Leather Jacket",
    category: "Outerwear",
    price: "€890"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80",
    title: "Premium Sunglasses",
    category: "Accessories",
    price: "€320"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop&q=80",
    title: "Minimalist Bag",
    category: "Bags",
    price: "€650"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=1000&fit=crop&q=80",
    title: "Statement Ring",
    category: "Jewelry",
    price: "€280"
  }
];

const ProductShowcase = () => {
  return (
    <div className="w-full bg-black rounded-3xl overflow-hidden border border-zinc-800/50">
      {/* Header */}
      <div className="px-6 lg:px-8 py-6 border-b border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">
              Featured Collection
            </h2>
            <p className="text-zinc-400 text-sm">
              Curated selection of premium pieces
            </p>
          </div>
          <button className="hidden md:flex px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-sm font-medium transition-colors border border-zinc-700/50">
            View All
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative aspect-[3/4] rounded-xl lg:rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info - Always visible on mobile, hover on desktop */}
              <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-white">
                  <p className="text-[10px] lg:text-xs text-zinc-300 mb-0.5 lg:mb-1 uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-semibold text-xs lg:text-sm mb-0.5 lg:mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-yellow-500 font-bold text-xs lg:text-sm">{product.price}</p>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-yellow-500/0 group-hover:border-yellow-500/40 rounded-xl lg:rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 lg:px-8 py-4 lg:py-6 border-t border-zinc-800/50 bg-zinc-950/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 text-xs lg:text-sm">
            New arrivals every week
          </p>
          <button className="md:hidden w-full px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-sm font-medium transition-colors border border-zinc-700/50">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;