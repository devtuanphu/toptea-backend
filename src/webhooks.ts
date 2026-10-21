import type { Core } from '@strapi/strapi';

const NAME = 'Next.js — làm mới nội dung website';
const EVENTS = ['entry.publish', 'entry.unpublish', 'entry.update', 'entry.delete', 'media.update', 'media.delete'];

/**
 * Registers (once) the webhook that tells the Next.js site to clear its CMS cache,
 * so published changes show up immediately. Needs FRONTEND_URL and REVALIDATE_SECRET.
 * Editors can still change or disable it under Settings → Webhooks.
 */
export async function ensureRevalidateWebhook(strapi: Core.Strapi) {
  const frontend = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!frontend || !secret) return;
  const store: any = strapi.get('webhookStore');
  const existing = (await store.findWebhooks()).find((w: { name: string }) => w.name === NAME);
  if (existing) return;
  const webhook = await store.createWebhook({
    name: NAME,
    url: `${frontend.replace(/\/$/, '')}/api/revalidate`,
    headers: { 'x-revalidate-secret': secret },
    events: EVENTS,
  });
  strapi.get('webhookRunner').add(webhook);
  strapi.log.info(`[webhooks] registered "${NAME}" → ${webhook.url}`);
}
