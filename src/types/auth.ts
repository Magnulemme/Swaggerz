export interface User {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  authType: 'magic_link' | 'passkey' | 'provider' | 'guest';
  isEmailVerified: boolean;
  isGuest: boolean;
}

export interface GuestUser {
  id: string;
  isGuest: true;
  data: {
    preferences: Record<string, unknown>;
    cart: unknown[];
  };
}
