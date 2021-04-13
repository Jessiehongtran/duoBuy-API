
exports.up = function(knex) {
    return knex.schema.createTable("product", tbl => {
        tbl.increments()
        tbl.string('product_name')
        tbl.string('product_image')
        tbl.float('product_price')
        tbl.float('current_price')
        tbl.integer('cobuyers_total')
        tbl.integer('actual_cobuyers')
        tbl.string('host_code').notNullable()
        tbl.string('group_code').notNullable()
        tbl.integer('hostId')
           .unsigned()
           .notNullable()
           .references('user.id')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("product")
  };
  