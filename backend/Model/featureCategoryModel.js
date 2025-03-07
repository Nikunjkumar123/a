const mongoose = require("mongoose");

const FeatureCategorySchema= new mongoose.Schema({
    category:{type:String,required:true},
})

module.exports = mongoose.model("FeatureCategory", FeatureCategorySchema);