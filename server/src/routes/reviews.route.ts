import express, { Router, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { scrapeProductReviews } from '../helpers/scraper.helper.js';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const productId = req.query.productId?.toString() ?? '';
  const page: string = req.query.page?.toString() ?? '';
  if (productId) {
    const review: ReviewResponse = await scrapeProductReviews(productId, page);
    res.send(review);
  } else res.send(createHttpError.NotFound());
});

export default router;
