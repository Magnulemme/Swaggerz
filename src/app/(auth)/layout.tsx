"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { SwagLoader } from "@/components/SwagLoader";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayoutContent({ children }: AuthLayoutProps) {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [verificationMessage, setVerificationMessage] = useState<string>("Caricando...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { user, isAuthenticated, loading } = useAuth();

  // Handle verification callback logic
  useEffect(() => {
    const handleVerificationCallback = async () => {
      // Solo se siamo nella pagina di verifica
      if (!pathname.includes('/verify-callback')) return;

      setVerificationMessage("Verifica in corso...");

      const error = searchParams.get('error');
      const authType = searchParams.get('type') || 'sign-up';

      // Se c'è un errore, reindirizza alla pagina appropriata con il messaggio
      if (error) {
        let errorMessage = '';

        switch (error) {
          case 'INVALID_TOKEN':
            errorMessage = 'Il link è scaduto o non valido. Richiedi un nuovo magic link.';
            break;
          case 'TOKEN_EXPIRED':
            errorMessage = 'Il link è scaduto. I magic link sono validi per 15 minuti.';
            break;
          case 'VERIFICATION_FAILED':
            errorMessage = 'Errore durante la verifica. Riprova più tardi.';
            break;
          default:
            errorMessage = 'Si è verificato un errore durante l\'accesso.';
        }

        // Reindirizza alla pagina appropriata in base al tipo di auth
        const targetPath = authType === 'sign-in' ? '/sign-in' : '/sign-up';
        const targetUrl = new URL(targetPath, window.location.origin);
        targetUrl.searchParams.set('error', errorMessage);
        targetUrl.searchParams.set('error_type', 'magic_link_failed');

        router.replace(targetUrl.toString());
        return;
      }

      // Aspetta che il loading finisca
      if (loading) return;

      // Se l'utente è autenticato, vai alla dashboard
      if (user) {
        router.replace('/dashboard');
        return;
      }

      // Se non è autenticato e non ci sono errori, potrebbe essere un problema
      const targetPath = authType === 'sign-in' ? '/sign-in' : '/sign-up';
      router.replace(`${targetPath}?error=Sessione non trovata. Riprova ad accedere.&error_type=session_missing`);
    };

    handleVerificationCallback();
  }, [user, loading, searchParams, router, pathname]);

  // Handle general session check
  useEffect(() => {
    // Skip session check se siamo in verifica (gestita sopra)
    if (pathname.includes('/verify-callback')) return;

    console.log('🔍 AuthLayout useEffect:', { loading, isAuthenticated, isCheckingSession });
    if (!loading) {
      if (isAuthenticated) {
        console.log('✅ User authenticated, redirecting to dashboard');
        router.push('/dashboard');
        return;
      }
      if (isCheckingSession) {
        console.log('❌ User not authenticated, setting isCheckingSession to false');
        setIsCheckingSession(false);
      }
    }
  }, [isAuthenticated, loading, router, isCheckingSession, pathname]);

  // Show loader while checking session or during verification
  if (isCheckingSession || pathname.includes('/verify-callback')) {
    console.log('🔄 AuthLayout: Mostrando SwagLoader - isCheckingSession:', isCheckingSession, 'loading:', loading, 'isAuthenticated:', isAuthenticated);
    return <SwagLoader message={pathname.includes('/verify-callback') ? verificationMessage : undefined} />;
  }

  return <>{children}</>;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Suspense fallback={<SwagLoader message="Caricando..." />}>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </Suspense>
  );
}