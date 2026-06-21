export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string; url: string };
}

export async function searchNews(query: string): Promise<Article[]> {
  const url = new URL('https://gnews.io/api/v4/search');
  url.searchParams.set('q', query);
  url.searchParams.set('lang', 'en');
  url.searchParams.set('max', '9');
  url.searchParams.set('apikey', process.env.GNEWS_API_KEY ?? '');

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GNews API error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { articles: GNewsArticle[] };
  return data.articles.map((a) => ({
    title: a.title,
    description: a.description,
    content: a.content,
    url: a.url,
    imageUrl: a.image,
    publishedAt: a.publishedAt,
    source: a.source.name,
  }));
}
