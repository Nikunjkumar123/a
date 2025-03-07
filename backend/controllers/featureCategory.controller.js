const featureCategoryModel = require("../Model/featureCategoryModel");

const AddFeatureCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const FeatureCategory = await featureCategoryModel.find();
    if (FeatureCategory?.length === 0) {
      await featureCategoryModel.create({
        category,
      });
    } else {
      FeatureCategory.category = category;
      const updatedCategory = await FeatureCategory.save();

      if (!updatedCategory) {
        return res.status(500).json({ error: "internal server error" });
      } else {
        return res.status(200).json(updatedCategory);
      }
    }
  } catch (error) {}
};

const GetFeatureCategory = async (req, res) => {
  try {
    const FeatureCategory = await featureCategoryModel.find();
    return res.status(200).json(FeatureCategory);
  } catch (error) {
    console.log("feature category error", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  AddFeatureCategory,
  GetFeatureCategory,
};
