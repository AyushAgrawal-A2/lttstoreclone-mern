import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './products.json');
let products;
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
export function getProduct(path) {
    return products.find((product) => product.path === path);
}
export function getProductCard({ title, path, inStock, price, images, colorSwatch, }) {
    if (!colorSwatch)
        images = images.slice(0, 1);
    return { title, path, inStock, price, images, colorSwatch };
}
export function getProductCards(collection = 'all', page = 1, perPage = 12, sortCriteria = '') {
    let filteredProducts = collection === 'all'
        ? products
        : products.filter((product) => product.collections.includes(collection));
    if (sortCriteria) {
        const desc = sortCriteria.includes(',')
            ? sortCriteria.split(',')[1] === 'desc'
            : false;
        sortCriteria = sortCriteria.split(',')[0];
        if (sortCriteria === 'price') {
            function getPrice(price) {
                return parseFloat(price.slice(1, price.indexOf(' USD')));
            }
            filteredProducts.sort((a, b) => getPrice(a.price) - getPrice(b.price));
        }
        else if (sortCriteria === 'alphabetically') {
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        }
        else {
            filteredProducts = filteredProducts.filter((product) => product.ranks[sortCriteria]);
            filteredProducts.sort((a, b) => a.ranks[sortCriteria] - b.ranks[sortCriteria]);
        }
        if (desc)
            filteredProducts.reverse();
    }
    const totalCards = filteredProducts.length;
    const productCards = filteredProducts
        .slice((page - 1) * perPage, page * perPage)
        .map((product) => getProductCard(product));
    return { productCards, totalCards };
}
//# sourceMappingURL=products.helper.js.map