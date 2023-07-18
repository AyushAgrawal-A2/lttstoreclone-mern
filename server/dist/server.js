import 'dotenv/config';
import './helpers/db.helper.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import createHttpError from 'http-errors';
import accountRoutes from './routes/account.route.js';
import { auth } from './controllers/account.controller.js';
import collectionsRoutes from './routes/collections.route.js';
import productsRoutes from './routes/products.route.js';
import scraperRoutes from './routes/scraper.route.js';
const port = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/account', auth, accountRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/scrape', scraperRoutes);
app.use((req, res, next) => {
    next(createHttpError.NotFound());
});
app.use((err, req, res, next) => {
    res.status(err.status ?? 500).send({
        error: {
            status: err.status ?? 500,
            message: err.message,
        },
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=server.js.map