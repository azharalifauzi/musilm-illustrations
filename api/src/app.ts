import express from 'express';
import 'express-async-errors';
import path from 'path';
import { json } from 'body-parser';
import illustrationRouter from './routes/illustration-route';
import QueryRouter from './routes/query-route';
import { defaultErrorHandler } from './controllers/error-handler';

const app = express();

app.use(json({ limit: '10kb' }));
app.use('/api/public', express.static(path.join(__dirname, './public')));

// Routes
app.use('/api/v1/illustrations', illustrationRouter);
app.use('/api/v1/queries', QueryRouter);

// Welcome Page
app.get('/api', (_req, res) => {
  res.send('<h1>Welcome to Null River API</h1>');
});

// Error Handler
app.all('*', async (_, res) => {
  res.status(404).send({
    message: 'Not Found!',
  });
});
app.use(defaultErrorHandler);

export default app;
