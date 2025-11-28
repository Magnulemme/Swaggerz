import { motion } from "framer-motion";
import { getBadgeConfig, ANIMATION_CONFIGS, type BadgeType } from "./categories.ui-constants";

interface CategoryBadgeProps {
  badge: BadgeType;
}

export function CategoryBadge({ badge }: CategoryBadgeProps) {
  const config = getBadgeConfig(badge);

  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: ANIMATION_CONFIGS.badge.duration,
        delay: ANIMATION_CONFIGS.badge.delay,
        ease: ANIMATION_CONFIGS.badge.easing,
      }}
      className="absolute top-4 left-4 pointer-events-none z-20"
    >
      <div
        className={`
          relative inline-flex h-8 md:h-9 overflow-hidden rounded-full p-[1px] flex-shrink-0
          ${config.gradient}
        `}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 z-0 rounded-full"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: ANIMATION_CONFIGS.shimmer.duration,
            repeat: Infinity,
            ease: ANIMATION_CONFIGS.shimmer.ease,
          }}
          style={{
            background: config.shimmer,
            backgroundSize: "200% 100%",
          }}
        />

        <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full px-3 md:px-4 py-1 bg-zinc-950 backdrop-blur-sm">
          <span
            className={`
              text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest font-jost
              ${config.textColor}
            `}
          >
            {badge}
          </span>
        </span>
      </div>
    </motion.div>
  );
}
