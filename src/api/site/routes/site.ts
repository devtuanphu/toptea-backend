// Public, read-only routes for the website. Queries are built server-side.
export default {
  routes: [
    { method: 'GET', path: '/site/page/:type', handler: 'site.page', config: { auth: false } },
    { method: 'GET', path: '/site/search', handler: 'site.search', config: { auth: false } },
    { method: 'GET', path: '/site/:collection', handler: 'site.list', config: { auth: false } },
    { method: 'GET', path: '/site/:collection/:slug', handler: 'site.detail', config: { auth: false } },
  ],
};
