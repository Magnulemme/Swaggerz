import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export function useAuth() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica la sessione corrente
  useEffect(() => {
    const getSession = async () => {
      try {
        setLoading(true);
        const session = await authClient.getSession();
        setData(session.data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento della sessione:', err);
        setError('Errore nel caricamento della sessione');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  // Login con provider OAuth
  const signIn = async (provider: 'google' | 'github') => {
    try {
      setError(null);
      await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard',
      });
    } catch (err) {
      console.error(`Errore login ${provider}:`, err);
      setError(`Errore durante il login con ${provider}`);
    }
  };

  // Logout
  const signOut = async () => {
    try {
      setError(null);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setData(null);
            window.location.href = '/';
          },
        },
      });
    } catch (err) {
      console.error('Errore logout:', err);
      setError('Errore durante il logout');
    }
  };

  // Refresh della sessione
  const refresh = async () => {
    try {
      setError(null);
      const session = await authClient.getSession();
      setData(session.data);
    } catch (err) {
      console.error('Errore refresh sessione:', err);
      setError('Errore nel refresh della sessione');
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // ✅ Send magic link migliorato con nuovo callbackURL e tipo di auth
  const sendMagicLink = async (email: string, authType: 'sign-in' | 'sign-up' = 'sign-up') => {
    try {
      setError(null);
      // Non impostare loading qui, causa problemi con il layout

      console.log('🔄 Invio magic link per:', email, 'tipo:', authType);

      const response = await authClient.signIn.magicLink({
        email,
        callbackURL: `/verify-callback?type=${authType}`, // ✅ Aggiungiamo il tipo
      });

      console.log('✅ Magic link sent via Better Auth:', response);
      return response;
    } catch (err: any) {
      console.error('❌ Errore invio magic link:', err);

      // ✅ Gestione errori più dettagliata
      if (err?.error?.code === 'INVALID_EMAIL') {
        setError('Email non valida');
      } else if (err?.error?.code === 'USER_NOT_FOUND') {
        // Better Auth crea automaticamente l'utente, questo errore non dovrebbe comparire
        setError('Errore durante la registrazione');
      } else {
        setError('Errore durante l\'invio del magic link');
      }

      throw err;
    }
  };

  return {
    // Dati
    user: data?.user || null,
    session: data?.session || null,
    loading,
    error,

    // Stato
    isAuthenticated: !!data?.user,
    isLoading: loading,

    // Azioni
    signIn,
    signOut,
    refresh,
    clearError,
    sendMagicLink,
  };
}