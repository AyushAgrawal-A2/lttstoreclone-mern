import 'dotenv/config';
import './helpers/db.helper.js';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createHttpError from 'http-errors';
import accountRoutes from './routes/account.route.js';
import { auth } from './controllers/account.controller.js';
import homeRoutes from './routes/home.route.js';
import collectionsRoutes from './routes/collections.route.js';
import productsRoutes from './routes/products.route.js';
import blogsRoutes from './routes/blogs.route.js';
import reviewsRoutes from './routes/reviews.route.js';
import scraperRoutes from './routes/scraper.route.js';

const port = process.env.PORT ?? 3000;
const app: Express = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://lttstoreclone.vercel.app/'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/account', auth, accountRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/scrape', scraperRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError.NotFound());
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status ?? 500).send({
    error: {
      status: err.status ?? 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
