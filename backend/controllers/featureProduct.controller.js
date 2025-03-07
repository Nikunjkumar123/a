const FeatureProductModel = require("../Model/FeatureProduct.model");
const ProductModel = require("../Model/Product.model");

const GetAllFeatureProducts = async (req, res) => {
  try {
    const featureProduct = await FeatureProductModel.find().populate("product");
    return res.status(200).json(featureProduct);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

const AddFeatureProducts = async (req, res) => {
  try {
    const { product } = req.body;
    const isProductExists = await ProductModel.findById(product);

    if (!isProductExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isProductAlreadyExists = await FeatureProductModel.findOne({
      product,
    });
    if (isProductAlreadyExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const featureProduct = await FeatureProductModel.create({
      product,
    });

    return res.status(200).json(featureProduct);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

const UpdateFeatureProducts = async (req, res) => {
  try {
    const { product,updateProduct } = req.body;
    const isProductExists = await FeatureProductModel.findOne({
      product,
    });
    if (!isProductExists) {
      return res.status(400).json({ message: "Product doesn't exists" });
    }
    const featureProduct = await FeatureProductModel.findOneAndUpdate(
      { product },
      updateProduct,
      { new: true }
    );

    return res.status(200).json(featureProduct);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

const DeleteFeatureProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const isProductExists = await FeatureProductModel.findOne({
        product:id,
      });
      if (!isProductExists) {
        return res.status(400).json({ message: "Product doesn't exists" });
      }
    const deletedProduct = await FeatureProductModel.findOneAndDelete({ product:id });

    return res.status(200).json({success:"product deleted successfully",deletedProduct});
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  GetAllFeatureProducts,
  AddFeatureProducts,
  UpdateFeatureProducts,
  DeleteFeatureProducts,
};
