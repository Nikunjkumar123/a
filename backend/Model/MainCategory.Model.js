const mongoose = require("mongoose");

const MainCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    subCategory:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"SubCategory"
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MainCategory", MainCategorySchema);
