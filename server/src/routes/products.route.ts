import { products } from '../helpers/products.helper.js';
import express, { Router, Request, Response } from 'express';
import createHttpError from 'http-errors';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(products);
});

router.get('/:name', (req: Request, res: Response) => {
  const path = '/products/' + req.params.name;
  if (products.hasOwnProperty(path)) res.send(products[path]);
  else res.send(createHttpError.NotFound());
});

export default router;
