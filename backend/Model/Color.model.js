const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    status:{type:Boolean,required:true}
});

module.exports = mongoose.model("Color", ColorSchema);