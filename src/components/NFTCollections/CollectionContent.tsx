"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ShaderText from '@/components/ShaderText';
import CollectionBadge from './CollectionBadge';
import CollectionStats from './CollectionStats';
import ShopButton from './ShopButton';
import { Collection } from './types';

interface CollectionContentProps {
  collection: Collection;
}

export default function CollectionContent({ collection }: CollectionContentProps) {
  return (
    <motion.div
      className="flex flex-col justify-center h-full"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <CollectionBadge
        badge={collection.badge}
        badgeColor={collection.badgeColor}
      />

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {collection.title}
        </h2>
        <ShaderText fontSize="48px" fontWeight="900">
          {collection.subtitle}
        </ShaderText>
      </motion.div>

      <motion.p
        className="text-xl text-zinc-300 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {collection.description}
      </motion.p>

      <div className="mb-8">
        <CollectionStats
          price={collection.price}
          pieces={collection.pieces}
          nftLabel={collection.nftLabel}
          badgeColor={collection.badgeColor}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <ShopButton
          badgeColor={collection.badgeColor}
          buttonGradient={collection.buttonGradient}
          buttonHoverColor={collection.buttonHoverColor}
          href={collection.href}
        />
      </motion.div>
    </motion.div>
  );
}
