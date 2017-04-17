exports.up = function (knex) {
  return knex.schema.table('Song', function (table) {
    table.boolean('disabled').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('Song', function (table) {
    table.dropColumn('disabled');
  });
};
