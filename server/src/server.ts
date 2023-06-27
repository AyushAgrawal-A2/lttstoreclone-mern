import 'dotenv/config';
import './db.js';
import express, { Express, Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import accountRoutes from './routes/account.route.js';
import collectionsRoutes from './routes/collections.route.js';
import productsRoutes from './routes/products.route.js';
import auth from './middlewares/auth.js';

const port = process.env.PORT ?? 3000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.use('/api/account', accountRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/products', productsRoutes);
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
