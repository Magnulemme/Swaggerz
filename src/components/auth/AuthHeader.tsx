// components/auth/AuthHeader.tsx
import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  isSignUp?: boolean;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-white">
        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="text-zinc-400 text-sm">
        {subtitle}
      </p>
    </div>
  );
};