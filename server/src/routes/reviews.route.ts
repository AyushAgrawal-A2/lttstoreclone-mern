import express, { Router, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getProductReviews } from '../helpers/productReviews.helper.js';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const productId = req.query.productId?.toString() ?? '';
  const page = req.query.page?.toString() ?? '';
  const reviewStars = req.query.reviewStars?.toString() ?? '';
  if (productId) {
    const review: ReviewResponse = await getProductReviews(
      productId,
      page,
      reviewStars
    );
    res.send(review);
  } else res.send(createHttpError.NotFound());
});

export default router;
