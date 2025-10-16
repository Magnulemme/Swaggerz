"use client";

import { useState, useMemo } from "react";
import Card, { CardProps } from "@/components/Card";
import { Search, Filter, Grid, List } from "lucide-react";

export interface NFTGridProps {
  items: CardProps[];
  title?: string;
  subtitle?: string;
}

const categories = [
  "Tutti",
  "Di Tendenza",
  "Più Venduti",
  "Nuovi Arrivi",
  "Collezioni Esclusive",
  "Street Art"
];

const sortOptions = [
  { label: "Più Recenti", value: "newest" },
  { label: "Prezzo: Dal Basso", value: "price-low" },
  { label: "Prezzo: Dall'Alto", value: "price-high" },
  { label: "Più Popolari", value: "popular" }
];

export default function NFTGrid({ items, title = "Collezione Completa", subtitle }: NFTGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filtri e ordinamento
  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "Tutti" ||
                             item.title.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    // Ordinamento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          const priceA = parseFloat(a.price?.toString().replace(/[^\d.]/g, '') || '0');
          const priceB = parseFloat(b.price?.toString().replace(/[^\d.]/g, '') || '0');
          return priceA - priceB;
        case "price-high":
          const priceA2 = parseFloat(a.price?.toString().replace(/[^\d.]/g, '') || '0');
          const priceB2 = parseFloat(b.price?.toString().replace(/[^\d.]/g, '') || '0');
          return priceB2 - priceA2;
        case "popular":
          return Math.random() - 0.5; // Random per demo
        case "newest":
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 font-jost">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black opacity-90" />
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/3 to-orange-500/3 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">

        {/* Header */}
        <div className="text-center mb-12">
          {/* Top indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-red-500 to-orange-500"></div>
            <span className="text-zinc-400 tracking-[0.25em] uppercase text-xs font-medium">
              Full Collection
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-red-500 to-orange-500"></div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          {subtitle && (
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="mt-6 text-zinc-500">
            <span className="font-medium text-orange-500">{filteredAndSortedItems.length}</span> NFT trovati
          </div>
        </div>

        {/* Controls */}
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-700/50 p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Cerca NFT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filter Toggle Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-zinc-600 bg-zinc-800/50 text-white rounded-xl hover:bg-zinc-700/50 transition-colors"
            >
              <Filter size={18} />
              Filtri
            </button>

            {/* Desktop Controls */}
            <div className={`flex flex-col lg:flex-row gap-4 items-start lg:items-center w-full lg:w-auto ${showFilters ? 'block' : 'hidden lg:flex'}`}>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-zinc-800/50 text-white min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-zinc-800 text-white">{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-zinc-800/50 text-white min-w-[150px]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-zinc-800 text-white">{option.label}</option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex border border-zinc-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white"}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white"}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">Nessun NFT trovato</h3>
            <p className="text-zinc-400">Prova a modificare i filtri di ricerca</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          } mb-16`}>
            {filteredAndSortedItems.map((item, index) => (
              <div key={index} className={viewMode === "list" ? "max-w-none" : ""}>
                <Card {...item} />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (per future implementazioni) */}
        {filteredAndSortedItems.length > 0 && (
          <div className="text-center pb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] transition-all duration-300">
              Carica Altri NFT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}