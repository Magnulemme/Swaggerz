import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

console.log("process.env:", process.env);

console.log("DATABASE_URL:", process.env.DATABASE_URL);


let cachedDb: ReturnType<typeof drizzle> | null = null;

export function getDb() {
	if (cachedDb) return cachedDb;
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error('DATABASE_URL is not set');
	}
	const sql = neon(url);
	cachedDb = drizzle(sql);
	return cachedDb;
}
