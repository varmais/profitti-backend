
exports.up = function(knex) {
  return knex.schema
    .createTable('Category', function (table) {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('Song', function (table) {
      table.increments('id').primary();
      table.integer('category_id').unsigned().references('id').inTable('Category');
      table.string('title');
      table.text('lyrics', 'longtext');
      table.boolean('dirty');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Song')
    .dropTableIfExists('Category');
};
