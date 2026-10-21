import type { Core } from '@strapi/strapi';

type Populate = Record<string, unknown>;

/**
 * Builds an explicit populate tree from the schema so the client never controls
 * the query. Relations are followed one level (enough for product cards inside
 * sections) without their own dynamic zones, which also prevents cycles.
 */
export function populateFor(strapi: Core.Strapi, uid: string, depth = 0, viaRelation = false): Populate {
  if (depth > 6) return {};
  const schema = (strapi.contentTypes as any)[uid] || (strapi.components as any)[uid];
  const populate: Populate = {};
  for (const [key, attr] of Object.entries<any>(schema?.attributes || {})) {
    if (attr.private) continue;
    if (attr.type === 'media') populate[key] = true;
    else if (attr.type === 'component')
      populate[key] = { populate: populateFor(strapi, attr.component, depth + 1, viaRelation) };
    else if (attr.type === 'dynamiczone' && !viaRelation)
      populate[key] = {
        on: Object.fromEntries(
          attr.components.map((c: string) => [c, { populate: populateFor(strapi, c, depth + 1) }]),
        ),
      };
    else if (attr.type === 'relation' && attr.target?.startsWith('api::')) {
      if (viaRelation && depth > 2) populate[key] = { fields: ['name', 'label', 'slug'] };
      else populate[key] = { populate: populateFor(strapi, attr.target, depth + 1, true) };
    }
  }
  return populate;
}

