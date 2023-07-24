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
export function getProductReviews(productId, page) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = new URL((_a = process.env.REVIEWS_URL) !== null && _a !== void 0 ? _a : '');
            url.searchParams.set('product_id', productId);
            url.searchParams.set('page', page.toString());
            const { html, total_count } = yield fetch(url).then((res) => res.json());
            const response = {
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
        }
        catch (error) {
            console.error(error);
            return {
                reviews: [],
                total_count: 0,
            };
        }
    });
}
//# sourceMappingURL=productReviews.helper.js.map