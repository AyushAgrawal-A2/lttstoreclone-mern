import express from 'express';
import scrapeProducts from '../helpers/scraper.helper.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
router.get('/products', (req, res) => {
    scrapeProducts().then((products) => {
        fs.writeFile(path.join(__dirname, './products.json'), JSON.stringify(products), (err) => {
            if (err)
                console.log(err);
            res.send(products);
        });
    });
});
export default router;
//# sourceMappingURL=scraper.route.js.map