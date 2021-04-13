
exports.up = function(knex) {
    return knex.schema.createTable("productUser", tbl => {
        tbl.increments()
        tbl.integer('productId')
           .unsigned()
           .notNullable()
           .references('product.id')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('memberId')
           .unsigned()
           .notNullable()
           .references('user.id')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.string('member_code').notNullable()
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("productUser")
  };