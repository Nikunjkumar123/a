const bannerModel = require("../Model/Banner.model.js");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const allBanners = async (req, res) => {
  try {
    const all = await bannerModel.find();
    if (!all) return res.status(400).json({ msg: "No data available" });
    return res.status(200).json({ msg: all });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addBanners = async (req, res) => {
  try {
    let image;
    let { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Description is required" });
    }
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
      return res.status(400).json({ msg: "No image provided" });
    }

    const data = await bannerModel.create({ image, name });
    if (!data) return res.status(400).json({ msg: "Failed to save banner" });

    return res.status(201).json({ msg: "Banner added successfully", data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const updateBanner=async(req,res)=>{
  try {
    const {id}=req.params;
    let image;
    let {name}=req.body;
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
    const data=await bannerModel.findByIdAndUpdate(id,{image,name},{new:true,runValidators:true});
    if(!data) return res.status(400).json({msg:"Failed to update banner"});
    return res.status(201).json({msg:"Banner updated successfully",data});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await bannerModel.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ msg: "Banner not found" });
    }

    return res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
 
const getBannerById = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await bannerModel.findById(id);
    if (!data) return res.status(400).json({ msg: "No banner found" });
    return res.status(202).json({ msg: data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { allBanners, addBanners, deleteBanner,updateBanner,getBannerById };
