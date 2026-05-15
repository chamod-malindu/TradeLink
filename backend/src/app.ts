import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/job.routes';

const app = express();

// middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://your-domain.com'
        : 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));

// routes
app.use('/api/jobs', jobRoutes);

// health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'TradeLink API is running',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: 'The requested endpoint does not exist.',
  });
});

// global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message:
        process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
);

export default app;
