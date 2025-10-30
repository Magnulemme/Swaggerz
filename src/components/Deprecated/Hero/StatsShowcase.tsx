"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Star, Package } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  barWidth: number;
}

export default function StatsShowcase() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats: Stat[] = [
    {
      icon: <Package className="w-5 h-5" />,
      value: 2500,
      suffix: "+",
      label: "Prodotti Venduti",
      color: "from-amber-500 to-orange-500",
      barWidth: 85,
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: 1200,
      suffix: "+",
      label: "Community Members",
      color: "from-orange-500 to-red-500",
      barWidth: 70,
    },
    {
      icon: <Star className="w-5 h-5" />,
      value: 4.9,
      suffix: "/5",
      label: "Rating Medio",
      color: "from-amber-400 to-yellow-500",
      barWidth: 98,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: 150,
      suffix: "%",
      label: "Crescita Annua",
      color: "from-green-500 to-emerald-500",
      barWidth: 75,
    },
  ];

  return (
    <div
      ref={ref}
      className="relative w-full h-full rounded-3xl border border-zinc-700/50 bg-black overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-jost">
              Performance
            </h3>
            <p className="text-xs text-zinc-500">Live Stats</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  stat: Stat;
  index: number;
  isInView: boolean;
}

function StatCard({ stat, index, isInView }: StatCardProps) {
  const [count, setCount] = useState(0);

  // Animated counter
  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-xl p-4 group hover:border-zinc-700 transition-all duration-300"
    >
      {/* Icon */}
      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 mb-3`}>
        <div className="text-amber-400">
          {stat.icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl lg:text-3xl font-black text-white font-jost">
          {stat.suffix === "/5" ? count.toFixed(1) : Math.floor(count)}
        </span>
        <span className="text-sm font-bold text-amber-400">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="text-xs text-zinc-400 font-medium mb-3">{stat.label}</p>

      {/* Progress Bar */}
      <div className="relative w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${stat.barWidth}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl bg-gradient-to-r ${stat.color}`}
        style={{ opacity: 0.1 }}
      />
    </motion.div>
  );
}
