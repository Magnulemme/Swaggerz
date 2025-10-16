"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarActionsProps {
  cartCount?: number;
}

export default function NavbarActions({ cartCount = 0 }: NavbarActionsProps) {
  return (
    <div className="hidden md:flex items-center gap-3">
      {/* Search */}
      <button className="group relative p-2.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange/40 transition-all duration-300">
        <Search size={18} className="text-light-300 group-hover:text-orange group-hover:scale-110 transition-all duration-300" />
      </button>

      {/* Account */}
      <Link href="/sign-in" className="group relative p-2.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange/40 transition-all duration-300">
        <User size={18} className="text-light-300 group-hover:text-orange group-hover:scale-110 transition-all duration-300" />
      </Link>

      {/* Cart */}
      <motion.button
        className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px]"
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated rotating gradient border */}
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d37918_0%,#111111_50%,#d37918_100%)]" />

        <span className="inline-flex h-full w-full items-center justify-center rounded-full px-5 gap-2 bg-dark-900 backdrop-blur-3xl relative">
          <ShoppingBag size={18} className="text-orange" />
          <span className="text-sm font-semibold text-white">Cart</span>
          {cartCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange text-xs font-bold text-dark-900">
              {cartCount}
            </span>
          )}
        </span>
      </motion.button>
    </div>
  );
}
