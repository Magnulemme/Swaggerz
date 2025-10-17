"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Image, Shirt, Palette, Sparkles, Pen } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import AnimatedNavLink from "./Navbar/AnimatedNavLink";
import NavbarLogo from "./Navbar/NavbarLogo";
import NavbarActions from "./Navbar/NavbarActions";
import HamburgerButton from "./Navbar/HamburgerButton";
import MobileMenu from "./Navbar/MobileMenu";

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
}

interface NavbarProps {
  cartCount?: number;
}

const navLinks: NavLink[] = [
  // eslint-disable-next-line jsx-a11y/alt-text
  { label: "NFT", href: "/shop/nft", icon: <Image size={16} /> },
  {
    label: "Abbigliamento",
    href: "/shop/clothing",
    icon: <Shirt size={16} />,
    hasDropdown: true,
  },
  { label: "Stampe", href: "/shop/prints", icon: <Palette size={16} /> },
  { label: "Lifestyle", href: "/shop/lifestyle", icon: <Sparkles size={16} /> },
  { label: "Create", href: "/create", icon: <Pen size={16} /> },
];

const clothingCategories = [
  { label: "T-Shirts", href: "/shop/clothing/tshirts" },
  { label: "Hoodies", href: "/shop/clothing/hoodies" },
  { label: "Caps", href: "/shop/clothing/caps" },
  { label: "Accessori", href: "/shop/clothing/accessories" },
];

export default function Navbar({ cartCount = 2 }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[60] transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950 border-b border-white/10 shadow-lg"
          : "bg-transparent lg:bg-zinc-950"
      }`}
    >
      <nav className="mx-auto w-full max-w-[100vw] px-4 sm:px-6 lg:px-24 flex items-center justify-between h-16 sm:h-20">
        <NavbarLogo />

        {/* Desktop menu con NavigationMenu - AGGIUNGI viewport={false} */}
        <NavigationMenu className="hidden lg:block" viewport={false}>
          <NavigationMenuList className="flex items-center gap-2">
            {navLinks.map((link) => (
              <AnimatedNavLink
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
                hasDropdown={link.hasDropdown}
                dropdownItems={link.hasDropdown ? clothingCategories : []}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <NavbarActions cartCount={cartCount} />
        <HamburgerButton open={open} onClick={() => setOpen(!open)} />
      </nav>

      {/* Mobile menu */}
      {mounted &&
        createPortal(
          <MobileMenu
            open={open}
            onClose={() => setOpen(false)}
            navLinks={navLinks}
            dropdownItems={clothingCategories}
            cartCount={cartCount}
          />,
          document.body
        )}
    </header>
  );
}
