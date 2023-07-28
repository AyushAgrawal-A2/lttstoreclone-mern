import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './blogs.json');
let blogs;
readBlogs();
function readBlogs() {
    fs.readFile(filePath, (err, data) => {
        if (err)
            console.log(err);
        blogs = JSON.parse(data.toString());
    });
}
export function saveBlogs(articles) {
    fs.writeFile(filePath, JSON.stringify(articles), (err) => {
        if (err)
            console.log(err);
    });
}
export function getBlog(path) {
    return blogs.find((article) => article.path.endsWith(path));
}
export function getBlogCard({ path, heading, cardText, date, imgURL, }) {
    return { path, heading, cardText, date, imgURL };
}
export function getBlogCards(page = 1, perPage = 12) {
    return blogs
        .slice((page - 1) * perPage, page * perPage)
        .map((blog) => getBlogCard(blog));
}
//# sourceMappingURL=blogs.helper.js.map