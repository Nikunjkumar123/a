const {Router}=require('express')
const { AddFeatureProducts, UpdateFeatureProducts, DeleteFeatureProducts, GetAllFeatureProducts } = require('../controllers/featureProduct.controller')

const router=Router()

router.route("/get").get(GetAllFeatureProducts)
router.route("/add").post(AddFeatureProducts)
router.route("/update").patch(UpdateFeatureProducts)
router.route("/delete/:id").delete(DeleteFeatureProducts)

module.exports=router