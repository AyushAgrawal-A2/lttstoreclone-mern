import express from 'express';
import createHttpError from 'http-errors';
import { scrapeProductReviews } from '../helpers/scraper.helper.js';
const router = express.Router();
router.get('/', async (req, res) => {
    const productId = req.query.productId?.toString() ?? '';
    const page = req.query.page?.toString() ?? '';
    if (productId) {
        const review = await scrapeProductReviews(productId, page);
        res.send(review);
    }
    else
        res.send(createHttpError.NotFound());
});
export default router;
//# sourceMappingURL=reviews.route.js.map