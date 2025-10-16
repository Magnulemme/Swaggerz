"use client";

import React from 'react';
import Image from 'next/image';
import CircularGallery from './Hero/CircularGallery';

interface Card {
  id: number;
  image: string;
  title: string;
}

interface FeaturedArtistProps {
  name?: string;
  avatar?: string;
  verified?: boolean;
  followers?: string;
  backgroundImage?: string;
  galleryCards?: Card[];
}

export default function FeaturedArtist({
  name = "Beeple",
  avatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  verified = true,
  followers = "2.1M",
  backgroundImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop",
  galleryCards
}: FeaturedArtistProps) {
  return (
    <div className="relative h-full min-h-[200px] rounded-3xl border border-zinc-700/50 overflow-hidden group hover:border-purple-500/50 transition-all duration-500 flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Artist background"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        {/* Purple accent overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content - Header Section */}
      <div className="relative flex-shrink-0 px-8 lg:px-10 py-6 lg:py-8">
        <div className="flex items-center gap-5 lg:gap-7 w-full">
          {/* Avatar with enhanced glow */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-purple-500/40 rounded-full blur-2xl group-hover:blur-3xl group-hover:bg-purple-400/50 transition-all duration-500" />
            <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-3 border-purple-500/60 group-hover:border-purple-400 transition-all duration-300 shadow-xl">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {verified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Artist Info */}
          <div className="flex-1 min-w-0">
            <div className="space-y-1.5">
              <div>
                <p className="text-purple-300 text-[10px] lg:text-xs font-semibold uppercase tracking-wider mb-0.5">
                  Featured Artist
                </p>
                <h3 className="text-white font-bold text-xl lg:text-2xl group-hover:text-purple-200 transition-colors duration-300 truncate">
                  {name}
                </h3>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm lg:text-base font-bold">{followers}</span>
                  <span className="text-xs text-zinc-400">followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex flex-shrink-0">
            <button className="px-5 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 backdrop-blur-sm border border-purple-400/40 hover:border-purple-300/60 rounded-xl text-purple-200 hover:text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Circular Gallery Section */}
      {galleryCards && galleryCards.length > 0 && (
        <div className="relative flex-1 min-h-[200px]">
          <CircularGallery cards={galleryCards} />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
