"use client";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

export default function HamburgerButton({ open, onClick }: HamburgerButtonProps) {
  return (
    <button
      className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-lg group overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-300"></div>
      <div className="relative z-10 flex flex-col gap-1.5">
        <span
          className={`block h-0.5 w-6 transition-all duration-300 ease-out ${
            open ? "rotate-45 translate-y-2 bg-gradient-to-r from-red-500 to-orange" : "bg-light-100 group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange"
          }`}
        />
        <span
          className={`block h-0.5 w-6 transition-all duration-300 ease-out ${
            open ? "opacity-0" : "bg-light-100 group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange"
          }`}
        />
        <span
          className={`block h-0.5 w-6 transition-all duration-300 ease-out ${
            open ? "-rotate-45 -translate-y-2 bg-gradient-to-r from-red-500 to-orange" : "bg-light-100 group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange"
          }`}
        />
      </div>
    </button>
  );
}
