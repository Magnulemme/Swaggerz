"use client";

import React from "react";
import { Truck, Package, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const shippingFeatures = [
  {
    icon: Truck,
    title: "Spedizione Veloce",
    description: "Consegna in 3-5 giorni lavorativi in tutta Italia",
  },
  {
    icon: Package,
    title: "Packaging Premium",
    description:
      "Ogni prodotto è confezionato con cura e certificato di autenticità",
  },
  {
    icon: Shield,
    title: "Garanzia 100%",
    description: "Reso gratuito entro 30 giorni se non sei soddisfatto",
  },
  {
    icon: Clock,
    title: "Tracking in Tempo Reale",
    description:
      "Monitora la tua spedizione dal momento dell'ordine alla consegna",
  },
];

export default function ShippingInfoSection() {
  return (
    <div className="relative py-8">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent" />

      {/* Infinite Scrolling Banner - Full Width */}
      <div className="relative mb-16 py-6 overflow-hidden w-full">
        {/* Gradient fade on edges */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Duplicate content for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {[...Array(4)].map((_, j) => (
                <React.Fragment key={j}>
                  <div className="flex items-center gap-4">
                    <Truck className="w-8 h-8 text-orange-400 flex-shrink-0" />
                    <span className="text-2xl md:text-3xl font-black text-white font-jost tracking-tight">
                      SPEDIZIONE GRATUITA SEMPRE
                    </span>
                  </div>
                  <span className="text-orange-400 text-2xl">•</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Shipping Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {shippingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mb-3 relative"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-600/20 to-red-500/20 flex items-center justify-center group-hover:from-orange-600/30 group-hover:to-red-500/30 transition-all duration-300">
                    <Icon className="w-7 h-7 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </div>
                </motion.div>
                <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-orange-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
