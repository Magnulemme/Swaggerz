"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Turnstile } from '@marsidev/react-turnstile';

// Importa tutti i componenti modulari
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { ErrorBanner } from '@/components/auth/ErrorBanner';
import { MagicLinkForm } from '@/components/auth/MagicLinkForm';
import { MagicLinkSuccess } from '@/components/auth/MagicLinkSuccess';
import { AuthDivider } from '@/components/auth/AuthDivider';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { TermsCheckbox } from '@/components/auth/TermsCheckbox';
import { SocialProof } from '@/components/auth/SocialProof';
import { AuthFooter } from '@/components/auth/AuthFooter';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoadingMagicLink, setIsLoadingMagicLink] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [magicLinkError, setMagicLinkError] = useState<string | null>(null);
  const { signIn, sendMagicLink, error, clearError } = useAuth();
  
  const turnstileRef = useRef<any>(null);

  useEffect(() => {
    const errorFromUrl = searchParams.get('error');
    const errorType = searchParams.get('error_type');
    
    if (errorFromUrl && (errorType === 'magic_link_failed' || errorType === 'session_missing')) {
      setMagicLinkError(errorFromUrl);
      
      // Pulisci l'URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      newUrl.searchParams.delete('error_type');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);

  // Aggiungi CSS personalizzato per Turnstile
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cf-turnstile {
        width: 300px !important;
        height: auto !important;
      }
      
      .cf-turnstile iframe {
        width: 300px !important;
        height: 65px !important;
        border-radius: 12px !important;
        border: 1px solid rgb(82 82 91) !important;
        background: rgba(39 39 42 / 0.5) !important;
        transition: all 0.3s ease-in-out !important;
      }
      
      .cf-turnstile iframe:hover {
        border-color: rgb(113 113 122) !important;
      }
      
      /* Stile per stato verificato */
      .cf-turnstile.verified iframe {
        border-color: rgb(34 197 94 / 0.5) !important;
        background: rgba(20 83 45 / 0.2) !important;
      }
      
      /* Personalizzazione del contenuto interno */
      .cf-turnstile .cf-turnstile-wrapper {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleTurnstileSuccess = (token: string) => {
    console.log('✅ Turnstile verificato con successo');
    setTurnstileToken(token);
    
    // Aggiungi classe per stato verificato
    const turnstileElement = document.querySelector('.cf-turnstile');
    if (turnstileElement) {
      turnstileElement.classList.add('verified');
    }
  };

  const handleTurnstileError = (error?: any) => {
    console.log('❌ Errore Turnstile:', error);
    setTurnstileToken('');
    
    // Rimuovi classe verificato
    const turnstileElement = document.querySelector('.cf-turnstile');
    if (turnstileElement) {
      turnstileElement.classList.remove('verified');
    }
  };

  const handleTurnstileExpire = () => {
    console.log('⏰ Token Turnstile scaduto');
    setTurnstileToken('');
    
    // Rimuovi classe verificato
    const turnstileElement = document.querySelector('.cf-turnstile');
    if (turnstileElement) {
      turnstileElement.classList.remove('verified');
    }
  };

  const handleGoogleSignUp = async () => {
    if (!acceptedTerms) {
      alert('Devi accettare i termini per continuare');
      return;
    }

    if (!turnstileToken) {
      alert('Completa la verifica di sicurezza');
      return;
    }

    setIsLoadingGoogle(true);
    try {
      await signIn('google');
    } catch (err) {
      console.error('Errore Google signup:', err);
      // Reset Turnstile in caso di errore
      if (turnstileRef.current?.reset) {
        turnstileRef.current.reset();
        setTurnstileToken('');
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleMagicLinkSubmit = async (email: string) => {
    if (!acceptedTerms) {
      alert('Devi accettare i termini per continuare');
      return;
    }

    if (!turnstileToken) {
      alert('Completa la verifica di sicurezza');
      return;
    }

    setIsLoadingMagicLink(true);
    setMagicLinkSent(false);
    setMagicLinkError(null);
    clearError();

    try {
      await sendMagicLink(email, 'sign-up');
      setMagicLinkSent(true);
      setSentEmail(email);
      console.log('✅ Magic link inviato!');
    } catch (err) {
      console.error('❌ Errore:', err);
      // Reset Turnstile in caso di errore
      if (turnstileRef.current?.reset) {
        turnstileRef.current.reset();
        setTurnstileToken('');
      }
    } finally {
      setIsLoadingMagicLink(false);
    }
  };

  const handleSendAnother = () => {
    setMagicLinkSent(false);
    setSentEmail('');
  };

  const isFormDisabled = !acceptedTerms || !turnstileToken;

  return (
    <AuthLayout>
      <AuthHeader 
        title="Unisciti alla Crew"
        subtitle="Crea il tuo account in 30 secondi"
      />

      {/* Banner errore magic link fallito */}
      {magicLinkError && (
        <ErrorBanner
          error={magicLinkError}
          subtitle="Riprova inserendo la tua email qui sotto."
          onDismiss={() => setMagicLinkError(null)}
        />
      )}

      {/* Errori generali */}
      {error && (
        <ErrorBanner error={error} />
      )}

      {/* Successo magic link */}
      {magicLinkSent && (
        <MagicLinkSuccess 
          email={sentEmail}
          onSendAnother={handleSendAnother}
        />
      )}

      {/* Form magic link */}
      {!magicLinkSent && (
        <MagicLinkForm
          onSubmit={handleMagicLinkSubmit}
          isLoading={isLoadingMagicLink}
          disabled={isFormDisabled}
        />
      )}

      {/* Divider */}
      {!magicLinkSent && <AuthDivider />}

      {/* Google button */}
      {!magicLinkSent && (
        <GoogleAuthButton
          onClick={handleGoogleSignUp}
          isLoading={isLoadingGoogle}
          disabled={isFormDisabled}
        />
      )}

      {/* Terms e Turnstile */}
      <div className="space-y-4">
        <TermsCheckbox
          accepted={acceptedTerms}
          onChange={setAcceptedTerms}
        />

        {/* Turnstile Widget Personalizzato */}
        <div className="flex justify-center py-2">
          <div className="turnstile-container">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={handleTurnstileSuccess}
              onError={handleTurnstileError}
              onExpire={handleTurnstileExpire}
              ref={turnstileRef}
              options={{
                theme: 'dark',
                appearance: 'always',
                size: 'normal',
                responseFieldName: 'cf-turnstile-response',
                retry: 'auto',
                refreshExpired: 'auto'
              }}
            />
          </div>
        </div>

        <SocialProof />
      </div>

      <AuthFooter isSignUp={true} />
    </AuthLayout>
  );
}