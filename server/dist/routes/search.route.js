import { getSearchResults } from '../helpers/products.helper.js';
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    const searchText = req.query.searchText;
    const searchResults = getSearchResults(searchText);
    res.send({ searchResults });
});
export default router;
//# sourceMappingURL=search.route.js.map