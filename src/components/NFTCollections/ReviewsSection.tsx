"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const reviews = [
  {
    id: 1,
    name: "Marco R.",
    rating: 5,
    comment: "Qualità incredibile! Il design NFT stampato sulla felpa è perfetto. Essere l'unico proprietario è un'esperienza unica.",
    date: "2 giorni fa",
  },
  {
    id: 2,
    name: "Sofia L.",
    rating: 5,
    comment: "Spedizione velocissima e packaging curato. La maglietta è ancora più bella dal vivo. Consiglio a tutti!",
    date: "1 settimana fa",
  },
  {
    id: 3,
    name: "Luca M.",
    rating: 5,
    comment: "Il concetto NFT + streetwear è geniale. Finalmente un modo per mostrare la mia collezione digitale nel mondo reale.",
    date: "2 settimane fa",
  },
  {
    id: 4,
    name: "Giulia T.",
    rating: 5,
    comment: "Materiali di prima qualità e stampa perfetta. Ho ricevuto tantissimi complimenti per la mia felpa esclusiva!",
    date: "3 settimane fa",
  },
  {
    id: 5,
    name: "Alessandro P.",
    rating: 5,
    comment: "Servizio clienti impeccabile e prodotto top. La certificazione NFT rende tutto ancora più speciale.",
    date: "1 mese fa",
  },
  {
    id: 6,
    name: "Chiara B.",
    rating: 5,
    comment: "Finalmente qualcosa di diverso! L'idea di possedere un NFT fisico è fantastica. Lo consiglio a tutti i crypto-enthusiast.",
    date: "1 mese fa",
  },
  {
    id: 7,
    name: "Davide F.",
    rating: 5,
    comment: "Packaging curatissimo e prodotto arrivato in tempo record. La qualità della stampa supera le aspettative!",
    date: "1 mese fa",
  },
  {
    id: 8,
    name: "Martina C.",
    rating: 5,
    comment: "Adoro il fatto che il mio design sia unico al mondo. La qualità del tessuto è fantastica e super comodo!",
    date: "2 mesi fa",
  },
];

export default function ReviewsSection() {
  return (
    <div className="mb-20">
      {/* Title Section - With Container */}
      <div className="text-center mb-12 max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 font-jost tracking-tight">
          Cosa Dicono i Nostri Clienti
        </h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-6 h-6 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="text-zinc-400 text-lg">
          4.9/5 stelle - Oltre 500 recensioni verificate
        </p>
      </div>

      {/* Reviews Scroll - Full Width with Auto-scroll */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient fade on edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 py-4"
          animate={{
            x: ["-50%", 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Duplicate reviews for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              {reviews.map((review) => (
                <div
                  key={`${setIndex}-${review.id}`}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 w-[320px] min-w-[320px] flex-shrink-0"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-zinc-300 mb-4 leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <p className="text-white font-semibold">{review.name}</p>
                    <p className="text-zinc-500 text-sm">{review.date}</p>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
