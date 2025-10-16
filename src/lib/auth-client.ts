import { createAuthClient } from 'better-auth/client';
import { magicLinkClient } from 'better-auth/client/plugins';
import { GuestUser } from '@/types/auth';

// ✅ Client per l'uso nel frontend - SOLO LATO CLIENT
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
  plugins: [magicLinkClient()],
});

// Funzioni helper per la gestione dell'autenticazione - SOLO LATO CLIENT
export const authUtils = {
  // Crea un guest user (sincrono)
  createGuestUserSync(): GuestUser {
    const guestId = crypto.randomUUID();
    const guestData = {
      id: guestId,
      preferences: {},
      cart: [],
    };
    
    return {
      id: guestId,
      isGuest: true as const,
      data: guestData,
    };
  },

  // Crea un guest user (asincrono - mantenuto per compatibilità)
  async createGuestUser(): Promise<GuestUser> {
    return this.createGuestUserSync();
  },
  
  // Verifica se un utente è guest
  isGuestUser(user: unknown): user is GuestUser {
    return !user || (typeof user === 'object' && user && 'isGuest' in user && user.isGuest === true);
  },
  
  // Verifica se un utente è autenticato (non guest)
  isAuthenticatedUser(user: unknown): boolean {
    return !this.isGuestUser(user) && user !== null && user !== undefined;
  },
  
  // Aggiorna l'ultima attività di una sessione
  async updateSessionActivity(): Promise<void> {
    // Better Auth gestisce automaticamente le sessioni
    // Questa funzione può rimanere vuota o implementare logica personalizzata
  },
};