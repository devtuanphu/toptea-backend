import type { Core } from '@strapi/strapi';
import { fieldHints, fieldLabels, modelHints, modelLabels } from './admin-labels';

// Default list columns for the inbox-like collections. Applied once: only while the marker
// column is missing, so columns an editor arranges later are kept.
const listLayouts: Record<string, { marker: string; columns: string[] }> = {
  'api::order.order': {
    marker: 'paymentStatus',
    columns: ['code', 'orderStatus', 'paymentStatus', 'customerName', 'total', 'createdAt'],
  },
  'api::contact-message.contact-message': {
    marker: 'topic',
    columns: ['name', 'email', 'topic', 'handlingStatus', 'createdAt'],
  },
};

// Strapi appends a newly added field to the last row of the form. Move it next to `after`
// (same row when there is room, else the row below). Only while it still sits in the last row.
const placements: Record<string, { field: string; after: string }> = {
  'api::order.order': { field: 'orderStatus', after: 'code' },
  'api::contact-message.contact-message': { field: 'handlingStatus', after: 'topic' },
};

type Cell = { name: string; size: number };

function place(layout: Cell[][], { field, after }: { field: string; after: string }) {
  const rowOf = (name: string) => layout.findIndex((row) => row.some((cell) => cell.name === name));
  const from = rowOf(field);
  const target = rowOf(after);
  if (from !== layout.length - 1 || target === -1 || from === target) return;
  const [cell] = layout[from].splice(layout[from].findIndex((c) => c.name === field), 1);
  if (!layout[from].length) layout.splice(from, 1);
  const row = layout[target];
  const used = row.reduce((sum, c) => sum + (c.size || 6), 0);
  if (used + (cell.size || 6) <= 12) row.splice(row.findIndex((c) => c.name === after) + 1, 0, cell);
  else layout.splice(target + 1, 0, [cell]);
}

// The field shown as an entry's name in lists and on the dashboard.
const mainFields: Record<string, string> = {
  // Shown on the dashboard's "last edited" list, where the type name is not used.
  'api::site-settings.site-settings': 'emailFromName',
  'commerce.status-event': 'status',
};

/**
 * Puts Vietnamese labels and short hints on every Content Manager field.
 * Only editor presentation changes; API keys, data and the layout editors arranged stay as they are.
 */
export async function localizeAdmin(strapi: Core.Strapi) {
  const groups: [string, any[]][] = [
    ['content-types', Object.values(strapi.contentTypes).filter((model: any) => model.uid.startsWith('api::'))],
    ['components', Object.values(strapi.components)],
  ];
  for (const [serviceName, models] of groups) {
    const service: any = strapi.plugin('content-manager').service(serviceName);
    for (const model of models) {
      const configuration = await service.findConfiguration(model);
      if (!configuration?.metadatas) continue;
      const before = JSON.stringify(configuration);
      for (const [key, metadata] of Object.entries<any>(configuration.metadatas)) {
        const label = modelLabels[model.uid]?.[key] || fieldLabels[key];
        if (label)
          for (const view of ['edit', 'list']) if (metadata[view]) metadata[view].label = label;
        const hint = modelHints[model.uid]?.[key] || fieldHints[key];
        if (hint && metadata.edit) metadata.edit.description = hint;
      }
      // Single types without a title field are named after the type ("Footer", "Header & menu").
      const mainField =
        mainFields[model.uid] || (model.kind === 'singleType' && !model.attributes?.title ? 'id' : undefined);
      if (mainField && configuration.settings) configuration.settings.mainField = mainField;
      if (placements[model.uid] && configuration.layouts?.edit) place(configuration.layouts.edit, placements[model.uid]);
      const list = listLayouts[model.uid];
      if (list && configuration.layouts && !configuration.layouts.list?.includes(list.marker))
        configuration.layouts.list = list.columns;
      if (JSON.stringify(configuration) !== before) await service.updateConfiguration(model, configuration);
    }
  }
}
