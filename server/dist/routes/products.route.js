import { products } from '../helpers/products.helper.js';
import express from 'express';
import createHttpError from 'http-errors';
const router = express.Router();
router.get('/:name', (req, res) => {
    const path = '/products/' + req.params.name;
    const product = products.find((product) => product.path === path);
    if (product)
        res.send(product);
    else
        res.send(createHttpError.NotFound());
});
export default router;
//# sourceMappingURL=products.route.js.map