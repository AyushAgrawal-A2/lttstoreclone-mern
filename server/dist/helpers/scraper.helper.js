import cheerio from 'cheerio';
export default async function scrapeProducts() {
    const url = new URL('https://www.lttstore.com/collections/all-products-1');
    const products = {};
    try {
        let page = 1;
        while (true) {
            url.searchParams.set('page', page.toString());
            const html = await fetch(url).then((res) => res.text());
            const $ = cheerio.load(html);
            const productLiEl = $('ul#product-grid li.grid__item');
            if (productLiEl.length == 0)
                break;
            productLiEl.each((i, el) => {
                const productLinkEl = $(el).find('a:first');
                const path = productLinkEl.prop('href') ?? 'Path not found';
                const title = productLinkEl.prop('innerText')?.replace(/\s{2}/g, '').trim() ?? '';
                const inStock = $(el).find('div.card__content div.card__badge.bottom.left span')
                    .length === 0;
                products[path] = {
                    title,
                    path,
                    inStock,
                    price: '',
                    images: [],
                    details: {},
                    sizeOptions: [],
                    featureImages: [],
                };
            });
            page++;
        }
        await Promise.all(Object.keys(products).map((path) => scrapeProduct(products[path])));
    }
    catch (error) {
        console.error(error);
    }
    return products;
}
async function scrapeProduct(product) {
    try {
        const url = new URL('https://www.lttstore.com' + product.path);
        const html = await fetch(url).then((res) => res.text());
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
        // await scrapeProductReviews(product);
    }
    catch (error) {
        console.error(error);
    }
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
    product.rating = {
        stars: $(rataingEl).prop('data-average-rating'),
        text: $(rataingEl).find('span.jdgm-prev-badge__text').text().trim(),
    };
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
    product.colorSwatch = {};
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
        if (product.colorSwatch) {
            product.colorSwatch[title] = { imgPosition };
        }
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
        const key = $(el)
            .find('summary.product__detail-header')
            .prop('textContent')
            ?.replace(/\s{2,}/gm, '');
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
            detail = table;
        }
        else if ($(el).find('div.content.related-product-content').length > 0) {
            detail = $(el).find('a:first').prop('href');
        }
        else {
            const detailHTML = $(el).find('div.content').prop('innerHTML');
            detail = detailHTML
                ?.replace(/<span[^>]*>/g, '')
                .replace(/<[^\/][^>]*>/g, '\n')
                .replace(/(<\/[^>]*>)/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/\s{2,}/g, '\n')
                .trim();
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
// async function scrapeProductReviews(product: Product) {
//   if (!product.productId) return;
//   product.reviews = [];
//   const url = new URL(
//     'https://judge.me/reviews/reviews_for_widget?url=linus-tech-tips-store.myshopify.com&shop_domain=linus-tech-tips-store.myshopify.com&platform=shopify&per_page=10'
//   );
//   try {
//     url.searchParams.set('product_id', product.productId);
//     let page = 1;
//     while (true) {
//       url.searchParams.set('page', page.toString());
//       const { html } = await fetch(url).then((res) => res.json());
//       const $ = cheerio.load(html);
//       const reviewEls = $('div.jdgm-rev-widg__reviews div.jdgm-rev');
//       if (reviewEls.length === 0) break;
//       reviewEls.each((i, el) => {
//         const stars = parseInt(
//           $(el)
//             .find('div.jdgm-rev__header span.jdgm-rev__rating')
//             .prop('data-score')
//         );
//         const time = $(el)
//           .find('div.jdgm-rev__header span.jdgm-rev__timestamp')
//           .prop('data-content');
//         const author = $(el)
//           .find('div.jdgm-rev__header span.jdgm-rev__author')
//           .text();
//         const verified = $(el).prop('data-verified-buyer') === 'true';
//         const title = $(el)
//           .find('div.jdgm-rev__content b.jdgm-rev__title')
//           .text();
//         const body = $(el)
//           .find('div.jdgm-rev__content div.jdgm-rev__body')
//           .text();
//         const likes = parseInt($(el).prop('data-thumb-up-count'));
//         const dislikes = parseInt($(el).prop('data-thumb-down-count'));
//         if (product.reviews) {
//           product.reviews.push({
//             author,
//             verified,
//             time,
//             stars,
//             title,
//             body,
//             likes,
//             dislikes,
//           });
//         }
//       });
//       page++;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
//# sourceMappingURL=scraper.helper.js.map