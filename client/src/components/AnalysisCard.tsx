import type { Analysis } from '../types';
import SentimentBadge from './SentimentBadge';

interface Props {
  analysis: Analysis;
}

export default function AnalysisCard({ analysis }: Props) {
  const date = new Date(analysis.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
      {analysis.article_image_url && (
        <img
          src={analysis.article_image_url}
          alt=""
          className="w-20 h-20 object-cover rounded-lg shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <SentimentBadge sentiment={analysis.sentiment} />
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <a
          href={analysis.article_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-gray-900 hover:text-blue-600 line-clamp-1 mb-0.5 transition-colors"
        >
          {analysis.article_title}
        </a>
        <span className="text-xs text-blue-600 mb-2">{analysis.article_source}</span>
        <p className="text-xs text-gray-600 line-clamp-3">{analysis.summary}</p>
      </div>
    </div>
  );
}
