"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { axiosInstance } from "../Login/page";

const SubcategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const handleDeleteSubCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(
        `/api/v1/products/sub-categories/${categoryId}`
      );
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        // Remove the deleted category from the state
        setCategories((prev) =>
          prev.filter((category) => category._id !== categoryId)
        );
      }
    } catch (error) {
      toast.error("Failed to delete category.");
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch categories from localStorage when the component mounts
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  const handleDelete = (categoryIndex, subcategoryIndex) => {
    let storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    if (storedCategories[categoryIndex]) {
      storedCategories[categoryIndex].subcategories.splice(subcategoryIndex, 1);
      localStorage.setItem("categories", JSON.stringify(storedCategories));
      setCategories(storedCategories);
      toast.success("Subcategory deleted successfully!");
    }
  };

  const handleEditSubCategory = (categoryId) => {
    router.push(`/page/sub-category/addSubCategory/?id=${categoryId}`);
  };

  // const handleAddSubcategory = (categoryIndex) => {
  //   const subcategoryName = prompt("Enter new subcategory name:");
  //   if (subcategoryName) {
  //     let storedCategories =
  //       JSON.parse(localStorage.getItem("categories")) || [];
  //     if (storedCategories[categoryIndex]) {
  //       storedCategories[categoryIndex].subcategories =
  //         storedCategories[categoryIndex].subcategories || [];
  //       storedCategories[categoryIndex].subcategories.push(subcategoryName);
  //       localStorage.setItem("categories", JSON.stringify(storedCategories));
  //       setCategories(storedCategories);
  //       toast.success("Subcategory added successfully!");
  //     }
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://api.mrandmrsperfecttrips.in/api/v1/products/sub-categories"
      );

      setCategories(res.data.msg);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subcategory List</h1>
        <Button
          variant="outline"
          onClick={() => router.push("/page/sub-category/addSubCategory")}
        >
          Add Subcategory
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Subcategories</h2>
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Subcategory Name</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Category Name</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, categoryIndex) => (
                <tr key={`${categoryIndex}`}>
                  <td className="py-2 px-4 border-b">{categoryIndex + 1}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {category.name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {category?.mainCategory?.name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Button
                      onClick={() => handleEditSubCategory(category?._id)}
                      size="sm"
                      variant="outline"
                      className="mr-2"
                    >
                      <Edit2Icon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteSubCategory(category._id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  No Subcategories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubcategoryPage;
