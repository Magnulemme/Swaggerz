import { motion } from 'framer-motion';

interface AnimatedGradientOrbProps {
  position: 'top-right' | 'bottom-left' | 'center';
  gradientFrom: string;
  gradientVia: string;
  delay?: number;
}

export default function AnimatedGradientOrb({
  position,
  gradientFrom,
  gradientVia,
  delay = 0
}: AnimatedGradientOrbProps) {
  const positionClasses = {
    'top-right': '-top-32 -right-32',
    'bottom-left': '-bottom-32 -left-32',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]'
  };

  const gradientDirection = position === 'bottom-left' ? 'bg-gradient-to-tr' : 'bg-gradient-to-br';

  if (position === 'center') {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} bg-gradient-to-br from-${gradientFrom} via-${gradientVia} to-transparent rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  }

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} w-96 h-96 ${gradientDirection} from-${gradientFrom} via-${gradientVia} to-transparent rounded-full blur-3xl`}
      animate={{
        scale: position === 'bottom-left' ? [1, 1.3, 1] : [1, 1.2, 1],
        opacity: [0.6, 0.8, 0.6]
      }}
      transition={{
        duration: position === 'bottom-left' ? 6 : 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );
}
