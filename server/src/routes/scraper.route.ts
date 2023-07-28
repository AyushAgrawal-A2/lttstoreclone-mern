import express, { Router, Request, Response } from 'express';
import {
  scrapeBlogs,
  scrapeHomeBanner,
  scrapeProducts,
} from '../helpers/scraper.helper.js';
import { saveHomeBanner } from '../helpers/home.helper.js';
import { saveProducts } from '../helpers/products.helper.js';
import { saveBlogs } from '../helpers/blogs.helper.js';

const router: Router = express.Router();

router.get('/home', (req: Request, res: Response) => {
  scrapeHomeBanner().then((home) => {
    saveHomeBanner(home);
    res.send(home);
  });
});

router.get('/products', (req: Request, res: Response) => {
  scrapeProducts().then((products) => {
    saveProducts(products);
    res.send(products);
  });
});

router.get('/blogs', (req: Request, res: Response) => {
  scrapeBlogs().then((blogs) => {
    saveBlogs(blogs);
    res.send(blogs);
  });
});

export default router;
