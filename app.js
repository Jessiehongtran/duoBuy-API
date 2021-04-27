const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

//routes
const userRoute = require('./api/user/user.route');
const productRoute = require('./api/product/product.route');

const corsConfig = {
    origin: 'http://127.0.0.1:5500'
}

app.use(express.json());
app.use(bodyParser.text({ type: "text/plain" }));
app.use(cors(corsConfig))
app.use('Hello world', (req, res) => {

})
app.use('/user', userRoute)
app.use('/product', productRoute)

module.exports = app;