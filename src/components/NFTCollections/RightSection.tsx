"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Collection } from './types';

interface RightSectionProps {
  collection: Collection;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function RightSection({ collection }: RightSectionProps) {
  return (
    <div className="relative w-full h-full overflow-hidden z-0 rounded-r-3xl">
      <div className="relative z-50 flex flex-col h-full py-8 lg:py-10 gap-5 lg:gap-6 pr-10">

        {/* Image Gallery Grid - Takes remaining space */}
        <div className="relative z-50 flex-1 min-h-0 grid grid-cols-2 gap-4 lg:gap-5">
          {collection.images.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative z-50 w-full h-full min-h-[100px] rounded-lg lg:rounded-xl overflow-hidden border-2 border-zinc-800 group cursor-pointer"

              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >

              <Image
                src={img}
                alt={`${collection.title} ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 relative z-10"
                
              />

              {/* Badge "New" piccolo */}
              <div className="absolute top-2 left-2 z-20 px-2.5 py-1 bg-white rounded-full shadow-lg">
                <span className="text-emerald-600 text-[10px] font-black uppercase tracking-wide">
                  New
                </span>
              </div>

              {/* Overlay scuro on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}