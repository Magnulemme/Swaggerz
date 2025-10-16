"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, CheckCircle, ArrowRight, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SwagLoader } from '@/components/SwagLoader';

export default function DashboardPage() {
  const router = useRouter();
  const { user, session, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  if (loading) {
    return <SwagLoader message="Accesso in corso..." />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Accesso richiesto</h1>
          <p className="text-zinc-400">Devi effettuare l&apos;accesso per vedere la dashboard.</p>
          <button
            onClick={() => router.push('/sign-up')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Registrati
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-jost">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-950"></div>
      <div className="absolute top-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-red-500/10 to-orange-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-500/8 to-yellow-500/6 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">

        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-black text-white">
              Benvenuto nella <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Crew</span>!
            </h1>
          </div>
          <p className="text-zinc-400 text-lg">La registrazione è avvenuta con successo 🎉</p>
        </div>

        <div className="max-w-4xl mx-auto">

          {/* User Welcome Card */}
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border-2 border-orange-500/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">{user.name || 'Membro Crew'}</h2>
                <p className="text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {user.emailVerified ? (
                    <span className="text-green-400 text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Email verificata
                    </span>
                  ) : (
                    <span className="text-yellow-400 text-sm">⚠️ Email non verificata</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Account Status */}
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Stato Account</h3>
              </div>
              <p className="text-green-400 font-semibold">✅ Attivo</p>
              <p className="text-zinc-400 text-sm mt-1">
                Registrato il {formatDate(user.createdAt)}
              </p>
            </div>

            {/* Session Info */}
            {session && (
              <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Sessione</h3>
                </div>
                <p className="text-white font-semibold">🟢 Online</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Scade il {formatDate(session.expiresAt)}
                </p>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <ArrowRight className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Prossimi Passi</h3>
              </div>
              <p className="text-white text-sm">Esplora la collezione</p>
              <button
                onClick={() => router.push('/')}
                className="text-blue-400 hover:text-blue-300 text-sm mt-1 underline"
              >
                Vai allo shop →
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* View Profile */}
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center justify-center gap-3 p-6 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-xl hover:bg-zinc-800/40 transition-all duration-200"
            >
              <Settings className="w-6 h-6 text-orange-400" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Gestisci Profilo</h3>
                <p className="text-zinc-400 text-sm">Visualizza e modifica le tue informazioni</p>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400" />
            </button>

            {/* Logout */}
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="flex items-center justify-center gap-3 p-6 bg-red-900/20 border border-red-800/50 rounded-xl hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <LogOut className="w-6 h-6 text-red-400" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">
                  {loading ? 'Disconnessione...' : 'Esci'}
                </h3>
                <p className="text-zinc-400 text-sm">Termina la sessione corrente</p>
              </div>
            </button>
          </div>

          {/* Debug Info (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-6 bg-zinc-800/30 rounded-xl">
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">🔧 Debug Info (Development)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-zinc-400">User ID:</p>
                  <p className="text-white font-mono bg-zinc-900 px-2 py-1 rounded mt-1">{user.id}</p>
                </div>
                {session && (
                  <div>
                    <p className="text-zinc-400">Session ID:</p>
                    <p className="text-white font-mono bg-zinc-900 px-2 py-1 rounded mt-1">{session.id}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}