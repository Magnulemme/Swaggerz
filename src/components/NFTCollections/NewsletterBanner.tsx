"use client";

import React, { useState } from "react";
import { Shield, Clock, Mail } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { motion } from "framer-motion";
import ShaderBackground from "./ShaderBackground";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle newsletter signup
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="mt-20 relative overflow-hidden rounded-3xl p-12 md:p-16 lg:p-20">
      {/* Animated Shader Background */}
      <ShaderBackground className="rounded-3xl" />

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-prose-lg mx-auto">
        {/* Badge decorativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Community Esclusiva
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-jost tracking-tight leading-none text-center"
        >
          Join the Swag
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/95 text-base md:text-lg lg:text-xl mb-12 max-w-prose mx-auto leading-relaxed text-center"
        >
          Unisciti alla community esclusiva. Ricevi aggiornamenti sui nuovi
          drop, offerte speciali e design NFT in anteprima.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-title mx-auto mb-8"
        >
          <div className="relative flex-1 flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-zinc-400 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="inserisci la tua email"
              required
              className="w-full h-full pl-12 pr-4 py-5 rounded-full bg-white text-zinc-900 placeholder:text-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>
          <AnimatedButton
            as="button"
            type="submit"
            size="md"
            borderColor="#ffffff"
            className="text-white whitespace-nowrap sm:min-w-[180px]"
          >
            Iscriviti
          </AnimatedButton>
        </motion.form>

        {/* Footer text con icone */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80 text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Niente spam</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Solo contenuti esclusivi</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Cancellati quando vuoi</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
