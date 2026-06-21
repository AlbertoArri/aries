import { Router } from 'express';
import { searchNews, getTopHeadlines, TOP_HEADLINE_CATEGORIES, type TopHeadlineCategory } from '../services/gnews';

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

router.get('/top-headlines', async (req, res) => {
  const category = (req.query.category as string) || 'general';
  if (!TOP_HEADLINE_CATEGORIES.includes(category as TopHeadlineCategory)) {
    res.status(400).json({ error: `Invalid category. Must be one of: ${TOP_HEADLINE_CATEGORIES.join(', ')}` });
    return;
  }
  try {
    const articles = await getTopHeadlines(category as TopHeadlineCategory);
    res.json(articles);
  } catch (err) {
    console.error('GNews error:', err);
    res.status(502).json({ error: 'Failed to fetch top headlines' });
  }
});

export default router;
