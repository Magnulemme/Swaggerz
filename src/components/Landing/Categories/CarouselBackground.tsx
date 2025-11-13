interface CarouselBackgroundProps {
  imageUrl: string;
}

export function CarouselBackground({ imageUrl }: CarouselBackgroundProps) {
  return (
    <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Large preview background */}
      <div
        className="w-[80vw] h-[80vh] max-w-[900px] max-h-[600px] transition-all duration-[1400ms] rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: "blur(3px) brightness(0.7)",
          opacity: 0.65,
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
    </div>
  );
}
