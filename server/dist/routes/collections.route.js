import { products } from '../helpers/products.helper.js';
import express from 'express';
const router = express.Router();
router.get('/:collection', (req, res) => {
    var _a, _b;
    const collection = req.params.collection;
    const sortCriteria = req.query.sortBy;
    const page = (_a = parseInt(req.query.page)) !== null && _a !== void 0 ? _a : 0;
    const perPage = (_b = parseInt(req.query.perPage)) !== null && _b !== void 0 ? _b : 12;
    let result = collection === 'all'
        ? products
        : products.filter((product) => product.collection === collection);
    if (sortCriteria) {
        result = result.sort((a, b) => a.ranks[sortCriteria] - b.ranks[sortCriteria]);
    }
    result = result.slice((page - 1) * perPage, page * perPage);
    res.send(result);
});
export default router;
//# sourceMappingURL=collections.route.js.map