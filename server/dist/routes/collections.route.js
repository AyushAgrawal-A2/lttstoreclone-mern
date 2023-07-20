import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Collections');
});
router.get('/:category', (req, res) => {
    res.send('Collection - ' + req.params.category);
});
export default router;
//# sourceMappingURL=collections.route.js.map