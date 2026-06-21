export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

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
