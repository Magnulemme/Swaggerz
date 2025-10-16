import dotenv from 'dotenv';
import path from 'path';

// Carica esplicitamente .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { getDb } from '@/db/index';

async function testDb() {
  console.log('DATABASE_URL letta da env:', process.env.DATABASE_URL);

  try {
    const db = getDb();
    const result = await db.execute('SELECT NOW()');
    console.log('Connessione al DB OK! Risultato query:', result);
  } catch (err) {
    console.error('Errore durante la connessione al DB:', err);
  }
}

testDb();