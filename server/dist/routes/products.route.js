import express from 'express';
const router = express.Router();
router.get('/:name', (req, res) => {
    res.send('Product - ' + req.params.name);
});
export default router;
//# sourceMappingURL=products.route.js.map