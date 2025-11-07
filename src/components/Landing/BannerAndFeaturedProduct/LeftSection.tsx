import { motion } from "framer-motion";
import { Collection } from "./types";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import CollaborationHeader from "./CollaborationHeader";
import CollectionInfo from "./CollectionInfo";
import CollectionGallery from "./CollectionGallery";

interface LeftSectionProps {
  collection: Collection;
}

export default function LeftSection({ collection }: LeftSectionProps) {
  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Main Content Grid */}
      <div className="relative flex-1 grid grid-rows-[auto_auto_1fr] lg:grid-rows-[auto_auto_1fr_auto] px-4 md:px-6 lg:px-10 pt-6 md:pt-8 pb-6 lg:pb-8 gap-3 md:gap-4 lg:gap-5 z-50 min-h-0">
        {/* 1. Collaboration Header + Limited Edition Tag */}
        <div className="flex items-start justify-between gap-2 md:gap-3 lg:gap-4 pb-3 md:pb-5">
          <CollaborationHeader
            brand1={{
              name: "Swaggerz",
              letter: "S",
              bgColor: "#ffffff",
              textColor: "#f59e0b",
            }}
            brand2={{
              name: "Rebkon",
              letter: "R",
              bgColor: "#f59e0b",
              textColor: "#ffffff",
              verified: true,
            }}
          />

          {/* Limited Edition Tag with Shimmer */}
          <div className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 flex-shrink-0">
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 z-0 rounded-full"
              animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(251, 191, 36, 0.6) 50%, transparent 70%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />
            <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full px-3 md:px-4 py-1 bg-zinc-950 backdrop-blur-sm">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-amber-400">
                Limited
              </span>
            </span>
          </div>
        </div>

        {/* 2. Collection Info */}
        <CollectionInfo
          title={collection.title}
          description="Un'esclusiva fusione tra street culture italiana e design contemporaneo. Ogni pezzo racconta la visione unica di Rebkon: graffiti urbani incontrano l'eleganza dello streetwear premium. Una collezione limitata che celebra l'autenticità dell'arte di strada."
        />

        {/* 3. Gallery Grid - Takes remaining space */}
        <div className="min-h-0">
          <CollectionGallery
            images={collection.images}
            title={collection.title}
            price={collection.price}
            pieces={collection.pieces}
          />
        </div>

        {/* 4. Footer - CTA and End Date - Solo da lg+ */}
        <div className="hidden lg:flex flex-col items-center gap-5 lg:gap-6 pt-2 lg:pt-4">
          {/* End Date - Typography Style */}
          {collection.endDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 mb-0.5">
                Available Until
              </p>
              <p className="text-sm font-bold text-zinc-300 tracking-wide">
                {collection.endDate}
              </p>
            </motion.div>
          )}

          <AnimatedButton as="button" size="md">
            Explore Collection
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
