// components/auth/MagicLinkForm.tsx
import React, { useState } from 'react';
import { Mail } from 'lucide-react';

interface MagicLinkFormProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
  disabled: boolean;
  buttonText?: string;
  placeholder?: string;
}

export const MagicLinkForm = ({ 
  onSubmit, 
  isLoading, 
  disabled, 
  buttonText = 'Continua con Magic Link',
  placeholder = 'nome@email.com'
}: MagicLinkFormProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
          Email per Magic Link
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-zinc-400 transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !email || disabled}
        className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Mail className="w-5 h-5" />
        )}
        <span>
          {isLoading ? 'Invio in corso...' : buttonText}
        </span>
      </button>
    </form>
  );
};