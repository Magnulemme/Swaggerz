// components/auth/GoogleAuthButton.tsx
import React from 'react';
import { GoogleIcon } from './GoogleIcon';

interface GoogleAuthButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  text?: string;
  loadingText?: string;
}

export const GoogleAuthButton = ({ 
  onClick, 
  isLoading, 
  disabled, 
  text = 'Continua con Google',
  loadingText = 'Accesso in corso...'
}: GoogleAuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      ) : (
        <GoogleIcon />
      )}
      <span className="text-gray-800 font-medium">
        {isLoading ? loadingText : text}
      </span>
    </button>
  );
};