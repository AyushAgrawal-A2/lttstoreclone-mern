import cheerio from 'cheerio';

export default async function scrapeProducts() {
  const url = new URL('https://www.lttstore.com/collections/all-products-1');
  const products: Products = {};
  try {
    let page = 1;
    while (true) {
      url.searchParams.set('page', page.toString());
      const html = await fetch(url).then((res) => res.text());
      const $ = cheerio.load(html);
      const productLiEl = $('ul#product-grid li.grid__item');
      if (productLiEl.length == 0) break;
      productLiEl.each((i, el) => {
        const productLinkEl = $(el).find('a:first');
        const path = productLinkEl.prop('href') ?? 'Path not found';
        const title =
          productLinkEl.prop('innerText')?.replace(/\s{2}/g, '').trim() ?? '';
        const inStock =
          $(el).find('div.card__content div.card__badge.bottom.left span')
            .length === 0;
        products[path] = {
          title,
          path,
          inStock,
          price: '',
          productId: '',
          images: [],
          details: {},
          sizeOptions: [],
          featureImages: [],
        };
      });
      page++;
    }
    await Promise.all(
      Object.keys(products).map((path) => scrapeProduct(products[path]))
    );
  } catch (error) {
    console.error(error);
  }
  return products;
}

async function scrapeProduct(product: Product) {
  try {
    const url = new URL('https://www.lttstore.com' + product.path);
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    const productId = $(
      'div.product div.product__info-wrapper div.jdgm-widget'
    ).prop('data-id');
    product.productId = productId;
    scrapeProductImages(product, html);
    scrapeProductRatings(product, html);
    scrapeProductPrice(product, html);
    scrapeProductColorSwatch(product, html);
    scrapeProductSizeOptions(product, html);
    scrapeProductDetails(product, html);
    scrapeProductFeatureImages(product, html);
    // await scrapeProductReviews(product);
  } catch (error) {
    console.error(error);
  }
}

function scrapeProductImages(product: Product, html: any) {
  const $ = cheerio.load(html);
  $(
    'div.product div.product__media-wrapper ul.product__media-list li.product__media-item'
  ).each((i, el) => {
    let src = $(el).find('img').prop('src');
    let overlay = $(el).find('div.product__media--overlay').text();
    if (product.images && src) {
      src = 'https:' + src.slice(0, src.indexOf('?'));
      if (overlay) product.images.push({ src, overlay });
      else product.images.push({ src });
    }
  });
}

function scrapeProductRatings(product: Product, html: any) {
  const $ = cheerio.load(html);
  const rataingEl = $('div.jdgm-widget.jdgm-preview-badge div.jdgm-prev-badge');
  product.rating = {
    stars: $(rataingEl).prop('data-average-rating'),
    text: $(rataingEl).find('span.jdgm-prev-badge__text').text().trim(),
  };
}

function scrapeProductPrice(product: Product, html: any) {
  const $ = cheerio.load(html);
  product.price =
    $('div.product div.product__info-wrapper div.price span.money').prop(
      'textContent'
    ) || '';
}

function scrapeProductColorSwatch(product: Product, html: any) {
  const $ = cheerio.load(html);
  const swatchListEl = $(
    'div.product div.product__info-wrapper ul.ColorSwatchList'
  );
  if (swatchListEl.length === 0) return;
  product.colorSwatch = {};
  const script = $('div.product div.product__info-wrapper ul.ColorSwatchList')
    .parent()
    .parent()
    .find('script');
  type ColorJSON = {
    featured_image: {
      position: string;
    };
    title: string;
  };
  const json: ColorJSON[] = Array.from(JSON.parse(script.text()));
  json.forEach((color) => {
    if (!color || !color.title) return;
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
          product.colorSwatch[title].backgroundColor = style[
            'background-color'
          ] as string;
        }
        if (style['background-image']) {
          let src = style['background-image'] as string;
          src = 'https:' + src.slice(src.indexOf('/'), src.indexOf('?'));
          product.colorSwatch[title].backgroundImage = src;
        }
      }
    });
}

