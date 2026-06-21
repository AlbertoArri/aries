export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

export const NEWS_CATEGORIES = [
  'general',
  'world',
  'nation',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export interface Analysis {
  id: number;
  article_url: string;
  article_title: string;
  article_source: string;
  article_published_at: string;
  article_image_url: string | null;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  created_at: string;
}
