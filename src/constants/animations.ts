export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.6 }
  }
};

export const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const glitchVariants = {
  initial: { x: 0 },
  hover: {
    x: [0, -2, 2, -1, 1, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  }
};

export const badgeVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [0.8, 1.1, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const collectionVariants = {
  enter: {
    x: 300,
    opacity: 0,
    scale: 0.8
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  exit: {
    x: -300,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.6,
      ease: "easeIn"
    }
  }
};