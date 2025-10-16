'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function MagicLinkTest() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { sendMagicLink, error, clearError, user, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setSuccess(false);
    clearError();

    try {
      await sendMagicLink(email);
      setSuccess(true);
      console.log('✅ Magic link inviato!');
    } catch (err) {
      console.error('❌ Errore:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Se l'utente è già autenticato
  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 rounded-lg border border-green-200">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          🎉 Sei già loggato!
        </h2>
        <div className="space-y-2 text-sm text-green-700">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Nome:</strong> {user?.name}</p>
          <p><strong>ID:</strong> {user?.id}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Ricarica per testare di nuovo
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          📧 Magic Link Inviato!
        </h3>
        <div className="text-blue-700 space-y-2">
          <p>Ho inviato un link magico a <strong>{email}</strong></p>
          <div className="text-sm bg-blue-100 p-3 rounded">
            <p><strong>Cosa fare ora:</strong></p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Controlla la console del browser per il link (modalità development)</li>
              <li>Oppure controlla la tua email se hai configurato Resend</li>
              <li>Clicca sul link per autenticarti</li>
            </ol>
          </div>
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setEmail('');
          }}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Invia un altro link
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">
        🔥 Test Magic Link
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-400"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-600 rounded-md">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? '🚀 Invio in corso...' : '🔥 Invia Magic Link'}
        </button>
      </form>

      <div className="mt-6 text-xs text-gray-400 space-y-1">
        <p>💡 <strong>Modalità Development:</strong></p>
        <p>• Il link apparirà nella console del browser</p>
        <p>• Configura RESEND_API_KEY per l&apos;invio email reale</p>
      </div>
    </div>
  );
}