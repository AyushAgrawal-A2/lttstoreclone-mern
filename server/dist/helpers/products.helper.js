import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export let products;
readProducts();
function readProducts() {
    fs.readFile(path.join(__dirname, './products.json'), (err, data) => {
        if (err)
            console.log(err);
        products = JSON.parse(data.toString());
    });
}
export function saveProducts(products) {
    fs.writeFile(path.join(__dirname, './products.json'), JSON.stringify(products), (err) => {
        if (err)
            console.log(err);
    });
}
//# sourceMappingURL=products.helper.js.map