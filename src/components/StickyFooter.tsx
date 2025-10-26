"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Nuovi Arrivi", href: "/shop/new" },
    { label: "Collezioni NFT", href: "/nft-collections" },
    { label: "Best Sellers", href: "/shop/bestsellers" },
    { label: "Offerte", href: "/shop/deals" },
  ],
  company: [
    { label: "Chi Siamo", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Sostenibilità", href: "/sustainability" },
  ],
  support: [
    { label: "Contattaci", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Spedizioni", href: "/shipping" },
    { label: "Resi", href: "/returns" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Termini di Servizio", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Mail, label: "Email", href: "mailto:info@swaggerz.com" },
];

export default function StickyFooter() {
  return (
    <footer className="sticky bottom-0 left-0 z-0 bg-zinc-950 font-jost">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <h3 className="text-2xl font-black text-white mb-4">Swaggerz</h3>
            <p className="text-zinc-400 mb-6 max-w-sm">
              L&apos;unico marketplace dove i tuoi NFT diventano streetwear
              esclusivo. Possiedi l&apos;arte, indossa lo stile.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Azienda</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Supporto</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Legale</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} Swaggerz. Tutti i diritti riservati.
            </p>
            <p className="text-zinc-500 text-sm">
              Made with 💜 in Italy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
