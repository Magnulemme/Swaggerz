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
        className={`group relative p-sm rounded-full flex items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 ${
          scrolled ? "bg-orange-500/15" : "bg-dark-elevated"
        }`}
      >
        <Search className="size-icon text-light-primary group-hover:text-brand transition-all duration-500" />
      </button>

      {/* Account */}
      <Link
        href="/sign-in"
        className={`group relative p-sm rounded-full flex items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 ${
          scrolled ? "bg-orange-500/15" : "bg-dark-elevated"
        }`}
      >
        <User className="size-icon text-light-primary group-hover:text-brand transition-all duration-500" />
      </Link>

      {/* Cart - Special CTA with animated border */}
      <motion.button
        className="relative inline-flex overflow-hidden rounded-full p-[1px] transition-all duration-500"
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated rotating gradient border */}
        <span
          className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] transition-all duration-500 bg-[conic-gradient(from_90deg_at_50%_50%,#f97316_0%,#18181b_50%,#f97316_100%)]`}
        />

        <span className="inline-flex h-full w-full items-center justify-center rounded-full px-md py-sm gap-xs backdrop-blur-3xl relative bg-dark-elevated">
          {/* Layer arancione on scroll */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              scrolled ? "bg-orange-500/15" : "bg-transparent"
            }`}
          ></span>

          {/* Contenuto sopra i layer */}
          <ShoppingBag className="size-icon text-brand relative z-10" />
          <span className="text-sm font-semibold text-light-primary relative z-10">
            Cart
          </span>
          {cartCount > 0 && (
            <span className="flex size-icon items-center justify-center rounded-full text-xs font-bold relative z-10 bg-brand text-white-primary">
              {cartCount}
            </span>
          )}
        </span>
      </motion.button>
    </div>
  );
}
