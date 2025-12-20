import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/public';

if (!env.PUBLIC_DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.PUBLIC_DATABASE_URL);
export const db = drizzle(client, { schema });
