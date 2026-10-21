import type { Core } from '@strapi/strapi';
import { seed } from './seed';
import { ensureRevalidateWebhook } from './webhooks';
import { localizeAdmin } from './localize-admin';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * With SEED_DATA=true, imports the TOP WELL TEA sample content and Figma media
   * on boot. Existing entries are never overwritten, so editors' changes are kept.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.SEED_DATA === 'true') {
      try {
        await seed(strapi);
      } catch (error) {
        strapi.log.error(`[seed] failed: ${(error as Error).stack || error}`);
      }
    }
    await ensureRevalidateWebhook(strapi);
    try {
      await localizeAdmin(strapi);
    } catch (error) {
      strapi.log.error(`[admin labels] failed: ${(error as Error).message}`);
    }
  },
};
