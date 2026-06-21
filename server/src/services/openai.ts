import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface Analysis {
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export async function analyzeArticle(title: string, description: string, content: string): Promise<Analysis> {
  const text = [title, description, content].filter(Boolean).join('\n\n');

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-nano',
    messages: [
      {
        role: 'system',
        content:
          'You are a news analyst. Given a news article, return a JSON object with exactly two fields: "summary" (2–3 sentences summarising the key points) and "sentiment" (exactly one of: positive, neutral, negative).',
      },
      { role: 'user', content: text },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 300,
  });

  const result = JSON.parse(response.choices[0].message.content ?? '{}') as Partial<Analysis>;

  return {
    summary: result.summary ?? 'No summary available.',
    sentiment: (['positive', 'neutral', 'negative'] as const).includes(result.sentiment as 'positive' | 'neutral' | 'negative')
      ? (result.sentiment as 'positive' | 'neutral' | 'negative')
      : 'neutral',
  };
}
