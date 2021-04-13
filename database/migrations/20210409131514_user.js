
exports.up = function(knex) {
  return knex.schema.createTable("user", tbl => {
      tbl.increments()
      tbl.string('email').unique().notNullable()
      tbl.string('password')
      tbl.string('firstName')
      tbl.string('lastName')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user")
};
