const express = require('express');
const app = express();

//routes
const userRoute = require('./api/user/user.route');
const productRoute = require('./api/product/product.route');
const userModel = require('./api/user/user.model');

app.use(express.json());
app.use('Hello world', (req, res) => {

})
app.use('/user', userRoute)
app.use('/product', productRoute)

module.exports = app;