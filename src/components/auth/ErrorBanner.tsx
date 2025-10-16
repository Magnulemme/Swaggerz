// components/auth/ErrorBanner.tsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorBannerProps {
  error: string;
  subtitle?: string;
  onDismiss?: () => void;
  variant?: 'error' | 'warning';
}

export const ErrorBanner = ({ 
  error, 
  subtitle, 
  onDismiss, 
  variant = 'error' 
}: ErrorBannerProps) => {
  const colors = {
    error: {
      bg: 'bg-red-900/20',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      text: 'text-red-200',
      subtext: 'text-red-300'
    },
    warning: {
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-500/30',
      icon: 'text-yellow-400',
      text: 'text-yellow-200',
      subtext: 'text-yellow-300'
    }
  };

  const style = colors[variant];

  return (
    <div className={`${style.bg} border ${style.border} rounded-xl p-4 flex items-start gap-3`}>
      <AlertTriangle className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className={`${style.text} text-sm`}>{error}</p>
        {subtitle && (
          <p className={`${style.subtext} text-xs mt-1`}>
            {subtitle}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`${style.icon} hover:opacity-70 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};