import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Create a connection pool to the PostgreSQL database
// If DATABASE_URL is missing, we create a safe dummy pool so Drizzle doesn't crash on initialization in Vercel
const isLocalMode = !process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === '';

const pool = isLocalMode
  ? ({
      query: async () => ({ rows: [] }),
      connect: async () => ({ release: () => {}, query: async () => ({ rows: [] }) }),
      on: () => {},
      end: async () => {},
    } as any as Pool)
  : new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, { schema });
