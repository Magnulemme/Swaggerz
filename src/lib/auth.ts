import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { getDb } from '@/db';
import * as schema from '@/db/schema';
import { sendMagicLinkEmailWithUrl } from '@/lib/magic-link';

// Configurazione Better Auth - SOLO LATO SERVER
export const auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    schema,
    provider: 'pg',
  }),

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000', // ✅ Cambiato da 3001 a 3000

  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.BETTER_AUTH_URL || 'http://localhost:3000'
  ].filter(Boolean),

  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async (data) => {
        const { email, url, token } = data;
        console.log('📧 Better Auth Magic Link Request:', { email, url, token });

        // Estrarre il tipo di auth dall'URL se presente
        const urlObj = new URL(url);
        const authType = urlObj.searchParams.get('type') || 'sign-up';

        try {
          // ✅ DECOMMENTATO - Ora invia davvero l'email con il tipo
          await sendMagicLinkEmailWithUrl(email, url, authType);
          console.log('✅ Magic link email sent successfully');
        } catch (error) {
          console.error('❌ Error sending magic link:', error);
          throw error;
        }
      },
      expiresIn: 15 * 60 * 1000, // 15 minuti
    }),
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 giorni
    updateAge: 60 * 60 * 24, // 1 giorno
  },
});

// Re-export delle utilità client per comodità
export { authClient, authUtils } from './auth-client';