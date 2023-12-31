import { getProductCards } from '../helpers/products.helper.js';
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/:collection', (req: Request, res: Response) => {
  const collection = req.params.collection as string;
  const page = parseInt((req.query.page as string) ?? 1);
  const perPage = parseInt((req.query.perPage as string) ?? 12);
  const sortCriteria = req.query.sortBy as string;
  const searchText = req.query.searchText as string;
  const { productCards, totalCards } = getProductCards(
    collection,
    page,
    perPage,
    sortCriteria,
    [],
    searchText
  );
  res.send({ productCards, totalCards });
});

export default router;
