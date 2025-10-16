// components/auth/AuthDivider.tsx
import React from 'react';

interface AuthDividerProps {
  text?: string;
}

export const AuthDivider = ({ text = 'oppure' }: AuthDividerProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-zinc-700"></div>
      <span className="text-zinc-500 text-sm">{text}</span>
      <div className="flex-1 h-px bg-zinc-700"></div>
    </div>
  );
};