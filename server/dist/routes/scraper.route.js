import express from 'express';
import { scrapeBlogs, scrapeHomeBanner, scrapeProducts, } from '../helpers/scraper.helper.js';
import { saveHomeBanner } from '../helpers/home.helper.js';
import { saveProducts } from '../helpers/products.helper.js';
import { saveBlogs } from '../helpers/blogs.helper.js';
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
router.get('/blogs', (req, res) => {
    scrapeBlogs().then((blogs) => {
        saveBlogs(blogs);
        res.send(blogs);
    });
});
export default router;
//# sourceMappingURL=scraper.route.js.map