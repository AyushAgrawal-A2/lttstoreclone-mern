var _a;
import 'dotenv/config';
import './helpers/db.helper.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createHttpError from 'http-errors';
import accountRoutes from './routes/account.route.js';
import { auth } from './controllers/account.controller.js';
import homeRoutes from './routes/home.route.js';
import collectionsRoutes from './routes/collections.route.js';
import productsRoutes from './routes/products.route.js';
import blogsRoutes from './routes/blogs.route.js';
import reviewsRoutes from './routes/reviews.route.js';
import scraperRoutes from './routes/scraper.route.js';
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'https://lttstoreclone.vercel.app'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/account', auth, accountRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/scrape', scraperRoutes);
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