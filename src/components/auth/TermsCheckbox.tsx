// components/auth/TermsCheckbox.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

interface TermsCheckboxProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
  termsUrl?: string;
  privacyUrl?: string;
}

export const TermsCheckbox = ({ 
  accepted, 
  onChange,
  termsUrl = '/terms',
  privacyUrl = '/privacy'
}: TermsCheckboxProps) => {
  return (
    <label className="flex items-start gap-3 text-sm text-zinc-300 cursor-pointer group">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
          accepted
            ? 'bg-gradient-to-r from-red-500 to-orange-500 border-orange-500'
            : 'border-zinc-400 group-hover:border-orange-400'
        }`}>
          {accepted && (
            <CheckCircle className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />
          )}
        </div>
      </div>
      <span className="leading-relaxed">
        Accetto i{' '}
        <Link href={termsUrl} className="text-orange-400 hover:text-orange-300 underline">
          Termini
        </Link>{' '}
        e la{' '}
        <Link href={privacyUrl} className="text-orange-400 hover:text-orange-300 underline">
          Privacy Policy
        </Link>
      </span>
    </label>
  );
};