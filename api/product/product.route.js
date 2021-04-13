const route = require('express').Router()
const productModel = require('./product.model');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//GET products
route.get('/', async (req, res) => {
    try {
        const products = await productModel.getProducts()
        res.status(200).json(products)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//ADD a product
route.post('/', async (req, res) => {
    const newProduct = req.body
    const groupUnique = uuid()
    const hostPass = groupUnique.slice(0,4)
    let groupPass
    if (newProduct.cobuyers_total && newProduct.cobuyers_total > 0){
        groupPass = groupUnique.slice(0, 4+ newProduct.cobuyers_total*2)
    } else {
        groupPass = groupUnique.slice(0, 4)
    }
    bcrypt.hash(hostPass, saltRounds, function(err, hash){
        newProduct.host_code = hash
    })
    bcrypt.hash(groupPass, saltRounds, function(err, hash){
        newProduct.group_code = hash
    })
    try {
        const newProductId = await productModel.addProduct(newProduct)
        res.status(200).json(newProductId)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE a product
route.patch('/:productId', async (req, res) => {
    const { productId } = req.params
    const change = req.body
    try {
        const count = await productModel.updateProduct(change, productId)
        res.status(200).json({ message: `Updated ${count} product`})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DELETE a product
route.delete('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const count = await productModel.deleteProduct(productId)
        res.status(200).json({ message: `Deleted ${count} product`})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//ADD a cobuyer of a product
route.post('/cobuyer', async (req, res) => {
    const newCobuyer = req.body
    try {
        const response = await productModel.addCobuyer(newCobuyer)
        res.status(200).json(response)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET all cobuyers of a product
route.get('/:productId/cobuyer', async (req, res) => {
    const { productId } = req.params
    try {
        const cobuyers = await productModel.getCobuyers(productId)
        res.status(200).json(cobuyers)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET code for a cobuyer
route.get('/code/:cobuyerId', async (req, res) => {
    const { cobuyerId } = req.params
    const { productId } = req.body
    try {
        const code = await productModel.getCodeForACobuyer(cobuyerId, productId)
        res.status(200).json(code)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET host of a product
route.get('/:productId/host', async (req, res) => {
    const { productId } = req.params
    try {
        const host = await productModel.getHost(productId)
        res.status(200).json(host)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET a product by productId
route.get('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const product = await productModel.getProductById(productId)
        res.status(200).json(product)
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = route;