const db = require('../../database/dbConfig');

const getProducts = () => {
    return db('product as p')
            .join('user as u', 'p.hostId','u.id' )
            .select(
                'p.id',
                'p.product_name',
                'p.product_image',
                'p.product_price',
                'p.current_price',
                'p.cobuyers_total',
                'p.actual_cobuyers',
                'p.hostId',
                'p.achieved',
                'u.firstName as host_first_name',
                'u.lastName as host_Last_name',
                'u.email as host_email'
            )
}

const addProduct = (product) => {
    return db('product')
            .returning('id')
            .insert(product)
            .then(ids => ({ id: ids[0] }))
}

const updateProduct = (change, productId) => {
    return db('product')
            .where({id: productId})
            .update(change)
}

const deleteProduct = (productId) => {
    return db('product')
            .where({id: productId})
            .del()
}

const getCobuyers = (productId) => {
    return db('productUser')
            .where({productId: productId})
            .join('user', 'user.id', 'productUser.memberId')
            .select(
                'user.email',
                'user.firstName',
                'user.lastName',
                'productUser.member_code'
            )
}

const getHost = (productId) => {
    return db('product')
            .where('product.id', productId )
            .join('user', 'user.id', 'product.hostId')
            .select(
                'user.email',
                'user.firstName',
                'user.lastName',
                'product.host_code'
            )
            .first()
}

const getProductById = (productId) => {
    return db('product')
            .where({ id: productId })
            .first()
}

const addCobuyer = (cobuyer) => {
    return db('productUser')
            .returning('id')
            .insert(cobuyer)
            .then(ids => ({ id: ids[0] }))
}

const getCodeForACobuyer = (userId, productId) => {
    return db('productUser')
            .where({ 
                productId: productId,
                memberId: userId
            })
            .select('productUser.member_code')
            .first()
}


module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getCobuyers,
    getCodeForACobuyer,
    addCobuyer,
    getHost,
    getProductById
}