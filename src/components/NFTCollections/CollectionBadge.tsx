import { motion } from 'framer-motion';

interface CollectionBadgeProps {
  badge: string;
  badgeColor: string;
}

export default function CollectionBadge({ badge, badgeColor }: CollectionBadgeProps) {
  // Usa sempre verde per "Novità"
  const isNew = badge.toLowerCase() === "novità";

  const colorMap: Record<string, { bg: string; border: string }> = {
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50' },
    orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/50' },
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/50' }
  };

  // Se è "Novità", usa sempre verde brillante
  const bgClass = isNew ? 'bg-emerald-500' : (colorMap[badgeColor]?.bg || 'bg-emerald-500/20');
  const borderClass = isNew ? 'border-emerald-400' : (colorMap[badgeColor]?.border || 'border-emerald-500/50');
  const textClass = isNew ? 'text-white' : 'text-white';

  return (
    <motion.div
      className={`inline-block px-4 py-2 ${bgClass} backdrop-blur-sm border ${borderClass} rounded-full mb-6 shadow-lg`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <span className={`${textClass} text-sm font-bold uppercase tracking-wider`}>
        {badge}
      </span>
    </motion.div>
  );
}