function scrapeProductSizeOptions(product: Product, html: any) {
  const $ = cheerio.load(html);
  $('div.product div.product__info-wrapper input.product-variant-size').each(
    (i, el) => {
      const name = $(el).prop('value');
      const symbol = $(el)
        .next()
        .text()
        .replace(/\s{2,}/g, '');
      product.sizeOptions.push({ name, symbol });
    }
  );
}

function scrapeProductDetails(product: Product, html: any) {
  const $ = cheerio.load(html);
  $('div.product div.product__info-wrapper details.product__details').each(
    (i, el) => {
      const key = $(el)
        .find('summary.product__detail-header')
        .prop('textContent')
        ?.replace(/\s{2,}/gm, '');
      let detail: Detail;
      if ($(el).find('div.content table').length > 0) {
        const table: string[][] = [];
        $(el)
          .find('div.content table tr')
          .each((i, el) => {
            const row: string[] = [];
            $(el)
              .find('td')
              .each((i, el) => {
                row.push(
                  $(el)
                    .text()
                    .replace(/[\r\n]+/g, '')
                    .trim()
                );
              });
            table.push(row);
          });
        detail = {
          type: 'table',
          data: table,
        };
      } else if ($(el).find('div.content.related-product-content').length > 0) {
        const links: string[] = [];
        $(el)
          .find('div.content.related-product-content div.card-wrapper')
          .each((i, el) => {
            const href = $(el).find('a:first').prop('href');
            if (href) links.push(href);
          });
        detail = {
          type: 'links',
          data: links,
        };
      } else {
        const detailHTML = $(el).find('div.content').prop('innerHTML');
        const text =
          detailHTML
            ?.replace(/<span[^>]*>/g, '')
            .replace(/<[^\/][^>]*>/g, '\n')
            .replace(/(<\/[^>]*>)/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/\s{2,}/g, '\n')
            .trim() ?? '';
        detail = {
          type: 'text',
          data: text,
        };
      }
      if (key && detail) {
        product.details[key] = detail;
      }
    }
  );
}

function scrapeProductFeatureImages(product: Product, html: any) {
  const $ = cheerio.load(html);
  $('main#MainContent section:nth-child(2) > div > img').each((i, el) => {
    const src = $(el).prop('src');
    if (src) {
      product.featureImages.push(src.slice(0, src.indexOf('?')));
    }
  });
}

export async function scrapeProductReviews(productId: string, page: string) {
  try {
    const url = new URL(process.env.REVIEWS_URL ?? '');
    url.searchParams.set('product_id', productId);
    url.searchParams.set('page', page.toString());
    const { html, total_count } = await fetch(url).then((res) => res.json());
    const response: ReviewResponse = {
      reviews: [],
      total_count,
    };
    const $ = cheerio.load(html);
    $('div.jdgm-rev-widg__reviews div.jdgm-rev').each((i, el) => {
      const stars = $(el)
        .find('div.jdgm-rev__header span.jdgm-rev__rating')
        .prop('data-score');
      const time = $(el)
        .find('div.jdgm-rev__header span.jdgm-rev__timestamp')
        .prop('data-content');
      const author = $(el)
        .find('div.jdgm-rev__header span.jdgm-rev__author')
        .text();
      const verified = $(el).prop('data-verified-buyer') === 'true';
      const title = $(el)
        .find('div.jdgm-rev__content b.jdgm-rev__title')
        .text();
      const body = $(el)
        .find('div.jdgm-rev__content div.jdgm-rev__body')
        .text();
      const likes = parseInt($(el).prop('data-thumb-up-count'));
      const dislikes = parseInt($(el).prop('data-thumb-down-count'));
      response.reviews.push({
        author,
        verified,
        time,
        stars,
        title,
        body,
        likes,
        dislikes,
      });
    });
    return response;
  } catch (error) {
    console.error(error);
    return {
      reviews: [],
      total_count: 0,
    };
  }
}
