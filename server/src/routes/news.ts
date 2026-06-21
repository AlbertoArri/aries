import { Router } from 'express';
import { searchNews } from '../services/gnews';

const router = Router();

router.get('/', async (req, res) => {
  const q = req.query.q as string;
  if (!q?.trim()) {
    res.status(400).json({ error: 'Query parameter "q" is required' });
    return;
  }
  try {
    const articles = await searchNews(q.trim());
    res.json(articles);
  } catch (err) {
    console.error('GNews error:', err);
    res.status(502).json({ error: 'Failed to fetch news articles' });
  }
});

export default router;
