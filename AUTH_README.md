# Sistema di Autenticazione - Swaggerz Collective

## Panoramica

Questo progetto implementa un sistema di autenticazione completo utilizzando:
- **Better Auth** per la gestione dell'autenticazione
- **Drizzle ORM** per il database
- **Neon** come database PostgreSQL
- **Next.js 15** con App Router

## Caratteristiche

### 🔐 Metodi di Autenticazione

1. **Magic Link via Email**
   - Invio di link di accesso via email
   - Link scadono dopo 10 minuti
   - Template email personalizzati

2. **Provider OAuth**
   - Google OAuth
   - GitHub OAuth
   - Facilmente estendibile per altri provider

3. **Passkey** (preparato per implementazione futura)
   - Supporto per autenticazione biometrica
   - Sicurezza avanzata

4. **Guest Users**
   - Sessioni anonime per utenti non registrati
   - Persistenza dei dati nel localStorage
   - Conversione automatica in utenti registrati

### 🗄️ Struttura Database

#### Tabelle Principali

- **`users`**: Utenti registrati e guest
- **`sessions`**: Sessioni attive (autenticate e guest)
- **`magic_links`**: Token per magic link
- **`passkeys`**: Credenziali passkey
- **`products`**: Prodotti del catalogo

#### Relazioni

- Un utente può avere multiple sessioni
- Un utente può avere multiple passkey
- Sessioni guest sono separate dalle sessioni autenticate

### 🔧 Configurazione

#### Variabili d'Ambiente

Crea un file `.env.local` con:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Better Auth
BETTER_AUTH_SECRET="your-super-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (per magic link)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
```

#### Setup Provider OAuth

1. **Google OAuth**:
   - Vai su [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un progetto e abilita Google+ API
   - Crea credenziali OAuth 2.0
   - Aggiungi URI di reindirizzamento: `http://localhost:3000/api/auth/callback/google`

2. **GitHub OAuth**:
   - Vai su [GitHub Developer Settings](https://github.com/settings/developers)
   - Crea una nuova OAuth App
   - Aggiungi callback URL: `http://localhost:3000/api/auth/callback/github`

### 🚀 Utilizzo

#### Hook di Autenticazione

```tsx
import { useAuthContext } from '@/providers/AuthProvider';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout 
  } = useAuthContext();

  // Login con magic link
  const handleLogin = async () => {
    const result = await login('user@example.com');
    console.log(result.message);
  };

  // Login con provider
  const handleGoogleLogin = async () => {
    await loginWithProvider('google');
  };
}
```

#### Gestione Guest Users

```tsx
import { useAuthContext } from '@/providers/AuthProvider';

function MyComponent() {
  const { isGuest, user } = useAuthContext();

  if (isGuest()) {
    // Utente guest - mostra contenuto limitato
    return <GuestView />;
  }

  // Utente autenticato - mostra contenuto completo
  return <AuthenticatedView />;
}
```

### 📧 Sistema Email

Il sistema utilizza **Nodemailer** per l'invio di email:

- Template HTML e testo personalizzati
- Configurazione SMTP flessibile
- Gestione errori robusta
- Logging per debug

### 🔒 Sicurezza

- **JWT** per le sessioni
- **Cookies** sicuri per la persistenza
- **Scadenza automatica** dei token
- **Validazione** degli input
- **Rate limiting** integrato (da implementare)

### 🧪 Testing

#### Componente di Test

Utilizza `AuthTest` per testare tutte le funzionalità:

```tsx
import { AuthTest } from '@/components/AuthTest';

export default function TestPage() {
  return <AuthTest />;
}
```

#### Database

```bash
# Genera migrazioni
npm run drizzle:generate

# Applica migrazioni
npm run drizzle:migrate

# Popola con dati di esempio
npm run seed

# Apri Drizzle Studio
npm run drizzle:studio
```

### 📁 Struttura File

```
src/
├── app/
│   └── api/auth/[...better-auth]/
│       └── route.ts          # API route per Better Auth
├── components/
│   ├── AuthTest.tsx          # Componente di test
│   └── GuestSessionManager.tsx # Gestione sessioni guest
├── db/
│   ├── index.ts              # Connessione database
│   └── schema.ts             # Schema Drizzle
├── hooks/
│   └── useAuth.ts            # Hook personalizzato
├── lib/
│   ├── auth.ts               # Configurazione Better Auth
│   └── email.ts              # Servizio email
└── providers/
    └── AuthProvider.tsx      # Provider React
```

### 🔄 Flusso di Autenticazione

1. **Utente Guest**:
   - Viene creato automaticamente
   - Dati salvati nel localStorage
   - Può navigare e aggiungere al carrello

2. **Registrazione**:
   - Utente inserisce email e nome
   - Viene inviato magic link
   - Account creato dopo verifica email

3. **Login**:
   - Magic link o provider OAuth
   - Sessione creata con JWT
   - Dati guest migrati se presenti

4. **Logout**:
   - Sessione invalidata
   - Nuovo guest user creato
   - Dati mantenuti se necessario

### 🚧 Implementazioni Future

- [ ] **Passkey** complete
- [ ] **Rate limiting** per API
- [ ] **Two-factor authentication**
- [ ] **Social login** aggiuntivi
- [ ] **Analytics** per sessioni
- [ ] **Webhook** per eventi auth

### 🐛 Troubleshooting

#### Problemi Comuni

1. **Email non inviate**:
   - Verifica configurazione SMTP
   - Controlla variabili d'ambiente
   - Verifica log del server

2. **OAuth non funziona**:
   - Controlla client ID e secret
   - Verifica callback URL
   - Controlla scopes richiesti

3. **Sessioni non persistenti**:
   - Verifica configurazione cookies
   - Controlla dominio e HTTPS
   - Verifica BETTER_AUTH_SECRET

### 📚 Risorse

- [Better Auth Documentation](https://better-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon Database](https://neon.tech/)
- [Next.js Authentication](https://nextjs.org/docs/authentication)

---

**Nota**: Questo sistema è progettato per essere scalabile e sicuro. Assicurati di cambiare tutte le chiavi segrete in produzione e configurare correttamente HTTPS.
