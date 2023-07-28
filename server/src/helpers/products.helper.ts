import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './products.json');

let products: Product[];

readProducts();

function readProducts() {
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err);
    products = JSON.parse(data.toString());
  });
}

export function saveProducts(products: Product[]) {
  fs.writeFile(filePath, JSON.stringify(products), (err) => {
    if (err) console.log(err);
  });
}

export function getProduct(path: string) {
  return products.find((product) => product.path === path);
}

export function getProductCard({
  title,
  path,
  inStock,
  price,
  images,
  colorSwatch,
}: Product): ProductCard {
  if (!colorSwatch) images = images.slice(0, 1);
  return { title, path, inStock, price, images, colorSwatch };
}

export function getProductCards(
  collection = 'all',
  page = 1,
  perPage = 12,
  sortCriteria = ''
) {
  let filteredProducts =
    collection === 'all'
      ? products
      : products.filter((product) => product.collections.includes(collection));
  if (sortCriteria) {
    filteredProducts = filteredProducts.filter(
      (product) => product.ranks[sortCriteria]
    );
    filteredProducts.sort(
      (a, b) => a.ranks[sortCriteria] - b.ranks[sortCriteria]
    );
  }
  const productCards = filteredProducts
    .slice((page - 1) * perPage, page * perPage)
    .map((product) => getProductCard(product));
  return productCards;
}
