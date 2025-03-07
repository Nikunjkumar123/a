const MainCategoryModel = require("../Model/MainCategory.Model.js");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const addMainCategory = async (req, res) => {
  try {
    console.log(req.body);
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

    const { name } = req.body;
    await MainCategoryModel.findOne({ name: name })
      .then((data) => {
        if (data) {
          return res
            .status(400)
            .json({ message: "Main category already exist" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
    if (!name) return res.status(400).json({ message: "No data Found" });
    const data = await MainCategoryModel.create({ name:name?.toLowerCase(), image });
    if (!data) return res.status(400).json({ message: "creation data Failed" });
    return res.status(202).json({ msg: "Main category added" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getMainCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await MainCategoryModel.findById(id).populate("subCategory");
    
    if (!data) return res.status(400).json({ msg: "No data found" });
    return res.status(200).json({ msg: data });
  } catch (error) {
    console.log("category",error.message);
    
    return res.status(500).json({ error: error });
  }
};

const gettingMainCategory = async (req, res) => {
  try {
    let {limit}=req.query
    const data = await MainCategoryModel.find().limit(limit).populate("subCategory");
    if (!data) return res.status(400).json({ msg: "No data found" });
    return res.status(200).json({ msg: data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const UpdateMainCategory = async (req, res) => {
  try {
    let image;
    const { name } = req.body;

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
    const { id } = req.params; // Extract the ID
    const upData = await MainCategoryModel.findByIdAndUpdate(
      id,
      { name:name.toLowerCase(), image },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!upData) {
      return res.status(400).json({ msg: "Update Failed" });
    }
    return res.status(200).json({ msg: "Data updated", data: upData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteMainCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MainCategoryModel.findByIdAndDelete(id);
    if (!data) return res.status(400).json({ msg: "Deletion Failed" });
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = {
  addMainCategory,
  gettingMainCategory,
  UpdateMainCategory,
  deleteMainCategory,
  getMainCategory,
};
