// scripts/initDb.ts
import dotenv from 'dotenv';
import path from 'path';

// Carica esplicitamente .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { getDb } from '@/db/index';

async function main() {
  console.log('DATABASE_URL caricata:', process.env.DATABASE_URL ? 'OK' : 'MANCANTE');
  
  const db = getDb();

  // Creazione tabella users
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255),
      image TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
  `);

  // Creazione tabella sessions
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id SERIAL NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      active BOOLEAN DEFAULT TRUE NOT NULL
    );
  `);

  // Creazione tabella products
  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      price_cents INT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
  `);

  console.log('Tables created successfully!');
  process.exit(0);
}

// Gestione errori
main().catch((err) => {
  console.error(err);
  process.exit(1);
});