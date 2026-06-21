import './env';

import path from 'path';
import express from 'express';
import cors from 'cors';
import { initDb } from './db';
import newsRouter from './routes/news';
import analysesRouter from './routes/analyses';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/news', newsRouter);
app.use('/api/analyses', analysesRouter);

if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../public');
  app.use(express.static(clientPath));
  app.get('*', (_req, res) => res.sendFile(path.join(clientPath, 'index.html')));
}

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
