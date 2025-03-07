const MainCategoryModel = require("../Model/MainCategory.Model.js");
const SubCategoryModel = require("../Model/SubCategory.model.js");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const gettingSubCategory = async (req, res) => {
  try {
    const data = await SubCategoryModel.find().populate(
      "mainCategory products"
    );
    if (!data) return res.status(400).json({ msg: "No Data found" });
    return res.status(200).json({ msg: data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const addSubCategory = async (req, res) => {
  try {
    let image;
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: "file-upload",
        }
      );
      fs.unlinkSync(req.files.image.tempFilePath);
      image = result.secure_url;
    } else {
      return res.status(400).json({ msg: "Image is required" });
    }
    const { name, mainCategory } = req.body;

    const mainCategoryData = await MainCategoryModel.findOne({
      name: mainCategory,
    });
    if (!mainCategoryData)
      return res.status(400).json({ msg: "Main Category not found" });

    const isSubCategoryExist = await SubCategoryModel.findOne({ name });
    if (isSubCategoryExist) {
      return res.status(400).json({ msg: "Sub Category already exist" });
    }
    const data = await SubCategoryModel.create({
      name:name?.toLowerCase(),
      mainCategory: mainCategoryData?._id,
      image,
    });

    if (!data) {
      return res.status(400).json({ msg: "No Data found" });
    }

    await MainCategoryModel.findByIdAndUpdate(mainCategoryData?._id, {
      $push: { subCategory: data._id },
    });

    const populatedData = await SubCategoryModel.findById(data._id).populate(
      "mainCategory"
    );
    return res.status(200).json({ msg: populatedData });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let image;
    const { name, mainCategory } = req.body;

    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: "file-upload",
        }
      );
      fs.unlinkSync(req.files.image.tempFilePath);
      image = result.secure_url;
    }
    await MainCategoryModel.findOne({ name: mainCategory }).then(
      async (data) => {
        if (!data) {
          return res.status(400).json({ msg: "Main Category not found" });
        }
        await SubCategoryModel.findByIdAndUpdate(
          id,
          { name:name.toLowerCase(), mainCategory: data?._id, image },
          {
            runValidators: true,
            new: true,
          }
        );
      }
    );

    return res.status(200).json({ msg: "Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Log error message for better clarity
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from request parameters
    const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({ msg: "Subcategory not found" });
    }

    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const gettingSubCategoryById = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await SubCategoryModel.findById(id).populate(
      "mainCategory products"
    );
    if (!data) return res.status(400).json({ msg: "No Data found" });
    return res.status(200).json({ msg: data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  gettingSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  gettingSubCategoryById,
};
