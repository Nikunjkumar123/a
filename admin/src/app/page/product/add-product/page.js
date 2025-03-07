"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StepBackIcon } from "lucide-react";
import JoditEditor from "jodit-react";
import { axiosInstance } from "../../Login/page";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productImage, setProductImage] = useState([]); // Store file, not URL
  const [description, setDescription] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productColors, setProductColors] = useState([]); // Array of colors
  const [editingProduct, setEditingProduct] = useState(null);
  const [productVariants, setProductVariants] = useState([]); // Variants state
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const productId = queryParams.get("id"); // Get product ID from URL

  // Fetch categories and subcategories from localStorage
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
const [isActive, setIsActive] = useState(false);
const [isActiveFeatureProduct, setIsActiveFeatureProduct] = useState(false);
  // useEffect(() => {
  //   // Fetch categories and subcategories from localStorage or initialize with default values
  //   // const storedCategories = JSON.parse(localStorage.getItem("categories")) || [
  //   //   {
  //   //     name: "Electronics",
  //   //     subcategories: ["Mobile", "Laptop", "Headphones"],
  //   //   },
  //   //   { name: "Clothing", subcategories: ["Shirts", "Jeans", "Jackets"] },
  //   // ];
  //   // setCategories(storedCategories);

  //   // Fetch product if editing
  //   // if (productId) {
  //   //   const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  //   //   const productToEdit = storedProducts.find(
  //   //     (product) => product.id === parseInt(productId)
  //   //   );
  //   //   if (productToEdit) {
  //   //     setEditingProduct(productToEdit);
  //   //     setProductName(productToEdit.name);
  //   //     setProductCategory(productToEdit.selectCategory);
  //   //     setProductSubCategory(productToEdit.subCategory || "");
  //   //     setProductImage(productToEdit.image || []);
  //   //     setProductDetails(productToEdit.additionalDetails);
  //   //     setProductColors(productToEdit.colors || []);
  //   //     setProductVariants(productToEdit.variants || []); // Set variants if editing
  //   //   }
  //   // }
  // }, [productId]);

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!description || description.trim() === '') {
      alert('Description is required');
      return;
    }
    if (!productDetails || productDetails.trim() === '') {
      alert('Additional details is required');
      return;
    }
    if(!productVariants.length && productVariants.length === 0){
      alert('Variants is required');
      return;
    }
    
    setIsDisabled((prev) => !prev);
    const newProduct = {
      name: productName,
      mainCategory: productCategory,
      subCategory: productSubCategory,
      images: productImage,
      description: description,
      Additionaldescription: productDetails,
      colors: productColors,
      variants: productVariants, // Save variants
    };

   
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("mainCategory", productCategory);
    formData.append("subCategory", productSubCategory);
    formData.append("description", description);
    formData.append("Additionaldescription", productDetails);
    formData.append("colors", productColors);
    formData.append("variants", JSON.stringify(productVariants));
    formData.append("ActiveOnPage",isActive)
    formData.append("ActiveOnFeatureProduct",isActiveFeatureProduct)
    productImage.forEach((image) => {
      formData.append(`images`, image);
    });

    if (productId) {
      try {
        const { data } = await axiosInstance.patch(
          `/api/v1/products/productsFinal/${productId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (data) {
          toast.success("Product added successfully!");
          setIsDisabled((prev) => !prev);
        }
      } catch (error) {
        console.log("error:", error);
      }
    } else {
      try {
        const { data } = await axiosInstance.post(
          "/api/v1/products/productsFinal",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (data) {
          toast.success("Product added successfully!");
          setIsDisabled((prev) => !prev);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    }

    router.push("/page/product"); // Redirect back to Product List page after saving
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProductCategory(selectedCategory);

    // Set subcategories based on selected category
    const category = categories.find(
      (category) => category.name === selectedCategory
    );

    if (category) {
      setSubCategories(category?.subCategory || []);
    } else {
      setSubCategories([]); // Set to empty if category not found
    }
    setProductSubCategory("");
  };

  // Variant handling functions

  const handleAddVariant = () => {
    const newVariant = {
      size: "",
      price: "",
      discountPrice: "",
      tax: "",
      stock: "",
      finalPrice: 0, // Initially 0, will be calculated
    };
    setProductVariants([...productVariants, newVariant]);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...productVariants];
    updatedVariants[index][field] = value;

    // Recalculate final price based on the discount and price
    if (field === "price" || field === "discountPrice") {
      const price = parseFloat(updatedVariants[index].price) || 0;
      const discount = parseFloat(updatedVariants[index].discountPrice) || 0;
      const finalPrice = price - (price * discount) / 100;
      updatedVariants[index].finalPrice = finalPrice;
    }

    setProductVariants(updatedVariants);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = productVariants.filter((_, i) => i !== index);
    setProductVariants(updatedVariants);
  };

const handleCheckBoxChange=(e)=>{
  setIsActive(e.target.checked)
  console.log("isActive",e.target.checked);
  
}

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + productImage.length > 4) {
      toast.error("You can only upload up to 4 images.");
      return;
    }
    setProductImage((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (index) => {
    setProductImage(productImage.filter((_, i) => i !== index));
  };

  const fetchMainCategory = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/products/mainCategory");
      setCategories(response?.data?.msg);
    } catch (error) {
      toast.error("Failed to load categories.");
      console.error(error);
    }
  };

  const getProductDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/products/productsFinal/${productId}`
      );

      const product = response.data.msg;
      const category = categories?.find(
        (category) => category.name === product.mainCategory.name
      );

      if (category) {
        setSubCategories(category?.subCategory || []);
      } else {
        setSubCategories([]); // Set to empty if category not found
      }
      setProductName(product.name);
      setProductCategory(product.mainCategory.name);
      setProductSubCategory(product.subCategory?.name);
      setDescription(product.description);
      setProductDetails(product.Additionaldescription);
      setProductColors(product.colors);
      setProductVariants(product.variant);
      setProductImage(product.images);
      setIsActive(product.ActiveOnPage)
      setIsActiveFeatureProduct(product.ActiveOnFeatureProduct)
    } catch (error) {
      toast.error("Failed to load product details.");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMainCategory();
  }, []);

  useEffect(() => {
    if (productId && categories.length > 0) {
      getProductDetails();
    }
  }, [productId, categories]);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {productId ? "Update Product" : "Add Product"}
        </h2>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/page/product")}
          className="bg-purple-500 text-white"
        >
          <StepBackIcon />
          Back to Product List
        </Button>
      </div>

      <form onSubmit={handleSaveProduct}>
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full"

            />
          </div>

          {/* Product Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={productCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.length > 0 &&
                categories.map((category, i) => (
                  <option key={"cat" + i} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Product Subcategory */}
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <select
              id="subcategory"
              value={productSubCategory}
              onChange={(e) => setProductSubCategory(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a subcategory</option>
              {subCategories.length > 0 &&
                subCategories.map((subCategory, i) => (
                  <option key={"sub" + i} value={subCategory?.name}>
                    {subCategory?.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Product Image */}
          <div>
            <Label htmlFor="image">Product Image (max 4)</Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
              multiple
              className="w-full p-2 border rounded"
              required={productId ? false : true}

            />
            <div className="mt-2">
              {productImage.map((image, index) => (
                <div
                  key={"product" + index}
                  className="flex justify-between items-center"
                >
                  <span>{image.name}</span>
                  <Button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="ml-2 bg-red-500 text-white"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <Label htmlFor="details">Description</Label>
            <JoditEditor
              value={description}
              onChange={(newContent) => setDescription(newContent)}
              required

            />
          </div>

          <div>
            <Label htmlFor="details">Additional Details</Label>
            <JoditEditor
              value={productDetails}
              onChange={(newContent) => setProductDetails(newContent)}
              required

            />
          </div>

          {/* Product Variants */}
          <div>
            <Label htmlFor="variants">Product Variants</Label>
            <div className="space-y-6">
              {productVariants?.map((variant, index) => (
                <div key={index} className="flex flex-wrap gap-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`size-${index}`}>Size</Label>
                    <Input
                      id={`size-${index}`}
                      type="text"
                      value={variant.size}
                      onChange={(e) =>
                        handleVariantChange(index, "size", e.target.value)
                      }
                      required

                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      className="w-24 p-2 border rounded"
                      required

                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`discount-${index}`}>Discount %</Label>
                    <Input
                      id={`discount-${index}`}
                      type="number"
                      value={variant.discountPrice}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "discountPrice",
                          e.target.value
                        )
                      }
                      required
                      className="w-24 p-2 border rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`finalPrice-${index}`}>Final Price</Label>
                    <Input
                      id={`finalPrice-${index}`}
                      type="number"
                      value={variant.finalPrice}
                      readOnly
                      className="w-24 p-2 border rounded"
                      required

                    />
                  </div>

                  {/* Tax Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`tax-${index}`}>Tax %</Label>
                    <select
                      id={`tax-${index}`}
                      value={variant.tax}
                      onChange={(e) =>
                        handleVariantChange(index, "tax", e.target.value)
                      }
                      className="w-24 p-2 border rounded"
                      required

                    >
                      <option value="">Select Tax</option>
                      <option value="3">3%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="82">28%</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor={`stock-${index}`}>Stock</Label>
                    <Input
                      id={`stock-${index}`}
                      type="number"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(index, "stock", e.target.value)
                      }
                      className="w-24 p-2 border rounded"
                      required
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="m-4 bg-red-500 text-white"
                  >
                    Remove Variant
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" onClick={handleAddVariant}>
              Add Variant
            </Button>
          </div>
          <div>
          <label>
        <input
          type="checkbox"
          className="mr-2"
          checked={isActive}
          onChange={handleCheckBoxChange}
        />
        Active on Page  (Check to display the product on the home page)
      </label>
          </div>
          <div>
          <label>
        <input
          type="checkbox"
          className="mr-2"
          checked={isActiveFeatureProduct}
          onChange={(e)=> setIsActiveFeatureProduct(e.target.checked)}
        />
        Active on Feature Product  (Check to display the product on Feature Products)
      </label>
          </div>
         
          {/* Save Button */}
          <div className="gap-2 flex justify-center">
            <Button
              type="submit"
              variant="outline"
              disabled={isDisabled}
              className="bg-purple-500 text-white font-semibold text-2xl hover:animate-out"
            >
              {productId ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;

// const fetchSubCategory = async () => {
//   try {
//     const response = await axiosInstance.get(
//       "/api/v1/products/sub-categories"
//     );
//     setSubCategories(response?.data?.msg);
//   } catch (error) {
//     toast.error("Failed to load categories.");
//     console.error(error);
//   }
// };
//  const AddProduct = async () => {
//     try {
//       console.log("variant", productVariants);

//       let FormData = new FormData();
//       FormData.append("name", productName);
//       FormData.append("mainCategory", productCategory);
//       FormData.append("subCategory", productSubCategory);
//       FormData.append("images", productImage);
//       FormData.append("description", productDetails);
//       FormData.append("variant", productVariants);

//       const { data } = await axiosInstance.post(
//         "/api/v1/products/productsFinal",
//         FormData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       console.log("data", data);
//     } catch (error) {
//       console.log("error", error.message);
//     }
//   };
