// Questo file è utilizzato solo lato server
// Non importare nel client-side

interface MagicLinkEmailData {
  email: string;
  url: string;
  name?: string;
}

class EmailService {
  async sendMagicLinkEmail(data: MagicLinkEmailData): Promise<boolean> {
    // In produzione, implementa qui l'invio email
    // Per ora, logghiamo solo l'URL
    console.log(`Magic link email per ${data.email}: ${data.url}`);
    
    // Simula l'invio dell'email
    return true;
  }

  generateMagicLinkEmailHTML(data: MagicLinkEmailData): string {
    const greeting = data.name ? `Ciao ${data.name},` : 'Ciao,';
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Accedi a Swaggerz Collective</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #ef4444; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Swaggerz Collective</h1>
            </div>
            
            <p>${greeting}</p>
            
            <p>Hai richiesto di accedere al tuo account. Clicca sul pulsante qui sotto per completare l'accesso:</p>
            
            <div style="text-align: center;">
              <a href="${data.url}" class="button">Accedi Ora</a>
            </div>
            
            <p>Se non hai richiesto questo accesso, puoi ignorare questa email.</p>
            
            <p>Il link scadrà tra 10 minuti per motivi di sicurezza.</p>
            
            <div class="footer">
              <p>Swaggerz Collective - Streetwear Autentico</p>
              <p>Se hai problemi, rispondi a questa email</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  generateMagicLinkEmailText(data: MagicLinkEmailData): string {
    const greeting = data.name ? `Ciao ${data.name},` : 'Ciao,';
    
    return `
      ${greeting}
      
      Hai richiesto di accedere al tuo account Swaggerz Collective.
      
      Clicca sul link seguente per completare l'accesso:
      ${data.url}
      
      Se non hai richiesto questo accesso, puoi ignorare questa email.
      
      Il link scadrà tra 10 minuti per motivi di sicurezza.
      
      Swaggerz Collective - Streetwear Autentico
    `;
  }
}

export const emailService = new EmailService();
