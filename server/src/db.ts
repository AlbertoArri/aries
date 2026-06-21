import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS analyses (
      id SERIAL PRIMARY KEY,
      article_url TEXT UNIQUE NOT NULL,
      article_title TEXT NOT NULL,
      article_source TEXT NOT NULL,
      article_published_at TIMESTAMPTZ NOT NULL,
      article_image_url TEXT,
      summary TEXT NOT NULL,
      sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

export default pool;
