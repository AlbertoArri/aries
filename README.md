# Newslens

Search for news articles and get AI-powered summaries and sentiment analysis, powered by GNews and OpenAI.

## Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL
- **AI:** OpenAI `gpt-4.1-nano`
- **News:** GNews API

## Local development

### Prerequisites

- Node.js 20+
- PostgreSQL running locally

### Setup

```bash
npm install
cp .env.example .env
# Fill in .env with your keys
```

Create a local database:

```bash
createdb aries
```

### Run

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/news?q={query}` | Search news articles |
| `GET` | `/api/analyses` | Get all stored analyses |
| `POST` | `/api/analyses` | Analyse an article (stores result) |

## Deploy

The app ships as a Docker container. Set the following environment variables in your host:

```
DATABASE_URL=...
GNEWS_API_KEY=...
OPENAI_API_KEY=...
```
