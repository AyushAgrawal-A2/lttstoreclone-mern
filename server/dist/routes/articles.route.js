import express from 'express';
import { getArticle, getArticlesCards } from '../helpers/articles.helper.js';
import createHttpError from 'http-errors';
const router = express.Router();
router.get('/', (req, res) => {
    var _a, _b;
    const page = parseInt((_a = req.query.page) !== null && _a !== void 0 ? _a : 1);
    const perPage = parseInt((_b = req.query.perPage) !== null && _b !== void 0 ? _b : 12);
    const articleCards = getArticlesCards(page, perPage);
    res.send({ articleCards });
});
router.get('/:articlePath', (req, res) => {
    const articlePath = req.params.articlePath;
    const article = getArticle(articlePath);
    if (article)
        res.send(article);
    else
        res.send(createHttpError.NotFound());
});
export default router;
//# sourceMappingURL=articles.route.js.map