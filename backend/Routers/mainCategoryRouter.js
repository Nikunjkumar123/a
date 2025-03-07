const express = require('express');

const mainCategoryRouter = express.Router();

const {addMainCategory,gettingMainCategory,UpdateMainCategory,deleteMainCategory, getMainCategory} = require('../controllers/MainCategory.controller.js');
const verifyToken = require('../Middleware/verifyToken.js');

mainCategoryRouter.route('/').post(verifyToken,addMainCategory).get(gettingMainCategory);
mainCategoryRouter.route('/:id').patch(verifyToken,UpdateMainCategory).delete(verifyToken,deleteMainCategory)
mainCategoryRouter.get('/:id',getMainCategory);

module.exports = mainCategoryRouter;