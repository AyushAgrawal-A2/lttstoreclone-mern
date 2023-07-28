import { getProductCard, getProduct } from '../helpers/products.helper.js';
import express, { Router, Request, Response } from 'express';
import createHttpError from 'http-errors';

const router: Router = express.Router();

router.get('/:name', (req: Request, res: Response) => {
  const path = '/products/' + req.params.name;
  const product = getProduct(path);
  if (product) {
    const productCards: ProductCard[] = [];
    if (
      product.details['Related Products'] &&
      product.details['Related Products'].type === 'links'
    ) {
      product.details['Related Products'].data
        .map((path) => getProduct(path))
        .forEach((product) => {
          if (product) productCards.push(getProductCard(product));
        });
    }
    res.send({ product, productCards });
  } else res.send(createHttpError.NotFound());
});

export default router;
