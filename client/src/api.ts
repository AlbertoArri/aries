import type { Article, Analysis, NewsCategory } from './types';

const BASE = '/api';

export async function searchNews(query: string): Promise<Article[]> {
  const res = await fetch(`${BASE}/news?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search news');
  return res.json() as Promise<Article[]>;
}

export async function getTopHeadlines(category: NewsCategory): Promise<Article[]> {
  const res = await fetch(`${BASE}/news/top-headlines?category=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Failed to fetch top headlines');
  return res.json() as Promise<Article[]>;
}

export async function getAnalyses(): Promise<Analysis[]> {
  const res = await fetch(`${BASE}/analyses`);
  if (!res.ok) throw new Error('Failed to fetch analyses');
  return res.json() as Promise<Analysis[]>;
}

export async function analyzeArticle(article: Article): Promise<Analysis> {
  const res = await fetch(`${BASE}/analyses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: article.url,
      title: article.title,
      description: article.description,
      content: article.content,
      source: article.source,
      publishedAt: article.publishedAt,
      imageUrl: article.imageUrl,
    }),
  });
  if (!res.ok) throw new Error('Failed to analyze article');
  return res.json() as Promise<Analysis>;
}
