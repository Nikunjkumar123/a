const express = require('express');

const productsFinalRouters = express.Router();

const {gettingAllProducts,AddProducts,UpdateProducts,deleteProduct, GetProductById, searchProduct, getAcitvePageProduct, getActiveFeatureProduct} = require('../controllers/Products.controller.js');
const verifyToken = require('../Middleware/verifyToken.js');

productsFinalRouters.route('/').get(gettingAllProducts).post(verifyToken,AddProducts)
productsFinalRouters.route('/search').get(searchProduct)
productsFinalRouters.route('/active-page').get(getAcitvePageProduct)
productsFinalRouters.route('/active-feature-product').get(getActiveFeatureProduct)
productsFinalRouters.route('/:id').patch(verifyToken,UpdateProducts).delete(verifyToken,deleteProduct).get(GetProductById);
module.exports = productsFinalRouters;