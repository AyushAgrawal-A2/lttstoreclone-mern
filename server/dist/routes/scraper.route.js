import express from 'express';
import { scrapeArticles, scrapeHomeBanner, scrapeProducts, } from '../helpers/scraper.helper.js';
import { saveHomeBanner } from '../helpers/home.helper.js';
import { saveProducts } from '../helpers/products.helper.js';
import { saveArticles } from '../helpers/articles.helper.js';
const router = express.Router();
router.get('/home', (req, res) => {
    scrapeHomeBanner().then((home) => {
        saveHomeBanner(home);
        res.send(home);
    });
});
router.get('/products', (req, res) => {
    scrapeProducts().then((products) => {
        saveProducts(products);
        res.send(products);
    });
});
router.get('/articles', (req, res) => {
    scrapeArticles().then((articles) => {
        saveArticles(articles);
        res.send(articles);
    });
});
export default router;
//# sourceMappingURL=scraper.route.js.map