import { MagicLinkTest } from '@/components/MagicLinkTest';

export default function TestMagicLinkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Magic Link Test
          </h1>
          <p className="text-gray-400">
            Testa il sistema di autenticazione con magic link
          </p>
        </div>
        
        <MagicLinkTest />
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Better Auth + Resend + Streetwear Crew 🔥
          </p>
        </div>
      </div>
    </div>
  );
}