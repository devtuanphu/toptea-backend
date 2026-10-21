import type { Core } from '@strapi/strapi';

// Koa context as passed by Strapi's router.
type Ctx = any;
import { timingSafeEqual } from 'node:crypto';
import { notifyContact, notifyOrder } from '../../../utils/notify';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+0-9()./ -]{8,20}$/;

type LineInput = { slug?: unknown; quantity?: unknown };

// Only the Next.js server holds the secret; browsers never call these routes directly.
function authorized(ctx: Ctx) {
  const expected = process.env.SHOP_API_SECRET || '';
  const supplied = String(ctx.get('x-shop-secret') || '');
  return (
    expected.length > 0 &&
    Buffer.byteLength(supplied) === Buffer.byteLength(expected) &&
    timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
  );
}

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000b-\u001f]/g, '').trim().slice(0, max) : '';

const digits = (value: string) => value.replace(/\D/g, '');

function normalizeLines(raw: unknown) {
  if (!Array.isArray(raw)) return [];
  const merged = new Map<string, number>();
  for (const line of raw.slice(0, 30) as LineInput[]) {
    const slug = text(line?.slug, 200);
    const quantity = Math.floor(Number(line?.quantity));
    if (!slug || !Number.isFinite(quantity) || quantity < 1) continue;
    merged.set(slug, Math.min(99, (merged.get(slug) || 0) + quantity));
  }
  return [...merged].map(([slug, quantity]) => ({ slug, quantity }));
}

