// app/(auth)/signin/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';

// Provider icons components
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" fill="#5865F2"/>
  </svg>
);

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { sendMagicLink, loading, error, clearError } = useAuth();
  const searchParams = useSearchParams();

  // Gestione errori dai magic link falliti
  useEffect(() => {
    const errorFromUrl = searchParams.get('error');
    const errorType = searchParams.get('error_type');

    if (errorFromUrl && errorType === 'magic_link_failed') {
      setAuthError(errorFromUrl);
    }
  }, [searchParams]);

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setAuthError(null);
    clearError();

    try {
      await sendMagicLink(email, 'sign-in');
      setMagicLinkSent(true);
      console.log('✅ Magic link inviato!');
    } catch (err) {
      console.error('❌ Errore:', err);
      setAuthError('Errore durante l\'invio del magic link');
    }
  };

  const providers = [
    { name: 'Google', icon: <GoogleIcon />, onClick: () => console.log('Google sign in') },
    { name: 'Facebook', icon: <FacebookIcon />, onClick: () => console.log('Facebook sign in') },
    { name: 'Apple', icon: <AppleIcon />, onClick: () => console.log('Apple sign in') },
    { name: 'Discord', icon: <DiscordIcon />, onClick: () => console.log('Discord sign in') }
  ];

  // Se il magic link è stato inviato, mostra il messaggio di successo
  if (magicLinkSent) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📧</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Email inviata!</h2>
            <p className="text-zinc-400">
              Controlla la tua casella di posta e clicca sul link per accedere al tuo account.
            </p>
            <p className="text-xs text-zinc-500">
              Ricordati di controllare anche nella cartella spam
            </p>
          </div>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
          >
            ← Torna indietro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Accedi
          </span>
        </h2>
        <p className="text-zinc-400 text-sm">Nel modo più veloce</p>
      </div>

      {/* Error Display */}
      {(authError || error) && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-red-400 text-lg">⚠️</span>
            <p className="text-red-400 text-sm font-medium">
              {authError || error}
            </p>
          </div>
        </div>
      )}

      {/* Magic Link Form */}
      <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-white text-sm font-medium mb-3">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            placeholder="la-tua-email@esempio.com"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Invio in corso...
              </>
            ) : (
              <>✨ Invia Magic Link</>
            )}
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-700/50"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-900/40 px-4 text-zinc-400 tracking-wider">
            Oppure continua con
          </span>
        </div>
      </div>

      {/* Social Providers */}
      <div className="grid grid-cols-2 gap-3">
        {providers.map((provider) => (
          <button
            key={provider.name}
            onClick={provider.onClick}
            className="group flex items-center justify-center gap-3 px-4 py-4 bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-700/30 hover:border-zinc-600/50 rounded-xl transition-all duration-300 hover:shadow-md"
          >
            <span className="group-hover:scale-110 transition-transform duration-300">
              {provider.icon}
            </span>
            <span className="text-white font-medium text-sm">{provider.name}</span>
          </button>
        ))}
      </div>

      {/* Security info box */}
      <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-green-400" />
          <Zap className="w-4 h-4 text-orange-400" />
        </div>
        <p className="text-white text-xs font-medium mb-1">Accesso sicuro e veloce</p>
        <p className="text-zinc-400 text-xs">Passkey automatiche dopo il primo login</p>
      </div>

      {/* Footer */}
      <div className="text-center space-y-4 pt-6 border-t border-zinc-800/50">
        <p className="text-zinc-400 text-sm">
          Non hai ancora un account?{' '}
          <Link
            href="/signup"
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200 hover:underline"
          >
            Registrati
          </Link>
        </p>
        <p className="text-zinc-500 text-xs">
          Accesso sicuro • Nessuna password richiesta
        </p>
      </div>
    </div>
  );
}
