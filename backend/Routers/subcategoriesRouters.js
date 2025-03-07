const express = require('express');

const subcategoriesRouters = express.Router();

const {gettingSubCategory,addSubCategory,updateSubCategory,deleteSubCategory, gettingSubCategoryById} = require('../controllers/SubCategories.controller.js');
const verifyToken = require('../Middleware/verifyToken.js');

subcategoriesRouters.route('/').get(gettingSubCategory).post(verifyToken,addSubCategory);
subcategoriesRouters.route('/:id').patch(verifyToken,updateSubCategory).delete(verifyToken,deleteSubCategory);
subcategoriesRouters.get('/:id',gettingSubCategoryById);
module.exports = subcategoriesRouters;