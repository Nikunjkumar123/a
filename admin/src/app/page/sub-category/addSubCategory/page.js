"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation"; // For routing
import { toast } from "sonner";
import { axiosInstance } from "../../Login/page";

const AddSubcategoryPage = () => {
  const [subcategory, setSubcategory] = useState(""); // Input for subcategory name
  const [selectedCategory, setSelectedCategory] = useState(""); // To store selected category
  const [categories, setCategories] = useState([]); // To store all categories
  const [categoryImage, setCategoryImage] = useState(""); // For image upload

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Load categories from localStorage on page load

  const fetchMainCategory = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/products/mainCategory");
      setCategories(response?.data?.msg);
    } catch (error) {
      toast.error("Failed to load categories.");
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCategoryImage(file);
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !categoryImage || !subcategory) {
      alert("Please provide  name, maincategory and an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", subcategory);
    formData.append("mainCategory", selectedCategory);
    formData.append("image", categoryImage);

    if (id) {
      try {
        const res = await axiosInstance.patch(
          `/api/v1/products/sub-categories/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if(res){
          router.push("/page/sub-category");
        }
      } catch (error) {
        
        console.error(
          "Failed to update sub category:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message || "Failed to update sub category!"
        );
      }
    } else {
      try {
        const res = await axiosInstance.post(
          "/api/v1/products/sub-categories",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (res.data.msg.length > 0) {
          setSelectedCategory(res.data.msg[0]._id);
        }
        if(res){
          router.push("/page/sub-category");
        }
      } catch (error) {
        console.error(
          "Failed to add sub category:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.msg || "Failed to add sub category!"
        );
      }
    }
  };

  const getSubCategoryDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/products/sub-categories/${id}`,
        { withCredentials: true }
      );
      setSubcategory(response.data.msg.name);
      setCategoryImage(response.data.msg.image);
      setSelectedCategory(response.data.msg.mainCategory.name);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  useEffect(() => {
    getSubCategoryDetails();
  }, [id]);

  useEffect(() => {
    fetchMainCategory();
  }, []);
  const handleRemoveSubcategory = (subcategoryName) => {};

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Update" : "Add"} Subcategories
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <Input
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="category">Select Category</Label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a category</option>
              {categories?.map((category, index) => (
                <option key={index} value={category?.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="image">Category Image</Label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required={id ? false : true}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:bg-gray-100 file:text-gray-700 file:hover:bg-gray-200"
            />
          </div>

          <div className="gap-2 flex mt-4">
            <Button
              type="button"
              onClick={handleAddSubcategory}
              variant="outline"
            >
              {id ? "Update" : "Add"} Subcategory
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/page/sub-category")}
            >
              Back to Category List
            </Button>
          </div>
        </div>
      </form>

   
    </div>
  );
};

export default AddSubcategoryPage;
