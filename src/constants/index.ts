export const cardVariants = {
  active: {
    x: 0,
    scale: 1,
    rotateY: 0,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 20,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8
    }
  },
  prev: {
    x: "-110%",
    scale: 0.95,
    rotateY: -8,
    opacity: 0,
    filter: "blur(3px)",
    zIndex: 10,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8
    }
  },
  next: {
    x: "110%",
    scale: 0.95,
    rotateY: 8,
    opacity: 0,
    filter: "blur(3px)",
    zIndex: 10,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8
    }
  },
  hidden: {
    x: "200%",
    scale: 0.9,
    rotateY: 15,
    opacity: 0,
    filter: "blur(5px)",
    zIndex: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8
    }
  }
};

export const overlayVariants = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  inactive: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.55, 0.055, 0.675, 0.19] as const
    }
  }
};

export const imageVariants = {
  active: {
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  inactive: {
    scale: 1.1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export const crosshairCorners = [
  { position: "top-0 left-0", border: "border-l-3 border-t-3", rounded: "rounded-tl-lg" },
  { position: "top-0 right-0", border: "border-r-3 border-t-3", rounded: "rounded-tr-lg" },
  { position: "bottom-0 left-0", border: "border-l-3 border-b-3", rounded: "rounded-bl-lg" },
  { position: "bottom-0 right-0", border: "border-r-3 border-b-3", rounded: "rounded-br-lg" }
];