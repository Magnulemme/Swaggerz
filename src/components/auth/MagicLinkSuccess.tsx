// components/auth/MagicLinkSuccess.tsx
import React from 'react';
import { Mail } from 'lucide-react';

interface MagicLinkSuccessProps {
  email: string;
  onSendAnother: () => void;
}

export const MagicLinkSuccess = ({ email, onSendAnother }: MagicLinkSuccessProps) => {
  return (
    <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-blue-300">
          Link magico inviato!
        </h3>
      </div>
      <div className="text-blue-200 space-y-3">
        <p>Ho inviato un link magico a <strong>{email}</strong></p>
        <div className="text-sm bg-blue-800/30 p-4 rounded-lg space-y-3">
          <p className="font-semibold">📬 Prossimi passi:</p>
          <ol className="list-decimal list-inside space-y-2 leading-relaxed">
            <li><strong>Controlla la tua email</strong> - Il link arriva in pochi secondi</li>
            <li><strong>Clicca &quot;Accedi alla Crew&quot;</strong> - Ti porterà direttamente alla dashboard</li>
            <li><strong>Se non vedi l&apos;email</strong> - Controlla la cartella spam</li>
          </ol>
          <div className="mt-3 p-3 bg-blue-900/40 rounded-lg">
            <p className="text-xs text-blue-100">
              💡 <strong>Tip:</strong> Il link è valido per 15 minuti. Non condividerlo con nessuno!
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onSendAnother}
        className="text-sm text-blue-400 hover:text-blue-300 underline"
      >
        Invia un altro link
      </button>
    </div>
  );
};