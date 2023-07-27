import express from 'express';
import { homeBanner } from '../helpers/home.helper.js';
import { getProductCards } from '../helpers/products.helper.js';
import { getArticlesCards } from '../helpers/articles.helper.js';
const router = express.Router();
router.get('/', (req, res) => {
    const home = {
        banner: homeBanner,
        featured: getProductCards('top-sellers', 1, 3),
        bestseller: getProductCards('all-products-1', 1, 6, 'bestseller'),
        articles: getArticlesCards(1, 3),
    };
    res.send(home);
});
export default router;
//# sourceMappingURL=home.route.js.map