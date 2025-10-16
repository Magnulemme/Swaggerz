"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Share2, ArrowRight } from "lucide-react";

export interface CardProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  price?: string | number;
  href?: string;
  badgeText?: string;
  originalPrice?: string | number;
  isNew?: boolean;
}

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt = "",
  price,
  href = "/#",
  badgeText,
  originalPrice,
  isNew = false,
}: CardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="relative flex flex-col overflow-hidden min-w-[200px] bg-white border border-zinc-200 hover:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl h-full">
      
      {/* Immagine */}
      <div className="relative w-full aspect-square overflow-hidden">
        {(badgeText || isNew) && (
          <div className="absolute left-4 top-4 z-20 flex gap-2">
            {isNew && (
              <span className="px-3 py-1 text-xs font-semibold text-white uppercase bg-gradient-to-r from-red-500 to-orange-500 rounded-md shadow-sm">
                Nuovo
              </span>
            )}
            {badgeText && (
              <span className="px-3 py-1 text-xs font-semibold text-white uppercase bg-gradient-to-r from-orange-500 to-yellow-500 rounded-md shadow-sm">
                {badgeText}
              </span>
            )}
          </div>
        )}

        {/* Cuore con stato like */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white/80 text-zinc-500 hover:text-red-500 hover:border-red-400 transition-colors duration-200 cursor-pointer"
        >
          <Heart
            size={18}
            className={`transition-colors duration-200 ${
              liked ? "text-transparent fill-[url(#heart-gradient)]" : ""
            }`}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
        </button>

        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Contenuto */}
      <div className="flex flex-col flex-grow p-6 cursor-default">
        <h3 className="text-lg font-bold text-zinc-900 font-jost line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="text-zinc-600 text-sm font-jost line-clamp-2 leading-relaxed mt-1 mb-2">
            {description}
          </p>
        )}

        {/* Spacer per far spingere il prezzo in basso */}
        <div className="flex flex-col mt-auto space-y-3">
          {price !== undefined && (
            <div className="flex items-baseline gap-3 cursor-default">
              <span className="text-xl font-bold text-zinc-900 font-jost">
                {typeof price === "number" ? `€${price.toFixed(2)}` : price}
              </span>
              {originalPrice && (
                <span className="text-zinc-400 font-jost line-through text-sm">
                  {typeof originalPrice === "number"
                    ? `€${originalPrice.toFixed(2)}`
                    : originalPrice}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <Link href={href} className="relative w-full group cursor-pointer">
            <div className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 p-[1px] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20">
              <div className="rounded-xl relative flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                <span className="relative z-10 text-zinc-700 group-hover:text-white font-semibold text-sm transition-colors duration-300 delay-150 cursor-pointer">
                  Scopri di più
                </span>
                <ArrowRight
                  size={16}
                  className="relative z-10 text-zinc-700 group-hover:text-white transition-all duration-300 delay-150 group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>

          {/* Condividi */}
          <div className="flex items-center justify-end pt-2">
            <button className="flex items-center gap-2 text-sm text-zinc-500 font-jost transition-colors duration-200 hover:text-orange-500 cursor-pointer">
              <Share2 size={16} />
              Condividi
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
