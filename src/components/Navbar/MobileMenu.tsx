"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import NavbarLogo from "./NavbarLogo";

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  dropdownItems?: { label: string; href: string }[];
  cartCount?: number;
}

export default function MobileMenu({
  open,
  onClose,
  navLinks,
  dropdownItems = [],
  cartCount = 0
}: MobileMenuProps) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-[100] flex flex-col transition-all duration-500 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-orange/10"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-white/5">
        <NavbarLogo />

        <button
          className="relative w-10 h-10 rounded-lg flex flex-col justify-center items-center group overflow-hidden"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="absolute inset-0 border border-white/10"></div>
          <div className="relative z-10 flex flex-col gap-1.5">
            <span className="absolute block h-0.5 w-6 transition-all duration-300 rotate-45 bg-gradient-to-r from-red-500 to-orange" />
            <span className="absolute block h-0.5 w-6 transition-all duration-300 -rotate-45 bg-gradient-to-r from-red-500 to-orange" />
          </div>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 overflow-y-auto">
        <div className={`flex flex-col items-center gap-6 transition-all duration-700 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}>
          {navLinks.map((link, index) => (
            <div key={link.label} className="flex flex-col items-center gap-3">
              <Link
                href={link.href}
                className={`flex items-center gap-3 text-2xl font-medium text-white hover:text-transparent hover:bg-gradient-to-r hover:from-red-500 hover:via-orange-500 hover:to-yellow-500 hover:bg-clip-text transition-all duration-300 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                onClick={onClose}
              >
                {link.icon}
                {link.label}
              </Link>

              {/* Clothing subcategories for mobile */}
              {link.hasDropdown && (
                <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  {dropdownItems.map((category) => (
                    <Link
                      key={category.label}
                      href={category.href}
                      className="text-sm text-light-300 hover:text-orange transition-colors duration-300"
                      onClick={onClose}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className={`relative z-10 border-t border-white/5 px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 transition-all duration-700 ${
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        <button
          className="group relative flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange/40 transition-all duration-300"
          onClick={onClose}
        >
          <Search size={18} className="text-light-300 group-hover:text-orange group-hover:scale-110 transition-all duration-300" />
          <span className="text-light-100 group-hover:text-white font-medium transition-colors duration-300">Search</span>
        </button>

        <Link
          href="/sign-in"
          className="group relative flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange/40 transition-all duration-300"
          onClick={onClose}
        >
          <User size={18} className="text-light-300 group-hover:text-orange group-hover:scale-110 transition-all duration-300" />
          <span className="text-light-100 group-hover:text-white font-medium transition-colors duration-300">Account</span>
        </Link>

        <button
          className="group relative flex items-center justify-between px-5 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-orange/20 to-red-500/20 border border-orange/40"
          onClick={onClose}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-orange" />
            <span className="text-white font-semibold">Cart</span>
          </div>
          {cartCount > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-xs font-bold text-dark-900">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
