import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './products.json');
export let products;
readProducts();
function readProducts() {
    fs.readFile(filePath, (err, data) => {
        if (err)
            console.log(err);
        products = JSON.parse(data.toString());
    });
}
export function saveProducts(products) {
    fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err)
            console.log(err);
    });
}
//# sourceMappingURL=products.helper.js.map