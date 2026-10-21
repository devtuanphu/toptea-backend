import type { Core } from '@strapi/strapi';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import * as data from './data';
import { populateFor } from '../utils/populate';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

type Uid = any;

/**
 * Imports the sample content on first boot. Only missing entries are created;
 * anything that already exists (and may have been edited) is left untouched.
 */
export async function seed(strapi: Core.Strapi) {
  const assets = path.join(strapi.dirs.app.root, 'seed-assets');
  if (!fs.existsSync(assets)) {
    strapi.log.warn('[seed] seed-assets folder not found, skipping sample content.');
    return;
  }
  const stats = { created: 0, skipped: 0, uploaded: 0, upgraded: 0 };
  const uploads = new Map<string, Promise<any>>();

  // Upload a file once per content hash and reuse it on later runs.
  function upload(relative: string, alt?: string) {
    const filepath = path.join(assets, relative);
    const bytes = fs.readFileSync(filepath);
    const digest = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12);
    const ext = path.extname(filepath).toLowerCase();
    const name = `${path.basename(filepath, ext)}-${digest}${ext}`;
    if (!uploads.has(name))
      uploads.set(
        name,
        (async () => {
          const files = strapi.db.query('plugin::upload.file');
          const existing = await files.findOne({ where: { name } });
          if (existing) return existing;
          const [created] = await strapi
            .plugin('upload')
            .service('upload')
            .upload({
              data: { fileInfo: { name, alternativeText: alt || '', caption: '' } },
              files: { filepath, originalFilename: name, mimetype: MIME[ext], size: bytes.length },
            } as any);
          stats.uploaded++;
          return created;
        })(),
      );
    return uploads.get(name)!;
  }

  const productIds = new Map<string, string>();

  async function resolve(value: any): Promise<any> {
    if (Array.isArray(value)) return Promise.all(value.map(resolve));
    if (!value || typeof value !== 'object') return value;
    if ('$image' in value) return { media: (await upload(value.$image, value.alt)).id, alt: value.alt };
    if ('$file' in value) return (await upload(value.$file)).id;
    if ('$product' in value) {
      const id = productIds.get(value.$product);
      if (!id) throw new Error(`[seed] unknown product ${value.$product}`);
      return id;
    }
    if ('$blockImage' in value) {
      const f = await upload(value.$blockImage, value.alt);
      return {
        type: 'image',
        image: {
          name: f.name,
          alternativeText: value.alt,
          url: f.url,
          caption: f.caption || null,
          width: f.width,
          height: f.height,
          formats: f.formats,
          hash: f.hash,
          ext: f.ext,
          mime: f.mime,
          size: f.size,
          previewUrl: f.previewUrl || null,
          provider: f.provider,
          createdAt: f.createdAt,
          updatedAt: f.updatedAt,
        },
        children: [{ type: 'text', text: '' }],
      };
    }
    const out: Record<string, any> = {};
    for (const [key, v] of Object.entries(value)) out[key] = await resolve(v);
    return out;
  }

  const docs = (uid: string) => strapi.documents(uid as Uid);

  // Turns a populated document back into write input: drops ids, media objects become ids.
  function toInput(value: any): any {
    if (Array.isArray(value)) return value.map(toInput);
    if (!value || typeof value !== 'object') return value;
    if ('mime' in value && 'url' in value) return value.id;
    const out: Record<string, any> = {};
    for (const [key, v] of Object.entries(value)) {
      if (['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'localizations'].includes(key)) continue;
      out[key] = toInput(v);
    }
    return out;
  }

  // Content upgrades (new fields such as the Figma mobile copy) run once per version,
  // so an editor who later clears or unchecks a field is never overridden.
  const UPGRADE_VERSION = 8;
  const store = strapi.store({ type: 'plugin', name: 'twt-seed' });
  const appliedVersion = Number((await store.get({ key: 'upgradeVersion' })) || 0);
  const runUpgrade = appliedVersion < UPGRADE_VERSION;

  // Seed texts that were replaced by a newer default. A field still holding one of these
  // was never edited, so the upgrade may swap in the new seed value.
  const RETIRED_DEFAULTS = new Set([
    'mobileDescription|TOP WELL TEA ra đời từ niềm tin: thưởng trà có thể vừa hiện đại, vừa giữ trọn tinh thần truyền thống.',
    'bankTransferTitle|Thông tin chuyển khoản',
    'autoplaySeconds|6',
    // Order email before discount codes were removed.
    'orderEmailBody|Xin chào {name},\n\nCảm ơn bạn đã đặt hàng tại TOP WELL TEA. Đơn hàng #{code} đã được tiếp nhận.\n\n{items}\n\nTạm tính: {subtotal}\nGiảm giá: {discount}\nPhí vận chuyển: {shipping}\nTổng cộng: {total}\nThanh toán: {payment}\nGiao đến: {address}\n\n{paymentNote}\n\nTheo dõi đơn hàng: {trackingUrl}\n\nTrân trọng,\nTOP WELL TEA',
    'bankTransferNote|Nội dung chuyển khoản: {code}. Đơn hàng được xác nhận và giao ngay khi nhận được thanh toán.',
  ]);

  /** Fills empty fields of `existing` from `seed`; arrays are matched by position. */
  function fillMissing(existing: any, seed: any): any {
    if (Array.isArray(existing) && Array.isArray(seed))
      return existing.map((item, i) =>
        seed[i] !== undefined && item && typeof item === 'object' && (!item.__component || item.__component === seed[i]?.__component)
          ? fillMissing(item, seed[i])
          : item,
      );
    if (!existing || typeof existing !== 'object' || !seed || typeof seed !== 'object' || Array.isArray(seed)) return existing;
    const out = { ...existing };
    for (const [key, value] of Object.entries(seed)) {
      if (value === undefined) continue;
      const current = out[key];
      const unset =
        current === null ||
        current === undefined ||
        current === '' ||
        (current === false && value === true) ||
        ((typeof current === 'string' || typeof current === 'number') &&
          current !== value &&
          RETIRED_DEFAULTS.has(`${key}|${current}`));
      if (unset) out[key] = value;
      else if (typeof current === 'object') out[key] = fillMissing(current, value);
    }
    return out;
  }

  // Relations become documentIds, media become ids; ids of components are dropped.
  function toWrite(value: any, top = true): any {
    if (Array.isArray(value)) return value.map((v) => toWrite(v, false));
    if (!value || typeof value !== 'object') return value;
    if ('mime' in value && 'url' in value) return value.id;
    if (!top && 'documentId' in value) return value.documentId;
    const out: Record<string, any> = {};
    for (const [key, v] of Object.entries(value)) {
      if (['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'localizations'].includes(key)) continue;
      out[key] = toWrite(v, false);
    }
    return out;
  }

  async function upgradeDocument(uid: string, existing: any, seedContent: any) {
    if (!runUpgrade) return;
    const full: any = await docs(uid).findOne({ documentId: existing.documentId, populate: populateFor(strapi, uid) as any });
    if (!full) return;
    const before = toWrite(full);
    const after = fillMissing(before, await resolve(seedContent));
    if (JSON.stringify(before) === JSON.stringify(after)) return;
    await docs(uid).update({ documentId: full.documentId, data: after } as any);
    await docs(uid).publish({ documentId: full.documentId } as any);
    stats.upgraded++;
  }

  // Payments are confirmed by hand, so the old gateway "card" method is retired.
  async function removeRetiredPaymentMethods() {
    if (!runUpgrade) return;
    const uid = 'api::checkout-page.checkout-page';
    const page: any = await docs(uid).findFirst({ populate: populateFor(strapi, uid) as any });
    const checkout = page?.sections?.find((s: any) => s.__component === 'commerce.checkout');
    if (!checkout?.paymentMethods?.some((m: any) => m.code === 'card')) return;
    const sections = toWrite(page.sections, false).map((s: any) =>
      s.__component === 'commerce.checkout'
        ? { ...s, paymentMethods: (s.paymentMethods || []).filter((m: any) => m.code !== 'card') }
        : s,
    );
    await docs(uid).update({ documentId: page.documentId, data: { sections } } as any);
    await docs(uid).publish({ documentId: page.documentId } as any);
    stats.upgraded++;
  }


  async function ensureBySlug(uid: string, entry: any, build: (entry: any) => Promise<any>) {
    const existing: any = await docs(uid).findFirst({ filters: { slug: entry.slug } as any });
    if (existing) {
      stats.skipped++;
      return existing.documentId as string;
    }
    const created: any = await docs(uid).create({ data: await build(entry), status: 'published' } as any);
    stats.created++;
    return created.documentId as string;
  }

  // 1. Taxonomies
  const productCategoryIds = new Map<string, string>();
  for (const c of data.productCategories)
    productCategoryIds.set(c.slug, await ensureBySlug('api::product-category.product-category', c, resolve));
  const brewIds = new Map<string, string>();
  for (const b of data.brewMethods) brewIds.set(b.slug, await ensureBySlug('api::brew-method.brew-method', b, resolve));
  const articleCategoryIds = new Map<string, string>();
  for (const c of data.articleCategories)
    articleCategoryIds.set(c.slug, await ensureBySlug('api::article-category.article-category', c, resolve));

  // 2. Products
  for (const p of data.products)
    productIds.set(
      p.slug,
      await ensureBySlug('api::product.product', p, async (entry) => ({
        ...(await resolve({ ...entry, category: undefined, brewMethods: undefined })),
        category: productCategoryIds.get(entry.category),
        brewMethods: entry.brewMethods.map((slug: string) => brewIds.get(slug)),
      })),
    );

  // 2b. New product fields (e.g. mobile copy): fill the empty ones on existing products.
  for (const p of data.products) {
    const existing: any = await docs('api::product.product').findFirst({ filters: { slug: p.slug } as any });
    if (existing) {
      const { category, brewMethods, ...rest } = p as any;
      await upgradeDocument('api::product.product', existing, rest);
    }
  }

  // 3. Articles
  for (const a of data.articles)
    await ensureBySlug('api::article.article', a, async (entry) => ({
      ...(await resolve({ ...entry, category: undefined })),
      category: articleCategoryIds.get(entry.category),
    }));

  // 3b. New article fields (e.g. mobile excerpt) on existing articles.
  for (const a of data.articles) {
    const existing: any = await docs('api::article.article').findFirst({ filters: { slug: a.slug } as any });
    if (existing) {
      const { category, ...rest } = a as any;
      await upgradeDocument('api::article.article', existing, rest);
    }
  }

  // 4. Single types (pages, global, header, footer, settings)
  for (const [name, content] of Object.entries(data.singles)) {
    const uid = `api::${name}.${name}`;
    const existing: any = await docs(uid).findFirst({});
    if (existing) {
      // Settings gain new fields over time: fill only the ones still empty, keep edits.
      if (name === 'site-settings') {
        const missing = Object.fromEntries(
          Object.entries(content).filter(([key]) => existing[key] === null || existing[key] === undefined || existing[key] === ''),
        );
        if (Object.keys(missing).length) {
          await docs(uid).update({ documentId: existing.documentId, data: await resolve(missing) } as any);
          await docs(uid).publish({ documentId: existing.documentId } as any);
          stats.upgraded += Object.keys(missing).length;
        }
      }
      await upgradeDocument(uid, existing, content);
      stats.skipped++;
      continue;
    }
    await docs(uid).create({ data: await resolve(content), status: 'published' } as any);
    stats.created++;
  }

  // 4b. Payment methods no longer offered.
  await removeRetiredPaymentMethods();

  // 5. A demo order for the tracking page
  for (const order of data.demoOrders) {
    const exists = await strapi.db.query('api::order.order' as Uid).findOne({ where: { code: order.code } });
    if (!exists) {
      await docs('api::order.order').create({ data: order } as any);
      stats.created++;
    }
  }

  if (runUpgrade) await store.set({ key: 'upgradeVersion', value: UPGRADE_VERSION });

  strapi.log.info(
    `[seed] created ${stats.created}, kept ${stats.skipped} existing, upgraded ${stats.upgraded} entries with new fields, uploaded ${stats.uploaded} media files.`,
  );
}
