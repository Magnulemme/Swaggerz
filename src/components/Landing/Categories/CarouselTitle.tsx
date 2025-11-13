interface CarouselTitleProps {
  currentLabel: string;
  previousLabel?: string;
  isTransitioning: boolean;
}

export function CarouselTitle({
  currentLabel,
  previousLabel,
  isTransitioning,
}: CarouselTitleProps) {
  return (
    <div className="absolute left-[45%] lg:left-[40%] xl:left-[38%] -translate-x-1/2 top-[35%] -translate-y-1/2 pointer-events-none overflow-hidden uppercase">
      {/* Previous title - sliding out upwards */}
      {isTransitioning && previousLabel && (
        <div
          key={`title-exit-${previousLabel}`}
          className="absolute text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white"
        >
          {previousLabel.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation:
                  "slideUpOut 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                animationDelay: `${i * 0.02}s`,
                willChange: "transform, opacity",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      )}

      {/* Current title - sliding in from bottom */}
      <div
        key={`title-${currentLabel}`}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white"
      >
        {currentLabel.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block opacity-0"
            style={{
              animation:
                "slideUpIn 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
              animationDelay: `${0.6 + i * 0.02}s`,
              willChange: "transform, opacity",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}
