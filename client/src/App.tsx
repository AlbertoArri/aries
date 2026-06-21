import { useState, useEffect } from 'react';
import type { Article, Analysis, NewsCategory } from './types';
import { searchNews, getTopHeadlines, getAnalyses, analyzeArticle } from './api';
import SearchBar from './components/SearchBar';
import ArticleCard from './components/ArticleCard';
import AnalysisCard from './components/AnalysisCard';

export default function App() {
  const [resultsLabel, setResultsLabel] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [analyzingUrls, setAnalyzingUrls] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAnalyses().then(setAnalyses).catch(console.error);
  }, []);

  const handleSearch = async (q: string) => {
    setError(null);
    setLoadingArticles(true);
    try {
      const results = await searchNews(q);
      setArticles(results);
      setResultsLabel(`Results for "${q}"`);
    } catch {
      setError('Failed to fetch news. Check your search and try again.');
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleCategorySearch = async (category: NewsCategory) => {
    setError(null);
    setLoadingArticles(true);
    try {
      const results = await getTopHeadlines(category);
      setArticles(results);
      setResultsLabel(`Top Headlines: ${category.charAt(0).toUpperCase() + category.slice(1)}`);
    } catch {
      setError('Failed to fetch top headlines. Please try again.');
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleAnalyze = async (article: Article) => {
    setAnalyzingUrls((prev) => new Set(prev).add(article.url));
    setError(null);
    try {
      const analysis = await analyzeArticle(article);
      setAnalyses((prev) => {
        const exists = prev.some((a) => a.article_url === analysis.article_url);
        if (exists) return prev.map((a) => (a.article_url === analysis.article_url ? analysis : a));
        return [analysis, ...prev];
      });
    } catch {
      setError('Failed to analyse article. Please try again.');
    } finally {
      setAnalyzingUrls((prev) => {
        const next = new Set(prev);
        next.delete(article.url);
        return next;
      });
    }
  };

  const analysisMap = new Map(analyses.map((a) => [a.article_url, a]));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
          <h1 className="text-lg font-bold text-gray-900 shrink-0 tracking-tight">A5o A2i News</h1>
          <SearchBar onSearch={handleSearch} onCategorySearch={handleCategorySearch} loading={loadingArticles} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {articles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{resultsLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article) => (
                <ArticleCard
                  key={article.url}
                  article={article}
                  analysis={analysisMap.get(article.url)}
                  analyzing={analyzingUrls.has(article.url)}
                  onAnalyze={handleAnalyze}
                />
              ))}
            </div>
          </section>
        )}

        {!articles.length && !loadingArticles && (
          <div className="text-center py-20 text-gray-400 text-sm">
            Search for a topic, or pick a category to see its top headlines
          </div>
        )}

        {analyses.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Analysed Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyses.map((analysis) => (
                <AnalysisCard key={analysis.id} analysis={analysis} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
