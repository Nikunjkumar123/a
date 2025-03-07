const productModel = require("../Model/Product.model.js");
const fs = require("fs");
const mongoose = require("mongoose");
const MainCategoryModel = require("../Model/MainCategory.Model.js");
const SubCategoryModel = require("../Model/SubCategory.model.js");
const ProductModel = require("../Model/Product.model.js");
const cloudinary = require("cloudinary").v2;

const gettingAllProducts = async (req, res) => {
  try {
    let { limit } = req.query;
    const data = await productModel
      .find()
      .limit(limit)
      .populate("mainCategory subCategory");
    if (!data) return res.status(400).json({ msg: "No Data found" });
    return res.status(202).json({ msg: data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const AddProducts = async (req, res) => {
  try {
    let images = [];

    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean);

    if (files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadPromises = files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        use_filename: true,
        folder: "file-upload",
      });

      await fs.promises.unlink(file.tempFilePath); // Remove temp file
      return result.secure_url;
    });

    images = await Promise.all(uploadPromises); // Resolve all uploads

    const {
      name,
      description,
      Additionaldescription,
      mainCategory,
      subCategory,
      ActiveOnPage,
      ActiveOnFeatureProduct,
      variants,
    } = req.body;

    // Check required fields
    if (!name || !mainCategory || !subCategory) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let parsedVariant = [];
    try {
      parsedVariant = Array.isArray(variants) ? variants : JSON.parse(variants); // Parse if it's a string
    } catch (error) {
      console.log("error", error.message);

      return res.status(400).json({ message: "Invalid Variant data" });
    }

    let mainCategoryId;
    let subCategoryId;

    try {
      const mainCategoryData = await MainCategoryModel.findOne({
        name: mainCategory,
      }).populate("subCategory");

      if (!mainCategoryData) {
        return res.status(400).json({ message: "Main Category not found" });
      }
      let existingSubCategory = mainCategoryData.subCategory.find(
        (sub) => sub.name === subCategory
      );
      if (!existingSubCategory) {
        return res.status(400).json({ message: "Sub doesn't match with Category" });
      }
  

      mainCategoryId = mainCategoryData?._id;
      subCategoryId = existingSubCategory?._id;
      
      
      if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
        return res.status(400).json({ message: "Invalid Main subcategory ID" });
      }
      if (!mongoose.Types.ObjectId.isValid(mainCategoryId)) {
        return res.status(400).json({ message: "Invalid Main maincategory ID" });
      }
    } catch (error) {
      console.log("find main and sub category error:", error.message);
      return res.status(500).json({ error: error });
    }

    const newProduct = await productModel.create({
      name:name.toLowerCase(),
      description,
      Additionaldescription,
      mainCategory: mainCategoryId,
      subCategory: subCategoryId,
      variant: parsedVariant.map((variant) => ({
        ...variant,
        color: mongoose.Types.ObjectId.isValid(variant.color)
          ? new mongoose.Types.ObjectId(variant.color)
          : null, // Handle empty weight
      })),
      images, // Stores multiple Cloudinary image URLs
      ActiveOnPage,
      ActiveOnFeatureProduct
    });


    await SubCategoryModel.findOneAndUpdate(
      {
        name: subCategory,
      },
      { $push: { products: newProduct._id } }
    );

    if (!newProduct) {
      return res.status(400).json({ message: "Failed to save product" });
    }

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    console.log("error", err);

    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// const UpdateProducts = async (req, res) => {
//   try {
//     const { id, } = req.params;

//     let updates = { ...req.body };
//     let images = [];
//     // Validate Product ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid product ID format" });
//     }

//     const existingProduct = await productModel.findById(id);

//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     if (req.files?.images) {
//       const files = Array.isArray(req.files.images)
//         ? req.files.images
//         : [req.files.images];

//       const uploadPromises = files.map(async (file) => {
//         const result = await cloudinary.uploader.upload(file.tempFilePath, {
//           use_filename: true,
//           folder: "file-upload",
//         });

//         await fs.promises.unlink(file.tempFilePath); // Remove temp file
//         return result.secure_url;
//       });

//       images = await Promise.all(uploadPromises); // Resolve all uploads
//       updates.images = images.length > 0 ? images : existingProduct.images;
//     }

    

//     // Update Product
//     const updatedProduct = await productModel
//       .findByIdAndUpdate(id, updates, {
//         new: true,
//         runValidators: true,
//       })
//       .populate("mainCategory subCategory"); // Populate category references

//     res.status(200).json({
//       message: "Product updated successfully",
//       product: updatedProduct,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };

const UpdateProducts = async (req, res) => {
 
  try {
    const { id } = req.params;
    let images = [];

    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean);

    if (files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          use_filename: true,
          folder: "file-upload",
        });

        await fs.promises.unlink(file.tempFilePath); // Remove temp file
        return result.secure_url;
      });

      images = await Promise.all(uploadPromises);
    }

    const {
      name,
      description,
      Additionaldescription,
      mainCategory,
      subCategory,
      ActiveOnPage,
      ActiveOnFeatureProduct,
      variants,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    let parsedVariant = [];
    try {
      parsedVariant = Array.isArray(variants) ? variants : JSON.parse(variants);
    } catch (error) {
      return res.status(400).json({ message: "Invalid Variant data" });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let mainCategoryId = product.mainCategory;
    let subCategoryId = product.subCategory;

    if (mainCategory || subCategory) {
      const mainCategoryData = await MainCategoryModel.findOne({ name: mainCategory }).populate("subCategory");
      if (!mainCategoryData) {
        return res.status(400).json({ message: "Main Category not found" });
      }

      const existingSubCategory = mainCategoryData.subCategory.find((sub) => sub.name === subCategory);
      if (!existingSubCategory) {
        return res.status(400).json({ message: "Subcategory doesn't match with Category" });
      }

      mainCategoryId = mainCategoryData._id;
      subCategoryId = existingSubCategory._id;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name:name.toLowerCase(),
        description,
        Additionaldescription,
        mainCategory: mainCategoryId,
        subCategory: subCategoryId,
        variant: parsedVariant.map((variant) => ({
          ...variant,
          color: mongoose.Types.ObjectId.isValid(variant.color)
            ? new mongoose.Types.ObjectId(variant.color)
            : null,
        })),
        images: images.length > 0 ? images : product.images,
        ActiveOnPage,
        ActiveOnFeatureProduct
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ message: "Failed to update product" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.log("Update product error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product=await ProductModel.findById(id)
    let subCategoryId=product.subCategory

    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
if(subCategoryId){

  const subCategory = await SubCategoryModel.findById(subCategoryId);
  if(subCategory){
    subCategory.products.pull(deletedProduct._id);
    await subCategory.save();
  }
}
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    console.log("error", err);

    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const GetProductById = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await productModel
      .findById(id)
      .populate("mainCategory subCategory");
    if (!data) return res.status(400).json({ msg: "No Product found" });
    return res.status(202).json({ msg: data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};


const searchProduct=async(req,res)=>{
  try {
    const { mainCategory, subCategory, searchTerm,  active } = req.query;

    const query = {};

    if(mainCategory){
      const mainCategoryData = await MainCategoryModel.findOne({ name: mainCategory })
      if (mainCategoryData) {
        query.mainCategory=mainCategoryData?._id;
      }else{
        return res.status(400).json({ message: "Main Category not found" });
      }
    }
    if(subCategory){
      const subcategoryData = await SubCategoryModel.findOne({ name: subCategory })
      if (subcategoryData) {
        query.subCategory=subcategoryData?._id;
      }else{
        return res.status(400).json({ message: "Sub Category not found" });
      }
    }

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // if (minPrice || maxPrice) {
    //   query["variant.finalPrice"] = {};
    //   if (minPrice) query["variant.finalPrice"].$gte = parseFloat(minPrice);
    //   if (maxPrice) query["variant.finalPrice"].$lte = parseFloat(maxPrice);
    // }

    // if (color) {
    //   query["variant.color"] = color;
    // }

    // if (size) {
    //   query["variant.size"] = size.toUpperCase();
    // }

    // if (active !== undefined) {
    //   query.ActiveOnPage = active === "true";
    // }

// const AllProducts= await ProductModel.find().populate("mainCategory subCategory");
// console.log("AllProducts",AllProducts);


    const products = await ProductModel.find(query)
      .populate("mainCategory subCategory")
      .exec();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getAcitvePageProduct=async(req,res)=>{
  
  try {
    const data= await productModel.find({ActiveOnPage:true}).limit(8)
    return res.status(202).json({ msg: data });
  } catch (error) {
    console.log("error",error);
    return res.status(500).json({ error: error });
  }
}

const getActiveFeatureProduct=async(req,res)=>{
  try {
    const data= await productModel.find({ActiveOnFeatureProduct:true}).populate("mainCategory")
    return res.status(202).json({ msg: data });
  } catch (error) {
    console.log("error",error);
    return res.status(500).json({ error: error });
  }
}

module.exports = {
  gettingAllProducts,
  AddProducts,
  UpdateProducts,
  deleteProduct,
  GetProductById,
  searchProduct,getAcitvePageProduct,getActiveFeatureProduct
};
