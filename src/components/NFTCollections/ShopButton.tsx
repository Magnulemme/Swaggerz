import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ShopButtonProps {
  badgeColor: string;
  buttonGradient: string;
  buttonHoverColor: string;
  href: string;
}

export default function ShopButton({
  badgeColor,
  buttonGradient,
  buttonHoverColor,
  href
}: ShopButtonProps) {
  return (
    <motion.button
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-${badgeColor}-500/40 focus:ring-offset-2 focus:ring-offset-zinc-950`}
      whileTap={{ scale: 0.98 }}
      onClick={() => window.location.href = href}
    >
      <span className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${buttonGradient}`} />
      <motion.span
        className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 backdrop-blur-3xl overflow-hidden relative bg-zinc-950"
        whileHover={{ backgroundColor: buttonHoverColor }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          Shop Now
          <ChevronRight className="w-4 h-4" />
        </span>
      </motion.span>
    </motion.button>
  );
}
