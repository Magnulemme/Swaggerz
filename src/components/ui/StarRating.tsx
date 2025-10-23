import React from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
  starClassName?: string;
  textClassName?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export default function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
  showValue = true,
  reviewCount,
  className = '',
  starClassName = '',
  textClassName = '',
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${sizeClasses[size]} fill-amber-400 text-amber-400 ${starClassName}`}
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star
              className={`${sizeClasses[size]} text-zinc-300 ${starClassName}`}
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star
                className={`${sizeClasses[size]} fill-amber-400 text-amber-400 ${starClassName}`}
              />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${sizeClasses[size]} text-zinc-300 ${starClassName}`}
          />
        ))}
      </div>

      {/* Rating value and review count */}
      {showValue && (
        <span className={`${textSizeClasses[size]} font-medium text-zinc-600 ${textClassName}`}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-zinc-400 font-normal"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
