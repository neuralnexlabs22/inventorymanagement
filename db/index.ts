import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Create a connection pool to the PostgreSQL database
const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : ({} as Pool); // Dummy pool for local mode

export const db = drizzle(pool, { schema });
