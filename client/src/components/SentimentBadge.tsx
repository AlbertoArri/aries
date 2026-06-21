interface Props {
  sentiment: 'positive' | 'neutral' | 'negative';
}

const config = {
  positive: { label: 'Positive', className: 'bg-green-100 text-green-800' },
  neutral: { label: 'Neutral', className: 'bg-gray-100 text-gray-700' },
  negative: { label: 'Negative', className: 'bg-red-100 text-red-800' },
};

export default function SentimentBadge({ sentiment }: Props) {
  const { label, className } = config[sentiment];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
