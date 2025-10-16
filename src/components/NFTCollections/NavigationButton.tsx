import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  size?: 'default' | 'small';
}

export default function NavigationButton({
  direction,
  onClick,
  size = 'default'
}: NavigationButtonProps) {
  const sizeClasses = size === 'small' ? 'w-10 h-10' : 'w-12 h-12';
  const iconSize = size === 'small' ? 'w-5 h-5' : 'w-6 h-6';
  const position = direction === 'prev' ? 'left-4' : 'right-4';
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const label = direction === 'prev' ? 'Previous collection' : 'Next collection';

  return (
    <button
      className={`absolute ${position} top-1/2 -translate-y-1/2 z-20 ${sizeClasses} rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-800/80 transition-all`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className={iconSize} />
    </button>
  );
}