export default ({ strapi }: { strapi: Core.Strapi }) => {
  async function settings() {
    const doc: any = await strapi
      .documents('api::site-settings.site-settings' as any)
      .findFirst({ status: 'published' });
    return {
      shippingFee: Number(doc?.shippingFee ?? 30000),
      freeShippingThreshold: Number(doc?.freeShippingThreshold ?? 500000),
      orderPrefix: text(doc?.orderPrefix, 10) || 'TWT',
    };
  }

  // Payment methods currently offered on the checkout page (edited in the admin).
  async function paymentMethodCodes() {
    const page: any = await strapi.documents('api::checkout-page.checkout-page' as any).findFirst({
      status: 'published',
      populate: { sections: { on: { 'commerce.checkout': { populate: { paymentMethods: true } } } } } as any,
    });
    const checkout = page?.sections?.find((s: any) => s.__component === 'commerce.checkout');
    return new Set<string>((checkout?.paymentMethods || []).map((m: any) => m.code));
  }

  // Prices are always recalculated from the CMS; the client only sends slugs and quantities.
  async function quote(rawLines: unknown) {
    const lines = normalizeLines(rawLines);
    if (!lines.length) return { lines: [], subtotal: 0, shippingFee: 0, total: 0, missing: [] };
    const products: any[] = await strapi.documents('api::product.product' as any).findMany({
      status: 'published',
      filters: { slug: { $in: lines.map((l) => l.slug) } },
      populate: { images: { populate: { media: true } }, category: { fields: ['name', 'label'] } } as any,
      limit: 50,
    });
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    const missing: string[] = [];
    const priced = [];
    for (const line of lines) {
      const product = bySlug.get(line.slug);
      if (!product || product.inStock === false) {
        missing.push(line.slug);
        continue;
      }
      const price = Number(product.price) || 0;
      priced.push({
        slug: product.slug,
        name: product.name,
        category: product.category?.label || product.category?.name || '',
        image: product.images?.[0]?.media?.url || '',
        price,
        quantity: line.quantity,
        lineTotal: price * line.quantity,
      });
    }
    const subtotal = priced.reduce((sum, l) => sum + l.lineTotal, 0);
    const { shippingFee, freeShippingThreshold } = await settings();
    const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : shippingFee;
    return { lines: priced, subtotal, shippingFee: shipping, total: subtotal + shipping, missing };
  }

  async function nextOrderCode(prefix: string) {
    const year = new Date().getFullYear();
    const stem = `${prefix}-${year}-`;
    const count = await strapi.db.query('api::order.order' as any).count({ where: { code: { $startsWith: stem } } });
    return `${stem}${String(count + 1).padStart(4, '0')}`;
  }

  return {
    async quote(ctx: Ctx) {
      if (!authorized(ctx)) return ctx.unauthorized();
      const body = ctx.request.body || {};
      ctx.body = { data: await quote(body.items) };
    },

    async createOrder(ctx: Ctx) {
      if (!authorized(ctx)) return ctx.unauthorized();
      const body = ctx.request.body || {};
      const data = {
        customerName: text(body.customerName, 100),
        email: text(body.email, 254).toLowerCase(),
        phone: text(body.phone, 20),
        address: text(body.address, 300),
        province: text(body.province, 100),
        district: text(body.district, 100),
        note: text(body.note, 1000),
        paymentMethod: text(body.paymentMethod, 50),
      };
      if (
        !data.customerName ||
        !EMAIL.test(data.email) ||
        !PHONE.test(data.phone) ||
        !data.address ||
        !data.province ||
        !/^[a-z0-9-]{2,50}$/.test(data.paymentMethod)
      )
        return ctx.badRequest('INVALID_INPUT');

      if (!(await paymentMethodCodes()).has(data.paymentMethod)) return ctx.badRequest('INVALID_PAYMENT_METHOD');
      const priced = await quote(body.items);
      if (!priced.lines.length || priced.missing.length) return ctx.badRequest('INVALID_ITEMS');

      const { orderPrefix } = await settings();
      const items = priced.lines.map(({ slug, name, category, price, quantity, lineTotal }) => ({
        slug,
        name,
        category,
        price,
        quantity,
        lineTotal,
      }));
      let order: any = null;
      for (let attempt = 0; attempt < 5 && !order; attempt++) {
        const code = await nextOrderCode(orderPrefix);
        try {
          order = await strapi.documents('api::order.order' as any).create({
            data: {
              ...data,
              code,
              orderStatus: 'pending',
              items,
              subtotal: priced.subtotal,
              shippingFee: priced.shippingFee,
              total: priced.total,
              history: [{ status: 'pending', at: new Date().toISOString() }],
            } as any,
          });
        } catch (error: any) {
          // Another order took the same sequence number; retry with the next one.
          if (!/unique/i.test(String(error?.message))) throw error;
        }
      }
      if (!order) return ctx.internalServerError('ORDER_FAILED');
      // Payment is checked and confirmed by hand in the admin (status / payment status).
      void notifyOrder(strapi, order);
      ctx.status = 201;
      ctx.body = {
        data: {
          code: order.code,
          total: order.total,
          paymentMethod: order.paymentMethod,
          email: order.email,
        },
      };
    },

    async lookup(ctx: Ctx) {
      if (!authorized(ctx)) return ctx.unauthorized();
      const body = ctx.request.body || {};
      const code = text(body.code, 40).replace(/^#/, '').toUpperCase();
      const contact = text(body.contact, 254).toLowerCase();
      if (!code || !contact) return ctx.badRequest('INVALID_INPUT');
      const order: any = await strapi.db
        .query('api::order.order' as any)
        .findOne({ where: { code }, populate: { history: true } });
      const phoneMatch = digits(contact).length >= 8 && digits(order?.phone || '') === digits(contact);
      // Same response for "missing" and "contact mismatch" so codes cannot be enumerated.
      if (!order || !(order.email?.toLowerCase() === contact || phoneMatch)) return ctx.notFound();
      ctx.body = {
        data: {
          code: order.code,
          status: order.orderStatus,
          createdAt: order.createdAt,
          customerName: order.customerName,
          district: order.district,
          province: order.province,
          carrier: order.carrier,
          paymentMethod: order.paymentMethod,
          estimatedDelivery: order.estimatedDelivery,
          paymentStatus: order.paymentStatus,
          items: order.items,
          subtotal: order.subtotal,
          shippingFee: order.shippingFee,
          total: order.total,
          history: (order.history || []).map((h: any) => ({ status: h.status, at: h.at })),
        },
      };
    },

    async contact(ctx: Ctx) {
      if (!authorized(ctx)) return ctx.unauthorized();
      const body = ctx.request.body || {};
      const data = {
        name: text(body.name, 100),
        email: text(body.email, 254).toLowerCase(),
        phone: text(body.phone, 20),
        topic: text(body.topic, 120),
        message: text(body.message, 5000),
      };
      if (!data.name || !EMAIL.test(data.email) || data.message.length < 5 || (data.phone && !PHONE.test(data.phone)))
        return ctx.badRequest('INVALID_INPUT');
      await strapi.documents('api::contact-message.contact-message' as any).create({ data: { ...data, handlingStatus: 'new' } as any });
      void notifyContact(strapi, data);
      ctx.status = 201;
      ctx.body = { ok: true };
    },

    async newsletter(ctx: Ctx) {
      if (!authorized(ctx)) return ctx.unauthorized();
      const body = ctx.request.body || {};
      const email = text(body.email, 254).toLowerCase();
      if (!EMAIL.test(email)) return ctx.badRequest('INVALID_INPUT');
      const exists = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber' as any).findOne({ where: { email } });
      if (!exists)
        await strapi
          .documents('api::newsletter-subscriber.newsletter-subscriber' as any)
          .create({ data: { email, source: text(body.source, 100) } as any });
      ctx.status = 201;
      ctx.body = { ok: true };
    },
  };
};
