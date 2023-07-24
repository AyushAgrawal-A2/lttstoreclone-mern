import { products } from '../helpers/products.helper.js';
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/:collection', (req: Request, res: Response) => {
  const collection = req.params.collection as string;
  const sortCriteria = req.query.sortBy as string;
  const page = parseInt(req.query.page as string) ?? 0;
  const perPage = parseInt(req.query.perPage as string) ?? 12;
  let result =
    collection === 'all'
      ? products
      : products.filter((product) => product.collection === collection);
  if (sortCriteria) {
    result = result.sort(
      (a, b) => a.ranks[sortCriteria] - b.ranks[sortCriteria]
    );
  }
  result = result.slice((page - 1) * perPage, page * perPage);
  res.send(result);
});

export default router;
