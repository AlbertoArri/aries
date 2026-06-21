import { Router } from 'express';
import pool from '../db';
import { analyzeArticle } from '../services/openai';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM analyses ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

router.post('/', async (req, res) => {
  const { url, title, description, content, source, publishedAt, imageUrl } = req.body as {
    url: string;
    title: string;
    description: string;
    content: string;
    source: string;
    publishedAt: string;
    imageUrl?: string;
  };

  if (!url || !title || !content) {
    res.status(400).json({ error: 'url, title, and content are required' });
    return;
  }

  const existing = await pool.query('SELECT * FROM analyses WHERE article_url = $1', [url]);
  if (existing.rows.length > 0) {
    res.json(existing.rows[0]);
    return;
  }

  try {
    const { summary, sentiment } = await analyzeArticle(title, description, content);

    const { rows } = await pool.query(
      `INSERT INTO analyses (article_url, article_title, article_source, article_published_at, article_image_url, summary, sentiment)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [url, title, source, publishedAt, imageUrl ?? null, summary, sentiment],
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: 'Failed to analyze article' });
  }
});

export default router;
