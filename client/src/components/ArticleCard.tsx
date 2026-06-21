import type { Article, Analysis } from '../types';
import SentimentBadge from './SentimentBadge';

interface Props {
  article: Article;
  analysis?: Analysis;
  analyzing: boolean;
  onAnalyze: (article: Article) => void;
}

export default function ArticleCard({ article, analysis, analyzing, onAnalyze }: Props) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt=""
          className="w-full h-40 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-600">{article.source}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-2 transition-colors"
        >
          {article.title}
        </a>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{article.description}</p>

        {analysis ? (
          <div className="border-t border-gray-100 pt-3 mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <SentimentBadge sentiment={analysis.sentiment} />
              <span className="text-xs text-gray-400">AI analysis</span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-3">{analysis.summary}</p>
          </div>
        ) : (
          <button
            onClick={() => onAnalyze(article)}
            disabled={analyzing}
            className="mt-auto w-full py-2 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {analyzing ? 'Analyzing…' : '✦ Analyse with AI'}
          </button>
        )}
      </div>
    </div>
  );
}
