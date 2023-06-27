var _a;
import 'dotenv/config';
import './db.js';
import express from 'express';
import createHttpError from 'http-errors';
import accountRoutes from './routes/account.route.js';
import collectionsRoutes from './routes/collections.route.js';
import productsRoutes from './routes/products.route.js';
import auth from './middlewares/auth.js';
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.use('/api/account', accountRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/products', productsRoutes);
app.use((req, res, next) => {
    next(createHttpError.NotFound());
});
app.use((err, req, res, next) => {
    var _a, _b;
    res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send({
        error: {
            status: (_b = err.status) !== null && _b !== void 0 ? _b : 500,
            message: err.message,
        },
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=server.js.map