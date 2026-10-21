import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Vietnamese admin UI for editors (English stays available in profile settings).
    locales: ['vi'],
  },
  bootstrap(_app: StrapiApp) {},
};
