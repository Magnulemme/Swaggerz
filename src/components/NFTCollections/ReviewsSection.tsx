"use client";

import { Star } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const reviews = [
  {
    name: "Marco R.",
    quote:
      "⭐⭐⭐⭐⭐ Qualità incredibile! Il design NFT stampato sulla felpa è perfetto. Essere l'unico proprietario è un'esperienza unica.",
    title: "2 giorni fa",
  },
  {
    name: "Sofia L.",
    quote:
      "⭐⭐⭐⭐⭐ Spedizione velocissima e packaging curato. La maglietta è ancora più bella dal vivo. Consiglio a tutti!",
    title: "1 settimana fa",
  },
  {
    name: "Luca M.",
    quote:
      "⭐⭐⭐⭐⭐ Il concetto NFT + streetwear è geniale. Finalmente un modo per mostrare la mia collezione digitale nel mondo reale.",
    title: "2 settimane fa",
  },
  {
    name: "Giulia T.",
    quote:
      "⭐⭐⭐⭐⭐ Materiali di prima qualità e stampa perfetta. Ho ricevuto tantissimi complimenti per la mia felpa esclusiva!",
    title: "3 settimane fa",
  },
  {
    name: "Alessandro P.",
    quote:
      "⭐⭐⭐⭐⭐ Servizio clienti impeccabile e prodotto top. La certificazione NFT rende tutto ancora più speciale.",
    title: "1 mese fa",
  },
  {
    name: "Chiara B.",
    quote:
      "⭐⭐⭐⭐⭐ Finalmente qualcosa di diverso! L'idea di possedere un NFT fisico è fantastica. Lo consiglio a tutti i crypto-enthusiast.",
    title: "1 mese fa",
  },
  {
    name: "Davide F.",
    quote:
      "⭐⭐⭐⭐⭐ Packaging curatissimo e prodotto arrivato in tempo record. La qualità della stampa supera le aspettative!",
    title: "1 mese fa",
  },
  {
    name: "Martina C.",
    quote:
      "⭐⭐⭐⭐⭐ Adoro il fatto che il mio design sia unico al mondo. La qualità del tessuto è fantastica e super comodo!",
    title: "2 mesi fa",
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
            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-zinc-400 text-lg">
          4.9/5 stelle - Oltre 500 recensioni verificate
        </p>
      </div>

      {/* Reviews Infinite Scroll */}
      <InfiniteMovingCards
        items={reviews}
        direction="right"
        speed="slow"
        pauseOnHover={true}
      />
    </div>
  );
}
