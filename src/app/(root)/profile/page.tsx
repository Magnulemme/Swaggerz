"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Shield, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SwagLoader } from '@/components/SwagLoader';

export default function ProfilePage() {
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
    return <SwagLoader message="Caricamento profilo..." />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Accesso richiesto</h1>
          <p className="text-zinc-400">Devi effettuare l&apos;accesso per vedere il profilo.</p>
          <button
            onClick={() => router.push('/sign-in')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Accedi
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
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-jost">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-950"></div>
      <div className="absolute top-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-red-500/10 to-orange-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-500/8 to-yellow-500/6 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla home</span>
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-white mb-2">
              Il Tuo <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Profilo</span>
            </h1>
            <p className="text-zinc-400">Gestisci il tuo account Swaggerz Collective</p>
          </div>

          {/* Profile Card */}
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 space-y-8">
            
            {/* User Avatar & Basic Info */}
            <div className="flex items-center gap-6">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-2 border-orange-500/30"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-zinc-400 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Account Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-400" />
                    Informazioni Account
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-zinc-400">ID Utente:</span>
                      <p className="text-white font-mono text-xs bg-zinc-800 px-2 py-1 rounded mt-1">
                        {user.id}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-zinc-400">Email verificata:</span>
                      <p className="text-white flex items-center gap-2 mt-1">
                        {user.emailVerified ? '✅ Verificata' : '❌ Non verificata'}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-zinc-400">Account creato:</span>
                      <p className="text-white mt-1">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-zinc-400">Ultimo aggiornamento:</span>
                      <p className="text-white mt-1">
                        {formatDate(user.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session Info */}
                {session && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-400" />
                      Sessione Corrente
                    </h3>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-zinc-400">Session ID:</span>
                        <p className="text-white font-mono text-xs bg-zinc-800 px-2 py-1 rounded mt-1">
                          {session.id}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-zinc-400">Creata:</span>
                        <p className="text-white mt-1">
                          {formatDate(session.createdAt)}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-zinc-400">Scade:</span>
                        <p className="text-white mt-1">
                          {formatDate(session.expiresAt)}
                        </p>
                      </div>
                      
                      {session.ipAddress && (
                        <div>
                          <span className="text-zinc-400">IP Address:</span>
                          <p className="text-white font-mono text-xs bg-zinc-800 px-2 py-1 rounded mt-1">
                            {session.ipAddress}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-zinc-800/50 pt-6">
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
                <span>
                  {loading ? 'Disconnessione...' : 'Disconnetti'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}