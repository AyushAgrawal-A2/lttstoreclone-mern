import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './articles.json');

export let articles: Article[];

readArticles();

function readArticles() {
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err);
    articles = JSON.parse(data.toString());
  });
}

export function saveArticles(articles: Article[]) {
  fs.writeFile(filePath, JSON.stringify(articles), (err) => {
    if (err) console.log(err);
  });
}

export function getArticlesCard({
  path,
  heading,
  cardText,
  date,
  imgURL,
}: Article): ArticleCard {
  return { path, heading, cardText, date, imgURL };
}

export function getArticlesCards(page = 1, perPage = 12) {
  return articles
    .slice((page - 1) * perPage, page * perPage)
    .map((article) => getArticlesCard(article));
}
