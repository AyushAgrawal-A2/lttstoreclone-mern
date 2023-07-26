var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cheerio from 'cheerio';
export function scrapeProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL('https://www.lttstore.com/collections/all-products-1');
        const products = [];
        try {
            let page = 1;
            while (true) {
                url.searchParams.set('page', page.toString());
                const html = yield fetch(url).then((res) => res.text());
                const $ = cheerio.load(html);
                const productLiEl = $('ul#product-grid li.grid__item');
                productLiEl.each((i, el) => {
                    var _a, _b, _c;
                    const productLinkEl = $(el).find('a:first');
                    const path = (_a = productLinkEl.prop('href')) !== null && _a !== void 0 ? _a : 'Path not found';
                    const title = (_c = (_b = productLinkEl.prop('innerText')) === null || _b === void 0 ? void 0 : _b.replace(/\s{2}/g, '').trim()) !== null && _c !== void 0 ? _c : '';
                    const inStock = $(el).find('div.card__content div.card__badge.bottom.left span')
                        .length === 0;
                    products.push({
                        title,
                        path,
                        inStock,
                        price: '',
                        productId: '',
                        images: [],
                        details: {},
                        sizeOptions: [],
                        featureImages: [],
                        ranks: {},
                        rating: {},
                        reviewStats: {},
                    });
                });
                if (productLiEl.length < 12)
                    break;
                page++;
            }
            yield Promise.all(products.map((product) => scrapeProduct(product)));
            yield Promise.all([
                scrapeProductRanks(products),
                scrapeCollections(products),
                scrapeFilters(products),
            ]);
        }
        catch (error) {
            console.error(error);
        }
        return products;
    });
}
function scrapeProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = new URL('https://www.lttstore.com' + product.path);
            const html = yield fetch(url).then((res) => res.text());
            const $ = cheerio.load(html);
            const productId = $('div.product div.product__info-wrapper div.jdgm-widget').prop('data-id');
            product.productId = productId;
            scrapeProductImages(product, html);
            scrapeProductRatings(product, html);
            scrapeProductPrice(product, html);
            scrapeProductColorSwatch(product, html);
            scrapeProductSizeOptions(product, html);
            scrapeProductDetails(product, html);
            scrapeProductFeatureImages(product, html);
            scrapeProductReviewStats(product, html);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function scrapeProductImages(product, html) {
    const $ = cheerio.load(html);
    $('div.product div.product__media-wrapper ul.product__media-list li.product__media-item').each((i, el) => {
        let src = $(el).find('img').prop('src');
        let overlay = $(el).find('div.product__media--overlay').text();
        if (product.images && src) {
            src = 'https:' + src.slice(0, src.indexOf('?'));
            if (overlay)
                product.images.push({ src, overlay });
            else
                product.images.push({ src });
        }
    });
}
function scrapeProductRatings(product, html) {
    const $ = cheerio.load(html);
    const rataingEl = $('div.jdgm-widget.jdgm-preview-badge div.jdgm-prev-badge');
    product.rating.stars = $(rataingEl)
        .find('span.jdgm-prev-badge__text')
        .text()
        .trim();
    product.rating.text = $(rataingEl)
        .find('span.jdgm-prev-badge__text')
        .text()
        .trim();
}
function scrapeProductPrice(product, html) {
    const $ = cheerio.load(html);
    product.price =
        $('div.product div.product__info-wrapper div.price span.money').prop('textContent') || '';
}
function scrapeProductColorSwatch(product, html) {
    const $ = cheerio.load(html);
    const swatchListEl = $('div.product div.product__info-wrapper ul.ColorSwatchList');
    if (swatchListEl.length === 0)
        return;
    const script = $('div.product div.product__info-wrapper ul.ColorSwatchList')
        .parent()
        .parent()
        .find('script');
    const json = Array.from(JSON.parse(script.text()));
    json.forEach((color) => {
        if (!color || !color.title)
            return;
        let title = color.title;
        if (title.indexOf('/') >= 0)
            title = title.slice(0, title.indexOf('/')).trim();
        const imgPosition = parseInt(color.featured_image.position) - 1;
        if (!product.colorSwatch)
            product.colorSwatch = {};
        product.colorSwatch[title] = { imgPosition };
    });
    $(swatchListEl)
        .find('li label')
        .each((i, el) => {
        const title = $(el).prop('title');
        const style = $(el).prop('style');
        if (style && product.colorSwatch) {
            if (style['background-color']) {
                product.colorSwatch[title].backgroundColor = style['background-color'];
            }
            if (style['background-image']) {
                let src = style['background-image'];
                src = 'https:' + src.slice(src.indexOf('/'), src.indexOf('?'));
                product.colorSwatch[title].backgroundImage = src;
            }
        }
    });
}
function scrapeProductSizeOptions(product, html) {
    const $ = cheerio.load(html);
    $('div.product div.product__info-wrapper input.product-variant-size').each((i, el) => {
        const name = $(el).prop('value');
        const symbol = $(el)
            .next()
            .text()
            .replace(/\s{2,}/g, '');
        product.sizeOptions.push({ name, symbol });
    });
}
function scrapeProductDetails(product, html) {
    const $ = cheerio.load(html);
    $('div.product div.product__info-wrapper details.product__details').each((i, el) => {
        var _a, _b;
        const key = (_a = $(el)
            .find('summary.product__detail-header')
            .prop('textContent')) === null || _a === void 0 ? void 0 : _a.replace(/\s{2,}/gm, '');
        let detail;
        if ($(el).find('div.content table').length > 0) {
            const table = [];
            $(el)
                .find('div.content table tr')
                .each((i, el) => {
                const row = [];
                $(el)
                    .find('td')
                    .each((i, el) => {
                    row.push($(el)
                        .text()
                        .replace(/[\r\n]+/g, '')
                        .trim());
                });
                table.push(row);
            });
            detail = {
                type: 'table',
                data: table,
            };
        }
        else if ($(el).find('div.content.related-product-content').length > 0) {
            const links = [];
            $(el)
                .find('div.content.related-product-content div.card-wrapper')
                .each((i, el) => {
                const href = $(el).find('a:first').prop('href');
                if (href)
                    links.push(href);
            });
            detail = {
                type: 'links',
                data: links,
            };
        }
        else {
            const detailHTML = $(el).find('div.content').prop('innerHTML');
            const text = (_b = detailHTML === null || detailHTML === void 0 ? void 0 : detailHTML.replace(/<span[^>]*>/g, '').replace(/<[^\/][^>]*>/g, '\n').replace(/(<\/[^>]*>)/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s{2,}/g, '\n').trim()) !== null && _b !== void 0 ? _b : '';
            detail = {
                type: 'text',
                data: text,
            };
        }
        if (key && detail) {
            product.details[key] = detail;
        }
    });
}
function scrapeProductFeatureImages(product, html) {
    const $ = cheerio.load(html);
    $('main#MainContent section:nth-child(2) > div > img').each((i, el) => {
        const src = $(el).prop('src');
        if (src) {
            product.featureImages.push(src.slice(0, src.indexOf('?')));
        }
    });
}
function scrapeProductReviewStats(product, html) {
    const $ = cheerio.load(html);
    $('main#MainContent div#judgeme_product_reviews div.jdgm-histogram div.jdgm-histogram__row').each((i, el) => {
        const rating = $(el).prop('data-rating');
        const freq = $(el).prop('data-frequency');
        if (!freq)
            return;
        product.reviewStats[rating] = parseInt(freq);
    });
}
function scrapeProductRanks(products) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sortCriterias = {
                date: 'created-descending',
                bestseller: 'best-selling',
                featured: 'manual',
            };
            for (const key in sortCriterias) {
                const url = new URL('https://www.lttstore.com/collections/all-products-1');
                url.searchParams.set('sort_by', sortCriterias[key]);
                let page = 1;
                let rank = 1;
                while (true) {
                    url.searchParams.set('page', page.toString());
                    const html = yield fetch(url).then((res) => res.text());
                    const $ = cheerio.load(html);
                    const productLiEls = $('ul#product-grid li.grid__item');
                    productLiEls.each((i, el) => {
                        var _a;
                        const productLinkEl = $(el).find('a:first');
                        const path = (_a = productLinkEl.prop('href')) !== null && _a !== void 0 ? _a : 'Path not found';
                        const product = products.find((product) => product.path === path);
                        if (product) {
                            product.ranks[key] = rank++;
                        }
                    });
                    if (productLiEls.length < 12)
                        break;
                    page++;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function scrapeCollections(products) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = ['accessories', 'clothing'];
            for (let collection of collections) {
                const url = new URL('https://www.lttstore.com/collections/' + collection);
                let page = 1;
                while (true) {
                    url.searchParams.set('page', page.toString());
                    const html = yield fetch(url).then((res) => res.text());
                    const $ = cheerio.load(html);
                    const productLiEls = $('ul#product-grid li.grid__item');
                    productLiEls.each((i, el) => {
                        var _a;
                        const productLinkEl = $(el).find('a:first');
                        const path = (_a = productLinkEl.prop('href')) !== null && _a !== void 0 ? _a : 'Path not found';
                        const product = products.find((product) => product.path === path);
                        if (product) {
                            product.collection = collection;
                        }
                    });
                    if (productLiEls.length < 12)
                        break;
                    page++;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function scrapeFilters(products) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filters = {};
            const url = new URL('https://www.lttstore.com/collections/all-products-1');
            const html = yield fetch(url).then((res) => res.text());
            const $ = cheerio.load(html);
            $('div.facets-container form#FacetFiltersForm details').each((i, el) => {
                let filter = $(el).find('summary.facets__summary div > span').text();
                if (!filter.includes('Type') && !filter.includes('Gender'))
                    return;
                if (filter.includes('('))
                    filter = filter.slice(0, filter.indexOf('(')).trim();
                filters[filter] = {
                    filterKey: '',
                    filterValues: [],
                };
                $(el)
                    .find('fieldset.facets-wrap ul.no-js-list.list-unstyled.no-js')
                    .prev()
                    .find('input')
                    .each((i, el) => {
                    var _a;
                    filters[filter].filterKey = (_a = $(el).attr('name')) !== null && _a !== void 0 ? _a : '';
                    filters[filter].filterValues.push($(el).prop('value'));
                });
            });
            for (const filter in filters) {
                const url = new URL('https://www.lttstore.com/collections/all-products-1');
                const { filterKey, filterValues } = filters[filter];
                for (const filterValue of filterValues) {
                    url.searchParams.set(filterKey, filterValue);
                    let page = 1;
                    while (true) {
                        url.searchParams.set('page', page.toString());
                        const html = yield fetch(url).then((res) => res.text());
                        const $ = cheerio.load(html);
                        const productLiEls = $('ul#product-grid li.grid__item');
                        productLiEls.each((i, el) => {
                            var _a;
                            const productLinkEl = $(el).find('a:first');
                            const href = (_a = productLinkEl.prop('href')) !== null && _a !== void 0 ? _a : 'Path not found';
                            const path = href.slice(0, href.indexOf('?'));
                            const product = products.find((product) => product.path === path);
                            if (product) {
                                if (filter.includes('Type'))
                                    product.collectionType = filterValue;
                                else
                                    product.gender = filterValue;
                            }
                        });
                        if (productLiEls.length < 12)
                            break;
                        page++;
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
export function scrapeArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = [];
        try {
            const url = new URL('https://www.lttstore.com/blogs/the-newsletter-archive');
            const html = yield fetch(url).then((res) => res.text());
            const $ = cheerio.load(html);
            $('main#MainContent div.main-blog div.blog-articles div.blog-articles__article.article').each((i, el) => {
                var _a;
                const articleCardEl = $(el).find('div.card > div.card__inner');
                const path = (_a = $(articleCardEl)
                    .find('div.card__content div.card__information h3.card__heading.h2 a')
                    .prop('href')) !== null && _a !== void 0 ? _a : '';
                const heading = $(articleCardEl)
                    .find('div.card__content div.card__information h3.card__heading.h2 a')
                    .text()
                    .trim();
                const cardText = $(articleCardEl)
                    .find('div.card__content div.card__information p.article-card__excerpt')
                    .text()
                    .trim();
                const date = $(articleCardEl)
                    .find('div.card__content div.card__information div.article-card__info time')
                    .text();
                const imgSrc = $(articleCardEl)
                    .find('div.article-card__image-wrapper img')
                    .prop('src');
                const imgUrl = imgSrc
                    ? 'https:' + imgSrc.slice(0, imgSrc.indexOf('?'))
                    : '';
                articles.push({
                    path,
                    heading,
                    cardText,
                    date,
                    imgUrl,
                    contents: [],
                });
            });
            yield Promise.all(articles.map((article) => scrapeArticle(article)));
            return articles;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
function scrapeArticle(article) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = new URL('https://www.lttstore.com' + article.path);
            const html = yield fetch(url).then((res) => res.text());
            const $ = cheerio.load(html);
            $('main#MainContent article.article-template div.article-template__content')
                .children()
                .each((i, el) => {
                const text = $(el).text().trim();
                let imageSrc = $(el).find('img').prop('src');
                if (imageSrc === null || imageSrc === void 0 ? void 0 : imageSrc.includes('?')) {
                    imageSrc = imageSrc.slice(0, imageSrc.indexOf('?'));
                }
                if (imageSrc) {
                    article.contents.push({
                        type: 'image',
                        data: imageSrc,
                    });
                }
                else if (text) {
                    article.contents.push({
                        type: 'text',
                        data: text,
                    });
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
// async function scrapeHome() {
//   try {
//     interface Home {
//       bannerImages: string[];
//       favorites: string[];
//       bestSellers: string[];
//       articles: string[];
//     }
//     const url = new URL('https://www.lttstore.com');
//     const html = await fetch(url).then((res) => res.text());
//     const $ = cheerio.load(html);
//     $('main#MainContent article.article-template div.article-template__content')
//       .children()
//       .each((i, el) => {
//         const text = $(el).text().trim();
//         let imageSrc = $(el).find('img').prop('src');
//         if (imageSrc?.includes('?')) {
//           imageSrc = imageSrc.slice(0, imageSrc.indexOf('?'));
//         }
//         if (imageSrc) {
//           article.contents.push({
//             type: 'image',
//             data: imageSrc,
//           });
//         } else if (text) {
//           article.contents.push({
//             type: 'text',
//             data: text,
//           });
//         }
//       });
//   } catch (error) {
//     console.error(error);
//   }
// }
//# sourceMappingURL=scraper.helper.js.map