"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarActionsProps {
  cartCount?: number;
  scrolled?: boolean;
}

export default function NavbarActions({
  cartCount = 0,
  scrolled = false,
}: NavbarActionsProps) {
  return (
    <div className="hidden md:flex items-center gap-sm">
      {/* Search */}
      <button
        className={`group relative p-sm rounded-full flex items-center justify-center border border-white/10 hover:border-brand/40 transition-all duration-500 ${
          scrolled ? "bg-orange-500/15" : "bg-black"
        }`}
      >
        <Search className="size-icon text-light group-hover:text-brand transition-all duration-500" />
      </button>

      {/* Account */}
      <Link
        href="/sign-in"
        className={`group relative p-sm rounded-full flex items-center justify-center border border-white/10 hover:border-brand/40 transition-all duration-500 ${
          scrolled ? "bg-orange-500/15" : "bg-black"
        }`}
      >
        <User className="size-icon text-light group-hover:text-brand transition-all duration-500" />
      </Link>

      {/* Cart - Special CTA with animated border */}
      <motion.button
        className="relative inline-flex overflow-hidden rounded-full p-[1px] transition-all duration-500"
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated rotating gradient border */}
        <span
          className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] transition-all duration-500 ${
            scrolled
              ? "bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#27272a_50%,#ffffff_100%)]"
              : "bg-[conic-gradient(from_90deg_at_50%_50%,#d37918_0%,#111111_50%,#d37918_100%)]"
          }`}
        />

        <span className="inline-flex h-full w-full items-center justify-center rounded-full px-md py-sm gap-xs backdrop-blur-3xl relative bg-black">
          {/* Layer arancione on scroll */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              scrolled ? "bg-orange-500/15" : "bg-transparent"
            }`}
          ></span>

          {/* Contenuto sopra i layer */}
          <ShoppingBag className="size-icon text-brand relative z-10" />
          <span className="text-sm font-semibold text-light relative z-10">
            Cart
          </span>
          {cartCount > 0 && (
            <span
              className={`flex size-icon items-center justify-center rounded-full text-xs font-bold relative z-10 transition-all duration-500 ${
                scrolled
                  ? "bg-white text-orange-500"
                  : "bg-brand text-light border border-white"
              }`}
            >
              {cartCount}
            </span>
          )}
        </span>
      </motion.button>
    </div>
  );
}
