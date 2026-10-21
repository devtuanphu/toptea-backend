'use strict';

// Strapi 5 reserves `status` for Draft/Published, so the admin showed "Published" instead of
// the order / message status. The fields are now `orderStatus` and `handlingStatus`; this copies
// existing values into the new columns before the schema sync drops the old ones.
const RENAMES = [
  ['orders', 'status', 'order_status'],
  ['contact_messages', 'status', 'handling_status'],
];

module.exports = {
  async up(knex) {
    for (const [table, from, to] of RENAMES) {
      if (!(await knex.schema.hasTable(table))) continue;
      if (!(await knex.schema.hasColumn(table, from))) continue;
      if (!(await knex.schema.hasColumn(table, to)))
        await knex.schema.alterTable(table, (t) => {
          t.string(to);
        });
      await knex(table).whereNull(to).update({ [to]: knex.ref(from) });
    }
  },
};
