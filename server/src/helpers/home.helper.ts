import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './homeBanner.json');

let homeBanner: Banner[];

readHomeBanner();

function readHomeBanner() {
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err);
    homeBanner = JSON.parse(data.toString());
  });
}

export function saveHomeBanner(homeBanner: Banner[]) {
  fs.writeFile(filePath, JSON.stringify(homeBanner), (err) => {
    if (err) console.log(err);
  });
}

export function getHomeBanner() {
  return homeBanner;
}
