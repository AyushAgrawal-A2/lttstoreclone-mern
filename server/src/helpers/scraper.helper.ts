import cheerio from 'cheerio';

export async function scrapeProducts() {
  const url = new URL('https://www.lttstore.com/collections/all-products-1');
  const products: Product[] = [];
  try {
    let page = 1;
    while (true) {
      url.searchParams.set('page', page.toString());
      const html = await fetch(url).then((res) => res.text());
      const $ = cheerio.load(html);
      const productLiEl = $('ul#product-grid li.grid__item');

      productLiEl.each((i, el) => {
        const productLinkEl = $(el).find('a:first');
        const path = productLinkEl.prop('href') ?? 'Path not found';
        const title =
          productLinkEl.prop('innerText')?.replace(/\s{2}/g, '').trim() ?? '';
        const inStock =
          $(el).find('div.card__content div.card__badge.bottom.left span')
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
          collections: [],
          ranks: {},
          rating: {},
          reviewStats: {},
        });
      });
      if (productLiEl.length < 12) break;
      page++;
    }
    await Promise.all(products.map((product) => scrapeProduct(product)));
    await Promise.all([
      scrapeProductRanks(products),
      scrapeCollections(products),
      scrapeFilters(products),
    ]);
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
    scrapeProductReviewStats(product, html);
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
  product.rating.stars = $(rataingEl)
    .find('span.jdgm-prev-badge__stars')
    .prop('data-score');
  product.rating.text = $(rataingEl)
    .find('span.jdgm-prev-badge__text')
    .text()
    .trim();
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

  const script = $('div.product div.product__info-wrapper ul.ColorSwatchList')
    .parent()
    .parent()
    .find('script');
  interface ColorJSON {
    featured_image: {
      position: string;
    };
    title: string;
  }
  const json: ColorJSON[] = Array.from(JSON.parse(script.text()));
  json.forEach((color: ColorJSON) => {
    if (!color || !color.title) return;
    let title = color.title;
    if (title.indexOf('/') >= 0)
      title = title.slice(0, title.indexOf('/')).trim();
    const imgPosition = parseInt(color.featured_image.position) - 1;
    if (!product.colorSwatch) product.colorSwatch = {};
    product.colorSwatch[title] = { imgPosition };
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

function scrapeProductReviewStats(product: Product, html: any) {
  const $ = cheerio.load(html);
  $(
    'main#MainContent div#judgeme_product_reviews div.jdgm-histogram div.jdgm-histogram__row'
  ).each((i, el) => {
    const rating = $(el).prop('data-rating');
    const freq = $(el).prop('data-frequency');
    if (!freq) return;
    product.reviewStats[rating] = parseInt(freq);
  });
}

async function scrapeProductRanks(products: Product[]) {
  try {
    const sortCriterias: { [key: string]: string } = {
      date: 'created-descending',
      bestseller: 'best-selling',
      featured: 'manual',
    };
    for (const key in sortCriterias) {
      const url = new URL('https://www.lttstore.com/collections/all-products');
      url.searchParams.set('sort_by', sortCriterias[key]);
      let page = 1;
      let rank = 1;
      while (true) {
        url.searchParams.set('page', page.toString());
        const html = await fetch(url).then((res) => res.text());
        const $ = cheerio.load(html);
        const productLiEls = $('ul#product-grid li.grid__item');
        productLiEls.each((i, el) => {
          const productLinkEl = $(el).find('a:first');
          const path = productLinkEl.prop('href') ?? 'Path not found';
          const product = products.find((product) => product.path === path);
          if (product) {
            product.ranks[key] = rank++;
          }
        });
        if (productLiEls.length < 12) break;
        page++;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function scrapeCollections(products: Product[]) {
  try {
    interface Collection {
      [key: string]: string;
    }
    const collections: Collection = {};
    const url = new URL('https://www.lttstore.com/collections/');
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $('main#MainContent ul.collection-list li.collection-list__item').each(
      (i, el) => {
        const collectionURL =
          'https://www.lttstore.com' + $(el).find('a:first').prop('href') ?? '';
        const collection = collectionURL.replace(
          'https://www.lttstore.com/collections/',
          ''
        );
        collections[collection] = collectionURL;
      }
    );
    await Promise.all(
      Object.keys(collections).map(async (collection) => {
        const url = new URL(collections[collection]);
        let page = 1;
        while (true) {
          url.searchParams.set('page', page.toString());
          const html = await fetch(url).then((res) => res.text());
          const $ = cheerio.load(html);
          const productLiEls = $('ul#product-grid li.grid__item');
          productLiEls.each((i, el) => {
            const productLinkEl = $(el).find('a:first');
            const path = productLinkEl.prop('href') ?? 'Path not found';
            const product = products.find((product) => product.path === path);
            if (product) {
              product.collections.push(collection);
            }
          });
          if (productLiEls.length < 12) break;
          page++;
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function scrapeFilters(products: Product[]) {
  try {
    const filters: {
      [filter: string]: {
        filterKey: string;
        filterValues: string[];
      };
    } = {};
    const url = new URL('https://www.lttstore.com/collections/all-products-1');
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $('div.facets-container form#FacetFiltersForm details').each((i, el) => {
      let filter = $(el).find('summary.facets__summary div > span').text();
      if (!filter.includes('Type') && !filter.includes('Gender')) return;
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
          filters[filter].filterKey = $(el).attr('name') ?? '';
          filters[filter].filterValues.push($(el).prop('value'));
        });
    });

    for (const filter in filters) {
      const url = new URL(
        'https://www.lttstore.com/collections/all-products-1'
      );
      const { filterKey, filterValues } = filters[filter];
      for (const filterValue of filterValues) {
        url.searchParams.set(filterKey, filterValue);
        let page = 1;
        while (true) {
          url.searchParams.set('page', page.toString());
          const html = await fetch(url).then((res) => res.text());
          const $ = cheerio.load(html);
          const productLiEls = $('ul#product-grid li.grid__item');
          productLiEls.each((i, el) => {
            const productLinkEl = $(el).find('a:first');
            const href = productLinkEl.prop('href') ?? 'Path not found';
            const path = href.slice(0, href.indexOf('?'));
            const product = products.find((product) => product.path === path);
            if (product) {
              if (filter.includes('Type')) product.type = filterValue;
              else product.gender = filterValue;
            }
          });
          if (productLiEls.length < 12) break;
          page++;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function scrapeBlogs() {
  const blogs: Blog[] = [];
  try {
    const url = new URL(
      'https://www.lttstore.com/blogs/the-newsletter-archive'
    );
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $(
      'main#MainContent div.main-blog div.blog-articles div.blog-articles__article.article'
    ).each((i, el) => {
      const blogCardEl = $(el).find('div.card > div.card__inner');
      const path =
        $(blogCardEl)
          .find('div.card__content div.card__information h3.card__heading.h2 a')
          .prop('href') ?? '';
      const heading = $(blogCardEl)
        .find('div.card__content div.card__information h3.card__heading.h2 a')
        .text()
        .trim();
      const cardText = $(blogCardEl)
        .find('div.card__content div.card__information p.article-card__excerpt')
        .text()
        .trim();
      const date = $(blogCardEl)
        .find(
          'div.card__content div.card__information div.article-card__info time'
        )
        .text();
      const imgSrc = $(blogCardEl)
        .find('div.article-card__image-wrapper img')
        .prop('src');
      const imgURL = imgSrc
        ? 'https:' + imgSrc.slice(0, imgSrc.indexOf('?'))
        : '';
      blogs.push({
        path,
        heading,
        cardText,
        date,
        imgURL,
        contents: [],
      });
    });
    await Promise.all(blogs.map((blog) => scrapeBlog(blog)));
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function scrapeBlog(blog: Blog) {
  try {
    const url = new URL('https://www.lttstore.com' + blog.path);
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $('main#MainContent article.article-template div.article-template__content')
      .children()
      .each((i, el) => {
        const text =
          $(el)
            .prop('innerHTML')
            ?.replace(/<span[^>]*>/g, '')
            .replace(/<[^\/][^>]*>/g, '\n')
            .replace(/(<\/[^>]*>)/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/\s{2,}/g, '\n')
            .trim() ?? '';
        let imageSrc = $(el).find('img').prop('src');
        if (imageSrc?.includes('?')) {
          imageSrc = imageSrc.slice(0, imageSrc.indexOf('?'));
        }
        if (imageSrc) {
          blog.contents.push({
            type: 'image',
            data: imageSrc,
          });
        } else if (text) {
          blog.contents.push({
            type: 'text',
            data: text,
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
}

export async function scrapeHomeBanner() {
  const homeBanner: Banner[] = [];
  try {
    const url = new URL('https://www.lttstore.com');
    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    $(
      'main#MainContent div.swiper div.swiper-wrapper div.ultimate-slideshow-slide'
    ).each((i, el) => {
      const link = $(el).find('a').prop('href') ?? '';
      const imgURL =
        'https://www.lttstore.com/cdn/shop/' +
          $(el).find('img:first').prop('src') ?? '';
      homeBanner.push({
        link,
        imgURL,
      });
    });
  } catch (error) {
    console.error(error);
  }
  return homeBanner;
}
