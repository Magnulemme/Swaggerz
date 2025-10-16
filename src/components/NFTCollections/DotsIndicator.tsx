interface DotsIndicatorProps {
  totalDots: number;
  selectedIndex: number;
  onDotClick: (index: number) => void;
}

export default function DotsIndicator({
  totalDots,
  selectedIndex,
  onDotClick
}: DotsIndicatorProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-all ${
            index === selectedIndex ? 'bg-white w-8' : 'bg-zinc-600'
          }`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to collection ${index + 1}`}
        />
      ))}
    </div>
  );
}
