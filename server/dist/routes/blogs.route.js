import express from 'express';
import { getBlog, getBlogCards } from '../helpers/blogs.helper.js';
import createHttpError from 'http-errors';
const router = express.Router();
router.get('/', (req, res) => {
    var _a, _b;
    const page = parseInt((_a = req.query.page) !== null && _a !== void 0 ? _a : 1);
    const perPage = parseInt((_b = req.query.perPage) !== null && _b !== void 0 ? _b : 12);
    const blogCards = getBlogCards(page, perPage);
    res.send({ blogCards });
});
router.get('/:blogPath', (req, res) => {
    const blogPath = req.params.blogPath;
    const blog = getBlog(blogPath);
    if (blog)
        res.send(blog);
    else
        res.send(createHttpError.NotFound());
});
export default router;
//# sourceMappingURL=blogs.route.js.map