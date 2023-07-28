import { getProductCards } from '../helpers/products.helper.js';
import express from 'express';
const router = express.Router();
router.get('/:collection', (req, res) => {
    var _a, _b;
    const collection = req.params.collection;
    const page = parseInt((_a = req.query.page) !== null && _a !== void 0 ? _a : 1);
    const perPage = parseInt((_b = req.query.perPage) !== null && _b !== void 0 ? _b : 12);
    const sortCriteria = req.query.sortBy;
    const productCards = getProductCards(collection, page, perPage, sortCriteria);
    res.send({ productCards });
});
export default router;
//# sourceMappingURL=collections.route.js.map