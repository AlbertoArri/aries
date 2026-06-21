import { useState, type FormEvent } from 'react';
import { NEWS_CATEGORIES, type NewsCategory } from '../types';

type Mode = 'search' | 'category';

interface Props {
  onSearch: (query: string) => void;
  onCategorySearch: (category: NewsCategory) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, onCategorySearch, loading }: Props) {
  const [mode, setMode] = useState<Mode>('search');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<NewsCategory>('general');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'search') {
      if (query.trim()) onSearch(query.trim());
    } else {
      onCategorySearch(category);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden shrink-0 text-sm">
        <button
          type="button"
          onClick={() => setMode('search')}
          className={`px-3 py-2 font-medium transition-colors ${
            mode === 'search' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => setMode('category')}
          className={`px-3 py-2 font-medium border-l border-gray-300 transition-colors ${
            mode === 'category' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Category
        </button>
      </div>

      {mode === 'search' ? (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news topics..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as NewsCategory)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {NEWS_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        disabled={loading || (mode === 'search' && !query.trim())}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Searching…' : mode === 'search' ? 'Search' : 'Get'}
      </button>
    </form>
  );
}
