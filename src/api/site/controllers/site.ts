import type { Core } from '@strapi/strapi';
import { populateFor } from '../../../utils/populate';

// Koa context as passed by Strapi's router.
type Ctx = any;

// Single types the website may read. Anything else returns 404.
const PAGE_TYPES = new Set([
  'home-page',
  'about-page',
  'shop-page',
  'blog-page',
  'contact-page',
  'cart-page',
  'checkout-page',
  'thank-you-page',
  'order-tracking-page',
  'search-page',
  'not-found-page',
  'product-page',
  'article-page',
  'global',
  'header',
  'footer',
  'icon-set',
  'site-settings',
]);

const COLLECTIONS: Record<string, string> = {
  products: 'product',
  articles: 'article',
  'product-categories': 'product-category',
  'brew-methods': 'brew-method',
  'article-categories': 'article-category',
};

// Sort order applied to collection listings.
const SORT: Record<string, string[]> = {
  products: ['order:asc', 'createdAt:asc'],
  articles: ['publishedDate:desc', 'createdAt:desc'],
  'product-categories': ['order:asc', 'name:asc'],
  'brew-methods': ['order:asc', 'name:asc'],
  'article-categories': ['order:asc', 'name:asc'],
};

type Populate = Record<string, unknown>;

// Card-sized payload for listings: skip heavy dynamic zones.
function listPopulate(strapi: Core.Strapi, uid: string): Populate {
  const full = populateFor(strapi, uid);
  delete full.sections;
  delete full.content;
  return full;
}

function cleanQuery(value: unknown, max = 80) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f]/g, ' ')
    .trim()
    .slice(0, max);
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async page(ctx: Ctx) {
    const type = String(ctx.params.type);
    if (!PAGE_TYPES.has(type)) return ctx.notFound();
    const uid = `api::${type}.${type}` as any;
    const doc = await strapi
      .documents(uid)
      .findFirst({ status: 'published', populate: populateFor(strapi, uid) as any });
    if (!doc) return ctx.notFound();
    ctx.body = { data: doc };
  },

  async list(ctx: Ctx) {
    const name = COLLECTIONS[String(ctx.params.collection)];
    if (!name) return ctx.notFound();
    const uid = `api::${name}.${name}` as any;
    const docs = await strapi.documents(uid).findMany({
      status: 'published',
      populate: listPopulate(strapi, uid) as any,
      sort: SORT[String(ctx.params.collection)] as any,
      limit: 500,
    });
    ctx.body = { data: docs };
  },

  async detail(ctx: Ctx) {
    const name = COLLECTIONS[String(ctx.params.collection)];
    if (!name || !['product', 'article'].includes(name)) return ctx.notFound();
    const slug = cleanQuery(ctx.params.slug, 200);
    const uid = `api::${name}.${name}` as any;
    const doc = await strapi.documents(uid).findFirst({
      status: 'published',
      filters: { slug },
      populate: populateFor(strapi, uid) as any,
    });
    if (!doc) return ctx.notFound();
    ctx.body = { data: doc };
  },

  async search(ctx: Ctx) {
    const q = cleanQuery(ctx.query.q);
    if (q.length < 2) {
      ctx.body = { data: { query: q, products: [], articles: [] } };
      return;
    }
    const productUid = 'api::product.product' as any;
    const articleUid = 'api::article.article' as any;
    const [products, articles] = await Promise.all([
      strapi.documents(productUid).findMany({
        status: 'published',
        filters: {
          $or: [
            { name: { $containsi: q } },
            { subtitle: { $containsi: q } },
            { shortDescription: { $containsi: q } },
          ],
        },
        populate: listPopulate(strapi, productUid) as any,
        sort: SORT.products as any,
        limit: 24,
      }),
      strapi.documents(articleUid).findMany({
        status: 'published',
        filters: { $or: [{ title: { $containsi: q } }, { excerpt: { $containsi: q } }] },
        populate: listPopulate(strapi, articleUid) as any,
        sort: SORT.articles as any,
        limit: 24,
      }),
    ]);
    ctx.body = { data: { query: q, products, articles } };
  },
});
