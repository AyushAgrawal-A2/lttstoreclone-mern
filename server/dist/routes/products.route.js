import { products, getProductCard } from '../helpers/products.helper.js';
import express from 'express';
import createHttpError from 'http-errors';
const router = express.Router();
router.get('/:name', (req, res) => {
    const path = '/products/' + req.params.name;
    const product = products.find((product) => product.path === path);
    if (product) {
        const productCards = [];
        if (product.details['Related Products'] &&
            product.details['Related Products'].type === 'links') {
            product.details['Related Products'].data
                .map((path) => products.find((product) => product.path === path))
                .forEach((product) => {
                if (product)
                    productCards.push(getProductCard(product));
            });
        }
        res.send({ product, productCards });
    }
    else
        res.send(createHttpError.NotFound());
});
export default router;
//# sourceMappingURL=products.route.js.map