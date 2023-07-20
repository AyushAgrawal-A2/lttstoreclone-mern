import express from 'express';
import { products } from '../helpers/products.helper.js';
import createHttpError from 'http-errors';
const router = express.Router();
router.get('/', (req, res) => {
    res.send(products);
});
router.get('/:name', (req, res) => {
    const path = '/products/' + req.params.name;
    if (products.hasOwnProperty(path))
        res.send(products[path]);
    else
        res.send(createHttpError.NotFound());
});
export default router;
//# sourceMappingURL=products.route.js.map