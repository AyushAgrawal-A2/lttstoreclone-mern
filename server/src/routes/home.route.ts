import express, { Router, Request, Response } from 'express';
import { getHomeBanner } from '../helpers/home.helper.js';
import { getProductCards } from '../helpers/products.helper.js';
import { getBlogCards } from '../helpers/blogs.helper.js';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const home: Home = {
    banner: getHomeBanner(),
    featured: getProductCards('top-sellers', 1, 3).productCards,
    bestseller: getProductCards('all-products-1', 1, 6, 'bestseller')
      .productCards,
    blogs: getBlogCards(1, 3),
  };
  res.send(home);
});

export default router;
