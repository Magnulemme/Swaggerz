// components/auth/AuthLayout.tsx
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export const AuthLayout = ({ children, maxWidth = 'max-w-md' }: AuthLayoutProps) => {
  return (
    <div className={`w-full ${maxWidth} space-y-8`}>
      {children}
    </div>
  );
};