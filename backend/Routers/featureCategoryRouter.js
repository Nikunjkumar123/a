const {Router}=require('express')
const { AddFeatureCategory, GetFeatureCategory } = require('../controllers/featureCategory.controller')

const router=Router()

router.route("/add").post(AddFeatureCategory)
router.route("/get").get(GetFeatureCategory)

module.exports=router