// Write routes used by the Next.js server only (guarded by the x-shop-secret header).
export default {
  routes: [
    { method: 'POST', path: '/shop/quote', handler: 'shop.quote', config: { auth: false } },
    { method: 'POST', path: '/shop/orders', handler: 'shop.createOrder', config: { auth: false } },
    { method: 'POST', path: '/shop/orders/lookup', handler: 'shop.lookup', config: { auth: false } },
    { method: 'POST', path: '/shop/contact', handler: 'shop.contact', config: { auth: false } },
    { method: 'POST', path: '/shop/newsletter', handler: 'shop.newsletter', config: { auth: false } },
  ],
};
