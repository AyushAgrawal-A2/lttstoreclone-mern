import express from 'express';
import { scrapeProducts } from '../helpers/scraper.helper.js';
import { saveProducts } from '../helpers/products.helper.js';
const router = express.Router();
router.get('/products', (req, res) => {
    scrapeProducts().then((products) => {
        saveProducts(products);
        res.send(products);
    });
});
export default router;
//# sourceMappingURL=scraper.route.js.map