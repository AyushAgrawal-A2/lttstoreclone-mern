import express, { Router, Request, Response } from 'express';
import { scrapeProducts } from '../helpers/scraper.helper.js';
import { saveProducts } from '../helpers/products.helper.js';

const router: Router = express.Router();

router.get('/products', (req: Request, res: Response) => {
  scrapeProducts().then((products) => {
    saveProducts(products);
    res.send(products);
  });
});

export default router;
