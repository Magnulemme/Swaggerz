// lib/magic-link.ts
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Genera token sicuro
export function generateMagicToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Invia magic link email con URL Better Auth
export async function sendMagicLinkEmailWithUrl(email: string, magicUrl: string, authType: string = 'sign-up') {
  console.log('🔧 SendMagicLinkEmailWithUrl called with:');
  console.log(`  📧 Email: ${email}`);
  console.log(`  🔗 MagicUrl: ${magicUrl}`);
  console.log(`  🔖 AuthType: ${authType}`);
  console.log(`  🔑 EMAIL_USER present: ${!!process.env.EMAIL_USER}`);
  console.log(`  🔑 EMAIL_PASS present: ${!!process.env.EMAIL_PASS}`);

  // Opzione 1: Gmail/Nodemailer
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      console.log('🚀 Attempting to send via Gmail/Nodemailer...');

      // Configurazione transporter Gmail con SMTP esplicito
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true per 465, false per altri ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // Template email HTML con tipo di auth
      const isSignIn = authType === 'sign-in';
      const emailTemplateHtml = `
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d1b69 100%); padding: 40px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: rgba(255,255,255,0.05); border-radius: 20px; padding: 40px; text-align: center; backdrop-filter: blur(10px);">
            <h1 style="color: #ff6b35; font-size: 32px; margin-bottom: 16px; font-weight: 700;">
              ${isSignIn ? '👋 Bentornato!' : '🔥 Benvenuto nella Crew!'}
            </h1>
            <p style="color: #ffffff; font-size: 18px; margin-bottom: 32px; line-height: 1.5;">
              ${isSignIn
                ? 'Clicca il bottone qui sotto per accedere al tuo account'
                : 'Clicca il bottone qui sotto per completare la registrazione e accedere alla community streetwear più autentica'
              }
            </p>
            <a href="${magicUrl}" style="
              display: inline-block;
              background: linear-gradient(45deg, #ef4444, #f97316, #facc15);
              color: white;
              padding: 20px 48px;
              border-radius: 16px;
              text-decoration: none;
              font-weight: 700;
              font-size: 18px;
              margin: 24px 0;
              box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
            ">
              ${isSignIn ? '🚀 Accedi al tuo Account' : '🚀 Completa Registrazione'}
            </a>
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #9ca3af; font-size: 14px; margin: 8px 0;">
                <strong>Questo link è valido per 15 minuti</strong>
              </p>
              <p style="color: #6b7280; font-size: 12px;">
                ${isSignIn
                  ? 'Se non hai richiesto l\'accesso, puoi ignorare questa email.'
                  : 'Se non hai richiesto la registrazione, puoi ignorare questa email.'
                }<br>
                <strong>Magic Link URL:</strong> <a href="${magicUrl}" style="color: #60a5fa; word-break: break-all;">${magicUrl}</a>
              </p>
            </div>
          </div>
        </div>
      `;

      // Invio email
      const emailSubject = isSignIn ? '🔗 Magic Link - Accedi al tuo account' : '🔗 Magic Link - Completa la registrazione';
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: emailSubject,
        html: emailTemplateHtml
      });

      console.log('✅ Gmail response - MessageId:', info.messageId);
      console.log('✅ Magic link inviato via Gmail con successo!');
      return true;

    } catch (error: any) {
      console.error('❌ Errore invio email Gmail:', error);
      console.error('❌ Error stack:', error.stack);
      throw error;
    }
  }

  // Opzione 2: Development mode
  console.log('🔗 DEVELOPMENT MODE - Magic Link:');
  console.log(`📧 Email: ${email}`);
  console.log(`🔗 URL: ${magicUrl}`);
  console.log(`🔖 Type: ${authType}`);
  console.log('⚠️ Configura EMAIL_USER e EMAIL_PASS per Gmail');
  return true;
}

// Verifica se un token è valido (controllo base tempo)
export function isTokenExpired(createdAt: Date, expiresInMinutes: number = 15): boolean {
  const now = new Date();
  const expiry = new Date(createdAt.getTime() + (expiresInMinutes * 60 * 1000));
  return now > expiry;
}