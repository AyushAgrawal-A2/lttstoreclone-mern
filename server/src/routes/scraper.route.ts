import express, { Router, Request, Response } from 'express';
import {
  scrapeArticles,
  scrapeHomeBanner,
  scrapeProducts,
} from '../helpers/scraper.helper.js';
import { saveHomeBanner } from '../helpers/home.helper.js';
import { saveProducts } from '../helpers/products.helper.js';
import { saveArticles } from '../helpers/articles.helper.js';

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

router.get('/articles', (req: Request, res: Response) => {
  scrapeArticles().then((articles) => {
    saveArticles(articles);
    res.send(articles);
  });
});

export default router;
