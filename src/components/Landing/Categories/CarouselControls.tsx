interface CarouselControlsProps {
  onNext: () => void;
  onPrev: () => void;
  disabled: boolean;
}

export function CarouselControls({
  onNext,
  onPrev,
  disabled,
}: CarouselControlsProps) {
  return (
    <div className="hidden lg:flex px-md md:px-lg lg:px-xl xl:px-2xl justify-end gap-3 mb-8 mt-6">
      <button
        onClick={onNext}
        disabled={disabled}
        className="flex group p-sm rounded-full items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 bg-dark-elevated cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10"
        aria-label="Previous slides"
      >
        <svg
          className="size-icon text-light-primary group-hover:text-brand transition-all duration-500 group-disabled:group-hover:text-light-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </button>

      <button
        onClick={onPrev}
        disabled={disabled}
        className="flex group p-sm rounded-full items-center justify-center border border-white/10 hover:border-brand-subtle transition-all duration-500 bg-dark-elevated cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10"
        aria-label="Next slides"
      >
        <svg
          className="size-icon text-light-primary group-hover:text-brand transition-all duration-500 group-disabled:group-hover:text-light-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  );
}
