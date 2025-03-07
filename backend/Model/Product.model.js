const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  color: {
    type: mongoose.Schema.ObjectId,
    ref: "Color",
    default: null,
  },
  size:{
    type:String,
    required:true,
    set: (value) => value.toUpperCase()
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  tax:{
    type:Number,
    default:0
  }
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    variant: {
      type: [VariantSchema],
      required: true,
    },
    description: { type: String },
    Additionaldescription: { type: String },
    mainCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    images: [{ type: String }],
    ActiveOnPage: {
      type: Boolean,
      default: false,
    },
    ActiveOnFeatureProduct:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
