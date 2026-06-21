export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

export const TOP_HEADLINE_CATEGORIES = [
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

export type TopHeadlineCategory = (typeof TOP_HEADLINE_CATEGORIES)[number];

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string; url: string };
}

function mapArticle(a: GNewsArticle): Article {
  return {
    title: a.title,
    description: a.description,
    content: a.content,
    url: a.url,
    imageUrl: a.image,
    publishedAt: a.publishedAt,
    source: a.source.name,
  };
}

async function fetchArticles(url: URL): Promise<Article[]> {
  url.searchParams.set('apikey', process.env.GNEWS_API_KEY ?? '');

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GNews API error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { articles: GNewsArticle[] };
  return data.articles.map(mapArticle);
}

export async function searchNews(query: string): Promise<Article[]> {
  const url = new URL('https://gnews.io/api/v4/search');
  url.searchParams.set('q', query);
  url.searchParams.set('lang', 'en');
  url.searchParams.set('max', '9');
  return fetchArticles(url);
}

export async function getTopHeadlines(category: TopHeadlineCategory): Promise<Article[]> {
  const url = new URL('https://gnews.io/api/v4/top-headlines');
  url.searchParams.set('category', category);
  url.searchParams.set('lang', 'en');
  url.searchParams.set('max', '3');
  return fetchArticles(url);
}
