interface CarouselBackgroundProps {
  imageUrl: string;
}

export function CarouselBackground({ imageUrl }: CarouselBackgroundProps) {
  return (
    <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
      {/* Wrapper with border-radius for clipping */}
      <div
        className="w-[80vw] xl:w-[90vw] h-[80vh] max-w-[900px] xl:max-w-[1200px] max-h-[600px] overflow-hidden"
        style={{
          borderRadius: "2rem",
        }}
      >
        {/* Large preview background with blur */}
        <div
          className="w-full h-full transition-all duration-[1400ms] bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
            filter: "blur(8px) brightness(0.7)",
            opacity: 0.65,
            transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
            transform: "scale(1.15)", // Scale more to hide blur edges
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
