const mongoose = require("mongoose");

const featureProductSchema = new mongoose.Schema({  
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
});

module.exports = mongoose.model("FeatureProduct", featureProductSchema);