import { products } from '../helpers/products.helper.js';
import express, { Router, Request, Response } from 'express';
import createHttpError from 'http-errors';

const router: Router = express.Router();

router.get('/:name', (req: Request, res: Response) => {
  const path = '/products/' + req.params.name;
  const product = products.find((product) => product.path === path);
  if (product) res.send(product);
  else res.send(createHttpError.NotFound());
});

export default router;
