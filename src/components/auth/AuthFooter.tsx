// components/auth/AuthFooter.tsx
import React from 'react';
import Link from 'next/link';

interface AuthFooterProps {
  isSignUp?: boolean;
  alternateText?: string;
  alternateLink?: string;
  alternateLinkText?: string;
}

export const AuthFooter = ({ 
  isSignUp = true,
  alternateText,
  alternateLink,
  alternateLinkText
}: AuthFooterProps) => {
  const defaultText = isSignUp ? 'Hai già un account?' : 'Non hai ancora un account?';
  const defaultLink = isSignUp ? '/signin' : '/signup';
  const defaultLinkText = isSignUp ? 'Accedi' : 'Registrati';

  return (
    <div className="text-center space-y-3 pt-6 border-t border-zinc-800/50">
      <p className="text-zinc-400 text-sm">
        {alternateText || defaultText}{' '}
        <Link
          href={alternateLink || defaultLink}
          className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200 hover:underline"
        >
          {alternateLinkText || defaultLinkText}
        </Link>
      </p>

      <p className="text-zinc-500 text-xs">
        Registrazione sicura • Magic Link • OAuth Google
      </p>
    </div>
  );
};