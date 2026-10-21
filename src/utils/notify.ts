import type { Core } from '@strapi/strapi';

type Strapi = Core.Strapi;

const money = (value: number) => `${new Intl.NumberFormat('vi-VN').format(Math.round(value || 0))}₫`;
const fill = (template: string | undefined, values: Record<string, string>) =>
  (template || '').replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const toHtml = (text: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0e2038">${escapeHtml(text).replace(/\n/g, '<br>')}</div>`;

const enabled = () => Boolean(process.env.SMTP_HOST) || process.env.EMAIL_PREVIEW === 'true';

async function context(strapi: Strapi) {
  const [settings, global, checkout]: any[] = await Promise.all([
    strapi.documents('api::site-settings.site-settings' as any).findFirst({ status: 'published', populate: { bankQr: true } as any }),
    strapi.documents('api::global.global' as any).findFirst({ status: 'published' }),
    strapi.documents('api::checkout-page.checkout-page' as any).findFirst({
      status: 'published',
      populate: { sections: { on: { 'commerce.checkout': { populate: { paymentMethods: true } } } } } as any,
    }),
  ]);
  const methods: any[] =
    checkout?.sections?.find((s: any) => s.__component === 'commerce.checkout')?.paymentMethods || [];
  return { settings: settings || {}, global: global || {}, methods };
}

type Mail = { to: string; subject: string; text: string; replyTo?: string; fromName?: string; image?: { url: string; alt: string } };

async function send(strapi: Strapi, mail: Mail) {
  const from = process.env.EMAIL_FROM || 'no-reply@topwelltea.com';
  const info: any = await strapi
    .plugin('email')
    .service('email')
    .send({
      to: mail.to,
      from: mail.fromName ? `${mail.fromName} <${from}>` : from,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html:
        toHtml(mail.text) +
        (mail.image
          ? `<p><img src="${escapeHtml(mail.image.url)}" alt="${escapeHtml(mail.image.alt)}" width="220" style="display:block;max-width:220px;height:auto"></p>`
          : ''),
    });
  if (!process.env.SMTP_HOST)
    strapi.log.info(`[email preview] to=${mail.to} subject="${mail.subject}"\n${mail.text}`);
  else strapi.log.info(`[email] sent to=${mail.to} id=${info?.messageId || ''} smtp="${info?.response || ''}"`);
}

/** Customer confirmation + shop notification for a new order. Never throws. */
export async function notifyOrder(strapi: Strapi, order: any) {
  if (!enabled()) return;
  try {
    const { settings, global, methods } = await context(strapi);
    const method = methods.find((m) => m.code === order.paymentMethod);
    const isTransfer = order.paymentMethod === (settings.bankTransferMethodCode || 'bank-transfer');
    const frontend = (process.env.FRONTEND_URL || '').replace(/\/$/, '');
    // The payment QR uploaded in the admin, served through the website's /uploads proxy.
    const qrUrl = isTransfer && settings.bankQr?.url ? new URL(settings.bankQr.url, frontend || 'http://localhost').href : '';
    const paymentNote = isTransfer
      ? [qrUrl ? settings.bankTransferTitle : '', fill(settings.bankTransferNote, { code: order.code })]
          .filter(Boolean)
          .join('\n')
      : '';
    const values: Record<string, string> = {
      code: order.code,
      name: order.customerName,
      email: order.email,
      phone: order.phone,
      items: (order.items || []).map((i: any) => `• ${i.name} × ${i.quantity} — ${money(i.lineTotal)}`).join('\n'),
      subtotal: money(order.subtotal),
      shipping: money(order.shippingFee),
      total: money(order.total),
      payment: method?.shortTitle || method?.title || order.paymentMethod,
      address: [order.address, order.district, order.province].filter(Boolean).join(', '),
      paymentNote,
      trackingUrl: frontend ? `${frontend}/tra-cuu-don-hang` : '',
      siteName: global.siteName || '',
    };
    const body = fill(settings.orderEmailBody, values);
    await send(strapi, {
      to: order.email,
      subject: fill(settings.orderEmailSubject, values),
      text: body,
      replyTo: global.email,
      fromName: settings.emailFromName,
      image: qrUrl ? { url: qrUrl, alt: settings.bankTransferTitle || 'QR' } : undefined,
    });
    if (global.email)
      await send(strapi, {
        to: global.email,
        subject: fill(settings.shopOrderEmailSubject, values),
        text: `${body}\n\n— ${values.name} · ${values.email} · ${values.phone}${order.note ? `\n${order.note}` : ''}`,
        replyTo: order.email,
        fromName: settings.emailFromName,
      });
  } catch (error) {
    strapi.log.error(`[email] order ${order?.code} notification failed: ${(error as Error).message}`);
  }
}

/** Notify the shop inbox about a new contact message. Never throws. */
export async function notifyContact(strapi: Strapi, message: any) {
  if (!enabled()) return;
  try {
    const { settings, global } = await context(strapi);
    if (!global.email) return;
    await send(strapi, {
      to: global.email,
      subject: fill(settings.contactEmailSubject, { topic: message.topic || '', name: message.name }),
      text: [`${message.name} <${message.email}>`, message.phone, message.topic, '', message.message]
        .filter((line) => line !== undefined && line !== null)
        .join('\n'),
      replyTo: message.email,
      fromName: settings.emailFromName,
    });
  } catch (error) {
    strapi.log.error(`[email] contact notification failed: ${(error as Error).message}`);
  }
}
